import type { Metadata } from "next";
import Link from "next/link";
import {
  IMAGE_MODEL_ID,
  studioDefaults,
  VIDEO_MODEL_ID,
  workflowSteps,
} from "@/lib/workflow";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Prototype interface for creating character reference sheets and 15-second AI micro-drama clips.",
  alternates: {
    canonical: "/studio",
  },
  openGraph: {
    title: "micro.film Studio",
    description:
      "Build character sheets, scene prompts, and video render runs for AI micro-dramas.",
    url: "https://micro.film/studio",
    siteName: "micro.film",
    type: "website",
  },
};

const fields = [
  ["Series title", studioDefaults.title],
  ["Target audience", studioDefaults.audience],
  ["Logline", studioDefaults.logline],
  ["Lead character", studioDefaults.leadCharacter],
  ["Male lead", studioDefaults.maleLead],
  ["15-second scene beat", studioDefaults.sceneBeat],
] as const;

const referenceChecks = [
  "Front, three-quarter, and profile face views",
  "Hair, nails, wardrobe, jewelry, and signature colors",
  "Three emotional expressions for the scene",
  "Continuity notes for future episodes",
] as const;

const renderQueue = [
  ["Character sheet", IMAGE_MODEL_ID, "Ready to generate"],
  ["Scene prompt", "micro-drama-beat-v0", "Draft locked"],
  ["Video render", VIDEO_MODEL_ID, "Waiting for CRS"],
] as const;

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-[#08080b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-lg font-black tracking-tight">
            micro.film
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-rose-50/72 transition hover:bg-white/10 hover:text-white"
          >
            Back to landing
          </Link>
        </header>

        <section className="grid gap-6 py-10 lg:grid-cols-[0.68fr_0.32fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30">
            <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ff6b8e]">
                  New episode
                </p>
                <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
                  Build the hook.
                </h1>
              </div>
              <div className="rounded-2xl border border-[#ff184e]/30 bg-[#ff184e]/15 px-4 py-3 text-sm font-semibold text-rose-50">
                15-second vertical scene
              </div>
            </div>

            <form className="mt-6 grid gap-4">
              {fields.map(([label, value]) => (
                <label key={label} className="grid gap-2">
                  <span className="text-sm font-semibold text-rose-50/70">
                    {label}
                  </span>
                  <textarea
                    className="min-h-24 resize-y rounded-3xl border border-white/10 bg-black/25 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-white/30 focus:border-[#ff6b8e]"
                    defaultValue={value}
                  />
                </label>
              ))}
            </form>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-[#ff184e]/25 bg-[#ff184e]/12 p-5">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ff9bb2]">
                Action
              </p>
              <button className="mt-4 w-full rounded-full bg-[#ff184e] px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5">
                Generate Clip
              </button>
              <p className="mt-4 text-xs leading-6 text-white/58">
                The button is a prototype. The API route at
                <span className="font-mono"> /api/runs </span>
                defines the first server-side run shape.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-rose-50/50">
                Reference sheet checks
              </p>
              <div className="mt-4 space-y-3">
                {referenceChecks.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-rose-50/70">
                    <span className="mt-1 size-2 rounded-full bg-[#ff184e]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-rose-50/50">
                Render queue
              </p>
              <div className="mt-4 space-y-3">
                {renderQueue.map(([label, model, status]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{label}</p>
                      <p className="text-xs text-emerald-100">{status}</p>
                    </div>
                    <p className="mt-2 font-mono text-xs text-rose-50/46">
                      {model}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-4 pb-12 md:grid-cols-3">
          {workflowSteps.map((step) => (
            <article
              key={step.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5"
            >
              <p className="text-sm font-black text-[#ff6b8e]">
                {step.eyebrow}
              </p>
              <h2 className="mt-4 text-xl font-black">{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-rose-50/58">
                {step.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
