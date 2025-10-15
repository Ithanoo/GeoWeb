import { useEffect, useRef } from "react";
import {
  Viewer,
  CesiumTerrainProvider,
  IonResource,
  UrlTemplateImageryProvider,
  ImageryLayerCollection
} from "cesium";
import { useAppSelector } from "../store";
import { selectActiveLayers } from "../slices/layerSlice";

const GlobeViewer = () => {
  const viewerRef = useRef<Viewer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeLayers = useAppSelector(selectActiveLayers);

  useEffect(() => {
    let isMounted = true;

    if (containerRef.current && !viewerRef.current) {
      viewerRef.current = new Viewer(containerRef.current, {
        baseLayerPicker: false,
        geocoder: false,
        animation: false,
        timeline: false,
        sceneModePicker: false,
        navigationHelpButton: false
      });

      const loadTerrain = async () => {
        try {
          const terrainResource = await IonResource.fromAssetId(1);
          if (!isMounted || !viewerRef.current) {
            return;
          }

          const terrainProvider = new CesiumTerrainProvider({
            url: terrainResource,
            requestVertexNormals: true,
            requestWaterMask: true
          });

          if (isMounted && viewerRef.current) {
            viewerRef.current.terrainProvider = terrainProvider;
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Failed to load world terrain", error);
        }
      };

      void loadTerrain();
    }

    return () => {
      isMounted = false;
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!viewerRef.current) return;

    const imageryLayers: ImageryLayerCollection = viewerRef.current.imageryLayers;
    imageryLayers.removeAll();

    activeLayers.forEach((layer) => {
      if (layer.type === "raster") {
        imageryLayers.addImageryProvider(
          new UrlTemplateImageryProvider({ url: layer.url })
        );
      }
    });
  }, [activeLayers]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default GlobeViewer;
