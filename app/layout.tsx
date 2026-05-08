import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://micro.film"),
  title: {
    default: "micro.film — AI Micro-Drama Studio",
    template: "%s — micro.film",
  },
  description:
    "Create character reference sheets, prompt 15-second micro-drama scenes, and render phone-native vertical drama clips.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "micro.film — AI Micro-Drama Studio",
    description:
      "A production studio for AI-native serialized micro-dramas.",
    url: "https://micro.film",
    siteName: "micro.film",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0a0508]">{children}</body>
    </html>
  );
}
