import { useRef, useEffect } from "react";
import { Map as Structure } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box } from "@mui/material";
import { useMapStore } from "../../hooks/useMap";
import getStyleUrl from "../../config";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const { map, setMap } = useMapStore();

  useEffect(() => {
    if (map || !mapContainer.current) return;

    const newStructure = new Structure({
      container: mapContainer.current,
      style: getStyleUrl(),
      interactive: true,
      center: [78.0, 21.0],
      zoom: 4,
      minZoom: 2,
      maxZoom: 20,
      attributionControl: false,
      trackResize: true,
    });
    setMap(newStructure);

    return () => {
      newStructure.remove();
      mapContainer.current = null;
    };
  }, []);
  return (
    <>
      <Box
        ref={mapContainer}
        sx={{
          height: "calc(100vh - 8px)",
          width: "calc(100vw - 8px)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />
    </>
  );
}
