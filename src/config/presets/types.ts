import type { RestaurantTheme, SiteConfig, ThemeMode } from "@/config/site";
import type { MenuCategory, MenuData, MenuProduct } from "@/data/menu";

export type GastroNiche =
  | "restaurant"
  | "cafe"
  | "brewery"
  | "bakery"
  | "icecream"
  | "bodegon"
  | "catering";

export type DeepPartial<T> =
  T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : T extends readonly (infer U)[]
          ? readonly DeepPartial<U>[]
          : T extends object
            ? { [P in keyof T]?: DeepPartial<T[P]> }
            : T;

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

export type GastroColorOverrides = Partial<RestaurantTheme["colors"]>;

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
  colors?: Partial<Record<ThemeMode, GastroColorOverrides>>;
  typography?: GastroTypographyConfig;
}

export type GastroNavbarVariant = "pill" | "minimal" | "editorial";
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
export type GastroHeroComposition = "standard" | "editorial" | "centered" | "split";
export type GastroHeroCtaShape = "circle" | "square" | "pill" | "outline";

export interface GastroHeroStyleConfig {
  variant: GastroHeroVariant;
  imageTreatment?: GastroHeroImageTreatment;
  overlay?: GastroHeroOverlay;
  composition?: GastroHeroComposition;
  ctaShape?: GastroHeroCtaShape;
  grain?: boolean;
  parallax?: boolean;
  intensity?: number;
}

export type GastroMenuVariant = "immersive" | "compact" | "catalog";
export type GastroProductCardVariant = "photo" | "clean" | "compact";
export type GastroContactVariant = "map" | "split" | "minimal";
export type GastroCtaVariant = "immersive" | "editorial" | "minimal";
export type GastroFooterVariant = "editorial" | "minimal" | "compact";
export type GastroStoryVariant =
  | "fire"
  | "ritual"
  | "taproom"
  | "atelier"
  | "gelateria"
  | "cantina"
  | "hospitality";
export type GastroStoryLayout = "marquee" | "editorial" | "stacked" | "lookbook";
export type GastroStoryImageTreatment =
  | "film"
  | "natural"
  | "grain"
  | "sepia"
  | "soft"
  | "highContrast";
export type GastroStoryCardShape = "rect" | "soft" | "framed" | "poster" | "ticket";
export type GastroStoryDensity = "airy" | "balanced" | "dense";

export interface GastroStoryMotionConfig {
  speed?: number;
  direction?: "left" | "right";
  hoverLift?: number;
  parallax?: boolean;
  pauseOnHover?: boolean;
}

export interface GastroStoryStyleConfig {
  variant: GastroStoryVariant;
  layout?: GastroStoryLayout;
  imageTreatment?: GastroStoryImageTreatment;
  cardShape?: GastroStoryCardShape;
  density?: GastroStoryDensity;
  watermark?: boolean;
  grain?: boolean;
  numbering?: boolean;
  motion?: GastroStoryMotionConfig;
}

export interface GastroVisualConfig {
  navbar?: GastroNavbarVariant;
  hero?: GastroHeroVariant;
  heroStyle?: GastroHeroStyleConfig;
  menu?: GastroMenuVariant;
  productCard?: GastroProductCardVariant;
  contact?: GastroContactVariant;
  cta?: GastroCtaVariant;
  footer?: GastroFooterVariant;
  story?: GastroStoryStyleConfig;
}

export type GastroOperationType = "table" | "counter" | "pickup" | "delivery";

export interface GastroOperationConfig {
  primary: GastroOperationType;
  supported: GastroOperationType[];
}

/* =========================================================
   PRODUCT SHOWROOM
========================================================= */

export type GastroShowcaseIconKind = "beer" | "coffee" | "image";

export interface GastroShowcaseTechnicalSpec {
  label: string;
  value: string;
  unit?: string;
  highlight?: boolean;
}

export interface GastroShowcaseSecondarySpec {
  label: string;
  value: string;
}

export interface GastroShowcaseAward {
  label: string;
  text: string;
}

export interface GastroShowcaseArtworkCan {
  type: "can";
  src?: string;
  rotation?: number;
  scale?: number;
  x?: number;
  y?: number;
  shellColor: string;
  labelColor: string;
  inkColor: string;
  stripeColor?: string;
  glow: string;
  shadowColor?: string;
  topLabel: string;
  mark: string;
  labelText: string;
  bottomLabel: string;
  microcopy: string;
}

export interface GastroShowcaseArtworkImage {
  type: "image";
  rotation?: number;
  scale?: number;
  x?: number;
  y?: number;
  glow?: string;
  shadowColor?: string;
  src: string;
  fit?: "cover" | "contain";
}

export type GastroShowcaseArtwork =
  | GastroShowcaseArtworkCan
  | GastroShowcaseArtworkImage;

export interface GastroShowcaseProduct {
  id: string;
  menuProductName?: string;
  index: string;
  badge?: string;
  name: string;
  style: string;
  subtitle?: string;
  description: string;
  artwork: GastroShowcaseArtwork;
  accentColor: string;
  ambientGlow: string;
  technical: GastroShowcaseTechnicalSpec[];
  secondary?: GastroShowcaseSecondarySpec[];
  award?: GastroShowcaseAward;
  price?: number;
  actionText?: string;
  footer?: [string, string];
}

export interface GastroShowcaseConfig {
  enabled?: boolean;
  engine: "product-showroom";
  iconKind: GastroShowcaseIconKind;
  atmosphereImage?: string;
  header: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix?: string;
    description?: string;
  };
  labels: {
    technical: string;
    previous: string;
    next: string;
    action: string;
  };
  products: GastroShowcaseProduct[];
}

/*
 * Content overrides intentionally retain a small compatibility envelope.
 * Several existing niche presets carry legacy editorial fields such as
 * story.labels.processLine, ctaTransition.image, and older showcase shapes.
 * They are read defensively by the rendering layer, so the config contract
 * should not reject them during type-checking.
 */
type GastroLegacyStoryExtension = {
  labels?: Record<string, unknown> & {
    processLine?: string;
    traceability?: string;
    closeSheet?: string;
  };
  [key: string]: unknown;
};

type GastroLegacyCtaExtension = {
  image?: string;
  [key: string]: unknown;
};

type GastroSiteContentOverrides = DeepPartial<SiteConfig["content"]> & {
  story?: GastroLegacyStoryExtension;
  ctaTransition?: GastroLegacyCtaExtension;
  showcase?: unknown;
};

export type GastroSiteOverrides = Omit<DeepPartial<SiteConfig>, "content"> & {
  content?: GastroSiteContentOverrides;
};

export type { MenuCategory, MenuProduct, MenuData };

export interface GastroPreset {
  id: GastroNiche;
  label: string;
  theme: GastroThemeConfig;
  visual?: GastroVisualConfig;
  operation: GastroOperationConfig;
  capabilities: GastroCapabilities;
  siteOverrides?: GastroSiteOverrides;
  menu: MenuData;
}
