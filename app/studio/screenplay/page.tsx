import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { CONTACT_HREF } from "@/lib/workflow";
import { ScreenplayEditor } from "./screenplay-editor";

export const metadata: Metadata = {
  title: "Screenplay",
  description:
    "Write a micro film screenplay with cinematic structure: scene headings, action, dialogue. Start blank and co-write with assistance, or generate a draft from a guided prompt.",
  alternates: { canonical: "/studio/screenplay" },
  openGraph: {
    title: "Screenplay — micro.film",
    description:
      "The first deliverable of every micro film. Write the screenplay, then render the scenes.",
    url: "https://micro.film/studio/screenplay",
    siteName: "micro.film",
  },
};

export default function ScreenplayPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <BackgroundLight />
      <SiteHeader active="studio" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <Breadcrumb />
        <PageHeader />
        <ScreenplayEditor />
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
        Screenplay
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
          The screenplay.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--foreground)]/70">
          Every micro film starts here. Cast in scene headings, action,
          and dialogue. Write it yourself with inline assistance, or
          generate a draft from a guided prompt and edit from there.
          Each scene becomes a micro scene at render time.
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
