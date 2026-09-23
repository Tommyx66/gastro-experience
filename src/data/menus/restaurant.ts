export interface MenuOptionItem {
  id: string;
  name: string;
  priceDelta?: number;
}

export interface MenuOptionGroup {
  id: string;
  name: string;
  type: "single" | "multiple";
  required?: boolean;
  items: MenuOptionItem[];
}

export interface MenuProduct {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  tags?: string[];
  optionGroups?: MenuOptionGroup[];
  isFeatured?: boolean;
  prepTime?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
}

export const menuCategories: MenuCategory[] = [
  {
    id: "entradas",
    name: "Tapeo & Entradas",
    description:
      "Raciones al centro pensadas para abrir la mesa, compartir y empezar la experiencia.",
  },
  {
    id: "ensaladas",
    name: "Huerta & Ensaladas",
    description:
      "Vegetales de estación, hojas frescas y combinaciones pensadas para acompañar o comer como plato principal.",
  },
  {
    id: "pastas",
    name: "Pastas Artesanales",
    description:
      "Pastas frescas elaboradas en casa y servidas con salsas de cocción lenta.",
  },
  {
    id: "fuegos",
    name: "Fuegos & Carnes",
    description:
      "Cortes seleccionados, cocciones lentas y brasa viva de quebracho.",
  },
  {
    id: "burgers",
    name: "Hamburguesas de Autor",
    description:
      "Medallones de novillo, pan brioche dorado y combinaciones de la casa.",
  },
  {
    id: "pizzas",
    name: "Pizzas & Masa Madre",
    description:
      "Masas de fermentación lenta, ingredientes intensos y horno de alta temperatura.",
  },
  {
    id: "drinks",
    name: "Cervezas & Barra",
    description:
      "Pintas tiradas, vinos, cocktails de autor y clásicos preparados al momento.",
  },
  {
    id: "desserts",
    name: "Final Dulce",
    description:
      "Postres caseros, chocolate, frutas y preparaciones pensadas para cerrar la mesa.",
  },
];

