export const IMAGE_MODEL_ID = "gpt-image-2";
export const VIDEO_MODEL_ID = "seedance-2.0";

/**
 * The form vs the unit.
 *
 * A micro film is the finished piece — a vertical film that runs about 15
 * minutes total. A micro scene is the unit: 45–90 seconds, 9:16, locked to
 * a character. The exact micro scene count is a creator choice.
 *
 * The first 3 micro scenes are free. The rest unlock with a Pass or an
 * All-access subscription.
 *
 * We make films, not shows. Do not introduce "episode" or "series" as
 * product nouns. The unit is always called a "micro scene" in copy;
 * "scene" without the qualifier is acceptable only as a casual short-form
 * once context is established.
 */
export const FILM_TOTAL_DURATION = "~15 min" as const;
export const SCENE_DURATION_RANGE = "45–90s" as const;
export const SCENE_DURATION_DEFAULT = "90s" as const;
export const ASPECT_RATIO = "9:16" as const;

export const FREE_SCENES = 3 as const;
export const PASS_PRICE = "$2.49" as const;
export const SUBSCRIPTION_PRICE = "$9.99/mo" as const;

/**
 * Legacy aliases.
 *
 * Older imports referenced FILM_MAX_DURATION and SCENE_DURATION. Keep these
 * exported so any straggler import keeps building, but new code should use
 * FILM_TOTAL_DURATION and SCENE_DURATION_RANGE / SCENE_DURATION_DEFAULT.
 */
export const FILM_MAX_DURATION = FILM_TOTAL_DURATION;
export const SCENE_DURATION = SCENE_DURATION_RANGE;

/** The three-step pipeline shown across the marketing and studio surfaces. */
export const workflowSteps = [
  {
    eyebrow: "01",
    title: "Cast a character",
    description:
      "Generate a character reference sheet locked to face, wardrobe, and lighting so every micro scene stays on the same person.",
  },
  {
    eyebrow: "02",
    title: "Write the micro scenes",
    description:
      "Compose 45–90 second micro scenes. Each one is a single beat: location, action, camera move, and the line that lands the moment.",
  },
  {
    eyebrow: "03",
    title: "Cut and release",
    description:
      "Stitch your micro scenes into a ~15 minute micro film. Release the first three free, lock the rest behind a Pass, and post the trailer to TikTok, YouTube Shorts, and Instagram Reels.",
  },
] as const;

/** Distribution surfaces highlighted across the site. */
export const platforms = [
  { name: "TikTok", handle: "@yourhandle", aspect: ASPECT_RATIO, duration: SCENE_DURATION_RANGE },
  { name: "YouTube Shorts", handle: "@yourchannel", aspect: ASPECT_RATIO, duration: SCENE_DURATION_RANGE },
  { name: "Instagram Reels", handle: "@yourbrand", aspect: ASPECT_RATIO, duration: SCENE_DURATION_RANGE },
] as const;

/** Creator categories the product supports. */
export const useCases = [
  {
    title: "Filmmakers",
    description:
      "Tell a fifteen-minute story across a dozen micro scenes — long enough for a real arc, compact enough to ship in a week.",
  },
  {
    title: "Music artists",
    description:
      "Turn an album into a micro film: one micro scene per track, ninety seconds each, every frame on brand.",
  },
  {
    title: "Brands",
    description:
      "Run a cinematic micro film instead of an ad. Free trailer micro scenes, paid finale, recurring characters.",
  },
  {
    title: "Creators",
    description:
      "Build a film your audience returns for, micro scene by micro scene. Monetize the back half with a Pass.",
  },
] as const;

/** Sample film concepts shown as cinematic posters on the landing page. */
export const filmConcepts = [
  {
    title: "Last Light on Sunset",
    genre: "Drama",
    runtime: FILM_TOTAL_DURATION,
    scenes: 12,
    aspect: ASPECT_RATIO,
    logline:
      "A street musician closes the case on a long day as the city lights flick on around her.",
    tone: "from-[#3b2a1d] via-[#4d2a18] to-[#0c0a08]",
  },
  {
    title: "The Long Walk Home",
    genre: "Slice of life",
    runtime: FILM_TOTAL_DURATION,
    scenes: 14,
    aspect: ASPECT_RATIO,
    logline:
      "A father carries his sleeping son across a quiet block, every window an entire lifetime.",
    tone: "from-[#1f2a35] via-[#2b3a4a] to-[#0c0a08]",
  },
  {
    title: "Cassette",
    genre: "Music film",
    runtime: FILM_TOTAL_DURATION,
    scenes: 11,
    aspect: ASPECT_RATIO,
    logline:
      "A producer presses play on a tape that brings back the room, the people, and the year.",
    tone: "from-[#2c1a2a] via-[#4a1f3a] to-[#0c0a08]",
  },
] as const;

/** Pull quotes used on the landing page. Real names left blank intentionally. */
export const testimonials = [
  {
    quote:
      "I wrote the first micro scene during lunch, rendered it, and posted the trailer before my coffee was cold.",
    role: "Independent filmmaker",
  },
  {
    quote:
      "The character stays the same across every micro scene. That alone changes everything.",
    role: "Music artist",
  },
] as const;

