import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import { notFound } from 'next/navigation';
import 'highlight.js/styles/atom-one-dark.css';

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

    return (
        /* Buradaki sınıfları güncelledik: max-width ve font ayarları eklendi */
        <article className="max-w-4xl mx-auto p-6 md:p-12 prose prose-neutral lg:prose-xl dark:prose-invert prose-img:rounded-2xl prose-img:shadow-md prose-img:w-full prose-img:mx-auto">

            {/* Başlık kısmını daha belirgin yaptık */}
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