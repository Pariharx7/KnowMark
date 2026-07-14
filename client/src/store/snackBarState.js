import { create } from "zustand";

export const useSnackbarStore = create((set) => ({
  snackBarState: false,
  setSnackBarState: (val) => set({ snackBarState: val }),
}));
