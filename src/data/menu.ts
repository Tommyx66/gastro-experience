export interface MenuOption {
  id: string;
  name: string;
  priceDelta?: number;
}

export interface MenuProduct {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  tags?: string[];
  options?: MenuOption[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
}

export const menuCategories: MenuCategory[] = [
  {
    id: "featured",
    name: "Destacados",
  },
  {
    id: "burgers",
    name: "Hamburguesas",
  },
  {
    id: "drinks",
    name: "Bebidas",
  },
  {
    id: "desserts",
    name: "Postres",
  },
];

export const menuProducts: MenuProduct[] = [
  {
    id: "burger-classic",
    categoryId: "burgers",
    name: "Smash Clásica",
    description:
      "Doble medallón, cheddar, cebolla y salsa de la casa.",
    price: 12500,
    image: "/menu/burger.jpg",
    tags: ["Más pedida"],
  },
  {
    id: "ipa",
    categoryId: "drinks",
    name: "IPA 500 ml",
    description:
      "Cerveza artesanal de perfil cítrico y amargor marcado.",
    price: 4500,
    image: "/menu/ipa.jpg",
    tags: ["IPA"],
  },
  {
    id: "dessert",
    categoryId: "desserts",
    name: "Cheesecake",
    description:
      "Cheesecake de vainilla con frutos rojos.",
    price: 5500,
    image: "/menu/cheesecake.jpg",
  },
];