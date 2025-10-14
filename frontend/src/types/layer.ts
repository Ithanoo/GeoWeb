export type LayerType = "raster" | "vector";

export interface Layer {
  id: string;
  name: string;
  description: string;
  type: LayerType;
  url: string;
  active: boolean;
}
