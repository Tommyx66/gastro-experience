import {
  themeProfiles,
} from "@/config/site";

import {
  menuCategories,
  menuProducts,
} from "@/data/menus/restaurant";

import type {
  GastroPreset,
} from "./types";

export const restaurantPreset:
  GastroPreset = {
  /* =========================================================
     IDENTITY
     ========================================================= */

  id:
    "restaurant",

  label:
    "Restaurante & Fuegos",

  /* =========================================================
     THEME
     ========================================================= */

  theme: {
    mode:
      "dark",

    colors: {
      light:
        themeProfiles.light,

      dark:
        themeProfiles.dark,
    },
  },

  /* =========================================================
     VISUAL
     ========================================================= */

  visual: {
    navbar:
      "pill",

    hero:
      "cinematic",

    menu:
      "immersive",

    productCard:
      "photo",

    contact:
      "map",

    cta:
      "immersive",

    footer:
      "editorial",
  },

  /* =========================================================
     OPERATION
     ========================================================= */

  operation: {
    primary:
      "table",

    supported: [
      "table",
      "counter",
      "pickup",
      "delivery",
    ],
  },

  /* =========================================================
     CAPABILITIES
     ========================================================= */

  capabilities: {
    ordering:
      true,

    delivery:
      true,

    pickup:
      true,

    tableOrders:
      true,

    waiterCall:
      true,

    reservation:
      true,

    story:
      true,

    coffeeCustomizer:
      false,

    beerTaps:
      false,

    iceCreamSizes:
      false,

    toppings:
      false,

    brunch:
      false,

    takeaway:
      true,
  },

  /* =========================================================
     SITE OVERRIDES
     ========================================================= */

  siteOverrides:
    {},

  /* =========================================================
     MENU
     ========================================================= */

  menu: {
    categories:
      menuCategories,

    products:
      menuProducts,
  },
};