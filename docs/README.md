# micro.film — Docs

This folder is the working knowledge base for micro.film. It is intentionally
small and human-readable. Add to it as the product changes.

## What lives here

- [`style-guide.md`](./style-guide.md) — Locked brand, palette, typography,
  components, voice, and accessibility rules. This is the default style guide.
  Improve it over time but do not silently fork it.
- [`sessions/`](./sessions) — Dated session logs. One file per session of
  meaningful work. Record what was built, what was decided, and what is open.

## Vocabulary

Always use these terms consistently in code, copy, and product surfaces:

- **Micro film** — the form. Vertical, ≤ 3 minutes, fully composed.
- **Scene** — the render unit. 15 seconds, 9:16, locked to a character.
- **Cut** — the assembled sequence of scenes that make the film.
- **Series** — an ordered run of micro films around the same characters.
- **Episode** — one micro film inside a series.

## Process

1. Before changing the visual system, read `style-guide.md`.
2. Before starting a session of meaningful work, open a new session log under
   `sessions/YYYY-MM-DD.md`.
3. Before shipping, update the session log with what landed.
