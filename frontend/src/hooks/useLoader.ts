import { create } from "zustand";

interface ILoader {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLoader = create<ILoader>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));
