import type { MenuCategory, MenuProduct } from "@/data/menu";

const GUARNICIONES_BODEGON = [
  { id: "fritas-caballo", name: "Papas fritas con dos huevos fritos encima", priceDelta: 0 },
  { id: "pure-mixto", name: "Puré mixto (papa y calabaza con manteca)", priceDelta: 0 },
  { id: "ensalada-rusa", name: "Ensalada rusa tradicional", priceDelta: 0 },
  { id: "mixta", name: "Ensalada mixta (lechuga, tomate, cebolla)", priceDelta: 0 },
];

export const bodegonCategories: MenuCategory[] = [
  {
    id: "cantina",
    name: "Entradas & Platitos de Cantina",
    description: "Tortillas babeantes hechas en sartén de hierro, empanadas y picadas de barrio.",
  },
  {
    id: "sugerencias",
    name: "Sugerencias del Chef & Olla",
    description: "Platos tradicionales cocinados a fuego lento en cacerola de fundición.",
  },
  {
    id: "milanesas",
    name: "Milanesas Gigantes para Dos",
    description: "Cortes de ternera bien golpeados, tiernos por dentro, gratinados y para compartir.",
  },
  {
    id: "pastas",
    name: "Pastas Amasadas al Mediodía",
    description: "Fideos y pastas rellenas al huevo servidas en fuentes humeantes con estofado.",
  },
  {
    id: "postres",
    name: "Postres de Bodegón",
    description: "Flanes de 12 yemas con agujeritos, caramelo amargo y postres de toda la vida.",
  },
];

export const bodegonProducts: MenuProduct[] = [
  // ENTRADAS
  {
    id: "tortilla-babe-bodegon",
    categoryId: "cantina",
    name: "Tortilla de Papas al Punto Babé",
    description: "Papas confitadas con cebolla en sartén de hierro, huevos de campo y centro bien jugoso y fluido.",
    price: 12600,
    image: "https://images.unsplash.com/photo-1604908554027-1d3a6c0d6f5a?auto=format&fit=crop&w=1200&q=85",
    tags: ["Babé", "Insignia"],
    prepTime: "15 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "tipo-tortilla",
        name: "Variedad",
        type: "single",
        required: true,
        items: [
          { id: "clasica-cebolla", name: "Clásica con cebolla confitada", priceDelta: 0 },
          { id: "chorizo-colorado", name: "Con chorizo colorado español", priceDelta: 2400 },
        ],
      },
    ],
  },
  {
    id: "provoleta-cantina",
    categoryId: "cantina",
    name: "Provoleta Dorada al Fierrito",
    description: "Provolone estacionado con costra crocante al hierro, tomates secos, orégano y chimichurri criollo.",
    price: 9800,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=85",
    tags: ["Al hierro"],
    prepTime: "12 min",
  },
  {
    id: "empanadas-fritas",
    categoryId: "cantina",
    name: "Empanadas Cortadas a Cuchillo (3u)",
    description: "Carne vacuna tiernizada cortada a mano, cebolla de verdeo, huevo duro y aceitunas, fritas en grasa limpia.",
    price: 7500,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85",
    tags: ["Fritas"],
    prepTime: "10 min",
  },

  // SUGERENCIAS
  {
    id: "pastel-de-papa-olla",
    categoryId: "sugerencias",
    name: "Pastel de Papa Gratinado de Olla",
    description: "Carne picada a cuchillo con cebolla, pimientos y huevo duro, cubierta con puré de papas a la manteca y queso gratinado.",
    price: 16800,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=85",
    tags: ["Sugerencia del mozo", "Plato de olla"],
    prepTime: "18 min",
    isFeatured: true,
  },
  {
    id: "bondiola-cerveza-bodegon",
    categoryId: "sugerencias",
    name: "Bondiola al Horno con Papas Rústicas",
    description: "Pieza braseada 5 horas con mostaza de grano, miel de campo y cerveza negra con cebollas caramelizadas.",
    price: 19400,
    image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=1200&q=85",
    tags: ["Cocción lenta"],
    prepTime: "20 min",
  },

  // MILANESAS
  {
    id: "milanesa-napolitana-compartir",
    categoryId: "milanesas",
    name: "Milanesa Napolitana Gigante (Para 2 personas)",
    description: "Nalga tierna empanada a mano, salsa pomodoro casera, jamón cocido y mozzarella gratinada en abundante capa.",
    price: 25400,
    image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&w=1200&q=85",
    tags: ["Para 2 personas", "Best Seller"],
    prepTime: "22 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "guarnicion-mila",
        name: "Guarnición obligatoria (incluida)",
        type: "single",
        required: true,
        items: GUARNICIONES_BODEGON,
      },
    ],
  },
  {
    id: "milanesa-fugazzeta",
    categoryId: "milanesas",
    name: "Milanesa Fugazzeta al Horno (Para 2 personas)",
    description: "Milanesa de ternera cubierta con abundante cebolla confitada al orégano, mozzarella y provolone rallado.",
    price: 26200,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1200&q=85",
    tags: ["Para 2 personas"],
    prepTime: "22 min",
    optionGroups: [
      {
        id: "guarnicion-fuga",
        name: "Guarnición obligatoria (incluida)",
        type: "single",
        required: true,
        items: GUARNICIONES_BODEGON,
      },
    ],
  },

  // PASTAS
  {
    id: "tallarines-estofado-bodegon",
    categoryId: "pastas",
    name: "Tallarines Cintas con Estofado de Osobuco",
    description: "Pasta fresca amasada en casa, servida con estofado de osobuco cocido durante 6 horas en reducción de vino tinto.",
    price: 18400,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85",
    tags: ["Amasada en casa"],
    prepTime: "16 min",
    isFeatured: true,
  },
  {
    id: "sorrentinos-jamon-queso",
    categoryId: "pastas",
    name: "Sorrentinos Caseros de Jamón & Queso",
    description: "Pasta rellena artesanal servida con crema de verdeo y lluvia de queso rallado estacionado.",
    price: 17600,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=85",
    tags: ["Pasta rellena"],
    prepTime: "15 min",
  },

  // POSTRES
  {
    id: "flan-mixto-bodegon",
    categoryId: "postres",
    name: "Flan Casero Mixto (Dulce & Crema)",
    description: "Flan tradicional de 12 yemas con caramelo amargo, dulce de leche repostero y crema montada.",
    price: 6800,
    image: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=1200&q=85",
    tags: ["Clásico porteño"],
    prepTime: "3 min",
    isFeatured: true,
  },
  {
    id: "tiramisu-fuente",
    categoryId: "postres",
    name: "Tiramisú de Fuente de Cantina",
    description: "Vainillas caseras empapadas en café espresso y licor de café, crema de mascarpone y cacao puro amargo.",
    price: 7400,
    image: "https://images.unsplash.com/photo-1586040140378-b5634cb4c8fc?auto=format&fit=crop&w=1200&q=85",
    tags: ["Porción abundante"],
    prepTime: "3 min",
  },
];