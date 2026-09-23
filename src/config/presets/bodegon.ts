import type { MenuCategory, MenuProduct } from "@/data/menu";
import type { GastroPreset } from "./types";

const bodegonCategories: MenuCategory[] = [
  {
    id: "milanesas",
    name: "Milanesas Gigantes",
    description: "Para compartir, bien porteñas y con guarnición a elección.",
  },
  {
    id: "pastas",
    name: "Pastas al Fierrito",
    description: "Pastas caseras con salsas de larga cocción y queso rallado al momento.",
  },
  {
    id: "cantina",
    name: "Cantina & Vermut",
    description: "Tortillas babé, tapeos y vermut de sifón.",
  },
];

const guarniciones = [
  { id: "guarnicion-papas", name: "Papas fritas doble cocción", priceDelta: 0 },
  { id: "guarnicion-pure", name: "Puré rústico de papas", priceDelta: 0 },
  { id: "guarnicion-ensalada", name: "Ensalada criolla", priceDelta: 0 },
];

const bodegonProducts: MenuProduct[] = [
  {
    id: "mila-napo",
    categoryId: "milanesas",
    name: "Milanesa Gigante Napolitana",
    description: "Ternera premium, salsa de tomate casera, jamón cocido y mozzarella gratinada.",
    price: 25800,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1600&q=85",
    tags: ["Para compartir"],
    prepTime: "22 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "mila-napo-guarnicion",
        name: "Guarnición",
        type: "single",
        required: true,
        items: guarniciones,
      },
    ],
  },
  {
    id: "mila-fugazzeta",
    categoryId: "milanesas",
    name: "Milanesa Gigante Fugazzeta",
    description: "Ternera empanada, cebolla confitada, mozzarella y toque de orégano.",
    price: 26400,
    image:
      "https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&w=1600&q=85",
    tags: ["Especial"],
    prepTime: "22 min",
    optionGroups: [
      {
        id: "mila-fuga-guarnicion",
        name: "Guarnición",
        type: "single",
        required: true,
        items: guarniciones,
      },
      {
        id: "mila-fuga-extras",
        name: "Extras",
        type: "multiple",
        items: [
          { id: "mila-fuga-extra-provo", name: "Provoleta", priceDelta: 1800 },
          { id: "mila-fuga-extra-huevo", name: "Huevo frito", priceDelta: 900 },
        ],
      },
    ],
  },
  {
    id: "fideos-fierrito",
    categoryId: "pastas",
    name: "Fideos Caseros al Fierrito",
    description: "Masa fresca estirada al momento, manteca de salvia y parmesano.",
    price: 16900,
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1600&q=85",
    tags: ["Casero"],
    prepTime: "16 min",
    optionGroups: [
      {
        id: "fierrito-salsa",
        name: "Salsa",
        type: "single",
        required: true,
        items: [
          { id: "salsa-fileto", name: "Fileto de la casa", priceDelta: 0 },
          { id: "salsa-bolognesa", name: "Bolognesa lenta", priceDelta: 1600 },
          { id: "salsa-estofado", name: "Estofado de osobuco", priceDelta: 2200 },
        ],
      },
    ],
  },
  {
    id: "sorrentinos-jyq",
    categoryId: "pastas",
    name: "Sorrentinos de Jamón y Queso",
    description: "Pasta rellena artesanal servida con pomodoro especiado.",
    price: 17600,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1600&q=85",
    tags: ["Relleno"],
    prepTime: "17 min",
  },
  {
    id: "tortilla-babe",
    categoryId: "cantina",
    name: "Tortilla Babé",
    description: "Tortilla jugosa de papa y cebolla, centro cremoso y perejil fresco.",
    price: 13200,
    image:
      "https://images.unsplash.com/photo-1604908554027-1d3a6c0d6f5a?auto=format&fit=crop&w=1600&q=85",
    tags: ["Cantina"],
    prepTime: "14 min",
  },
  {
    id: "vermut-sifon",
    categoryId: "cantina",
    name: "Vermut de Sifón",
    description: "Vermut rojo, soda de sifón, rodaja cítrica y aceitunas.",
    price: 6900,
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1600&q=85",
    tags: ["Aperitivo"],
    prepTime: "4 min",
    optionGroups: [
      {
        id: "vermut-estilo",
        name: "Estilo",
        type: "single",
        required: true,
        items: [
          { id: "vermut-clasico", name: "Clásico", priceDelta: 0 },
          { id: "vermut-bianco", name: "Bianco", priceDelta: 0 },
          { id: "vermut-rosato", name: "Rosato", priceDelta: 400 },
        ],
      },
    ],
  },
];

