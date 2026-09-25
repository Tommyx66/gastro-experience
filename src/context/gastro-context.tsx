"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { ReactNode } from "react";

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

import { deepMerge } from "@/lib/merge-config";
import { useThemeStore } from "@/store/use-theme-store";
import { useCartStore } from "@/store/use-cart-store";

/* =========================================================
   CONTEXT TYPE
========================================================= */

export interface GastroContextValue {
  preset: GastroPreset;
  niche: GastroNiche;
  config: SiteConfig;
  menu: GastroPreset["menu"];
  setNiche: (niche: GastroNiche) => void;
}

const GastroContext = createContext<GastroContextValue | null>(null);

/* =========================================================
   HELPERS
========================================================= */

function toCssVariableToken(value: string) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function getPresetTheme(preset: GastroPreset): ThemeMode {
  const presetWithLegacy = preset as GastroPreset & {
    defaultThemeMode?: ThemeMode;
  };

  return preset.theme?.mode ?? presetWithLegacy.defaultThemeMode ?? "dark";
}

function resolveNicheFromLocation(): GastroNiche | null {
  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const requested = params.get("type");

  if (isGastroNiche(requested)) {
    return requested;
  }

  return null;
}

/* =========================================================
   APPLY THEME & PALETTE
========================================================= */

function applyPresetTheme(preset: GastroPreset, theme: ThemeMode) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;

  root.dataset.theme = theme;
  root.classList.remove("theme-dark", "theme-light", "theme-hybrid", "dark");
  root.classList.add(`theme-${theme}`);

  if (theme === "dark") {
    root.classList.add("dark");
  }

  root.dataset.gastro = preset.id;

  const baseColors = themeProfiles[theme];
  const presetColors = preset.theme.colors?.[theme] ?? {};
  const mergedColors = { ...baseColors, ...presetColors };

  Object.entries(mergedColors).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    root.style.setProperty(
      `--color-${toCssVariableToken(key)}`,
      String(value),
    );
  });

  const accent = presetColors.accent ?? preset.theme.accent;
  const accentStrong =
    presetColors.accentStrong ?? preset.theme.accentStrong;
  const accentContrast =
    presetColors.accentContrast ?? preset.theme.accentContrast;

  if (accent) {
    root.style.setProperty("--color-accent", String(accent));
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

  const typography = preset.theme.typography;

  if (typography?.display) {
    root.style.setProperty("--font-display", typography.display);
  }

  if (typography?.body) {
    root.style.setProperty("--font-body", typography.body);
  }

  if (typography?.ui) {
    root.style.setProperty("--font-ui", typography.ui);
  }

  if (typography?.mono) {
    root.style.setProperty("--font-mono-family", typography.mono);
  }
}

function clearPresetInlineStyles() {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
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

  removableVariables.forEach((variable) => {
    root.style.removeProperty(variable);
  });
}

/* =========================================================
   PROVIDER
========================================================= */

interface GastroProviderProps {
  children: ReactNode;
  initialNiche?: GastroNiche;
}

export function GastroProvider({
  children,
  initialNiche,
}: GastroProviderProps) {
  /*
   * IMPORTANT:
   * The first render must be deterministic on both server and client.
   * The page resolves ?type= on the server and passes it here.
   * We therefore never inspect window.location during initial state.
   */
  const [niche, setNicheState] = useState<GastroNiche>(
    initialNiche ?? DEFAULT_NICHE,
  );

  const theme = useThemeStore((state) => state.theme);
  const syncNicheTheme = useThemeStore((state) => state.syncNicheTheme);

  const preset = useMemo(() => getPreset(niche), [niche]);

  const config = useMemo(
    () => deepMerge(siteConfig, preset.siteOverrides ?? {}) as SiteConfig,
    [preset],
  );

  const menu = useMemo(() => preset.menu, [preset]);

  /*
   * Keep the provider synchronized with external URL changes after hydration.
   * This is deliberately an effect: URL state is not used to decide the
   * initial server-rendered tree.
   */
  useEffect(() => {
    const requestedNiche = resolveNicheFromLocation();

    if (requestedNiche && requestedNiche !== niche) {
      setNicheState(requestedNiche);
      syncNicheTheme(
        requestedNiche,
        getPresetTheme(getPreset(requestedNiche)),
      );
    }
  }, [niche, syncNicheTheme]);

  useEffect(() => {
    useCartStore.getState().setNiche(niche);
  }, [niche]);

  useEffect(() => {
    const defaultPresetTheme = getPresetTheme(preset);
    syncNicheTheme(niche, defaultPresetTheme);
  }, [niche, preset, syncNicheTheme]);

  useEffect(() => {
    clearPresetInlineStyles();
    applyPresetTheme(preset, theme);
  }, [preset, theme]);

  const setNiche = (nextNiche: GastroNiche) => {
    if (nextNiche === niche) {
      return;
    }

    setNicheState(nextNiche);
    syncNicheTheme(
      nextNiche,
      getPresetTheme(getPreset(nextNiche)),
    );

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("type", nextNiche);
      window.history.replaceState({}, "", url.toString());
    }
  };

  const value = useMemo<GastroContextValue>(
    () => ({
      preset,
      niche,
      config,
      menu,
      setNiche,
    }),
    [preset, niche, config, menu],
  );

  return (
    <GastroContext.Provider value={value}>
      {children}
    </GastroContext.Provider>
  );
}

/* =========================================================
   HOOK
========================================================= */

export function useGastro() {
  const context = useContext(GastroContext);

  if (!context) {
    throw new Error("useGastro must be used inside GastroProvider");
  }

  return context;
}
