# CyberGeopolitics Hub - Backend API

> Backend API pour l'application CyberGeopolitics Hub. Gère les pays, attaques, et journaux avec PostgreSQL/PostGIS.

---

## 🚀 Démarrage rapide

### Prérequis
- [Docker](https://www.docker.com/) (installé et démarré)
- [Docker Compose](https://docs.docker.com/compose/) (inclus avec Docker Desktop)

### 1. Cloner le dépôt (si ce n'est pas déjà fait)
```bash
cd C:/DEV_PERSO/GeoHub/cybergeopolitics-hub/GeoWeb/cybergeopolitics-hub
```

### 2. Démarrer les services avec Docker
```bash
cd backend
docker-compose up -d
```
*Attends environ 10-15 secondes pour que PostGIS initialise...*

### 3. Initialiser la base de données
```bash
# Exécuter le script d'initialisation
npm run db:init

# Insérer des données d'exemple (optionnel)
npm run db:seed
```

### 4. Démarrer le serveur en mode développement
```bash
npm run dev
```
*Le serveur démarrera sur http://localhost:3001*

---

## 📡 Endpoints API

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/countries` | Liste tous les pays avec leurs frontières (GeoJSON) |
| GET | `/api/countries/:name` | Récupère un pays spécifique par son nom |
| GET | `/api/attacks` | Liste toutes les attaques (avec filtres optionnels) |
| GET | `/api/attacks/:id` | Récupère une attaque spécifique |
| GET | `/api/news/:country` | Liste les journaux pour un pays |

### Paramètres de requête

#### `/api/attacks`
- `country` : Filtre par pays (ex: `?country=France`)
- `type` : Filtre par type d'attaque (ex: `?type=Ransomware`)
- `limit` : Limite le nombre de résultats (défaut: 100)

#### `/api/news`
- `limit` : Limite le nombre de résultats (défaut: 20)

---

## 📦 Structure du projet

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts          # Configuration PostgreSQL/PostGIS
│   ├── models/
│   │   └── index.ts       # Types TypeScript
│   ├── routes/
│   │   ├── countries.ts   # Routes pour les pays
│   │   ├── attacks.ts     # Routes pour les attaques
│   │   └── news.ts        # Routes pour les journaux
│   ├── app.ts             # Configuration Express
│   └── server.ts          # Point d'entrée
├── sql/
│   ├── init.sql          # Création des tables
│   └── seed.sql          # Données d'exemple
├── docker-compose.yml    # Configuration Docker
├── Dockerfile            # Image Docker
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗃️ Base de données (PostgreSQL + PostGIS)

### Tables

| Table | Description |
|-------|-------------|
| `countries` | Pays avec leurs frontières géographiques |
| `attacks` | Attaques cyber avec localisation |
| `news` | Articles de journaux par pays |

### Requêtes utiles

#### Trouver les attaques dans un pays
```sql
SELECT * FROM attacks 
WHERE ST_Within(location, (SELECT geometry FROM countries WHERE name = 'France'));
```

#### Trouver les pays avec des attaques
```sql
SELECT DISTINCT c.* 
FROM countries c 
JOIN attacks a ON ST_Within(a.location, c.geometry);
```

---

## 🔧 Configuration

### Variables d'environnement

Crée un fichier `.env` basé sur `.env.example` :
```bash
cp .env.example .env
```

| Variable | Description | Valeur par défaut |
|----------|-------------|------------------|
| `DB_HOST` | Hôte de la base de données | `db` |
| `DB_PORT` | Port de la base de données | `5432` |
| `DB_USER` | Utilisateur PostgreSQL | `postgres` |
| `DB_PASSWORD` | Mot de passe PostgreSQL | `postgres` |
| `DB_NAME` | Nom de la base de données | `cybergeopolitics` |
| `PORT` | Port du serveur Express | `3001` |

---

## 🛠️ Développement

### Lancer en mode développement (avec hot-reload)
```bash
npm run dev
```

### Build pour la production
```bash
npm run build
```

### Démarrer en production
```bash
npm start
```

---

## 🔄 Intégration avec le Frontend

### Configuration CORS
Le backend est configuré pour accepter les requêtes depuis n'importe quelle origine (`cors()`). 
Pour le développement local, le frontend (port 3000) peut appeler le backend (port 3001) sans problème.

### Exemple de requête depuis le frontend
```typescript
// Récupérer les pays
fetch('http://localhost:3001/api/countries')
  .then(res => res.json())
  .then(data => console.log(data));

// Récupérer les attaques pour un pays
fetch('http://localhost:3001/api/attacks?country=France')
  .then(res => res.json())
  .then(attacks => console.log(attacks));
```

---

## 🐳 Docker

### Commandes utiles

| Commande | Description |
|----------|-------------|
| `docker-compose up -d` | Démarrer les services en arrière-plan |
| `docker-compose down` | Arrêter tous les services |
| `docker-compose logs -f` | Voir les logs en temps réel |
| `docker-compose ps` | Lister les services en cours |

### Accéder à la base de données
```bash
# Se connecter à la base de données
psql -h localhost -U postgres -d cybergeopolitics

# Depuis Docker (si le conteneur tourne)
docker exec -it cybergeopolitics-db psql -U postgres -d cybergeopolitics
```

---

## 📜 Scripts SQL

### Initialisation
```bash
npm run db:init
```

### Insertion de données d'exemple
```bash
npm run db:seed
```

### Réinitialisation complète
```bash
npm run db:reset
```

---

## 🚨 Dépannage

### Problème : PostGIS non installé
**Solution** : Le conteneur `postgis/postgis` inclut déjà PostGIS. Si tu utilises une autre image, assure-toi qu'elle a PostGIS.

### Problème : Erreur de connexion à la base de données
**Vérifie** :
- Que Docker est bien démarré (`docker --version`)
- Que les conteneurs sont en cours d'exécution (`docker-compose ps`)
- Les variables d'environnement dans `.env`

### Problème : Les requêtes spatiales ne fonctionnent pas
**Solution** : Assure-toi que l'extension PostGIS est activée :
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

---

## 📚 Ressources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostGIS Documentation](https://postgis.net/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🎯 Prochaines étapes

1. **Tester les endpoints API** avec Postman ou curl
2. **Intégrer le backend au frontend** en remplaçant les appels externes
3. **Ajouter l'authentification** (JWT) quand nécessaire
4. **Déployer sur AWS/OVH** avec Docker

---

**Maintenu par** : [CyberGeopolitics Hub Team](https://github.com/Ithanoo/cybergeopolitics-hub)
**Licence** : MIT
