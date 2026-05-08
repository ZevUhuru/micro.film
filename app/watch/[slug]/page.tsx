import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FilmStrip, FilmStripBadge } from "@/components/FilmStrip";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getFilm, listFilms, type FilmScene, type FilmTrailer } from "@/lib/films";
import { CONTACT_HREF } from "@/lib/workflow";

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
      type: "video.movie",
    },
  };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { slug } = await params;
  const film = getFilm(slug);

  if (!film) {
    notFound();
  }

  const currentScene = film.scenes[0];
  const totalScenes = film.scenes.length;
  const releasedCount = film.scenes.filter((scene) => scene.released).length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <BackgroundLight />
      <SiteHeader active="home" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-8">
        <Breadcrumb filmTitle={film.title} sceneNumber={currentScene.number} />

        <section className="grid gap-8 pt-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <PlayerColumn film={film} scene={currentScene} />
          <DetailColumn
            film={film}
            currentScene={currentScene}
            totalScenes={totalScenes}
            releasedCount={releasedCount}
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
  scene,
}: {
  film: ReturnType<typeof getFilm> & object;
  scene: FilmScene;
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
            aria-label={`Micro scene ${scene.number}: ${scene.title}`}
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
              <span>Micro scene {String(scene.number).padStart(2, "0")} · {scene.duration}</span>
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
                aria-label="Play micro scene 1"
                className="grid size-14 place-items-center rounded-full bg-[var(--paper)] text-[var(--ink)] shadow-[0_18px_60px_rgba(0,0,0,0.6)] transition hover:bg-[var(--amber-soft)]"
              >
                <PlayIcon />
              </button>
              <div className="text-right font-mono text-[11px] uppercase tracking-[0.22em] text-white/75">
                <p className="serif text-base leading-tight text-white/95">
                  {scene.title}
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
  currentScene,
  totalScenes,
  releasedCount,
}: {
  film: ReturnType<typeof getFilm> & object;
  currentScene: FilmScene;
  totalScenes: number;
  releasedCount: number;
}) {
  return (
    <div className="space-y-8">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
          {film.studio}
        </p>
        <FilmStripBadge label={film.genre} />
        <h1 className="serif mt-5 text-balance text-5xl leading-[1.04] sm:text-6xl">
          {film.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--foreground)]/70">
          {film.tagline}
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/50">
          {film.totalDuration} · {totalScenes} micro scenes · {releasedCount} out today
        </p>
      </header>

      <section>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
          Plot
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

      <ShowcasePanel />

      <SceneGrid
        scenes={film.scenes}
        trailer={film.trailer}
        currentNumber={currentScene.number}
        totalScenes={totalScenes}
        releasedCount={releasedCount}
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

function ShowcasePanel() {
  return (
    <section
      aria-label="Use the studio for your own film"
      className="rounded-3xl border border-[var(--amber)]/30 bg-[radial-gradient(circle_at_30%_20%,rgba(232,184,106,0.18),transparent_60%),linear-gradient(180deg,#1a1612,#0c0a08)] p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-md">
          <FilmStripBadge label="Built on micro.film" />
          <h2 className="serif mt-4 text-3xl leading-tight">
            Want a micro film like this for your campaign?
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/70">
            This piece was made end to end on the platform. Run the studio
            yourself, or hand us the brief and we&rsquo;ll build the film
            with you.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:items-end">
          <Link
            href="/studio"
            className="rounded-full bg-[var(--paper)] px-6 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--amber-soft)]"
          >
            Open the studio
          </Link>
          <Link
            href={CONTACT_HREF}
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-white/5"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}

type TileStatus = "trailer" | "current" | "released" | "upcoming";

type TileData = {
  number: number;
  title: string;
  duration: string;
  status: TileStatus;
};

function SceneGrid({
  scenes,
  trailer,
  currentNumber,
  totalScenes,
  releasedCount,
}: {
  scenes: ReadonlyArray<FilmScene>;
  trailer?: FilmTrailer;
  currentNumber: number;
  totalScenes: number;
  releasedCount: number;
}) {
  const upcomingCount = totalScenes - releasedCount;

  const tiles: TileData[] = [];
  if (trailer) {
    tiles.push({
      number: 0,
      title: "Trailer",
      duration: trailer.duration,
      status: "trailer",
    });
  }
  for (const scene of scenes) {
    const isCurrent = scene.number === currentNumber;
    tiles.push({
      number: scene.number,
      title: scene.title,
      duration: scene.duration,
      status: isCurrent ? "current" : scene.released ? "released" : "upcoming",
    });
  }

  return (
    <section aria-label="Micro scenes">
      <header className="flex items-end justify-between">
        <div>
          <h2 className="serif text-2xl leading-tight">All micro scenes</h2>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
            {totalScenes} micro scenes · {releasedCount} out · {upcomingCount} coming soon
            {trailer ? " · trailer" : null}
          </p>
        </div>
        <nav
          aria-label="Micro scene tabs"
          className="hidden items-center gap-2 sm:flex"
        >
          <span className="rounded-full bg-[var(--paper)] px-3 py-1 text-xs font-medium text-[var(--ink)]">
            {trailer ? "00" : "01"} — {String(totalScenes).padStart(2, "0")}
          </span>
        </nav>
      </header>

      <ul className="mt-6 grid grid-cols-3 gap-3">
        {tiles.map((tile) => (
          <li key={tile.number}>
            <SceneTile tile={tile} />
          </li>
        ))}
      </ul>

      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/45">
        Released on a rolling cadence — the rest of the film drops over the coming weeks
      </p>
    </section>
  );
}

function SceneTile({ tile }: { tile: TileData }) {
  const baseClasses =
    "group relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-xl border p-3 text-left transition";

  const stateClasses =
    tile.status === "current"
      ? "border-[var(--amber)]/55 bg-[radial-gradient(circle_at_30%_20%,rgba(232,184,106,0.25),transparent_55%),linear-gradient(180deg,#1a1612,#0c0a08)] text-[var(--foreground)]"
      : tile.status === "trailer"
        ? "border-[var(--amber)]/35 bg-[radial-gradient(circle_at_70%_85%,rgba(232,184,106,0.12),transparent_60%)] text-[var(--foreground)] hover:-translate-y-0.5 hover:border-[var(--amber)]/65"
        : tile.status === "released"
          ? "border-white/12 bg-white/[0.04] text-[var(--foreground)] hover:-translate-y-0.5 hover:border-[var(--amber)]/45"
          : "border-white/10 bg-[var(--background)] text-[var(--foreground)]/55";

  const ariaLabel =
    tile.status === "trailer"
      ? `Trailer · ${tile.duration}`
      : `Micro scene ${tile.number}: ${tile.title}`;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={tile.title}
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
          {String(tile.number).padStart(2, "0")}
        </span>
        {tile.status === "trailer" ? (
          <span className="rounded-sm border border-[var(--amber)]/55 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--amber-soft)]">
            Trailer
          </span>
        ) : tile.status === "upcoming" ? (
          <span className="flex items-center gap-1 rounded-sm bg-white/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--foreground)]/75">
            <ClockIcon />
            Soon
          </span>
        ) : tile.status === "current" ? (
          <span className="rounded-sm bg-[var(--amber)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--ink)]">
            Now
          </span>
        ) : (
          <span className="rounded-sm bg-[var(--paper)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--ink)]">
            Out
          </span>
        )}
      </div>

      <p className="line-clamp-2 text-[11px] leading-snug text-[var(--foreground)]/60 group-hover:text-[var(--foreground)]/80">
        {tile.title}
      </p>
    </button>
  );
}

function Breadcrumb({
  filmTitle,
  sceneNumber,
}: {
  filmTitle: string;
  sceneNumber: number;
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
        {filmTitle}
      </Link>
      <span aria-hidden="true">/</span>
      <span className="text-[var(--foreground)]">
        Micro scene {sceneNumber}
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

function ClockIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
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
