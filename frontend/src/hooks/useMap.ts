import { create } from "zustand";
import { Map as TMap } from "maplibre-gl";

interface MapStore {
  map: TMap | null;
  setMap: (map: TMap | null) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  map: null,
  setMap: (map: TMap | null) => set({ map }),
}));
