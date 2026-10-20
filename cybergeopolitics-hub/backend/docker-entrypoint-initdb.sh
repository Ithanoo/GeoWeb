#!/bin/bash

# Script d'initialisation pour PostgreSQL
# Exécute les scripts SQL au premier démarrage du conteneur

set -e

# Fonction pour exécuter un script SQL
run_sql_script() {
  local script_path=$1
  if [ -f "$script_path" ]; then
    echo "Exécution de $script_path..."
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f "$script_path"
    echo "$script_path exécuté avec succès."
  else
    echo "Fichier $script_path introuvable, ignoré."
  fi
}

# Attendre que PostgreSQL soit prêt
echo "Attente que PostgreSQL soit prêt..."
until psql -h localhost -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q' 2>/dev/null; do
  sleep 1
 done

echo "PostgreSQL est prêt !"

# Activer PostGIS
echo "Activation de PostGIS..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS postgis;
EOSQL

# Exécuter les scripts d'initialisation
if [ -d "/docker-entrypoint-initdb.d" ]; then
  for script in /docker-entrypoint-initdb.d/*.sql; do
    run_sql_script "$script"
  done
fi

# Exécuter les scripts dans /app/sql si /docker-entrypoint-initdb.d est vide
if [ ! -f "/docker-entrypoint-initdb.d/init.sql" ] && [ -f "/app/sql/init.sql" ]; then
  run_sql_script "/app/sql/init.sql"
fi

if [ -f "/app/sql/seed.sql" ]; then
  run_sql_script "/app/sql/seed.sql"
fi

echo "Initialisation terminée !"
