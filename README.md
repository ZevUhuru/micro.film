# micro.film

A cinematic studio for micro films. Cast a character, write 45–90 second
micro scenes, cut a fifteen-minute vertical micro film. The first three
micro scenes ship to TikTok, YouTube Shorts, and Instagram Reels as a
free trailer; the rest of the film unlocks with a $2.49 Pass or a
$9.99/mo All-access subscription.

## Vocabulary

- **Micro film** — the form. A ~15 minute vertical film, composed of micro scenes.
- **Micro scene** — the unit. 45–90 seconds, 9:16, locked to a character.
- **Cut** — the assembled sequence of micro scenes that make the film.
- **Pass** — single-film unlock. $2.49.
- **All-access** — subscription. $9.99/mo, every micro scene of every film.

We make **films**, not shows. Avoid "episode" / "series" wording. The
unit is a **micro scene**; reach for that before "scene" alone.

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
3. Write each 45–90 second micro scene from the studio slate.
4. Render every micro scene with `seedance-2.0`.
5. Cut the micro scenes into a ~15 minute micro film. Release the first
   three micro scenes free as a trailer to TikTok, Shorts, and Reels;
   lock the rest behind a Pass on `/watch/[slug]`.

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
- A micro film is a film, not a clip and not a show. Copy and UI must
  reflect that. Micro scenes — never "episodes," and never weakened to
  "short scenes."
