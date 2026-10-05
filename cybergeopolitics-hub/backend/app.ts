import express from "express";
import cors from "cors";
import path from "path";
import attacksRouter from "./routes/attacksRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques (pour le MVP)
app.use("/data", express.static(path.join(__dirname, "../data")));

// Routes
app.use("/api/attacks", attacksRouter);

// Route de test
app.get("/", (req, res) => {
  res.send("CyberGeopolitics Hub API - Bienvenue !");
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: "Ressource non trouvée" });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

export default app;
