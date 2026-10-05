import { useState } from "react";

interface SidebarProps {
  onFilterChange: (filters: { topological: boolean; journalistic: boolean }) => void;
  activeFilters: {
    topological: boolean;
    journalistic: boolean;
  };
}

export default function Sidebar({ onFilterChange, activeFilters }: SidebarProps) {
  const handleFilterToggle = (filterName: "topological" | "journalistic") => {
    const newFilters = {
      ...activeFilters,
      [filterName]: !activeFilters[filterName],
    };
    onFilterChange(newFilters);
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-primary-900 text-white p-4 shadow-lg z-40 transform translate-x-0">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white">Filtres</h2>
        <p className="text-sm text-primary-200 mt-1">Sélectionnez les couches à afficher</p>
      </div>

      <div className="space-y-4">
        {/* Filtre Topologique */}
        <div className="flex items-center justify-between p-3 bg-primary-800 rounded-lg cursor-pointer hover:bg-primary-700 transition-colors">
          <div className="flex items-center space-x-3">
            <span className="text-lg">🗺️</span>
            <span className="font-medium">Topologique</span>
          </div>
          <button
            onClick={() => handleFilterToggle("topological")}
            className={`w-12 h-6 rounded-full relative transition-colors focus:outline-none ${
              activeFilters.topological ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                activeFilters.topological ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Filtre Journalistique */}
        <div className="flex items-center justify-between p-3 bg-primary-800 rounded-lg cursor-pointer hover:bg-primary-700 transition-colors">
          <div className="flex items-center space-x-3">
            <span className="text-lg">📰</span>
            <span className="font-medium">Journalistique</span>
          </div>
          <button
            onClick={() => handleFilterToggle("journalistic")}
            className={`w-12 h-6 rounded-full relative transition-colors focus:outline-none ${
              activeFilters.journalistic ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                activeFilters.journalistic ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Description des filtres */}
        <div className="mt-6 p-3 bg-primary-800 rounded-lg text-sm text-primary-200">
          <p className="mb-2">
            <span className="font-semibold text-white">Topologique</span> : Affiche les frontières et le relief des pays.
          </p>
          <p>
            <span className="font-semibold text-white">Journalistique</span> : Permet de cliquer sur un pays pour voir ses journaux.
          </p>
        </div>
      </div>
    </div>
  );
}
