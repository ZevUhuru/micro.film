"use client";

import { useState } from "react";
import { FilmStripBadge } from "@/components/FilmStrip";
import {
  blankScene,
  emptyScreenplay,
  estimateRuntime,
  type GuidedScreenplayPrompt,
  type Screenplay,
  type ScreenplayScene,
} from "@/lib/screenplay";
import { FILM_MAX_DURATION, SCENE_DURATION_RANGE } from "@/lib/workflow";

type ViewMode = "picker" | "guided" | "editing";

type SceneAction = "rewrite" | "tighten" | "extend" | "suggest_turn";

const SCENE_CAP_SECONDS = 10 * 60;

const sceneActionCopy: Record<SceneAction, string> = {
  rewrite: "Rewrite",
  tighten: "Tighten",
  extend: "Extend",
  suggest_turn: "Suggest a turn",
};

/* -------------------------------------------------------------------------- */
/* Public component                                                           */
/* -------------------------------------------------------------------------- */

export function ScreenplayEditor() {
  const [view, setView] = useState<ViewMode>("picker");
  const [screenplay, setScreenplay] = useState<Screenplay>(emptyScreenplay);
  const [generating, setGenerating] = useState(false);
  const [busyScene, setBusyScene] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (view === "picker") {
    return (
      <ModePicker
        onChooseGuided={() => setView("guided")}
        onChooseBlank={() => {
          setScreenplay({
            ...emptyScreenplay,
            title: "Untitled micro film",
            scenes: [blankScene(1)],
          });
          setView("editing");
        }}
      />
    );
  }

  if (view === "guided") {
    return (
      <GuidedForm
        busy={generating}
        error={error}
        onCancel={() => {
          setError(null);
          setView("picker");
        }}
        onGenerate={async (prompt) => {
          setError(null);
          setGenerating(true);
          try {
            const res = await fetch("/api/screenplay", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ mode: "generate", prompt }),
            });
            if (!res.ok) {
              const payload = await res.json().catch(() => ({}));
              throw new Error(
                typeof payload?.error === "string" ? payload.error : "Generation failed.",
              );
            }
            const data = (await res.json()) as { screenplay: Screenplay };
            setScreenplay(data.screenplay);
            setView("editing");
          } catch (err) {
            setError(err instanceof Error ? err.message : "Generation failed.");
          } finally {
            setGenerating(false);
          }
        }}
      />
    );
  }

  return (
    <Editor
      screenplay={screenplay}
      busyScene={busyScene}
      error={error}
      onChange={setScreenplay}
      onSceneAction={async (sceneNumber, action) => {
        const targetScene = screenplay.scenes.find((s) => s.number === sceneNumber);
        if (!targetScene) return;
        setError(null);
        setBusyScene(sceneNumber);
        try {
          const res = await fetch("/api/screenplay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mode: action, scene: targetScene }),
          });
          if (!res.ok) {
            const payload = await res.json().catch(() => ({}));
            throw new Error(
              typeof payload?.error === "string" ? payload.error : "Assist failed.",
            );
          }
          const data = (await res.json()) as { scene: ScreenplayScene };
          setScreenplay((prev) => ({
            ...prev,
            scenes: prev.scenes.map((s) =>
              s.number === sceneNumber ? { ...data.scene, number: sceneNumber } : s,
            ),
          }));
        } catch (err) {
          setError(err instanceof Error ? err.message : "Assist failed.");
        } finally {
          setBusyScene(null);
        }
      }}
      onAddScene={() =>
        setScreenplay((prev) => ({
          ...prev,
          scenes: [...prev.scenes, blankScene(prev.scenes.length + 1)],
        }))
      }
      onRemoveScene={(sceneNumber) =>
        setScreenplay((prev) => ({
          ...prev,
          scenes: prev.scenes
            .filter((s) => s.number !== sceneNumber)
            .map((s, idx) => ({ ...s, number: idx + 1 })),
        }))
      }
      onStartOver={() => {
        setScreenplay(emptyScreenplay);
        setError(null);
        setView("picker");
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Mode picker — first screen                                                 */
/* -------------------------------------------------------------------------- */

function ModePicker({
  onChooseGuided,
  onChooseBlank,
}: {
  onChooseGuided: () => void;
  onChooseBlank: () => void;
}) {
  return (
    <section className="mt-12 grid gap-5 lg:grid-cols-2">
      <article className="rounded-3xl border border-[var(--amber)]/30 bg-[radial-gradient(circle_at_25%_15%,rgba(232,184,106,0.16),transparent_60%),linear-gradient(180deg,#1a1612,#0c0a08)] p-8 sm:p-10">
        <FilmStripBadge label="Generate" />
        <h2 className="serif mt-5 text-3xl leading-tight sm:text-4xl">
          Generate from a guided prompt
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-[var(--foreground)]/70">
          Tell us the logline, the genre, the tone, and the lead. We&rsquo;ll
          return an eight-scene screenplay you can edit, rewrite, or
          extend scene by scene.
        </p>
        <button
          type="button"
          onClick={onChooseGuided}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--paper)] px-6 py-3.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--amber-soft)]"
        >
          Open guided prompt →
        </button>
      </article>

      <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
        <FilmStripBadge label="Write" />
        <h2 className="serif mt-5 text-3xl leading-tight sm:text-4xl">
          Start blank, write with assistance
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-[var(--foreground)]/70">
          Begin with a single empty scene and write yourself. Inline
          actions on each scene give you a Rewrite, Tighten, Extend,
          and Suggest a turn whenever you want a hand.
        </p>
        <button
          type="button"
          onClick={onChooseBlank}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-white/5"
        >
          Start writing →
        </button>
      </article>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Guided form                                                                */
