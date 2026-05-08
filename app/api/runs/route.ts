import { IMAGE_MODEL_ID, VIDEO_MODEL_ID, workflowSteps } from "@/lib/workflow";

type MicroFilmRunRequest = {
  title?: string;
  logline?: string;
  leadCharacter?: string;
  sceneBeat?: string;
  platforms?: Array<"tiktok" | "youtube_shorts" | "instagram_reels">;
};

const DEFAULT_PLATFORMS = ["tiktok", "youtube_shorts", "instagram_reels"] as const;

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
      runtimeSeconds: 15,
      aspectRatio: "9:16",
      platforms: DEFAULT_PLATFORMS,
    },
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as MicroFilmRunRequest;

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
        platforms: body.platforms ?? DEFAULT_PLATFORMS,
      },
      plan: [
        {
          step: "character_reference_sheet",
          model: IMAGE_MODEL_ID,
          output: "consistent character sheet",
        },
        {
          step: "scene_prompt",
          template: "scene-template-v0",
          output: "15-second vertical scene prompt",
        },
        {
          step: "video_render",
          model: VIDEO_MODEL_ID,
          output: "9:16 vertical clip",
        },
      ],
    },
    { status: 202 },
  );
}
