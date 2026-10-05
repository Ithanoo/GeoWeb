import { useEffect, useState, useCallback } from "react";
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

// Composant pour gérer les couches de pays
function CountryLayers({ onCountryClick, journalisticActive }: { 
  onCountryClick: (countryName: string) => void;
  journalisticActive: boolean;
}) {
  const map = useMap();
  const [geoJsonLayer, setGeoJsonLayer] = useState<L.Layer | null>(null);

  // Charger et configurer le GeoJSON
  useEffect(() => {
    fetch("/data/countries.geo.json")
      .then((res) => res.json())
      .then((data) => {
        // Supprimer l'ancien layer s'il existe
        if (geoJsonLayer) {
          map.removeLayer(geoJsonLayer);
        }

        // Créer le nouveau layer
        const layer = L.geoJSON(data, {
          style: (feature) => ({
            fillColor: journalisticActive ? "#3b82f6" : "transparent",
            weight: 2,
            opacity: 1,
            color: journalisticActive ? "#ffffff" : "#3b82f6",
            fillOpacity: journalisticActive ? 0.1 : 0,
          }),
          onEachFeature: (feature, layer) => {
            if (feature.properties && feature.properties.name) {
              layer.on({
                click: () => {
                  if (journalisticActive) {
                    onCountryClick(feature.properties.name);
                  }
                },
              });
            }
          },
        });

        layer.addTo(map);
        setGeoJsonLayer(layer);
      })
      .catch((err) => console.error("Erreur de chargement des pays:", err));

    return () => {
      // Nettoyage
      if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
      }
    };
  }, [map, journalisticActive, geoJsonLayer, onCountryClick]);

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
      
      {/* Layer des pays (pour la détection des clics - filtre journalistique) */}
      {activeFilters.journalistic && (
        <CountryLayers 
          onCountryClick={onCountryClick} 
          journalisticActive={activeFilters.journalistic} 
        />
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
