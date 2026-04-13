import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Sites | Web Design Agency",
  description: "A website agency specialising in building performant sites, that are designed to convert.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${outfit.variable} antialiased bg-zinc-50 text-zinc-950`}
    >
      <body className="min-h-[100dvh] flex flex-col font-sans selection:bg-zinc-950 selection:text-white">
        <Navigation />
        <main className="flex-1 flex flex-col pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
