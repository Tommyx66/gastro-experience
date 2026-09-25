import type { MenuCategory, MenuProduct } from "@/data/menu";

export const breweryCategories: MenuCategory[] = [
  {
    id: "canillas",
    name: "Pizarra de Canillas",
    description:
      "Cervezas tiradas desde cámara de frío a 2°C. Lotes rotativos, sin pasteurizar y con carbonatación cuidada.",
  },
  {
    id: "burgers",
    name: "Smash Burgers",
    description:
      "Medallones de novillo aplastados al hierro, bordes crocantes, cheddar y pan de papa tostado.",
  },
  {
    id: "tapeo",
    name: "Tapeo de Taproom",
    description:
      "Platos para compartir, frituras y raciones pensadas para acompañar la pinta.",
  },
  {
    id: "fondos",
    name: "Fuego & Ribs",
    description:
      "Carnes ahumadas y glaseados con reducción cervecera, servidos sin vueltas.",
  },
  {
    id: "takeaway",
    name: "Growlers & Latas",
    description:
      "Llevate una canilla en growler ámbar o armá tu pack de latas para seguir el lote en casa.",
  },
];

export const breweryProducts: MenuProduct[] = [
  // =========================================================
  // PIZARRA DE CANILLAS
  // =========================================================
  {
    id: "tap-04-west-coast",
    categoryId: "canillas",
    name: "TAP 04 · West Coast IPA",
    description:
      "IBU 65 · ABV 6.8% · Centennial, Simcoe y Columbus. Perfil resinoso, pino, pomelo y un amargor largo, seco y limpio.",
    price: 6800,
    image: "/images/showcase/brewery/west-coast-ipa-can.png",
    tags: ["TAP 04", "IBU 65", "ABV 6.8%", "West Coast"],
    prepTime: "2 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "formato-tap-04",
        name: "Formato de tirada",
        type: "single",
        required: true,
        items: [
          { id: "pinta-473", name: "Pinta Clásica (473 ml)", priceDelta: 0 },
          { id: "media-300", name: "Media Pinta (300 ml)", priceDelta: -1600 },
        ],
      },
    ],
  },
  {
    id: "tap-07-hazy-mosaic",
    categoryId: "canillas",
    name: "TAP 07 · Hazy Juicy IPA",
    description:
      "IBU 25 · ABV 6.4% · Citra y Mosaic en doble dry-hop. Turbia, sedosa y jugosa, con mango maduro, maracuyá y final suave.",
    price: 7400,
    image: "/images/showcase/brewery/hazy-ipa-can.png",
    tags: ["TAP 07", "Double Dry-Hop", "IBU 25", "ABV 6.4%"],
    prepTime: "2 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "formato-tap-07",
        name: "Formato de tirada",
        type: "single",
        required: true,
        items: [
          { id: "pinta-hazy", name: "Pinta Clásica (473 ml)", priceDelta: 0 },
          { id: "media-hazy", name: "Media Pinta (300 ml)", priceDelta: -1600 },
        ],
      },
    ],
  },
  {
    id: "tap-11-nitro-stout",
    categoryId: "canillas",
    name: "TAP 11 · Imperial Nitro Stout",
    description:
      "IBU 42 · ABV 7.8% · Tirada con nitrógeno. Espuma densa, café tostado, chocolate semiamargo, vainilla y cuerpo profundo.",
    price: 7400,
    image: "/images/showcase/brewery/stout-pint.png",
    tags: ["TAP 11", "Nitro", "IBU 42", "ABV 7.8%"],
    prepTime: "3 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "formato-tap-11",
        name: "Formato de tirada",
        type: "single",
        required: true,
        items: [
          { id: "copa-stout", name: "Pinta Nitro (400 ml)", priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: "tap-01-german-pils",
    categoryId: "canillas",
    name: "TAP 01 · Bohemian German Pilsener",
    description:
      "IBU 34 · ABV 5.0% · Lager rubia brillante, fermentada a baja temperatura durante 6 semanas. Malta Pilsen y Saaz floral.",
    price: 5900,
    image: "/images/showcase/brewery/pils-can.png",
    tags: ["TAP 01", "Lager", "IBU 34", "ABV 5.0%"],
    prepTime: "2 min",
    optionGroups: [
      {
        id: "formato-tap-01",
        name: "Formato de tirada",
        type: "single",
        required: true,
        items: [
          { id: "pinta-pils", name: "Pinta Clásica (473 ml)", priceDelta: 0 },
          { id: "media-pils", name: "Media Pinta (300 ml)", priceDelta: -1400 },
        ],
      },
    ],
  },
  {
    id: "tap-09-scottish-export",
    categoryId: "canillas",
    name: "TAP 09 · Scottish Heavy Export",
    description:
      "IBU 20 · ABV 5.6% · Roja y maltosa, con caramelo, toffee, frutos secos y final redondo. Pensada para beber lento.",
    price: 6200,
    image: "/images/showcase/brewery/taproom-atmosphere.jpg",
    tags: ["TAP 09", "Red Ale", "IBU 20", "ABV 5.6%"],
    prepTime: "2 min",
  },

  // =========================================================
  // SMASH BURGERS
  // =========================================================
  {
    id: "smash-doble-bacon",
    categoryId: "burgers",
    name: "Doble Smash Bacon Jam",
    description:
      "Dos medallones de 100 g de novillo smash, cheddar inglés, mermelada de panceta ahumada al bourbon y pan de papa tostado.",
    price: 15400,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85",
    tags: ["Doble Smash", "Bacon Jam", "House Favorite"],
    prepTime: "14 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "burger-stack",
        name: "Medallones de carne",
        type: "single",
        required: true,
        items: [
          { id: "stack-doble", name: "Doble medallón (200 g carne)", priceDelta: 0 },
          { id: "stack-triple", name: "Triple medallón + cheddar (300 g)", priceDelta: 2800 },
        ],
      },
      {
        id: "burger-sides",
        name: "Guarnición incluida",
        type: "single",
        required: true,
        items: [
          { id: "papas-rusticas", name: "Papas rústicas", priceDelta: 0 },
          { id: "papas-cheddar", name: "Papas con cheddar y panceta", priceDelta: 2200 },
        ],
      },
    ],
  },
  {
    id: "oklahoma-fried-onion",
    categoryId: "burgers",
    name: "Oklahoma Onion Smashed",
    description:
      "Cebolla ultrafina prensada contra el hierro, doble cheddar y salsa especial de la casa sobre pan de papa tostado.",
    price: 14800,
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&q=85",
    tags: ["Smash", "Onion", "Double Cheddar"],
    prepTime: "12 min",
  },
  {
    id: "crispy-chicken-burger",
    categoryId: "burgers",
    name: "Nashville Hot Crispy Chicken",
    description:
      "Pollo marinado en buttermilk, rebozado extra crocante, coleslaw morada, pickles y alioli picante.",
    price: 13900,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=85",
    tags: ["Crispy Chicken", "Nashville", "Picante"],
    prepTime: "15 min",
  },

  // =========================================================
  // TAPEO
  // =========================================================
  {
    id: "papas-hop-district",
    categoryId: "tapeo",
    name: "Papas Rústicas Hop District",
    description:
      "Papas triple cocción con cheddar de barril, panceta ahumada crocante y ciboulette fresco.",
    price: 10400,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=85",
    tags: ["Para compartir", "Cheddar", "Panceta"],
    prepTime: "10 min",
    isFeatured: true,
  },
  {
    id: "tenders-cereal",
    categoryId: "tapeo",
    name: "Chicken Tenders al Bourbon · 10u",
    description:
      "Tiras de pollo rebozadas en copos de maíz crocantes, con dip BBQ casero infusionado en cerveza negra.",
    price: 11800,
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1200&q=85",
    tags: ["Para picar", "Crocante", "BBQ"],
    prepTime: "12 min",
  },

  // =========================================================
  // FUEGO & RIBS
  // =========================================================
  {
    id: "ribs-bbq-porter",
    categoryId: "fondos",
    name: "Ribs de Cerdo BBQ Porter · 600 g",
    description:
      "Costillas de cerdo ahumadas 6 horas a baja temperatura, glaseadas con BBQ de Porter y servidas con papas rústicas.",
    price: 24500,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    tags: ["Ahumado 6 h", "Porter BBQ", "Para 2"],
    prepTime: "20 min",
    isFeatured: true,
  },

  // =========================================================
  // GROWLERS & LATAS
  // =========================================================
  {
    id: "growler-vidrio-19",
    categoryId: "takeaway",
    name: "Growler Ámbar · 1.9 L",
    description:
      "Botellón de vidrio ámbar con cierre mecánico. Incluye una carga de cualquier estilo disponible en canilla.",
    price: 18200,
    image: "/images/showcase/brewery/taproom-atmosphere.jpg",
    tags: ["1.9 L", "Take Away", "Growler"],
    prepTime: "5 min",
  },
  {
    id: "pack-latas-craft",
    categoryId: "takeaway",
    name: "Pack 4 Latas · 473 ml",
    description:
      "Elegí hasta 2 estilos de la pizarra y armá el pack en el momento para llevártelo bien frío.",
    price: 22000,
    image: "/images/showcase/brewery/hazy-ipa-can.png",
    tags: ["4 × 473 ml", "Take Away", "Pack Mixto"],
    prepTime: "5 min",
  },
];

export const menuCategories = breweryCategories;
export const menuProducts = breweryProducts;
