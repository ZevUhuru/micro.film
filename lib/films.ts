/**
 * Sample film data shown on /watch/[slug].
 *
 * /watch is the in-house showcase — the library that proves what the
 * platform can do. There is no paywall. The micro scene tile grid still
 * carries the binge / progressive-release UX (current / released /
 * upcoming), but the gate is the **release schedule**, not money. The
 * `released` boolean controls which tiles are watchable today and which
 * read as "Soon."
 *
 * A micro film is a vertical film capped at 10 minutes, composed of
 * 45–90 second micro scenes. We make films, not shows. Avoid "episode"
 * / "series" wording in anything user-facing. The unit is a "micro
 * scene"; bare "scene" is acceptable only as a casual short-form once
 * context is established.
 */

export type FilmScene = {
  number: number;
  title: string;
  duration: string;
  /** Whether this micro scene is out today. False = "Soon" / coming up. */
  released: boolean;
};

export type Film = {
  slug: string;
  title: string;
  tagline: string;
  plot: string;
  genre: string;
  tags: ReadonlyArray<string>;
  audience: string;
  /** Caption shown in the player frame for micro scene 1. */
  openingCaption: string;
  /** Color tone for the player gradient. Tailwind arbitrary value gradient. */
  posterTone: string;
  /** Total runtime label shown in the watch UI, e.g. "9 min 55 sec". */
  totalDuration: string;
  /** Short label crediting who made the film, shown above the title. */
  studio: string;
  stats: {
    likes: string;
    saves: string;
  };
  scenes: ReadonlyArray<FilmScene>;
};

// Eight micro scenes, ~9m 55s total. Sits comfortably under the 10 min
// micro film cap. Three out today, five coming on a rolling cadence —
// the tile grid demonstrates the released / upcoming UX.
const windowScenes: FilmScene[] = [
  { number: 1, title: "The Third Window", duration: "1m 18s", released: true },
  { number: 2, title: "Same Coat, Different Day", duration: "1m 06s", released: true },
  { number: 3, title: "The Pharmacist Notices", duration: "1m 14s", released: true },
  { number: 4, title: "She Is Not the First", duration: "1m 04s", released: false },
  { number: 5, title: "He Knows She Knows", duration: "1m 12s", released: false },
  { number: 6, title: "She Walks Right Up", duration: "1m 28s", released: false },
  { number: 7, title: "The Window Goes Dark", duration: "1m 09s", released: false },
  { number: 8, title: "The Last Thing He Says", duration: "1m 24s", released: false },
];

const films: Film[] = [
  {
    slug: "the-window-across-the-way",
    title: "The Window Across the Way",
    tagline: "She started watching back.",
    plot:
      "A late-shift nurse comes home and notices the third-floor window stays lit every night. The man inside doesn't move. When she changes her routines, the patterns change with her. A slow-burn thriller about being seen — and deciding to look back. Eight micro scenes. Just under ten minutes.",
    genre: "Thriller",
    tags: [
      "Thriller",
      "Slow Burn",
      "Suspense",
      "Stalker",
      "City",
      "Contemporary",
    ],
    audience: "All Ages — viewer discretion",
    openingCaption: "She knew the third window.",
    posterTone:
      "from-[#3a2316] via-[#1a110b] to-[#06050a]",
    totalDuration: "9 min 55 sec",
    studio: "From the in-house studio",
    stats: {
      likes: "12.8k",
      saves: "146.2k",
    },
    scenes: windowScenes,
  },
];

export function getFilm(slug: string) {
  return films.find((film) => film.slug === slug);
}

export function listFilms(): ReadonlyArray<Film> {
  return films;
}
