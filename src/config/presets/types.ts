import type {
  RestaurantTheme,
  SiteConfig,
  ThemeMode,
} from "@/config/site";

import type {
  MenuCategory,
  MenuData,
  MenuProduct,
} from "@/data/menu";

/* =========================================================
   NICHE
   ========================================================= */

export type GastroNiche =
  | "restaurant"
  | "cafe"
  | "brewery"
  | "bakery"
  | "icecream"
  | "bodegon"
  | "catering";

/* =========================================================
   GENERIC UTILITY
   ========================================================= */

export type DeepPartial<T> =
  T extends readonly (
    infer U
  )[]
    ? readonly DeepPartial<U>[]
    : T extends object
      ? {
          [P in keyof T]?:
            DeepPartial<T[P]>;
        }
      : T;

/* =========================================================
   CAPABILITIES
   ========================================================= */

export interface GastroCapabilities {
  ordering: boolean;

  delivery: boolean;
  pickup: boolean;

  tableOrders: boolean;
  waiterCall: boolean;
  reservation: boolean;

  story: boolean;

  coffeeCustomizer: boolean;
  beerTaps: boolean;

  iceCreamSizes: boolean;
  toppings: boolean;

  brunch: boolean;
  takeaway: boolean;
}

/* =========================================================
   THEME
   ========================================================= */

export type GastroColorOverrides =
  Partial<
    RestaurantTheme["colors"]
  >;

export interface GastroTypographyConfig {
  display?: string;
  body?: string;
  ui?: string;
  mono?: string;
}

export interface GastroThemeConfig {
  mode: ThemeMode;

  accent?: string;
  accentStrong?: string;
  accentContrast?: string;

  colors?: Partial<
    Record<
      ThemeMode,
      GastroColorOverrides
    >
  >;

  typography?: GastroTypographyConfig;
}

/* =========================================================
   VISUAL LANGUAGE
   ========================================================= */

export type GastroNavbarVariant =
  | "pill"
  | "minimal"
  | "editorial";

export type GastroHeroVariant =
  | "cinematic"
  | "editorial"
  | "minimal";

export type GastroMenuVariant =
  | "immersive"
  | "compact"
  | "catalog";

export type GastroProductCardVariant =
  | "photo"
  | "clean"
  | "compact";

export type GastroContactVariant =
  | "map"
  | "split"
  | "minimal";

export type GastroCtaVariant =
  | "immersive"
  | "editorial"
  | "minimal";

export type GastroFooterVariant =
  | "editorial"
  | "minimal"
  | "compact";

export interface GastroVisualConfig {
  navbar?: GastroNavbarVariant;
  hero?: GastroHeroVariant;
  menu?: GastroMenuVariant;
  productCard?: GastroProductCardVariant;
  contact?: GastroContactVariant;
  cta?: GastroCtaVariant;
  footer?: GastroFooterVariant;
}

/* =========================================================
   OPERATION
   ========================================================= */

export type GastroOperationType =
  | "table"
  | "counter"
  | "pickup"
  | "delivery";

export interface GastroOperationConfig {
  primary: GastroOperationType;

  supported:
    GastroOperationType[];
}

/* =========================================================
   MENU
   ========================================================= */

export type {
  MenuCategory,
  MenuProduct,
  MenuData,
};

/* =========================================================
   PRESET
   ========================================================= */

export interface GastroPreset {
  id: GastroNiche;

  label: string;

  theme: GastroThemeConfig;

  visual?: GastroVisualConfig;

  operation:
    GastroOperationConfig;

  capabilities:
    GastroCapabilities;

  siteOverrides?:
    DeepPartial<SiteConfig>;

  menu:
    MenuData;
}