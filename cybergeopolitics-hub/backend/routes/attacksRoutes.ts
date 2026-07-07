import express from "express";
import { getAttacks } from "../controllers/attacksController";

const router = express.Router();

// Récupérer toutes les attaques
router.get("/", getAttacks);

// Récupérer une attaque par ID (à implémenter plus tard)
router.get("/:id", (req, res) => {
  res.status(501).json({ error: "Non implémenté" });
});

export default router;
