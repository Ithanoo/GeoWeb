import { useEffect, useState, useCallback, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Attack } from "../types/attack";

// Fix pour les icônes Leaflet (problème avec Webpack)
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapProps {
  attacks: Attack[];
  activeFilters: {
    topological: boolean;
    journalistic: boolean;
  };
  onCountryClick: (countryName: string) => void;
}

// Différents styles de cartes de base
const baseMapLayers = {
  standard: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

// Layer pour la topologie (relief, frontières détaillées)
const topologyLayer = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";

// Composant pour les frontières noires (visuelles uniquement)
function CountryBorders() {
  const map = useMap();
  const bordersLayerRef = useRef<L.Layer | null>(null);

  useEffect(() => {
    // ✅ Backend local (Docker) - Remplace GitHub
    fetch("http://localhost:3001/api/countries")
      .then((res) => res.json())
      .then((data) => {
        if (bordersLayerRef.current) {
          map.removeLayer(bordersLayerRef.current);
        }

        const layer = L.geoJSON(data, {
          style: () => ({
            fillColor: "transparent",
            weight: 1,
            opacity: 0.8,
            color: "#111111",  // ✅ Frontières NOIRES
            fillOpacity: 0
          })
        });

        layer.addTo(map);
        bordersLayerRef.current = layer;
      })
      .catch((err) => console.error("Erreur de chargement des frontières:", err));

    return () => {
      if (bordersLayerRef.current) {
        map.removeLayer(bordersLayerRef.current);
      }
    };
  }, [map]);

  return null;
}

// Composant pour gérer les couches de pays (cliquables - UNIQUEMENT avec filtre Journalistique)
// NOTE: Plus tard, ces données viendront d'une base de données
function CountryLayers({ onCountryClick }: { 
  onCountryClick: (countryName: string) => void;
}) {
  const map = useMap();
  // Utiliser useRef au lieu de useState pour éviter les rechargements inutiles
  const geoJsonLayerRef = useRef<L.Layer | null>(null);

  // Charger le GeoJSON 110m UNE SEULE FOIS (frontières précises + léger)
  useEffect(() => {
    // ✅ Backend local (Docker) - Remplace GitHub
    fetch("http://localhost:3001/api/countries")
      .then((res) => res.json())
      .then((data) => {
        // Supprimer l'ancien layer s'il existe
        if (geoJsonLayerRef.current) {
          map.removeLayer(geoJsonLayerRef.current);
        }

        // Créer le layer : invisible mais cliquable par défaut, visible au survol
        const layer = L.geoJSON(data, {
          style: () => ({
            fillColor: "#3b82f6",
            weight: 1,
            opacity: 0,
            color: "#3b82f6",
            fillOpacity: 0,
          }),
          onEachFeature: (feature, layer) => {
            // Le GeoJSON Natural Earth utilise 'NAME' (majuscules)
            const countryName = feature.properties?.NAME || feature.properties?.name;
            if (countryName) {
              // Cli : ferme les popups existantes + ouvre la nouvelle
              layer.on("click", () => {
                map.closePopup(); // ✅ Ferme TOUTES les pop-ups avant d'en ouvrir une nouvelle
                onCountryClick(countryName);
                // Popup avec les journaux pour ce pays
                (layer as L.Path).bindPopup(`
                  <div class="p-3 min-w-[200px]">
                    <h3 class="font-bold text-lg text-blue-800 mb-2">${countryName}</h3>
                    <div class="text-sm text-gray-700">
                      <p class="font-medium mb-1">Journaux disponibles :</p>
                      <ul class="list-disc list-inside space-y-1">
                        <li><a href="#" class="text-blue-600 hover:underline">Le Monde</a></li>
                        <li><a href="#" class="text-blue-600 hover:underline">BBC News</a></li>
                        <li><a href="#" class="text-blue-600 hover:underline">The Guardian</a></li>
                      </ul>
                    </div>
                  </div>
                `, {
                  className: "leaflet-popup-custom",
                  maxWidth: 300
                }).openPopup();
              });
              
              // ✅ Afficher UNIQUEMENT au survol (style amélioré pour plus de clarté)
              layer.on("mouseover", () => {
                (layer as L.Path).setStyle({
                  weight: 3,
                  opacity: 1,
                  fillOpacity: 0.3,
                  fillColor: "#60a5fa",
                  color: "#1d4ed8"
                });
                (layer as L.Path).bindTooltip(countryName, {
                  permanent: false
                }).openTooltip();
              });
              
              // ✅ Masquer en sortant
              layer.on("mouseout", () => {
                (layer as L.Path).setStyle({
                  weight: 1,
                  opacity: 0,
                  fillOpacity: 0
                });
                (layer as L.Path).closeTooltip();
              });
            }
          },
        });

        layer.addTo(map);
        geoJsonLayerRef.current = layer;
      })
      .catch((err) => console.error("Erreur de chargement des pays:", err));

    return () => {
      // Nettoyage au démontage du composant
      if (geoJsonLayerRef.current) {
        map.removeLayer(geoJsonLayerRef.current);
      }
    };
  }, [map, onCountryClick]); // ✅ Plus de geoJsonLayer dans les dépendances = pas de rechargement

  return null;
}

// Composant principal de la carte
export default function Map({ 
  attacks, 
  activeFilters,
  onCountryClick 
}: MapProps) {
  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={4}
      minZoom={2}
      maxZoom={18}
      style={{ height: "100%", width: "100%" }}
      dragging={true}
      scrollWheelZoom={true}
      doubleClickZoom={true}
    >
      {/* Fond de carte - OpenStreetMap standard */}
      <TileLayer
        url={baseMapLayers.standard}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Layer topologie (si activé) */}
      {activeFilters.topological && (
        <TileLayer
          url={topologyLayer}
          attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
          opacity={0.7}
        />
      )}
      
      {/* Frontières noires (toujours visibles - juste visuel) */}
      <CountryBorders />
      
      {/* Calques cliquables (UNIQUEMENT avec filtre Journalistique) */}
      {activeFilters.journalistic && (
        <CountryLayers onCountryClick={onCountryClick} />
      )}
      
      {/* Marqueurs des attaques */}
      {attacks.map((attack) => (
        <Marker
          key={attack.id}
          position={[attack.geoLocation.lat, attack.geoLocation.lng]}
          icon={defaultIcon}
        >
          <Popup>
            <div className="font-bold text-primary-900">{attack.title}</div>
            <div className="text-sm text-gray-600">{attack.date}</div>
            <div className="text-sm text-gray-600">{attack.country}</div>
            <div className="text-sm text-gray-600">{attack.attackType}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
