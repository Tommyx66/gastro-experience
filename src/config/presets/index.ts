import { bakeryPreset } from "./bakery";
import { bodegonPreset } from "./bodegon";
import { breweryPreset } from "./brewery";
import { cafePreset } from "./cafe";
import { cateringPreset } from "./catering";
import { icecreamPreset } from "./icecream";
import { restaurantPreset } from "./restaurant";
import type { GastroNiche, GastroPreset } from "./types";

export const DEFAULT_NICHE: GastroNiche = "restaurant";

export const presets: Record<GastroNiche, GastroPreset> = {
  restaurant: restaurantPreset,
  cafe: cafePreset,
  brewery: breweryPreset,
  bakery: bakeryPreset,
  icecream: icecreamPreset,
  bodegon: bodegonPreset,
  catering: cateringPreset,
};

export const defaultPreset: GastroPreset = presets[DEFAULT_NICHE];

export function isGastroNiche(value: string | null | undefined): value is GastroNiche {
  return Boolean(value && Object.prototype.hasOwnProperty.call(presets, value));
}

export function getPreset(id: GastroNiche): GastroPreset {
  return presets[id] ?? defaultPreset;
}
