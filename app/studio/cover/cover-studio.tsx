"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FilmStripBadge } from "@/components/FilmStrip";
import type { Cover, CoverPalette } from "@/lib/cover";

/* -------------------------------------------------------------------------- */
/* Constants                                                                   */
/* -------------------------------------------------------------------------- */

const styleSuggestions = [
  "Cinematic poster",
  "Neo-noir",
  "Painterly",
  "Documentary still",
  "Saul Bass minimalist",
  "Wes Anderson symmetry",
  "1970s film grain",
] as const;

const editSuggestions = [
  "Push the palette warmer.",
  "Make it nighttime.",
  "Add a single human silhouette in the foreground.",
  "Tighten the composition; pull the title down.",
  "Make the type smaller and shift it to the bottom-left.",
  "Move the light source to the left.",
] as const;

const palettePresets: { value: CoverPalette; label: string }[] = [
  { value: "amber-noir", label: "Amber noir" },
  { value: "neon-rain", label: "Neon rain" },
  { value: "moonlit-blue", label: "Moonlit blue" },
  { value: "rust-and-rose", label: "Rust & rose" },
  { value: "celluloid-warm", label: "Celluloid warm" },
  { value: "graphite", label: "Graphite" },
];

/* -------------------------------------------------------------------------- */
/* Public component                                                            */
/* -------------------------------------------------------------------------- */