/** Defaults for the studio form so the page never looks empty. */
export const studioDefaults = {
  title: "Last Light on Sunset",
  audience: "Trailer micro scenes posted to TikTok and Reels. Full film unlocked with a Pass.",
  logline:
    "A street musician closes the case on a long day as the city lights flick on around her.",
  leadCharacter:
    "Maya, late twenties, weathered jean jacket over a black tee, silver hoops, soft natural curls, warm brown skin lit by a low golden hour sun.",
  supportingCharacter:
    "City sound: a distant subway, someone laughing across the street, a passing bike bell.",
  sceneBeat:
    "Micro scene 01 — Maya snaps her guitar case shut on a corner of Sunset Boulevard. She looks up as the streetlights flicker on. Camera pulls back slowly. She allows herself a small smile. End on the wide shot.",
} as const;

/** Blog editorial entries with sample sections used on the detail page. */
export const blogPosts = [
  {
    slug: "what-is-a-micro-film",
    title: "What Is a Micro Film?",
    category: "Form",
    readTime: "4 min read",
    excerpt:
      "A micro film is a ~15 minute vertical film, told as a sequence of 45–90 second micro scenes. The first three are free; the rest unlock with a Pass.",
    deck: "Fifteen minutes. A dozen micro scenes. One story. Trailer free, finale paid.",
    content: [
      {
        heading: "Define the form",
        body: "A micro film runs about fifteen minutes total. It is not a meme, not an ad, and not a single quick clip. It is a small finished film with a setup, a turn, and a frame the viewer remembers — split into micro scenes the audience can watch one at a time on a phone.",
      },
      {
        heading: "Built from micro scenes",
        body: "The unit on micro.film is the micro scene: 45–90 seconds, vertical, locked to the cast. A film is a dozen or so micro scenes cut together. The exact count is your call: a punchier film might use ten longer micro scenes, a denser one might use eighteen tighter ones.",
      },
      {
        heading: "Free trailer, paid finale",
        body: "The first three micro scenes are free — about three or four minutes of story. The rest of the film unlocks with a single Pass for $2.49 or with the $9.99 a month All-access plan. The free wedge is the trailer; the rest is the film.",
      },
      {
        heading: "Cinematic by default",
        body: "At any length, the language is film: lens choice, light direction, blocking, cut. The product should make those choices easy, not hide them.",
      },
      {
        heading: "Built to share",
        body: "Every micro scene exports vertical, ready for TikTok, YouTube Shorts, and Instagram Reels. Trailer cuts go on social. The complete film lives on micro.film.",
      },
    ],
  },
  {
    slug: "character-sheet-consistency",
    title: "Why a Character Reference Sheet Changes Everything",
    category: "Production",
    readTime: "6 min read",
    excerpt:
      "The fastest way to make a micro film feel like a real film is to lock the character once, then return to that same person across every micro scene.",
    deck: "A consistent character is the difference between a clip and a film.",
    content: [
      {
        heading: "Lock the face before the micro scene",
        body: "Front view, three-quarter, profile, wardrobe, palette, key props. The reference sheet is the source of truth that the video model returns to every time.",
      },
      {
        heading: "Wardrobe is story information",
        body: "The jacket, the boots, the watch, the chain. Each piece is a continuity choice and a personality choice. Writing it down once keeps every micro scene honest.",
      },
      {
        heading: "Continuity is a creative move",
        body: "When the same person walks into micro scene four, the audience trusts the world. That trust is what makes them buy the Pass for the rest of the film.",
      },
    ],
  },
  {
    slug: "writing-a-micro-scene",
    title: "Writing a Micro Scene",
    category: "Writing",
    readTime: "5 min read",
    excerpt:
      "A micro scene is a small space with a tall ceiling. 45–90 seconds. One location, one decision, one frame the viewer remembers — and a hook that earns the cut to the next.",
    deck: "Write the micro scene, then write the hook into the next.",
    content: [
      {
        heading: "One location",
        body: "Pick a single, real place. A doorway. A booth. A rooftop. The geography becomes part of the micro scene because the audience never leaves it.",
      },
      {
        heading: "One turn",
        body: "Something shifts. A character realizes, decides, refuses, or steps forward. If nothing turns, you have a moodboard, not a micro scene.",
      },
      {
        heading: "One frame to remember",
        body: "Design the shot you want screenshotted. That image is the poster, the thumbnail, and the reason the viewer comes back for the next micro scene.",
      },
      {
        heading: "Then the hook",
        body: "Every micro scene should end on a question or a reveal that the next one answers. Treat the cut into micro scene four like the moment the trailer ends — it has to be worth the Pass.",
      },
    ],
  },
  {
    slug: "shipping-vertical-by-default",
    title: "Shipping Vertical by Default",
    category: "Distribution",
    readTime: "3 min read",
    excerpt:
      "TikTok, Shorts, and Reels reward the same thing: a vertical frame composed for a phone, with a hook in the first second.",
    deck: "Design for the phone first. Everything else is downstream.",
    content: [
      {
        heading: "Compose for the device",
        body: "Vertical 9:16, faces and key action in the upper two-thirds, room at the bottom for captions and platform UI. Plan the frame around the phone, not against it.",
      },
      {
        heading: "Hook in the first second",
        body: "The opening frame should answer who, where, and what is at stake. Audiences swipe before a slow build can land.",
      },
      {
        heading: "Trailer on social, film on micro.film",
        body: "Push your three free micro scenes to TikTok, Shorts, and Reels as a serialized trailer. The full cut, ad-free and uninterrupted, lives on the watch page.",
      },
    ],
  },
] as const;

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
