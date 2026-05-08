export const IMAGE_MODEL_ID = "gpt-image-2";
export const VIDEO_MODEL_ID = "seedance-2.0";

/**
 * The form vs the unit.
 *
 * A micro film is the finished piece — a vertical film capped at 10
 * minutes. Films can run much shorter (a single 90-second beat, a tight
 * three-minute essay) but they do not exceed the cap. A micro scene is
 * the unit: 45–90 seconds, 9:16, locked to a character. The exact
 * micro scene count is a creator choice.
 *
 * micro.film is for the people making the films: brands, agencies,
 * publishers, and independent filmmakers. The studio at /studio is the
 * production tool; the films at /watch — produced by Micro Film Studios
 * — prove what the platform can do. Public surfaces do not mention
 * pricing; commercial conversations happen via the Talk to us CTA.
 *
 * We make films, not shows. Do not introduce "episode" or "series" as
 * product nouns. The unit is always called a "micro scene" in copy;
 * "scene" without the qualifier is acceptable only as a casual short-form
 * once context is established.
 */
export const FILM_MAX_DURATION = "10 min" as const;
export const FILM_MAX_DURATION_LABEL = "Up to 10 min" as const;
export const SCENE_DURATION_RANGE = "45–90s" as const;
export const SCENE_DURATION_DEFAULT = "90s" as const;
export const ASPECT_RATIO = "9:16" as const;

export const CONTACT_EMAIL = "studio@micro.film" as const;
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}` as const;

/**
 * Legacy alias retained so older imports keep building. New code should
 * reference FILM_MAX_DURATION (the cap) or FILM_MAX_DURATION_LABEL (UX
 * label that signals "up to," since not every film hits the cap).
 */
export const SCENE_DURATION = SCENE_DURATION_RANGE;

/** The four-step pipeline shown across the marketing and studio surfaces. */
export const workflowSteps = [
  {
    eyebrow: "01",
    title: "Research",
    description:
      "Pull references, mood, and the through-line. Define the world the film lives in before the camera turns on.",
  },
  {
    eyebrow: "02",
    title: "Develop",
    description:
      "Write the screenplay — title, logline, characters, scenes — yourself with assistance or from a guided prompt. Cast a character with a locked reference sheet, lock the shot list, and make the 9:16 cover with ChatGPT Images 2.0.",
  },
  {
    eyebrow: "03",
    title: "Generate",
    description:
      "Render every 45–90 second micro scene at 9:16 with the same character, wardrobe, and lighting from end to end.",
  },
  {
    eyebrow: "04",
    title: "Stitch",
    description:
      "Cut the micro scenes into a finished micro film of up to ten minutes, ready for a campaign, a publisher channel, or your own reel.",
  },
] as const;

/** Distribution surfaces highlighted across the site. */
export const platforms = [
  { name: "TikTok", handle: "@yourhandle", aspect: ASPECT_RATIO, duration: SCENE_DURATION_RANGE },
  { name: "YouTube Shorts", handle: "@yourchannel", aspect: ASPECT_RATIO, duration: SCENE_DURATION_RANGE },
  { name: "Instagram Reels", handle: "@yourbrand", aspect: ASPECT_RATIO, duration: SCENE_DURATION_RANGE },
] as const;

/** The four creator / publisher segments the studio is built for. */
export const useCases = [
  {
    title: "Brands",
    description:
      "Ship a cinematic micro film of up to ten minutes instead of a thirty-second ad cut. Same character across every micro scene, every campaign.",
  },
  {
    title: "Agencies",
    description:
      "Add vertical filmmaking to what you offer your clients. Run the studio yourselves, or commission Micro Film Studios to build the film with you.",
  },
  {
    title: "Publishers",
    description:
      "Feed a vertical-first content pipeline. Research, develop, generate, and stitch on the same platform your editors already use.",
  },
  {
    title: "Filmmakers",
    description:
      "A studio in your pocket. Tell a story up to ten minutes long across a handful of micro scenes without raising a budget, hiring a crew, or losing the frame.",
  },
] as const;

/** Sample film concepts shown as cinematic posters on the landing page. */
export const filmConcepts = [
  {
    title: "Last Light on Sunset",
    genre: "Drama",
    runtime: "9 min",
    scenes: 8,
    aspect: ASPECT_RATIO,
    logline:
      "A street musician closes the case on a long day as the city lights flick on around her.",
    tone: "from-[#3b2a1d] via-[#4d2a18] to-[#0c0a08]",
  },
  {
    title: "The Long Walk Home",
    genre: "Slice of life",
    runtime: "8 min",
    scenes: 9,
    aspect: ASPECT_RATIO,
    logline:
      "A father carries his sleeping son across a quiet block, every window an entire lifetime.",
    tone: "from-[#1f2a35] via-[#2b3a4a] to-[#0c0a08]",
  },
  {
    title: "Cassette",
    genre: "Music film",
    runtime: "9 min",
    scenes: 7,
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
      "We shipped a campaign micro film in a week. One character, eight micro scenes, a finished cut on Friday.",
    role: "Creative director, agency",
  },
  {
    quote:
      "The character stays the same across every micro scene. That alone changes everything.",
    role: "Independent filmmaker",
  },
] as const;

/** Defaults for the studio form so the page never looks empty. */
export const studioDefaults = {
  title: "Last Light on Sunset",
  audience: "Vertical 9:16 cut for the campaign reel and the publisher's vertical channel.",
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
      "A micro film is a vertical film of up to ten minutes, told as a sequence of 45–90 second micro scenes. Built end to end inside one studio: research, develop, generate, stitch.",
    deck: "Up to ten minutes. A handful of micro scenes. One story. Built end to end in one studio.",
    content: [
      {
        heading: "Define the form",
        body: "A micro film runs up to ten minutes — and many run much shorter. It is not a meme, not an ad cut-down, and not a single quick clip. It is a small finished film with a setup, a turn, and a frame the viewer remembers — split into micro scenes the audience can watch one at a time on a phone.",
      },
      {
        heading: "Built from micro scenes",
        body: "The unit on micro.film is the micro scene: 45–90 seconds, vertical, locked to the cast. A film is a handful of micro scenes cut together. The exact count is a creator choice: a punchy three-minute essay might be three micro scenes, a full-length nine-minute thriller might be eight tightly-paced beats.",
      },
      {
        heading: "Made by the people making the films",
        body: "micro.film is for brands, agencies, publishers, and independent filmmakers. The studio is the production tool; the films from Micro Film Studios at /watch are the proof. You can run the whole pipeline yourself or commission us to build the film with you.",
      },
      {
        heading: "Cinematic by default",
        body: "At any length, the language is film: lens choice, light direction, blocking, cut. The product should make those choices easy, not hide them.",
      },
      {
        heading: "Built to ship",
        body: "Every micro scene exports vertical, ready for TikTok, YouTube Shorts, Instagram Reels, in-app players, and a publisher's CMS. One source cut, every distribution surface.",
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
        body: "When the same person walks into micro scene four, the audience trusts the world. That trust is what makes a micro film feel like a film and not a stitched assembly of takes.",
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
        body: "Every micro scene should end on a question or a reveal that the next one answers. The cut between micro scenes is the work; treat it like an editor would.",
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
        heading: "One source, every surface",
        body: "A finished micro film cuts into trailer micro scenes for TikTok, Shorts, and Reels, a hero piece for a campaign landing page, and a serialized run on a publisher's vertical feed — all from one source cut.",
      },
    ],
  },
] as const;

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
