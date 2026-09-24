import type {
  GastroPreset,
} from "./types";

import {
  cafeCategories,
  cafeProducts,
} from "@/data/menus/cafe";

/* =========================================================
   PRESET
   ========================================================= */

export const cafePreset:
  GastroPreset = {
  /* =========================================================
     IDENTITY
     ========================================================= */

  id:
    "cafe",

  label:
    "Café de Especialidad & Bakery",

  /* =========================================================
     THEME
     ========================================================= */

  theme: {
    mode:
      "light",

    accent:
      "#A96F46",

    accentStrong:
      "#7C4B2F",

    accentContrast:
      "#FFFDF8",

    colors: {
      light: {
  bg: "#F3EEE6",
  bgElevated: "#FAF7F1",

  surface: "#FFFDF9",
  surfaceElevated: "#EAE0D3",
  surfaceInverse: "#211711",

  text: "#241915",
  textMuted: "#625148",
  textSubtle: "#75665D",

  accent: "#9B613C",
  accentStrong: "#71452F",
  accentContrast: "#FFFDF8",

  accentSoft:
    "rgba(155, 97, 60, 0.13)",

  accentFaint:
    "rgba(155, 97, 60, 0.065)",

  accentBorder:
    "rgba(155, 97, 60, 0.38)",

  border:
    "rgba(36, 25, 21, 0.12)",

  borderStrong:
    "rgba(36, 25, 21, 0.24)",

  overlay:
    "rgba(243, 238, 230, 0.90)",

  control:
    "rgba(36, 25, 21, 0.055)",

  controlHover:
    "rgba(36, 25, 21, 0.09)",

  success: "#059669",
  warning: "#B45309",
  danger: "#DC2626",
},

      dark: {
        bg:
          "#15100D",

        bgElevated:
          "#1C1511",

        surface:
          "#211813",

        surfaceElevated:
          "#2A1F18",

        surfaceInverse:
          "#F5EEE4",

        text:
          "#F5EEE4",

        textMuted:
          "#C1B0A1",

        textSubtle:
          "#8F7F73",

        accent:
          "#C98C5D",

        accentStrong:
          "#E1AA7A",

        accentContrast:
          "#1A120D",

        accentSoft:
          "rgba(201,140,93,0.16)",

        accentFaint:
          "rgba(201,140,93,0.07)",

        accentBorder:
          "rgba(201,140,93,0.32)",

        border:
          "rgba(245,238,228,0.10)",

        borderStrong:
          "rgba(245,238,228,0.18)",

        overlay:
          "rgba(21,16,13,0.90)",

        control:
          "rgba(245,238,228,0.05)",

        controlHover:
          "rgba(245,238,228,0.09)",

        success:
          "#34D399",

        warning:
          "#F59E0B",

        danger:
          "#F87171",
      },
    },

    typography: {
      display:
        "Georgia, 'Times New Roman', serif",

      body:
        "Inter, Arial, Helvetica, sans-serif",

      ui:
        "Inter, Arial, Helvetica, sans-serif",

      mono:
        "monospace",
    },
  },

  /* =========================================================
     VISUAL
     ========================================================= */

  visual: {
    navbar:
      "minimal",

    hero:
      "editorial",

    menu:
      "compact",

    productCard:
      "clean",

    contact:
      "split",

    cta:
      "editorial",

    footer:
      "minimal",
  },

  /* =========================================================
     OPERATION
     ========================================================= */

  operation: {
    primary:
      "counter",

    supported: [
      "counter",
      "pickup",
      "delivery",
    ],
  },

  /* =========================================================
     CAPABILITIES
     ========================================================= */

  capabilities: {
    ordering:
      true,

    delivery:
      true,

    pickup:
      true,

    tableOrders:
      false,

    waiterCall:
      false,

    reservation:
      false,

    story:
      true,

    coffeeCustomizer:
      true,

    beerTaps:
      false,

    iceCreamSizes:
      false,

    toppings:
      false,

    brunch:
      true,

    takeaway:
      true,
  },

  /* =========================================================
     SITE OVERRIDES
     ========================================================= */

  siteOverrides: {
    /* -------------------------------------------------------
       BRAND
       ------------------------------------------------------- */

    brand: {
      name:
        "Origen Tostadores",

      shortName:
        "Origen",

      descriptor:
        "Specialty Coffee & Bakery",

      tagline:
        "Granos de origen, tueste propio y fermentación natural",

      description:
        "Cafetería de especialidad y panadería artesanal. Métodos de filtrado, espresso de finca y masas madre horneadas a diario.",

      logo:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=120&q=80",

      favicon:
        "/favicon.ico",
    },

    /* -------------------------------------------------------
       FEATURES
       ------------------------------------------------------- */

    features: {
      ordering:
        true,

      delivery:
        true,

      pickup:
        true,

      tableOrders:
        false,

      waiterCall:
        false,

      reservation:
        false,

      story:
        true,
    },

    /* -------------------------------------------------------
       OPERATION
       ------------------------------------------------------- */

    operation: {
      schedule:
        "Lunes a Domingo · 08:00 a 20:30 hs",

      estimatedTime: {
        delivery: {
          min:
            25,

          max:
            40,
        },

        pickup: {
          min:
            10,

          max:
            20,
        },

        table: {
          min:
            5,

          max:
            15,
        },
      },
    },

    /* -------------------------------------------------------
       NAVIGATION
       ------------------------------------------------------- */

    navigation: {
      links: [
        {
          label:
            "Inicio",

          href:
            "inicio",
        },

        {
          label:
            "Origen",

          href:
            "historia",
        },

        {
          label:
            "Carta",

          href:
            "menu",
        },

        {
          label:
            "Take Away",

          href:
            "contacto",
        },
      ],

      cta:
        "Pedir Carta",
    },

    /* -------------------------------------------------------
       ORDERING
       ------------------------------------------------------- */

    ordering: {
      enabled:
        true,

      channels: [
        "web",
      ] as const,

      fulfillment: [
        "pickup",
        "delivery",
      ] as const,

      cashDiscountPercent:
        10,

      paymentMethods: [
        {
          id:
            "cash",

          label:
            "Efectivo",

          requiresProof:
            false,
        },

        {
          id:
            "card",

          label:
            "Tarjeta",

          requiresProof:
            false,
        },

        {
          id:
            "transfer",

          label:
            "Transferencia / QR",

          requiresProof:
            true,
        },
      ],

      whatsapp: {
        number:
          "549223000000",

        defaultMessage:
          "Hola, quería hacer un pedido para take away.",

        tableOrderMessage:
          "Hola, adjunto mi pedido de cafetería.",

        labelCheckout:
          "Enviar pedido por WhatsApp",
      },
    },

    /* -------------------------------------------------------
       CONTACT DATA
       ------------------------------------------------------- */

    contact: {
      address:
        "Alvarado 1340 (entre Güemes y Olavarría)",

      zone:
        "Zona Güemes",

      city:
        "Mar del Plata",

      country:
        "Argentina",

      fullAddress:
        "Alvarado 1340, Zona Güemes, Mar del Plata",

      phone:
        "+54 9 223 555-0144",

      email:
        "hola@origentostadores.com",

      instagram:
        "https://instagram.com",

      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Alvarado+1340+Mar+del+Plata",

      coordinates: {
        lat:
          -38.012543,

        lng:
          -57.544122,

        zoom:
          16,

        latDisplay:
          "38°00′45″ S",

        lngDisplay:
          "57°32′38″ W",
      },
    },

    /* -------------------------------------------------------
       SEO
       ------------------------------------------------------- */

    seo: {
      title:
        "Origen Tostadores | Café de Especialidad & Bakery",

      description:
        "Café de especialidad con tueste propio, métodos de filtrado y panadería artesanal en Mar del Plata.",

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
          "Mar del Plata · Microclima Güemes",

        titlePrefix:
          "Granos de",

        titleAccent:
          "especialidad.",

        subtitle:
          "Extracciones de precisión con agua filtrada por ósmosis, granos tostados semanalmente y laminados hojaldrados.",

        cta:
          "Ver carta",

        ctaHref:
          "menu",

        image:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1920&q=80",
      },

      /* -----------------------------------------------------
         STORY
         ----------------------------------------------------- */

      story: {
        eyebrow:
          "Cultura de Finca",

        watermark:
          "TUESTE",

        titlePrefix:
          "La curva",

        titleAccent:
          "del grano.",

        sectionTag:
          "Bitácora de Cosecha",

        primaryDescription:
          "Seleccionamos microlotes de altura de Colombia, Etiopía y Brasil con trazabilidad directa hasta el productor.",

        secondaryDescription:
          "Cada perfil de tueste se calibra en tandas de 5 kg para resaltar las notas florales, frutadas o acarameladas naturales del grano.",

        backgroundImage:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80",

        labels: {
          processLine:
            "Origen · Tueste · Barra",

          openArchive:
            "Explorar origen",

          traceability:
            "Finca & Altura",

          closeSheet:
            "Cerrar Ficha",
        },

        archive: [
          {
            titulo:
              "Colombia Huila",

            subtitulo:
              "Lavado · 1.750 msnm",

            nota:
              "Varietal Caturra con notas a manzana roja, panela y acidez cítrica brillante.",

            origen:
              "Finca San Alberto, Pitalito",

            src:
              "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
          },

          {
            titulo:
              "Etiopía Yirgacheffe",

            subtitulo:
              "Natural · 2.000 msnm",

            nota:
              "Secado en camas africanas. Aromas explosivos a jazmín, arándanos y té negro.",

            origen:
              "Cooperativa Idido, Yirgacheffe",

            src:
              "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80",
          },

          {
            titulo:
              "Brasil Cerrado",

            subtitulo:
              "Pulped Natural · 1.100 msnm",

            nota:
              "Cuerpo denso, baja acidez, final prolongado a chocolate con leche y avellanas tostadas.",

            origen:
              "Fazenda Dutra, Minas Gerais",

            src:
              "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
          },

          {
            titulo:
              "Masa Madre & Viennoiserie",

            subtitulo:
              "Fermentación 36 hs",

            nota:
              "Manteca de pastura nacional y harina orgánica. 36 horas de frío para lograr hojaldre crujiente.",

            origen:
              "Horno propio de pastelería",

            src:
              "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
          },
        ],
      },

      /* -----------------------------------------------------
         PRODUCT DETAIL
         ----------------------------------------------------- */

      productDetail: {
        fallbackTag:
          "Especialidad",

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
            "Aclaraciones para la barra",

          placeholder:
            "Ej. tibia, canela aparte, vaso térmico...",
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
          "Despacho",

        title:
          "Tu pedido",

        emptyTitle:
          "Bolsa vacía",

        emptyDescription:
          "Elegí tu café o pastelería para comenzar.",

        productSingular:
          "ítem",

        productPlural:
          "ítems",

        remove:
          "Quitar",

        subtotal:
          "Subtotal",

        continueDescription:
          "Revisá retiro y pago en el siguiente paso.",

        checkoutButton:
          "Ver pedido",

        close:
          "Cerrar",

        closeOrder:
          "Cerrar pedido",
      },

      /* -----------------------------------------------------
         CHECKOUT
         ----------------------------------------------------- */

      checkout: {
        disabled: {
          title:
            "Pedidos en pausa",

          description:
            "La barra no está recibiendo pedidos en este momento.",
        },

        header: {
          backLabel:
            "Carta",

          title:
            "Tu selección",

          onlineLabel:
            "Take Away / Envío",

          tablePrefix:
            "Barra",
        },

        hero: {
          tableLabel:
            "Barra",

          onlineLabel:
            "Take Away",

          title:
            "Tu pedido",

          description:
            "Revisá las extracciones y completá tus datos de retiro.",
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
            "No agregaste nada aún",

          description:
            "Volvé a la carta para seleccionar tus bebidas.",

          button:
            "Explorar carta",
        },

        form: {
          fulfillmentLabel:
            "Modalidad",

          delivery:
            "Envío",

          pickup:
            "Take Away",

          customerNameLabel:
            "Nombre",

          customerNamePlaceholder:
            "Tu nombre",

          addressLabel:
            "Dirección de entrega",

          addressPlaceholder:
            "Calle, número y timbre",

          paymentLabel:
            "Forma de pago",

          notesLabel:
            "Aclaraciones",

          notesDeliveryPlaceholder:
            "Ej. timbre que no funciona, piso 4...",

          notesTablePlaceholder:
            "Ej. azúcar aparte...",
        },

        summary: {
          subtotal:
            "Subtotal",

          cashPrefix:
            "Efectivo",

          total:
            "Total",

          completedLabel:
            "Listo para despachar",

          estimatedLabel:
            "Demora de barra",
        },

        actions: {
          processing:
            "Preparando pedido...",

          sendToKitchen:
            "Enviar a la barra",

          newOrder:
            "Pedir otra vez",

          openWhatsApp:
            "Confirmar por WhatsApp",

          continueArrow:
            "Continuar",
        },

        confirmation: {
          preparedLabel:
            "Pedido listo",

          confirmedLabel:
            "Extracción confirmada",

          whatsAppDescription:
            "Enviá el mensaje preparado para que el barista comience tu extracción.",

          tableDescriptionPrefix:
            "La barra ya tiene tu pedido",

          kitchenTableSuffix:
            "",

          preparedToastTitle:
            "Pedido preparado",

          preparedToastDescription:
            "Se abrirá WhatsApp con el resumen de tu café.",

          confirmedToastTitle:
            "Pedido enviado",

          confirmedToastDescriptionPrefix:
            "La barra comenzó la preparación",
        },

        validation: {
          emptyTitle:
            "El pedido está vacío",

          emptyDescription:
            "Agregá al menos una bebida para continuar.",

          nameTitle:
            "Falta tu nombre",

          nameDescription:
            "Lo necesitamos para identificar tu pedido.",

          addressTitle:
            "Falta la dirección",

          addressDescription:
            "Ingresá la dirección para el delivery.",

          submitErrorTitle:
            "Error al enviar",

          submitErrorDescription:
            "Comprobá tu conexión a internet.",
        },

        helper: {
          table:
            "La comanda entrará directamente a la pantalla del barista.",

          online:
            "Al presionar se abrirá WhatsApp con el pedido armado.",
        },

        aria: {
          decrease:
            "Disminuir",

          increase:
            "Aumentar",

          remove:
            "Quitar",

          openWhatsApp:
            "Abrir WhatsApp",

          newOrder:
            "Nueva orden",
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
          "Barra de autor",

        choose:
          "Personalizar",

        added:
          "Listo",

        add:
          "Sumar",

        ariaViewProduct:
          "Ver detalle de",

        categoryCountSingular:
          "opción",

        categoryCountPlural:
          "opciones",

        allCategories:
          "Todas",

        listView:
          "Lista",

        gridView:
          "Grilla",

        ariaListView:
          "Cambiar a vista lista",

        ariaGridView:
          "Cambiar a vista grilla",

        ariaAllCategories:
          "Mostrar toda la carta",
      },

      /* -----------------------------------------------------
         TABLE UI
         ----------------------------------------------------- */

      tableUi: {
        serviceLabel:
          "Servicio de barra",

        tablePrefix:
          "Take Away",

        waiterButton:
          "Barista",

        allCategories:
          "Todas",

        listView:
          "Lista",

        gridView:
          "Grilla",

        ariaListView:
          "Cambiar a vista lista",

        ariaGridView:
          "Cambiar a vista grilla",

        ariaWaiter:
          "Solicitar asistencia de barra",
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
          "NOCHE",

        themeLight:
          "DÍA",

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
          "Barra",

        waitTimeDeliveryLabel:
          "Envío",

        minutesSuffix:
          "min",
      },

      /* -----------------------------------------------------
         MENU INTRO
         ----------------------------------------------------- */

      menu: {
        eyebrow:
          "Extracciones & Horneados",

        title:
          "Carta",

        subtitle:
          "Espressos calibrados, métodos de goteo manual, leches vegetales y pastelería del día.",
      },

      /* -----------------------------------------------------
         CTA
         ----------------------------------------------------- */

   ctaTransition: {
  eyebrow:
    "MicroLotes · Tueste",

  titlePrefix:
    "Llevá",

  titleAccent:
    "el origen a casa.",

  description:
    "Granos tostados semanalmente, perfiles de finca y molienda preparada para tu método.",

  buttonText:
    "Elegir un café",

  image:
    "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1920&q=85",
},

      /* -----------------------------------------------------
         CONTACT EXPERIENCE
         ----------------------------------------------------- */

      contact: {
        eyebrow:
          "Tostaduría & Despacho",

        statusBadge:
          "Barra Abierta",

        mainLabel:
          "Barra Principal",

        title:
          "Encontranos cerca.",

        formEyebrow:
          "Hablemos",

        formTitulo:
          "¿Buscás café para tu casa o tu negocio?",

        formSubtitulo:
          "Consultas sobre granos, métodos, capacitaciones, eventos y pedidos especiales.",

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
          "Hablar con Tostaduría",

        addressLabel:
          "Barra",

        scheduleLabel:
          "Horarios & Retiro",

        mapEyebrow:
          "Dónde estamos",

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
          "¿Buscás café en grano para tu negocio?",

        receptionButton:
          "Hablar con Barista",
      },

      /* -----------------------------------------------------
         WAITER MODAL
         ----------------------------------------------------- */

      waiterModal: {
        eyebrow:
          "Barra Alvarado",

        callTitle:
          "Consultar al Barista",

        callSubtitle:
          "Dudas sobre notas de cata o moliendas",

        callMessage:
          "Consulta sobre perfiles de café y filtrados",

        billTitle:
          "Pagar en Mostrador",

        billSubtitle:
          "Efectivo, Débito o Transferencia",

        paymentPrompt:
          "¿Cómo preferís abonar?",

        sentTitle:
          "Aviso Recibido",

        sentSubtitle:
          "El barista ya registró tu consulta:",

        backButton:
          "Volver",

        confirmButton:
          "Confirmar",

        errorMessage:
          "Error de conexión con barra.",
      },

      /* -----------------------------------------------------
         FOOTER
         ----------------------------------------------------- */

      footer: {
        backgroundImage:
          "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1920&q=80",

        description:
          "Origen Tostadores · Tostaduría & Specialty Coffee",

        credits:
          "Gastro Engine Core",

        navigationLabel:
          "Navegación",

        contactLabel:
          "Contacto",

        establishmentLabel:
          "La barra",

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
  },

  /* =========================================================
     MENU
     ========================================================= */

  menu: {
    categories:
      cafeCategories,

    products:
      cafeProducts,
  },
};