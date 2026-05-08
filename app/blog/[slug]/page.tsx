import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/workflow";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
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

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen overflow-hidden bg-[#08080b] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(244,63,94,0.28),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(250,204,21,0.11),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.07),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-5 sm:px-6">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-[#ff184e] font-black tracking-tighter shadow-[0_16px_40px_rgba(255,24,78,0.35)]">
              mf
            </span>
            <span className="text-lg font-black tracking-tight">micro.film</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              href="/blog"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-black text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              Blog
            </Link>
            <Link
              href="/studio"
              className="rounded-full bg-white px-4 py-2 text-sm font-black text-black transition hover:bg-rose-100"
            >
              Studio
            </Link>
          </nav>
        </header>

        <article className="py-14">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
            <div>
              <Link
                href="/blog"
                className="text-sm font-black uppercase tracking-[0.18em] text-[#ff9bb2] transition hover:text-white"
              >
                Back to blog
              </Link>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#ff184e]/20 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#ff9bb2]">
                  {post.category}
                </span>
                <span className="text-sm font-semibold text-white/45">
                  {post.readTime}
                </span>
              </div>
              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl">
                {post.title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-8 text-white/68">
                {post.deck}
              </p>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-b from-[#ff315f] via-[#621126] to-black p-4 shadow-2xl shadow-black/35">
              <div className="flex aspect-[3/4] flex-col justify-between rounded-[1.5rem] border border-white/15 bg-black/20 p-5">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.16em]">
                  <span>micro note</span>
                  <span>9:16</span>
                </div>
                <div>
                  <p className="text-sm text-white/58">Episode craft</p>
                  <p className="mt-2 text-3xl font-black leading-none tracking-[-0.04em]">
                    Hook. Turn. Cut.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.72fr_0.28fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 sm:p-8">
              <p className="border-b border-white/10 pb-6 text-lg leading-8 text-white/72">
                {post.excerpt}
              </p>

              <div className="mt-8 space-y-10">
                {post.content.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl font-black tracking-[-0.035em]">
                      {section.heading}
                    </h2>
                    <p className="mt-4 text-base leading-8 text-white/62">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white/45">
                  Scene prompt takeaway
                </p>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  Build every short clip around one visible power shift and one
                  question the viewer needs answered.
                </p>
              </div>
              <div className="rounded-[2rem] border border-[#ff184e]/25 bg-[#ff184e]/12 p-5">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff9bb2]">
                  Try it
                </p>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  Turn this note into a cast, character sheet, and first
                  15-second scene in the studio.
                </p>
                <Link
                  href="/studio"
                  className="mt-5 inline-flex rounded-full bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-rose-100"
                >
                  Open studio
                </Link>
              </div>
            </aside>
          </div>
        </article>

        <section className="pb-20">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-[-0.04em]">
              More notes
            </h2>
            <Link href="/blog" className="text-sm font-black text-white/45">
              View all
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-[#ff184e]/40 hover:bg-white/[0.09]"
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#ff9bb2]">
                  {relatedPost.category}
                </p>
                <h3 className="mt-4 text-xl font-black leading-tight tracking-[-0.03em]">
                  {relatedPost.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
