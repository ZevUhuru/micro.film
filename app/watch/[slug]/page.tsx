import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getFilm, listFilms } from "@/lib/films";
import { FilmStage } from "./film-stage";

type WatchPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listFilms().map((film) => ({ slug: film.slug }));
}

export async function generateMetadata({
  params,
}: WatchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const film = getFilm(slug);

  if (!film) {
    return { title: "Film not found" };
  }

  const ogImage = film.cover
    ? [
        {
          url: film.cover.src,
          width: film.cover.width,
          height: film.cover.height,
          alt: film.cover.alt,
        },
      ]
    : undefined;

  return {
    title: film.title,
    description: film.tagline + " " + film.plot,
    alternates: { canonical: `/watch/${film.slug}` },
    openGraph: {
      title: `${film.title} — micro.film`,
      description: film.plot,
      url: `https://micro.film/watch/${film.slug}`,
      siteName: "micro.film",
      type: "video.movie",
      images: ogImage,
    },
  };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { slug } = await params;
  const film = getFilm(slug);

  if (!film) {
    notFound();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <BackgroundLight />
      <SiteHeader active="home" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-8">
        <Breadcrumb filmTitle={film.title} />
        <FilmStage film={film} />
      </main>

      <SiteFooter />
    </div>
  );
}

function Breadcrumb({ filmTitle }: { filmTitle: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55"
    >
      <Link href="/" className="transition hover:text-[var(--foreground)]">
        Home
      </Link>
      <span aria-hidden="true">/</span>
      <span className="text-[var(--foreground)]" aria-current="page">
        {filmTitle}
      </span>
    </nav>
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
