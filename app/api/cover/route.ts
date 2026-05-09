/**
 * Cover API.
 *
 * Two product modes are supported:
 *
 *   1. Generate:  { mode: "generate", prompt, style?, palette? }
 *      → returns a new Cover (9:16 vertical) for the given prompt.
 *
 *   2. Edit:      { mode: "edit", source, instruction }
 *      → returns a new Cover derived from `source`, applying the
 *        edit instruction in plain language.
 *
 * v0.1 returns local SVG mocks so the cover gallery roundtrips
 * without a provider account. The real implementation routes through
 * api.esy.com per the Esy architecture (clip.art / micro.film delegate
 * all generation to Esy) and uses ChatGPT Images 2.0 (`gpt-image-2`).
 *
 * Wiring notes (production):
 *
 *   - Use the dated snapshot id `gpt-image-2-2026-04-21` for catalog
 *     assets (anything persisted to a project library); use the
 *     un-dated `gpt-image-2` major-version id for live single-user
 *     generation. Forbidden: `chatgpt-image-latest` — that alias
 *     points at the older pre-2.0 ChatGPT image model. See
 *     `.cursor/rules/model-pinning.mdc`.
 *   - Pull the model id from a named constant in a wrapper module,
 *     not inlined in the API call.
 *   - Request 1024x1536 (vertical) for cover output — this matches
 *     gpt-image-2 vertical and the SVG mock dimensions.
 *   - Persist the exact model id alongside the cover so we can audit
 *     which model produced which image.
 */

import {
  mockEditCover,
  mockGenerateCover,
  type CoverEditRequest,
  type CoverGenerateRequest,
  type CoverPalette,
} from "@/lib/cover";

type CoverRequestBody =
  | (CoverGenerateRequest & { mode: "generate" })
  | (CoverEditRequest & { mode: "edit" });

const knownPalettes: CoverPalette[] = [
  "amber-noir",
  "neon-rain",
  "moonlit-blue",
  "rust-and-rose",
  "celluloid-warm",
  "graphite",
];

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as CoverRequestBody | null;

  if (!body || !("mode" in body)) {
    return Response.json(
      { error: "Request body must include a `mode` field." },
      { status: 400 },
    );
  }

  // Simulate provider latency so loading states are visible.
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (body.mode === "generate") {
    const prompt = (body.prompt ?? "").trim();
    if (!prompt) {
      return Response.json(
        { error: "`prompt` is required for generate." },
        { status: 400 },
      );
    }
    const palette =
      body.palette && knownPalettes.includes(body.palette)
        ? body.palette
        : undefined;
    const cover = mockGenerateCover({
      mode: "generate",
      prompt,
      style: body.style?.trim() || undefined,
      palette,
    });
    return Response.json({ cover, source: "mock-v0.1" }, { status: 200 });
  }

  if (body.mode === "edit") {
    const instruction = (body.instruction ?? "").trim();
    if (!body.source?.id || !body.source?.imageUrl) {
      return Response.json(
        { error: "`source` cover (with id and imageUrl) is required for edit." },
        { status: 400 },
      );
    }
    if (!instruction) {
      return Response.json(
        { error: "`instruction` is required for edit." },
        { status: 400 },
      );
    }
    const cover = mockEditCover({
      mode: "edit",
      source: body.source,
      instruction,
    });
    return Response.json({ cover, source: "mock-v0.1" }, { status: 200 });
  }

  return Response.json({ error: "Unsupported mode." }, { status: 400 });
}

export async function GET() {
  return Response.json({
    service: "micro.film/cover",
    status: "prototype",
    modes: ["generate", "edit"],
    aspectRatio: "9:16",
    targetSize: "1024x1536",
    palettes: knownPalettes,
    notes: [
      "v0.1 returns SVG data URIs composed from a fixed palette set.",
      "Wiring target: api.esy.com → gpt-image-2 (ChatGPT Images 2.0).",
      "Use the dated snapshot id `gpt-image-2-2026-04-21` for catalog assets.",
      "Forbidden: `chatgpt-image-latest` — points at pre-2.0 model.",
    ],
  });
}
