# GeoWeb

Application web de visualisation de thématiques différentes autour du globe terrestre.

## Architecture initiale

Le dépôt est structuré en deux projets complémentaires :

- `frontend/` : Application React + TypeScript propulsée par Vite, intégrant CesiumJS pour le globe 3D, Redux Toolkit pour l’état, Material UI et Axios pour les interactions API.
- `backend/` : API Express sécurisée par Helmet, prête à servir les calques, les filtres et la configuration de sécurité.

## Démarrage

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Les services sont prêts pour des intégrations de données géospatiales (PostGIS, tuiles raster/vectorielles) et pour l’ajout d’un module de sécurité avancé (authentification, audit, gestion des clés API).
