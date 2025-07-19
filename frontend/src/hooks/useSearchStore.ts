import { create } from "zustand";
import { IAddress, VehicleTypeKeys } from "../types/types";
import { shallow } from "zustand/shallow";

interface ISearchStore {
  from: IAddress | null;
  setFrom: (from: IAddress) => void;

  to: IAddress | null;
  setTo: (to: IAddress) => void;

  waypoints: Pick<IAddress, "address">[] | null;
  addWaypoint: (waypoint: IAddress) => void;
  removeWaypoint: (waypoint: IAddress) => void;

  vehicle: VehicleTypeKeys | null;
  setVehicle: (vehicle: VehicleTypeKeys) => void;

  resetForm: () => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  from: null,
  setFrom: (from) => set({ from }),

  to: null,
  setTo: (to) => set({ to }),

  waypoints: null,
  addWaypoint: (waypoint) =>
    set((state) =>
      state.waypoints
        ? { waypoints: [...state.waypoints, waypoint] }
        : { waypoints: [waypoint] }
    ),
  removeWaypoint: (waypoint) =>
    set((state) => ({
      waypoints: state.waypoints?.filter((w) => shallow(w, waypoint)) || null,
    })),

  vehicle: null,
  setVehicle: (vehicle) => set({ vehicle }),

  resetForm: () =>
    set({
      from: null,
      to: null,
      waypoints: null,
      vehicle: null,
    }),
}));
