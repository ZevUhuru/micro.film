import type { Metadata } from "next";
import Link from "next/link";
import { FilmStrip, FilmStripBadge } from "@/components/FilmStrip";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { CONTACT_HREF } from "@/lib/workflow";

export const metadata: Metadata = {
  title: "Commercial Studio",
  description:
    "Commercial micro-films for brands, agencies, properties, products, and publishers. Cinematic short-form work built for the AI era.",
  alternates: { canonical: "/commercial" },
  openGraph: {
    title: "Commercial Studio — micro.film",
    description:
      "A cinematic commercial studio for brands, agencies, properties, products, and publishers.",
    url: "https://micro.film/commercial",
    siteName: "micro.film",
    type: "website",
  },
};

const formats = [
  {
    label: "01",
    title: "Brand Film",
    body: "A launch, product, service, or campaign treated as a complete vertical film: premise, mood, movement, music, and a clean commercial ending.",
    badge: "Launch",
  },
  {
    label: "02",
    title: "Property Film",
    body: "Architecture, estates, hospitality, restaurants, retail, and interiors made to feel like a high-end scene instead of a slideshow.",
    badge: "Space",
  },
  {
    label: "03",
    title: "Performance Cut",
    body: "Hook-first variants, short cutdowns, captions, and campaign assets for teams that need the same idea tested multiple ways.",
    badge: "Test",
  },
] as const;

const flow = ["Brief", "Look", "Scenes", "Cut"] as const;

const outcomes = [
  "Hero vertical film",
  "15s and 30s cutdowns",
  "Cover stills",
  "Hook variants",
  "Campaign captions",
  "Social-ready exports",
] as const;

export default function CommercialPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <BackgroundLight />
      <SiteHeader active="commercial" />

      <main className="relative z-10">
        <Hero />
        <Formats />
        <PropertyFilm />
        <Flow />
        <Deliverables />
        <CTA />
      </main>

      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-end lg:pb-24 lg:pt-20">
      <div>
        <FilmStripBadge label="Commercial studio" />
        <h1 className="serif mt-6 max-w-3xl text-balance text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
          Micro-films for things that need to move people.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--foreground)]/68">
          Commercial work should not look like filler. We turn brands,
          properties, products, and publisher briefs into cinematic
          vertical films built for the AI era.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href={CONTACT_HREF}
            className="rounded-full bg-[var(--paper)] px-6 py-3.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--amber-soft)]"
          >
            Bring a brief
          </Link>
          <Link
            href="/studio"
            className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-white/5"
          >
            Open studio
          </Link>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-3 shadow-[0_28px_100px_rgba(0,0,0,0.35)]">
        <FilmStrip className="rounded-[1.4rem]" holes={16}>
          <div className="relative aspect-[9/16] overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_50%_18%,rgba(232,184,106,0.22),transparent_36%),linear-gradient(180deg,#241812,#07060a)]">
            <div
              aria-hidden="true"
              className="absolute inset-x-8 top-14 h-28 rounded-full bg-[var(--amber)]/20 blur-3xl"
            />
            <div className="absolute inset-0 grid content-between p-6">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-white/55">
                <span>Commercial reel</span>
                <span>9:16</span>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--amber-soft)]">
                  Conversion by cinematic experience
                </p>
                <p className="serif mt-4 text-4xl leading-[0.95] text-white">
                  Brand.
                  <br />
                  Space.
                  <br />
                  Product.
                </p>
              </div>
            </div>
          </div>
        </FilmStrip>
      </div>
    </section>
  );
}

function Formats() {
  return (
    <section className="mx-auto max-w-6xl border-t border-white/10 px-5 py-16 sm:px-8">
      <SectionHeader
        eyebrow="Formats"
        title="Three ways commercial work becomes a micro-film."
        copy="The language stays cinematic. The job changes: sell the product, elevate the place, or test the hook."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {formats.map((format) => (
          <article
            key={format.title}
            className="group rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(244,238,226,0.045),rgba(244,238,226,0.015))] p-5 transition hover:border-[var(--amber)]/35"
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--foreground)]/50">
              <span>{format.label}</span>
              <span className="rounded-full border border-[var(--amber)]/30 bg-[var(--amber)]/10 px-3 py-1 text-[var(--amber-soft)]">
                {format.badge}
              </span>
            </div>
            <div className="mt-20">
              <h2 className="serif text-3xl leading-tight">{format.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/66">
                {format.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PropertyFilm() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-[var(--amber)]/25 bg-[radial-gradient(circle_at_18%_18%,rgba(232,184,106,0.16),transparent_40%),linear-gradient(180deg,#19120e,#09070a)] p-7 sm:p-10 lg:grid-cols-[0.48fr_0.52fr] lg:items-center">
        <div>
          <FilmStripBadge label="Architecture / estate" />
          <h2 className="serif mt-6 text-balance text-4xl leading-tight sm:text-5xl">
            The property is the main character.
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--foreground)]/72">
            A listing does not need actors to feel cinematic. It needs
            light, atmosphere, deliberate motion, and a cut that makes
            the buyer feel the space before they see it in person.
          </p>
        </div>
        <div className="grid gap-3">
          <SceneLine
            title="From static photos"
            body="A slow push through the room, twilight on the glass, warm interior glow, detail beats on material and scale."
          />
          <SceneLine
            title="From raw walkthroughs"
            body="Clean pacing, stabilized movement, caption logic, atmospheric sound, and a premium vertical cut."
          />
          <SceneLine
            title="From neighborhood context"
            body="A micro-doc for the block: street texture, restaurants, parks, commute, and the life around the property."
          />
        </div>
      </div>
    </section>
  );
}

function Flow() {
  return (
    <section className="mx-auto max-w-6xl border-y border-white/10 px-5 py-14 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
        <div>
          <FilmStripBadge label="Process" />
          <h2 className="serif mt-5 text-balance text-4xl leading-tight">
            A studio pipeline, not a blank prompt box.
          </h2>
        </div>
        <ol className="grid gap-3 sm:grid-cols-4">
          {flow.map((step, index) => (
            <li
              key={step}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--amber-soft)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="serif mt-8 text-2xl">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Deliverables() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <SectionHeader
        eyebrow="Deliverables"
        title="Built to leave the studio."
        copy="Commercial work is only useful if it ships. Every project is packaged for the platforms where it has to perform."
      />
      <ul className="mt-10 flex flex-wrap gap-3">
        {outcomes.map((outcome) => (
          <li
            key={outcome}
            className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--foreground)]/65"
          >
            {outcome}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 pt-6 sm:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(244,238,226,0.05),rgba(244,238,226,0.015))] p-8 sm:p-12">
        <FilmStripBadge label="Next" />
        <h2 className="serif mt-6 max-w-2xl text-balance text-4xl leading-tight sm:text-5xl">
          Start with one commercial micro-film.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--foreground)]/70">
          Bring a product, listing, launch, or publisher idea. We turn it
          into a finished vertical film, then decide whether it should
          become a repeatable ESY workflow.
        </p>
        <div className="mt-8">
          <Link
            href={CONTACT_HREF}
            className="inline-flex rounded-full bg-[var(--paper)] px-6 py-3.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--amber-soft)]"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}

function SceneLine({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <h3 className="serif text-2xl leading-tight">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/68">
        {body}
      </p>
    </article>
  );
}

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

function BackgroundLight() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_15%_-8%,rgba(232,184,106,0.15),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(177,58,58,0.09),transparent_28%)]"
      />
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-0"
      />
    </>
  );
}
