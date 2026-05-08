import { IMAGE_MODEL_ID, VIDEO_MODEL_ID, workflowSteps } from "@/lib/workflow";

type MicroFilmRunRequest = {
  title?: string;
  audience?: string;
  logline?: string;
  characters?: Array<{
    name: string;
    role: string;
    description: string;
  }>;
  sceneBeat?: string;
};

export async function GET() {
  return Response.json({
    service: "micro.film",
    status: "prototype",
    workflow: workflowSteps,
    models: {
      characterReferenceSheet: IMAGE_MODEL_ID,
      video: VIDEO_MODEL_ID,
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
        "Prototype run accepted. Wire this route to the production video pipeline when the micro-drama template is available.",
      input: {
        title: body.title ?? "Untitled micro-drama",
        audience: body.audience ?? "Black American women",
        logline: body.logline ?? null,
        characters: body.characters ?? [],
        sceneBeat: body.sceneBeat ?? null,
      },
      plan: [
        {
          step: "character_reference_sheet",
          model: IMAGE_MODEL_ID,
          output: "consistent lead character sheet",
        },
        {
          step: "scene_prompt",
          template: "micro-drama-beat-v0",
          output: "Seedance-ready 15-second prompt",
        },
        {
          step: "video_render",
          model: VIDEO_MODEL_ID,
          output: "vertical 15-second clip",
        },
      ],
    },
    { status: 202 },
  );
}
