import type {
  MenuCategory,
  MenuProduct,
} from "@/data/menu";

export const cafeCategories: MenuCategory[] = [
  {
    id: "coffee",
    name: "Café de Especialidad",
    description:
      "Espresso, filtrados y bebidas de café preparados al momento con granos de especialidad.",
  },
  {
    id: "bakery",
    name: "Bakery & Masa Madre",
    description:
      "Panadería artesanal, fermentaciones largas y piezas horneadas durante el día.",
  },
  {
    id: "brunch",
    name: "Brunch",
    description:
      "Platos abundantes para desayunos tardíos, almuerzos tranquilos y fines de semana.",
  },
  {
    id: "salty",
    name: "Salados",
    description:
      "Tostados, focaccias, sandwiches y opciones rápidas para acompañar el café.",
  },
  {
    id: "pastry",
    name: "Pastelería",
    description:
      "Tortas, budines y preparaciones dulces hechas en la casa.",
  },
  {
    id: "cold-drinks",
    name: "Fríos & Naturales",
    description:
      "Cold brew, bebidas frías, limonadas y preparaciones sin alcohol.",
  },
];

export const cafeProducts: MenuProduct[] = [
  // =========================================================
  // 01. CAFÉ DE ESPECIALIDAD
  // =========================================================

 

  {
    id: "flat-white",
    categoryId: "coffee",
    name: "Flat White",
    description:
      "Doble espresso con leche texturizada y microespuma sedosa.",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=1200&q=85",
    tags: ["Especialidad"],
    prepTime: "5 min",
    optionGroups: [
      {
        id: "flat-size",
        name: "Tamaño",
        type: "single",
        required: true,
        items: [
          {
            id: "flat-medium",
            name: "Mediano",
            priceDelta: 0,
          },
          {
            id: "flat-large",
            name: "Grande",
            priceDelta: 700,
          },
        ],
      },
      {
        id: "flat-milk",
        name: "Tipo de leche",
        type: "single",
        required: true,
        items: [
          {
            id: "milk-whole",
            name: "Leche entera",
            priceDelta: 0,
          },
          {
            id: "milk-desla",
            name: "Deslactosada",
            priceDelta: 500,
          },
          {
            id: "milk-oat",
            name: "Avena",
            priceDelta: 900,
          },
        ],
      },
    ],
  },

  {
    id: "cappuccino-cafe",
    categoryId: "coffee",
    name: "Cappuccino",
    description:
      "Espresso doble, leche texturizada, microespuma y cacao amargo.",
    price: 4900,
    image:
      "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1200&q=85",
    tags: ["Clásico"],
    prepTime: "5 min",
    optionGroups: [
      {
        id: "cappuccino-milk",
        name: "Tipo de leche",
        type: "single",
        required: true,
        items: [
          {
            id: "cappuccino-whole",
            name: "Leche entera",
            priceDelta: 0,
          },
          {
            id: "cappuccino-oat",
            name: "Leche de avena",
            priceDelta: 900,
          },
        ],
      },
      {
        id: "cappuccino-extra",
        name: "Extras",
        type: "multiple",
        items: [
          {
            id: "cappuccino-extra-shot",
            name: "Shot extra",
            priceDelta: 1800,
          },
          {
            id: "cappuccino-vanilla",
            name: "Vainilla",
            priceDelta: 600,
          },
          {
            id: "cappuccino-caramel",
            name: "Caramelo",
            priceDelta: 600,
          },
        ],
      },
    ],
  },

  {
    id: "latte-cafe",
    categoryId: "coffee",
    name: "Latte",
    description:
      "Espresso de especialidad, leche texturizada y espuma ligera.",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=85",
    tags: ["Suave"],
    prepTime: "5 min",
    optionGroups: [
      {
        id: "latte-size",
        name: "Tamaño",
        type: "single",
        required: true,
        items: [
          {
            id: "latte-medium",
            name: "Mediano",
            priceDelta: 0,
          },
          {
            id: "latte-large",
            name: "Grande",
            priceDelta: 800,
          },
        ],
      },
      {
        id: "latte-milk",
        name: "Tipo de leche",
        type: "single",
        required: true,
        items: [
          {
            id: "latte-whole",
            name: "Entera",
            priceDelta: 0,
          },
          {
            id: "latte-oat",
            name: "Avena",
            priceDelta: 900,
          },
          {
            id: "latte-almond",
            name: "Almendras",
            priceDelta: 1000,
          },
        ],
      },
    ],
  },

  {
    id: "filter-coffee",
    categoryId: "coffee",
    name: "Filtrado del Día",
    description:
      "Café de origen preparado por V60. El origen disponible cambia según la fecha.",
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=85",
    tags: ["V60", "Origen"],
    prepTime: "7 min",
  },

  {
    id: "mocha-cafe",
    categoryId: "coffee",
    name: "Mocha 70%",
    description:
      "Espresso doble, chocolate 70% cacao, leche texturizada y cacao amargo.",
    price: 5600,
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=85",
    tags: ["Chocolate", "Dulce"],
    prepTime: "6 min",
    optionGroups: [
      {
        id: "mocha-milk",
        name: "Leche",
        type: "single",
        required: true,
        items: [
          {
            id: "mocha-whole",
            name: "Entera",
            priceDelta: 0,
          },
          {
            id: "mocha-oat",
            name: "Avena",
            priceDelta: 900,
          },
        ],
      },
    ],
  },

  // =========================================================
  // 02. BAKERY & MASA MADRE
  // =========================================================

  {
    id: "croissant-manteca",
    categoryId: "bakery",
    name: "Croissant de Manteca",
    description:
      "Croissant de laminado clásico, manteca, fermentación lenta y exterior crocante.",
    price: 3600,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85",
    tags: ["Horneado del día"],
    prepTime: "2 min",
    isFeatured: true,
  },

  {
    id: "roll-canela",
    categoryId: "bakery",
    name: "Roll de Canela",
    description:
      "Masa brioche fermentada lentamente, canela, azúcar rubia y glaseado ligero.",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1200&q=85",
    tags: ["Brioche", "Dulce"],
    prepTime: "2 min",
  },

  {
    id: "focaccia-cafe",
    categoryId: "bakery",
    name: "Focaccia de Masa Madre",
    description:
      "Focaccia aireada con oliva extra virgen, sal marina y romero fresco.",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85",
    tags: ["Masa madre"],
    prepTime: "3 min",
  },

  {
    id: "tostada-pan-madre",
    categoryId: "bakery",
    name: "Tostada de Masa Madre",
    description:
      "Pan de masa madre tostado, manteca cultivada y mermelada artesanal.",
    price: 3900,
    image:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1200&q=85",
    tags: ["Masa madre"],
    prepTime: "4 min",
    optionGroups: [
      {
        id: "toast-spread",
        name: "Acompañamiento",
        type: "single",
        required: true,
        items: [
          {
            id: "toast-mermelada",
            name: "Mermelada de frutos rojos",
            priceDelta: 0,
          },
          {
            id: "toast-miel",
            name: "Miel de monte",
            priceDelta: 400,
          },
          {
            id: "toast-dulce",
            name: "Dulce de leche",
            priceDelta: 500,
          },
        ],
      },
    ],
  },

  // =========================================================
  // 03. BRUNCH
  // =========================================================

  {
    id: "avocado-toast",
    categoryId: "brunch",
    name: "Avocado Toast",
    description:
      "Pan de masa madre, palta, huevo poché, semillas tostadas, oliva y limón.",
    price: 8900,
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85",
    tags: ["Brunch", "Fresco"],
    prepTime: "12 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "avocado-egg",
        name: "Huevo",
        type: "single",
        required: true,
        items: [
          {
            id: "egg-poached",
            name: "Poché",
            priceDelta: 0,
          },
          {
            id: "egg-scrambled",
            name: "Revueltos",
            priceDelta: 0,
          },
          {
            id: "egg-fried",
            name: "A la plancha",
            priceDelta: 0,
          },
        ],
      },
      {
        id: "avocado-extra",
        name: "Extras",
        type: "multiple",
        items: [
          {
            id: "extra-salmon",
            name: "Salmón ahumado",
            priceDelta: 3200,
          },
          {
            id: "extra-bacon-brunch",
            name: "Panceta crocante",
            priceDelta: 1800,
          },
        ],
      },
    ],
  },

  {
    id: "eggs-benedict",
    categoryId: "brunch",
    name: "Eggs Benedict",
    description:
      "Pan brioche tostado, huevos poché, jamón cocido artesanal y salsa holandesa.",
    price: 10500,
    image:
      "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=1200&q=85",
    tags: ["Brunch", "Clásico"],
    prepTime: "14 min",
    optionGroups: [
      {
        id: "benedict-bread",
        name: "Base",
        type: "single",
        required: true,
        items: [
          {
            id: "benedict-brioche",
            name: "Brioche",
            priceDelta: 0,
          },
          {
            id: "benedict-sourdough",
            name: "Masa madre",
            priceDelta: 500,
          },
        ],
      },
      {
        id: "benedict-protein",
        name: "Proteína",
        type: "single",
        required: true,
        items: [
          {
            id: "benedict-ham",
            name: "Jamón artesanal",
            priceDelta: 0,
          },
          {
            id: "benedict-salmon",
            name: "Salmón ahumado",
            priceDelta: 2800,
          },
        ],
      },
    ],
  },

  {
    id: "pancakes-cafe",
    categoryId: "brunch",
    name: "Pancakes de Ricota & Vainilla",
    description:
      "Pancakes esponjosos, crema de ricota, fruta fresca, maple y frutos secos.",
    price: 9200,
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=85",
    tags: ["Brunch", "Dulce"],
    prepTime: "11 min",
    optionGroups: [
      {
        id: "pancake-extra",
        name: "Extras",
        type: "multiple",
        items: [
          {
            id: "extra-maple",
            name: "Maple extra",
            priceDelta: 700,
          },
          {
            id: "extra-fruit",
            name: "Fruta de estación",
            priceDelta: 1200,
          },
          {
            id: "extra-almond",
            name: "Almendras tostadas",
            priceDelta: 800,
          },
        ],
      },
    ],
  },

  {
    id: "granola-yogurt",
    categoryId: "brunch",
    name: "Granola, Yogur & Fruta",
    description:
      "Yogur natural, granola artesanal, fruta de estación, miel y semillas.",
    price: 7600,
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=85",
    tags: ["Fresco", "Ligero"],
    prepTime: "5 min",
  },

  // =========================================================
  // 04. SALADOS
  // =========================================================

  {
    id: "croque-monsieur",
    categoryId: "salty",
    name: "Croque Monsieur",
    description:
      "Pan brioche, jamón cocido artesanal, queso gruyère, bechamel y gratinado final.",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?auto=format&fit=crop&w=1200&q=85",
    tags: ["Clásico"],
    prepTime: "9 min",
  },

  {
    id: "sandwich-pastron",
    categoryId: "salty",
    name: "Sandwich de Pastrón",
    description:
      "Pan de masa madre, pastrón casero, pepinillos, mostaza antigua y rúcula.",
    price: 9800,
    image:
      "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=1200&q=85",
    tags: ["Masa madre", "Abundante"],
    prepTime: "10 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "pastron-sauce",
        name: "Salsa",
        type: "single",
        required: true,
        items: [
          {
            id: "pastron-mustard",
            name: "Mostaza antigua",
            priceDelta: 0,
          },
          {
            id: "pastron-mayo",
            name: "Mayonesa de hierbas",
            priceDelta: 0,
          },
        ],
      },
      {
        id: "pastron-extra",
        name: "Extras",
        type: "multiple",
        items: [
          {
            id: "pastron-extra-meat",
            name: "Extra pastrón",
            priceDelta: 2600,
          },
          {
            id: "pastron-cheese",
            name: "Extra gruyère",
            priceDelta: 1800,
          },
        ],
      },
    ],
  },

  {
    id: "focaccia-salmon",
    categoryId: "salty",
    name: "Focaccia de Salmón",
    description:
      "Focaccia tibia, salmón ahumado, queso crema, pepino, eneldo y limón.",
    price: 10900,
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=85",
    tags: ["Fresco", "Especial"],
    prepTime: "8 min",
  },

  // =========================================================
  // 05. PASTELERÍA
  // =========================================================

  {
    id: "cheesecake-cafe",
    categoryId: "pastry",
    name: "Cheesecake de Vainilla",
    description:
      "Cheesecake horneado a baja temperatura, base crocante y compota de frutos rojos.",
    price: 6900,
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=85",
    tags: ["Casero"],
    prepTime: "3 min",
    isFeatured: true,
  },

  {
    id: "carrot-cake",
    categoryId: "pastry",
    name: "Carrot Cake",
    description:
      "Bizcocho húmedo de zanahoria, especias, nueces tostadas y frosting de queso crema.",
    price: 6400,
    image:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=1200&q=85",
    tags: ["Especiado"],
    prepTime: "3 min",
  },



  {
    id: "lemon-pie-cafe",
    categoryId: "pastry",
    name: "Lemon Pie",
    description:
      "Base crocante, crema de limón intensa y merengue italiano flameado.",
    price: 6200,
    image:
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=1200&q=85",
    tags: ["Cítrico"],
    prepTime: "2 min",
  },

  // =========================================================
  // 06. FRÍOS & NATURALES
  // =========================================================

  {
    id: "cold-brew",
    categoryId: "cold-drinks",
    name: "Cold Brew de la Casa",
    description:
      "Extracción en frío durante 18 horas, servida sobre hielo.",
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=85",
    tags: ["Cold Brew", "Sin azúcar"],
    prepTime: "2 min",
    optionGroups: [
      {
        id: "coldbrew-size",
        name: "Tamaño",
        type: "single",
        required: true,
        items: [
          {
            id: "coldbrew-medium",
            name: "Mediano",
            priceDelta: 0,
          },
          {
            id: "coldbrew-large",
            name: "Grande",
            priceDelta: 900,
          },
        ],
      },
      {
        id: "coldbrew-milk",
        name: "Leche",
        type: "single",
        items: [
          {
            id: "coldbrew-black",
            name: "Sin leche",
            priceDelta: 0,
          },
          {
            id: "coldbrew-oat",
            name: "Leche de avena",
            priceDelta: 900,
          },
        ],
      },
    ],
  },

  {
    id: "iced-latte",
    categoryId: "cold-drinks",
    name: "Iced Latte",
    description:
      "Espresso doble, leche fría y hielo.",
    price: 5400,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=85",
    tags: ["Frío", "Especialidad"],
    prepTime: "3 min",
    optionGroups: [
      {
        id: "iced-latte-milk",
        name: "Leche",
        type: "single",
        required: true,
        items: [
          {
            id: "iced-whole",
            name: "Entera",
            priceDelta: 0,
          },
          {
            id: "iced-oat",
            name: "Avena",
            priceDelta: 900,
          },
          {
            id: "iced-almond",
            name: "Almendras",
            priceDelta: 1000,
          },
        ],
      },
      {
        id: "iced-latte-extra",
        name: "Extras",
        type: "multiple",
        items: [
          {
            id: "iced-shot",
            name: "Shot extra",
            priceDelta: 1800,
          },
          {
            id: "iced-vanilla",
            name: "Vainilla",
            priceDelta: 600,
          },
        ],
      },
    ],
  },

  {
    id: "lemonade-cafe",
    categoryId: "cold-drinks",
    name: "Limonada de Jengibre",
    description:
      "Limón recién exprimido, jengibre, menta, almíbar ligero y mucho hielo.",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=85",
    tags: ["Natural", "Sin alcohol"],
    prepTime: "4 min",
  },

  
];