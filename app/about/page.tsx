import type { Metadata } from "next";
import Link from "next/link";
import { FilmStrip, FilmStripBadge } from "@/components/FilmStrip";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import {
  CONTACT_HREF,
  FILM_MAX_DURATION,
  FILM_MAX_DURATION_LABEL,
  SCENE_DURATION_RANGE,
} from "@/lib/workflow";

export const metadata: Metadata = {
  title: "About — What is a micro film?",
  description:
    "A micro film (Chinese: 微电影) is a short, complete vertical film designed for mobile and online platforms. The standard form runs 8–15 minutes; on micro.film we cap at ten so every film stays watchable in a single sitting.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About micro.film — What is a micro film?",
    description:
      "The micro film, defined. The form was born online in 2010 with Old Boys and On the Brink, formalized as 8–15 minutes by the Baidu Baike encyclopedia, and shaped into a vertical, mobile-first format. micro.film and Micro Film Studios sit inside that lineage.",
    url: "https://micro.film/about",
    siteName: "micro.film",
    type: "article",
  },
};

const baiduWiki = "https://baike.baidu.com/en/item/Micro%20Film/1503431";

const fourMicros = [
  {
    label: "Micro duration",
    detail: "8–15 minutes is the standard. Industry critics already place the practical cap at 10 — which is exactly where we sit.",
  },
  {
    label: "Micro production cycle",
    detail: "1–7 days, sometimes a few weeks. The form is built to be made, not to be developed indefinitely.",
  },
  {
    label: "Micro-scale investment",
    detail: "From a few thousand to a few tens of thousands. The barrier to entry is low on purpose.",
  },
  {
    label: "Micro platform",
    detail: "Distributed via mobile terminals — phones, tablets — and online video platforms first. Vertical 9:16 by default.",
  },
] as const;

const filmTypes = [
  "Grassroots Spoof",
  "Youth Romance",
  "Inspirational Struggle",
  "Ancient Style",
  "Touching Family",
  "Aesthetic Scenery",
] as const;

const timeline = [
  {
    year: "2010",
    title: "The Micro Film First Year",
    body: "Old Boys (Chopsticks Brothers) and On the Brink open the era. A 90-second cut of On the Brink shows that small budgets can hold cinematic stakes.",
  },
  {
    year: "2011",
    title: "The craze",
    body: "The Micro Film boom sweeps the Chinese film and television industry. Web platforms commission original work to differentiate from rising licensing costs.",
  },
  {
    year: "2014",
    title: "Maturity",
    body: "The form goes commercial. Brands begin commissioning bespoke micro films instead of buying placement in conventional ads.",
  },
  {
    year: "2016",
    title: "Micro Film Plus",
    body: "The industry pivots toward Web Big Movie and short-video platforms (TikTok, Kwai). The grassroots base migrates; the form's commercial logic continues to evolve.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <BackgroundLight />
      <SiteHeader active="about" />

      <main className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <Breadcrumb />
        <Hero />
        <Definition />
        <FourMicros />
        <DurationStandard />
        <Origin />
        <FilmTypes />
        <OurPlace />
        <Source />
      </main>

      <SiteFooter />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sections                                                                   */
/* -------------------------------------------------------------------------- */

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
      <span className="text-[var(--foreground)]" aria-current="page">
        About
      </span>
    </nav>
  );
}

