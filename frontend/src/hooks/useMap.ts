import { create } from "zustand";
import { Map as TMap, Marker, LngLat } from "maplibre-gl";

// Color arrays
const lightModeColors = [
  "#1E1E1E",
  "#D72638",
  "#3F88C5",
  "#1B998B",
  "#F46036",
  "#2E294E",
  "#E2C044",
  "#4CAF50",
];

const darkModeColors = [
  "#C4D9FF",
  "#FF6B6B",
  "#4D96FF",
  "#6FFFE9",
  "#FFD93D",
  "#F9A826",
  "#A29BFE",
  "#00FFAB",
];

// Store Interface
interface MapStore {
  map: TMap | null;
  usedColors: Set<string>;
  markers: Marker[];
  setMap: (map: TMap | null) => void;
  setPolyline: (name: string, coordinates: [number, number][]) => void;
  removePolyline: (name: string) => void;
  addMarker: (lngLat: [number, number]) => void;
  removeAllMarkers: () => void;
  resetPolyline: () => void;
}

// Helper: Pick next available color
const getNextColor = (usedColors: Set<string>, isDarkMode: boolean): string => {
  const colors = isDarkMode ? darkModeColors : lightModeColors;
  const available = colors.find((color) => !usedColors.has(color));
  return available || colors[0]; // fallback if all used
};

// Hook
export const useMapStore = create<MapStore>((set, get) => ({
  map: null,
  usedColors: new Set(),
  markers: [],

  setMap: (map: TMap | null) => set({ map }),

  setPolyline: (name: string, coordinates: [number, number][]) => {
    const { map, usedColors } = get();
    if (!map) return;

    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const color = getNextColor(usedColors, isDarkMode);
    usedColors.add(color);

    // Add source
    if (!map.getSource(name)) {
      map.addSource(name, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates,
          },
          properties: {},
        },
      });
    }

    // Add layer
    if (!map.getLayer("line-" + name)) {
      map.addLayer({
        id: "line-" + name,
        type: "line",
        source: name,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-width": 4,
          "line-color": color,
        },
      });
    }
  },

  removePolyline: (name: string) => {
    const { map } = get();
    if (!map) return;

    const layerId = "line-" + name;
    if (map.getLayer(layerId)) {
      map.removeLayer(layerId);
    }
    if (map.getSource(name)) {
      map.removeSource(name);
    }
  },

  addMarker: (lngLat: [number, number]) => {
    const { map, markers } = get();
    if (!map) return;
    const point = new LngLat(...lngLat);
    const marker = new Marker().setLngLat(point).addTo(map);
    set({ markers: [...markers, marker] });
  },

  removeAllMarkers: () => {
    const { markers } = get();
    markers.forEach((marker) => marker.remove());
    set({ markers: [] });
  },

  resetPolyline: () => {
    const { map } = get();
    if (!map) return;
    map.triggerRepaint();
  },
}));
