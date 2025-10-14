import { Router } from "express";
import { z } from "zod";

const layerSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum(["raster", "vector"]),
  url: z.string().url(),
  active: z.boolean()
});

const defaultLayers = [
  {
    id: "base-world-imagery",
    name: "Imagerie mondiale",
    description: "Vue satellite initiale",
    type: "raster",
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    active: true
  },
  {
    id: "topography",
    name: "Topographie",
    description: "MNT global OpenTopo",
    type: "raster",
    url: "https://tile.opentopomap.org/{z}/{x}/{y}.png",
    active: false
  }
];

export const layersRouter = Router();

layersRouter.get("/", (_req, res) => {
  res.json(defaultLayers);
});

layersRouter.post("/", (req, res) => {
  const result = layerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  // TODO: Persist the new layer in storage
  res.status(201).json(result.data);
});
