import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { layersRouter } from "./modules/layers/layers.router";
import { securityRouter } from "./modules/security/security.router";
import { healthRouter } from "./modules/health/health.router";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/health", healthRouter);
app.use("/layers", layersRouter);
app.use("/security", securityRouter);

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  console.log(`GeoWeb backend running on port ${port}`);
});
