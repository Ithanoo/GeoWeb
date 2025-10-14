import axios from "axios";
import { Layer } from "../types/layer";

export const fetchLayers = async (): Promise<Layer[]> => {
  try {
    const response = await axios.get<Layer[]>("/api/layers");
    return response.data;
  } catch (error) {
    console.warn("Falling back to local layer configuration", error);
    return [
      {
        id: "base-world-imagery",
        name: "Imagerie mondiale",
        description: "Vue satellite fournie par Cesium Ion",
        type: "raster",
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        active: true
      },
      {
        id: "topography",
        name: "Topographie",
        description: "Relief global du monde",
        type: "raster",
        url: "https://tile.opentopomap.org/{z}/{x}/{y}.png",
        active: false
      }
    ];
  }
};
