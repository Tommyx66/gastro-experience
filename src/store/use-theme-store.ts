import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import {
  themeProfiles,
  type ThemeMode,
  type RestaurantTheme,
} from "@/config/site";

interface ThemeStore {
  theme: ThemeMode;
  colors: RestaurantTheme["colors"];
  userOverride: boolean;
  activeNiche: string | null;
  setTheme: (theme: ThemeMode, isUserAction?: boolean) => void;
  toggleTheme: () => void;
  syncNicheTheme: (targetNiche: string, defaultPresetTheme: ThemeMode) => void;
}

function applyThemeToDOM(theme: ThemeMode) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;

  root.dataset.theme = theme;
  root.classList.remove("theme-dark", "theme-light", "theme-hybrid");
  root.classList.add(`theme-${theme}`);
  root.classList.toggle("dark", theme === "dark");
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "dark",
      colors: themeProfiles["dark"],
      userOverride: false,
      activeNiche: null,

      setTheme: (theme, isUserAction = false) => {
        applyThemeToDOM(theme);

        set({
          theme,
          colors: themeProfiles[theme],
          userOverride: isUserAction ? true : get().userOverride,
        });
      },

      toggleTheme: () => {
        const nextTheme = get().theme === "dark" ? "light" : "dark";
        applyThemeToDOM(nextTheme);

        set({
          theme: nextTheme,
          colors: themeProfiles[nextTheme],
          userOverride: true,
        });
      },

      syncNicheTheme: (targetNiche: string, defaultPresetTheme: ThemeMode) => {
        const state = get();

        // Si el nicho no cambió (navegación entre páginas), preservamos la elección activa
        if (state.activeNiche === targetNiche) {
          applyThemeToDOM(state.theme);
          return;
        }

        // Si cambió el nicho (ej: de restaurante a cafetería), aplicamos el preset por defecto
        applyThemeToDOM(defaultPresetTheme);
        set({
          theme: defaultPresetTheme,
          colors: themeProfiles[defaultPresetTheme],
          activeNiche: targetNiche,
          userOverride: false,
        });
      },
    }),
    {
      name: "gastro_theme_preference",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        userOverride: state.userOverride,
        activeNiche: state.activeNiche,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          applyThemeToDOM(state.theme);
        }
      },
    }
  )
);