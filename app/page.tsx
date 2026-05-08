import Link from "next/link";
import { FilmStrip, FilmStripBadge } from "@/components/FilmStrip";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import {
  filmConcepts,
  platforms,
  testimonials,
  useCases,
  workflowSteps,
} from "@/lib/workflow";

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
            <span className="serif italic">Make</span> a micro film.{" "}
            <span className="text-[var(--foreground)]/60">
              Share it everywhere a phone fits.
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--foreground)]/65">
            Cast a character, write a fifteen-second scene, render a cinematic
            vertical clip. Post it to TikTok, YouTube Shorts, and Instagram
            Reels in one move.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/studio"
              className="rounded-full bg-[var(--paper)] px-6 py-3.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--amber-soft)]"
            >
              Start a film
            </Link>
            <Link
              href="#concepts"
              className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-white/5"
            >
              See sample films
            </Link>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8 text-sm">
            <Stat term="Runtime" value="15s" />
            <Stat term="Format" value="9:16" />
            <Stat term="Steps" value="3" />
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
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(circle_at_30%_30%,rgba(232,184,106,0.18),transparent_60%)] blur-2xl"
      />
      <FilmStrip className="relative rounded-[2rem]">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-[#3b2a1d] via-[#1c130e] to-[#0c0a08] p-1">
          <article className="relative grid aspect-[9/16] w-full place-items-end overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_70%_25%,rgba(241,207,148,0.4),transparent_55%)] p-5">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(0,0,0,0.78)_92%)]"
            />
            <div className="relative flex w-full items-end justify-between text-xs text-[var(--foreground)]/85">
              <div className="font-mono uppercase tracking-[0.22em]">
                Scene 01
              </div>
              <div className="font-mono uppercase tracking-[0.22em]">
                00:15
              </div>
            </div>
            <div className="relative w-full">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--amber-soft)]">
                Last Light on Sunset
              </p>
              <h2 className="serif mt-2 text-3xl leading-tight text-[var(--foreground)] sm:text-4xl">
                She closes the case as the streetlights flicker on.
              </h2>
            </div>
          </article>
        </div>
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
        eyebrow="Sample reel"
        title="Three films, written in an afternoon."
        copy="Each frame below was treated like a real shot: lens, light, blocking. The product helps you make those choices fast."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {filmConcepts.map((film, index) => (
          <article
            key={film.title}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b ${film.tone} p-1`}
          >
            <div className="flex aspect-[3/4] flex-col justify-between rounded-xl border border-white/10 bg-black/15 p-5">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/65">
                <span>Reel {String(index + 1).padStart(2, "0")}</span>
                <span>{film.runtime} · {film.aspect}</span>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
                  {film.genre}
                </p>
                <h3 className="serif mt-3 text-3xl leading-tight text-[var(--foreground)]">
                  {film.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[var(--foreground)]/70">
                  {film.logline}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Pipeline() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeader
        eyebrow="The pipeline"
        title="Cast. Write. Render."
        copy="A single, opinionated workflow. The product gets out of the way so the film can come together."
      />

      <ol className="mt-12 grid gap-4 md:grid-cols-3">
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
              One render. Three timelines.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--foreground)]/65">
              Vertical 9:16 by default. The same file is ready for TikTok,
              YouTube Shorts, and Instagram Reels with platform-aware captions
              and safe areas.
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
        title="A studio for short, cinematic moments."
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
          Open the studio and ship your first film tonight.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-7 text-[var(--foreground)]/65">
          Cast, write, render, share. The whole loop is built for one
          afternoon, not one quarter.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/studio"
            className="rounded-full bg-[var(--paper)] px-6 py-3.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--amber-soft)]"
          >
            Start a film
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-white/5"
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
