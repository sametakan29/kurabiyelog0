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
  title: "Kurabiye Log",
  description: "Teknoloji üzerine içerikler",
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
