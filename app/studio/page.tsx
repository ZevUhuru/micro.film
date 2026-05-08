import type { Metadata } from "next";
import Link from "next/link";
import { FilmStrip, FilmStripBadge } from "@/components/FilmStrip";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import {
  ASPECT_RATIO,
  FILM_MAX_DURATION,
  IMAGE_MODEL_ID,
  platforms,
  SCENE_DURATION,
  studioDefaults,
  VIDEO_MODEL_ID,
  workflowSteps,
} from "@/lib/workflow";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Cast a character, write 15-second scenes, and cut a vertical micro film up to three minutes for TikTok, YouTube Shorts, and Instagram Reels.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "micro.film Studio",
    description:
      "Cast, write, and assemble a cinematic micro film in three steps.",
    url: "https://micro.film/studio",
    siteName: "micro.film",
    type: "website",
  },
};

const fields: Array<{
  label: string;
  hint: string;
  value: string;
  rows?: number;
}> = [
  {
    label: "Film title",
    hint: "Give it a name. It is the title card.",
    value: studioDefaults.title,
    rows: 1,
  },
  {
    label: "Logline",
    hint: "One sentence the viewer feels before they understand.",
    value: studioDefaults.logline,
    rows: 2,
  },
  {
    label: "Lead character",
    hint: "Locks the reference sheet for every shot.",
    value: studioDefaults.leadCharacter,
    rows: 3,
  },
  {
    label: "Sound and place",
    hint: "Where we are and what surrounds the character.",
    value: studioDefaults.supportingCharacter,
    rows: 2,
  },
  {
    label: "Scene 01 (15s)",
    hint: "One location, one turn, one frame to remember. Add more scenes after this one.",
    value: studioDefaults.sceneBeat,
    rows: 4,
  },
  {
    label: "Where it goes",
    hint: "Auto-formatted for the platforms you pick below.",
    value: studioDefaults.audience,
    rows: 1,
  },
];

const referenceChecks = [
  "Front, three-quarter, and profile reference",
  "Wardrobe, palette, and key props locked",
  "Three expressions tuned to the scene",
  "Continuity notes saved for the next clip",
];

const renderQueue: Array<{
  label: string;
  detail: string;
  status: string;
}> = [
  {
    label: "Character sheet",
    detail: IMAGE_MODEL_ID,
    status: "Ready",
  },
  {
    label: "Scene prompt",
    detail: "scene-template-v0",
    status: "Drafting",
  },
  {
    label: "Vertical render",
    detail: VIDEO_MODEL_ID,
    status: "Queued",
  },
];

export default function StudioPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <BackgroundLight />
      <SiteHeader active="studio" />

      <main className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <header className="grid gap-8 py-12 lg:grid-cols-[0.8fr_0.2fr] lg:items-end">
          <div>
            <FilmStripBadge label="Studio" />
            <h1 className="serif mt-5 max-w-2xl text-balance text-5xl leading-[1.05] sm:text-6xl">
              <span className="italic">Roll</span> a film in three steps.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--foreground)]/65">
              Fill the slate, lock the character, and queue the render. The
              output is a vertical clip ready for TikTok, YouTube Shorts, and
              Instagram Reels.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
              Slate
            </p>
            <dl className="mt-3 grid gap-1 font-mono text-[12px] text-[var(--foreground)]/55">
              <div className="flex justify-between">
                <dt>Format</dt>
                <dd>{ASPECT_RATIO}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Film</dt>
                <dd>{FILM_MAX_DURATION}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Scene</dt>
                <dd>{SCENE_DURATION}</dd>
              </div>
            </dl>
          </div>
        </header>

        <FilmStripBand />

        <section className="grid gap-6 py-10 lg:grid-cols-[0.66fr_0.34fr] lg:items-start">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
                Scene 01 — slate
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
                Take 01
              </p>
            </div>

            <form className="mt-7 grid gap-6">
              {fields.map((field) => (
                <label key={field.label} className="grid gap-2">
                  <div className="flex items-baseline justify-between">
                    <span className="serif text-xl text-[var(--foreground)]">
                      {field.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/45">
                      {field.hint}
                    </span>
                  </div>
                  <textarea
                    rows={field.rows ?? 3}
                    className="resize-y rounded-2xl border border-white/10 bg-[var(--background)] p-4 text-sm leading-6 text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--amber)]"
                    defaultValue={field.value}
                  />
                </label>
              ))}

              <fieldset className="grid gap-3 rounded-2xl border border-white/10 bg-[var(--background)] p-5">
                <legend className="px-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
                  Distribution
                </legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {platforms.map((platform) => (
                    <label
                      key={platform.name}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm transition hover:border-[var(--amber)]/50"
                    >
                      <input
                        type="checkbox"
                        defaultChecked
                        className="size-4 accent-[var(--amber)]"
                      />
                      <span>{platform.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </form>
          </div>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-[var(--amber)]/30 bg-[radial-gradient(circle_at_30%_20%,rgba(232,184,106,0.18),transparent_60%),linear-gradient(180deg,#1a1612,#0c0a08)] p-6">
              <FilmStripBadge label="Action" />
              <h2 className="serif mt-4 text-2xl leading-tight">
                Render this scene
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground)]/65">
                Locks the cast, builds the prompt, and queues a vertical render.
              </p>
              <button
                type="button"
                className="mt-5 w-full rounded-full bg-[var(--paper)] px-5 py-3.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--amber-soft)]"
              >
                Roll camera
              </button>
              <p className="mt-4 font-mono text-[11px] leading-6 text-[var(--foreground)]/45">
                Wired to <span className="text-[var(--amber-soft)]">/api/runs</span>{" "}
                — provider call to be enabled.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
                Reference checks
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[var(--foreground)]/70">
                {referenceChecks.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-3 rounded-[2px] bg-[var(--amber)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
                Render queue
              </p>
              <ul className="mt-4 space-y-3">
                {renderQueue.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-[var(--background)] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="serif text-lg leading-tight">
                        {item.label}
                      </p>
                      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-[11px] text-[var(--foreground)]/45">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <FilmStripBand />

        <section className="grid gap-4 py-12 md:grid-cols-3">
          {workflowSteps.map((step) => (
            <article
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
                Step {step.eyebrow}
              </p>
              <h3 className="serif mt-4 text-2xl leading-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground)]/60">
                {step.description}
              </p>
            </article>
          ))}
        </section>

        <section className="pb-16">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
                  Help
                </p>
                <h2 className="serif mt-3 text-2xl leading-tight">
                  Read the notes before you write the next scene.
                </h2>
              </div>
              <Link
                href="/blog"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-white/5"
              >
                Open notes
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function FilmStripBand() {
  return (
    <div aria-hidden="true">
      <FilmStrip className="rounded-md" holes={32}>
        <div className="h-3" />
      </FilmStrip>
    </div>
  );
}

function BackgroundLight() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_85%_-10%,rgba(232,184,106,0.12),transparent_30%),radial-gradient(circle_at_10%_10%,rgba(177,58,58,0.08),transparent_28%)]"
      />
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-0"
      />
    </>
  );
}
