# micro.film

A cinematic studio for short-form film. Cast a character, write scenes, and
cut a vertical micro film up to three minutes long for TikTok, YouTube
Shorts, and Instagram Reels.

## Vocabulary

- **Micro film** — the form. Vertical, ≤ 3 minutes, fully composed.
- **Scene** — the render unit. 15 seconds, 9:16, locked to a character.
- **Cut** — the assembled sequence of scenes that make the film.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/` — landing page and product positioning.
- `/studio` — prototype creator interface.
- `/blog` and `/blog/[slug]` — editorial notes on the form and craft.
- `/api/runs` — starter run contract for scene + film orchestration.

## MVP Pipeline

1. Capture the film premise and lead character.
2. Generate a character reference sheet with `gpt-image-2`.
3. Write each 15-second scene from the studio slate.
4. Render every scene with `seedance-2.0`.
5. Cut the scenes into a finished micro film and export it to TikTok,
   YouTube Shorts, or Instagram Reels.

Provider calls are not wired yet. The app defines the product surface and API
shape so the production pipeline can be connected once available.

## Commands

```bash
npm run dev
npm run lint
npm run build
```

## Notes

- Keep provider orchestration outside the public UI layer.
- Do not use floating model aliases like `latest`.
- A micro film is a film, not a clip. Copy and UI should reflect that.
