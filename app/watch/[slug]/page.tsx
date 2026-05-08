import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FilmStrip, FilmStripBadge } from "@/components/FilmStrip";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getFilm, listFilms, type FilmEpisode } from "@/lib/films";

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

  return {
    title: film.title,
    description: film.tagline + " " + film.plot,
    alternates: { canonical: `/watch/${film.slug}` },
    openGraph: {
      title: `${film.title} — micro.film`,
      description: film.plot,
      url: `https://micro.film/watch/${film.slug}`,
      siteName: "micro.film",
      type: "video.episode",
    },
  };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { slug } = await params;
  const film = getFilm(slug);

  if (!film) {
    notFound();
  }

  const currentEpisode = film.episodes[0];
  const totalEpisodes = film.episodes.length;
  const freeCount = film.episodes.filter((episode) => episode.free).length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <BackgroundLight />
      <SiteHeader active="home" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-8">
        <Breadcrumb seriesTitle={film.title} episodeNumber={currentEpisode.number} />

        <section className="grid gap-8 pt-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <PlayerColumn film={film} episode={currentEpisode} />
          <DetailColumn
            film={film}
            currentEpisode={currentEpisode}
            totalEpisodes={totalEpisodes}
            freeCount={freeCount}
          />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Player column                                                              */
/* -------------------------------------------------------------------------- */

function PlayerColumn({
  film,
  episode,
}: {
  film: ReturnType<typeof getFilm> & object;
  episode: FilmEpisode;
}) {
  return (
    <div className="lg:sticky lg:top-6">
      <div className="flex items-center gap-3 pb-4">
        <Link
          href="/"
          aria-label="Back to micro.film home"
          className="grid size-10 place-items-center rounded-full border border-white/15 text-[var(--foreground)] transition hover:bg-white/5"
        >
          <ArrowLeftIcon />
        </Link>
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
          Now playing
        </div>
      </div>

      <FilmStrip className="rounded-[1.4rem]" holes={18}>
        <div className="overflow-hidden rounded-[1.05rem] bg-[var(--ink)] p-1">
          <article
            aria-label={`Episode ${episode.number}: ${episode.title}`}
            className={`relative grid aspect-[9/16] w-full place-items-end overflow-hidden rounded-xl bg-gradient-to-b ${film.posterTone}`}
          >
            {/* Layered cinematic light + vignette */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(241,207,148,0.32),transparent_50%),radial-gradient(circle_at_18%_82%,rgba(177,58,58,0.18),transparent_55%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.0)_38%,rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.92)_100%)]"
            />

            {/* Top HUD */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/85">
              <span>EP {String(episode.number).padStart(2, "0")} · {episode.duration}</span>
              <span>9:16</span>
            </div>

            {/* Center subtitle (caption) */}
            <div className="relative z-10 mb-24 w-full px-6 text-center">
              <p className="serif text-2xl leading-snug text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] sm:text-3xl">
                {film.openingCaption}
              </p>
            </div>

            {/* Bottom controls */}
            <div className="relative z-10 flex w-full items-end justify-between p-5">
              <button
                type="button"
                aria-label="Play episode 1"
                className="grid size-14 place-items-center rounded-full bg-[var(--paper)] text-[var(--ink)] shadow-[0_18px_60px_rgba(0,0,0,0.6)] transition hover:bg-[var(--amber-soft)]"
              >
                <PlayIcon />
              </button>
              <div className="text-right font-mono text-[11px] uppercase tracking-[0.22em] text-white/75">
                <p className="serif text-base leading-tight text-white/95">
                  {episode.title}
                </p>
                <p className="mt-1">Tap to play</p>
              </div>
            </div>
          </article>
        </div>
      </FilmStrip>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] py-3">TikTok</div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] py-3">Shorts</div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] py-3">Reels</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Detail column                                                              */
/* -------------------------------------------------------------------------- */

function DetailColumn({
  film,
  currentEpisode,
  totalEpisodes,
  freeCount,
}: {
  film: ReturnType<typeof getFilm> & object;
  currentEpisode: FilmEpisode;
  totalEpisodes: number;
  freeCount: number;
}) {
  return (
    <div className="space-y-8">
      <header>
        <FilmStripBadge label={film.genre} />
        <h1 className="serif mt-5 text-balance text-5xl leading-[1.04] sm:text-6xl">
          {film.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--foreground)]/70">
          {film.tagline}
        </p>
      </header>

      <section>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
          Plot — Episode {currentEpisode.number}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--foreground)]/72">
          {film.plot}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {film.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[var(--foreground)]/70"
            >
              {tag}
            </li>
          ))}
          <li className="rounded-full border border-[var(--amber)]/30 bg-[var(--amber)]/10 px-3 py-1 text-xs text-[var(--amber-soft)]">
            {film.audience}
          </li>
        </ul>
      </section>

      <ActionRow stats={film.stats} />

      <EpisodeGrid
        episodes={film.episodes}
        currentNumber={currentEpisode.number}
        totalEpisodes={totalEpisodes}
        freeCount={freeCount}
      />
    </div>
  );
}

