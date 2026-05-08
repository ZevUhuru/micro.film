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
premium film tool — and a confident in-house studio whose own work
proves the platform.

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
| Cut          | The assembled sequence of micro scenes that make the film.             |
| Project      | A single micro film a creator or team is building inside the studio.   |
| Showcase     | The in-house library at `/watch` proving what the platform can do.    |
| Roll camera  | Primary verb for kicking off a render.                                 |

A micro film is **capped at 10 minutes** and is composed of **micro
scenes between 45 and 90 seconds each**. Films can run much shorter — a
single 90-second beat, a tight three-minute essay, a full-length
nine-minute thriller all qualify. The exact count is a creator choice:
a punchy three-minute film might be three micro scenes, a full-length
nine-minute one might be eight tightly-paced beats.

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
