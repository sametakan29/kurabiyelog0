import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
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
        <article className="max-w-4xl mx-auto p-6 md:p-12 prose prose-neutral lg:prose-xl dark:prose-invert prose-img:rounded-2xl prose-img:shadow-md prose-img:w-full prose-img:mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <header className="mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    {data.title}
                </h1>
                <p className="text-gray-400 font-medium">{data.date} • Kurabiye Log</p>
            </header>

            <MDXRemote source={content} options={options} />
        </article>
    );
}