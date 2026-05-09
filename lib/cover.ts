/**
 * Cover art model + helpers.
 *
 * The cover is the **9:16 vertical visual identity** of a micro film —
 * the poster you see in the showcase grid, the OG image when the film
 * is shared, the first frame of any reel cut. It is generated from a
 * prompt (text → image) and refined with edits (image + instruction →
 * new image), powered by ChatGPT Images 2.0 (`gpt-image-2`).
 *
 * Brand language: we call it a *cover*, not a poster or thumbnail. The
 * verb is *Make the cover.* The model is named in copy when relevant
 * ("Edited with ChatGPT Images 2.0") to set expectations on quality.
 *
 * Generation is currently mocked locally — the API returns SVG data
 * URIs that compose cinematic gradients so the gallery looks real
 * before the Esy image endpoint exists. When wired:
 *
 *   - Image generation routes through api.esy.com → gpt-image-2.
 *   - Per the model-pinning rule, prefer the dated snapshot id
 *     `gpt-image-2-2026-04-21` for catalog assets, or the un-dated
 *     major-version id `gpt-image-2` for live single-user generation.
 *     Forbidden: `chatgpt-image-latest` (points at the older
 *     pre-2.0 ChatGPT image model). See
 *     `.cursor/rules/model-pinning.mdc`.
 *   - The exact model id used must be persisted alongside the cover
 *     so we can audit which model produced which artifact.
 */

export type CoverPalette =
  | "amber-noir"
  | "neon-rain"
  | "moonlit-blue"
  | "rust-and-rose"
  | "celluloid-warm"
  | "graphite";

export type Cover = {
  id: string;
  prompt: string;
  /** Data URI (SVG) in v0.1; will be a real R2/CDN URL once wired. */
  imageUrl: string;
  /** Parent cover for edits — chains back to the original generate. */
  sourceCoverId: string | null;
  /** Visual palette token used by the mock generator; metadata only. */
  palette: CoverPalette;
  /** Free-form style label. Optional. */
  style?: string;
  createdAt: string;
};

export type CoverGenerateRequest = {
  mode: "generate";
  prompt: string;
  /** Optional style hint, e.g. "cinematic", "neo-noir", "painterly". */
  style?: string;
  /** Optional palette override; otherwise picked from the prompt hash. */
  palette?: CoverPalette;
};

export type CoverEditRequest = {
  mode: "edit";
  /** The cover being edited. */
  source: Cover;
  /** Plain-language edit instruction. */
  instruction: string;
};

export type CoverRequest = CoverGenerateRequest | CoverEditRequest;

/* -------------------------------------------------------------------------- */
/* Palette table — handpicked cinematic colorways                             */
/* -------------------------------------------------------------------------- */

type PaletteSpec = {
  /** Vertical gradient stops, top → bottom. */
  base: [string, string, string];
  /** Radial accent color (with alpha) and origin. */
  accent: { color: string; cx: number; cy: number; r: number };
  /** Foreground text color for the title placeholder. */
  ink: string;
  /** Subtitle color. */
  subInk: string;
  /** Eyebrow / mono color. */
  eyebrow: string;
};

