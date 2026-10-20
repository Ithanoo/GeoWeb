# ==========================================
# CyberGeopolitics Hub - Backend Dockerfile
# Node.js + TypeScript
# ==========================================

# Étape 1: Build de l'application TypeScript
FROM node:18-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances (incluant devDependencies pour le build)
RUN npm install

# Copie de tout le code source
COPY . .

# Compilation TypeScript
RUN npm run build

# Étape 2: Image de production (plus légère)
FROM node:18-alpine

WORKDIR /app

# Copie des fichiers nécessaires depuis le builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Création du répertoire pour les scripts SQL
RUN mkdir -p /app/sql

# Exposition du port
EXPOSE 3001

# Commande de démarrage
CMD ["node", "dist/server.js"]
