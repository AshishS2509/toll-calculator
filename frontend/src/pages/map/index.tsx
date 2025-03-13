import { useRef, useEffect } from "react";
import { Map as Structure } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box } from "@mui/material";
import MAP_STYLE_URL from "../../config";
import { useMapStore } from "../../hooks/useMap";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const { map, setMap } = useMapStore();

  useEffect(() => {
    if (map || !mapContainer.current) return;

    const newStructure = new Structure({
      container: mapContainer.current,
      style: MAP_STYLE_URL,
      center: [78.0, 21.0],
      zoom: 4,
      attributionControl: false,
    });
    setMap(newStructure);

    return () => {
      setMap(null);
      mapContainer.current = null;
    };
  }, [map, setMap]);
  return (
    <>
      <Box
        ref={mapContainer}
        sx={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      />
    </>
  );
}
