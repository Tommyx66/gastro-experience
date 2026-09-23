"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DEFAULT_NICHE,
  getPreset,
  isGastroNiche,
} from "@/config/presets";

import type {
  GastroNiche,
  GastroPreset,
} from "@/config/presets/types";

import {
  siteConfig,
  themeProfiles,
  type SiteConfig,
  type ThemeMode,
} from "@/config/site";

import {
  deepMerge,
} from "@/lib/merge-config";

import {
  useThemeStore,
} from "@/store/use-theme-store";

import {
  useCartStore,
} from "@/store/use-cart-store";

/* =========================================================
   CONTEXT TYPE
   ========================================================= */

export interface GastroContextValue {
  preset: GastroPreset;
  niche: GastroNiche;
  config: SiteConfig;
  menu: GastroPreset["menu"];

  setNiche: (
    niche: GastroNiche,
  ) => void;
}

/* =========================================================
   CONTEXT
   ========================================================= */

const GastroContext =
  createContext<GastroContextValue | null>(
    null,
  );

/* =========================================================
   HELPERS
   ========================================================= */

function toCssVariableToken(
  value: string,
) {
  return value.replace(
    /[A-Z]/g,
    (letter) =>
      `-${letter.toLowerCase()}`,
  );
}

/* =========================================================
   PRESET DEFAULT THEME
   ========================================================= */

function getPresetTheme(
  preset: GastroPreset,
): ThemeMode {
  const presetWithLegacy =
    preset as GastroPreset & {
      defaultThemeMode?: ThemeMode;
    };

  return (
    preset.theme?.mode ??
    presetWithLegacy.defaultThemeMode ??
    "dark"
  );
}

/* =========================================================
   APPLY THEME
   ========================================================= */

function applyPresetTheme(
  preset: GastroPreset,
  theme: ThemeMode,
) {
  if (
    typeof document ===
    "undefined"
  ) {
    return;
  }

  const root =
    document.documentElement;

  /* -------------------------------------------------------
     Theme classes
     ------------------------------------------------------- */

  root.dataset.theme =
    theme;

  root.classList.remove(
    "theme-dark",
    "theme-light",
    "theme-hybrid",
    "dark",
  );

  root.classList.add(
    `theme-${theme}`,
  );

  if (theme === "dark") {
    root.classList.add(
      "dark",
    );
  }

  /* -------------------------------------------------------
     Preset identity
     ------------------------------------------------------- */

  root.dataset.gastro =
    preset.id;

  /* -------------------------------------------------------
     Base palette
     ------------------------------------------------------- */

  const baseColors =
    themeProfiles[theme];

  /* -------------------------------------------------------
     Preset palette overrides
     ------------------------------------------------------- */

  const presetColors =
    preset.theme.colors?.[
      theme
    ] ?? {};

  const mergedColors = {
    ...baseColors,
    ...presetColors,
  };

  /* -------------------------------------------------------
     CSS variables
     ------------------------------------------------------- */

  Object.entries(
    mergedColors,
  ).forEach(
    ([key, value]) => {
      if (
        value ===
          undefined ||
        value === null
      ) {
        return;
      }

      root.style.setProperty(
        `--color-${toCssVariableToken(
          key,
        )}`,
        String(value),
      );
    },
  );

  /* -------------------------------------------------------
     Accent overrides
     ------------------------------------------------------- */

  /*
   * Theme-specific colors win over
   * the generic preset accent.
   */

  const accent =
    presetColors.accent ??
    preset.theme.accent;

  const accentStrong =
    presetColors.accentStrong ??
    preset.theme.accentStrong;

  const accentContrast =
    presetColors.accentContrast ??
    preset.theme.accentContrast;

  if (accent) {
    root.style.setProperty(
      "--color-accent",
      String(accent),
    );
  }

  if (accentStrong) {
    root.style.setProperty(
      "--color-accent-strong",
      String(accentStrong),
    );
  }

  if (accentContrast) {
    root.style.setProperty(
      "--color-accent-contrast",
      String(accentContrast),
    );
  }

  /* -------------------------------------------------------
     Typography
     ------------------------------------------------------- */

  const typography =
    preset.theme.typography;

  if (
    typography?.display
  ) {
    root.style.setProperty(
      "--font-display",
      typography.display,
    );
  }

  if (
    typography?.body
  ) {
    root.style.setProperty(
      "--font-body",
      typography.body,
    );
  }

  if (
    typography?.ui
  ) {
    root.style.setProperty(
      "--font-ui",
      typography.ui,
    );
  }

  if (
    typography?.mono
  ) {
    root.style.setProperty(
      "--font-mono-family",
      typography.mono,
    );
  }
}