function Hero() {
  return (
    <section className="grid gap-10 pt-10 pb-16 lg:grid-cols-[0.6fr_0.4fr] lg:items-end">
      <div>
        <FilmStripBadge label="About" />
        <h1 className="serif mt-6 text-balance text-5xl leading-[1.05] sm:text-6xl">
          What is a micro film?
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--foreground)]/70">
          A micro film — in Chinese, <span className="serif italic">微电影</span> — is
          a short, complete film designed for mobile and online platforms.
          The form was born online in 2010, formalized in encyclopedias as
          a piece running between eight and fifteen minutes, and shaped
          since by phones, vertical screens, and the rise of short video.
          micro.film and Micro Film Studios both sit inside that lineage.
        </p>
      </div>
      <aside aria-hidden="true">
        <FilmStrip className="rounded-md" holes={20}>
          <div className="grid gap-1 px-3 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
            <div className="flex justify-between">
              <span>Standard</span>
              <span>8–15 min</span>
            </div>
            <div className="flex justify-between">
              <span>Our cap</span>
              <span>{FILM_MAX_DURATION}</span>
            </div>
            <div className="flex justify-between">
              <span>Micro scene</span>
              <span>{SCENE_DURATION_RANGE}</span>
            </div>
            <div className="flex justify-between">
              <span>Format</span>
              <span>9:16</span>
            </div>
          </div>
        </FilmStrip>
      </aside>
    </section>
  );
}

