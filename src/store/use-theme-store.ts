import { create } from "zustand";

import {
  themeProfiles,
  type ThemeMode,
  type RestaurantTheme,
} from "@/config/site";

interface ThemeStore {
  theme: ThemeMode;

  colors:
    RestaurantTheme["colors"];

  setTheme: (
    theme: ThemeMode
  ) => void;

  toggleTheme: () => void;
}

const initialTheme:
  ThemeMode = "dark";

function applyThemeToDOM(
  theme: ThemeMode
) {
  if (
    typeof document ===
    "undefined"
  ) {
    return;
  }

  const root =
    document.documentElement;

  /* Theme metadata */
  root.dataset.theme =
    theme;

  /* Custom theme classes */
  root.classList.remove(
    "theme-dark",
    "theme-light",
    "theme-hybrid"
  );

  root.classList.add(
    `theme-${theme}`
  );

  /*
   * Tailwind dark:
   *
   * dark:bg-...
   * dark:text-...
   * dark:border-...
   *
   * necesitan .dark cuando
   * se usa dark-mode por clase.
   */
  root.classList.toggle(
    "dark",
    theme === "dark"
  );
}

export const useThemeStore =
  create<ThemeStore>()(
    (set, get) => ({
      theme:
        initialTheme,

      colors:
        themeProfiles[
          initialTheme
        ],

      setTheme: (
        theme
      ) => {
        applyThemeToDOM(
          theme
        );

        set({
          theme,

          colors:
            themeProfiles[
              theme
            ],
        });
      },

      toggleTheme: () => {
        const nextTheme =
          get().theme ===
          "dark"
            ? "light"
            : "dark";

        get().setTheme(
          nextTheme
        );
      },
    })
  );