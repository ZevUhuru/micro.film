import Image from "next/image";
import Link from "next/link";
import { FilmStrip, FilmStripBadge } from "@/components/FilmStrip";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getFilm } from "@/lib/films";
import {
  ASPECT_RATIO,
  CONTACT_HREF,
  FILM_MAX_DURATION_LABEL,
  filmConcepts,
  platforms,
  SCENE_DURATION_RANGE,
  testimonials,
  useCases,
  workflowSteps,
} from "@/lib/workflow";

const featuredFilm = getFilm("the-window-across-the-way");

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <BackgroundLight />

      <SiteHeader active="home" />

      <main className="relative z-10">
        <Hero />
        <FilmStripDivider />
        <Concepts />
        <Pipeline />
        <ShareToPlatforms />
        <UseCases />
        <Words />
        <CTA />
      </main>

      <SiteFooter />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sections                                                                   */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 lg:pb-28 lg:pt-20">
      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <FilmStripBadge label="Now showing — v0.1" />
          <h1 className="mt-7 max-w-2xl text-balance text-5xl font-normal leading-[1.02] tracking-[-0.02em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
            <span className="serif italic">Make</span> a micro film.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--foreground)]/65">
            A studio for the form,{" "}
            <span className="text-[var(--foreground)]/85">
              built for the AI era.
            </span>{" "}
            For brands, agencies, publishers, and independent filmmakers.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/studio"
              className="rounded-full bg-[var(--paper)] px-6 py-3.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--amber-soft)]"
            >
              Open the studio
            </Link>
            <Link
              href="/commercial"
              className="rounded-full border border-[var(--amber)]/35 bg-[var(--amber)]/10 px-6 py-3.5 text-sm font-medium text-[var(--amber-soft)] transition hover:bg-[var(--amber)]/15"
            >
              Commercial work →
            </Link>
            <Link
              href="/watch/the-window-across-the-way"
              className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-white/5"
            >
              Watch The Window Across the Way →
            </Link>
            <Link
              href={CONTACT_HREF}
              className="rounded-full px-6 py-3.5 text-sm font-medium text-[var(--foreground)]/75 transition hover:text-[var(--foreground)]"
            >
              Talk to us
            </Link>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8 text-sm">
            <Stat term="Film" value={FILM_MAX_DURATION_LABEL} />
            <Stat term="Micro scene" value={SCENE_DURATION_RANGE} />
            <Stat term="Format" value={ASPECT_RATIO} />
          </dl>
        </div>

        <HeroFilmCard />
      </div>
    </section>
  );
}

function Stat({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dd className="serif text-3xl text-[var(--foreground)]">{value}</dd>
      <dt className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/45">
        {term}
      </dt>
    </div>
  );
}

function HeroFilmCard() {
  const film = featuredFilm;
  const cover = film?.cover;
  const href = film ? `/watch/${film.slug}` : "/watch/the-window-across-the-way";
  const title = film?.title ?? "The Window Across the Way";

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(circle_at_30%_30%,rgba(232,184,106,0.18),transparent_60%)] blur-2xl"
      />
      <FilmStrip className="relative rounded-[2rem]">
        <Link
          href={href}
          aria-label={`Watch ${title}`}
          className="block overflow-hidden rounded-2xl bg-gradient-to-b from-[#3b2a1d] via-[#1c130e] to-[#0c0a08] p-1 transition hover:opacity-95"
        >
          <article className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/10 bg-black">
            {cover ? (
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                sizes="(min-width: 1024px) 480px, (min-width: 640px) 60vw, 92vw"
                className="object-cover"
                priority
              />
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(241,207,148,0.4),transparent_55%)]"
              />
            )}
          </article>
        </Link>
      </FilmStrip>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className="rounded-xl border border-white/10 bg-white/[0.03] py-3"
          >
            {platform.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function FilmStripDivider() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-6xl px-5 sm:px-8">
      <FilmStrip
        edges="both"
        className="rounded-md"
        holes={28}
      >
        <div className="h-6" />
      </FilmStrip>
    </div>
  );
}

