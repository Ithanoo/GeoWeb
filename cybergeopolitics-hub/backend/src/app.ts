import express from 'express';
import cors from 'cors';
import countriesRouter from './routes/countries';
import attacksRouter from './routes/attacks';
import newsRouter from './routes/news';

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true })); // ✅ Autorise les requêtes depuis le frontend
app.use(express.json());

// Routes API
app.use('/api/countries', countriesRouter);
app.use('/api/attacks', attacksRouter);
app.use('/api/news', newsRouter);

// Route de test
app.get('/', (req, res) => {
  res.json({ 
    message: 'CyberGeopolitics API - Backend opérationnel',
    endpoints: {
      countries: '/api/countries',
      attacks: '/api/attacks',
      news: '/api/news/:country'
    }
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

export default app;