function ActionRow({
  stats,
}: {
  stats: { likes: string; saves: string };
}) {
  return (
    <section
      aria-label="Engagement"
      className="grid grid-cols-3 gap-3 border-y border-white/10 py-5 text-center"
    >
      <button
        type="button"
        className="group flex flex-col items-center gap-1 text-[var(--foreground)]/70 transition hover:text-[var(--foreground)]"
      >
        <HeartIcon />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em]">
          {stats.likes}
        </span>
      </button>
      <button
        type="button"
        className="group flex flex-col items-center gap-1 text-[var(--foreground)]/70 transition hover:text-[var(--foreground)]"
      >
        <BookmarkIcon />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em]">
          {stats.saves}
        </span>
      </button>
      <button
        type="button"
        className="group flex flex-col items-center gap-1 text-[var(--foreground)]/70 transition hover:text-[var(--foreground)]"
      >
        <ShareIcon />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em]">
          Share
        </span>
      </button>
    </section>
  );
}

function EpisodeGrid({
  episodes,
  currentNumber,
  totalEpisodes,
  freeCount,
}: {
  episodes: ReadonlyArray<FilmEpisode>;
  currentNumber: number;
  totalEpisodes: number;
  freeCount: number;
}) {
  return (
    <section aria-label="Episodes">
      <header className="flex items-end justify-between">
        <div>
          <h2 className="serif text-2xl leading-tight">All episodes</h2>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
            {totalEpisodes} films · {freeCount} free
          </p>
        </div>
        <nav
          aria-label="Episode tabs"
          className="hidden items-center gap-2 sm:flex"
        >
          <span className="rounded-full bg-[var(--paper)] px-3 py-1 text-xs font-medium text-[var(--ink)]">
            01 — {String(totalEpisodes).padStart(2, "0")}
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-[var(--foreground)]/65">
            Coming soon
          </span>
        </nav>
      </header>

      <ul className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-6">
        {episodes.map((episode) => {
          const isCurrent = episode.number === currentNumber;
          const status: "current" | "free" | "locked" = isCurrent
            ? "current"
            : episode.free
              ? "free"
              : "locked";

          return (
            <li key={episode.number}>
              <EpisodeTile episode={episode} status={status} />
            </li>
          );
        })}
      </ul>

      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/45">
        Free episodes 01 – 03 · Unlock the rest with a pass
      </p>
    </section>
  );
}

function EpisodeTile({
  episode,
  status,
}: {
  episode: FilmEpisode;
  status: "current" | "free" | "locked";
}) {
  const baseClasses =
    "group relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-xl border p-3 text-left transition";

  const stateClasses =
    status === "current"
      ? "border-[var(--amber)]/55 bg-[radial-gradient(circle_at_30%_20%,rgba(232,184,106,0.25),transparent_55%),linear-gradient(180deg,#1a1612,#0c0a08)] text-[var(--foreground)]"
      : status === "free"
        ? "border-white/12 bg-white/[0.04] text-[var(--foreground)] hover:-translate-y-0.5 hover:border-[var(--amber)]/45"
        : "border-white/10 bg-[var(--background)] text-[var(--foreground)]/55";

  return (
    <button
      type="button"
      aria-label={`Episode ${episode.number}: ${episode.title}`}
      title={episode.title}
      className={`${baseClasses} ${stateClasses}`}
    >
      {/* Sprocket edge motif on the top */}
      <span
        aria-hidden="true"
        className="absolute inset-x-2 top-0 flex h-1.5 items-center justify-around"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={index}
            className="h-1 w-1.5 rounded-[1px] bg-[var(--background)]"
          />
        ))}
      </span>

      <div className="flex items-center justify-between">
        <span className="serif text-2xl leading-none">
          {String(episode.number).padStart(2, "0")}
        </span>
        {status === "locked" ? (
          <span
            aria-hidden="true"
            className="grid size-6 place-items-center rounded-full bg-[var(--crimson)] text-white"
          >
            <LockIcon />
          </span>
        ) : status === "current" ? (
          <span className="rounded-sm bg-[var(--amber)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--ink)]">
            Now
          </span>
        ) : (
          <span className="rounded-sm bg-[var(--paper)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--ink)]">
            Free
          </span>
        )}
      </div>

      <p className="line-clamp-2 text-[11px] leading-snug text-[var(--foreground)]/60 group-hover:text-[var(--foreground)]/80">
        {episode.title}
      </p>
    </button>
  );
}

function Breadcrumb({
  seriesTitle,
  episodeNumber,
}: {
  seriesTitle: string;
  episodeNumber: number;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55"
    >
      <Link href="/" className="transition hover:text-[var(--foreground)]">
        Home
      </Link>
      <span aria-hidden="true">/</span>
      <Link href="/" className="transition hover:text-[var(--foreground)]">
        {seriesTitle}
      </Link>
      <span aria-hidden="true">/</span>
      <span className="text-[var(--foreground)]">
        Episode {episodeNumber}
      </span>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Icons (inline SVG so we avoid extra deps)                                  */
/* -------------------------------------------------------------------------- */

function ArrowLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7 5v14l12-7z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
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