export function CoverStudio() {
  const [covers, setCovers] = useState<Cover[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCover = useMemo(
    () => covers.find((c) => c.id === selectedId) ?? null,
    [covers, selectedId],
  );

  async function handleGenerate(input: GeneratePayload) {
    setError(null);
    setGenerating(true);
    try {
      const res = await fetch("/api/cover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "generate",
          prompt: input.prompt,
          style: input.style || undefined,
          palette: input.palette || undefined,
        }),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(
          typeof payload?.error === "string" ? payload.error : "Generation failed.",
        );
      }
      const data = (await res.json()) as { cover: Cover };
      setCovers((prev) => [data.cover, ...prev]);
      setSelectedId(data.cover.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleEdit(instruction: string) {
    if (!selectedCover) return;
    setError(null);
    setEditing(true);
    try {
      const res = await fetch("/api/cover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "edit",
          source: selectedCover,
          instruction,
        }),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(
          typeof payload?.error === "string" ? payload.error : "Edit failed.",
        );
      }
      const data = (await res.json()) as { cover: Cover };
      setCovers((prev) => [data.cover, ...prev]);
      setSelectedId(data.cover.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Edit failed.");
    } finally {
      setEditing(false);
    }
  }

  return (
    <section className="mt-12 space-y-10">
      <ModelBadgeRow coverCount={covers.length} />

      {error ? (
        <div
          role="alert"
          className="rounded-2xl border border-[var(--brick)]/40 bg-[var(--brick)]/10 px-5 py-4 text-sm text-[var(--foreground)]"
        >
          {error}
        </div>
      ) : null}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <GeneratePanel busy={generating} onGenerate={handleGenerate} />
        <EditPanel
          cover={selectedCover}
          busy={editing}
          onEdit={handleEdit}
          relatedCount={
            selectedCover
              ? covers.filter(
                  (c) =>
                    c.sourceCoverId === selectedCover.id ||
                    c.id === selectedCover.sourceCoverId,
                ).length
              : 0
          }
        />
      </div>

      <Gallery
        covers={covers}
        selectedId={selectedId}
        onSelect={(id) => setSelectedId(id)}
      />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Top row                                                                     */
/* -------------------------------------------------------------------------- */

function ModelBadgeRow({ coverCount }: { coverCount: number }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilmStripBadge label="9:16 · 1024×1536" />
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/70">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber)]" />
        ChatGPT Images 2.0
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/50">
        {coverCount} cover{coverCount === 1 ? "" : "s"} in this session
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Generate panel                                                              */
/* -------------------------------------------------------------------------- */

type GeneratePayload = {
  prompt: string;
  style: string;
  palette: CoverPalette | "";
};

function GeneratePanel({
  busy,
  onGenerate,
}: {
  busy: boolean;
  onGenerate: (input: GeneratePayload) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [palette, setPalette] = useState<CoverPalette | "">("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || busy) return;
    onGenerate({ prompt: prompt.trim(), style: style.trim(), palette });
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
            Generate
          </p>
          <h2 className="serif mt-2 text-2xl">Describe the cover.</h2>
        </div>
      </div>

      <label className="mt-6 block">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
          Prompt
        </span>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={"A woman watches the city from a 14th-floor window at dusk. Title: \u201CThe Window Across the Way.\u201D Cinematic, amber light, type bottom-left."}
          rows={5}
          required
          disabled={busy}
          className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[var(--background)]/60 px-4 py-3 text-sm leading-6 text-[var(--foreground)] placeholder:text-[var(--foreground)]/35 focus:border-[var(--amber-soft)] focus:outline-none"
        />
      </label>

      <fieldset className="mt-5">
        <legend className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
          Style (optional)
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {styleSuggestions.map((s) => {
            const active = style === s;
            return (
              <button
                type="button"
                key={s}
                onClick={() => setStyle(active ? "" : s)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  active
                    ? "border-[var(--amber-soft)] bg-[var(--amber)]/15 text-[var(--foreground)]"
                    : "border-white/10 bg-white/[0.02] text-[var(--foreground)]/70 hover:border-white/20"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
        <input
          type="text"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          placeholder="Or write your own style label"
          disabled={busy}
          className="mt-3 w-full rounded-xl border border-white/10 bg-[var(--background)]/60 px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/35 focus:border-[var(--amber-soft)] focus:outline-none"
        />
      </fieldset>

      <fieldset className="mt-5">
        <legend className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
          Palette (optional)
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {palettePresets.map((p) => {
            const active = palette === p.value;
            return (
              <button
                type="button"
                key={p.value}
                onClick={() => setPalette(active ? "" : p.value)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
                  active
                    ? "border-[var(--amber-soft)] bg-[var(--amber)]/15 text-[var(--foreground)]"
                    : "border-white/10 bg-white/[0.02] text-[var(--foreground)]/70 hover:border-white/20"
                }`}
              >
                <PaletteSwatch palette={p.value} />
                {p.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-7 flex items-center justify-between gap-4">
        <p className="text-xs text-[var(--foreground)]/50">
          Output: 9:16 vertical, 1024×1536. Edits keep the chain.
        </p>
        <button
          type="submit"
          disabled={busy || !prompt.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Generating…" : "Generate cover"}
        </button>
      </div>
    </form>
  );
}

function PaletteSwatch({ palette }: { palette: CoverPalette }) {
  const swatch: Record<CoverPalette, [string, string]> = {
    "amber-noir": ["#3a2316", "#e8b86a"],
    "neon-rain": ["#1b1138", "#82e0ff"],
    "moonlit-blue": ["#142433", "#aed8ff"],
    "rust-and-rose": ["#3b1a18", "#ff9eb0"],
    "celluloid-warm": ["#2c2117", "#ffd29a"],
    graphite: ["#1f2024", "#cfd6df"],
  };
  const [a, b] = swatch[palette];
  return (
    <span
      aria-hidden="true"
      className="inline-block h-3 w-3 rounded-sm border border-white/20"
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Edit panel                                                                  */
/* -------------------------------------------------------------------------- */

function EditPanel({
  cover,
  busy,
  onEdit,
  relatedCount,
}: {
  cover: Cover | null;
  busy: boolean;
  onEdit: (instruction: string) => void;
  relatedCount: number;
}) {
  const [instruction, setInstruction] = useState("");

  if (!cover) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.015] p-7 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
          Edit
        </p>
        <h2 className="serif mt-2 text-2xl">No cover selected.</h2>
        <p className="mt-3 text-sm text-[var(--foreground)]/65">
          Generate a cover, then edit it in plain language with ChatGPT
          Images 2.0. Tighten the type, change the time of day, push the
          palette warmer — each edit produces a new variant in the chain.
        </p>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = instruction.trim();
    if (!trimmed || busy) return;
    onEdit(trimmed);
    setInstruction("");
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
            Edit selected cover
          </p>
          <h2 className="serif mt-2 text-2xl">
            {cover.sourceCoverId ? "Refine the variant." : "Refine the cover."}
          </h2>
        </div>
        <a
          href={cover.imageUrl}
          download={`${cover.id}.svg`}
          className="inline-flex items-center justify-center rounded-full border border-white/15 px-3 py-1.5 text-xs text-[var(--foreground)]/85 transition hover:bg-white/5"
        >
          Download
        </a>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-[180px_1fr]">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
          <CoverThumb cover={cover} priority />
        </div>
        <div className="space-y-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
              Prompt
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--foreground)]/80">
              {cover.prompt}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--foreground)]/55">
            <span className="font-mono uppercase tracking-[0.22em]">
              {cover.palette.replace(/-/g, " ")}
            </span>
            {cover.style ? (
              <span className="font-mono uppercase tracking-[0.22em]">
                {cover.style}
              </span>
            ) : null}
            {relatedCount > 0 ? (
              <span className="font-mono uppercase tracking-[0.22em]">
                {relatedCount} related
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
            Edit instruction
          </span>
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            rows={3}
            required
            disabled={busy}
            placeholder="What do you want changed? e.g. Push the palette cooler, move the type to the bottom-left, add a faint silhouette."
            className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[var(--background)]/60 px-4 py-3 text-sm leading-6 text-[var(--foreground)] placeholder:text-[var(--foreground)]/35 focus:border-[var(--amber-soft)] focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {editSuggestions.map((s) => (
            <button
              type="button"
              key={s}
              disabled={busy}
              onClick={() => setInstruction(s)}
              className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-[var(--foreground)]/70 transition hover:border-white/20 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 pt-1">
          <p className="text-xs text-[var(--foreground)]/50">
            Edits run through ChatGPT Images 2.0 and produce a new
            variant — the original is kept.
          </p>
          <button
            type="submit"
            disabled={busy || !instruction.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--amber)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Editing…" : "Apply edit"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Gallery                                                                     */
/* -------------------------------------------------------------------------- */

function Gallery({
  covers,
  selectedId,
  onSelect,
}: {
  covers: Cover[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  if (covers.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.015] px-6 py-16 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
          Gallery
        </p>
        <h3 className="serif mt-2 text-2xl">No covers yet.</h3>
        <p className="mt-3 text-sm text-[var(--foreground)]/60">
          Generated covers and their edits will appear here in 9:16. Click
          one to bring it into the editor.
        </p>
      </div>
    );
  }

  return (
    <section>
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
            Gallery
          </p>
          <h3 className="serif mt-2 text-2xl">
            {covers.length} cover{covers.length === 1 ? "" : "s"}
          </h3>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/50">
          Newest first · click to select
        </p>
      </header>

      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {covers.map((cover, index) => (
          <li key={cover.id}>
            <CoverCard
              cover={cover}
              index={covers.length - index}
              selected={cover.id === selectedId}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function CoverCard({
  cover,
  index,
  selected,
  onSelect,
}: {
  cover: Cover;
  index: number;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const isEdit = !!cover.sourceCoverId;
  return (
    <button
      type="button"
      onClick={() => onSelect(cover.id)}
      aria-pressed={selected}
      className={`group block w-full overflow-hidden rounded-2xl border text-left transition ${
        selected
          ? "border-[var(--amber-soft)] shadow-[0_0_0_3px_rgba(232,184,106,0.18)]"
          : "border-white/10 hover:border-white/25"
      }`}
    >
      <div className="relative">
        <CoverThumb cover={cover} />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-2">
          <span className="rounded-full bg-black/55 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur">
            #{index.toString().padStart(2, "0")}
          </span>
          {isEdit ? (
            <span className="rounded-full bg-[var(--amber)]/85 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink)]">
              Edit
            </span>
          ) : (
            <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur">
              Original
            </span>
          )}
        </div>
      </div>
      <div className="space-y-1.5 px-3 py-3">
        <p className="line-clamp-2 text-xs leading-5 text-[var(--foreground)]/80">
          {cover.prompt}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/45">
          {cover.palette.replace(/-/g, " ")}
        </p>
      </div>
    </button>
  );
}

function CoverThumb({
  cover,
  priority = false,
}: {
  cover: Cover;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[9/16] w-full bg-black/30">
      <Image
        src={cover.imageUrl}
        alt={`Cover for "${cover.prompt}"`}
        fill
        unoptimized
        priority={priority}
        sizes="(min-width: 1024px) 240px, (min-width: 640px) 200px, 50vw"
        className="object-cover"
      />
    </div>
  );
}
