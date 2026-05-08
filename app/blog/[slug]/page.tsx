import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FilmStrip, FilmStripBadge } from "@/components/FilmStrip";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { blogPosts, getBlogPost } from "@/lib/workflow";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Note not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://micro.film/blog/${post.slug}`,
      siteName: "micro.film",
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts
    .filter((entry) => entry.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <BackgroundLight />
      <SiteHeader active="blog" />

      <main className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <div className="pt-10">
          <Link
            href="/blog"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)] transition hover:text-[var(--foreground)]"
          >
            ← Back to notes
          </Link>
        </div>

        <article className="py-10">
          <header className="grid gap-8 md:grid-cols-[0.65fr_0.35fr] md:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <FilmStripBadge label={post.category} />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/45">
                  {post.readTime}
                </span>
              </div>
              <h1 className="serif mt-6 text-balance text-5xl leading-[1.05] sm:text-6xl">
                {post.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--foreground)]/65">
                {post.deck}
              </p>
            </div>
            <FilmStrip className="rounded-md" holes={20}>
              <div className="grid place-items-center px-4 py-6 text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/50">
                  Frame
                </p>
                <p className="serif mt-2 text-4xl leading-none">01</p>
              </div>
            </FilmStrip>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.7fr_0.3fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
              <p className="serif border-b border-white/10 pb-6 text-2xl leading-snug text-[var(--foreground)]/85">
                {post.excerpt}
              </p>

              <div className="mt-8 space-y-10">
                {post.content.map((section) => (
                  <section key={section.heading}>
                    <h2 className="serif text-3xl leading-tight">
                      {section.heading}
                    </h2>
                    <p className="mt-4 text-base leading-8 text-[var(--foreground)]/70">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/50">
                  Director&rsquo;s note
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/65">
                  Every micro film answers one question: what is the single
                  frame the viewer should remember.
                </p>
              </div>
              <div className="rounded-3xl border border-[var(--amber)]/30 bg-[radial-gradient(circle_at_30%_20%,rgba(232,184,106,0.18),transparent_60%),linear-gradient(180deg,#1a1612,#0c0a08)] p-6">
                <FilmStripBadge label="Try it" />
                <h2 className="serif mt-4 text-2xl leading-tight">
                  Apply this in the studio.
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--foreground)]/65">
                  Cast a character, write a scene, render a vertical clip.
                </p>
                <Link
                  href="/studio"
                  className="mt-5 inline-flex rounded-full bg-[var(--paper)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--amber-soft)]"
                >
                  Open studio
                </Link>
              </div>
            </aside>
          </div>
        </article>

        <section className="pb-16">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="serif text-3xl leading-tight">More notes</h2>
            <Link
              href="/blog"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55 transition hover:text-[var(--foreground)]"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((entry) => (
              <Link
                key={entry.slug}
                href={`/blog/${entry.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-0.5 hover:border-[var(--amber)]/40"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
                  {entry.category}
                </p>
                <h3 className="serif mt-4 text-2xl leading-tight">
                  {entry.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[var(--foreground)]/60">
                  {entry.excerpt}
                </p>
              </Link>
            ))}
          </div>
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
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_85%_-10%,rgba(232,184,106,0.1),transparent_30%)]"
      />
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-0"
      />
    </>
  );
}
