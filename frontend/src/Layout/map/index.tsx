import { useRef, useEffect, useState } from "react";
import { Map as Structure } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box, styled } from "@mui/material";
import { useMapStore } from "../../hooks/useMap";
import getStyleUrl from "../../config";

const MapBox = styled(Box)(() => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setHeight(window.innerHeight);
    });
  }, []);
  return {
    height: `calc(${height}px - 8px)`,
    width: "calc(100vw - 8px)",
    borderRadius: "8px",
    overflow: "hidden",
  };
});

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
      <MapBox ref={mapContainer} />
    </>
  );
}
