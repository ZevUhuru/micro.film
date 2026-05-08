import type { ReactNode } from "react";

type FilmStripProps = {
  children?: ReactNode;
  /** Show sprocket holes on top, bottom, or both edges. */
  edges?: "both" | "top" | "bottom";
  /** Number of sprocket holes per edge. */
  holes?: number;
  className?: string;
  /** Background tone for the strip body. */
  tone?: "ink" | "paper";
};

/**
 * Reusable filmstrip frame with sprocket holes on the long edges.
 * Used as a recurring brand motif across micro.film surfaces.
 */
export function FilmStrip({
  children,
  edges = "both",
  holes = 14,
  className = "",
  tone = "ink",
}: FilmStripProps) {
  const stripBg = tone === "ink" ? "bg-[var(--film-edge)]" : "bg-[var(--paper)]";
  const holeFill = tone === "ink" ? "bg-[var(--background)]" : "bg-[var(--ink)]";

  const edge = (
    <div className="flex h-6 w-full items-center justify-around px-3">
      {Array.from({ length: holes }).map((_, index) => (
        <span
          key={index}
          className={`h-2 w-3 rounded-[2px] ${holeFill} opacity-90`}
        />
      ))}
    </div>
  );

  return (
    <div className={`${stripBg} ${className}`}>
      {(edges === "both" || edges === "top") && edge}
      <div className="px-2">{children}</div>
      {(edges === "both" || edges === "bottom") && edge}
    </div>
  );
}

/**
 * Tiny inline filmstrip indicator (used inline in headers, badges, etc).
 */
export function FilmStripBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-soft)]">
      <span className="flex h-2 w-2 rounded-[1px] bg-[var(--amber)]" />
      {label}
    </span>
  );
}
