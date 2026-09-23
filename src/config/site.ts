export type ThemeMode =
  | "dark"
  | "light"
  | "hybrid";

/* =========================================================
   THEME
   ========================================================= */

export interface RestaurantThemeColors {
  bg: string;
  bgElevated: string;

  surface: string;
  surfaceElevated: string;
  surfaceInverse: string;

  text: string;
  textMuted: string;
  textSubtle: string;

  accent: string;
  accentStrong: string;
  accentContrast: string;

  accentSoft: string;
  accentFaint: string;
  accentBorder: string;

  border: string;
  borderStrong: string;

  overlay: string;

  control: string;
  controlHover: string;

  success: string;
  warning: string;
  danger: string;
}

export interface RestaurantTheme {
  mode: ThemeMode;

  colors: RestaurantThemeColors;

  typography: {
    display: string;
    body: string;
    ui: string;
    mono: string;
  };
}

/* =========================================================
   STORY
   ========================================================= */

export interface StoryArchiveItem {
  titulo: string;
  subtitulo: string;
  nota: string;
  origen: string;
  src: string;
}

/* =========================================================
   THEME PROFILES
   ========================================================= */

export const themeProfiles: Record<
  ThemeMode,
  RestaurantThemeColors
> = {
  dark: {
    bg: "#050505",
    bgElevated: "#0A0908",

    surface: "#0E0D0C",
    surfaceElevated: "#171412",
    surfaceInverse: "#F7F4EF",

    text: "#F8F5EF",
    textMuted: "#C8C1B8",
    textSubtle: "#888178",

    accent: "#D4AF37",
    accentStrong: "#F0D77A",
    accentContrast: "#050505",

    accentSoft:
      "rgba(212, 175, 55, 0.14)",

    accentFaint:
      "rgba(212, 175, 55, 0.07)",

    accentBorder:
      "rgba(212, 175, 55, 0.38)",

    border:
      "rgba(255, 255, 255, 0.11)",

    borderStrong:
      "rgba(255, 255, 255, 0.18)",

    overlay:
      "rgba(5, 5, 5, 0.82)",

    control:
      "rgba(255, 255, 255, 0.045)",

    controlHover:
      "rgba(255, 255, 255, 0.09)",

    success: "#34D399",
    warning: "#F59E0B",
    danger: "#F87171",
  },

  light: {
    bg: "#F5F0E8",
    bgElevated: "#FBF9F5",

    surface: "#FFFFFF",
    surfaceElevated: "#EEE8DD",
    surfaceInverse: "#171513",

    text: "#171513",
    textMuted: "#5D574F",
    textSubtle: "#81796F",

    accent: "#9A7418",
    accentStrong: "#76550C",
    accentContrast: "#FFFFFF",

    accentSoft:
      "rgba(154, 116, 24, 0.11)",

    accentFaint:
      "rgba(154, 116, 24, 0.055)",

    accentBorder:
      "rgba(154, 116, 24, 0.32)",

    border:
      "rgba(23, 21, 19, 0.11)",

    borderStrong:
      "rgba(23, 21, 19, 0.2)",

    overlay:
      "rgba(245, 240, 232, 0.88)",

    control:
      "rgba(23, 21, 19, 0.045)",

    controlHover:
      "rgba(23, 21, 19, 0.08)",

    success: "#059669",
    warning: "#B45309",
    danger: "#DC2626",
  },

  hybrid: {
    bg: "#10151A",
    bgElevated: "#131A20",

    surface: "#171F27",
    surfaceElevated: "#1E2A35",
    surfaceInverse: "#F4F1EA",

    text: "#F1EEE6",
    textMuted: "#C5C1B8",
    textSubtle: "#939A9F",

    accent: "#C89B3C",
    accentStrong: "#E6BE66",
    accentContrast: "#12171C",

    accentSoft:
      "rgba(200, 155, 60, 0.15)",

    accentFaint:
      "rgba(200, 155, 60, 0.07)",

    accentBorder:
      "rgba(200, 155, 60, 0.35)",

    border:
      "rgba(241, 238, 230, 0.12)",

    borderStrong:
      "rgba(241, 238, 230, 0.22)",

    overlay:
      "rgba(16, 21, 26, 0.9)",

    control:
      "rgba(241, 238, 230, 0.06)",

    controlHover:
      "rgba(241, 238, 230, 0.1)",

    success: "#34D399",
    warning: "#F59E0B",
    danger: "#F87171",
  },
};

/* =========================================================
   SITE CONFIG
   ========================================================= */

