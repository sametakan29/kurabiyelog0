import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Yazılım Notlarım</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="block p-6 border rounded-lg hover:border-blue-500 transition">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-500">{post.date}</p>
            <p className="mt-2 text-gray-700">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}