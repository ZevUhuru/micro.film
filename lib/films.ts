/**
 * Sample film data shown on /watch/[slug].
 *
 * A micro film is a ~15 minute vertical film, composed of 45–90 second
 * micro scenes. Micro scenes 1–3 are free; the rest unlock with a Pass
 * ($2.49) or an All-access subscription ($9.99/mo). The grid renders a
 * padlock on locked micro scenes (modeling the ReelShort progressive-
 * unlock pattern, applied to micro scenes within one film rather than
 * episodes within a series).
 *
 * We make films, not shows. Avoid "episode" / "series" wording in
 * anything user-facing. The unit is a "micro scene"; bare "scene" is
 * acceptable only as a casual short-form once context is established.
 */

export type FilmScene = {
  number: number;
  title: string;
  duration: string;
  free: boolean;
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
  /** Total runtime label shown in the watch UI, e.g. "~15 min". */
  totalDuration: string;
  /** Single-film unlock price, shown on the paywall. */
  passPrice: string;
  stats: {
    likes: string;
    saves: string;
  };
  scenes: ReadonlyArray<FilmScene>;
};

const windowScenes: FilmScene[] = [
  { number: 1, title: "The Third Window", duration: "1m 18s", free: true },
  { number: 2, title: "Same Coat, Different Day", duration: "1m 06s", free: true },
  { number: 3, title: "He Knows the Bus", duration: "1m 22s", free: true },
  { number: 4, title: "The Pharmacist Notices", duration: "1m 14s", free: false },
  { number: 5, title: "She Changes Routines", duration: "0m 58s", free: false },
  { number: 6, title: "The Building Across", duration: "1m 26s", free: false },
  { number: 7, title: "She Is Not the First", duration: "1m 04s", free: false },
  { number: 8, title: "He Knows She Knows", duration: "1m 12s", free: false },
  { number: 9, title: "The Stairwell", duration: "0m 51s", free: false },
  { number: 10, title: "She Walks Right Up", duration: "1m 28s", free: false },
  { number: 11, title: "The Window Goes Dark", duration: "1m 09s", free: false },
  { number: 12, title: "The Last Thing He Says", duration: "1m 24s", free: false },
];

const films: Film[] = [
  {
    slug: "the-window-across-the-way",
    title: "The Window Across the Way",
    tagline: "She started watching back.",
    plot:
      "A late-shift nurse comes home and notices the third-floor window stays lit every night. The man inside doesn't move. When she changes her routines, the patterns change with her. A slow-burn thriller about being seen — and deciding to look back. Twelve micro scenes. About fifteen minutes total.",
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
    totalDuration: "~15 min",
    passPrice: "$2.49",
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
