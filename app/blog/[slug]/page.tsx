import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import 'highlight.js/styles/atom-one-dark.css';

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    const fullPath = path.join(process.cwd(), 'content', `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return {};
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    const title = data.title;
    const description = data.excerpt || 'Kurabiye Log teknoloji ve yazılım yazısı.';
    const keywords = data.keywords || [];
    const canonicalUrl = `https://www.kurabiyelog.tech/blog/${slug}`;

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: 'Kurabiye Log',
            type: 'article',
            publishedTime: data.date,
            locale: 'tr_TR',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function PostPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const fullPath = path.join(process.cwd(), 'content', `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        notFound();
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content, data } = matter(fileContents);

    const options = {
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [rehypeHighlight],
        },
    };

    const canonicalUrl = `https://www.kurabiyelog.tech/blog/${slug}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        description: data.excerpt,
        datePublished: data.date,
        dateModified: data.date,
        author: {
            '@type': 'Person',
            name: 'Kurabiye Log',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Kurabiye Log',
            url: 'https://www.kurabiyelog.tech',
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
        },
    };

    return (
        <main className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Link href="/" className="mb-6 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-[#f3b368] transition hover:text-[#fcd34d]">
                ← /yazılar
            </Link>

            <article className="prose prose-neutral lg:prose-xl dark:prose-invert prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-md prose-img:w-full prose-img:mx-auto">
                <header className="mb-10 border-b border-white/5 pb-8">
                    <p className="mb-3 font-mono text-xs tracking-widest text-[#86efac]">{String(data.date).slice(0, 10)} • KURABIYE LOG</p>
                    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-[#f8fafc] mb-4">
                        {data.title}
                    </h1>
                </header>

                <MDXRemote source={content} options={options} />
            </article>
        </main>
    );
}