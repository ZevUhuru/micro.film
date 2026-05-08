# micro.film

AI-native micro-drama studio for phone-native serialized stories.

The first MVP wedge is a production workflow for creators building serialized
vertical dramas for Black American women: generate character reference sheets
with ChatGPT Images 2.0, turn story beats into Seedance-ready prompts, then
queue a 15-second consistent-character clip.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/` — landing page and product positioning.
- `/studio` — prototype creator interface.
- `/api/runs` — starter run contract for clip creation.

## MVP Pipeline

1. Capture the series premise, audience, character archetypes, and first scene.
2. Generate a character reference sheet using `gpt-image-2`.
3. Build a 15-second Seedance prompt from the story template.
4. Queue video generation with `seedance-2.0`.
5. Review the clip and export to TikTok, YouTube Shorts, or Instagram Reels.

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
- Treat the audience wedge with specificity and respect; build templates around
  story functions, not stereotypes.
