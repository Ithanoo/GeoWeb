export interface Newspaper {
  name: string;
  url: string;
}

export type NewspapersByCountry = Record<string, Newspaper[]>;
