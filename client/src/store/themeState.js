import { create } from "zustand";

const prefersDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;

const defaultTheme = prefersDarkMode ? "dark" : "light";

export const useThemeStore = create((set) => ({
  defaultTheme: defaultTheme,
  setTheme: (newTheme) => set({ theme: newTheme }),
}));
