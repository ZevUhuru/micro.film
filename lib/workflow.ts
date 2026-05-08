export const IMAGE_MODEL_ID = "gpt-image-2";
export const VIDEO_MODEL_ID = "seedance-2.0";

/**
 * The form vs the render unit. A micro film is the finished piece (under three
 * minutes). A scene is the per-render building block (15 seconds, vertical).
 */
export const FILM_MAX_DURATION = "≤ 3 min" as const;
export const SCENE_DURATION = "15s" as const;
export const ASPECT_RATIO = "9:16" as const;

/** The three-step pipeline shown across the marketing and studio surfaces. */
export const workflowSteps = [
  {
    eyebrow: "01",
    title: "Cast a character",
    description:
      "Generate a character reference sheet locked to face, wardrobe, and lighting so every scene stays on the same person.",
  },
  {
    eyebrow: "02",
    title: "Write the scenes",
    description:
      "Compose 15-second scenes with location, action, camera move, and the line that lands the moment.",
  },
  {
    eyebrow: "03",
    title: "Cut and share",
    description:
      "Stitch your scenes into a micro film up to three minutes long, then post it to TikTok, YouTube Shorts, and Instagram Reels.",
  },
] as const;

/** Distribution surfaces highlighted across the site. */
export const platforms = [
  { name: "TikTok", handle: "@yourhandle", aspect: ASPECT_RATIO, duration: FILM_MAX_DURATION },
  { name: "YouTube Shorts", handle: "@yourchannel", aspect: ASPECT_RATIO, duration: FILM_MAX_DURATION },
  { name: "Instagram Reels", handle: "@yourbrand", aspect: ASPECT_RATIO, duration: FILM_MAX_DURATION },
] as const;

/** Creator categories the product supports. Replaces drama-only framing. */
export const useCases = [
  {
    title: "Filmmakers",
    description: "Storyboard a moment, then render a real frame from it in minutes.",
  },
  {
    title: "Music artists",
    description: "Visualize a single line, mood, or hook into a shareable cinematic clip.",
  },
  {
    title: "Brands",
    description: "Spin product moments into vertical film instead of plain ad assets.",
  },
  {
    title: "Creators",
    description: "Tell a serialized story scene by scene that your audience returns for.",
  },
] as const;

/** Sample film concepts shown as cinematic posters on the landing page. */
export const filmConcepts = [
  {
    title: "Last Light on Sunset",
    genre: "Drama",
    runtime: "1m 45s",
    scenes: 7,
    aspect: ASPECT_RATIO,
    logline:
      "A street musician closes the case on a long day as the city lights flick on around her.",
    tone: "from-[#3b2a1d] via-[#4d2a18] to-[#0c0a08]",
  },
  {
    title: "The Long Walk Home",
    genre: "Slice of life",
    runtime: "2m 15s",
    scenes: 9,
    aspect: ASPECT_RATIO,
    logline:
      "A father carries his sleeping son across a quiet block, every window an entire lifetime.",
    tone: "from-[#1f2a35] via-[#2b3a4a] to-[#0c0a08]",
  },
  {
    title: "Cassette",
    genre: "Music film",
    runtime: "2m 45s",
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
      "I wrote a scene during lunch, rendered it on my phone, and posted it before my coffee was cold.",
    role: "Independent filmmaker",
  },
  {
    quote: "The character stays the same across every clip. That alone changes everything.",
    role: "Music artist",
  },
] as const;

/** Defaults for the studio form so the page never looks empty. */
export const studioDefaults = {
  title: "Last Light on Sunset",
  audience: "Posted to TikTok and Instagram Reels.",
  logline:
    "A street musician closes the case on a long day as the city lights flick on around her.",
  leadCharacter:
    "Maya, late twenties, weathered jean jacket over a black tee, silver hoops, soft natural curls, warm brown skin lit by a low golden hour sun.",
  supportingCharacter:
    "City sound: a distant subway, someone laughing across the street, a passing bike bell.",
  sceneBeat:
    "Maya snaps her guitar case shut on a corner of Sunset Boulevard. She looks up as the streetlights flicker on. Camera pulls back slowly. She allows herself a small smile.",
} as const;

/** Blog editorial entries with sample sections used on the detail page. */
export const blogPosts = [
  {
    slug: "what-is-a-micro-film",
    title: "What Is a Micro Film?",
    category: "Form",
    readTime: "4 min read",
    excerpt:
      "A micro film is a short cinematic piece, typically under three minutes, told as a sequence of intentional scenes rather than a single quick clip.",
    deck: "Short film, not short clip. Under three minutes, fully composed, every scene earned.",
    content: [
      {
        heading: "Define the form",
        body: "A micro film runs under three minutes. It is not a meme, not an ad, and not a single fifteen-second take. It is a small, finished film with a beginning, a turn, and a frame the viewer remembers.",
      },
      {
        heading: "Built from scenes",
        body: "The render unit on micro.film is a 15-second vertical scene. A film is one or more of those scenes cut together. Three scenes makes a vignette. Eight makes a complete two-minute story.",
      },
      {
        heading: "Cinematic by default",
        body: "At any length, the language is film: lens choice, light direction, blocking, cut. The product should make those choices easy, not hide them.",
      },
      {
        heading: "Built to share",
        body: "The output is vertical, ready for TikTok, YouTube Shorts, and Instagram Reels. Not a placeholder for an edit you will do later.",
      },
    ],
  },
  {
    slug: "character-sheet-consistency",
    title: "Why a Character Reference Sheet Changes Everything",
    category: "Production",
    readTime: "6 min read",
    excerpt:
      "The fastest way to make AI video feel like a real film is to lock the character once, then return to that same person across every clip.",
    deck: "A consistent character is the difference between a clip and a film.",
    content: [
      {
        heading: "Lock the face before the scene",
        body: "Front view, three-quarter, profile, wardrobe, palette, key props. The reference sheet is the source of truth that the video model returns to every time.",
      },
      {
        heading: "Wardrobe is story information",
        body: "The jacket, the boots, the watch, the chain. Each piece is a continuity choice and a personality choice. Writing it down once keeps every frame honest.",
      },
      {
        heading: "Continuity is a creative move",
        body: "When the same person walks into the next scene, the audience trusts the world. That trust is what makes them stay for the next clip.",
      },
    ],
  },
  {
    slug: "writing-a-fifteen-second-scene",
    title: "Writing a Fifteen-Second Scene",
    category: "Writing",
    readTime: "5 min read",
    excerpt:
      "Each scene is a small space with a tall ceiling. One location, one decision, one frame the viewer remembers — and one of several scenes that compose the full micro film.",
    deck: "Write the unit, then assemble the film.",
    content: [
      {
        heading: "One location",
        body: "Pick a single, real place. A doorway. A booth. A rooftop. The geography becomes part of the scene because the audience never leaves it.",
      },
      {
        heading: "One turn",
        body: "Something shifts. A character realizes, decides, refuses, or steps forward. If nothing turns, you have a moodboard, not a scene.",
      },
      {
        heading: "One frame to remember",
        body: "Design the shot you want screenshotted. That image is the poster, the thumbnail, and the reason the viewer comes back for the next one.",
      },
      {
        heading: "Then cut to the next scene",
        body: "A micro film is several of these scenes in a row. Plan the handoff: where the next scene picks up, who is in it, and what the previous frame promised.",
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
        heading: "One clip, three platforms",
        body: "A single render covers TikTok, Shorts, and Reels. The export should be the same file with platform-specific captions, not three different cuts.",
      },
    ],
  },
] as const;

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
