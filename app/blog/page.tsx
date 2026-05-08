import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, dramaRails } from "@/lib/workflow";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on AI micro-drama hooks, character sheets, vertical video scenes, and serialized story production.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "micro.film Blog",
    description:
      "Field notes on creating phone-native AI micro-dramas and vertical story clips.",
    url: "https://micro.film/blog",
    siteName: "micro.film",
    type: "website",
  },
};

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const supportingPosts = blogPosts.slice(1);

  return (
    <main className="min-h-screen overflow-hidden bg-[#08080b] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(244,63,94,0.34),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(250,204,21,0.14),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-[#ff184e] font-black tracking-tighter shadow-[0_16px_40px_rgba(255,24,78,0.35)]">
              mf
            </span>
            <span className="text-lg font-black tracking-tight">micro.film</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-black text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/studio"
              className="rounded-full bg-white px-4 py-2 text-sm font-black text-black transition hover:bg-rose-100"
            >
              Studio
            </Link>
          </nav>
        </header>

        <section className="grid gap-8 py-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="max-w-xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ff6b8e]">
              micro.film blog
            </p>
            <h1 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl">
              Field notes for AI drama makers.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/62">
              Strategy, story patterns, production notes, and design thinking
              for creators building short vertical drama with consistent
              characters.
            </p>
          </div>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ff315f] via-[#79122b] to-black p-4 shadow-2xl shadow-black/40 transition duration-300 hover:-translate-y-1 hover:shadow-[#ff184e]/20"
          >
            <article className="flex min-h-[360px] flex-col justify-between rounded-[1.5rem] border border-white/15 bg-black/20 p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-black/35 px-3 py-1 text-xs font-black uppercase tracking-[0.14em]">
                  Featured
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-black">
                  {featuredPost.readTime}
                </span>
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-white/55">
                  {featuredPost.category}
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-black leading-[1.02] tracking-[-0.04em] sm:text-4xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72">
                  {featuredPost.excerpt}
                </p>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.14em] text-white transition group-hover:text-[#ff9bb2]">
                  Read article
                </p>
              </div>
            </article>
          </Link>
        </section>

        <section className="grid gap-4 pb-16 md:grid-cols-3">
          {supportingPosts.map((post) => (
            <Link
              key={post.title}
              href={`/blog/${post.slug}`}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-[#ff184e]/40 hover:bg-white/[0.09]"
            >
              <div className="mb-8 flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#ff184e]/20 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#ff9bb2]">
                  {post.category}
                </span>
                <span className="text-xs font-semibold text-white/40">
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-2xl font-black leading-tight tracking-[-0.035em]">
                {post.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/58">
                {post.excerpt}
              </p>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-white/45 transition group-hover:text-[#ff9bb2]">
                Open story note
              </p>
            </Link>
          ))}
        </section>

        <section className="pb-20">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-5 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-black tracking-[-0.04em]">
                Current research rails
              </h2>
              <span className="text-sm font-semibold text-white/45">
                Topics to turn into posts
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {dramaRails.map((rail) => (
                <div
                  key={rail.title}
                  className="rounded-3xl border border-white/10 bg-black/25 p-5"
                >
                  <h3 className="text-xl font-black">{rail.title}</h3>
                  <div className="mt-4 space-y-2">
                    {rail.shows.map((show) => (
                      <p key={show} className="text-sm text-white/55">
                        {show}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
