import express from 'express';
import pool from '../config/db';

const router = express.Router();

// GET /api/attacks - Toutes les attaques (avec filtres optionnels)
router.get('/', async (req, res) => {
  try {
    const { country, type, limit = 100 } = req.query;

    let query = `
      SELECT
        id, title, description, date, country, attack_type as "attackType",
        ST_X(location) as lng,
        ST_Y(location) as lat
      FROM attacks
    `;
    const params: any[] = [];

    if (country) {
      query += ` WHERE country ILIKE $1`;
      params.push(`%${country}%`);
    }

    if (type) {
      query += (params.length ? ' AND' : ' WHERE') + ` attack_type ILIKE $${params.length + 1}`;
      params.push(`%${type}%`);
    }

    query += ` ORDER BY date DESC LIMIT $${params.length + 1}`;
    params.push(parseInt(limit as string));

    const result = await pool.query(query, params);

    // Formate les attaques avec geoLocation
    const attacks = result.rows.map(row => ({
      ...row,
      geoLocation: {
        lat: parseFloat(row.lat),
        lng: parseFloat(row.lng)
      }
    }));

    res.json(attacks);
  } catch (err) {
    console.error('Erreur lors de la récupération des attaques:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/attacks/:id - Une attaque spécifique
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT
        id, title, description, date, country, attack_type as "attackType",
        ST_X(location) as lng,
        ST_Y(location) as lat
      FROM attacks
      WHERE id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Attaque non trouvée' });
    }

    const attack = {
      ...result.rows[0],
      geoLocation: {
        lat: parseFloat(result.rows[0].lat),
        lng: parseFloat(result.rows[0].lng)
      }
    };

    res.json(attack);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
