import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://micro.film"),
  title: {
    default: "micro.film — Make a Micro Film",
    template: "%s — micro.film",
  },
  description:
    "Cast a character, write a scene, render a 15-second cinematic clip. Share it as a TikTok, YouTube Short, or Instagram Reel.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "micro.film — Make a Micro Film",
    description:
      "A cinematic studio for short-form film. Cast, write, render, and share in minutes.",
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
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
