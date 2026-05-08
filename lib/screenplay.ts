/**
 * Screenplay model + helpers.
 *
 * The screenplay is the **first deliverable** of the Develop step. Every
 * micro film starts here: title, logline, characters, ordered scenes
 * with action and dialogue. From the screenplay, each scene maps 1:1 to
 * a micro scene at render time (Generate step).
 *
 * Brand language: we call it a *screenplay*, not a script. It is the
 * cinematic noun. Avoid "script" in user-facing copy. The verbs are
 * Write, Rewrite, Tighten, Extend, Suggest a turn — concrete craft
 * actions, not generic AI verbs like "magic" or "improve."
 *
 * Generation is currently mocked locally. When wired to ESY's
 * api.esy.com, the model id must follow the model-pinning rule:
 * dated snapshots only, no floating "*-latest" aliases. See
 * `.cursor/rules/model-pinning.mdc`.
 */

export type DialogueLine = {
  character: string;
  line: string;
  /** Optional parenthetical direction, e.g. "(quietly)" */
  direction?: string;
};

export type ScreenplayScene = {
  number: number;
  /** "INT./EXT. LOCATION — TIME" — standard slugline format. */
  heading: string;
  /** Narrative description of the scene. Present tense, active voice. */
  action: string;
  dialogue: DialogueLine[];
  /** Estimated runtime label, e.g. "60s" — should sit inside 45–90s. */
  duration: string;
};

export type ScreenplayCharacter = {
  name: string;
  /** One-line role: "Lead — late-shift nurse" */
  role: string;
  description: string;
};

export type Screenplay = {
  title: string;
  logline: string;
  genre: string;
  tone: string;
  characters: ScreenplayCharacter[];
  scenes: ScreenplayScene[];
};

/* -------------------------------------------------------------------------- */
/* Empty / sample defaults                                                    */
/* -------------------------------------------------------------------------- */

export const emptyScreenplay: Screenplay = {
  title: "",
  logline: "",
  genre: "",
  tone: "",
  characters: [],
  scenes: [],
};

export type GuidedScreenplayPrompt = {
  logline: string;
  genre: string;
  tone: string;
  leadCharacter: string;
  /** Target film runtime in minutes (capped at 10). */
  targetMinutes: number;
};

export function blankScene(number: number): ScreenplayScene {
  return {
    number,
    heading: "INT. LOCATION — TIME",
    action: "",
    dialogue: [],
    duration: "60s",
  };
}

/**
 * Estimate total runtime from per-scene duration labels. Returns a
 * label like "9 min 40 sec" or "3 min" — used in the editor header.
 *
 * Parses durations of the form "60s", "1m 12s", "1m", "90s", etc.
 */
export function estimateRuntime(scenes: ScreenplayScene[]): {
  seconds: number;
  label: string;
} {
  let total = 0;
  for (const scene of scenes) {
    total += parseDurationToSeconds(scene.duration);
  }
  return { seconds: total, label: formatRuntimeLabel(total) };
}

function parseDurationToSeconds(raw: string): number {
  const value = raw.trim().toLowerCase();
  const minutes = /(\d+)\s*m/.exec(value);
  const seconds = /(\d+)\s*s/.exec(value);
  let total = 0;
  if (minutes) total += Number(minutes[1]) * 60;
  if (seconds) total += Number(seconds[1]);
  if (!minutes && !seconds) {
    const fallback = Number(value);
    if (!Number.isNaN(fallback)) total = fallback;
  }
  return total;
}

function formatRuntimeLabel(totalSeconds: number): string {
  if (totalSeconds <= 0) return "0 sec";
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m === 0) return `${s} sec`;
  if (s === 0) return `${m} min`;
  return `${m} min ${s} sec`;
}

/* -------------------------------------------------------------------------- */
/* Mock generator (v0.1 — replaces with ESY screenplay API)                   */
/* -------------------------------------------------------------------------- */

/**
 * Deterministic mock that turns a guided prompt into a full screenplay
 * draft. Used so the editor has a real shape to render in v0.1 before
 * the ESY screenplay endpoint exists. Output is an 8-scene structure
 * sized to fit the 10-min cap.
 */
