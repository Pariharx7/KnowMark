import { create } from "zustand";

export const useDropDownStore = create((set) => ({
  dropDownState: false,
  setDropDownState: (val) => set({ dropDownState: val }),
}));