const palettes: Record<CoverPalette, PaletteSpec> = {
  "amber-noir": {
    base: ["#3a2316", "#1a110b", "#06050a"],
    accent: { color: "rgba(241,207,148,0.45)", cx: 0.72, cy: 0.18, r: 0.6 },
    ink: "#f4eee2",
    subInk: "rgba(244,238,226,0.78)",
    eyebrow: "#e8b86a",
  },
  "neon-rain": {
    base: ["#0d1730", "#1b1138", "#05030f"],
    accent: { color: "rgba(255,84,168,0.45)", cx: 0.28, cy: 0.32, r: 0.55 },
    ink: "#f4eee2",
    subInk: "rgba(244,238,226,0.8)",
    eyebrow: "#82e0ff",
  },
  "moonlit-blue": {
    base: ["#142433", "#0a1622", "#040810"],
    accent: { color: "rgba(135,200,255,0.4)", cx: 0.62, cy: 0.22, r: 0.65 },
    ink: "#f4eee2",
    subInk: "rgba(244,238,226,0.75)",
    eyebrow: "#aed8ff",
  },
  "rust-and-rose": {
    base: ["#3b1a18", "#1f0a10", "#06030a"],
    accent: { color: "rgba(255,150,170,0.4)", cx: 0.32, cy: 0.78, r: 0.65 },
    ink: "#f4eee2",
    subInk: "rgba(244,238,226,0.78)",
    eyebrow: "#ff9eb0",
  },
  "celluloid-warm": {
    base: ["#2c2117", "#16100a", "#070504"],
    accent: { color: "rgba(255,205,140,0.45)", cx: 0.5, cy: 0.18, r: 0.7 },
    ink: "#f4eee2",
    subInk: "rgba(244,238,226,0.78)",
    eyebrow: "#ffd29a",
  },
  graphite: {
    base: ["#1f2024", "#0d0e11", "#040506"],
    accent: { color: "rgba(255,255,255,0.18)", cx: 0.7, cy: 0.85, r: 0.7 },
    ink: "#f4eee2",
    subInk: "rgba(244,238,226,0.7)",
    eyebrow: "#cfd6df",
  },
};

const paletteOrder: CoverPalette[] = [
  "amber-noir",
  "neon-rain",
  "moonlit-blue",
  "rust-and-rose",
  "celluloid-warm",
  "graphite",
];

/* -------------------------------------------------------------------------- */
/* Mock generator (v0.1 — replaced by gpt-image-2 via Esy)                    */
/* -------------------------------------------------------------------------- */

/**
 * Builds a cinematic 9:16 cover composition as an inline SVG and
 * returns it as a data URI. Used so the cover gallery looks real
 * before the Esy image endpoint exists. Output dimensions are
 * 1024x1536 — the gpt-image-2 vertical size we'll request live.
 */
export function mockGenerateCover(
  request: CoverGenerateRequest,
  options?: { id?: string; createdAt?: string },
): Cover {
  const palette = request.palette ?? pickPaletteFromText(request.prompt);
  const titleHint = extractTitleHint(request.prompt);
  const id = options?.id ?? generateCoverId();
  const createdAt = options?.createdAt ?? new Date().toISOString();

  return {
    id,
    prompt: request.prompt,
    imageUrl: composeCoverSvg(titleHint, palette, request.style),
    sourceCoverId: null,
    palette,
    style: request.style,
    createdAt,
  };
}

/**
 * Mock per-cover edit. Shifts the palette slightly and prepends an
 * "Edit:" eyebrow so the visual roundtrip is unmistakable. Real
 * version sends `source.imageUrl` + `instruction` to gpt-image-2.
 */
export function mockEditCover(
  request: CoverEditRequest,
  options?: { id?: string; createdAt?: string },
): Cover {
  const id = options?.id ?? generateCoverId();
  const createdAt = options?.createdAt ?? new Date().toISOString();
  const nextPalette = nudgePalette(request.source.palette);
  const titleHint = extractTitleHint(request.source.prompt);

  return {
    id,
    prompt: `${request.source.prompt} — ${request.instruction}`,
    imageUrl: composeCoverSvg(titleHint, nextPalette, request.source.style, {
      eyebrow: "Edited with ChatGPT Images 2.0",
    }),
    sourceCoverId: request.source.id,
    palette: nextPalette,
    style: request.source.style,
    createdAt,
  };
}

/* -------------------------------------------------------------------------- */
/* SVG composition                                                            */
/* -------------------------------------------------------------------------- */