function Concepts() {
  return (
    <section
      id="concepts"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28"
    >
      <SectionHeader
        eyebrow="From Micro Film Studios"
        title="Three films. A handful of micro scenes each."
        copy="Each frame below was treated like a real shot: lens, light, blocking. Every film runs under ten minutes — built end to end on the same platform you have access to."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {filmConcepts.map((film, index) => {
          const slug = "slug" in film ? film.slug : undefined;
          const linkedFilm = slug ? getFilm(slug) : undefined;
          const cover = linkedFilm?.cover;
          const filmNumber = `Film ${String(index + 1).padStart(2, "0")}`;
          const meta = `${film.runtime} · ${film.scenes} micro scenes`;

          const cardInner = cover ? (
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-black">
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 33vw, 92vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-black/15">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_52%_26%,rgba(244,238,226,0.12),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.28))]"
              />
            </div>
          );

          const cardCaption = (
            <div className="mt-3 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(244,238,226,0.055),rgba(244,238,226,0.02))] p-4 shadow-[0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur">
              <div className="flex items-start justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/48">
                <span>{filmNumber}</span>
                <span className="text-right">{meta}</span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
                    {film.genre}
                  </p>
                  <h3 className="serif mt-2 text-2xl leading-tight text-[var(--foreground)]">
                    {film.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--foreground)]/65">
                    {film.logline}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-[var(--amber)]/35 bg-[var(--amber)]/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--amber-soft)] shadow-[0_0_24px_rgba(232,184,106,0.12)]">
                  {slug ? "Watch" : "Soon"}
                </span>
              </div>
            </div>
          );

          const cardShell = (
            <article className="group">
              <div
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b ${film.tone} p-1 shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition group-hover:border-[var(--amber)]/35`}
              >
                {cardInner}
              </div>
              {cardCaption}
            </article>
          );

          return slug ? (
            <Link
              key={film.title}
              href={`/watch/${slug}`}
              aria-label={`Watch ${film.title}`}
              className="block transition hover:opacity-95"
            >
              {cardShell}
            </Link>
          ) : (
            <div key={film.title}>{cardShell}</div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--amber)]/25 bg-[var(--amber)]/[0.06] p-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
            Now playing
          </p>
          <p className="serif mt-2 text-2xl leading-tight">
            The Window Across the Way · Eight micro scenes · 9 min 55 sec
          </p>
        </div>
        <Link
          href="/watch/the-window-across-the-way"
          className="rounded-full bg-[var(--paper)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--amber-soft)]"
        >
          Watch the film →
        </Link>
      </div>
    </section>
  );
}

function Pipeline() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeader
        eyebrow="The pipeline"
        title="Research. Develop. Generate. Stitch."
        copy="One opinionated workflow from a blank slate to a finished micro film. The studio gets out of the way so the film can come together."
      />

      <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {workflowSteps.map((step) => (
          <li
            key={step.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
              Step {step.eyebrow}
            </p>
            <h3 className="serif mt-5 text-3xl leading-tight">{step.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/65">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ShareToPlatforms() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <FilmStripBadge label="Distribution" />
            <h2 className="serif mt-5 max-w-md text-4xl leading-tight">
              One source cut. Every surface.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--foreground)]/65">
              Vertical 9:16 by default. The same finished cut delivers
              trailer micro scenes for TikTok, YouTube Shorts, and Instagram
              Reels, a hero piece for a campaign landing page, and a
              serialized run on a publisher&rsquo;s vertical channel.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="rounded-2xl border border-white/10 bg-[var(--background)] p-5"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/45">
                  {platform.aspect} · {platform.duration}
                </p>
                <h3 className="serif mt-4 text-2xl leading-tight">
                  {platform.name}
                </h3>
                <p className="mt-3 font-mono text-[12px] text-[var(--foreground)]/55">
                  {platform.handle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeader
        eyebrow="Who it is for"
        title="A studio for cinematic micro films."
        copy="micro.film fits whoever wants a real frame instead of a placeholder."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {useCases.map((use) => (
          <div
            key={use.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
              For
            </p>
            <h3 className="serif mt-4 text-2xl leading-tight">{use.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground)]/60">
              {use.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Words() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((quote) => (
          <figure
            key={quote.quote}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--film-edge)] p-8"
          >
            <span
              aria-hidden="true"
              className="serif absolute -left-2 -top-6 text-[120px] leading-none text-[var(--amber)]/25"
            >
              ”
            </span>
            <blockquote className="serif relative text-2xl leading-snug text-[var(--foreground)]">
              {quote.quote}
            </blockquote>
            <figcaption className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
              {quote.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 lg:pb-28">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_18%_30%,rgba(232,184,106,0.22),transparent_55%),linear-gradient(180deg,#1a1612,#0c0a08)] p-10 sm:p-14">
        <FilmStripBadge label="Roll camera" />
        <h2 className="serif mt-6 max-w-2xl text-balance text-5xl leading-tight sm:text-6xl">
          Open the studio. Or commission us to build the film with you.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-7 text-[var(--foreground)]/65">
          Brands, agencies, publishers, and filmmakers run the pipeline
          themselves in the studio — or hand us the brief and pick up the
          finished cut. Either way, you end with a real micro film.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/studio"
            className="rounded-full bg-[var(--paper)] px-6 py-3.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--amber-soft)]"
          >
            Open the studio
          </Link>
          <Link
            href={CONTACT_HREF}
            className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-white/5"
          >
            Talk to us
          </Link>
          <Link
            href="/blog"
            className="rounded-full px-6 py-3.5 text-sm font-medium text-[var(--foreground)]/75 transition hover:text-[var(--foreground)]"
          >
            Read the notes
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared bits                                                                */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[0.55fr_0.45fr] md:items-end">
      <div>
        <FilmStripBadge label={eyebrow} />
        <h2 className="serif mt-5 max-w-xl text-balance text-4xl leading-tight sm:text-5xl">
          {title}
        </h2>
      </div>
      <p className="max-w-md text-sm leading-7 text-[var(--foreground)]/60 md:text-base md:leading-8">
        {copy}
      </p>
    </div>
  );
}

function BackgroundLight() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_-10%,rgba(232,184,106,0.16),transparent_38%),radial-gradient(circle_at_82%_8%,rgba(177,58,58,0.12),transparent_30%)]"
      />
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-0"
      />
    </>
  );
}
