import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content');

export function getAllPosts() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const stat = fs.statSync(fullPath);
            const { data } = matter(fileContents);

            return {
                slug,
                mtimeMs: stat.mtimeMs,
                ...(data as { title: string; date: string; excerpt: string }),
            };
        });

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return b.mtimeMs - a.mtimeMs;
    });
}