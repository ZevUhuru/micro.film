export const IMAGE_MODEL_ID = "gpt-image-2";
export const VIDEO_MODEL_ID = "seedance-2.0";

export const workflowSteps = [
  {
    eyebrow: "01",
    title: "Character reference sheet",
    description:
      "Generate one production-safe sheet per lead: face turns, wardrobe, emotional range, key props, and continuity notes.",
  },
  {
    eyebrow: "02",
    title: "Scene prompt builder",
    description:
      "Turn a creator brief into a 15-second beat with camera language, dialogue intent, wardrobe, lighting, and cliffhanger pressure.",
  },
  {
    eyebrow: "03",
    title: "Seedance render pass",
    description:
      "Send the reference sheet plus prompt to the video model, then track render status, review notes, and export targets.",
  },
] as const;

export const dramaRails = [
  {
    title: "Hidden Identity",
    shows: [
      "The CEO Bought My Block",
      "Mafia Dad Next Door",
      "The Janitor Was a Mogul",
      "Secret Wife, Public Enemy",
    ],
  },
  {
    title: "Betrayal & Revenge",
    shows: [
      "My Sister Stole My Wedding",
      "Receipts at the Altar",
      "He Paid Her Debt",
      "The Ex Who Lost Everything",
    ],
  },
  {
    title: "Power Romance",
    shows: [
      "Soft Life, Hard Terms",
      "His Dangerous Tenderness",
      "Salon Queen",
      "The Mogul's Last Warning",
    ],
  },
] as const;

export const posterCards = [
  {
    title: "He Bought the Block",
    tag: "Hidden identity",
    logline:
      "A salon owner confronts the investor saving her business and discovers his name is tied to the night her brother disappeared.",
    gradient: "from-[#f7b267] via-[#9d174d] to-[#14050a]",
  },
  {
    title: "Receipts at the Altar",
    tag: "Betrayal",
    logline:
      "Minutes before saying yes, a bride receives the video that proves everyone in the room has been lying to her.",
    gradient: "from-[#f43f5e] via-[#4c0519] to-[#060104]",
  },
  {
    title: "Soft Life, Hard Terms",
    tag: "Power romance",
    logline:
      "She wanted peace, wealth, and distance from drama. Then the one man she cannot trust offers all three.",
    gradient: "from-[#facc15] via-[#be123c] to-[#111827]",
  },
] as const;

export const audienceSignals = [
  "Betrayal in the first scene",
  "A secret with financial stakes",
  "A desirable lead with real danger",
  "A cliffhanger before the scroll",
  "Wardrobe, hair, and setting that feel specific",
] as const;

