-- ==========================================
-- CyberGeopolitics Hub - Initialisation de la base de données
-- PostgreSQL + PostGIS
-- ==========================================

-- Active l'extension PostGIS pour les requêtes spatiales
CREATE EXTENSION IF NOT EXISTS postgis;

-- ==========================================
-- Table des pays avec géométrie (frontières)
-- ==========================================
CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  iso_a2 VARCHAR(2) UNIQUE NOT NULL,
  iso_a3 VARCHAR(3) UNIQUE,
  geometry GEOMETRY(MultiPolygon, 4326) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index spatial pour les requêtes rapides sur les pays
CREATE INDEX IF NOT EXISTS idx_countries_geometry ON countries USING GIST(geometry);

-- Index sur le nom pour les recherches
CREATE INDEX IF NOT EXISTS idx_countries_name ON countries(name);

-- ==========================================
-- Table des attaques
-- ==========================================
CREATE TABLE IF NOT EXISTS attacks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  country VARCHAR(100) NOT NULL,
  attack_type VARCHAR(50) NOT NULL,
  location GEOMETRY(Point, 4326) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index sur le pays pour filtrer les attaques
CREATE INDEX IF NOT EXISTS idx_attacks_country ON attacks(country);

-- Index sur la date
CREATE INDEX IF NOT EXISTS idx_attacks_date ON attacks(date);

-- Index spatial pour les attaques
CREATE INDEX IF NOT EXISTS idx_attacks_location ON attacks USING GIST(location);

-- ==========================================
-- Table des journaux/actualités
-- ==========================================
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  source VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  published_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index sur le pays pour les journaux
CREATE INDEX IF NOT EXISTS idx_news_country ON news(country);

-- Index sur la date de publication
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published_at);

-- ==========================================
-- Fonctions utilitaires (optionnel)
-- ==========================================

-- Fonction pour trouver les attaques dans un pays donné
CREATE OR REPLACE FUNCTION get_attacks_by_country(country_name VARCHAR)
RETURNS SETOF attacks AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM attacks 
  WHERE country ILIKE '%' || country_name || '%';
END;
$$ LANGUAGE plpgsql;

-- Fonction pour trouver les pays avec des attaques
CREATE OR REPLACE FUNCTION get_countries_with_attacks()
RETURNS SETOF countries AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT c.* FROM countries c
  JOIN attacks a ON c.name ILIKE '%' || a.country || '%';
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- Commentaires
-- ==========================================
-- SRID 4326 = WGS84 (coordonnées longitude/latitude standard)
-- GEOMETRY(MultiPolygon, 4326) = pour stocker les frontières des pays
-- GEOMETRY(Point, 4326) = pour stocker les coordonnées des attaques
-- GIST = index spatial pour des requêtes rapides