function Definition() {
  return (
    <section className="border-t border-white/10 py-14">
      <SectionHeader
        eyebrow="Definition"
        title="The form, in the encyclopedia’s words."
      />
      <div className="mt-10 grid gap-10 lg:grid-cols-[0.55fr_0.45fr]">
        <blockquote className="serif text-pretty text-2xl leading-snug text-[var(--foreground)]/85 sm:text-3xl">
          “A short film format primarily disseminated via the internet
          and mobile new media platforms, suitable for viewing during
          short leisure periods. Its core characteristic lies in its
          ‘micro’ nature — micro duration (a few minutes to tens of
          minutes), a short production cycle, and micro-scale
          investment. Micro films possess complete storylines and the
          fundamental elements of filmmaking.”
        </blockquote>
        <div className="space-y-5 text-sm leading-7 text-[var(--foreground)]/70">
          <p>
            That definition comes from the Baidu Baike entry on{" "}
            <ExternalLink href={baiduWiki}>Micro Film (微电影)</ExternalLink>
            , the closest thing the form has to a canonical reference.
          </p>
          <p>
            The same entry tightens the duration window further: a
            typical micro film runs <strong>eight to fifteen minutes</strong>,
            with a complete story (time, place, characters, theme,
            plot), made on a short cycle and a small budget, distributed
            on mobile.
          </p>
          <p>
            On the broader internet, critics have argued the practical
            ceiling is even lower —{" "}
            <em>“ten minutes is already considered the maximum
            limit.”</em>{" "}
            That is why our cap is{" "}
            <strong>{FILM_MAX_DURATION_LABEL.toLowerCase()}</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}

function FourMicros() {
  return (
    <section className="border-t border-white/10 py-14">
      <SectionHeader
        eyebrow="The four ‘micros’"
        title="What makes a micro film micro."
        copy="Every encyclopedic definition of the form leans on the same four constraints. They are not stylistic preferences. They are the form."
      />
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {fourMicros.map((item) => (
          <li
            key={item.label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
              {item.label}
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/70">
              {item.detail}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function DurationStandard() {
  return (
    <section className="border-t border-white/10 py-14">
      <SectionHeader
        eyebrow="Duration"
        title="Eight to fifteen. We sit at ten."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Stat term="Standard" value="8–15 min" detail="Per Baidu Baike." />
        <Stat
          term="Critic-recommended"
          value="≤ 10 min"
          detail="“Ten minutes is already considered the maximum limit.”"
        />
        <Stat
          term="micro.film cap"
          value={FILM_MAX_DURATION}
          detail="Where we choose to sit. Films can run much shorter."
        />
      </div>
      <p className="mt-10 max-w-3xl text-base leading-8 text-[var(--foreground)]/70">
        Anything from eight to fifteen minutes qualifies as a micro
        film. We picked ten because it is the gold standard the form's
        own critics have already converged on, and because it keeps
        every film comfortably watchable in a single sitting on a
        phone. A twelve- or fifteen-minute micro film is still a micro
        film — it just is not what we make here.
      </p>
    </section>
  );
}

function Origin() {
  return (
    <section className="border-t border-white/10 py-14">
      <SectionHeader
        eyebrow="Origin"
        title="Where the form came from."
        copy="The micro film was a product of cheaper cameras, faster networks, and a generation that watched stories on a 3-inch screen between train stops."
      />
      <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {timeline.map((item) => (
          <li
            key={item.year}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
              {item.year}
            </p>
            <h3 className="serif mt-4 text-2xl leading-tight">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/70">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-10 max-w-3xl text-base leading-8 text-[var(--foreground)]/70">
        Each step of that history was made possible by a new substrate:
        cheaper cameras, then broadband, then the smartphone, then
        short-video distribution. The next substrate is generative
        models — for screenwriting, for image, for video. micro.film is
        the studio for that chapter.
      </p>
    </section>
  );
}

function FilmTypes() {
  return (
    <section className="border-t border-white/10 py-14">
      <SectionHeader
        eyebrow="Types"
        title="Six recurring genres."
        copy="The encyclopedia clusters the form into six recognizable types. They are not the only possible films, but they map the territory."
      />
      <ul className="mt-10 flex flex-wrap gap-3">
        {filmTypes.map((type) => (
          <li
            key={type}
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-[var(--foreground)]/80"
          >
            {type}
          </li>
        ))}
      </ul>
    </section>
  );
}

function OurPlace() {
  return (
    <section className="border-t border-white/10 py-14">
      <SectionHeader
        eyebrow="Our place"
        title="Where micro.film fits."
      />
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <p className="text-base leading-8 text-[var(--foreground)]/75">
          micro.film is a studio for the form, built for the AI era —
          screenplay with assistance, cover art with ChatGPT Images
          2.0, every micro scene rendered on a state-of-the-art video
          model. Research, develop, generate, and stitch a finished
          vertical micro film end to end, on one pipeline, in days
          instead of months. Built for brands, agencies, publishers,
          and independent filmmakers — the people the form was always
          meant to serve, with the tools the form was waiting for.
        </p>
        <p className="text-base leading-8 text-[var(--foreground)]/75">
          Micro Film Studios is the production house attached to the
          studio: the films at{" "}
          <Link
            href="/watch/the-window-across-the-way"
            className="text-[var(--amber-soft)] underline-offset-4 hover:underline"
          >
            /watch
          </Link>{" "}
          are ours, made on the same pipeline you can use, and serve as
          proof that the platform can carry a real cinematic frame.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/studio"
          className="rounded-full bg-[var(--paper)] px-6 py-3.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--amber-soft)]"
        >
          Open the studio
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
    </section>
  );
}

function Source() {
  return (
    <section className="border-t border-white/10 py-12 pb-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
        Source
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--foreground)]/70">
        Quotes and the canonical definition on this page are drawn from
        the Baidu Baike entry on{" "}
        <ExternalLink href={baiduWiki}>
          Micro Film (微电影)
        </ExternalLink>
        . Translations on the linked page are AI-assisted; the source
        is the closest thing the form has to a canonical reference and
        we cite it as such. Anything we have added — definitions, caps,
        opinions about where the form is headed — is ours.
      </p>
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
  copy?: string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[0.55fr_0.45fr] md:items-end">
      <div>
        <FilmStripBadge label={eyebrow} />
        <h2 className="serif mt-5 max-w-xl text-balance text-4xl leading-tight sm:text-5xl">
          {title}
        </h2>
      </div>
      {copy ? (
        <p className="max-w-md text-sm leading-7 text-[var(--foreground)]/65 md:text-base md:leading-8">
          {copy}
        </p>
      ) : null}
    </div>
  );
}

function Stat({
  term,
  value,
  detail,
}: {
  term: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/45">
        {term}
      </p>
      <p className="serif mt-3 text-4xl text-[var(--foreground)]">{value}</p>
      <p className="mt-3 text-sm leading-6 text-[var(--foreground)]/65">
        {detail}
      </p>
    </div>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--amber-soft)] underline-offset-4 hover:underline"
    >
      {children}
    </a>
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