export const blogPosts = [
  {
    slug: "vertical-drama-hooks-three-seconds",
    title: "Why Vertical Drama Hooks Need to Land in Three Seconds",
    category: "Story mechanics",
    readTime: "5 min read",
    excerpt:
      "Micro-drama writing starts with pressure, not backstory. The first shot should tell viewers who wants power, who is hiding something, and why the next scene matters.",
    deck: "The opening beat is not an introduction. It is a conversion test.",
    content: [
      {
        heading: "Start with pressure",
        body: "A vertical drama has almost no patience window. The viewer should understand the imbalance immediately: someone has the money, someone has the secret, someone is about to lose control. If the first shot is only mood, the scroll wins.",
      },
      {
        heading: "Make the premise readable",
        body: "The strongest hooks can be explained from one frame and one line of dialogue. A woman freezes at the altar. A man signs away a debt. A sister smiles while hiding the betrayal. The setup is simple, but the implication feels expensive.",
      },
      {
        heading: "End before the release",
        body: "A 15-second clip should rarely resolve the beat. It should create the emotional question that makes the next clip necessary: why did he pay, who sent the video, what does she know, and what happens if the room hears it?",
      },
    ],
  },
  {
    slug: "character-sheet-consistent-ai-video",
    title: "Designing a Character Sheet for Consistent AI Video",
    category: "Production",
    readTime: "7 min read",
    excerpt:
      "A useful reference sheet is more than a pretty portrait. It locks hair, wardrobe, facial structure, expression range, and continuity notes before the video model ever sees the scene.",
    deck: "Consistency starts before video. The sheet is the source of truth.",
    content: [
      {
        heading: "Lock the face before the scene",
        body: "For serialized clips, the character sheet is the anchor. Front view, three-quarter view, profile, hairline, skin tone, facial structure, and expression range all need to be established before the first animated shot.",
      },
      {
        heading: "Wardrobe is story information",
        body: "Clothing should say status, taste, and emotional state. A salon owner, a music executive, and a billionaire hiding in plain sight need different textures, silhouettes, jewelry, and color language.",
      },
      {
        heading: "Give the video prompt continuity notes",
        body: "The video prompt should repeat the non-negotiables: hairstyle, outfit, prop, age range, expression, and relationship to the scene. That repetition is not filler. It is continuity control.",
      },
    ],
  },
  {
    slug: "hidden-identity-betrayal-revenge-trope-stack",
    title: "Hidden Identity, Betrayal, Revenge: The Trope Stack That Converts",
    category: "Audience",
    readTime: "6 min read",
    excerpt:
      "The fastest micro-drama concepts are readable from the poster: a secret, a reversal, a romantic complication, and a reason to keep tapping.",
    deck: "A good trope stack gives the viewer a promise before the first line.",
    content: [
      {
        heading: "Tropes are navigation",
        body: "Hidden identity, betrayal, revenge, contract marriage, and power romance work because they tell the audience what emotional ride they are buying. The point is not originality at the label level. The originality comes from execution and specificity.",
      },
      {
        heading: "Stack conflict with desire",
        body: "Betrayal alone can feel cold. Romance alone can feel soft. Put them together and the scene gains pressure: the person she wants is also the person she cannot trust.",
      },
      {
        heading: "Use status reversals",
        body: "Micro-drama audiences respond to power shifts. The ignored woman becomes the owner. The mocked husband becomes the billionaire. The quiet friend controls the room. Every reversal should be visible and emotionally satisfying.",
      },
    ],
  },
  {
    slug: "write-15-second-scene",
    title: "How to Write a 15-Second Scene That Feels Bigger Than It Is",
    category: "Prompting",
    readTime: "4 min read",
    excerpt:
      "The scene should behave like a compressed soap beat: one location, one confrontation, one emotional turn, and one unanswered question.",
    deck: "Small runtime, big implication. That is the whole game.",
    content: [
      {
        heading: "One location",
        body: "Do not move the audience through five places. Put the pressure in a salon after closing, a wedding hallway, a parking garage, an office elevator, or a restaurant booth. A contained location makes the emotion louder.",
      },
      {
        heading: "One turn",
        body: "The character should enter the clip believing one thing and exit the clip forced to believe another. He is not a stranger. The debt is already paid. The phone call is from someone who should be dead.",
      },
      {
        heading: "One unanswered question",
        body: "End on a question that is emotional, not logistical. Not simply what happens next, but what does this reveal mean for her pride, her family, her safety, or the relationship she thought she understood?",
      },
    ],
  },
] as const;

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export const studioDefaults = {
  title: "He Bought the Block, She Owned the Room",
  audience: "Black American women who binge romance, betrayal, and power-shift drama.",
  logline:
    "A brilliant salon owner discovers the investor saving her business is the same man tied to her brother's downfall.",
  leadCharacter:
    "Nia Carter, 31, salon founder, sharp wit, protective older sister, polished soft-life style with steel underneath.",
  maleLead:
    "Malik Cross, 34, real estate operator, controlled intensity, tailored street-luxury wardrobe, dangerous reputation, private tenderness.",
  sceneBeat:
    "Nia confronts Malik in the empty salon after closing. He reveals he paid the debt, but not why. The lights flicker as her brother calls.",
} as const;
