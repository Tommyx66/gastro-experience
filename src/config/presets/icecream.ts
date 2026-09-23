import type { MenuCategory, MenuProduct } from "@/data/menu";
import type { GastroPreset } from "./types";

const icecreamCategories: MenuCategory[] = [
  {
    id: "potes",
    name: "Potes Térmicos",
    description:
      "Helado artesanal por peso con selección obligatoria de sabores.",
  },
  {
    id: "cucuruchos",
    name: "Cucuruchos",
    description: "Cucuruchos artesanales, simples y dobles con baño opcional.",
  },
  {
    id: "postres",
    name: "Postres Helados",
    description: "Semifríos, affogatos y especialidades para compartir.",
  },
  {
    id: "toppings",
    name: "Toppings",
    description: "Salsas y crunch para terminar tu helado a medida.",
  },
];

const saborItems = [
  { id: "sabor-pistacho", name: "Pistacho Siciliano", priceDelta: 0 },
  { id: "sabor-dulce", name: "Dulce de leche granizado", priceDelta: 0 },
  { id: "sabor-choco70", name: "Chocolate 70%", priceDelta: 0 },
  { id: "sabor-frutilla", name: "Frutilla a la crema", priceDelta: 0 },
  { id: "sabor-limon", name: "Limón albahaca", priceDelta: 0 },
  { id: "sabor-sambayon", name: "Sambayón italiano", priceDelta: 0 },
];

const icecreamProducts: MenuProduct[] = [
  {
    id: "pote-1kg",
    categoryId: "potes",
    name: "Pote térmico 1 kg",
    description: "Hasta 4 sabores. Ideal para compartir.",
    price: 28600,
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1600&q=85",
    tags: ["Familiar"],
    prepTime: "6 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "pote-1kg-sabores",
        name: "Sabores (elegí hasta 4)",
        type: "multiple",
        required: true,
        items: saborItems,
      },
    ],
  },
  {
    id: "pote-500g",
    categoryId: "potes",
    name: "Pote térmico 1/2 kg",
    description: "Hasta 3 sabores.",
    price: 16100,
    image:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1600&q=85",
    tags: ["Clásico"],
    prepTime: "5 min",
    optionGroups: [
      {
        id: "pote-500g-sabores",
        name: "Sabores (elegí hasta 3)",
        type: "multiple",
        required: true,
        items: saborItems,
      },
    ],
  },
  {
    id: "pote-250g",
    categoryId: "potes",
    name: "Pote térmico 1/4 kg",
    description: "Hasta 2 sabores.",
    price: 9300,
    image:
      "https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=1600&q=85",
    tags: ["Rápido"],
    prepTime: "4 min",
    optionGroups: [
      {
        id: "pote-250g-sabores",
        name: "Sabores (elegí hasta 2)",
        type: "multiple",
        required: true,
        items: saborItems,
      },
    ],
  },
  {
    id: "cucurucho-doble",
    categoryId: "cucuruchos",
    name: "Cucurucho artesanal doble",
    description: "Dos bochas, cucurucho crocante y baño opcional.",
    price: 8200,
    image:
      "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=1600&q=85",
    tags: ["Crocante"],
    prepTime: "3 min",
    optionGroups: [
      {
        id: "cucurucho-doble-sabores",
        name: "Sabores",
        type: "multiple",
        required: true,
        items: saborItems,
      },
      {
        id: "cucurucho-doble-bano",
        name: "Baño",
        type: "single",
        items: [
          { id: "bano-none", name: "Sin baño", priceDelta: 0 },
          { id: "bano-choco", name: "Chocolate", priceDelta: 700 },
          { id: "bano-dulce", name: "Dulce de leche", priceDelta: 700 },
        ],
      },
    ],
  },
  {
    id: "affogato",
    categoryId: "postres",
    name: "Affogato italiano",
    description: "Helado de crema americana con shot de espresso y nibs de cacao.",
    price: 9600,
    image:
      "https://images.unsplash.com/photo-1523294587484-bae6cc870010?auto=format&fit=crop&w=1600&q=85",
    tags: ["Especial"],
    prepTime: "6 min",
  },
  {
    id: "semifrio-pistacho",
    categoryId: "postres",
    name: "Semifrío de pistacho",
    description: "Base crocante, mousse de pistacho y corazón de frutos rojos.",
    price: 11900,
    image:
      "https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&w=1600&q=85",
    tags: ["Postre"],
    prepTime: "7 min",
  },
  {
    id: "topping-pack",
    categoryId: "toppings",
    name: "Pack toppings crunchy",
    description: "Garrapiñada, chips de chocolate y salsa de caramelo salado.",
    price: 3400,
    image:
      "https://images.unsplash.com/photo-1579954115563-e72bf1381629?auto=format&fit=crop&w=1600&q=85",
    tags: ["Extra"],
    prepTime: "2 min",
    optionGroups: [
      {
        id: "topping-pack-choice",
        name: "Elegí 2 toppings",
        type: "multiple",
        required: true,
        items: [
          { id: "top-chips", name: "Chips de chocolate", priceDelta: 0 },
          { id: "top-crocante", name: "Crocante de almendras", priceDelta: 0 },
          { id: "top-oreo", name: "Galleta cacao", priceDelta: 0 },
          { id: "top-coulis", name: "Coulis de frutos rojos", priceDelta: 0 },
        ],
      },
    ],
  },
];

