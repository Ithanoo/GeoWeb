import { Request, Response } from "express";
import path from "path";
import fs from "fs";

export const getAttacks = (req: Request, res: Response) => {
  try {
    // Chemin vers le fichier JSON statique
    const attacksPath = path.join(__dirname, "../../data/attacks.json");
    
    // Lire le fichier JSON
    const attacksData = fs.readFileSync(attacksPath, "utf-8");
    const attacks = JSON.parse(attacksData);
    
    // Envoyer les données en réponse
    res.json(attacks);
  } catch (err) {
    console.error("Erreur lors de la lecture des attaques:", err);
    res.status(500).json({ 
      error: "Impossible de charger les données des attaques",
      details: err instanceof Error ? err.message : "Erreur inconnue"
    });
  }
};
