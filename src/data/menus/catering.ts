import type { MenuCategory, MenuProduct } from "@/data/menu";

export const cateringCategories: MenuCategory[] = [
  {
    id: "finger-food",
    name: "Finger Food & Recepciones",
    description: "Bocados de pie diseñados para servicio continuo en bandejas de pase durante cocktails y lanzamientos.",
  },
  {
    id: "live-stations",
    name: "Estaciones Gastronómicas en Vivo",
    description: "Puestos interactivos donde chefs elaboran y emplatan frente a los invitados durante el evento.",
  },
  {
    id: "lunch-boxes",
    name: "Boxes Corporativos Individuales",
    description: "Almuerzos y desayunos individuales premium en packaging isotérmico biodegradable para jornadas laborales.",
  },
  {
    id: "sweet-table",
    name: "Mesa Dulce & Petit Fours",
    description: "Bocados de pastelería contemporánea, verrines y macarons para el cierre del servicio.",
  },
];

export const cateringProducts: MenuProduct[] = [
  // FINGER FOOD
  {
    id: "pack-finger-food-24",
    categoryId: "finger-food",
    name: "Selección Cocktail Finger Food (24 bocados)",
    description: "Bruschettas de burrata con tomate reliquia, mini brioche de pastrami curado y cucharitas de salmón gravlax.",
    price: 28500,
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=1200&q=85",
    tags: ["Para 4 comensales", "Cocktail"],
    prepTime: "20 min",
    isFeatured: true,
  },
  {
    id: "mini-brioches-beef",
    categoryId: "finger-food",
    name: "Mini Brioches de Roast Beef & Dijón (12u)",
    description: "Pan brioche artesanal dorado con manteca, láminas finas de roast beef al punto, rúcula y emulsión de mostaza en grano.",
    price: 19800,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=85",
    tags: ["Finger Food"],
    prepTime: "18 min",
  },
  {
    id: "bruschettas-mediterraneas",
    categoryId: "finger-food",
    name: "Bruschettas de Focaccia & Burrata (16u)",
    description: "Cubos de focaccia al romero tostados con burrata cremosa, tomates confitados al quebracho y brotes orgánicos.",
    price: 17400,
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=1200&q=85",
    tags: ["Vegetariano"],
    prepTime: "16 min",
  },

  // LIVE STATIONS
  {
    id: "station-pasta-parmigiano",
    categoryId: "live-stations",
    name: "Estación de Pastas en Rueda de Parmesano",
    description: "Pasta fresca artesanal al dente terminada en vivo dentro de una rueda de queso parmesano con reducción de trufas y pimienta.",
    price: 34000,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
    tags: ["Live Cooking", "Cotización por persona"],
    prepTime: "30 min",
    isFeatured: true,
    optionGroups: [
      {
        id: "variedad-pasta",
        name: "Tipo de pasta fresca",
        type: "single",
        required: true,
        items: [
          { id: "fettuccine", name: "Fettuccine al huevo", priceDelta: 0 },
          { id: "gnocchi-souffle", name: "Gnocchi soufflé de papa", priceDelta: 1800 },
        ],
      },
    ],
  },
  {
    id: "station-mini-smash",
    categoryId: "live-stations",
    name: "Estación de Mini Smash Sliders",
    description: "Chef cocinando en vivo sliders gourmet de novillo sobre plancha caliente con cheddar y panes brioche dorados al momento.",
    price: 29500,
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=85",
    tags: ["Live Cooking"],
    prepTime: "30 min",
  },

  // LUNCH BOXES
  {
    id: "box-roast-beef-catering",
    categoryId: "lunch-boxes",
    name: "Lunch Box Roast Beef & Vegetales Glaseados",
    description: "Menú individual con láminas de roast beef frío, papines al romero, mix de verdes con vinagreta y postre individual.",
    price: 18900,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    tags: ["Box individual", "Corporativo"],
    prepTime: "25 min",
    isFeatured: true,
  },
  {
    id: "box-salmon-quinoa",
    categoryId: "lunch-boxes",
    name: "Lunch Box Salmón Gravlax & Quinoa",
    description: "Salmón curado con eneldo, ensalada tibia de quinoa con palta y brotes, y postre de chocolate amargo.",
    price: 21500,
    image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=85",
    tags: ["Box individual", "Saludable"],
    prepTime: "25 min",
  },

  // SWEET TABLE
  {
    id: "sweet-table-signature",
    categoryId: "sweet-table",
    name: "Mesa Dulce Signature & Macarons (36 bocados)",
    description: "Verrines de mousse de chocolate belga, mini tarteletas de frambuesa fresca, macarons franceses y trufas al cacao amargo.",
    price: 26800,
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1200&q=85",
    tags: ["Mesa dulce", "36 bocados"],
    prepTime: "20 min",
    isFeatured: true,
  },
  {
    id: "caja-macarons-trufas",
    categoryId: "sweet-table",
    name: "Caja de Macarons & Trufas (18u)",
    description: "Surtido de macarons de pistacho, chocolate y frambuesa con trufas artesanales para regalos corporativos o café de cierre.",
    price: 15400,
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=1200&q=85",
    tags: ["Petit Fours"],
    prepTime: "15 min",
  },
];