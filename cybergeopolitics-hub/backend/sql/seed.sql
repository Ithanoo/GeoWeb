-- ==========================================
-- CyberGeopolitics Hub - Données d'exemple
-- à exécuter après init.sql
-- ==========================================

-- ==========================================
-- Pays d'exemple (avec géométries simplifiées)
-- ==========================================
-- France
INSERT INTO countries (name, iso_a2, iso_a3, geometry) 
VALUES ('France', 'FR', 'FRA', 
  ST_GeomFromText('POLYGON((-5.14 41.36, -5.14 51.09, 9.56 51.09, 9.56 41.36, -5.14 41.36))', 4326)
) ON CONFLICT (iso_a2) DO NOTHING;

-- Allemagne
INSERT INTO countries (name, iso_a2, iso_a3, geometry) 
VALUES ('Germany', 'DE', 'DEU',
  ST_GeomFromText('POLYGON((5.8 47.2, 5.8 55.1, 15.0 55.1, 15.0 47.2, 5.8 47.2))', 4326)
) ON CONFLICT (iso_a2) DO NOTHING;

-- Ukraine
INSERT INTO countries (name, iso_a2, iso_a3, geometry) 
VALUES ('Ukraine', 'UA', 'UKR',
  ST_GeomFromText('POLYGON((22.14 44.0, 22.14 52.4, 40.23 52.4, 40.23 44.0, 22.14 44.0))', 4326)
) ON CONFLICT (iso_a2) DO NOTHING;

-- États-Unis
INSERT INTO countries (name, iso_a2, iso_a3, geometry) 
VALUES ('United States', 'US', 'USA',
  ST_GeomFromText('POLYGON((-125.0 24.0, -125.0 50.0, -66.0 50.0, -66.0 24.0, -125.0 24.0))', 4326)
) ON CONFLICT (iso_a2) DO NOTHING;

-- Chine
INSERT INTO countries (name, iso_a2, iso_a3, geometry) 
VALUES ('China', 'CN', 'CHN',
  ST_GeomFromText('POLYGON((73.5 18.0, 73.5 54.0, 135.0 54.0, 135.0 18.0, 73.5 18.0))', 4326)
) ON CONFLICT (iso_a2) DO NOTHING;

-- Royaume-Uni
INSERT INTO countries (name, iso_a2, iso_a3, geometry) 
VALUES ('United Kingdom', 'GB', 'GBR',
  ST_GeomFromText('POLYGON((-10.5 49.8, -10.5 60.9, 1.8 60.9, 1.8 49.8, -10.5 49.8))', 4326)
) ON CONFLICT (iso_a2) DO NOTHING;

-- Iran
INSERT INTO countries (name, iso_a2, iso_a3, geometry) 
VALUES ('Iran', 'IR', 'IRN',
  ST_GeomFromText('POLYGON((44.0 25.0, 44.0 39.8, 63.5 39.8, 63.5 25.0, 44.0 25.0))', 4326)
) ON CONFLICT (iso_a2) DO NOTHING;

-- Japon
INSERT INTO countries (name, iso_a2, iso_a3, geometry) 
VALUES ('Japan', 'JP', 'JPN',
  ST_GeomFromText('POLYGON((128.0 30.0, 128.0 46.0, 146.0 46.0, 146.0 30.0, 128.0 30.0))', 4326)
) ON CONFLICT (iso_a2) DO NOTHING;

-- ==========================================
-- Attaques d'exemple
-- ==========================================
-- Attaque en France
INSERT INTO attacks (title, description, date, country, attack_type, location) 
VALUES (
  'Cyberattaque sur un hôpital parisien',
  'Attaque par ransomware ciblant les systèmes médicaux',
  '2023-10-15',
  'France',
  'Ransomware',
  ST_GeomFromText('POINT(2.3522 48.8566)', 4326)
);

-- Attaque en Ukraine
INSERT INTO attacks (title, description, date, country, attack_type, location) 
VALUES (
  'Attaque DDoS sur les infrastructures énergétiques',
  'Attaque massive visant à déstabiliser le réseau électrique',
  '2023-09-20',
  'Ukraine',
  'DDoS',
  ST_GeomFromText('POINT(30.5234 50.4501)', 4326)
);

-- Attaque aux États-Unis
INSERT INTO attacks (title, description, date, country, attack_type, location) 
VALUES (
  'Fuites de données gouvernementales',
  'Compromission de bases de données sensibles',
  '2023-11-05',
  'United States',
  'Data Breach',
  ST_GeomFromText('POINT(-77.0369 38.8951)', 4326)
);

-- ==========================================
-- Journaux d'exemple
-- ==========================================
-- Journaux pour la France
INSERT INTO news (title, url, source, country, published_at) 
VALUES 
  ('Cyberattaque majeure en France : un hôpital parisien paralysé',
   'https://lemonde.fr/cyberattaque-hopital',
   'Le Monde',
   'France',
   '2023-10-16 08:00:00'
),
  ('Les cybermenaces ciblant la santé publique augmentent',
   'https://lefigaro.fr/cybersecurite',
   'Le Figaro',
   'France',
   '2023-10-17 10:30:00'
);

-- Journaux pour l'Ukraine
INSERT INTO news (title, url, source, country, published_at) 
VALUES 
  ('L''Ukraine subit une nouvelle vague de cyberattaques russes',
   'https://bbc.com/ukraine-cyberattacks',
   'BBC News',
   'Ukraine',
   '2023-09-21 14:00:00'
),
  ('Comment l''Ukraine résiste aux attaques DDoS',
   'https://reuters.com/ukraine-ddos',
   'Reuters',
   'Ukraine',
   '2023-09-22 09:15:00'
);

-- Journaux pour les États-Unis
INSERT INTO news (title, url, source, country, published_at) 
VALUES 
  ('Data Breach: 10 millions de dossiers exposés',
   'https://nytimes.com/data-breach',
   'The New York Times',
   'United States',
   '2023-11-06 07:45:00'
),
  ('Le gouvernement renforce sa cybersécurité après la fuite de données',
   'https://washingtonpost.com/cybersecurity',
   'The Washington Post',
   'United States',
   '2023-11-07 11:20:00'
);
