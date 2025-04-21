import { create } from "zustand";
import { Map as TMap } from "maplibre-gl";

interface MapStore {
  map: TMap | null;
  setMap: (map: TMap | null) => void;
  setPolyline: (name: string, coordinates: [number, number][]) => void;
}

export const useMapStore = create<MapStore>((set, get) => ({
  map: null,
  setMap: (map: TMap | null) => set({ map }),
  setPolyline: (name: string, coordinates: [number, number][]) => {
    const { map } = get();
    if (!map) return;
    map?.addSource(name, {
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
      id: "line-" + name,
      type: "line",
      source: name,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-width": 4,
      },
    });
  },
  resetPolyline: () => {
    const { map } = get();
    if (!map) return;
    map.redraw();
  },
}));
