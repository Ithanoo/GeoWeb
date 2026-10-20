// Modèles de base de données pour CyberGeopolitics Hub
// Ces types correspondent aux tables PostgreSQL/PostGIS

// Type pour les propriétés d'un pays (GeoJSON)
export interface CountryProperties {
  name: string;
  iso: string;
}

// Type pour un pays avec géométrie
export interface Country {
  id?: number;
  name: string;
  iso_a2: string;
  iso_a3?: string;
  geometry: any; // GeoJSON geometry
}

// Type pour une attaque
export interface Attack {
  id?: number;
  title: string;
  description?: string;
  date: string;
  country: string;
  attackType: string;
  location: { lat: number; lng: number };
}

// Type pour un article de journal
export interface News {
  id?: number;
  title: string;
  url: string;
  source: string;
  country: string;
  publishedAt: string;
}

// Type pour les réponses API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
