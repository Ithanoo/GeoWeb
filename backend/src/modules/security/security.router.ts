import { Router } from "express";
import { z } from "zod";

const securitySettingsSchema = z.object({
  apiKey: z.string().min(10).optional().or(z.literal("")),
  auditLogging: z.boolean()
});

let cachedSettings = {
  apiKey: "",
  auditLogging: true
};

export const securityRouter = Router();

securityRouter.get("/settings", (_req, res) => {
  res.json(cachedSettings);
});

securityRouter.post("/settings", (req, res) => {
  const parsed = securitySettingsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.issues });
  }

  cachedSettings = parsed.data;
  res.json(cachedSettings);
});
