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

- **Micro film** — the form. A vertical film capped at 10 minutes, composed of micro scenes. The encyclopedic standard for the form is 8–15 minutes (see the Baidu Baike entry on 微电影 and our `/about` page); we sit at the lower end on purpose so every film stays watchable in one sitting.
- **Screenplay** — the first deliverable of every micro film. Title, logline, characters, scenes with action and dialogue. Lives at `/studio/screenplay`. Always called a *screenplay*, never a "script."
- **Cover** — the 9:16 vertical visual identity of a micro film. Generated and edited with ChatGPT Images 2.0. Lives at `/studio/cover`. Always called a *cover*, never a "poster" or "thumbnail" in product copy.
- **Micro scene** — the unit. 45–90 seconds, 9:16, locked to a character.
- **Cut** — the assembled sequence of micro scenes that make the film.
- **Project** — a single micro film a creator or team is building inside the studio.
- **Showcase** — the library at `/watch` of films produced by Micro Film Studios that prove what the platform can do.
- **Micro Film Studios** — our in-house production house. Every film at `/watch` is credited "From Micro Film Studios." Always written in full; never shortened to "the in-house studio" (which would collide with `/studio`, the production workspace).

We make **films**, not shows. Do not use "episode" or "series" as
product nouns.

Do not weaken the unit by calling it a "short scene" — the brand word
is **micro**. Bare "scene" is acceptable only as a casual short-form
once context is established.

The product is for the **people making the films**: brands, agencies,
publishers, and independent filmmakers. The public site does not
mention pricing, paywalls, passes, or subscriptions. Commercial
conversations happen via the Talk to us CTA
(`mailto:studio@micro.film`).

## Process

1. Before changing the visual system, read `style-guide.md`.
2. Before starting a session of meaningful work, open a new session log under
   `sessions/YYYY-MM-DD.md`.
3. Before shipping, update the session log with what landed.
