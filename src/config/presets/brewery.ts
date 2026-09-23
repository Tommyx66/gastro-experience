import type { MenuCategory, MenuProduct } from "@/data/menu";
import type { GastroPreset } from "./types";

const breweryCategories: MenuCategory[] = [
  {
    id: "taproom",
    name: "Canillas Rotativas",
    description:
      "IPAs, APAs y especialidades de estación servidas frescas desde nuestras canillas.",
  },
  {
    id: "smash",
    name: "Smash Burgers",
    description:
      "Burgers dobles y triples con medallones jugosos, queso derretido y pan brioche tostado.",
  },
  {
    id: "tapeo",
    name: "Tapeo & Combos",
    description:
      "Para compartir con pinta: papas, fried chicken y tablas calientes.",
  },
];

const breweryProducts: MenuProduct[] = [
  {
    id: "tap-ipa-west",
    categoryId: "taproom",
    name: "West Coast IPA",
    description: "Canilla rotativa · IBU 62 · ABV 6.7% · Final seco, cítrico y resinoso.",
    price: 7800,
    image:
      "https://images.unsplash.com/photo-1518085250887-2f903c200fee?auto=format&fit=crop&w=1600&q=85",
    tags: ["IPA", "Canilla"],
    prepTime: "2 min",
    optionGroups: [
      {
        id: "west-ipa-size",
        name: "Formato",
        type: "single",
        required: true,
        items: [
          { id: "west-ipa-pinta", name: "Pinta 473 ml", priceDelta: 0 },
          { id: "west-ipa-media", name: "Media pinta 350 ml", priceDelta: -1200 },
        ],
      },
    ],
  },
  {
    id: "tap-apa-citra",
    categoryId: "taproom",
    name: "APA Citra Mosaic",
    description: "Canilla rotativa · IBU 42 · ABV 5.5% · Perfil tropical, balanceado y refrescante.",
    price: 7400,
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1600&q=85",
    tags: ["APA"],
    prepTime: "2 min",
  },
  {
    id: "tap-stout-nitro",
    categoryId: "taproom",
    name: "Dry Stout Nitro",
    description: "Canilla rotativa · IBU 35 · ABV 5.2% · Avena, café y espuma cremosa en nitro.",
    price: 7600,
    image:
      "https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&w=1600&q=85",
    tags: ["Stout"],
    prepTime: "2 min",
  },
  {
    id: "tap-honey-ale",
    categoryId: "taproom",
    name: "Honey Ale",
    description: "Canilla rotativa · IBU 18 · ABV 5.0% · Maltosa, suave y con miel de trébol local.",
    price: 7100,
    image:
      "https://images.unsplash.com/photo-1571767454098-246b94fbcf70?auto=format&fit=crop&w=1600&q=85",
    tags: ["Honey"],
    prepTime: "2 min",
  },
  {
    id: "smash-doble-clasica",
    categoryId: "smash",
    name: "Smash Doble Signature",
    description: "Dos medallones smash, doble cheddar, pepinillos, cebolla y salsa house.",
    price: 14600,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=85",
    tags: ["Smash", "Best Seller"],
    prepTime: "13 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "smash-doble-medallon",
        name: "Blend del medallón",
        type: "single",
        required: true,
        items: [
          { id: "smash-blend-classic", name: "80/20 clásico", priceDelta: 0 },
          { id: "smash-blend-aged", name: "Madurado 21 días", priceDelta: 1800 },
        ],
      },
      {
        id: "smash-doble-salsa",
        name: "Salsas",
        type: "multiple",
        items: [
          { id: "salsa-house", name: "House ahumada", priceDelta: 0 },
          { id: "salsa-bbq-bourbon", name: "BBQ bourbon", priceDelta: 600 },
          { id: "salsa-trufa", name: "Alioli de trufa", priceDelta: 900 },
        ],
      },
    ],
  },
  {
    id: "smash-triple-bacon",
    categoryId: "smash",
    name: "Smash Triple Bacon Jam",
    description: "Tres medallones smash, queso americano, bacon jam, cebolla crispy y pepinillos.",
    price: 17200,
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1600&q=85",
    tags: ["Triple", "Power"],
    prepTime: "15 min",
    optionGroups: [
      {
        id: "smash-triple-pan",
        name: "Tipo de pan",
        type: "single",
        required: true,
        items: [
          { id: "pan-brioche", name: "Brioche", priceDelta: 0 },
          { id: "pan-potato", name: "Potato roll", priceDelta: 500 },
        ],
      },
      {
        id: "smash-triple-extra",
        name: "Extras",
        type: "multiple",
        items: [
          { id: "extra-cheddar", name: "Cheddar extra", priceDelta: 900 },
          { id: "extra-bacon", name: "Bacon extra", priceDelta: 1200 },
        ],
      },
    ],
  },
  {
    id: "combo-tapeo-hop",
    categoryId: "tapeo",
    name: "Combo Hop & Smash",
    description: "Una Smash Doble Signature + papas crispy + pinta a elección.",
    price: 21800,
    image:
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1600&q=85",
    tags: ["Combo"],
    prepTime: "16 min",
  },
  {
    id: "tabla-tapeo-industrial",
    categoryId: "tapeo",
    name: "Tabla Industrial",
    description: "Fried chicken bites, papas especiadas, dip de cheddar y pickles caseros.",
    price: 18800,
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=85",
    tags: ["Para compartir"],
    prepTime: "14 min",
  },
];

