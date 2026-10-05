# CyberGeopolitics Hub 🌍🔒

> **Une plateforme web pour visualiser les cyberattaques et leur contexte géopolitique**

Ce projet vise à combiner **cybersécurité** et **géopolitique** en offrant une carte interactive des cyberattaques mondiales, enrichie de leur contexte géopolitique (ex : liens avec des conflits, groupes cybercriminels, etc.).

## 🎯 Objectifs
- **Visualiser** les cyberattaques sur une carte interactive (par pays, secteur, type).
- **Comprendre** le contexte géopolitique de chaque attaque.
- **Filtrer et explorer** les données (par date, secteur, acteur, etc.).
- **Agrégier** des données depuis des APIs publiques (NewsAPI, Shodan, etc.).

## 🚀 Démo
*À déployer après l'Étape 1.*

## 📸 Captures d'écran
*À ajouter après l'Étape 1.*

## 🛠 Stack Technique
| Partie | Technologie | Alternative | Justification |
|--------|-------------|-------------|---------------|
| **Frontend** | React + TypeScript | Vue.js, Svelte | Maîtrise de React, TypeScript pour la robustesse |
| **Backend** | Node.js + Express | Python (FastAPI) | Simple et rapide à développer |
| **Base de données** | MongoDB | PostgreSQL | Flexible pour des données hétérogènes |
| **Cartographie** | Leaflet.js | Mapbox, Google Maps | Open-source, léger, bien documenté |
| **APIs externes** | NewsAPI, Shodan, HIBP | - | Pour récupérer les données sur les cyberattaques |

## 🏗 Architecture
```
Frontend (React + Leaflet) ↔ Backend (Express) ↔ Données (JSON statique → MongoDB)
                              ↓
                          APIs Externes (NewsAPI, Shodan, etc.)
```

## 📥 Installation
### Prérequis
- Node.js (v16+)
- npm ou yarn
- Git

### Étapes
1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/Ithanoo/GeoWeb.git
   cd GeoWeb/cybergeopolitics-hub
   ```

2. **Configurer le frontend** :
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Le frontend sera accessible sur [http://localhost:3000](http://localhost:3000).

3. **Configurer le backend** :
   ```bash
   cd ../backend
   npm install
   cp .env.example .env
   # Éditer .env avec vos clés API (optionnel pour le MVP)
   npm run dev
   ```
   Le backend sera accessible sur [http://localhost:5000](http://localhost:5000).

4. **Accéder à l'application** :
   - Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📂 Structure des Dossiers
```
cybergeopolitics-hub/
├── frontend/               # React + TypeScript
│   ├── public/            # Fichiers statiques (HTML, JSON)
│   │   └── data/          # Données statiques (attacks.json, actors.json)
│   ├── src/
│   │   ├── components/    # Composants React (Map.tsx, Navbar.tsx)
│   │   ├── pages/         # Pages (Home.tsx)
│   │   ├── types/         # Types TypeScript (attack.ts, actor.ts)
│   │   ├── utils/         # Utilitaires (api.ts)
│   │   ├── App.tsx        # Composant principal
│   │   └── index.tsx      # Point d'entrée
│   ├── package.json
│   └── tsconfig.json
├── backend/                # Node.js + Express
│   ├── controllers/       # Contrôleurs (attacksController.ts)
│   ├── models/            # Modèles MongoDB (à venir)
│   ├── routes/            # Routes (attacksRoutes.ts)
│   ├── services/          # Services (à venir)
│   ├── app.ts             # Point d'entrée Express
│   ├── package.json
│   └── tsconfig.json
├── data/                  # Données statiques (MVP)
│   ├── attacks.json       # Liste des cyberattaques
│   └── actors.json        # Liste des acteurs cybercriminels
└── README.md              # Documentation
```

## 🔌 APIs Utilisées
| API | Description | Lien | Limites (gratuit) |
|-----|-------------|------|-------------------|
| **NewsAPI** | Articles de presse sur les cyberattaques | [newsapi.org](https://newsapi.org/) | 100 requêtes/jour |
| **Shodan** | Devices vulnérables | [shodan.io](https://www.shodan.io/) | 100 requêtes/mois |
| **HIBP** | Fuites de données | [haveibeenpwned.com](https://haveibeenpwned.com/) | Gratuit (email requis) |
| **ANSSI** | Rapports officiels (France) | [ssi.gouv.fr](https://www.ssi.gouv.fr/) | Gratuit (scraping/RSS) |
| **MITRE ATT&CK** | Tactiques/techniques des attaquants | [attack.mitre.org](https://attack.mitre.org/) | Gratuit |

## 📌 Roadmap
| Étape | Durée | Description | Statut |
|-------|-------|-------------|--------|
| **1. Initialisation** | 1 semaine | Structure de base, carte statique, backend minimal | ✅ **En cours** |
| **2. Frontend (Carte + Filtres)** | 2 semaines | Carte interactive, filtres, flux d'actualités | ⏳ À faire |
| **3. Backend (API + MongoDB)** | 2 semaines | MongoDB Atlas, endpoints dynamiques, cache | ⏳ À faire |
| **4. Fonctionnalités Avancées** | 2 semaines | Fiches détaillées, base des acteurs, intégration Shodan/HIBP | ⏳ À faire |
| **5. Finalisation** | 1 semaine | Tests, optimisations, vidéo de démo | ⏳ À faire |

## 🤝 Contribuer
Les contributions sont les bienvenues ! Ouvrez une **issue** ou une **pull request** pour :
- Ajouter des données (attaques, acteurs).
- Améliorer le design ou les fonctionnalités.
- Corriger des bugs.

## 📜 Licence
MIT

## 📧 Contact
Pour toute question ou suggestion, contactez-moi via [LinkedIn](https://www.linkedin.com/) ou [GitHub](https://github.com/Ithanoo).
