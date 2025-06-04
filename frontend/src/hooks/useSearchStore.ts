import { create } from "zustand";
import { IAddress, VehicleTypeKeys } from "../types/types";
import { shallow } from "zustand/shallow";
import { persist } from "zustand/middleware";

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
}

export const useSearchStore = create<ISearchStore>()(persist((set) => ({
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
}),{
  name: "search-store",
  partialize: (state) => ({
    from: state.from,
    to: state.to,
    waypoints: state.waypoints,
    vehicle: state.vehicle,
  }),
  onRehydrateStorage: (state) => state ? () => ({
    from: state.from || null,
    to: state.to || null,
    waypoints: state.waypoints || null,
    vehicle: state.vehicle || null,
  }) : undefined,
}));
