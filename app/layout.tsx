import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const GTM_ID = "GTM-N3NQDM46";

const gtmInitScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

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
    "A cinematic studio for vertical micro films, end to end. Research, develop, generate, and stitch 45–90 second micro scenes into a film of up to ten minutes. Built for brands, agencies, publishers, and independent filmmakers.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "micro.film — Make a Micro Film",
    description:
      "A cinematic studio for micro films. Research, develop, generate, stitch. For the people making the films.",
    url: "https://micro.film",
    siteName: "micro.film",
    type: "website",
  },
};

const gtmEnabled = process.env.NODE_ENV === "production";

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
      <head>
        {gtmEnabled && (
          <script
            dangerouslySetInnerHTML={{ __html: gtmInitScript }}
          />
        )}
      </head>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        {gtmEnabled && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
