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
        <article className="max-w-3xl mx-auto p-8 prose prose-slate lg:prose-xl dark:prose-invert">
            <h1 className="mb-4">{data.title}</h1>
            <p className="text-gray-500 mb-8">{data.date}</p>
            { }
            <MDXRemote source={content} options={options} />
        </article>
    );
}