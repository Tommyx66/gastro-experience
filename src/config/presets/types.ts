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

/* ---------------------------------------------------------
   NAVBAR
--------------------------------------------------------- */

export type GastroNavbarVariant =
  | "pill"
  | "minimal"
  | "editorial";

/* ---------------------------------------------------------
   HERO
--------------------------------------------------------- */

export type GastroHeroVariant =
  | "cinematic"
  | "editorial"
  | "minimal"
  | "ritual"
  | "industrial"
  | "playful"
  | "hospitality";

export type GastroHeroImageTreatment =
  | "cinematic"
  | "film"
  | "natural"
  | "soft"
  | "highContrast"
  | "grain";

export type GastroHeroOverlay =
  | "cinematic"
  | "editorial"
  | "paper"
  | "none"
  | "edge";

export type GastroHeroComposition =
  | "standard"
  | "editorial"
  | "centered"
  | "split";

export type GastroHeroCtaShape =
  | "circle"
  | "square"
  | "pill"
  | "outline";

export interface GastroHeroStyleConfig {
  variant:
    GastroHeroVariant;

  imageTreatment?:
    GastroHeroImageTreatment;

  overlay?:
    GastroHeroOverlay;

  composition?:
    GastroHeroComposition;

  ctaShape?:
    GastroHeroCtaShape;

  grain?: boolean;

  parallax?: boolean;

  intensity?: number;
}

/* ---------------------------------------------------------
   MENU
--------------------------------------------------------- */

export type GastroMenuVariant =
  | "immersive"
  | "compact"
  | "catalog";

/* ---------------------------------------------------------
   PRODUCT CARD
--------------------------------------------------------- */

export type GastroProductCardVariant =
  | "photo"
  | "clean"
  | "compact";

/* ---------------------------------------------------------
   CONTACT
--------------------------------------------------------- */

export type GastroContactVariant =
  | "map"
  | "split"
  | "minimal";

/* ---------------------------------------------------------
   CTA
--------------------------------------------------------- */

export type GastroCtaVariant =
  | "immersive"
  | "editorial"
  | "minimal";

/* ---------------------------------------------------------
   FOOTER
--------------------------------------------------------- */

export type GastroFooterVariant =
  | "editorial"
  | "minimal"
  | "compact";

/* ---------------------------------------------------------
   STORY
--------------------------------------------------------- */

export type GastroStoryVariant =
  | "fire"
  | "ritual"
  | "taproom"
  | "atelier"
  | "gelateria"
  | "cantina"
  | "hospitality";

export type GastroStoryLayout =
  | "marquee"
  | "editorial"
  | "stacked"
  | "lookbook";

export type GastroStoryImageTreatment =
  | "film"
  | "natural"
  | "grain"
  | "sepia"
  | "soft"
  | "highContrast";

export type GastroStoryCardShape =
  | "rect"
  | "soft"
  | "framed"
  | "poster"
  | "ticket";

export type GastroStoryDensity =
  | "airy"
  | "balanced"
  | "dense";

export interface GastroStoryMotionConfig {
  speed?: number;

  direction?:
    | "left"
    | "right";

  hoverLift?: number;

  parallax?: boolean;

  pauseOnHover?: boolean;
}

export interface GastroStoryStyleConfig {
  variant:
    GastroStoryVariant;

  layout?:
    GastroStoryLayout;

  imageTreatment?:
    GastroStoryImageTreatment;

  cardShape?:
    GastroStoryCardShape;

  density?:
    GastroStoryDensity;

  watermark?: boolean;

  grain?: boolean;

  numbering?: boolean;

  motion?: GastroStoryMotionConfig;
}

/* ---------------------------------------------------------
   VISUAL CONFIG
--------------------------------------------------------- */

export interface GastroVisualConfig {
  navbar?: GastroNavbarVariant;

  hero?: GastroHeroVariant;

  heroStyle?:
    GastroHeroStyleConfig;

  menu?: GastroMenuVariant;

  productCard?:
    GastroProductCardVariant;

  contact?: GastroContactVariant;

  cta?: GastroCtaVariant;

  footer?: GastroFooterVariant;

  story?:
    GastroStoryStyleConfig;
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
  primary:
    GastroOperationType;

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

  theme:
    GastroThemeConfig;

  visual?:
    GastroVisualConfig;

  operation:
    GastroOperationConfig;

  capabilities:
    GastroCapabilities;

  siteOverrides?:
    DeepPartial<SiteConfig>;

  menu:
    MenuData;
}