export const menuProducts: MenuProduct[] = [
  // =========================================================
  // 01. TAPEO & ENTRADAS
  // =========================================================

  {
    id: "papas-trufa",
    categoryId: "entradas",
    name: "Papas Rústicas Trufadas",
    description:
      "Papas cortadas a mano en triple cocción, aceite de trufa blanca, queso parmesano estacionado 12 meses y ciboulette fresco.",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=85",
    tags: ["Para compartir", "Vegetariano"],
    prepTime: "12 min",
    optionGroups: [
      {
        id: "toppings-papas",
        name: "Adicionales con cargo",
        type: "multiple",
        items: [
          {
            id: "extra-trufa",
            name: "Doble aceite de trufa",
            priceDelta: 2200,
          },
          {
            id: "extra-bacon",
            name: "Panceta crocante picada",
            priceDelta: 1800,
          },
          {
            id: "dip-alioli",
            name: "Dip de alioli ahumado",
            priceDelta: 1200,
          },
        ],
      },
      {
        id: "quitar-ingredientes-papas",
        name: "Modificaciones sin cargo",
        type: "multiple",
        items: [
          {
            id: "sin-ciboulette",
            name: "Sin ciboulette",
            priceDelta: 0,
          },
          {
            id: "sin-sal",
            name: "Sin sal",
            priceDelta: 0,
          },
        ],
      },
    ],
  },

  {
    id: "provoleta-brasa",
    categoryId: "entradas",
    name: "Provoleta Crocante a la Leña",
    description:
      "Queso provolone fundente al hierro con costra crocante, tomates cherry confitados y orégano serrano a las brasas.",
    price: 9800,
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=85",
    tags: ["Horno a leña", "Para compartir"],
    prepTime: "14 min",
    optionGroups: [
      {
        id: "panera-provoleta",
        name: "Panera & Aderezos",
        type: "multiple",
        items: [
          {
            id: "focaccia-masa-madre",
            name: "Focaccia tibia de masa madre",
            priceDelta: 1600,
          },
          {
            id: "chimi-ahumado",
            name: "Chimichurri ahumado casero",
            priceDelta: 900,
          },
        ],
      },
      {
        id: "mod-provoleta",
        name: "Modificaciones",
        type: "multiple",
        items: [
          {
            id: "sin-tomates",
            name: "Sin tomates confitados",
            priceDelta: 0,
          },
          {
            id: "sin-oregano",
            name: "Sin orégano",
            priceDelta: 0,
          },
        ],
      },
    ],
  },

  {
    id: "empanadas-corte",
    categoryId: "entradas",
    name: "Empanadas de Corte y Cebolla",
    description:
      "Empanadas fritas rellenas de carne cortada a cuchillo, cebolla caramelizada, huevo y aceitunas verdes.",
    price: 7200,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85",
    tags: ["Clásico de la casa"],
    prepTime: "10 min",
    optionGroups: [
      {
        id: "cantidad-empanadas",
        name: "Cantidad",
        type: "single",
        required: true,
        items: [
          {
            id: "tres-empanadas",
            name: "3 unidades",
            priceDelta: 0,
          },
          {
            id: "seis-empanadas",
            name: "6 unidades para compartir",
            priceDelta: 5200,
          },
        ],
      },
      {
        id: "salsa-empanadas",
        name: "Salsas",
        type: "multiple",
        items: [
          {
            id: "salsa-criolla",
            name: "Salsa criolla",
            priceDelta: 600,
          },
          {
            id: "salsa-picante",
            name: "Salsa picante de la casa",
            priceDelta: 700,
          },
        ],
      },
    ],
  },

  {
    id: "burrata-tomates",
    categoryId: "entradas",
    name: "Burrata, Tomates & Albahaca",
    description:
      "Burrata cremosa, tomates frescos, tomates asados, aceite de oliva extra virgen, albahaca y focaccia tostada.",
    price: 11400,
    image:
      "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=1200&q=85",
    tags: ["Vegetariano", "Fresco"],
    prepTime: "8 min",
    optionGroups: [
      {
        id: "burrata-pan",
        name: "Acompañamiento",
        type: "single",
        required: true,
        items: [
          {
            id: "focaccia-clasica",
            name: "Focaccia de masa madre",
            priceDelta: 0,
          },
          {
            id: "pan-rustico",
            name: "Pan rústico tostado",
            priceDelta: 500,
          },
        ],
      },
      {
        id: "extras-burrata",
        name: "Extras",
        type: "multiple",
        items: [
          {
            id: "jamon-crudo-burrata",
            name: "Jamón crudo estacionado",
            priceDelta: 2900,
          },
          {
            id: "pesto-albahaca",
            name: "Pesto fresco de albahaca",
            priceDelta: 1100,
          },
        ],
      },
    ],
  },

  {
    id: "croquetas-bondiola",
    categoryId: "entradas",
    name: "Croquetas de Bondiola Braseada",
    description:
      "Croquetas doradas de bondiola cocida lentamente, centro cremoso, mostaza antigua y hierbas frescas.",
    price: 8900,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
    tags: ["Para compartir"],
    prepTime: "11 min",
    optionGroups: [
      {
        id: "salsa-croquetas",
        name: "Salsa incluida",
        type: "single",
        required: true,
        items: [
          {
            id: "mostaza-antigua",
            name: "Mostaza antigua",
            priceDelta: 0,
          },
          {
            id: "alioli-hierbas",
            name: "Alioli de hierbas",
            priceDelta: 0,
          },
        ],
      },
    ],
  },

  {
    id: "langostinos-brasa",
    categoryId: "entradas",
    name: "Langostinos al Ajillo y Limón",
    description:
      "Langostinos salteados a fuego fuerte con ajo, manteca, limón, perejil y pan rústico para untar.",
    price: 12900,
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=85",
    tags: ["Mariscos", "Para compartir"],
    prepTime: "9 min",
    optionGroups: [
      {
        id: "nivel-ajillo",
        name: "Intensidad de ajo",
        type: "single",
        required: true,
        items: [
          {
            id: "ajo-suave",
            name: "Suave",
            priceDelta: 0,
          },
          {
            id: "ajo-intenso",
            name: "Intenso",
            priceDelta: 0,
          },
        ],
      },
      {
        id: "pan-langostinos",
        name: "Extras",
        type: "multiple",
        items: [
          {
            id: "extra-pan",
            name: "Pan rústico extra",
            priceDelta: 800,
          },
          {
            id: "extra-limon",
            name: "Limón adicional",
            priceDelta: 300,
          },
        ],
      },
    ],
  },

  // =========================================================
  // 02. HUERTA & ENSALADAS
  // =========================================================

  {
    id: "ensalada-rucula",
    categoryId: "ensaladas",
    name: "Rúcula, Pera y Parmesano",
    description:
      "Rúcula fresca, pera grillada, parmesano en lascas, nueces tostadas y vinagreta de miel y mostaza.",
    price: 9800,
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
    tags: ["Vegetariano", "Fresco"],
    prepTime: "7 min",
    optionGroups: [
      {
        id: "proteina-rucula",
        name: "Sumar proteína",
        type: "single",
        items: [
          {
            id: "sin-proteina",
            name: "Sin proteína",
            priceDelta: 0,
          },
          {
            id: "pollo-grillado",
            name: "Pollo grillado",
            priceDelta: 3200,
          },
          {
            id: "salmon-ahumado",
            name: "Salmón ahumado",
            priceDelta: 4900,
          },
        ],
      },
    ],
  },

  {
    id: "caesar-pollo",
    categoryId: "ensaladas",
    name: "Caesar de Pollo a la Brasa",
    description:
      "Romaine crocante, pollo grillado, parmesano, croutons de masa madre y aderezo Caesar casero.",
    price: 10900,
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=85",
    tags: ["Clásico"],
    prepTime: "9 min",
    optionGroups: [
      {
        id: "caesar-proteina",
        name: "Proteína",
        type: "single",
        required: true,
        items: [
          {
            id: "pollo-caesar",
            name: "Pollo grillado",
            priceDelta: 0,
          },
          {
            id: "langostinos-caesar",
            name: "Langostinos al grill",
            priceDelta: 3900,
          },
        ],
      },
      {
        id: "caesar-mod",
        name: "Modificaciones",
        type: "multiple",
        items: [
          {
            id: "sin-croutons",
            name: "Sin croutons",
            priceDelta: 0,
          },
          {
            id: "sin-aderezo-caesar",
            name: "Aderezo aparte",
            priceDelta: 0,
          },
        ],
      },
    ],
  },

  {
    id: "ensalada-burrata",
    categoryId: "ensaladas",
    name: "Burrata, Durazno & Jamón Crudo",
    description:
      "Burrata cremosa, duraznos grillados, jamón crudo, hojas verdes, pistachos y reducción balsámica.",
    price: 13900,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85",
    tags: ["Estacional"],
    prepTime: "8 min",
  },

  {
    id: "ensalada-griega",
    categoryId: "ensaladas",
    name: "Ensalada Mediterránea",
    description:
      "Tomate, pepino, aceitunas, cebolla morada, queso feta, hierbas frescas y oliva extra virgen.",
    price: 9200,
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=85",
    tags: ["Vegetariano"],
    prepTime: "6 min",
    optionGroups: [
      {
        id: "feta-extra",
        name: "Extras",
        type: "multiple",
        items: [
          {
            id: "extra-feta",
            name: "Extra queso feta",
            priceDelta: 1300,
          },
          {
            id: "extra-olivas",
            name: "Extra aceitunas",
            priceDelta: 700,
          },
        ],
      },
    ],
  },

  // =========================================================
  // 03. PASTAS ARTESANALES
  // =========================================================

  {
    id: "ravioles-burrata",
    categoryId: "pastas",
    name: "Ravioles de Burrata & Pomodoro",
    description:
      "Pasta fresca rellena de burrata y parmesano con pomodoro casero, albahaca y aceite de oliva.",
    price: 13900,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
    tags: ["Pasta fresca", "Vegetariano"],
    prepTime: "13 min",
    optionGroups: [
      {
        id: "salsa-ravioles",
        name: "Terminación",
        type: "single",
        required: true,
        items: [
          {
            id: "pomodoro",
            name: "Pomodoro de la casa",
            priceDelta: 0,
          },
          {
            id: "crema-trufa-ravioles",
            name: "Crema de parmesano y trufa",
            priceDelta: 2400,
          },
        ],
      },
    ],
  },

  {
    id: "tagliatelle-carbonara",
    categoryId: "pastas",
    name: "Tagliatelle Carbonara",
    description:
      "Tagliatelle fresca con panceta crocante, yema, parmesano estacionado y pimienta negra recién molida.",
    price: 14200,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1200&q=85",
    tags: ["Clásico italiano"],
    prepTime: "14 min",
    optionGroups: [
      {
        id: "carbonara-extra",
        name: "Extras",
        type: "multiple",
        items: [
          {
            id: "extra-panceta-carbonara",
            name: "Extra panceta crocante",
            priceDelta: 1800,
          },
          {
            id: "extra-parmesano",
            name: "Extra parmesano",
            priceDelta: 1300,
          },
        ],
      },
    ],
  },

  {
    id: "gnocchi-osobuco",
    categoryId: "pastas",
    name: "Gnocchi de Papa & Osobuco",
    description:
      "Gnocchi artesanales de papa con ragú de osobuco cocido lentamente, vino tinto y parmesano.",
    price: 15800,
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85",
    tags: ["Cocción lenta", "Insignia"],
    prepTime: "16 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "parmesano-gnocchi",
        name: "Terminación",
        type: "single",
        required: true,
        items: [
          {
            id: "parmesano-normal",
            name: "Parmesano",
            priceDelta: 0,
          },
          {
            id: "parmesano-extra-gnocchi",
            name: "Parmesano extra",
            priceDelta: 1200,
          },
        ],
      },
    ],
  },

  {
    id: "lasagna-carne",
    categoryId: "pastas",
    name: "Lasagna de Novillo & Provolone",
    description:
      "Capas de pasta fresca, ragú de novillo, bechamel, provolone fundido y parmesano gratinado.",
    price: 15100,
    image:
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=1200&q=85",
    tags: ["Horno", "Abundante"],
    prepTime: "18 min",
    isFeatured: true,
  },

  

  // =========================================================
  // 04. FUEGOS & CARNES
  // =========================================================

  {
    id: "ojo-de-bife",
    categoryId: "fuegos",
    name: "Ojo de Bife Madurado (400g)",
    description:
      "Corte de pastura con 30 días de maduración en seco. Asado a la brasa viva de quebracho con manteca de hierbas y sal marina.",
    price: 26500,
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=85",
    tags: ["Dry-Aged", "Insignia"],
    prepTime: "22 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "punto",
        name: "Punto de cocción",
        type: "single",
        required: true,
        items: [
          {
            id: "jugoso",
            name: "Jugoso (Rojo brillante, tibio)",
            priceDelta: 0,
          },
          {
            id: "a-punto",
            name: "A punto (Rosado y tierno)",
            priceDelta: 0,
          },
          {
            id: "cocido",
            name: "Cocido (Sin tonos rosados)",
            priceDelta: 0,
          },
        ],
      },
      {
        id: "guarnicion",
        name: "Guarnición incluida",
        type: "single",
        required: true,
        items: [
          {
            id: "pure-ahumado",
            name: "Puré de papas ahumado con manteca",
            priceDelta: 0,
          },
          {
            id: "papas-rusticas",
            name: "Papas rústicas al romero",
            priceDelta: 0,
          },
          {
            id: "ensalada-rucula",
            name: "Rúcula y lascas de parmesano",
            priceDelta: 0,
          },
        ],
      },
      {
        id: "extras-carne",
        name: "Salsas y extras",
        type: "multiple",
        items: [
          {
            id: "chimi-hierbas",
            name: "Chimichurri fresco de la casa",
            priceDelta: 800,
          },
          {
            id: "salsa-malbec",
            name: "Reducción de Malbec",
            priceDelta: 1400,
          },
        ],
      },
    ],
  },

  {
    id: "costillar-braseado",
    categoryId: "fuegos",
    name: "Costillar Braseado al Malbec (12 hs)",
    description:
      "Costilla de novillo cocida a baja temperatura hasta desarmarse en fondo de cocción reducido con vino tinto y zanahorias glaseadas.",
    price: 24800,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    tags: ["Cocción 12 hs", "Insignia"],
    prepTime: "18 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "guarnicion-asado",
        name: "Guarnición incluida",
        type: "single",
        required: true,
        items: [
          {
            id: "pure-boniato",
            name: "Puré rústico de boniato y miel",
            priceDelta: 0,
          },
          {
            id: "papas-romero-asado",
            name: "Papas rústicas crocantes",
            priceDelta: 0,
          },
        ],
      },
    ],
  },

  {
    id: "bife-chorizo",
    categoryId: "fuegos",
    name: "Bife de Chorizo Angus (450g)",
    description:
      "Corte Angus de gran marmoleo, marcado en hierro y terminado sobre brasas de quebracho.",
    price: 25800,
    image:
      "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=1200&q=85",
    tags: ["Angus", "Brasa"],
    prepTime: "21 min",
    optionGroups: [
      {
        id: "punto-bife",
        name: "Punto de cocción",
        type: "single",
        required: true,
        items: [
          {
            id: "jugoso-bife",
            name: "Jugoso",
            priceDelta: 0,
          },
          {
            id: "punto-bife",
            name: "A punto",
            priceDelta: 0,
          },
          {
            id: "cocido-bife",
            name: "Cocido",
            priceDelta: 0,
          },
        ],
      },
      {
        id: "guarnicion-bife",
        name: "Guarnición",
        type: "single",
        required: true,
        items: [
          {
            id: "papas-romero-bife",
            name: "Papas al romero",
            priceDelta: 0,
          },
          {
            id: "pure-bife",
            name: "Puré de papa ahumado",
            priceDelta: 0,
          },
          {
            id: "verduras-brasa-bife",
            name: "Vegetales a la brasa",
            priceDelta: 900,
          },
        ],
      },
    ],
  },

  {
    id: "entraña-brasa",
    categoryId: "fuegos",
    name: "Entraña a la Brasa",
    description:
      "Entraña tierna cocinada a fuego vivo, salsa criolla fresca, chimichurri y papas crujientes.",
    price: 22900,
    image:
      "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?auto=format&fit=crop&w=1200&q=85",
    tags: ["Brasa", "Corte argentino"],
    prepTime: "19 min",
    optionGroups: [
      {
        id: "guarnicion-entrania",
        name: "Guarnición",
        type: "single",
        required: true,
        items: [
          {
            id: "papas-entrania",
            name: "Papas rústicas",
            priceDelta: 0,
          },
          {
            id: "ensalada-entrania",
            name: "Ensalada fresca",
            priceDelta: 0,
          },
        ],
      },
      {
        id: "salsas-entrania",
        name: "Salsas",
        type: "multiple",
        items: [
          {
            id: "chimi-entrania",
            name: "Chimichurri",
            priceDelta: 800,
          },
          {
            id: "criolla-entrania",
            name: "Salsa criolla",
            priceDelta: 700,
          },
        ],
      },
    ],
  },

  {
    id: "pollo-brasa",
    categoryId: "fuegos",
    name: "Pollo Orgánico al Limón y Hierbas",
    description:
      "Suprema y pata-muslo de pollo orgánico marinados con limón, ajo y hierbas, terminados a la brasa.",
    price: 17400,
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=85",
    tags: ["Ligero", "Brasa"],
    prepTime: "18 min",
    optionGroups: [
      {
        id: "guarnicion-pollo",
        name: "Guarnición",
        type: "single",
        required: true,
        items: [
          {
            id: "pure-pollo",
            name: "Puré de papa",
            priceDelta: 0,
          },
          {
            id: "vegetales-pollo",
            name: "Vegetales grillados",
            priceDelta: 700,
          },
        ],
      },
    ],
  },

  {
    id: "salmon-brasa",
    categoryId: "fuegos",
    name: "Salmón del Atlántico a la Brasa",
    description:
      "Lomo de salmón grillado con manteca de limón, vegetales de estación y salsa fresca de hierbas.",
    price: 23900,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=85",
    tags: ["Pescado", "Brasa"],
    prepTime: "17 min",
    optionGroups: [
      {
        id: "guarnicion-salmon",
        name: "Guarnición",
        type: "single",
        required: true,
        items: [
          {
            id: "pure-salmon",
            name: "Puré de coliflor",
            priceDelta: 0,
          },
          {
            id: "ensalada-salmon",
            name: "Ensalada de hojas verdes",
            priceDelta: 0,
          },
        ],
      },
    ],
  },

  {
    id: "bondiola-lenta",
    categoryId: "fuegos",
    name: "Bondiola Braseada 8 hs",
    description:
      "Bondiola de cerdo cocida lentamente en cerveza negra, mostaza antigua, miel y especias.",
    price: 19800,
    image:
      "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=1200&q=85",
    tags: ["Cocción lenta"],
    prepTime: "16 min",
    optionGroups: [
      {
        id: "guarnicion-bondiola",
        name: "Guarnición",
        type: "single",
        required: true,
        items: [
          {
            id: "pure-bondiola",
            name: "Puré de boniato",
            priceDelta: 0,
          },
          {
            id: "papas-bondiola",
            name: "Papas rústicas",
            priceDelta: 0,
          },
        ],
      },
      {
        id: "salsa-bondiola",
        name: "Terminación",
        type: "multiple",
        items: [
          {
            id: "extra-mostaza",
            name: "Mostaza antigua extra",
            priceDelta: 600,
          },
          {
            id: "extra-miel",
            name: "Miel especiada",
            priceDelta: 500,
          },
        ],
      },
    ],
  },

  {
    id: "tabla-fuegos",
    categoryId: "fuegos",
    name: "Tabla de Fuegos para Compartir",
    description:
      "Selección de ojo de bife, entraña, bondiola, chorizo criollo, papas, vegetales y salsas de la casa.",
    price: 49900,
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=85",
    tags: ["Para compartir", "2 a 3 personas"],
    prepTime: "30 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "tabla-punto",
        name: "Punto de las carnes",
        type: "single",
        required: true,
        items: [
          {
            id: "tabla-punto-jugoso",
            name: "Jugoso",
            priceDelta: 0,
          },
          {
            id: "tabla-punto",
            name: "A punto",
            priceDelta: 0,
          },
          {
            id: "tabla-punto-cocido",
            name: "Cocido",
            priceDelta: 0,
          },
        ],
      },
      {
        id: "tabla-extras",
        name: "Extras",
        type: "multiple",
        items: [
          {
            id: "chori-extra",
            name: "Chorizo criollo extra",
            priceDelta: 2200,
          },
          {
            id: "papas-extra-tabla",
            name: "Porción de papas extra",
            priceDelta: 2600,
          },
        ],
      },
    ],
  },

  // =========================================================
  // 05. HAMBURGUESAS
  // =========================================================

  {
    id: "smash-royale",
    categoryId: "burgers",
    name: "Smash Royale Clásica",
    description:
      "Doble medallón smash de novillo (180g), cuádruple cheddar madurado, panceta ahumada al quebracho, cebolla crispy y salsa Dijon en pan brioche.",
    price: 13900,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85",
    tags: ["La Más Pedida"],
    prepTime: "15 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "tamano-carne",
        name: "Medallones de carne",
        type: "single",
        required: true,
        items: [
          {
            id: "doble-180g",
            name: "Doble medallón smash (180g)",
            priceDelta: 0,
          },
          {
            id: "triple-270g",
            name: "Triple medallón smash (270g)",
            priceDelta: 2900,
          },
        ],
      },
      {
        id: "guarnicion-burger",
        name: "Acompañamiento",
        type: "single",
        required: true,
        items: [
          {
            id: "papas-clasicas",
            name: "Papas rústicas",
            priceDelta: 0,
          },
          {
            id: "papas-cheddar-bacon",
            name: "Papas con cheddar y bacon",
            priceDelta: 2400,
          },
        ],
      },
      {
        id: "adicionales-burger",
        name: "Ingredientes adicionales",
        type: "multiple",
        items: [
          {
            id: "extra-bacon-b",
            name: "Extra panceta crocante",
            priceDelta: 1800,
          },
          {
            id: "extra-cheddar-b",
            name: "Extra queso cheddar fundido",
            priceDelta: 1500,
          },
          {
            id: "huevo-burger",
            name: "Huevo a la plancha",
            priceDelta: 1200,
          },
        ],
      },
      {
        id: "quitar-ingredientes-burger",
        name: "Quitar ingredientes",
        type: "multiple",
        items: [
          {
            id: "sin-cebolla",
            name: "Sin cebolla crispy",
            priceDelta: 0,
          },
          {
            id: "sin-panceta",
            name: "Sin panceta",
            priceDelta: 0,
          },
          {
            id: "sin-mostaza",
            name: "Sin salsa Dijon",
            priceDelta: 0,
          },
        ],
      },
    ],
  },

  {
    id: "burger-trufada",
    categoryId: "burgers",
    name: "Bacon & Hongos Confitados",
    description:
      "Medallón grueso de 200g, gírgolas y portobellos confitados en manteca noisette, provolone fundido y emulsión de alioli negro.",
    price: 15400,
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&q=85",
    tags: ["Edición limitada"],
    prepTime: "18 min",
    optionGroups: [
      {
        id: "punto-burger-trufada",
        name: "Punto de cocción",
        type: "single",
        required: true,
        items: [
          {
            id: "punto-jugosa",
            name: "Jugosa",
            priceDelta: 0,
          },
          {
            id: "punto-cocida",
            name: "Bien cocida",
            priceDelta: 0,
          },
        ],
      },
      {
        id: "quitar-trufada",
        name: "Modificaciones",
        type: "multiple",
        items: [
          {
            id: "sin-alioli-negro",
            name: "Sin emulsión de alioli",
            priceDelta: 0,
          },
          {
            id: "sin-hongos",
            name: "Sin hongos",
            priceDelta: 0,
          },
        ],
      },
    ],
  },

  {
    id: "crispy-chicken",
    categoryId: "burgers",
    name: "Nashville Hot Crispy Chicken",
    description:
      "Pechuga marinada en buttermilk, rebozado crocante, coleslaw morado, salsa tártara y pickles agridulces.",
    price: 12800,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=85",
    tags: ["Toque picante"],
    prepTime: "15 min",
    optionGroups: [
      {
        id: "nivel-picante",
        name: "Nivel de picor",
        type: "single",
        required: true,
        items: [
          {
            id: "picante-clasico",
            name: "Picante Nashville medio",
            priceDelta: 0,
          },
          {
            id: "picante-extra",
            name: "Fuego intenso",
            priceDelta: 0,
          },
          {
            id: "sin-picante",
            name: "Suave / cero picante",
            priceDelta: 0,
          },
        ],
      },
      {
        id: "quitar-chicken",
        name: "Quitar ingredientes",
        type: "multiple",
        items: [
          {
            id: "sin-pickles",
            name: "Sin pickles",
            priceDelta: 0,
          },
          {
            id: "sin-coleslaw",
            name: "Sin coleslaw",
            priceDelta: 0,
          },
          {
            id: "sin-tartara",
            name: "Sin salsa tártara",
            priceDelta: 0,
          },
        ],
      },
    ],
  },

  {
    id: "blue-cheese-burger",
    categoryId: "burgers",
    name: "Blue Cheese & Onion Jam",
    description:
      "Doble medallón smash, queso azul, mermelada de cebolla al Malbec, rúcula y mayonesa de pimienta negra.",
    price: 14900,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=85",
    tags: ["Intensa", "Autor"],
    prepTime: "16 min",
    optionGroups: [
      {
        id: "blue-extras",
        name: "Extras",
        type: "multiple",
        items: [
          {
            id: "extra-blue",
            name: "Extra queso azul",
            priceDelta: 1500,
          },
          {
            id: "extra-onion-jam",
            name: "Extra cebolla al Malbec",
            priceDelta: 800,
          },
        ],
      },
    ],
  },

  {
    id: "burger-pollo-grill",
    categoryId: "burgers",
    name: "Chicken Garden Burger",
    description:
      "Pollo grillado, provolone, rúcula, tomate, cebolla morada y mayonesa de hierbas sobre brioche tostado.",
    price: 12600,
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1200&q=85",
    tags: ["Pollo", "Ligera"],
    prepTime: "14 min",
    optionGroups: [
      {
        id: "extras-chicken-burger",
        name: "Adicionales",
        type: "multiple",
        items: [
          {
            id: "extra-provolone",
            name: "Extra provolone",
            priceDelta: 1400,
          },
          {
            id: "extra-pollo",
            name: "Doble porción de pollo",
            priceDelta: 2800,
          },
        ],
      },
    ],
  },

  // =========================================================
  // 06. PIZZAS & MASA MADRE
  // =========================================================

  {
    id: "pizza-margherita",
    categoryId: "pizzas",
    name: "Margherita de Masa Madre",
    description:
      "Tomate italiano, mozzarella fior di latte, albahaca fresca y oliva extra virgen sobre masa de fermentación lenta.",
    price: 12500,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=85",
    tags: ["Vegetariana", "Clásica"],
    prepTime: "12 min",
    optionGroups: [
      {
        id: "extras-margherita",
        name: "Extras",
        type: "multiple",
        items: [
          {
            id: "burrata-pizza",
            name: "Burrata",
            priceDelta: 3200,
          },
          {
            id: "prosciutto-pizza",
            name: "Prosciutto crudo",
            priceDelta: 2900,
          },
        ],
      },
    ],
  },

  {
    id: "pizza-diavola",
    categoryId: "pizzas",
    name: "Diavola Picante",
    description:
      "Tomate, mozzarella, pepperoni picante, nduja, ají seco y miel picante de la casa.",
    price: 14900,
    image:
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1200&q=85",
    tags: ["Picante"],
    prepTime: "13 min",
    optionGroups: [
      {
        id: "picante-pizza",
        name: "Nivel de picante",
        type: "single",
        required: true,
        items: [
          {
            id: "medio-picante-pizza",
            name: "Picante medio",
            priceDelta: 0,
          },
          {
            id: "fuego-pizza",
            name: "Muy picante",
            priceDelta: 0,
          },
        ],
      },
    ],
  },

  {
    id: "pizza-hongos",
    categoryId: "pizzas",
    name: "Hongos, Provolone & Romero",
    description:
      "Mozzarella, hongos de estación, provolone, romero fresco, ajo confitado y aceite de oliva.",
    price: 14500,
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85",
    tags: ["Vegetariana"],
    prepTime: "13 min",
    optionGroups: [
      {
        id: "extras-hongos-pizza",
        name: "Extras",
        type: "multiple",
        items: [
          {
            id: "trufa-pizza",
            name: "Aceite de trufa",
            priceDelta: 2200,
          },
          {
            id: "burrata-hongos-pizza",
            name: "Burrata",
            priceDelta: 3200,
          },
        ],
      },
    ],
  },

  {
    id: "pizza-jamon",
    categoryId: "pizzas",
    name: "Jamón Crudo, Rúcula & Burrata",
    description:
      "Mozzarella, jamón crudo, rúcula fresca, burrata cremosa y reducción balsámica.",
    price: 16900,
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85",
    tags: ["Insignia"],
    prepTime: "14 min",
    isFeatured: true,
  },

  {
    id: "pizza-carne",
    categoryId: "pizzas",
    name: "Provolone, Carne & Chimichurri",
    description:
      "Mozzarella, provolone, roast beef laminado, cebolla caramelizada y chimichurri fresco.",
    price: 15800,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85",
    tags: ["Carnívora"],
    prepTime: "14 min",
  },

  // =========================================================
  // 07. CERVEZAS & BARRA
  // =========================================================

  {
    id: "cerveza-ipa",
    categoryId: "drinks",
    name: "IPA de la Costa (Pinta 500 ml)",
    description:
      "Cerveza tirada de producción local con Citra y Mosaic, perfil tropical cítrico y amargor limpio.",
    price: 5400,
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=1200&q=85",
    tags: ["Tirada"],
    prepTime: "2 min",
  },

  

  {
    id: "gin-botanico",
    categoryId: "drinks",
    name: "Gin Tonic Botánico de la Casa",
    description:
      "Gin artesanal con enebro patagónico y cítricos de estación, tónica premium, hibisco y romero flameado.",
    price: 7800,
    image:
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=1200&q=85",
    tags: ["Coctelería"],
    prepTime: "4 min",
    optionGroups: [
      {
        id: "perfil-aromatico",
        name: "Perfil de botánicos",
        type: "single",
        required: true,
        items: [
          {
            id: "citrico",
            name: "Cítrico (Pomelo rosado y romero)",
            priceDelta: 0,
          },
          {
            id: "frutos-rojos",
            name: "Frutos rojos y flor de hibisco",
            priceDelta: 0,
          },
          {
            id: "pepino",
            name: "Fresco (Pepino y pimienta rosa)",
            priceDelta: 0,
          },
        ],
      },
    ],
  },

  {
    id: "negroni-casa",
    categoryId: "drinks",
    name: "Negroni de la Casa",
    description:
      "Gin, vermut rojo y bitter italiano, perfumado con piel de naranja y una mezcla aromática propia.",
    price: 7200,
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85",
    tags: ["Clásico"],
    prepTime: "4 min",
  },

  {
    id: "whiskey-old-fashioned",
    categoryId: "drinks",
    name: "Old Fashioned de Roble",
    description:
      "Bourbon, bitter aromático, almíbar demerara y piel de naranja servido sobre hielo grande.",
    price: 7900,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=85",
    tags: ["Whisky", "Clásico"],
    prepTime: "5 min",
  },

  {
    id: "vino-malbec",
    categoryId: "drinks",
    name: "Malbec Selección de la Casa",
    description:
      "Malbec argentino de perfil frutado, especiado y estructura media. Copa de 150 ml.",
    price: 6200,
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85",
    tags: ["Vino", "Copa"],
    prepTime: "2 min",
  },

  {
    id: "vermut-tonica",
    categoryId: "drinks",
    name: "Vermut Rosso & Tónica",
    description:
      "Vermut rosso, tónica seca, naranja, romero y un toque de bitter de hierbas.",
    price: 5700,
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=85",
    tags: ["Aperitivo"],
    prepTime: "3 min",
  },

  // =========================================================
  // 08. FINAL DULCE
  // =========================================================

  {
    id: "cheesecake-bosque",
    categoryId: "desserts",
    name: "New York Cheesecake & Coulis",
    description:
      "Tarta horneada a baja temperatura sobre base crocante de manteca y almendras, con reducción de frambuesas y moras.",
    price: 7600,
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=85",
    tags: ["Casero"],
    prepTime: "5 min",
  },

  {
    id: "volcan-chocolate",
    categoryId: "desserts",
    name: "Volcán Belga & Helado de Pistacho",
    description:
      "Bizcocho tibio de chocolate 70% cacao con centro líquido fundente, helado artesanal y praliné crocante.",
    price: 8200,
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=1200&q=85",
    tags: ["Tibio", "Insignia"],
    prepTime: "12 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "helado-acompanante",
        name: "Sabor del helado incluido",
        type: "single",
        required: true,
        items: [
          {
            id: "helado-pistacho",
            name: "Pistacho tostado",
            priceDelta: 0,
          },
          {
            id: "helado-crema",
            name: "Crema americana clásica",
            priceDelta: 0,
          },
          {
            id: "helado-vainilla",
            name: "Vainilla de Madagascar",
            priceDelta: 500,
          },
        ],
      },
    ],
  },

  {
    id: "tiramisu-casa",
    categoryId: "desserts",
    name: "Tiramisú de la Casa",
    description:
      "Bizcochos embebidos en café, crema de mascarpone, cacao amargo y chocolate rallado.",
    price: 7400,
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=85",
    tags: ["Clásico"],
    prepTime: "5 min",
  },

  {
    id: "panna-cotta",
    categoryId: "desserts",
    name: "Panna Cotta de Vainilla",
    description:
      "Panna cotta cremosa de vainilla natural, coulis de frutos rojos y pistachos caramelizados.",
    price: 7100,
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=85",
    tags: ["Suave", "Fresco"],
    prepTime: "5 min",
  },


  {
    id: "affogato",
    categoryId: "desserts",
    name: "Affogato al Café",
    description:
      "Helado artesanal de vainilla bañado al momento con espresso doble y crocante de almendras.",
    price: 6400,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",
    tags: ["Café", "Italiano"],
    prepTime: "4 min",
  },

  {
    id: "tabla-dulce",
    categoryId: "desserts",
    name: "Tabla Dulce para Compartir",
    description:
      "Selección de mini porciones de cheesecake, brownie, tiramisú, frutas, dulce de leche y helado.",
    price: 14900,
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=85",
    tags: ["Para compartir"],
    prepTime: "7 min",
    isFeatured: true,
  },
];