/* -------------------------------------------------------------------------- */

function GuidedForm({
  busy,
  error,
  onCancel,
  onGenerate,
}: {
  busy: boolean;
  error: string | null;
  onCancel: () => void;
  onGenerate: (prompt: GuidedScreenplayPrompt) => void;
}) {
  const [logline, setLogline] = useState(
    "A late-shift nurse notices the third-floor window across the way stays lit every night — and starts watching back.",
  );
  const [genre, setGenre] = useState("Thriller");
  const [tone, setTone] = useState("Slow burn");
  const [leadCharacter, setLeadCharacter] = useState(
    "Maya, late twenties, weathered jean jacket, observant, calm under pressure.",
  );
  const [targetMinutes, setTargetMinutes] = useState(9);

  return (
    <section className="mt-12">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onGenerate({ logline, genre, tone, leadCharacter, targetMinutes });
        }}
        className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9"
      >
        <header className="flex items-end justify-between gap-4">
          <div>
            <FilmStripBadge label="Guided prompt" />
            <h2 className="serif mt-4 text-3xl leading-tight">
              Generate a screenplay
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--foreground)]/65">
              All fields are editable after generation. Aim for a
              logline that names the lead, the situation, and what is
              at stake.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-[var(--foreground)]/55 transition hover:text-[var(--foreground)]"
          >
            ← Back
          </button>
        </header>

        <Field label="Logline" hint="The whole film in one sentence.">
          <textarea
            value={logline}
            onChange={(e) => setLogline(e.target.value)}
            rows={3}
            required
            className="w-full resize-none rounded-xl border border-white/10 bg-[var(--background)] p-4 text-base leading-7 text-[var(--foreground)] outline-none transition focus:border-[var(--amber)]/50"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Genre">
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[var(--background)] p-3.5 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--amber)]/50"
            />
          </Field>
          <Field label="Tone">
            <input
              type="text"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[var(--background)] p-3.5 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--amber)]/50"
            />
          </Field>
        </div>

        <Field label="Lead character" hint="Name + a few defining details.">
          <textarea
            value={leadCharacter}
            onChange={(e) => setLeadCharacter(e.target.value)}
            rows={2}
            className="w-full resize-none rounded-xl border border-white/10 bg-[var(--background)] p-4 text-base leading-7 text-[var(--foreground)] outline-none transition focus:border-[var(--amber)]/50"
          />
        </Field>

        <Field
          label={`Target runtime — ${targetMinutes} min`}
          hint={`Capped at ${FILM_MAX_DURATION}. Each micro scene is ${SCENE_DURATION_RANGE}.`}
        >
          <input
            type="range"
            min={3}
            max={10}
            step={1}
            value={targetMinutes}
            onChange={(e) => setTargetMinutes(Number(e.target.value))}
            className="w-full accent-[var(--amber)]"
          />
        </Field>

        {error ? (
          <p className="rounded-xl border border-[var(--crimson)]/40 bg-[var(--crimson)]/10 p-3 text-sm text-[var(--crimson)]">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-[var(--paper)] px-6 py-3.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--amber-soft)] disabled:cursor-wait disabled:opacity-60"
          >
            {busy ? "Generating screenplay…" : "Generate screenplay"}
          </button>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/45">
            Returns 8 scenes · editable
          </span>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="text-xs text-[var(--foreground)]/45">{hint}</span>
      ) : null}
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* Editor                                                                     */
/* -------------------------------------------------------------------------- */

