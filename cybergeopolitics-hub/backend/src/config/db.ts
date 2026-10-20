import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'cybergeopolitics',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Test de connexion au démarrage
pool.on('connect', () => {
  console.log('✅ Connexion à PostgreSQL/PostGIS établie');
});

pool.on('error', (err: Error) => {
  console.error('❌ Erreur de connexion à PostgreSQL:', err);
});

export default pool;