export const bodegonPreset: GastroPreset = {
  id: "bodegon",
  label: "Bodegón Tradicional & Cantina",
  theme: {
    mode: "hybrid",
    accent: "#C99A45",
    accentStrong: "#E4BE72",
    accentContrast: "#18130F",
    colors: {
      hybrid: {
        bg: "#14110F",
        bgElevated: "#1B1612",
        surface: "#221B16",
        surfaceElevated: "#2B221B",
        surfaceInverse: "#F6F0E8",
        text: "#F6F0E8",
        textMuted: "#CCBCA9",
        textSubtle: "#958676",
        accent: "#C99A45",
        accentStrong: "#E4BE72",
        accentContrast: "#18130F",
        accentSoft: "rgba(201,154,69,0.16)",
        accentFaint: "rgba(201,154,69,0.08)",
        accentBorder: "rgba(201,154,69,0.36)",
        border: "rgba(246,240,232,0.12)",
        borderStrong: "rgba(246,240,232,0.22)",
        overlay: "rgba(20,17,15,0.88)",
        control: "rgba(246,240,232,0.06)",
        controlHover: "rgba(246,240,232,0.1)",
        success: "#34D399",
        warning: "#F59E0B",
        danger: "#F87171",
      },
    },
  },
  visual: {
    navbar: "editorial",
    hero: "editorial",
    menu: "catalog",
    productCard: "photo",
    contact: "split",
    cta: "immersive",
    footer: "editorial",
  },
  operation: {
    primary: "table",
    supported: ["table", "pickup"],
  },
  capabilities: {
    ordering: true,
    delivery: false,
    pickup: true,
    tableOrders: true,
    waiterCall: true,
    reservation: true,
    story: true,
    coffeeCustomizer: false,
    beerTaps: false,
    iceCreamSizes: false,
    toppings: false,
    brunch: false,
    takeaway: true,
  },
  siteOverrides: {
    brand: {
      name: "El Bodegón del Parque",
      shortName: "Bodegón",
      descriptor: "Cantina Porteña",
      tagline: "Platos abundantes, recetas de familia y vermut de sifón",
      description:
        "Cocina porteña clásica con milanesas gigantes, pastas caseras y aperitivos de cantina.",
      logo:
        "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=120&q=80",
    },
    features: {
      delivery: false,
      pickup: true,
      tableOrders: true,
      waiterCall: true,
      reservation: true,
    },
    operation: {
      schedule: "Martes a Domingo · 12:00 a 16:00 y 20:00 a 00:30 hs",
      estimatedTime: {
        pickup: { min: 20, max: 30 },
        table: { min: 15, max: 28 },
        delivery: { min: 0, max: 0 },
      },
    },
    navigation: {
      links: [
        { label: "Inicio", href: "inicio" },
        { label: "Cantina", href: "historia" },
        { label: "Carta", href: "menu" },
        { label: "Reservas", href: "contacto" },
      ],
      cta: "Ver menú",
    },
    ordering: {
      fulfillment: ["onsite", "pickup"],
      whatsapp: {
        defaultMessage: "Hola, quiero hacer un pedido take away del bodegón.",
      },
    },
    content: {
      hero: {
        eyebrow: "Bodegón tradicional · Barrio Sur",
        titlePrefix: "Sabores",
        titleAccent: "de cantina.",
        subtitle:
          "Milanesas para compartir, pastas al fierrito y clásicos de bodegón servidos con espíritu de barrio.",
        cta: "Ver carta",
      },
      contact: {
        title: "Salón, reservas y take away",
        subtitle:
          "Atención en mesa para disfrutar en salón o retiro por mostrador sin esperas.",
      },
    },
  },
  menu: {
    categories: bodegonCategories,
    products: bodegonProducts,
  },
};
