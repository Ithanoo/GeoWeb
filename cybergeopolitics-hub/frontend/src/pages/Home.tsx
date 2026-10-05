import { useState, useEffect } from "react";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NewspaperPanel from "../components/NewspaperPanel";
import { Attack } from "../types/attack";
import { Newspaper, NewspapersByCountry } from "../types/newspaper";

export default function Home() {
  // Données des attaques
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Données des journaux par pays
  const [newspapersByCountry, setNewspapersByCountry] = useState<NewspapersByCountry>({});

  // État des filtres (par défaut : topologique activé)
  const [activeFilters, setActiveFilters] = useState({
    topological: true,
    journalistic: false,
  });

  // État pour le panneau des journaux
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Charger les données au montage
  useEffect(() => {
    // Charger les attaques
    fetch("/data/attacks.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Impossible de charger les données des attaques");
        }
        return res.json();
      })
      .then((data) => {
        setAttacks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    // Charger les journaux
    fetch("/data/newspapers.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Impossible de charger les journaux");
        }
        return res.json();
      })
      .then((data) => {
        setNewspapersByCountry(data);
      })
      .catch((err) => {
        console.error("Erreur de chargement des journaux:", err);
      });
  }, []);

  // Gestion des clics sur un pays
  const handleCountryClick = (countryName: string) => {
    if (activeFilters.journalistic) {
      setSelectedCountry(countryName);
    }
  };

  // Gestion des changements de filtre
  const handleFilterChange = (filters: { topological: boolean; journalistic: boolean }) => {
    setActiveFilters(filters);
    // Si on désactive le filtre journalistique, fermer le panneau
    if (!filters.journalistic) {
      setSelectedCountry(null);
    }
  };

  // Fermer le panneau des journaux
  const handleCloseNewspaperPanel = () => {
    setSelectedCountry(null);
  };

  // Récupérer les journaux pour le pays sélectionné
  const selectedNewspapers: Newspaper[] = selectedCountry 
    ? newspapersByCountry[selectedCountry] || []
    : [];

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-100">
        <div className="text-primary-900 text-xl">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-100">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-gray-100">
      <Navbar />
      
      {/* Sidebar des filtres à gauche */}
      <Sidebar 
        activeFilters={activeFilters} 
        onFilterChange={handleFilterChange} 
      />
      
      {/* Carte principale */}
      <div 
        className="fixed left-64 right-0 top-16 bottom-0" 
        style={{ zIndex: 10 }}
      >
        <Map 
          attacks={attacks} 
          activeFilters={activeFilters}
          onCountryClick={handleCountryClick}
        />
      </div>
      
      {/* Panneau des journaux (glisse depuis la droite) */}
      <NewspaperPanel 
        country={selectedCountry || ""} 
        newspapers={selectedNewspapers}
        onClose={handleCloseNewspaperPanel}
        isOpen={selectedCountry !== null && activeFilters.journalistic}
      />
    </div>
  );
}
