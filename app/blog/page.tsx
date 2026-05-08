import type { Metadata } from "next";
import Link from "next/link";
import { FilmStrip, FilmStripBadge } from "@/components/FilmStrip";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { blogPosts } from "@/lib/workflow";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Notes on writing micro films, designing shots, and shipping vertical micro scenes to TikTok, YouTube Shorts, and Instagram Reels.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "micro.film Notes",
    description:
      "Field notes on writing, casting, and shipping micro films.",
    url: "https://micro.film/blog",
    siteName: "micro.film",
    type: "website",
  },
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <BackgroundLight />
      <SiteHeader active="blog" />

      <main className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <section className="grid gap-10 py-14 lg:grid-cols-[0.55fr_0.45fr] lg:items-end">
          <div>
            <FilmStripBadge label="Notes" />
            <h1 className="serif mt-5 text-balance text-5xl leading-[1.05] sm:text-6xl">
              Field notes from the cutting room.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--foreground)]/65">
              Tight essays on writing, casting, and shipping micro films. New
              entries between micro scenes.
            </p>
          </div>
          <div aria-hidden="true">
            <FilmStrip className="rounded-md" holes={20}>
              <div className="flex items-center justify-between px-2 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/50">
                <span>Reel · 04 entries</span>
                <span>v0.1</span>
              </div>
            </FilmStrip>
          </div>
        </section>

        <section className="pb-12">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-3xl border border-white/10 bg-[var(--film-edge)] p-2 transition hover:border-[var(--amber)]/40"
          >
            <article className="grid gap-0 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_15%_25%,rgba(232,184,106,0.18),transparent_55%),linear-gradient(180deg,#1a1612,#0c0a08)] md:grid-cols-[0.55fr_0.45fr]">
              <div className="p-8 sm:p-10">
                <FilmStripBadge label="Featured" />
                <h2 className="serif mt-5 text-balance text-4xl leading-tight sm:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-[var(--foreground)]/65">
                  {featured.excerpt}
                </p>
                <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)] transition group-hover:text-[var(--foreground)]">
                  Read essay →
                </p>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute inset-4 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#2c1f15,#0c0a08)]" />
                <div className="absolute inset-6 grid place-items-center rounded-2xl border border-white/10 bg-black/30">
                  <p className="serif text-3xl text-[var(--foreground)]/80">
                    Frame 01
                  </p>
                </div>
              </div>
            </article>
          </Link>
        </section>

        <section className="grid gap-4 pb-16 md:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-0.5 hover:border-[var(--amber)]/40 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
                <span className="text-[var(--amber-soft)]">{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="serif mt-5 text-2xl leading-tight">
                {post.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-[var(--foreground)]/60">
                {post.excerpt}
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/45 transition group-hover:text-[var(--amber-soft)]">
                Read →
              </p>
            </Link>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function BackgroundLight() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_15%_-5%,rgba(232,184,106,0.12),transparent_30%)]"
      />
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-0"
      />
    </>
  );
}