export const siteConfig = {
  /* -------------------------------------------------------
     BRAND
     ------------------------------------------------------- */

  brand: {
    name: "Gastro Experience",

    shortName: "Gastro",

    descriptor: "Bistró & Barra",

    tagline:
      "Cocina de producto, fuegos y coctelería de autor",

    description:
      "Una experiencia gastronómica de alta gama pensada para disfrutarse en salón y a través de canales directos sin intermediarios.",

    logo:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=120&q=80",

    favicon: "/favicon.ico",
  },

  /* -------------------------------------------------------
     THEME
     ------------------------------------------------------- */

  theme: {
    mode: "dark" as ThemeMode,

    typography: {
      display:
        "var(--font-display, Arial, sans-serif)",

      body:
        "var(--font-sans, Arial, sans-serif)",

      ui:
        "var(--font-sans, Arial, sans-serif)",

      mono:
        "var(--font-mono, monospace)",
    },
  },

  /* -------------------------------------------------------
     FEATURES
     ------------------------------------------------------- */

  features: {
    ordering: true,
    delivery: true,
    pickup: true,
    tableOrders: true,
    waiterCall: true,
    reservation: true,
    story: true,
  },

  /* -------------------------------------------------------
     OPERATION
     ------------------------------------------------------- */

  operation: {
    schedule:
      "Miércoles a Domingo · 19:30 a 02:00 hs",

    estimatedTime: {
      delivery: {
        min: 35,
        max: 50,
      },

      pickup: {
        min: 20,
        max: 30,
      },

      table: {
        min: 15,
        max: 25,
      },
    },
  },

  /* -------------------------------------------------------
     NAVIGATION
     ------------------------------------------------------- */

  navigation: {
    links: [
      {
        label: "Inicio",
        href: "inicio",
      },

      {
        label: "Historia",
        href: "historia",
      },

      {
        label: "Menú",
        href: "menu",
      },

      {
        label: "Contacto",
        href: "contacto",
      },
    ],

    cta: "Pedir Carta",
  },

  /* -------------------------------------------------------
     ORDERING
     ------------------------------------------------------- */

  ordering: {
    enabled: true,

    channels: [
      "web",
      "table",
    ] as const,

    fulfillment: [
      "delivery",
      "pickup",
      "onsite",
    ] as const,

    cashDiscountPercent: 10,

    paymentMethods: [
      {
        id: "cash",
        label: "Efectivo",
        requiresProof: false,
      },

      {
        id: "card",
        label: "Tarjeta",
        requiresProof: false,
      },

      {
        id: "transfer",
        label: "Transferencia / QR",
        requiresProof: true,
      },
    ],

    whatsapp: {
      number:
        "549223000000",

      defaultMessage:
        "Hola, quería hacer una consulta sobre la carta.",

      tableOrderMessage:
        "Hola, adjunto el pedido realizado desde la mesa.",

      labelCheckout:
        "Enviar pedido por WhatsApp",
    },
  },

  /* -------------------------------------------------------
     CONTACT DATA
     -------------------------------------------------------
     Información real del establecimiento.
     La UI vive en content.contact.
     ------------------------------------------------------- */

  contact: {
    address:
      "Córdoba 2140 (esq. Belgrano)",

    zone:
      "Zona Centro",

    city:
      "Mar del Plata",

    country:
      "Argentina",

    fullAddress:
      "Córdoba 2140 (esq. Belgrano), Centro, Mar del Plata",

    phone:
      "+54 9 223 555-0192",

    email:
      "contacto@gastroexperience.com",

    instagram:
      "https://instagram.com",

    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Cordoba+2140+Mar+del+Plata",

    coordinates: {
      lat:
        -37.999513,

      lng:
        -57.548981,

      zoom:
        16,

      latDisplay:
        "37°59′58″ S",

      lngDisplay:
        "57°32′56″ W",
    },
  },

  /* -------------------------------------------------------
     SEO
     ------------------------------------------------------- */

  seo: {
    title:
      "Gastro Experience | Cocina de Producto y Barra de Autor",

    description:
      "Cocina de producto, fuegos lentos y coctelería contemporánea en Mar del Plata. Pedidos directos y servicio de salón.",

    locale:
      "es_AR",
  },

  /* =======================================================
     CONTENT
     ======================================================= */

  content: {
    /* -----------------------------------------------------
       HERO
       ----------------------------------------------------- */

    hero: {
      eyebrow:
        "Mar del Plata · Casco Histórico",

      titlePrefix:
        "Sabores",

      titleAccent:
        "auténticos.",

      subtitle:
        "Una propuesta donde la cocina de producto, los fuegos lentos y la identidad de la costa se encuentran en un mismo lugar.",

      cta:
        "Ver menú",

      ctaHref:
        "menu",

      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
    },

    /* -----------------------------------------------------
       STORY
       ----------------------------------------------------- */

    story: {
      eyebrow:
        "Nuestra historia",

      watermark:
        "ORIGEN",

      titlePrefix:
        "El respeto",

      titleAccent:
        "por el proceso.",

      sectionTag:
        "Bitácora de Materia Prima",

      primaryDescription:
        "Una propuesta donde la cocina de producto, los fuegos vivos y la identidad de la costa se encuentran en un mismo espacio.",

      secondaryDescription:
        "Desde el reposo de las masas madre hasta el sellado sobre brasas de quebracho, cada plato responde a un tiempo de elaboración que no se puede apurar.",

      backgroundImage:
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",

      labels: {
        traceability:
          "Trazabilidad",

        closeSheet:
          "Cerrar Ficha",
      },

      archive: [
        {
          titulo:
            "Maduración en Seco",

          subtitulo:
            "Dry Aged 45 Días",

          nota:
            "Cortes seleccionados de novillo descansando a temperatura y humedad controlada para concentrar aromas terrosos y textura mantecosa.",

          origen:
            "Frigorífico de campo, Balcarce",

          src:
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        },

        {
          titulo:
            "Fuego & Quebracho",

          subtitulo:
            "Cocción a la Brasa",

          nota:
            "Leña dura de quebracho y espinillo. El ahumado lento sella los jugos naturales y aporta notas tostadas inconfundibles.",

          origen:
            "Horno de leña propio",

          src:
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        },

        {
          titulo:
            "Lúpulos Patagónicos",

          subtitulo:
            "Doble Dry Hopping",

          nota:
            "Selección de lúpulos Citra y Mosaic incorporados en frío durante la fermentación secundaria para extraer aceites esenciales y perfil cítrico.",

          origen:
            "Valle de Río Negro",

          src:
            "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80",
        },

        {
          titulo:
            "Pan de Masa Madre",

          subtitulo:
            "Fermentación 24hs",

          nota:
            "Harinas agroecológicas, masa madre viva y manteca de pastura. Horneado diario matutino para lograr alvéolos aireados y corteza dorada.",

          origen:
            "Panadería artesanal",

          src:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
        },
      ] as StoryArchiveItem[],
    },

    /* -----------------------------------------------------
       PRODUCT DETAIL
       ----------------------------------------------------- */

    productDetail: {
      fallbackTag:
        "Plato de Autor",

      options: {
        required:
          "Elegí 1",

        optional:
          "Opcional",

        requiredMark:
          "*",

        personalized:
          "Personalización",
      },

      notes: {
        label:
          "Instrucciones o aclaraciones",

        placeholder:
          "Ej. salsa aparte, sin sal, punto de carne...",
      },

      actions: {
        add:
          "Sumar",

        added:
          "Agregado",

        chooseRequired:
          "Seleccioná opciones requeridas",

        decreaseQuantity:
          "Disminuir cantidad",

        increaseQuantity:
          "Aumentar cantidad",

        close:
          "Cerrar detalle",
      },
    },

    /* -----------------------------------------------------
       CART
       ----------------------------------------------------- */

    cart: {
      eyebrow:
        "Comanda",

      title:
        "Tu pedido",

      emptyTitle:
        "Comanda vacía",

      emptyDescription:
        "Elegí productos de la carta para comenzar.",

      productSingular:
        "producto",

      productPlural:
        "productos",

      remove:
        "Quitar",

      subtotal:
        "Subtotal",

      continueDescription:
        "Revisá datos, entrega y pago en la siguiente pantalla.",

      checkoutButton:
        "Ver comanda",

      close:
        "Cerrar",

      closeOrder:
        "Cerrar comanda",
    },

    /* -----------------------------------------------------
       CHECKOUT
       ----------------------------------------------------- */

    checkout: {
      disabled: {
        title:
          "Pedidos no disponibles",

        description:
          "El canal de pedidos está temporalmente desactivado.",
      },

      header: {
        backLabel:
          "Carta",

        title:
          "Tu comanda",

        onlineLabel:
          "Pedido online",

        tablePrefix:
          "Mesa",
      },

      hero: {
        tableLabel:
          "Mesa",

        onlineLabel:
          "Pedido online",

        title:
          "Tu pedido",

        description:
          "Revisá tu selección y completá los últimos datos antes de enviarla.",
      },

      selection: {
        label:
          "Selección",

        units:
          "unidades",

        perUnit:
          "c/u",

        remove:
          "Quitar",

        decrease:
          "Disminuir",

        increase:
          "Aumentar",
      },

      empty: {
        title:
          "Comanda vacía",

        description:
          "Elegí productos desde la carta para comenzar tu pedido.",

        button:
          "Volver a la carta",
      },

      form: {
        fulfillmentLabel:
          "Entrega",

        delivery:
          "Envío",

        pickup:
          "Retiro",

        customerNameLabel:
          "Nombre",

        customerNamePlaceholder:
          "Tu nombre",

        addressLabel:
          "Dirección",

        addressPlaceholder:
          "Dirección y timbre",

        paymentLabel:
          "Medio de pago",

        notesLabel:
          "Aclaraciones",

        notesDeliveryPlaceholder:
          "Ej. timbre 3B, dejar en recepción...",

        notesTablePlaceholder:
          "Ej. sin sal, sin cebolla...",
      },

      summary: {
        subtotal:
          "Subtotal",

        cashPrefix:
          "Efectivo",

        total:
          "Total",

        completedLabel:
          "Pedido completo",

        estimatedLabel:
          "Demora estimada",
      },

      actions: {
        processing:
          "Procesando...",

        sendToKitchen:
          "Enviar a cocina",

        newOrder:
          "Nueva orden",

        openWhatsApp:
          "Abrir WhatsApp",

        continueArrow:
          "Continuar",
      },

      confirmation: {
        preparedLabel:
          "Pedido preparado",

        confirmedLabel:
          "Pedido confirmado",

        whatsAppDescription:
          "Tu pedido está listo. Solo falta enviarlo desde WhatsApp.",

        tableDescriptionPrefix:
          "La cocina ya recibió tu pedido",

        kitchenTableSuffix:
          "de la Mesa",

        preparedToastTitle:
          "Pedido preparado",

        preparedToastDescription:
          "Abrimos WhatsApp para que puedas enviarlo al restaurante.",

        confirmedToastTitle:
          "Pedido confirmado",

        confirmedToastDescriptionPrefix:
          "La cocina recibió la comanda de la Mesa",
      },

      validation: {
        emptyTitle:
          "La comanda está vacía",

        emptyDescription:
          "Elegí al menos un producto antes de continuar.",

        nameTitle:
          "Falta tu nombre",

        nameDescription:
          "Necesitamos identificar a quién corresponde el pedido.",

        addressTitle:
          "Falta la dirección",

        addressDescription:
          "Completá la dirección para poder solicitar el envío.",

        submitErrorTitle:
          "No pudimos enviar el pedido",

        submitErrorDescription:
          "Revisá tu conexión e intentá nuevamente.",
      },

      helper: {
        table:
          "El pedido será enviado directamente a cocina.",

        online:
          "La siguiente acción abrirá WhatsApp con la comanda preparada.",
      },

      aria: {
        decrease:
          "Disminuir cantidad",

        increase:
          "Aumentar cantidad",

        remove:
          "Quitar producto",

        openWhatsApp:
          "Abrir WhatsApp",

        newOrder:
          "Crear nueva orden",
      },
    },

    /* -----------------------------------------------------
       MENU UI
       ----------------------------------------------------- */

    menuUi: {
      productPersonalizable:
        "Personalizable",

      viewDetail:
        "Ver detalle",

      prepLabel:
        "Preparación",

      fallbackKitchen:
        "Cocina de autor",

      choose:
        "Elegir",

      added:
        "Listo",

      add:
        "Agregar",

      ariaViewProduct:
        "Ver detalle de",

      categoryCountSingular:
        "plato",

      categoryCountPlural:
        "platos",

      allCategories:
        "Todos",

      listView:
        "Vista lista",

      gridView:
        "Vista grilla",

      ariaListView:
        "Cambiar a vista lista",

      ariaGridView:
        "Cambiar a vista grilla",

      ariaAllCategories:
        "Mostrar todos los platos",
    },

    /* -----------------------------------------------------
       TABLE UI
       ----------------------------------------------------- */

    tableUi: {
      serviceLabel:
        "Servicio en salón",

      tablePrefix:
        "Mesa",

      waiterButton:
        "Mozo / Cuenta",

      allCategories:
        "Todos",

      listView:
        "Vista lista",

      gridView:
        "Vista grilla",

      ariaListView:
        "Cambiar a vista lista",

      ariaGridView:
        "Cambiar a vista grilla",

      ariaWaiter:
        "Solicitar atención o pedir la cuenta",
    },

    /* -----------------------------------------------------
       CART UI
       ----------------------------------------------------- */

    cartUi: {
      ariaOpen:
        "Abrir pedido",
    },

    /* -----------------------------------------------------
       NAVBAR UI
       ----------------------------------------------------- */

    navbarUi: {
      themeDark:
        "DARK",

      themeLight:
        "LIGHT",

      ariaChangeTheme:
        "Cambiar tema",

      ariaOpenOrder:
        "Abrir pedido",

      ariaOpenMenu:
        "Abrir menú",

      ariaCloseMenu:
        "Cerrar menú",

      mobileNavigationLabel:
        "Navegación",
    },

    /* -----------------------------------------------------
       CONTACT UI
       ----------------------------------------------------- */

    contactUi: {
      waitTimeTableLabel:
        "Salón",

      waitTimeDeliveryLabel:
        "Delivery",

      minutesSuffix:
        "min",
    },

    /* -----------------------------------------------------
       MENU INTRO
       ----------------------------------------------------- */

    menu: {
      eyebrow:
        "Nuestra propuesta",

      title:
        "Menú",

      subtitle:
        "Explorá nuestra carta de autor, personalizá tus puntos de cocción y enviá tu comanda directamente.",
    },

    /* -----------------------------------------------------
       CTA
       ----------------------------------------------------- */

    ctaTransition: {
      eyebrow:
        "Experiencia de Salón",

      titlePrefix:
        "Una mesa reservada",

      titleAccent:
        "para cada momento.",

      description:
        "Servicio de salón, catas guiadas y maridajes exclusivos en el centro de Mar del Plata.",

      buttonText:
        "Consultar Disponibilidad",
    },

    /* -----------------------------------------------------
       CONTACT EXPERIENCE
       -----------------------------------------------------
       UI copy.
       Los datos físicos están en contact.
       ----------------------------------------------------- */

    contact: {
      eyebrow:
        "Ubicación & Concierge",

      statusBadge:
        "Salón en Operación",

      mainLabel:
        "Salón Principal",

      title:
        "Coordenadas del Salón.",

      formEyebrow:
        "Contacto",

      formTitulo:
        "¿Querés organizar una cena o maridaje exclusivo?",

      formSubtitulo:
        "Atención personalizada para reservas grupales y eventos especiales.",

      nameLabel:
        "Nombre / empresa",

      phoneLabel:
        "Teléfono / WhatsApp",

      emailLabel:
        "Correo electrónico",

      messageLabel:
        "Mensaje",

      submitSending:
        "Abriendo WhatsApp...",

      submitSent:
        "Mensaje enviado ✓",

      botonEnviar:
        "Consultar con Recepción",

      addressLabel:
        "Dirección",

      scheduleLabel:
        "Horarios & Canales",

      mapEyebrow:
        "Ubicación",

      directionsButton:
        "Cómo llegar",

      instagramLabel:
        "Instagram",

      whatsappLabel:
        "WhatsApp",

      copyButton:
        "Copiar",

      copiedButton:
        "Copiado",

      mapsButton:
        "Abrir ubicación",

      receptionPrompt:
        "¿Querés organizar una cena o maridaje exclusivo?",

      receptionButton:
        "Consultar con Recepción",
    },

    /* -----------------------------------------------------
       WAITER MODAL
       ----------------------------------------------------- */

    waiterModal: {
      eyebrow:
        "Conserje Digital · Salón",

      callTitle:
        "Llamar al Mozo",

      callSubtitle:
        "Asistencia para ordenar o consultas",

      callMessage:
        "Solicita asistencia de mozo en mesa",

      billTitle:
        "Pedir la Cuenta",

      billSubtitle:
        "Efectivo, Tarjeta o QR",

      paymentPrompt:
        "¿Cómo deseás abonar la cuenta?",

      sentTitle:
        "Aviso Enviado",

      sentSubtitle:
        "El mozo de tu sector ya fue notificado:",

      backButton:
        "Volver",

      confirmButton:
        "Confirmar",

      errorMessage:
        "Error al notificar al mozo. Por favor avisá directamente al personal de salón.",
    },

    /* -----------------------------------------------------
       FOOTER
       ----------------------------------------------------- */

    footer: {
      backgroundImage:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80",

      description:
        "Gastro Experience · Cocina & Coctelería de Autor",

      credits:
        "Gastro Engine Core",

      navigationLabel:
        "Navegación",

      contactLabel:
        "Contacto",

      establishmentLabel:
        "Establecimiento",

      hoursLabel:
        "Horarios",

      socialsLabel:
        "Comunidad",

      instagramLabel:
        "Instagram",

      whatsappLabel:
        "WhatsApp",

      locationLabel:
        "Ubicación",

      identityLabel:
        "Identidad",

      backToTop:
        "Volver arriba",
    },
  },
} as const;

export type SiteConfig =
  typeof siteConfig;