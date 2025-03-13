import { create } from "zustand";
import { Map as TMap } from "maplibre-gl";

interface MapProps {
  map: TMap | null;
  setMap: (map: TMap | null) => void;
}

export const useMapStore = create<MapProps>((set) => ({
  map: null,
  setMap: (map: TMap | null) => set({ map }),
}));
