import { create } from "zustand";
import { LngLatBounds, Map as TMap } from "maplibre-gl";

interface MapStore {
  map: TMap | null;
  setMap: (map: TMap | null) => void;
  setPolyline: (index: number, coordinates: [number, number][]) => void;
}

export const useMapStore = create<MapStore>((set, get) => ({
  map: null,
  setMap: (map: TMap | null) => set({ map }),
  setPolyline: (index: number, coordinates: [number, number][]) => {
    const { map } = get();
    if (!map) return;
    map?.addSource(`route-${index}`, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
        properties: {},
      },
    });
    map?.addLayer({
      id: "route-line" + index,
      type: "line",
      source: `route-${index}`,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-width": 4,
      },
    });

    if (index === 0) {
      const bounds = new LngLatBounds();
      coordinates.forEach((coord) => bounds.extend(coord));
      map.fitBounds(bounds, { padding: 80, duration: 500 });
    }
  },
}));
