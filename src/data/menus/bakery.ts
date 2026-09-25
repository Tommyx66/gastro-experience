import type { MenuCategory, MenuProduct } from "@/data/menu";

export const bakeryCategories: MenuCategory[] = [
  {
    id: "hogazas",
    name: "Hogazas de Masa Madre",
    description: "Fermentación natural en frío de 36 horas, harinas agroecológicas y piso de piedra.",
  },
  {
    id: "viennoiserie",
    name: "Hojaldres & Bollería",
    description: "Laminados franceses con pura manteca de pastura, horneados a primera hora.",
  },
  {
    id: "pasteleria",
    name: "Pastelería de Obrador",
    description: "Tartas de estación, galletas artesanales y preparaciones dulces del día.",
  },
  {
    id: "salado",
    name: "Focaccias & Salados",
    description: "Masas de alta hidratación con oliva virgen extra y rellenos al paso.",
  },
  {
    id: "boxes",
    name: "Boxes & Especiales",
    description: "Cajas surtidas pensadas para desayunos, reuniones y regalos.",
  },
];

export const bakeryProducts: MenuProduct[] = [
  // HOGAZAS
  {
    id: "hogaza-campo-850",
    categoryId: "hogazas",
    name: "Hogaza de Campo (850g)",
    description: "Harina blanca orgánica y centeno integral. Miga abierta, elástica y corteza tostada crocante.",
    price: 6800,
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1200&q=85",
    tags: ["Masa madre 36hs", "Orgánico"],
    prepTime: "2 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "corte-pan",
        name: "Presentación",
        type: "single",
        required: true,
        items: [
          { id: "entera", name: "Pieza entera (mayor conservación)", priceDelta: 0 },
          { id: "rebanada", name: "Rebanada para tostadas", priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: "hogaza-semillas",
    categoryId: "hogazas",
    name: "Hogaza Multisemillas Tostadas",
    description: "Sésamo tostado, lino dorado, chía y girasol hidratados en la masa antes del horneado.",
    price: 7400,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85",
    tags: ["Semillas", "Integral"],
    prepTime: "2 min",
  },
  {
    id: "baguette-tradition",
    categoryId: "hogazas",
    name: "Baguette Tradición Francesa",
    description: "Harina T65 francesa, levado lento en lino y greñado manual. Alvéolos amplios y crujiente.",
    price: 3400,
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7e?auto=format&fit=crop&w=1200&q=85",
    tags: ["Horneada diaria"],
    prepTime: "2 min",
  },

  // VIENNOISERIE
  {
    id: "croissant-manteca",
    categoryId: "viennoiserie",
    name: "Croissant Clásico Francés",
    description: "Laminado artesanal con 27 capas de manteca de pastura nacional y aroma avainillado.",
    price: 3600,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85",
    tags: ["Hojaldre puro", "Insignia"],
    prepTime: "2 min",
    isFeatured: true,
  },
  {
    id: "pain-au-chocolat",
    categoryId: "viennoiserie",
    name: "Pain au Chocolat Belga",
    description: "Masa de croissant rellena con dos barras de chocolate belga semiamargo 60%.",
    price: 4200,
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1200&q=85",
    tags: ["Chocolate belga"],
    prepTime: "2 min",
  },
  {
    id: "cinnamon-roll-bakery",
    categoryId: "viennoiserie",
    name: "Roll de Canela & Glaseado Suave",
    description: "Masa brioche con manteca, enrollada con canela de Ceilán, azúcar rubia y queso crema.",
    price: 4100,
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1200&q=85",
    tags: ["Brioche"],
    prepTime: "2 min",
  },

  // PASTELERÍA
  {
    id: "cookie-sea-salt",
    categoryId: "pasteleria",
    name: "Cookie Chocolate 70% & Sal Marina",
    description: "Galleta con centro húmedo, trozos de chocolate amargo ecuatoriano y escamas de sal marina.",
    price: 3400,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=85",
    tags: ["Chocolatosa"],
    prepTime: "2 min",
  },
  {
    id: "tarta-frutos-rojos",
    categoryId: "pasteleria",
    name: "Tartelette de Frambuesas Frescas",
    description: "Base sableé crocante con almendras, crema pastelera a la vainilla y frambuesas frescas.",
    price: 6200,
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1200&q=85",
    tags: ["Estacional"],
    prepTime: "3 min",
  },

  // SALADO
  {
    id: "focaccia-romero",
    categoryId: "salado",
    name: "Focaccia al Romero & Oliva Virgen Extra",
    description: "Masa esponjosa de fermentación lenta bañada en aceite de oliva virgen extra y romero fresco.",
    price: 5600,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&q=85",
    tags: ["Oliva extra virgen"],
    prepTime: "3 min",
  },
  {
    id: "sandwich-pastrami-bakery",
    categoryId: "salado",
    name: "Sándwich de Pastrami en Pan de Campo",
    description: "Pastrami ahumado casero, queso gruyère fundido, pepinillos en vinagre y mostaza antigua.",
    price: 11800,
    image: "https://images.unsplash.com/photo-1481070414801-51fd732d7184?auto=format&fit=crop&w=1200&q=85",
    tags: ["Almuerzo"],
    prepTime: "8 min",
    isFeatured: true,
  },

  // BOXES
  {
    id: "box-desayuno-obrador",
    categoryId: "boxes",
    name: "Box Desayuno del Obrador",
    description: "2 croissants clásicos, 1 pain au chocolat, 1 hogaza chica de campo, mermelada y manteca de pastura.",
    price: 18500,
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=85",
    tags: ["Para 2 personas"],
    prepTime: "6 min",
  },
];