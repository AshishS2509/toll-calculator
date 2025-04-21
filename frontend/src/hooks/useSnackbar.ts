import { create } from "zustand";

interface ISnackbar {
  openSnakcbar: boolean;
  setOpenSnakcbar: (openSnakcbar: boolean) => void;
}

export const useSnackbar = create<ISnackbar>((set) => ({
  openSnakcbar: false,
  setOpenSnakcbar: (openSnakcbar: boolean) => set({ openSnakcbar }),
}));
