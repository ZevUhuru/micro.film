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
    "Cast a character, write 45–90 second micro scenes, cut a fifteen-minute vertical micro film. First three micro scenes free, rest unlocked with a Pass.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "micro.film — Make a Micro Film",
    description:
      "A cinematic studio for micro films. A dozen micro scenes. Fifteen minutes. One story.",
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