export const icecreamPreset: GastroPreset = {
  id: "icecream",
  label: "Heladería Artesanal & Gelato",
  theme: {
    mode: "light",
    accent: "#8E5B3A",
    accentStrong: "#6A3F28",
    accentContrast: "#FFF9F1",
    colors: {
      light: {
        bg: "#F8F3EA",
        bgElevated: "#FEFCF8",
        surface: "#FFFDF8",
        surfaceElevated: "#EFE3D5",
        surfaceInverse: "#2A201A",
        text: "#2A201A",
        textMuted: "#6C5A4D",
        textSubtle: "#8B786A",
        accent: "#8E5B3A",
        accentStrong: "#6A3F28",
        accentContrast: "#FFF9F1",
        accentSoft: "rgba(142,91,58,0.12)",
        accentFaint: "rgba(142,91,58,0.06)",
        accentBorder: "rgba(142,91,58,0.3)",
        border: "rgba(42,32,26,0.11)",
        borderStrong: "rgba(42,32,26,0.22)",
        overlay: "rgba(248,243,234,0.9)",
        control: "rgba(42,32,26,0.05)",
        controlHover: "rgba(42,32,26,0.1)",
        success: "#059669",
        warning: "#B45309",
        danger: "#DC2626",
      },
    },
  },
  visual: {
    navbar: "minimal",
    hero: "editorial",
    menu: "compact",
    productCard: "clean",
    contact: "minimal",
    cta: "editorial",
    footer: "minimal",
  },
  operation: {
    primary: "counter",
    supported: ["counter", "pickup", "delivery"],
  },
  capabilities: {
    ordering: true,
    delivery: true,
    pickup: true,
    tableOrders: false,
    waiterCall: false,
    reservation: false,
    story: true,
    coffeeCustomizer: false,
    beerTaps: false,
    iceCreamSizes: true,
    toppings: true,
    brunch: false,
    takeaway: true,
  },
  siteOverrides: {
    brand: {
      name: "Gelateria Nube",
      shortName: "Nube",
      descriptor: "Gelato Italiano",
      tagline: "Recetas artesanales, crema fresca y frutas de estación",
      description:
        "Heladería artesanal de perfil italiano con potes térmicos, cucuruchos y postres helados.",
      logo:
        "https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=120&q=80",
    },
    features: {
      delivery: true,
      pickup: true,
      tableOrders: false,
      waiterCall: false,
      reservation: false,
    },
    operation: {
      schedule: "Lunes a Domingo · 11:00 a 00:30 hs",
      estimatedTime: {
        pickup: { min: 8, max: 18 },
        delivery: { min: 25, max: 40 },
        table: { min: 0, max: 0 },
      },
    },
    navigation: {
      links: [
        { label: "Inicio", href: "inicio" },
        { label: "Sabores", href: "historia" },
        { label: "Carta", href: "menu" },
        { label: "Pedidos", href: "contacto" },
      ],
      cta: "Pedir gelato",
    },
    ordering: {
      fulfillment: ["pickup", "delivery"],
      whatsapp: {
        defaultMessage: "Hola, quiero pedir helado para retirar.",
      },
    },
    content: {
      hero: {
        eyebrow: "Heladería artesanal · Costa",
        titlePrefix: "Gelato",
        titleAccent: "fresco.",
        subtitle:
          "Potes térmicos, cucuruchos artesanales y postres helados con selección de sabores al momento.",
        cta: "Ver sabores",
      },
      contact: {
        title: "Pick-up & Delivery",
        subtitle:
          "Hacé tu pedido y retiralo en mostrador o recibilo en casa en contenedores térmicos.",
      },
    },
  },
  menu: {
    categories: icecreamCategories,
    products: icecreamProducts,
  },
};
