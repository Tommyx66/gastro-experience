import type { MenuCategory, MenuProduct } from "@/data/menu";

// Catálogo compartido de gustos de helado
export const GUSTOS_GELATO = [
  { id: "pistacho", name: "Pistacho Puro de Sicilia", priceDelta: 0 },
  { id: "dulce-granizado", name: "Dulce de Leche a la Antigua (con chispas)", priceDelta: 0 },
  { id: "choc-70", name: "Chocolate Belga Origen 70%", priceDelta: 0 },
  { id: "fior-di-latte", name: "Fior di Latte & Crema de Vainilla", priceDelta: 0 },
  { id: "sambayon", name: "Sambayón Tradicional con Oporto", priceDelta: 0 },
  { id: "frambuesa", name: "Frambuesa Silvestre al Agua", priceDelta: 0 },
  { id: "limon-menta", name: "Limón Sutil & Albahaca Fresca", priceDelta: 0 },
  { id: "avellana", name: "Nocciola Piamontesa (Avellana tostada)", priceDelta: 0 },
];

export const icecreamCategories: MenuCategory[] = [
  {
    id: "potes",
    name: "Potes Térmicos por Kilo",
    description: "Formatos isotérmicos sellados para freezer con selección combinable de sabores artesanales.",
  },
  {
    id: "cucuruchos",
    name: "Cucuruchos & Vasos",
    description: "Conos horneados en el local con masa de waffle dulce y bochas generosas servidas con espátula.",
  },
  {
    id: "especialidades",
    name: "Pasticceria Fredda",
    description: "Affogatos calientes con espresso, semifríos de autor y copas heladas italianas.",
  },
  {
    id: "toppings",
    name: "Salsas & Toppings",
    description: "Baños de chocolate crocante, frutas en almíbar casero y frutos secos caramelizados.",
  },
];

export const icecreamProducts: MenuProduct[] = [
  // POTES
  {
    id: "pote-1kg",
    categoryId: "potes",
    name: "Pote Térmico 1 Kilogramo",
    description: "Hasta 4 sabores a elección. Rinde aproximadamente 6 porciones e incluye 4 cucuruchos de regalo.",
    price: 18500,
    image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?auto=format&fit=crop&w=1200&q=85",
    tags: ["Familiar", "Hasta 4 gustos"],
    prepTime: "5 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "sabores-1kg",
        name: "Elegí hasta 4 sabores",
        type: "multiple",
        required: true,
        items: GUSTOS_GELATO,
      },
    ],
  },
  {
    id: "pote-medio",
    categoryId: "potes",
    name: "Pote Térmico 1/2 Kilogramo",
    description: "Hasta 3 sabores a elección. Tamaño ideal para compartir entre 2 o 3 personas.",
    price: 10400,
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1200&q=85",
    tags: ["Hasta 3 gustos"],
    prepTime: "4 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "sabores-medio",
        name: "Elegí hasta 3 sabores",
        type: "multiple",
        required: true,
        items: GUSTOS_GELATO,
      },
    ],
  },
  {
    id: "pote-cuarto",
    categoryId: "potes",
    name: "Pote Térmico 1/4 Kilogramo",
    description: "Hasta 2 sabores a elección para disfrutar de forma individual.",
    price: 6200,
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=1200&q=85",
    tags: ["Individual", "2 gustos"],
    prepTime: "3 min",
    optionGroups: [
      {
        id: "sabores-cuarto",
        name: "Elegí hasta 2 sabores",
        type: "multiple",
        required: true,
        items: GUSTOS_GELATO,
      },
    ],
  },

  // CUCURUCHOS
  {
    id: "cono-doble",
    categoryId: "cucuruchos",
    name: "Cucurucho Doble de Waffle",
    description: "Dos bochas servidas a la espátula sobre cono crocante horneado a la vista.",
    price: 6800,
    image: "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=1200&q=85",
    tags: ["Waffle casero"],
    prepTime: "3 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "gustos-cono-doble",
        name: "Elegí 2 sabores",
        type: "multiple",
        required: true,
        items: GUSTOS_GELATO,
      },
      {
        id: "bano-cono",
        name: "Baño adicional",
        type: "single",
        items: [
          { id: "sin-bano", name: "Sin baño", priceDelta: 0 },
          { id: "bano-chocolate", name: "Punta bañada en chocolate crocante", priceDelta: 800 },
        ],
      },
    ],
  },
  {
    id: "vaso-doble",
    categoryId: "cucuruchos",
    name: "Vaso Gelato Clásico (2 gustos)",
    description: "Dos sabores servidos en vaso térmico biodegradable con cuchara ecológica.",
    price: 6200,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=85",
    tags: ["En vaso"],
    prepTime: "3 min",
    optionGroups: [
      {
        id: "gustos-vaso",
        name: "Elegí 2 sabores",
        type: "multiple",
        required: true,
        items: GUSTOS_GELATO,
      },
    ],
  },

  // ESPECIALIDADES
  {
    id: "affogato-modena",
    categoryId: "especialidades",
    name: "Affogato al Caffè Tradizionale",
    description: "Bocha cremosa de fior di latte en copa de vidrio, ahogada con un shot de espresso doble caliente recién extraído.",
    price: 5900,
    image: "https://images.unsplash.com/photo-1523294587484-bae6cc870010?auto=format&fit=crop&w=1200&q=85",
    tags: ["Italiano", "Café caliente"],
    prepTime: "4 min",
  },
  {
    id: "semifrio-pistacho",
    categoryId: "especialidades",
    name: "Semifrío de Pistacho & Frambuesa",
    description: "Pastel frío individual con crema de pistacho puro de Bronte, corazón de frambuesa y base crocante.",
    price: 8400,
    image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&w=1200&q=85",
    tags: ["Postre de autor"],
    prepTime: "3 min",
  },

  // TOPPINGS
  {
    id: "pote-toppings-gourmet",
    categoryId: "toppings",
    name: "Pack Salsas & Frutos Tostados",
    description: "Frasquito de salsa casera de dulce de leche tibio y almendras tostadas garrapiñadas.",
    price: 3600,
    image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?auto=format&fit=crop&w=1200&q=85",
    tags: ["Para acompañar"],
    prepTime: "2 min",
  },
];