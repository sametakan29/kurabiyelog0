import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kurabiyelog.tech'),
  title: {
    default: "Kurabiye Log | Teknoloji, Yapay Zeka ve Yazılım Blogu",
    template: "%s | Kurabiye Log",
  },
  description: "Teknoloji, yapay zeka, geliştirici araçları, kodlama ipuçları ve samimi teknoloji rehberleri.",
  keywords: ["teknoloji blogu", "yapay zeka", "yazılım", "ai agent", "kodlama", "kurabiye log"],
  authors: [{ name: "Kurabiye Log" }],
  creator: "Kurabiye Log",
  publisher: "Kurabiye Log",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.kurabiyelog.tech",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.kurabiyelog.tech",
    siteName: "Kurabiye Log",
    title: "Kurabiye Log | Teknoloji, Yapay Zeka ve Yazılım Blogu",
    description: "Teknoloji, yapay zeka, geliştirici araçları, kodlama ipuçları ve samimi teknoloji rehberleri.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurabiye Log | Teknoloji, Yapay Zeka ve Yazılım Blogu",
    description: "Teknoloji, yapay zeka, geliştirici araçları, kodlama ipuçları ve samimi teknoloji rehberleri.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#121417]/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 md:px-8">
            <Link href="/" className="flex items-center gap-3 font-mono text-sm font-semibold tracking-[0.2em] text-[#f1f5f9] transition hover:text-[#f3b368]">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]/80" />
              </span>
              <span>KURABIYE.LOG</span>
            </Link>
            <div className="flex items-center gap-6 font-mono text-sm text-[#94a3b8]">
              <Link href="/" className="transition hover:text-[#f3b368]">
                /yazılar
              </Link>
              <Link href="/" className="transition hover:text-[#f3b368]">
                /hakkında
              </Link>
            </div>
          </div>
        </nav>
        {children}
        <GoogleAnalytics gaId="G-NMGCN59YR3" />
      </body>
    </html>
  );
}
