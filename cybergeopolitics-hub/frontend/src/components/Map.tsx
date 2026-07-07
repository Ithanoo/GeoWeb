import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
}

export default function Map({ attacks }: MapProps) {
  return (
    <MapContainer
      center={[48.8566, 2.3522]} // Paris par défaut
      zoom={2}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
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
