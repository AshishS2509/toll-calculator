import { create } from "zustand";
import { Map as TMap, Marker, LngLat } from "maplibre-gl";
import getStyleUrl from "../config";

// Store Interface
interface MapStore {
  map: TMap | null;
  markers: Record<string, Marker>;
  polylines: Record<string, [number, number][]>; // Store polylines by name
  setMap: (map: TMap | null) => void;
  setPolyline: (name: string, coordinates: [number, number][]) => void;
  removePolyline: (name: string) => void;
  addMarker: (name:string, lngLat: [number, number]) => void;
  removeAllMarkers: () => void;
  resetPolyline: () => void;
  resetMap: () => void;
}

// Hook
const generateUniqueId = () => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return `polyline-${Date.now()}-${array[0].toString(36)}`;
};
export const useMapStore = create<MapStore>((set, get) => ({
    map: null,
    markers: {},
    polylines: {},
    setMap: (map: TMap | null) => set({ map }),

    setPolyline: (name: string, coordinates: [number, number][]) => {
      const { map, polylines } = get();
      if (!map) return;

      const id = name ? name : generateUniqueId();

      // Add source
      if (!map.getSource(id)) {
        map.addSource(id, {
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

      // Add layer with a default color
      if (!map.getLayer("line-" + id)) {
        map.addLayer({
          id: "line-" + id,
          type: "line",
          source: id,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-width": 4,
            "line-color": "#000000", // Default color
          },
        });
      }

      // Save polyline in state
      set({ polylines: { ...polylines, [id]: coordinates } });
    },

    removePolyline: (id: string) => {
      const { map, polylines } = get();
      if (!map) return;

      const layerId = "line-" + id;
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
      }
      if (map.getSource(id)) {
        map.removeSource(id);
      }

      // Remove polyline from state
      const remainingPolylines = Object.keys(polylines)
        .filter(key => key !== id)
        .reduce((acc, key) => {
          acc[key] = polylines[key];
          return acc;
        }, {} as Record<string, [number, number][]>);
      set({ polylines: remainingPolylines });
    },

    addMarker: (name: string, lngLat: [number, number]) => {
      const { map, markers } = get();
      if (!map) return;
      const point = new LngLat(...lngLat);
      const marker = new Marker().setLngLat(point).addTo(map);
      set({ markers: { ...markers, [name]: marker } });
    },

    removeAllMarkers: () => {
      const { markers } = get();
      Object.values(markers).forEach((mark) => mark.remove());
      set({ markers: {} });
    },

    resetPolyline: () => {
      const { map } = get();
      if (!map) return;
      map.triggerRepaint();
    },

    resetMap: () => {
      const { map, removeAllMarkers } = get();
      if (!map) return;
      removeAllMarkers();
      set({ markers: {}, polylines: {} });
      map.setStyle(getStyleUrl(), { diff: false });
    },
  }));
