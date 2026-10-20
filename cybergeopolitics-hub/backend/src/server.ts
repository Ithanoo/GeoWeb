import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📡 API disponible à http://localhost:${PORT}/api/countries`);
  console.log(`🌍 Frontend : http://localhost:3000`);
});
