import express from 'express';
import pool from '../config/db';

const router = express.Router();

// GET /api/countries - Tous les pays avec leurs frontières (GeoJSON)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        name,
        iso_a2 as iso,
        ST_AsGeoJSON(geometry)::json as geometry
      FROM countries
      ORDER BY name
    `);

    // Formate en FeatureCollection GeoJSON
    const features = result.rows.map(row => ({
      type: "Feature",
      properties: { name: row.name, iso: row.iso },
      geometry: row.geometry
    }));

    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    console.error('Erreur lors de la récupération des pays:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/countries/:name - Frontière d'un pays spécifique
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const result = await pool.query(`
      SELECT
        name,
        iso_a2 as iso,
        ST_AsGeoJSON(geometry) as geometry
      FROM countries
      WHERE name ILIKE $1
      LIMIT 1
    `, [name]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pays non trouvé' });
    }

    res.json({
      type: "Feature",
      properties: result.rows[0],
      geometry: result.rows[0].geometry
    });
  } catch (err) {
    console.error('Erreur lors de la récupération du pays:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
