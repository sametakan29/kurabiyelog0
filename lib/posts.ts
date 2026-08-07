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
            const { data } = matter(fileContents);

            const rawDate = data.date ? String(data.date) : '';
            const displayDate = rawDate.slice(0, 10);
            const timestamp = new Date(rawDate).getTime() || 0;

            return {
                slug,
                rawDate,
                date: displayDate,
                timestamp,
                ...(data as { title: string; excerpt: string }),
            };
        });

    return allPostsData.sort((a, b) => b.timestamp - a.timestamp);
}