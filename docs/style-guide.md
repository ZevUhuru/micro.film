# micro.film — Style Guide (v0.1)

This is the locked default style guide. It defines the visual and verbal
identity of micro.film. Improve it over time, but do not fork or contradict
it without updating this file in the same change.

## 1. Brand essence

micro.film is a cinematic studio for micro films — vertical, **up to
ten minutes**, composed of micro scenes. The product is for **the
people making the films**: brands, agencies, publishers, and
independent filmmakers who want to research, develop, generate, and
stitch a finished vertical micro film end to end.

We are not a consumer streaming app. The site should feel like a quiet,
premium film tool — and **Micro Film Studios**, the confident
production house whose own films at `/watch` prove the platform.

micro.film is **built for the AI era**. The whole pipeline runs on
generative models — screenplay assistance, ChatGPT Images 2.0 for
covers, state-of-the-art video models for scene generation — and we
can name that fact in copy when it is positioning context. We do
*not* lean into hype: never "magic," "revolutionary," "AI-powered,"
"superhuman," "next-gen," or any of the other tells. Name the tools
when relevant ("ChatGPT Images 2.0," "with assistance," "on the
latest video models"), and let the work do the talking.

Three brand qualities to protect:

1. **Cinematic.** Warm celluloid blacks, ivory ink, amber as the only true
   accent. Serif display type. Filmstrip motif as a recurring brand mark.
2. **Calm.** Generous whitespace, restrained type scale, no shouting. Power
   comes from typography, hierarchy, and material — not from loud color.
3. **Specific.** Vocabulary is precise. A film is a film. A scene is a
   scene. We do not describe the product as a "clip generator."

## 2. Vocabulary

Always use these terms exactly:

| Term         | Meaning                                                                |
| ------------ | ---------------------------------------------------------------------- |
| Micro film   | The form. A vertical film of up to ten minutes, composed of micro scenes. |
| Micro scene  | The unit. 45–90 seconds, 9:16, locked to a character.                  |
| Screenplay   | The first deliverable — title, logline, characters, scenes with action and dialogue. Every micro film starts here. |
| Cover        | The 9:16 vertical visual identity of a micro film — the poster in the showcase grid, the OG image when shared. Generated and edited with ChatGPT Images 2.0. |
| Cut          | The assembled sequence of micro scenes that make the film.             |
| Project      | A single micro film a creator or team is building inside the studio.   |
| Showcase     | The library at `/watch` — films produced by Micro Film Studios that prove what the platform can do. |
| Micro Film Studios | Our in-house production house. The films at `/watch` are credited "From Micro Film Studios." Never abbreviated to "the in-house studio" or "the studio" (the studio means the `/studio` workspace). |
| Roll camera  | Primary verb for kicking off a render.                                 |

The screenplay is the noun. We do **not** call it a "script." Verbs
for working on it are concrete craft actions — *Write, Rewrite,
Tighten, Extend, Suggest a turn* — never generic AI verbs like
"magic" or "improve."

The cover is the noun for the 9:16 visual that fronts every micro
film. We do **not** call it a "poster," "thumbnail," or "key art" in
product copy. The verb is *Make the cover.* When we name the model
in copy ("Edited with ChatGPT Images 2.0"), use that exact spelling —
not "GPT Image 2," not "DALL·E," not "OpenAI's image model."

A micro film is **capped at 10 minutes** and is composed of **micro
scenes between 45 and 90 seconds each**. Films can run much shorter — a
single 90-second beat, a tight three-minute essay, a full-length
nine-minute thriller all qualify. The exact count is a creator choice:
a punchy three-minute film might be three micro scenes, a full-length
nine-minute one might be eight tightly-paced beats.

The encyclopedic definition of the form is 8–15 minutes (Baidu Baike,
*Micro Film / 微电影*); industry critics already place the practical
ceiling at 10 minutes. We sit at the lower end on purpose. The full
write-up — definition, four "micros," origin, six recurring genres —
lives at `/about`. When we cite the form's history or definition in
public copy, link to `/about`, not to the wiki directly.

The vocabulary mirrors the brand. Everything we make is a *micro*
something — a micro film, a micro scene. Do not weaken that by calling
the work "short" — that's an undirected adjective. Reach for "micro"
first; if the meaning genuinely is "brief in duration," prefer
"compact," "tight," or a specific number.

We make **films**, not shows. Avoid the words "episode" and "series" as
product nouns — they imply ongoing television. A micro film is a
single, finished thing.

Do not use: "video clip", "AI video", "drama clip", "short-form ad",
"short film", "episode", "series", "scene" on its own as the product
noun (always **micro scene** in copy; bare "scene" is acceptable only as
a casual short-form when the context already established it).

### No prices, no paywalls in copy

The public site does **not** mention pricing, free / paid wedges,
unlocks, passes, or subscriptions. The product is positioned to brands,
agencies, publishers, and independent filmmakers who either use the
studio themselves or commission us to build the film for them.
Commercial conversations happen via the **Talk to us** CTA
(`mailto:studio@micro.film`), not on the marketing surface.

## 3. Color palette

All colors live as CSS variables in `app/globals.css`.

| Token              | Hex       | Use                                                |
| ------------------ | --------- | -------------------------------------------------- |
| `--background`     | `#0c0a08` | Page background. Warm celluloid black.             |
| `--foreground`     | `#f1ece2` | Primary text. Ivory key.                           |
| `--ink`            | `#07060a` | Text on light surfaces (CTAs, badges).             |
| `--paper`          | `#f4eee2` | Light surfaces (CTAs, logo mark, light cards).     |
| `--amber`          | `#e8b86a` | Primary accent. Sprocket holes, key highlights.    |
| `--amber-soft`     | `#f1cf94` | Secondary accent. Hover states, soft glows.        |
| `--crimson`        | `#b13a3a` | Reserved. Use sparingly for a single moment.       |
| `--film-edge`      | `#1a1612` | Filmstrip body, dark cards, secondary surfaces.    |

Rules:

- Amber is the **only** chromatic accent in the default theme. Do not
  introduce new hues for badges, links, or icons.
- Avoid pure black (`#000`) and pure white (`#fff`). Use the warm tokens.
- Buttons: `--paper` background, `--ink` text, hover `--amber-soft`.
- Borders: `border-white/10` for hairlines, `border-white/15` for emphasis.

## 4. Typography

Three families wired in `app/layout.tsx`:

| Family             | Variable          | Use                                            |
| ------------------ | ----------------- | ---------------------------------------------- |
| Geist (sans)       | `--font-sans`     | Body, navigation, forms, UI labels.            |
| Instrument Serif   | `--font-serif`    | Display headlines, blockquotes, frame markers. |
| Geist Mono         | `--font-mono`     | Eyebrows, badges, technical detail.            |

Apply the serif by adding `serif` (utility class in `globals.css`).

Type scale (Tailwind sizes):

- Display H1: `text-5xl` to `text-7xl`, serif, `leading-[1.05]`,
  `tracking-[-0.02em]`.
- Section H2: `text-4xl` to `text-5xl`, serif.
- Card H3: `text-2xl` to `text-3xl`, serif.
- Body: `text-base` to `text-lg`, sans, `leading-7` or `leading-8`.
- Eyebrow / mono labels: `text-[11px] uppercase tracking-[0.22em]`.

Italics from Instrument Serif are part of the brand voice. Use sparingly,
usually on a single key word in a headline.

## 5. Layout primitives

- Page max width: `max-w-6xl` for content, `max-w-5xl` for editorial detail.
- Horizontal padding: `px-5 sm:px-8`.
- Section vertical padding: `py-20 lg:py-28`.
- Card radius: `rounded-2xl` (cards) or `rounded-3xl` (panels).
- Background card: `border border-white/10 bg-white/[0.03]`.
- Filmstrip card: `bg-[var(--film-edge)]` body with `FilmStrip` wrapper.

Every page uses:

- `BackgroundLight` — radial amber wash plus film grain overlay.
- `SiteHeader` from `components/SiteChrome.tsx`.
- `SiteFooter` from `components/SiteChrome.tsx`.

## 6. Components

Reusable, in order of how often they appear:

- `components/FilmStrip.tsx`
  - `FilmStrip` — recurring sprocket-hole motif. Wraps cards, dividers,
    media frames. Configure `edges` (`top` | `bottom` | `both`) and `holes`.
  - `FilmStripBadge` — small mono uppercase label with an amber square
    sprocket icon. Use as section eyebrow.
- `components/SiteChrome.tsx`
  - `SiteHeader` — top-of-page header with logo, nav, and CTA.
  - `SiteFooter` — bottom hairline with brand mark and links.

When you build a new pattern that appears more than once, extract it into
`components/` instead of repeating Tailwind across pages.

## 7. Motion and interaction

- Default transition: `transition` with no duration override (Tailwind
  defaults to 150ms). Use `transition duration-300` only for hover lifts.
- Hover lift: `hover:-translate-y-0.5` for cards, `hover:-translate-y-1`
  for posters.
- Hover border: cards transition to `hover:border-[var(--amber)]/40`.
- No bouncy springs. Cinematic motion is calm.

## 8. Voice and tone

- Speak in **tight, declarative sentences**.
- Cinematic vocabulary: cast, write, render, cut, frame, scene.
- Avoid hype words: "powerful", "revolutionary", "AI-powered". The work
  speaks.
- Headlines may use one italic word for emphasis (`<span class="italic">`).
- Do not mention specific provider names in marketing copy. Internal docs
  and the studio render queue can name models.

## 9. Accessibility

- All `<a>` and `<Link>` elements need a clear accessible name. If the
  visible label is icon-only, add `aria-label` and `title`.
- Keep contrast above WCAG AA. The ivory `--foreground` on `--background`
  passes; keep secondary text at `text-white/65` or higher.
- Decorative artwork (filmstrip frames, gradients, grain) gets
  `aria-hidden="true"`.
- Every page renders exactly one `<h1>` in the initial server-rendered
  HTML.

## 10. SEO defaults

Each public page must export `metadata` (or `generateMetadata`) with:

- `title`
- `description`
- `alternates.canonical`
- `openGraph.title`, `description`, `url`, `siteName`, `type`

The root layout sets `metadataBase` and a title template.

## 11. Versioning

Bump this guide's version in the title when you change something that
breaks a previous decision (palette, typography, vocabulary, primary
component API). Note the change at the top of `sessions/` for that day.
