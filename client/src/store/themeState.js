import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist((set) => ({
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",

    toggleTheme: () =>
      set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),

    setTheme: (theme) => set({ theme }),
  })),
);
