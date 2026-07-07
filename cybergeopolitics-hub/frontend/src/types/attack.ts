export interface Attack {
  id: string;
  title: string;
  description: string;
  date: string;
  country: string;
  sector: string;
  attackType: string;
  impact: string;
  geoLocation: {
    lat: number;
    lng: number;
  };
  geopoliticalContext: string;
  actors: string[];
  sources: { name: string; url: string }[];
}
