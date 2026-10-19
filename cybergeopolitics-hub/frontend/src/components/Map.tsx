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

  // Style dynamique selon le filtre journalistique
  const getStyle = (active: boolean) => ({
    fillColor: "#3b82f6",
    weight: active ? 2 : 1,
    opacity: active ? 1 : 0.3,
    color: "#3b82f6",
    fillOpacity: active ? 0.2 : 0,
  });

  // Charger et configurer le GeoJSON via GitHub (vraies frontières des pays)
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson")
      .then((res) => res.json())
      .then((data) => {
        // Supprimer l'ancien layer s'il existe
        if (geoJsonLayer) {
          map.removeLayer(geoJsonLayer);
        }

        // Créer le nouveau layer avec style dynamique
        const layer = L.geoJSON(data, {
          style: getStyle(journalisticActive),
          onEachFeature: (feature, layer) => {
            if (feature.properties && feature.properties.name) {
              // Cli toujours actif
              layer.on("click", () => onCountryClick(feature.properties.name));
              // Feedback visuel au survol (cast en L.Path pour setStyle)
              layer.on("mouseover", () => {
                (layer as L.Path).setStyle({ weight: 3, opacity: 1, fillOpacity: 0.3 });
                (layer as L.Path).bindTooltip(feature.properties.name, { permanent: false }).openTooltip();
              });
              layer.on("mouseout", () => {
                (layer as L.Path).setStyle(getStyle(journalisticActive));
                (layer as L.Path).closeTooltip();
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
      
      {/* Layer des pays (cadrillage visible si filtre journalistique activé) */}
      <CountryLayers 
        onCountryClick={onCountryClick} 
        journalisticActive={activeFilters.journalistic} 
      />
      
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
