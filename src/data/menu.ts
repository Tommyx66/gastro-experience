/* =========================================================
   MENU CORE TYPES
   ========================================================= */

export type MenuOptionType =
  | "single"
  | "multiple";

export interface MenuOptionItem {
  id: string;
  name: string;
  priceDelta: number;
}

export interface MenuOptionGroup {
  id: string;
  name: string;
  type: MenuOptionType;
  required?: boolean;
  maxSelectable?: number; // Límite de sabores o adicionales
  minSelectable?: number;
  items: MenuOptionItem[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
}

export interface MenuProduct {
  id: string;
  categoryId: string;

  name: string;
  description: string;

  price: number;

  image: string;

  tags?: string[];

  optionGroups?: MenuOptionGroup[];

  isFeatured?: boolean;

  prepTime?: string;
}

export interface MenuData {
  categories: MenuCategory[];
  products: MenuProduct[];
}