import { bakeryPreset } from "./bakery";
import { bodegonPreset } from "./bodegon";
import { breweryPreset } from "./brewery";
import { cafePreset } from "./cafe";
import { icecreamPreset } from "./icecream";
import { restaurantPreset } from "./restaurant";

import type {
  GastroNiche,
  GastroPreset,
  GastroCapabilities,
  GastroOperationConfig,
  GastroVisualConfig,
} from "./types";

/* =========================================================
   DEFAULT
   ========================================================= */

export const DEFAULT_NICHE: GastroNiche =
  "restaurant";

/* =========================================================
   HELPER
   ========================================================= */

function derivePreset(
  base: GastroPreset,
  config: {
    id: GastroNiche;
    label: string;
    visual?: GastroVisualConfig;
    operation?: GastroOperationConfig;
    capabilities?: Partial<GastroCapabilities>;
  },
): GastroPreset {
  return {
    ...base,
    id: config.id,
    label: config.label,
    visual: {
      ...base.visual,
      ...config.visual,
    },
    operation:
      config.operation ??
      base.operation,
    capabilities: {
      ...base.capabilities,
      ...config.capabilities,
    },
  };
}

export const cateringPreset =
  derivePreset(
    restaurantPreset,
    {
      id: "catering",
      label:
        "Catering & Eventos",
      visual: {
        navbar: "minimal",
        hero: "cinematic",
        menu: "catalog",
        productCard: "clean",
        contact: "split",
        cta: "immersive",
        footer: "compact",
      },
      capabilities: {
        reservation: true,
        waiterCall: false,
        tableOrders: false,
        delivery: true,
        pickup: true,
        takeaway: true,
      },
      operation: {
        primary: "delivery",
        supported: [
          "delivery",
          "pickup",
          "counter",
        ],
      },
    },
  );

/* =========================================================
   REGISTRY
   ========================================================= */

export const presets: Record<
  GastroNiche,
  GastroPreset
> = {
  restaurant:
    restaurantPreset,
  cafe: cafePreset,
  brewery: breweryPreset,
  bakery: bakeryPreset,
  icecream: icecreamPreset,
  bodegon: bodegonPreset,
  catering: cateringPreset,
};

export const defaultPreset: GastroPreset =
  presets[DEFAULT_NICHE];

/* =========================================================
   HELPERS
   ========================================================= */

export function isGastroNiche(
  value:
    | string
    | null
    | undefined,
): value is GastroNiche {
  return Boolean(
    value &&
      value in presets,
  );
}

export function getPreset(
  id: GastroNiche,
): GastroPreset {
  return (
    presets[id] ??
    defaultPreset
  );
}