function Editor({
  screenplay,
  busyScene,
  error,
  onChange,
  onSceneAction,
  onAddScene,
  onRemoveScene,
  onStartOver,
}: {
  screenplay: Screenplay;
  busyScene: number | null;
  error: string | null;
  onChange: (s: Screenplay) => void;
  onSceneAction: (sceneNumber: number, action: SceneAction) => void;
  onAddScene: () => void;
  onRemoveScene: (sceneNumber: number) => void;
  onStartOver: () => void;
}) {
  const runtime = estimateRuntime(screenplay.scenes);
  const overCap = runtime.seconds > SCENE_CAP_SECONDS;

  return (
    <section className="mt-12 space-y-6">
      <EditorHeader
        screenplay={screenplay}
        runtime={runtime}
        overCap={overCap}
        onChange={onChange}
        onStartOver={onStartOver}
      />

      {error ? (
        <p className="rounded-xl border border-[var(--crimson)]/40 bg-[var(--crimson)]/10 p-3 text-sm text-[var(--crimson)]">
          {error}
        </p>
      ) : null}

      <ol className="space-y-4">
        {screenplay.scenes.map((scene) => (
          <SceneCard
            key={scene.number}
            scene={scene}
            busy={busyScene === scene.number}
            onChange={(updated) =>
              onChange({
                ...screenplay,
                scenes: screenplay.scenes.map((s) =>
                  s.number === scene.number ? updated : s,
                ),
              })
            }
            onAction={(action) => onSceneAction(scene.number, action)}
            onRemove={() => onRemoveScene(scene.number)}
          />
        ))}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
        <button
          type="button"
          onClick={onAddScene}
          className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-white/5"
        >
          + Add micro scene
        </button>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/55">
          {screenplay.scenes.length} scenes · {runtime.label}
          {overCap ? " · over the 10 min cap" : null}
        </p>
      </div>
    </section>
  );
}

function EditorHeader({
  screenplay,
  runtime,
  overCap,
  onChange,
  onStartOver,
}: {
  screenplay: Screenplay;
  runtime: { label: string };
  overCap: boolean;
  onChange: (s: Screenplay) => void;
  onStartOver: () => void;
}) {
  return (
    <header className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex-1">
          <FilmStripBadge label="Screenplay" />
          <input
            type="text"
            value={screenplay.title}
            onChange={(e) => onChange({ ...screenplay, title: e.target.value })}
            placeholder="Untitled micro film"
            className="serif mt-4 w-full bg-transparent text-balance text-4xl leading-tight text-[var(--foreground)] outline-none placeholder:text-[var(--foreground)]/30 sm:text-5xl"
          />
          <textarea
            value={screenplay.logline}
            onChange={(e) =>
              onChange({ ...screenplay, logline: e.target.value })
            }
            placeholder="One-line logline."
            rows={2}
            className="mt-3 w-full resize-none bg-transparent text-base leading-7 text-[var(--foreground)]/75 outline-none placeholder:text-[var(--foreground)]/30"
          />
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--foreground)]/55">
            <input
              type="text"
              value={screenplay.genre}
              onChange={(e) => onChange({ ...screenplay, genre: e.target.value })}
              placeholder="Genre"
              className="rounded-full border border-white/10 bg-[var(--background)] px-3 py-1 outline-none transition focus:border-[var(--amber)]/50"
            />
            <input
              type="text"
              value={screenplay.tone}
              onChange={(e) => onChange({ ...screenplay, tone: e.target.value })}
              placeholder="Tone"
              className="rounded-full border border-white/10 bg-[var(--background)] px-3 py-1 outline-none transition focus:border-[var(--amber)]/50"
            />
            <span
              className={`rounded-full border px-3 py-1 font-mono uppercase tracking-[0.18em] ${
                overCap
                  ? "border-[var(--crimson)]/40 text-[var(--crimson)]"
                  : "border-[var(--amber)]/30 text-[var(--amber-soft)]"
              }`}
            >
              {runtime.label}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onStartOver}
          className="text-sm text-[var(--foreground)]/55 transition hover:text-[var(--foreground)]"
        >
          Start over
        </button>
      </div>
    </header>
  );
}