/* =========================================================
   CLEAR INLINE VARIABLES
   ========================================================= */

function clearPresetInlineStyles() {
  if (
    typeof document ===
    "undefined"
  ) {
    return;
  }

  const root =
    document.documentElement;

  const removableVariables = [
    "--font-display",
    "--font-body",
    "--font-ui",
    "--font-mono-family",

    "--color-bg",
    "--color-bg-elevated",

    "--color-surface",
    "--color-surface-elevated",
    "--color-surface-inverse",

    "--color-text",
    "--color-text-muted",
    "--color-text-subtle",

    "--color-accent",
    "--color-accent-strong",
    "--color-accent-contrast",

    "--color-accent-soft",
    "--color-accent-faint",
    "--color-accent-border",

    "--color-border",
    "--color-border-strong",

    "--color-overlay",
    "--color-control",
    "--color-control-hover",

    "--color-success",
    "--color-warning",
    "--color-danger",
  ];

  removableVariables.forEach(
    (variable) => {
      root.style.removeProperty(
        variable,
      );
    },
  );
}

/* =========================================================
   PROVIDER
   ========================================================= */

export function GastroProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /* -------------------------------------------------------
     Niche
     ------------------------------------------------------- */

  const [
    niche,
    setNicheState,
  ] =
    useState<GastroNiche>(
      DEFAULT_NICHE,
    );

  /* -------------------------------------------------------
     Theme store
     ------------------------------------------------------- */

  const theme =
    useThemeStore(
      (state) =>
        state.theme,
    );

  const setTheme =
    useThemeStore(
      (state) =>
        state.setTheme,
    );

  /* -------------------------------------------------------
     Current preset
     ------------------------------------------------------- */

  const preset =
    useMemo(
      () =>
        getPreset(
          niche,
        ),
      [niche],
    );

  /* -------------------------------------------------------
     Current config
     ------------------------------------------------------- */

  const config =
    useMemo(
      () =>
        deepMerge(
          siteConfig,
          preset.siteOverrides ??
            {},
        ) as SiteConfig,
      [preset],
    );

  /* -------------------------------------------------------
     Current menu
     ------------------------------------------------------- */

  const menu =
    useMemo(
      () =>
        preset.menu,
      [preset],
    );

  /* -------------------------------------------------------
     Resolve niche from URL
     ------------------------------------------------------- */

  useEffect(() => {
    const params =
      new URLSearchParams(
        window.location.search,
      );

    const requested =
      params.get(
        "type",
      );

    if (
      isGastroNiche(
        requested,
      )
    ) {
      setNicheState(
        requested,
      );
    }
  }, []);

  /* -------------------------------------------------------
     Sync niche -> cart
     ------------------------------------------------------- */

  useEffect(() => {
    useCartStore
      .getState()
      .setNiche(
        niche,
      );
  }, [niche]);

  /* -------------------------------------------------------
     Preset -> default theme
     ------------------------------------------------------- */

  useEffect(() => {
    const targetTheme =
      getPresetTheme(
        preset,
      );

    /*
     * IMPORTANT:
     * this effect intentionally does NOT
     * depend on `theme`.
     *
     * Therefore a manual light/dark
     * toggle remains effective.
     */

    setTheme(
      targetTheme,
    );
  }, [
    niche,
    preset,
    setTheme,
  ]);

  /* -------------------------------------------------------
     Apply preset + active theme
     ------------------------------------------------------- */

  useEffect(() => {
    clearPresetInlineStyles();

    applyPresetTheme(
      preset,
      theme,
    );
  }, [
    preset,
    theme,
  ]);

  /* -------------------------------------------------------
     Change niche
     ------------------------------------------------------- */

  const setNiche = (
    nextNiche: GastroNiche,
  ) => {
    if (
      nextNiche === niche
    ) {
      return;
    }

    setNicheState(
      nextNiche,
    );

    const url =
      new URL(
        window.location.href,
      );

    url.searchParams.set(
      "type",
      nextNiche,
    );

    window.history.replaceState(
      {},
      "",
      url.toString(),
    );
  };

  /* -------------------------------------------------------
     Context value
     ------------------------------------------------------- */

  const value =
    useMemo<GastroContextValue>(
      () => ({
        preset,
        niche,
        config,
        menu,
        setNiche,
      }),
      [
        preset,
        niche,
        config,
        menu,
      ],
    );

  return (
    <GastroContext.Provider
      value={value}
    >
      {children}
    </GastroContext.Provider>
  );
}

/* =========================================================
   HOOK
   ========================================================= */

export function useGastro() {
  const context =
    useContext(
      GastroContext,
    );

  if (!context) {
    throw new Error(
      "useGastro must be used inside GastroProvider",
    );
  }

  return context;
}