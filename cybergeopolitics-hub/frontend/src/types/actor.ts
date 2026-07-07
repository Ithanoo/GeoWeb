export interface Actor {
  id: string;
  name: string;
  country: string;
  targets: string[];
  modusOperandi: string;
  sources: { name: string; url: string }[];
}
