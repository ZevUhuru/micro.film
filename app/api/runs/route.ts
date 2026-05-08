import {
  FREE_SCENES,
  IMAGE_MODEL_ID,
  PASS_PRICE,
  SUBSCRIPTION_PRICE,
  VIDEO_MODEL_ID,
  workflowSteps,
} from "@/lib/workflow";

type MicroFilmRunRequest = {
  title?: string;
  logline?: string;
  leadCharacter?: string;
  sceneBeat?: string;
  sceneDurationSeconds?: number;
  platforms?: Array<"tiktok" | "youtube_shorts" | "instagram_reels">;
};

const DEFAULT_PLATFORMS = ["tiktok", "youtube_shorts", "instagram_reels"] as const;
const SCENE_DURATION_MIN = 45;
const SCENE_DURATION_MAX = 90;
const SCENE_DURATION_DEFAULT = 90;
const FILM_TARGET_MINUTES = 15;

export async function GET() {
  return Response.json({
    service: "micro.film",
    status: "prototype",
    workflow: workflowSteps,
    models: {
      characterReferenceSheet: IMAGE_MODEL_ID,
      video: VIDEO_MODEL_ID,
    },
    defaults: {
      sceneDurationSeconds: {
        min: SCENE_DURATION_MIN,
        max: SCENE_DURATION_MAX,
        default: SCENE_DURATION_DEFAULT,
      },
      filmTargetMinutes: FILM_TARGET_MINUTES,
      aspectRatio: "9:16",
      platforms: DEFAULT_PLATFORMS,
    },
    monetization: {
      freeScenes: FREE_SCENES,
      passPrice: PASS_PRICE,
      subscriptionPrice: SUBSCRIPTION_PRICE,
    },
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as MicroFilmRunRequest;
  const requestedDuration = body.sceneDurationSeconds ?? SCENE_DURATION_DEFAULT;
  const sceneDurationSeconds = Math.min(
    SCENE_DURATION_MAX,
    Math.max(SCENE_DURATION_MIN, requestedDuration),
  );

  return Response.json(
    {
      id: `mf_${Date.now()}`,
      status: "accepted",
      message:
        "Prototype run accepted. Wire this route to the production video pipeline when the template is available.",
      input: {
        title: body.title ?? "Untitled micro film",
        logline: body.logline ?? null,
        leadCharacter: body.leadCharacter ?? null,
        sceneBeat: body.sceneBeat ?? null,
        sceneDurationSeconds,
        platforms: body.platforms ?? DEFAULT_PLATFORMS,
      },
      plan: [
        {
          step: "character_reference_sheet",
          model: IMAGE_MODEL_ID,
          output: "consistent character sheet",
        },
        {
          step: "micro_scene_prompt",
          template: "scene-template-v0",
          output: `45–90 second vertical micro scene prompt (this run: ${sceneDurationSeconds}s)`,
        },
        {
          step: "video_render",
          model: VIDEO_MODEL_ID,
          output: `9:16 vertical micro scene, ${sceneDurationSeconds}s`,
        },
      ],
    },
    { status: 202 },
  );
}
