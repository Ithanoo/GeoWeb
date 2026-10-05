import { Newspaper } from "../types/newspaper";

interface NewspaperPanelProps {
  country: string;
  newspapers: Newspaper[];
  onClose: () => void;
  isOpen: boolean;
}

export default function NewspaperPanel({ country, newspapers, onClose, isOpen }: NewspaperPanelProps) {
  return (
    <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getCountryFlag(country)}</span>
          <h2 className="text-lg font-bold text-primary-900">Journaux en {country}</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-primary-900 text-xl font-bold"
        >
          ×
        </button>
      </div>

      <div className="p-4 overflow-y-auto" style={{ height: "calc(100% - 73px)" }}>
        {newspapers.length > 0 ? (
          <ul className="space-y-3">
            {newspapers.map((newspaper, index) => (
              <li key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <a
                  href={newspaper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3"
                >
                  <span className="text-2xl">📰</span>
                  <div>
                    <div className="font-medium text-primary-900 hover:underline">
                      {newspaper.name}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-[180px]">
                      {newspaper.url.replace(/^https?:\/\//, "")}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Aucun journal enregistré pour ce pays.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper pour obtenir le flag emoji d'un pays
function getCountryFlag(countryName: string): string {
  const countryToFlag: Record<string, string> = {
    "France": "🇫🇷",
    "Ukraine": "🇺🇦",
    "United States": "🇺🇸",
    "Japan": "🇯🇵",
    "Iran": "🇮🇷",
    "Germany": "🇩🇪",
    "United Kingdom": "🇬🇧",
    "China": "🇨🇳",
  };
  return countryToFlag[countryName] || "🌍";
}