function SceneCard({
  scene,
  busy,
  onChange,
  onAction,
  onRemove,
}: {
  scene: ScreenplayScene;
  busy: boolean;
  onChange: (s: ScreenplayScene) => void;
  onAction: (action: SceneAction) => void;
  onRemove: () => void;
}) {
  return (
    <li
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition ${
        busy ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="serif text-2xl text-[var(--foreground)]/80">
            {String(scene.number).padStart(2, "0")}
          </span>
          <input
            type="text"
            value={scene.heading}
            onChange={(e) => onChange({ ...scene, heading: e.target.value })}
            placeholder="INT. LOCATION — TIME"
            className="w-full bg-transparent font-mono text-xs uppercase tracking-[0.18em] text-[var(--amber-soft)] outline-none placeholder:text-[var(--foreground)]/30"
          />
        </div>
        <input
          type="text"
          value={scene.duration}
          onChange={(e) => onChange({ ...scene, duration: e.target.value })}
          className="w-20 rounded-md border border-white/10 bg-[var(--background)] px-2 py-1 text-right font-mono text-xs uppercase tracking-[0.16em] text-[var(--foreground)]/65 outline-none focus:border-[var(--amber)]/50"
        />
      </div>

      <textarea
        value={scene.action}
        onChange={(e) => onChange({ ...scene, action: e.target.value })}
        placeholder="Action — what happens, present tense, active voice."
        rows={3}
        className="mt-4 w-full resize-none rounded-xl bg-[var(--background)]/60 p-4 font-mono text-[13px] leading-6 text-[var(--foreground)] outline-none transition focus:bg-[var(--background)]"
      />

      <ul className="mt-3 space-y-2">
        {scene.dialogue.map((line, idx) => (
          <li key={idx} className="rounded-lg bg-[var(--background)]/40 p-3">
            <div className="grid gap-2 sm:grid-cols-[160px_1fr]">
              <input
                type="text"
                value={line.character}
                onChange={(e) => {
                  const next = [...scene.dialogue];
                  next[idx] = { ...next[idx], character: e.target.value };
                  onChange({ ...scene, dialogue: next });
                }}
                placeholder="CHARACTER"
                className="bg-transparent font-mono text-xs uppercase tracking-[0.2em] text-[var(--foreground)]/85 outline-none placeholder:text-[var(--foreground)]/30"
              />
              <input
                type="text"
                value={line.line}
                onChange={(e) => {
                  const next = [...scene.dialogue];
                  next[idx] = { ...next[idx], line: e.target.value };
                  onChange({ ...scene, dialogue: next });
                }}
                placeholder="The line."
                className="bg-transparent font-mono text-[13px] text-[var(--foreground)] outline-none placeholder:text-[var(--foreground)]/30"
              />
            </div>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() =>
              onChange({
                ...scene,
                dialogue: [...scene.dialogue, { character: "", line: "" }],
              })
            }
            className="text-xs text-[var(--foreground)]/55 transition hover:text-[var(--foreground)]"
          >
            + Add dialogue
          </button>
        </li>
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(sceneActionCopy) as SceneAction[]).map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => onAction(action)}
              disabled={busy}
              className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-[var(--foreground)]/75 transition hover:border-[var(--amber)]/45 hover:text-[var(--foreground)] disabled:cursor-wait disabled:opacity-50"
            >
              {sceneActionCopy[action]}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-[var(--foreground)]/45 transition hover:text-[var(--crimson)]"
        >
          Remove scene
        </button>
      </div>
    </li>
  );
}
