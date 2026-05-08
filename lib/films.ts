/**
 * Sample series data shown on /watch/[slug].
 *
 * A series is an ordered run of micro film episodes. Each episode is its
 * own micro film (≤ 3 minutes), composed of multiple 15-second scenes.
 *
 * Free episodes are watchable; locked episodes display a padlock in the
 * episode grid (modeling the ReelShort progressive-unlock pattern).
 */

export type FilmEpisode = {
  number: number;
  title: string;
  duration: string;
  free: boolean;
};

export type FilmSeries = {
  slug: string;
  title: string;
  tagline: string;
  plot: string;
  genre: string;
  tags: ReadonlyArray<string>;
  audience: string;
  /** Scene caption shown in the player frame for episode 1. */
  openingCaption: string;
  /** Color tone for the player gradient. Tailwind arbitrary value gradient. */
  posterTone: string;
  stats: {
    likes: string;
    saves: string;
  };
  episodes: ReadonlyArray<FilmEpisode>;
};

const windowEpisodes: FilmEpisode[] = [
  { number: 1, title: "The Third Window", duration: "2m 12s", free: true },
  { number: 2, title: "Same Coat, Different Day", duration: "2m 28s", free: true },
  { number: 3, title: "He Knows the Bus", duration: "2m 41s", free: true },
  { number: 4, title: "A Spare Key Missing", duration: "2m 18s", free: false },
  { number: 5, title: "The Pharmacist Notices", duration: "2m 55s", free: false },
  { number: 6, title: "Two Empty Coffees", duration: "2m 04s", free: false },
  { number: 7, title: "She Changes Routines", duration: "2m 36s", free: false },
  { number: 8, title: "The Patterns Change Too", duration: "2m 49s", free: false },
  { number: 9, title: "A Detective Returns Her Call", duration: "2m 11s", free: false },
  { number: 10, title: "He Was at the Diner", duration: "2m 28s", free: false },
  { number: 11, title: "The Building Across", duration: "2m 14s", free: false },
  { number: 12, title: "Empty Mailbox", duration: "2m 33s", free: false },
  { number: 13, title: "The Doorman Lies", duration: "2m 22s", free: false },
  { number: 14, title: "She Sees His Apartment", duration: "2m 47s", free: false },
  { number: 15, title: "What He Has on the Wall", duration: "2m 58s", free: false },
  { number: 16, title: "She Is Not the First", duration: "2m 19s", free: false },
  { number: 17, title: "The Other Woman's Name", duration: "2m 06s", free: false },
  { number: 18, title: "A Locksmith at Three AM", duration: "2m 41s", free: false },
  { number: 19, title: "He Knows She Knows", duration: "2m 27s", free: false },
  { number: 20, title: "The Stairwell", duration: "2m 35s", free: false },
  { number: 21, title: "An Old Friend Calls", duration: "2m 12s", free: false },
  { number: 22, title: "Her Mother Sees Him", duration: "2m 48s", free: false },
  { number: 23, title: "The Garage", duration: "2m 09s", free: false },
  { number: 24, title: "What He Drives", duration: "2m 31s", free: false },
  { number: 25, title: "She Disappears for a Day", duration: "2m 17s", free: false },
  { number: 26, title: "He Cannot Find Her", duration: "2m 44s", free: false },
  { number: 27, title: "The Detective's Theory", duration: "2m 26s", free: false },
  { number: 28, title: "She Walks Right Up", duration: "2m 53s", free: false },
  { number: 29, title: "The Window Goes Dark", duration: "2m 38s", free: false },
  { number: 30, title: "Tape on the Floor", duration: "2m 21s", free: false },
  { number: 31, title: "The Last Thing He Says", duration: "2m 16s", free: false },
  { number: 32, title: "What She Keeps", duration: "2m 44s", free: false },
];

const films: FilmSeries[] = [
  {
    slug: "the-window-across-the-way",
    title: "The Window Across the Way",
    tagline: "She started watching back.",
    plot:
      "A late-shift nurse comes home and notices the third-floor window stays lit every night. The man inside doesn't move. When she changes her routines, the patterns change with her. A slow-burn thriller about being seen — and deciding to look back.",
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
    stats: {
      likes: "12.8k",
      saves: "146.2k",
    },
    episodes: windowEpisodes,
  },
];

export function getFilm(slug: string) {
  return films.find((film) => film.slug === slug);
}

export function listFilms(): ReadonlyArray<FilmSeries> {
  return films;
}
