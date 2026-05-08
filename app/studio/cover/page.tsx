import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { CONTACT_HREF } from "@/lib/workflow";
import { CoverStudio } from "./cover-studio";

export const metadata: Metadata = {
  title: "Cover",
  description:
    "Make the 9:16 vertical cover for a micro film. Generate from a prompt with ChatGPT Images 2.0, then edit in plain language until the cover lands.",
  alternates: { canonical: "/studio/cover" },
  openGraph: {
    title: "Cover — micro.film",
    description:
      "Generate and edit 9:16 vertical micro film covers with ChatGPT Images 2.0.",
    url: "https://micro.film/studio/cover",
    siteName: "micro.film",
  },
};

export default function CoverPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <BackgroundLight />
      <SiteHeader active="studio" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <Breadcrumb />
        <PageHeader />
        <CoverStudio />
      </main>

      <SiteFooter />
    </div>
  );
}

function Breadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55"
    >
      <Link href="/" className="transition hover:text-[var(--foreground)]">
        Home
      </Link>
      <span aria-hidden="true">/</span>
      <Link href="/studio" className="transition hover:text-[var(--foreground)]">
        Studio
      </Link>
      <span aria-hidden="true">/</span>
      <span className="text-[var(--foreground)]" aria-current="page">
        Cover
      </span>
    </nav>
  );
}

function PageHeader() {
  return (
    <header className="grid items-end gap-6 pt-10 lg:grid-cols-[1fr_auto]">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
          Step 02 — Develop
        </p>
        <h1 className="serif mt-4 text-balance text-5xl leading-[1.05] sm:text-6xl">
          The cover.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--foreground)]/70">
          Every micro film needs a face. Generate the 9:16 cover from a
          prompt, then edit it in plain language with ChatGPT Images 2.0
          until the frame, palette, and type land. The cover lives in
          the showcase grid, opens every share, and sets the temperature
          for the first scene.
        </p>
      </div>
      <Link
        href={CONTACT_HREF}
        className="inline-flex items-center justify-center self-start rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-white/5"
      >
        Need help? Talk to us
      </Link>
    </header>
  );
}

function BackgroundLight() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_15%_-5%,rgba(232,184,106,0.12),transparent_30%),radial-gradient(circle_at_85%_8%,rgba(177,58,58,0.08),transparent_28%)]"
      />
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-0"
      />
    </>
  );
}
