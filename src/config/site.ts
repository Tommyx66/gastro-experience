// src/config/site.ts — ARCHITECT SHOWCASE
export const siteConfig = {
  name: "Residence 01",
  nombre: "Residence 01",
  tagline: "Living Architecture",
  description:
    "Una experiencia digital cinematográfica para presentar el proyecto como se merece.",
  logo: "/logo.svg", // reemplazá por tu isotipo/wordmark
  favicon: "/favicon/favicon.ico",

  footer: {
    imagenFondo: "/render/casa-poster.jpg",
    descripcion:
      "Una experiencia digital para presentar el proyecto tal como merece ser visto.",
  },

  colores: {
    fondoOscuro: "#0A0A0A",
    fondoOscuro2: "#121212",
    fondo: "#F5F5F2",
    claro: "#F5F5F2",
    blanco: "#FFFFFF",
    acento: "#C9B38D", // dorado/arena, sin naranja ni colores fuertes
  },

  nav: {
    cta: "Contactar",
    links: [
      { label: "Inicio", href: "inicio" },
      { label: "Showroom", href: "showroom" },
      { label: "Galería", href: "galeria" },
      { label: "Specs", href: "especificaciones" },
      { label: "Proyecto", href: "proyecto" },
    ],
  },

  hero: {
    eyebrow: "Residence 01",
    tituloPrefix: "Living",
    tituloAccent: "Architecture",
    subtitulo: "Recorré el proyecto como si estuvieras ahí.",
    heroSrc: "/render/gallery_4.jpg",
  },

 cinematic: {
    framesPath: "/render/frames/frame_",
    totalFrames: 556,
    posterSrc: "/render/frames/frame_0001.webp",
    beats: [
      {
        id: "fachada",
        eyebrow: "Fachada Principal",
        titulo: "Diseño que se impone",
        descripcion:
          "Líneas puras, hormigón visto y ventanales de piso a techo que diluyen el límite entre el interior y la naturaleza.",
        start: 0,
        end: 0.20,
      },
      {
        id: "living",
        eyebrow: "Espacios Comunes",
        titulo: "Luz en cada ambiente",
        start: 0.22,
        end: 0.42,
      },
      {
        id: "dormitorio",
        eyebrow: "Suite Principal",
        titulo: "Materialidad cálida",
        descripcion:
          "Madera natural y detalles de categoría para una experiencia de descanso superior.",
        start: 0.44,
        end: 0.64,
      },
      {
        id: "entorno",
        eyebrow: "Ubicación",
        titulo: "Integración Natural",
        descripcion:
          "Diseñada para convivir en perfecta armonía con su bosque circundante.",
        start: 0.66,
        end: 0.83,
      },
      {
        id: "brief",
        eyebrow: "Project Identity",
        titulo: "Ficha Técnica",
        start: 0.85, // Aparece justo cuando el video termina de moverse
        end: 1.0,    // Se mantiene durante el resto del "scroll muerto"
        posicion: "centro",
      },
    ],
  },
  gallery: [
    { id: "g1", src: "/render/gallery_1.jpg", title: "Fachada Norte" },
    { id: "g2", src: "/render/gallery_2.jpg", title: "Living Room" },
    { id: "g3", src: "/render/gallery_3.jpg", title: "Cocina" },
    { id: "g4", src: "/render/gallery_4.jpg", title: "Piscina Infinita" },
  ],
  projectBrief: [
    { label: "Tipología", value: "Vivienda Unifamiliar" },
    { label: "Intervención", value: "Obra Nueva" },
    { label: "Ubicación", value: "Provincia de Buenos Aires" },
    { label: "Superficie", value: "450 m²" },
    { label: "Estado", value: "Proyecto Construido" },
  ],

  nextProject: {
    eyebrow: "Descubrí",
    title: "Casa Bosque",
    image: "/next-project.jpg", 
  },
  technical: {
    stats: [
      { label: "Superficie Cubierta", value: "450", unit: "M²" },
      { label: "Superficie Lote", value: "1200", unit: "M²" },
      { label: "Habitaciones en Suite", value: "04", unit: "UN" },
      { label: "Año de Proyecto", value: "2026", unit: "YR" },
    ],
    materials: [
      {
        name: "Hormigón Visto",
        type: "Estructural",
        desc: "Encofrado de tabla de pino que imprime la textura de la madera en la fachada.",
        img: "/render/detalle1.jpg", // Reemplazá por foto de hormigón
      },
      {
        name: "Acero Corten",
        type: "Revestimiento",
        desc: "Paneles oxidados naturalmente que cambian de tonalidad según el clima.",
        img: "/render/detalle2.jpg", // Reemplazá por foto de acero
      },
      {
        name: "Nogal Oscuro",
        type: "Interiorismo",
        desc: "Listones macizos en cielorrasos para aportar calidez acústica y visual.",
        img: "/render/detalle3.jpg", // Reemplazá por foto de madera
      },
    ],
    planos: {
      vista: "/render/vista-lateral.png",
      corte: "/render/corte-lateral.png",
      planta: "/render/planta.png",
    },
  },

  whatsapp: {
    numero: "5492266XXXXXX",
    mensajeDefault: "Hola, quiero coordinar una visita al proyecto.",
    labelBoton: "Agendar Visita",
  },

  contacto: {
    email: "tomz.ry64@gmail.com",
    whatsappDisplay: "+54 9 2266 XX-XXXX",
  },

  // ── PROYECTO (reemplaza History) ────────────────────────────
  project: {
    imagenFondo: "/render/casa-poster.jpg",
    eyebrow: "El Estudio",
    anio: "2026",
    descripcion1:
      "Residence 01 nace de una premisa simple: que la arquitectura y la luz natural definan cada ambiente, sin excesos ni ornamentos innecesarios.",
    descripcion2:
      "El seguimiento de obra fue documentado paso a paso, priorizando el respeto por el entorno natural y la integración topográfica.",
    // AHORA SON OBJETOS CON DATOS PARA EL LIGHTBOX
    galeriaObra: [
      {
        src: "/render/detalle1.jpg",
        titulo: "Fundaciones",
        fecha: "OCT 2024",
        nota: "Hormigonado de platea principal y muros de contención.",
      },
      {
        src: "/render/detalle2.jpg",
        titulo: "Estructura Superior",
        fecha: "DIC 2024",
        nota: "Armado de encofrados para losa de voladizo.",
      },
      {
        src: "/render/detalle3.jpg",
        titulo: "Revestimientos",
        fecha: "FEB 2025",
        nota: "Colocación de fachada en madera de nogal tratada.",
      },
      {
        src: "/render/detalle4.jpg",
        titulo: "Aberturas",
        fecha: "ABR 2025",
        nota: "Instalación de ventanales de piso a techo con DVH.",
      },
    ],
    statLabel1: "Entrega estimada",
    statValue2: "180",
    statLabel2: "m² cubiertos",
  },

  // ── CONTACT (form) ───────────────────────────────────────────
  contact: {
    eyebrow: "Agendá tu visita",
    titulo: "Conocé el proyecto en persona",
    etiquetaDireccion: "Zona",
    formTitulo: "Coordinemos una visita guiada",
    formSubtitulo:
      "Dejanos tus datos y te contactamos para coordinar el mejor horario.",
    labelMensaje: "Contanos qué buscás",
    botonEnviar: "Enviar Consulta",
    placeholderMensaje: "Quiero coordinar una visita al proyecto.",
    whatsapp: "5492266XXXXXX",
  },

  // ── CTA TRANSITION ───────────────────────────────────────────
  ctaTransition: {
    tituloLinea1: "Vení a",
    tituloLinea2: "conocerlo.",
    descripcion:
      "Coordinamos una visita guiada al proyecto, sin vueltas y a tu horario.",
    botonEtiqueta: "Agendar por WhatsApp",
  },
metadata: {
    url: "https://architect-showcase-two.vercel.app", // Reemplazá por tu dominio final
    ogImage: "/render/casa-poster.jpg", // La foto que querés que se vea en el preview
  },
} as const;


export type SiteConfig = typeof siteConfig;