function composeCoverSvg(
  title: string,
  paletteToken: CoverPalette,
  style: string | undefined,
  overrides?: { eyebrow?: string },
): string {
  const p = palettes[paletteToken];
  const eyebrow = overrides?.eyebrow ?? "micro.film cover";
  const subtitle = style ? styleSubtitle(style) : "9:16 · vertical";
  const titleLines = wrapText(title.toUpperCase(), 18, 3);

  const safeTitleLines = titleLines.map(escapeXml).join("\n");
  // Build text spans — 80px line height, anchored from the bottom up
  const titleSvg = titleLines
    .map(
      (line, idx) =>
        `<text x="80" y="${1380 - (titleLines.length - 1 - idx) * 96}" font-family="'Iowan Old Style','Iowa Old Style',Georgia,serif" font-size="92" font-weight="700" fill="${p.ink}" letter-spacing="-2">${escapeXml(line)}</text>`,
    )
    .join("");

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1536" width="1024" height="1536" preserveAspectRatio="xMidYMid slice">
  <title>${escapeXml(title)}</title>
  <desc>Mock micro.film cover composition. Palette: ${paletteToken}.</desc>
  <defs>
    <linearGradient id="g-${paletteToken}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.base[0]}"/>
      <stop offset="60%" stop-color="${p.base[1]}"/>
      <stop offset="100%" stop-color="${p.base[2]}"/>
    </linearGradient>
    <radialGradient id="a-${paletteToken}" cx="${p.accent.cx * 100}%" cy="${p.accent.cy * 100}%" r="${p.accent.r * 100}%">
      <stop offset="0%" stop-color="${p.accent.color}"/>
      <stop offset="100%" stop-color="${transparent(p.accent.color)}"/>
    </radialGradient>
    <linearGradient id="vignette-${paletteToken}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="60%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.7)"/>
    </linearGradient>
    <filter id="grain-${paletteToken}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"/>
    </filter>
  </defs>
  <rect width="1024" height="1536" fill="url(#g-${paletteToken})"/>
  <rect width="1024" height="1536" fill="url(#a-${paletteToken})"/>
  <rect width="1024" height="1536" fill="url(#vignette-${paletteToken})"/>
  <rect width="1024" height="1536" filter="url(#grain-${paletteToken})" opacity="0.5"/>
  <text x="80" y="120" font-family="'Courier New',monospace" font-size="22" letter-spacing="6" fill="${p.eyebrow}">${escapeXml(eyebrow.toUpperCase())}</text>
  ${titleSvg}
  <text x="80" y="1430" font-family="'Courier New',monospace" font-size="22" letter-spacing="4" fill="${p.subInk}">${escapeXml(subtitle.toUpperCase())}</text>
  <line x1="80" y1="1462" x2="220" y2="1462" stroke="${p.eyebrow}" stroke-width="3"/>
  <!-- safeTitleLines (for accessibility tools that read SVG):
${safeTitleLines}
  -->
</svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeSvg(svg)}`;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

export function generateCoverId(): string {
  return `cov_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

function pickPaletteFromText(text: string): CoverPalette {
  const sum = Array.from(text).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return paletteOrder[sum % paletteOrder.length];
}

function nudgePalette(current: CoverPalette): CoverPalette {
  const idx = paletteOrder.indexOf(current);
  return paletteOrder[(idx + 1) % paletteOrder.length];
}

function extractTitleHint(prompt: string): string {
  const firstSentence = prompt.split(/[.!?\n]/)[0]?.trim() ?? "";
  if (!firstSentence) return "Untitled";
  // Try to lift a quoted title first
  const quoted = firstSentence.match(/["“]([^"”]+)["”]/);
  if (quoted) return quoted[1];
  // Otherwise take the first 4-5 words
  return firstSentence.split(/\s+/).slice(0, 5).join(" ");
}

function styleSubtitle(style: string): string {
  const cleaned = style.trim();
  if (!cleaned) return "9:16 · vertical";
  return `9:16 · ${cleaned}`;
}

function wrapText(text: string, maxCharsPerLine: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= maxCharsPerLine) {
      current = `${current} ${word}`;
    } else {
      lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  return lines.length ? lines : [text.slice(0, maxCharsPerLine)];
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function transparent(rgba: string): string {
  // "rgba(241,207,148,0.45)" → "rgba(241,207,148,0)"
  return rgba.replace(/[\d.]+\)$/, "0)");
}

function encodeSvg(svg: string): string {
  // Compact and URI-encode for use in an inline data: URL.
  return svg
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/#/g, "%23")
    .replace(/"/g, "'");
}
