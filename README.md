# micro.film

A cinematic studio for vertical micro films, end to end — **built for
the AI era**. Screenplay with assistance, cover art with ChatGPT
Images 2.0, every 45–90 second micro scene rendered on a
state-of-the-art video model, all stitched into a finished film of
**up to ten minutes**. Built for **brands, agencies, publishers, and
independent filmmakers** — the people making the films.

`/watch` is the Micro Film Studios library: an open showcase that proves what the
platform can do. There is no consumer paywall. Commercial conversations
happen through the **Talk to us** CTA (`mailto:studio@micro.film`).

## Vocabulary

- **Micro film** — the form. A vertical film capped at 10 minutes, composed of micro scenes. The encyclopedic standard runs 8–15 minutes; we sit at the lower end on purpose. See [`/about`](https://micro.film/about) and the [Baidu Baike entry on 微电影](https://baike.baidu.com/en/item/Micro%20Film/1503431).
- **Screenplay** — the first deliverable of every micro film. Title, logline, characters, scenes with action and dialogue. Always *screenplay*, never "script."
- **Cover** — the 9:16 vertical visual identity of a micro film. Generated and edited with ChatGPT Images 2.0. Always *cover*, never "poster" or "thumbnail" in product copy.
- **Micro scene** — the unit. 45–90 seconds, 9:16, locked to a character.
- **Cut** — the assembled sequence of micro scenes that make the film.
- **Project** — a single micro film a creator or team is building inside the studio.
- **Showcase** — the library at `/watch` of films produced by Micro Film Studios that prove what the platform can do.
- **Micro Film Studios** — our in-house production house, credited on every film we ship at `/watch`. Always written in full; never shortened to "the in-house studio" or "the studio" (which means the `/studio` workspace).

We make **films**, not shows. Avoid "episode" / "series" wording. The
unit is a **micro scene** — never weakened to "short scene." The brand
word is *micro*.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/` — landing page and product positioning.
- `/studio` — production interface where projects come together.
- `/studio/screenplay` — screenplay editor (write with assistance, or generate from a guided prompt).
- `/studio/cover` — cover workspace (generate + edit 9:16 cover art with ChatGPT Images 2.0).
- `/commercial` — business-facing commercial studio for brand films, architectural and estate films, performance creative, and publisher campaigns.
- `/about` — what is a micro film? Definition + four "micros" + origin + how our 10-min cap relates to the 8–15 min standard, sourced from the Baidu Baike entry on 微电影.
- `/blog` and `/blog/[slug]` — editorial notes on the form and craft.
- `/watch/[slug]` — Micro Film Studios showcase film page.
- `/api/runs` — prototype run contract for micro scene + film orchestration.
- `/api/screenplay` — screenplay generate / per-scene assist endpoint (mocked in v0.1; wires to Esy).
- `/api/cover` — cover generate / edit endpoint (mocked in v0.1; wires to Esy → `gpt-image-2`).

## The Four-Step Pipeline

1. **Research** — Pull references, mood, and the through-line.
2. **Develop** — **Write the screenplay** (title, logline, characters, scenes with action + dialogue) — yourself with assistance or generated from a guided prompt. Cast a character with a locked reference sheet, lock the shot list, and **make the 9:16 cover** with ChatGPT Images 2.0.
3. **Generate** — Render every 45–90 second micro scene at 9:16, character locked end to end.
4. **Stitch** — Cut the micro scenes into a finished micro film of up to ten minutes, ready for a campaign or a publisher channel.

Provider calls are not wired yet. The app defines the product surface
and API shape so the production pipeline can be connected once
available.

## Commands

```bash
npm run dev
npm run lint
npm run build
```

## Notes

- Keep provider orchestration outside the public UI layer.
- Do not use floating model aliases like `latest`.
- A micro film is a film, not a clip and not a show. Copy and UI must
  reflect that. Micro scenes — never "episodes," and never weakened to
  "short scenes."
- The public site does **not** mention pricing, paywalls, passes, or
  subscriptions. Commercial conversations happen via Talk to us.
