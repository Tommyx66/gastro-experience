import type { MenuCategory, MenuProduct } from "@/data/menu";
import type { GastroPreset } from "./types";

const bakeryCategories: MenuCategory[] = [
  {
    id: "hogazas",
    name: "Hogazas de Masa Madre",
    description: "Fermentación lenta, corteza crocante y miga húmeda.",
  },
  {
    id: "viennoiserie",
    name: "Viennoiserie",
    description: "Laminados de manteca y piezas dulces de obrador.",
  },
  {
    id: "desayunos",
    name: "Boxes de Desayuno",
    description: "Combos para llevar con panificados, pastelería y bebidas.",
  },
  {
    id: "cafe",
    name: "Café al Paso",
    description: "Café de especialidad para acompañar la panadería del día.",
  },
];

const bakeryProducts: MenuProduct[] = [
  {
    id: "hogaza-campo",
    categoryId: "hogazas",
    name: "Hogaza de Campo",
    description: "Masa madre blanca, fermentación de 24 h y corteza caramelizada.",
    price: 9800,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=85",
    tags: ["Masa madre"],
    prepTime: "4 min",
  },
  {
    id: "hogaza-centeno",
    categoryId: "hogazas",
    name: "Hogaza de Centeno",
    description: "Centeno integral, notas tostadas y miga elástica.",
    price: 10500,
    image:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc7e?auto=format&fit=crop&w=1600&q=85",
    tags: ["Integral"],
    prepTime: "4 min",
  },
  {
    id: "hogaza-semillas",
    categoryId: "hogazas",
    name: "Hogaza de Semillas",
    description: "Blend de lino, girasol y sésamo en masa madre natural.",
    price: 11200,
    image:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1600&q=85",
    tags: ["Multisemilla"],
    prepTime: "4 min",
  },
  {
    id: "medialunas-manteca",
    categoryId: "viennoiserie",
    name: "Medialunas de Manteca (docena)",
    description: "Laminado clásico, almíbar suave y horneado del día.",
    price: 12400,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1600&q=85",
    tags: ["Clásico"],
    prepTime: "5 min",
    isFeatured: true,
  },
  {
    id: "pain-chocolat",
    categoryId: "viennoiserie",
    name: "Pain au Chocolat",
    description: "Láminas de manteca europea y chocolate 60% cacao.",
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1600&q=85",
    tags: ["Francés"],
    prepTime: "3 min",
  },
  {
    id: "box-desayuno-clasico",
    categoryId: "desayunos",
    name: "Box Desayuno Clásico",
    description: "2 medialunas, mini hogaza, mermelada, manteca y café filtrado.",
    price: 16800,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=85",
    tags: ["Take Away"],
    prepTime: "8 min",
    optionGroups: [
      {
        id: "box-cafe",
        name: "Café",
        type: "single",
        required: true,
        items: [
          { id: "cafe-espresso", name: "Espresso", priceDelta: 0 },
          { id: "cafe-latte", name: "Latte", priceDelta: 700 },
          { id: "cafe-filtrado", name: "Filtrado V60", priceDelta: 900 },
        ],
      },
    ],
  },
  {
    id: "box-brunch",
    categoryId: "desayunos",
    name: "Box Brunch Obrador",
    description: "Croissant, focaccia rellena, cookie gigante y jugo natural.",
    price: 21400,
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1600&q=85",
    tags: ["Compartir"],
    prepTime: "10 min",
  },
  {
    id: "cafe-al-paso",
    categoryId: "cafe",
    name: "Café al Paso",
    description: "Shot de espresso doble con leche texturizada a elección.",
    price: 4700,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=85",
    tags: ["Rápido"],
    prepTime: "3 min",
    optionGroups: [
      {
        id: "cafe-paso-leche",
        name: "Leche",
        type: "single",
        required: true,
        items: [
          { id: "leche-entera", name: "Entera", priceDelta: 0 },
          { id: "leche-avena", name: "Avena", priceDelta: 700 },
        ],
      },
    ],
  },
];

export const bakeryPreset: GastroPreset = {
  id: "bakery",
  label: "Panadería Masa Madre & Pastelería",
  theme: {
    mode: "light",
    accent: "#A57242",
    accentStrong: "#7A4F2B",
    accentContrast: "#FFF8EE",
    colors: {
      light: {
        bg: "#F4EFE8",
        bgElevated: "#FBF8F3",
        surface: "#FFFDFA",
        surfaceElevated: "#ECE2D6",
        surfaceInverse: "#2A211B",
        text: "#2A211B",
        textMuted: "#665548",
        textSubtle: "#847468",
        accent: "#A57242",
        accentStrong: "#7A4F2B",
        accentContrast: "#FFF8EE",
        accentSoft: "rgba(165,114,66,0.12)",
        accentFaint: "rgba(165,114,66,0.06)",
        accentBorder: "rgba(165,114,66,0.32)",
        border: "rgba(42,33,27,0.12)",
        borderStrong: "rgba(42,33,27,0.24)",
        overlay: "rgba(244,239,232,0.9)",
        control: "rgba(42,33,27,0.05)",
        controlHover: "rgba(42,33,27,0.09)",
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
    contact: "split",
    cta: "editorial",
    footer: "minimal",
  },
  operation: {
    primary: "counter",
    supported: ["counter", "pickup"],
  },
  capabilities: {
    ordering: true,
    delivery: false,
    pickup: true,
    tableOrders: false,
    waiterCall: false,
    reservation: false,
    story: true,
    coffeeCustomizer: true,
    beerTaps: false,
    iceCreamSizes: false,
    toppings: false,
    brunch: true,
    takeaway: true,
  },
  siteOverrides: {
    brand: {
      name: "Miga Madre",
      shortName: "Miga",
      descriptor: "Panadería de Autor",
      tagline: "Masa madre viva, laminados y café de especialidad",
      description:
        "Panadería artesanal con producción diaria de hogazas, viennoiserie y cajas de desayuno para llevar.",
      logo:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=120&q=80",
    },
    features: {
      delivery: false,
      pickup: true,
      tableOrders: false,
      waiterCall: false,
      reservation: false,
    },
    operation: {
      schedule: "Lunes a Sábado · 07:00 a 13:00 y 16:30 a 20:00 hs",
      estimatedTime: {
        pickup: { min: 8, max: 18 },
        delivery: { min: 0, max: 0 },
        table: { min: 0, max: 0 },
      },
    },
    navigation: {
      links: [
        { label: "Inicio", href: "inicio" },
        { label: "Obrador", href: "historia" },
        { label: "Carta", href: "menu" },
        { label: "Retiro", href: "contacto" },
      ],
      cta: "Encargar",
    },
    ordering: {
      fulfillment: ["pickup"],
      whatsapp: {
        defaultMessage: "Hola, quiero reservar panadería para retirar.",
      },
    },
    content: {
      hero: {
        eyebrow: "Horno de Barrio · Producción diaria",
        titlePrefix: "Masa",
        titleAccent: "madre.",
        subtitle:
          "Hogazas, viennoiserie y boxes de desayuno con ingredientes nobles y fermentaciones largas.",
        cta: "Ver mostrador",
      },
      contact: {
        title: "Mostrador & Take Away",
        subtitle:
          "Realizá tu pedido y pasá por mostrador en la franja horaria que prefieras.",
      },
    },
  },
  menu: {
    categories: bakeryCategories,
    products: bakeryProducts,
  },
};
