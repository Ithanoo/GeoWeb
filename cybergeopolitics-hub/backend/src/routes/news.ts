import express from 'express';
import pool from '../config/db';

const router = express.Router();

// GET /api/news/:country - Journaux pour un pays
router.get('/:country', async (req, res) => {
  try {
    const { country } = req.params;
    const result = await pool.query(`
      SELECT
        id, title, url, source, published_at as "publishedAt", country
      FROM news
      WHERE country ILIKE $1
      ORDER BY published_at DESC
      LIMIT 20
    `, [country]);

    res.json(result.rows);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/news - Tous les articles (avec filtres optionnels)
router.get('/', async (req, res) => {
  try {
    const { country, source, limit = 50 } = req.query;
    let query = 'SELECT id, title, url, source, published_at as "publishedAt", country FROM news';
    const params: any[] = [];

    if (country) {
      query += ` WHERE country ILIKE $1`;
      params.push(`%${country}%`);
    }

    if (source) {
      query += (params.length ? ' AND' : ' WHERE') + ` source ILIKE $${params.length + 1}`;
      params.push(`%${source}%`);
    }

    query += ` ORDER BY published_at DESC LIMIT $${params.length + 1}`;
    params.push(parseInt(limit as string));

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
