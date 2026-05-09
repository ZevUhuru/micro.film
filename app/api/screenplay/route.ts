/**
 * Screenplay API.
 *
 * Two product modes are supported:
 *
 *   1. Generate from a guided prompt: { mode: "generate", prompt }
 *      → returns a full Screenplay draft.
 *
 *   2. Per-scene assist: { mode: "rewrite" | "tighten" | "extend"
 *      | "suggest_turn", scene } → returns a single ScreenplayScene.
 *
 * v0.1 returns deterministic local mocks so the editor can roundtrip
 * without a provider account. The real implementation routes through
 * api.esy.com per the Esy architecture (clip.art / micro.film delegate
 * all generation to Esy). When wiring:
 *
 *   - Pin the model to a dated snapshot id, never a "*-latest" alias.
 *     See `.cursor/rules/model-pinning.mdc`.
 *   - Pull the model id from a named constant in a wrapper module,
 *     not inlined in the API call.
 *   - Record the exact model id alongside any persisted screenplay
 *     so we can audit which model produced which draft.
 */

import {
  mockGenerateScreenplay,
  mockRewriteScene,
  type GuidedScreenplayPrompt,
  type ScreenplayScene,
} from "@/lib/screenplay";

type GenerateRequest = {
  mode: "generate";
  prompt: GuidedScreenplayPrompt;
};

type SceneAssistRequest = {
  mode: "rewrite" | "tighten" | "extend" | "suggest_turn";
  scene: ScreenplayScene;
  /** Optional free-form direction from the writer. */
  instruction?: string;
};

type ScreenplayRequest = GenerateRequest | SceneAssistRequest;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ScreenplayRequest | null;

  if (!body || !("mode" in body)) {
    return Response.json(
      { error: "Request body must include a `mode` field." },
      { status: 400 },
    );
  }

  // Simulate provider latency so the UI loading states are visible.
  await new Promise((resolve) => setTimeout(resolve, 350));

  if (body.mode === "generate") {
    if (!body.prompt?.logline) {
      return Response.json(
        { error: "`prompt.logline` is required for generate." },
        { status: 400 },
      );
    }
    const screenplay = mockGenerateScreenplay({
      logline: body.prompt.logline,
      genre: body.prompt.genre || "Drama",
      tone: body.prompt.tone || "Slow burn",
      leadCharacter: body.prompt.leadCharacter || "",
      targetMinutes: clampTargetMinutes(body.prompt.targetMinutes),
    });
    return Response.json({ screenplay, source: "mock-v0.1" }, { status: 200 });
  }

  if (
    body.mode === "rewrite" ||
    body.mode === "tighten" ||
    body.mode === "extend" ||
    body.mode === "suggest_turn"
  ) {
    if (!body.scene) {
      return Response.json(
        { error: "`scene` is required for per-scene assist." },
        { status: 400 },
      );
    }
    const scene = mockRewriteScene(body.scene, body.mode);
    return Response.json({ scene, source: "mock-v0.1" }, { status: 200 });
  }

  return Response.json({ error: "Unsupported mode." }, { status: 400 });
}

function clampTargetMinutes(value: unknown): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 9;
  return Math.max(1, Math.min(10, Math.round(n)));
}

export async function GET() {
  return Response.json({
    service: "micro.film/screenplay",
    status: "prototype",
    modes: ["generate", "rewrite", "tighten", "extend", "suggest_turn"],
    notes: [
      "v0.1 returns deterministic local mocks.",
      "Wiring target: api.esy.com screenplay endpoint.",
      "Model id must be a dated snapshot when wired (no *-latest aliases).",
    ],
  });
}
