import {
  restaurantPreset,
} from "./restaurant";

import {
  cafePreset,
} from "./cafe";

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

export const DEFAULT_NICHE:
  GastroNiche =
  "restaurant";

/* =========================================================
   PRESET DERIVATION
   ========================================================= */

function derivePreset(
  base: GastroPreset,
  config: {
    id: GastroNiche;
    label: string;

    visual?: GastroVisualConfig;

    operation?: GastroOperationConfig;

    capabilities?: Partial<
      GastroCapabilities
    >;
  }
): GastroPreset {
  return {
    ...base,

    id:
      config.id,

    label:
      config.label,

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

/* =========================================================
   DERIVED NICHE PRESETS
   ========================================================= */

/**
 * Estos presets funcionan como base técnica.
 *
 * La identidad editorial, contenido y menú definitivos
 * de cada nicho deberían migrarse posteriormente a
 * sus propios archivos y su propio menu data.
 */

export const breweryPreset =
  derivePreset(
    restaurantPreset,
    {
      id:
        "brewery",

      label:
        "Cervecería & Burgers",

      visual: {
        navbar:
          "editorial",

        hero:
          "cinematic",

        menu:
          "catalog",

        productCard:
          "photo",

        contact:
          "map",

        cta:
          "immersive",

        footer:
          "editorial",
      },

      capabilities: {
        beerTaps:
          true,

        reservation:
          false,

        tableOrders:
          true,

        waiterCall:
          true,

        takeaway:
          true,
      },
    }
  );

export const bakeryPreset =
  derivePreset(
    cafePreset,
    {
      id:
        "bakery",

      label:
        "Bakery & Panadería",

      visual: {
        navbar:
          "minimal",

        hero:
          "editorial",

        menu:
          "compact",

        productCard:
          "clean",

        contact:
          "split",

        cta:
          "editorial",

        footer:
          "minimal",
      },

      capabilities: {
        coffeeCustomizer:
          false,

        brunch:
          true,

        takeaway:
          true,
      },
    }
  );

export const icecreamPreset =
  derivePreset(
    cafePreset,
    {
      id:
        "icecream",

      label:
        "Heladería Artesanal",

      visual: {
        navbar:
          "minimal",

        hero:
          "editorial",

        menu:
          "compact",

        productCard:
          "clean",

        contact:
          "minimal",

        cta:
          "editorial",

        footer:
          "minimal",
      },

      capabilities: {
        coffeeCustomizer:
          false,

        iceCreamSizes:
          true,

        toppings:
          true,

        brunch:
          false,

        takeaway:
          true,
      },
    }
  );

export const bodegonPreset =
  derivePreset(
    restaurantPreset,
    {
      id:
        "bodegon",

      label:
        "Bodegón Tradicional",

      visual: {
        navbar:
          "editorial",

        hero:
          "editorial",

        menu:
          "catalog",

        productCard:
          "photo",

        contact:
          "split",

        cta:
          "immersive",

        footer:
          "editorial",
      },

      capabilities: {
        reservation:
          true,

        waiterCall:
          true,

        tableOrders:
          true,

        takeaway:
          true,
      },
    }
  );

export const cateringPreset =
  derivePreset(
    restaurantPreset,
    {
      id:
        "catering",

      label:
        "Catering & Eventos",

      visual: {
        navbar:
          "minimal",

        hero:
          "cinematic",

        menu:
          "catalog",

        productCard:
          "clean",

        contact:
          "split",

        cta:
          "immersive",

        footer:
          "compact",
      },

      capabilities: {
        reservation:
          true,

        waiterCall:
          false,

        tableOrders:
          false,

        delivery:
          true,

        pickup:
          true,

        takeaway:
          true,
      },

      operation: {
        primary:
          "delivery",

        supported: [
          "delivery",
          "pickup",
          "counter",
        ],
      },
    }
  );

/* =========================================================
   PRESET REGISTRY
   ========================================================= */

export const presets:
  Record<
    GastroNiche,
    GastroPreset
  > = {
  restaurant:
    restaurantPreset,

  cafe:
    cafePreset,

  brewery:
    breweryPreset,

  bakery:
    bakeryPreset,

  icecream:
    icecreamPreset,

  bodegon:
    bodegonPreset,

  catering:
    cateringPreset,
};

/* =========================================================
   DEFAULT PRESET
   ========================================================= */

export const defaultPreset:
  GastroPreset =
  presets[DEFAULT_NICHE];

/* =========================================================
   HELPERS
   ========================================================= */

export function isGastroNiche(
  value:
    | string
    | null
    | undefined
): value is GastroNiche {
  return Boolean(
    value &&
      value in presets
  );
}

export function getPreset(
  id:
    GastroNiche
): GastroPreset {
  return (
    presets[id] ??
    defaultPreset
  );
}