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
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f0c]/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-8">
            <Link href="/" className="flex items-center gap-3 font-mono text-sm font-semibold tracking-[0.24em] text-[#e7f3ea]">
              <span className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </span>
              <span>KURABIYE.LOG</span>
            </Link>
            <div className="flex items-center gap-6 font-mono text-sm text-[#b8c7c0]">
              <Link href="/" className="transition hover:text-[#7cff9c]">
                /haberler
              </Link>
              <Link href="/rehberler" className="transition hover:text-[#7cff9c]">
                /rehberler
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
