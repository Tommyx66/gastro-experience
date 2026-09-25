import type { GastroPreset } from "./types";

import {
  restaurantCategories,
  restaurantProducts,
} from "@/data/menus/restaurant";

export const restaurantPreset: GastroPreset = {
  id: "restaurant",
  label: "Fuegos & Cocina de Autor",

  theme: {
    mode: "dark",
    accent: "#D4AF37",
    accentStrong: "#F3D882",
    accentContrast: "#080706",

    colors: {
      dark: {
        bg: "#080706",
        bgElevated: "#0F0D0B",
        surface: "#161310",
        surfaceElevated: "#1E1A15",
        surfaceInverse: "#FAF6EF",

        text: "#FAF6EF",
        textMuted: "#C7BFA8",
        textSubtle: "#8A8174",

        accent: "#D4AF37",
        accentStrong: "#F3D882",
        accentContrast: "#080706",

        accentSoft: "rgba(212, 175, 55, 0.15)",
        accentFaint: "rgba(212, 175, 55, 0.07)",
        accentBorder: "rgba(212, 175, 55, 0.38)",

        border: "rgba(250, 246, 239, 0.11)",
        borderStrong: "rgba(250, 246, 239, 0.22)",

        overlay: "rgba(8, 7, 6, 0.92)",
        control: "rgba(250, 246, 239, 0.05)",
        controlHover: "rgba(250, 246, 239, 0.10)",

        success: "#34D399",
        warning: "#F59E0B",
        danger: "#F87171",
      },
      light: {
        bg: "#F8F5EE",
        bgElevated: "#FFFFFF",
        surface: "#FCFAF5",
        surfaceElevated: "#EDE5D6",
        surfaceInverse: "#161310",

        text: "#1C1713",
        textMuted: "#615448",
        textSubtle: "#8E7F71",

        accent: "#9E7B1E",
        accentStrong: "#785C10",
        accentContrast: "#FFFFFF",

        accentSoft: "rgba(158, 123, 30, 0.12)",
        accentFaint: "rgba(158, 123, 30, 0.05)",
        accentBorder: "rgba(158, 123, 30, 0.32)",

        border: "rgba(28, 23, 19, 0.11)",
        borderStrong: "rgba(28, 23, 19, 0.22)",

        overlay: "rgba(248, 245, 238, 0.92)",
        control: "rgba(28, 23, 19, 0.045)",
        controlHover: "rgba(28, 23, 19, 0.085)",

        success: "#059669",
        warning: "#B45309",
        danger: "#DC2626",
      },
    },

    typography: {
      display: "var(--font-display, Georgia, serif)",
      body: "var(--font-sans, Arial, sans-serif)",
      ui: "var(--font-sans, Arial, sans-serif)",
      mono: "var(--font-mono, monospace)",
    },
  },

  visual: {
    navbar: "minimal",
    hero: "cinematic",
    heroStyle: {
      variant: "cinematic",
      imageTreatment: "cinematic",
      overlay: "cinematic",
      composition: "standard",
      ctaShape: "circle",
      grain: false,
      parallax: true,
      intensity: 1,
    },
    menu: "immersive",
    productCard: "photo",
    contact: "map",
    cta: "immersive",
    footer: "editorial",
    story: {
      variant: "fire",
      layout: "marquee",
      imageTreatment: "film",
      cardShape: "poster",
      density: "balanced",
      watermark: true,
      grain: true,
      numbering: true,
      motion: { speed: 0.8, direction: "left", hoverLift: 6, parallax: true, pauseOnHover: true },
    },
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
      name: "FUEGO 45",
      shortName: "Fuego 45",
      descriptor: "Cocina de Brasas & Cava Privada",
      tagline: "Maduración en seco, leña de quebracho y vinos de altura",
      description: "Restaurante nocturno enfocado en cortes dry-aged al quebracho, pastas caseras y cava seleccionada.",
      logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80",
    },

    features: {
      ordering: true,
      delivery: false,
      pickup: true,
      tableOrders: true,
      waiterCall: true,
      reservation: true,
      story: true,
    },

    operation: {
      schedule: "Martes a Domingo · 19:30 a 02:00 hs",
      estimatedTime: {
        delivery: { min: 0, max: 0 },
        pickup: { min: 20, max: 35 },
        table: { min: 15, max: 28 },
      },
    },

    navigation: {
      links: [
        { label: "Inicio", href: "inicio" },
        { label: "La Brasa", href: "historia" },
        { label: "Carta", href: "menu" },
        { label: "Reservas", href: "contacto" },
      ],
      cta: "Reservar Mesa",
    },

    ordering: {
      enabled: true,
      channels: ["web", "table"] as const,
      fulfillment: ["pickup", "onsite"] as const,
      cashDiscountPercent: 10,
      paymentMethods: [
        { id: "cash", label: "Efectivo", requiresProof: false },
        { id: "card", label: "Tarjeta de Crédito / Débito", requiresProof: false },
        { id: "transfer", label: "Transferencia / QR", requiresProof: true },
      ],
      whatsapp: {
        number: "549223000000",
        defaultMessage: "Hola, quisiera consultar por una reserva en Fuego 45.",
        tableOrderMessage: "Hola, envío el pedido de la mesa en Fuego 45.",
        labelCheckout: "Marchar Comanda por WhatsApp",
      },
    },

    contact: {
      address: "Córdoba 2140 (entre Belgrano y Moreno)",
      zone: "Plaza Mitre",
      city: "Mar del Plata",
      country: "Argentina",
      fullAddress: "Córdoba 2140, Mar del Plata, Argentina",
      phone: "+54 9 223 555-0145",
      email: "reservas@fuego45.com",
      instagram: "https://instagram.com",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cordoba+2140+Mar+del+Plata",
      coordinates: {
        lat: -38.005411,
        lng: -57.549222,
        zoom: 16,
        latDisplay: "38°00′19″ S",
        lngDisplay: "57°32′57″ W",
      },
    },

    seo: {
      title: "Fuego 45 | Cocina de Brasas & Cava Privada",
      description: "Carnes con 35 días dry-aged a la leña de quebracho, pastas caseras y cava de altura en Mar del Plata.",
      locale: "es_AR",
    },

    content: {
      hero: {
        eyebrow: "Casco Histórico · Cocina a Fuego Vivo",
        titlePrefix: "Fuego vivo",
        titleAccent: "y producto.",
        subtitle: "Cortes con 35 días de maduración en seco, leña seleccionada y coctelería contemporánea.",
        cta: "Explorar Carta",
        ctaHref: "menu",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=85",
      },

      story: {
        eyebrow: "Mística del Asador",
        watermark: "BRASA",
        titlePrefix: "El fuego",
        titleAccent: "no se apura.",
        sectionTag: "Bitácora de Cocina",
        primaryDescription: "Seleccionamos razas británicas criadas a pastura natural y maduramos cada pieza en cámara propia con humedad controlada.",
        secondaryDescription: "El calor envolvente del quebracho blanco carameliza el exterior sin secar los jugos del corte.",
        backgroundImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=85",
        labels: {
          processLine: "Leña · Maduración · Salón",
          openArchive: "Explorar cocina",
          traceability: "Origen & Maduración",
          closeSheet: "Cerrar Ficha",
        },
        archive: [
          {
            titulo: "Tomahawk en Parrilla Baja",
            subtitulo: "Quebracho Blanco",
            nota: "Sellado directo sobre brasas al rojo vivo y reposo en madera aromatizada con romero.",
            origen: "Cabaña La Tranquera",
            src: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=85",
          },
          {
            titulo: "Cámara Dry-Aged",
            subtitulo: "35 Días de Maduración",
            nota: "Paredes revestidas en sal del Himalaya para mantener el microclima salino perfecto.",
            origen: "Cámara de Fuego 45",
            src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85",
          },
          {
            titulo: "Cava Subterránea",
            subtitulo: "Microterruños de Altura",
            nota: "Selección curada de vinos de parcela de Gualtallary, Paraje Altamira y Pedernal.",
            origen: "Valle de Uco",
            src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85",
          },
          {
            titulo: "La Cocina Abierta",
            subtitulo: "Servicio Nocturno",
            nota: "Iluminación intimista, mesas de madera maciza y el murmullo de la leña ardiendo.",
            origen: "Salón Principal",
            src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
          },
        ],
      },

      ctaTransition: {
        eyebrow: "Experiencia en Mesa",
        titlePrefix: "Reservá tu lugar",
        titleAccent: "junto al fuego.",
        description: "Mesas individuales y espacios para encuentros privados alrededor de la cocina a la vista.",
        buttonText: "Reservar Mesa",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=85",
      },

      footer: {
        backgroundImage: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1920&q=85",
        description: "Fuego 45 · Cocina de Fuegos y Cava Privada",
        credits: "Gastro Engine Core",
      },
    },
  },

  menu: {
    categories: restaurantCategories,
    products: restaurantProducts,
  },
};