export const IMAGE_MODEL_ID = "gpt-image-2";
export const VIDEO_MODEL_ID = "seedance-2.0";

/** The three-step pipeline shown across the marketing and studio surfaces. */
export const workflowSteps = [
  {
    eyebrow: "01",
    title: "Cast a character",
    description:
      "Generate a character reference sheet locked to face, wardrobe, and lighting so every shot stays on the same person.",
  },
  {
    eyebrow: "02",
    title: "Write the scene",
    description:
      "Compose a 15-second scene with location, action, camera move, and the line that lands the moment.",
  },
  {
    eyebrow: "03",
    title: "Render and share",
    description:
      "Render a vertical clip and post it straight to TikTok, YouTube Shorts, or Instagram Reels.",
  },
] as const;

/** Distribution surfaces highlighted across the site. */
export const platforms = [
  { name: "TikTok", handle: "@yourhandle", aspect: "9:16", duration: "15s" },
  { name: "YouTube Shorts", handle: "@yourchannel", aspect: "9:16", duration: "15s" },
  { name: "Instagram Reels", handle: "@yourbrand", aspect: "9:16", duration: "15s" },
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
    description: "Tell a serialized story in 15-second beats your audience returns for.",
  },
] as const;

/** Sample film concepts shown as cinematic posters on the landing page. */
export const filmConcepts = [
  {
    title: "Last Light on Sunset",
    genre: "Drama",
    runtime: "15s",
    aspect: "9:16",
    logline:
      "A street musician closes the case on a long day as the city lights flick on around her.",
    tone: "from-[#3b2a1d] via-[#4d2a18] to-[#0c0a08]",
  },
  {
    title: "The Long Walk Home",
    genre: "Slice of life",
    runtime: "15s",
    aspect: "9:16",
    logline:
      "A father carries his sleeping son across a quiet block, every window an entire lifetime.",
    tone: "from-[#1f2a35] via-[#2b3a4a] to-[#0c0a08]",
  },
  {
    title: "Cassette",
    genre: "Music film",
    runtime: "15s",
    aspect: "9:16",
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
      "A micro film is a short cinematic piece, often vertical, often under thirty seconds, designed to feel like a real moment from a real story.",
    deck: "It is not an ad. It is not a meme. It is a moment that earns its frame.",
    content: [
      {
        heading: "Short is not small",
        body: "A micro film respects the runtime by treating every second like real screen time. The frame is composed, the light is intentional, the character has a thought we can see.",
      },
      {
        heading: "Cinematic by default",
        body: "Even at fifteen seconds, the language is film: lens choice, light direction, blocking, cut. The product should make those choices easy, not hide them.",
      },
      {
        heading: "Built to share",
        body: "The output is a vertical clip ready for TikTok, YouTube Shorts, and Instagram Reels. Not a placeholder for an edit you will do later.",
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
      "A short scene is a small space with a tall ceiling. One location, one decision, one frame the viewer remembers.",
    deck: "Compress without losing the moment.",
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
