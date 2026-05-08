/**
 * Sample film data shown on /watch/[slug].
 *
 * /watch is the Micro Film Studios library — the films we made to prove
 * what the platform can do. There is no paywall. The micro scene tile
 * grid still carries the binge / progressive-release UX (current /
 * released / upcoming), but the gate is the **release schedule**, not
 * money. The `released` boolean controls which tiles are watchable
 * today and which read as "Soon."
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
  /** The big serif line shown on the player when this micro scene is loaded. */
  caption: string;
  /** Whether this micro scene is out today. False = "Soon" / coming up. */
  released: boolean;
};

/**
 * The trailer is the entry point — a short standalone cut that pulls
 * the viewer into the film. It is **not** a micro scene of the film
 * itself: the count "8 micro scenes" stays accurate. In the scene
 * grid the trailer renders as a peer tile numbered 00 with its own
 * "Trailer" pill so it's visually legible as the appetizer, not a
 * regular beat.
 */
export type FilmTrailer = {
  duration: string;
  /** The big serif line shown on the player when the trailer is loaded. */
  caption: string;
};

export type Film = {
  slug: string;
  title: string;
  tagline: string;
  plot: string;
  genre: string;
  tags: ReadonlyArray<string>;
  audience: string;
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
  /**
   * 9:16 cover art — the visual identity of the film. Used as the
   * hero image on the landing, the poster in the showcase grid, the
   * OG image when shared. Path is relative to /public.
   */
  cover?: {
    src: string;
    width: number;
    height: number;
    /** Short alt text describing the cover. */
    alt: string;
  };
  /** Optional standalone trailer cut that lives at the head of the grid. */
  trailer?: FilmTrailer;
  scenes: ReadonlyArray<FilmScene>;
};

// Eight micro scenes, ~9m 55s total. Sits comfortably under the 10 min
// micro film cap. Three out today, five coming on a rolling cadence —
// the tile grid demonstrates the released / upcoming UX.
const windowScenes: FilmScene[] = [
  {
    number: 1,
    title: "The Third Window",
    duration: "1m 18s",
    caption: "She knew the third window.",
    released: true,
  },
  {
    number: 2,
    title: "Same Coat, Different Day",
    duration: "1m 06s",
    caption: "Same coat. Different day.",
    released: true,
  },
  {
    number: 3,
    title: "The Pharmacist Notices",
    duration: "1m 14s",
    caption: "He has been here before.",
    released: true,
  },
  {
    number: 4,
    title: "She Is Not the First",
    duration: "1m 04s",
    caption: "She is not the first.",
    released: false,
  },
  {
    number: 5,
    title: "He Knows She Knows",
    duration: "1m 12s",
    caption: "He knows she knows.",
    released: false,
  },
  {
    number: 6,
    title: "She Walks Right Up",
    duration: "1m 28s",
    caption: "She walks right up.",
    released: false,
  },
  {
    number: 7,
    title: "The Window Goes Dark",
    duration: "1m 09s",
    caption: "The window goes dark.",
    released: false,
  },
  {
    number: 8,
    title: "The Last Thing He Says",
    duration: "1m 24s",
    caption: "The last thing he says.",
    released: false,
  },
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
    posterTone:
      "from-[#3a2316] via-[#1a110b] to-[#06050a]",
    totalDuration: "9 min 55 sec",
    studio: "From Micro Film Studios",
    stats: {
      likes: "12.8k",
      saves: "146.2k",
    },
    cover: {
      src: "/covers/the-window-across-the-way.png",
      width: 576,
      height: 1024,
      alt: "The Window Across the Way — Micro Film Studios cover. A woman framed in a rain-streaked apartment window above a wet city street at night, with a silhouetted figure on the sidewalk below.",
    },
    trailer: {
      duration: "0m 38s",
      caption: "She started watching back.",
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
