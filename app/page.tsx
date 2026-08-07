import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kurabiye Log | Teknoloji, Yapay Zeka ve Güncel Blog Yazıları",
  description: "Yapay zeka teknolojileri, yazılım rehberleri, kodlama ipuçları ve samimi teknoloji sohbetleri.",
  alternates: {
    canonical: "https://www.kurabiyelog.tech",
  },
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
      <section className="terminal-surface terminal-glow mb-8 overflow-hidden rounded-3xl px-6 py-8 md:px-10 md:py-12">
        <div className="mb-5 flex items-center justify-between gap-6">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.35em] text-[#7cff9c]">TERMINAL // CURATED LOGS</p>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">Yazılım Notlarım</h1>
          </div>
          <div className="relative hidden shrink-0 md:block">
            <div className="cookie-shadow relative flex h-24 w-24 items-center justify-center rounded-full bg-[#c98a4a]">
              <div className="absolute left-6 top-6 h-3 w-3 rounded-full bg-[#5b381b]" />
              <div className="absolute right-6 top-8 h-3 w-3 rounded-full bg-[#5b381b]" />
              <div className="absolute bottom-6 left-8 h-3 w-3 rounded-full bg-[#5b381b]" />
              <div className="absolute bottom-8 right-7 h-2.5 w-2.5 rounded-full bg-[#5b381b]" />
              <div className="absolute -bottom-2 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full bg-[#8d6236]/60 blur-sm" />
            </div>
            <span className="absolute -bottom-1 -left-5 rounded-full bg-[#7cff9c]/10 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-[#cfe3d7]">
              fresh
            </span>
          </div>
        </div>
        <p className="max-w-3xl text-base text-[#b8c7c0] md:text-lg">
          Teknoloji, yapay zeka ve pratik rehberler için daha sıcak, daha anlaşılır bir okuma alanı.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#9eb0a8]">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono">$ cat latest-posts</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono">$ ai / productivity / guides</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono">• küçük ipuçları • gerçek kullanım</span>
        </div>
      </section>

      <div className="grid gap-5">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="terminal-surface group block rounded-2xl p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#7cff9c]/30 hover:bg-[#101610]"
          >
            <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.26em] text-[#7cff9c]">
              <span className="font-mono">post</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-[#b8c7c0]">{post.date}</span>
            </div>
            <h2 className="text-2xl font-semibold leading-tight transition group-hover:text-[#7cff9c] md:text-3xl">
              {post.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#b8c7c0] md:text-base">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}