export function mockGenerateScreenplay(
  prompt: GuidedScreenplayPrompt,
): Screenplay {
  const lead = prompt.leadCharacter.trim() || "MAYA";
  const leadName = lead.split(",")[0]?.trim().toUpperCase() || "MAYA";

  const targetSeconds = Math.max(
    180,
    Math.min(600, Math.round(prompt.targetMinutes * 60)),
  );
  const sceneCount = 8;
  const baseSceneSeconds = Math.round(targetSeconds / sceneCount);
  const sceneDuration = `${baseSceneSeconds}s`;

  const titleHint = prompt.logline
    .split(/[.!?\n]/)[0]
    ?.trim()
    .replace(/^a /i, "")
    .replace(/^the /i, "")
    .slice(0, 48) || "Untitled Micro Film";

  return {
    title: titleHint
      .split(" ")
      .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" "),
    logline: prompt.logline,
    genre: prompt.genre,
    tone: prompt.tone,
    characters: [
      {
        name: leadName,
        role: "Lead",
        description: lead,
      },
    ],
    scenes: [
      {
        number: 1,
        heading: "INT. APARTMENT — NIGHT",
        action: `${leadName} comes home from a long shift and notices something across the way that should not be there.`,
        dialogue: [
          { character: leadName, line: "That's the third night.", direction: "to herself" },
        ],
        duration: sceneDuration,
      },
      {
        number: 2,
        heading: "EXT. STREET — MORNING",
        action: `The same coat. The same bus stop. ${leadName} clocks the pattern before her coffee finishes.`,
        dialogue: [],
        duration: sceneDuration,
      },
      {
        number: 3,
        heading: "INT. PHARMACY — DAY",
        action: "An offhand comment from the pharmacist confirms what she had begun to suspect.",
        dialogue: [
          { character: "PHARMACIST", line: "He's been here before. Different name." },
        ],
        duration: sceneDuration,
      },
      {
        number: 4,
        heading: "INT. APARTMENT — NIGHT",
        action: `${leadName} pulls down the calendar, the receipts, the photo from October. She is not the first.`,
        dialogue: [],
        duration: sceneDuration,
      },
      {
        number: 5,
        heading: "INT. STAIRWELL — NIGHT",
        action: "He passes her on the landing without looking. He looks twice on the next floor.",
        dialogue: [],
        duration: sceneDuration,
      },
      {
        number: 6,
        heading: "EXT. APARTMENT BUILDING — NIGHT",
        action: `${leadName} crosses the street. Walks up to the third floor. Knocks.`,
        dialogue: [
          { character: leadName, line: "I know what you're doing." },
        ],
        duration: sceneDuration,
      },
      {
        number: 7,
        heading: "INT. APARTMENT — NIGHT",
        action: "The window across the way goes dark. For the first time in three weeks.",
        dialogue: [],
        duration: sceneDuration,
      },
      {
        number: 8,
        heading: "INT. APARTMENT — DAWN",
        action: "Light returns. Not from across the way — from her own kitchen.",
        dialogue: [
          { character: leadName, line: "Now you know what it's like." },
        ],
        duration: sceneDuration,
      },
    ],
  };
}

/**
 * Mock per-scene rewrite. Returns the input scene with a small,
 * obvious mutation so the UI roundtrip is visible. Real version
 * routes the scene + instruction through ESY.
 */
export function mockRewriteScene(
  scene: ScreenplayScene,
  instruction: "rewrite" | "tighten" | "extend" | "suggest_turn",
): ScreenplayScene {
  switch (instruction) {
    case "tighten":
      return {
        ...scene,
        action: scene.action.replace(/(\.\s)/g, ".\n").split("\n")[0] || scene.action,
      };
    case "extend":
      return {
        ...scene,
        action:
          scene.action +
          (scene.action ? " " : "") +
          "She holds the moment one beat longer than is comfortable.",
      };
    case "suggest_turn":
      return {
        ...scene,
        action:
          scene.action +
          (scene.action ? " Then — " : "") +
          "the light across the way flickers, exactly once.",
      };
    case "rewrite":
    default:
      return {
        ...scene,
        action: scene.action
          ? `${scene.action.replace(/^./, (c) => c.toUpperCase())} The frame holds.`
          : "The frame holds. Something has changed.",
      };
  }
}
