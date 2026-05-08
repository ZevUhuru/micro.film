import Link from "next/link";
import {
  audienceSignals,
  dramaRails,
  IMAGE_MODEL_ID,
  posterCards,
  VIDEO_MODEL_ID,
  workflowSteps,
} from "@/lib/workflow";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#08080b] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(244,63,94,0.38),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(250,204,21,0.18),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_28%)]" />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-[#ff184e] font-black tracking-tighter shadow-[0_16px_40px_rgba(255,24,78,0.35)]">
            mf
          </span>
          <span className="text-lg font-black tracking-tight">micro.film</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-white/65 md:flex">
          <a href="#shows" className="transition hover:text-white">
            Shows
          </a>
          <a href="#format" className="transition hover:text-white">
            Format
          </a>
          <a href="#studio-preview" className="transition hover:text-white">
            Studio
          </a>
          <Link href="/blog" className="transition hover:text-white">
            Blog
          </Link>
        </nav>
        <Link
          href="/studio"
          className="rounded-full bg-white px-4 py-2 text-sm font-black text-black shadow-2xl shadow-rose-950/40 transition hover:bg-rose-100"
        >
          Create a Clip
        </Link>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pb-24 lg:pt-16">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/80 ring-1 ring-white/10">
              Every second needs a betrayal, reveal, or kiss.
            </div>
            <h1 className="text-6xl font-black leading-[0.85] tracking-[-0.075em] sm:text-8xl lg:text-9xl">
              Make the next vertical drama obsession.
            </h1>
            <p className="mt-7 text-lg leading-8 text-white/68 sm:text-xl">
              Build serialized micro-dramas from a character sheet, a scene
              hook, and a 15-second vertical clip. Start with high-stakes
              romance, hidden identity, betrayal, revenge, and power-shift
              stories made for phone-native audiences.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/studio"
                className="rounded-full bg-[#ff184e] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_20px_70px_rgba(255,24,78,0.35)] transition hover:-translate-y-0.5"
              >
                Create episode one
              </Link>
              <a
                href="#shows"
                className="rounded-full border border-white/15 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-white/10"
              >
                Browse concepts
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-sm">
              <div>
                <p className="text-3xl font-black">15s</p>
                <p className="mt-1 text-white/50">scene clips</p>
              </div>
              <div>
                <p className="text-3xl font-black">9:16</p>
                <p className="mt-1 text-white/50">vertical first</p>
              </div>
              <div>
                <p className="text-3xl font-black">3</p>
                <p className="mt-1 text-white/50">steps to render</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[620px]">
            <div className="absolute left-1/2 top-2 h-[560px] w-[280px] -translate-x-1/2 rotate-[-8deg] rounded-[2.4rem] bg-white/10 p-3 shadow-2xl shadow-black/60 ring-1 ring-white/15 sm:left-[36%]" />
            <div className="absolute left-1/2 top-0 h-[600px] w-[300px] -translate-x-1/2 rounded-[2.5rem] bg-[#111116] p-3 shadow-2xl shadow-black/70 ring-1 ring-white/15 sm:left-[48%]">
              <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#f43f5e] via-[#2b0711] to-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.25),transparent_26%),linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.92)_88%)]" />
                <div className="relative flex justify-between p-4 text-xs font-black uppercase tracking-[0.18em]">
                  <span>Episode 01</span>
                  <span>00:15</span>
                </div>
                <div className="relative mt-auto p-5">
                  <span className="rounded-full bg-[#ff184e] px-3 py-1 text-xs font-black">
                    Hidden Identity
                  </span>
                  <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.05em]">
                    He Bought the Block
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/72">
                    She thought he was the danger. Then he paid the debt that
                    kept her family alive.
                  </p>
                  <button className="mt-5 w-full rounded-full bg-white py-3 text-sm font-black uppercase tracking-[0.14em] text-black">
                    Play Concept
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute bottom-10 right-0 hidden w-64 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl lg:block">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">
                Prompt stack
              </p>
              <p className="mt-3 text-sm leading-6 text-white/76">
                Photorealistic character sheet with {IMAGE_MODEL_ID}. 15-second
                vertical scene rendered with {VIDEO_MODEL_ID}.
              </p>
            </div>
          </div>
        </section>

        <section id="shows" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ff6b8e]">
                New concepts
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                Drama people can understand in one poster.
              </h2>
            </div>
            <Link
              href="/studio"
              className="hidden rounded-full border border-white/15 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white/80 transition hover:bg-white/10 md:inline-flex"
            >
              Build yours
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {posterCards.map((poster) => (
              <article
                key={poster.title}
                className={`group min-h-[440px] overflow-hidden rounded-[2rem] bg-gradient-to-b ${poster.gradient} p-5 shadow-2xl shadow-black/30`}
              >
                <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/15 bg-black/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-black/35 px-3 py-1 text-xs font-black uppercase tracking-[0.14em]">
                      {poster.tag}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-black">
                      Play
                    </span>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black leading-none tracking-[-0.05em]">
                      {poster.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-white/74">
                      {poster.logline}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="format" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ff6b8e]">
                Creation format
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
                Character first, scene second, cliffhanger always.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/58">
              The product should feel like a drama app and work like a creator
              console. Every run starts with a cast, then a 15-second beat.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {workflowSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
              >
                <p className="text-sm font-black text-[#ff6b8e]">
                  {step.eyebrow}
                </p>
                <h3 className="mt-5 text-2xl font-black">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-5 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-black tracking-[-0.04em]">
                Trope rails
              </h2>
              <span className="text-sm font-semibold text-white/45">
                Inspired by binge-app discovery
              </span>
            </div>
            <div className="space-y-7">
              {dramaRails.map((rail) => (
                <div key={rail.title}>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xl font-black">{rail.title}</h3>
                    <span className="text-sm text-white/45">View all</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {rail.shows.map((show, index) => (
                      <div
                        key={show}
                        className="rounded-3xl border border-white/10 bg-black/25 p-4"
                      >
                        <div className="mb-4 aspect-[3/4] rounded-2xl bg-gradient-to-b from-[#ff184e] via-[#5b1021] to-black p-3">
                          <div className="flex h-full items-end rounded-xl bg-black/15 p-3">
                            <span className="text-3xl font-black">
                              0{index + 1}
                            </span>
                          </div>
                        </div>
                        <p className="font-black leading-tight">{show}</p>
                        <p className="mt-1 text-sm text-white/45">
                          {rail.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {audienceSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/68"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="studio-preview" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ff6b8e]">
                Studio
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.05em]">
                Write the hook, cast the leads, render the clip.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/58">
                The first app flow is not a blank prompt box. It asks for the
                series promise, the romantic pressure, the lead references, and
                the exact moment that makes viewers tap next.
              </p>
              <Link
                href="/studio"
                className="mt-8 inline-flex rounded-full bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-rose-100"
              >
                Open studio
              </Link>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                {["Series hook", "Character sheets", "15-second scene", "Export targets"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 border-b border-white/10 py-4 last:border-b-0"
                    >
                      <span className="grid size-9 place-items-center rounded-full bg-[#ff184e]/20 text-sm font-black text-[#ff6b8e]">
                        {index + 1}
                      </span>
                      <span className="font-semibold">{item}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-6 py-8 text-sm text-rose-50/50">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row">
          <p>micro.film turns character sheets into phone-native drama clips.</p>
          <p>Characters, hooks, scenes, exports.</p>
        </div>
      </footer>
    </div>
  );
}