export const breweryPreset: GastroPreset = {
  id: "brewery",
  label: "Cervecería Artesanal & Smash",
  theme: {
    mode: "dark",
    accent: "#D29A2F",
    accentStrong: "#F0BD56",
    accentContrast: "#120F0C",
    colors: {
      dark: {
        bg: "#0C0D10",
        bgElevated: "#12141A",
        surface: "#151A22",
        surfaceElevated: "#1C2530",
        surfaceInverse: "#F2EEE6",
        text: "#F5EFE3",
        textMuted: "#C6B9A7",
        textSubtle: "#8F877A",
        accent: "#D29A2F",
        accentStrong: "#F0BD56",
        accentContrast: "#120F0C",
        accentSoft: "rgba(210,154,47,0.15)",
        accentFaint: "rgba(210,154,47,0.08)",
        accentBorder: "rgba(210,154,47,0.38)",
        border: "rgba(245,239,227,0.11)",
        borderStrong: "rgba(245,239,227,0.2)",
        overlay: "rgba(12,13,16,0.86)",
        control: "rgba(245,239,227,0.06)",
        controlHover: "rgba(245,239,227,0.1)",
        success: "#34D399",
        warning: "#F59E0B",
        danger: "#F87171",
      },
    },
  },
  visual: {
    navbar: "editorial",
    hero: "cinematic",
    menu: "catalog",
    productCard: "photo",
    contact: "map",
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
    reservation: false,
    story: true,
    coffeeCustomizer: false,
    beerTaps: true,
    iceCreamSizes: false,
    toppings: false,
    brunch: false,
    takeaway: true,
  },
  siteOverrides: {
    brand: {
      name: "HOP & SMASH",
      shortName: "Hop",
      descriptor: "Taproom Industrial",
      tagline: "Canillas vivas, plancha caliente y espíritu de barrio",
      description:
        "Cervecería artesanal con rotación semanal de canillas, smash burgers de autor y tapeo para compartir.",
      logo:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=120&q=80",
    },
    features: {
      delivery: false,
      pickup: true,
      tableOrders: true,
      waiterCall: true,
      reservation: false,
    },
    operation: {
      schedule: "Martes a Domingo · 18:00 a 01:00 hs",
      estimatedTime: {
        pickup: { min: 15, max: 25 },
        table: { min: 12, max: 22 },
        delivery: { min: 0, max: 0 },
      },
    },
    navigation: {
      links: [
        { label: "Taproom", href: "inicio" },
        { label: "Canillas", href: "historia" },
        { label: "Carta", href: "menu" },
        { label: "Reservas", href: "contacto" },
      ],
      cta: "Ver Canillas",
    },
    ordering: {
      fulfillment: ["pickup", "onsite"],
      whatsapp: {
        defaultMessage: "Hola, quiero pedir take away de Hop & Smash.",
        tableOrderMessage: "Hola, envío pedido desde mesa de Hop & Smash.",
      },
    },
    content: {
      hero: {
        eyebrow: "Taproom · Plaza Mitre",
        titlePrefix: "Pinta",
        titleAccent: "perfecta.",
        subtitle:
          "Canillas artesanales en rotación, smash burgers doradas a la plancha y tapeo para compartir entre amigos.",
        cta: "Explorar carta",
      },
      contact: {
        title: "Take away y salón",
        subtitle:
          "Reservá mesa o pedí retiro en barra. Nuestro equipo te prepara la comanda al momento.",
      },
      tableUi: {
        serviceLabel: "Taproom en mesa",
      },
    },
  },
  menu: {
    categories: breweryCategories,
    products: breweryProducts,
  },
};
