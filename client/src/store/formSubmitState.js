import { create } from "zustand";

export const useSubmitStore = create((set) => ({
  formSubmitState: false,
  setFormSubmitState: (val) => set({ formSubmitState: val }),
}));
