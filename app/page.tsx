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
    <main className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
      {/* Hero Kartı - Sıcak & Sakin Terminal */}
      <section className="terminal-surface mb-10 overflow-hidden rounded-3xl p-6 md:p-10 border border-white/5">
        <div className="mb-6 flex items-center justify-between gap-6">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.3em] text-[#f3b368]">TERMINAL // CURATED LOGS</p>
            <h1 className="mb-3 text-3xl font-bold leading-tight text-[#f8fafc] md:text-5xl">Yazılım Notlarım</h1>
          </div>
          <div className="relative hidden shrink-0 md:block">
            <div className="cookie-shadow relative flex h-20 w-20 items-center justify-center rounded-full bg-[#d97706]/80 border border-[#f59e0b]/30">
              <div className="absolute left-5 top-5 h-2.5 w-2.5 rounded-full bg-[#451a03]" />
              <div className="absolute right-5 top-7 h-2.5 w-2.5 rounded-full bg-[#451a03]" />
              <div className="absolute bottom-5 left-7 h-2.5 w-2.5 rounded-full bg-[#451a03]" />
              <div className="absolute bottom-6 right-6 h-2 w-2 rounded-full bg-[#451a03]" />
            </div>
            <span className="absolute -bottom-1 -left-4 rounded-full bg-[#f3b368]/15 px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] text-[#fef3c7]">
              fresh
            </span>
          </div>
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-[#94a3b8] md:text-lg">
          Teknoloji, yapay zeka ve pratik rehberler için gözü yormayan, sıcak ve anlaşılır bir okuma alanı.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs text-[#94a3b8]">
          <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1.5 font-mono text-[#cbd5e1]">$ cat latest-posts</span>
          <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1.5 font-mono text-[#cbd5e1]">$ ai / productivity / guides</span>
          <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1.5 font-mono text-[#86efac]">• pratik rehberler</span>
        </div>
      </section>

      {/* Blog Gönderileri Listesi */}
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="terminal-surface group block rounded-2xl p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[#f3b368]/30 hover:bg-[#1a1d24]"
          >
            <div className="mb-3 flex items-center gap-3 text-xs tracking-[0.2em] text-[#86efac]">
              <span className="font-mono uppercase">post</span>
              <span className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-[#94a3b8]">{post.date}</span>
            </div>
            <h2 className="text-xl font-semibold leading-snug text-[#f8fafc] transition group-hover:text-[#f3b368] md:text-2xl">
              {post.title}
            </h2>
            <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-[#94a3b8] md:text-base">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}