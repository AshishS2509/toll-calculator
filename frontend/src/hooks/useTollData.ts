import { create } from "zustand";
import { IResponseData } from "../types/data.types";

interface TollDataStore {
  data: IResponseData | undefined;
  setData: (data: IResponseData | undefined) => void;
}

export const useTollData = create<TollDataStore>((set) => ({
  data: undefined,
  setData: (data) => set({ data }),
}));
