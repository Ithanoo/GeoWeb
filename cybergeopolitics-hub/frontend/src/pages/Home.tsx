import { useState, useEffect } from "react";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import { Attack } from "../types/attack";

export default function Home() {
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Charger les données statiques pour le MVP
    fetch("/data/attacks.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Impossible de charger les données");
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
  }, []);

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
    <div className="h-screen w-full">
      <Navbar />
      <div className="h-[calc(100vh-64px)] w-full">
        <Map attacks={attacks} />
      </div>
    </div>
  );
}
