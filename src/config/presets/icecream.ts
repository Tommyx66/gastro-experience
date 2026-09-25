import type { GastroPreset } from "./types";

import {
  icecreamCategories,
  icecreamProducts,
} from "@/data/menus/icecream";

export const icecreamPreset = {
  "id": "icecream",
  "label": "Gelateria Artesanal & Gelato Italiano",
  "theme": {
    "mode": "light",
    "accent": "#7C9B68",
    "accentStrong": "#5E7A4C",
    "accentContrast": "#FFFDF8",
    "colors": {
      "light": {
        "bg": "#F3EEE5",
        "bgElevated": "#FAF7F0",
        "surface": "#FFFDF9",
        "surfaceElevated": "#EAE0D2",
        "surfaceInverse": "#2A211A",
        "text": "#2A211A",
        "textMuted": "#67584D",
        "textSubtle": "#87776A",
        "accent": "#7C9B68",
        "accentStrong": "#5E7A4C",
        "accentContrast": "#FFFDF8",
        "accentSoft": "rgba(163,110,67,0.12)",
        "accentFaint": "rgba(163,110,67,0.06)",
        "accentBorder": "rgba(163,110,67,0.32)",
        "border": "rgba(42,33,26,0.11)",
        "borderStrong": "rgba(42,33,26,0.21)",
        "overlay": "rgba(243,238,229,0.90)",
        "control": "rgba(42,33,26,0.045)",
        "controlHover": "rgba(42,33,26,0.085)",
        "success": "#059669",
        "warning": "#B45309",
        "danger": "#DC2626"
      }
    },
    "typography": {
      "display": "Fraunces, Georgia, serif",
      "body": "Inter, Arial, Helvetica, sans-serif",
      "ui": "Inter, Arial, Helvetica, sans-serif",
      "mono": "monospace"
    }
  },
  "visual": {
    "navbar": "minimal",
    "hero": "playful",
    "heroStyle": {
      "variant": "playful",
      "imageTreatment": "natural",
      "overlay": "paper",
      "composition": "centered",
      "ctaShape": "pill",
      "grain": false,
      "parallax": true,
      "intensity": 0.8
    },
    "menu": "compact",
    "productCard": "clean",
    "contact": "minimal",
    "cta": "editorial",
    "footer": "minimal",
    "story": {
      "variant": "gelateria",
      "layout": "stacked",
      "imageTreatment": "natural",
      "cardShape": "soft",
      "density": "airy",
      "watermark": false,
      "grain": false,
      "numbering": false,
      "motion": {
        "speed": 0.42,
        "direction": "left",
        "hoverLift": 10,
        "parallax": true,
        "pauseOnHover": true
      }
    }
  },
  "operation": {
    "primary": "counter",
    "supported": [
      "counter",
      "pickup",
      "delivery"
    ]
  },
  "capabilities": {
    "ordering": true,
    "story": true,
    "delivery": true,
    "pickup": true,
    "tableOrders": false,
    "waiterCall": false,
    "reservation": false,
    "coffeeCustomizer": false,
    "beerTaps": false,
    "iceCreamSizes": true,
    "toppings": true,
    "brunch": false,
    "takeaway": true
  },
  "siteOverrides": {
    "brand": {
      "name": "NUVOLA GELATERIA",
      "shortName": "Nuvola",
      "descriptor": "Gelato Italiano",
      "tagline": "Pistacho, crema fresca y fruta de estación",
      "description": "Gelateria artesanal inspirada en el ritual italiano y los sabores frescos.",
      "logo": "/favicon.ico",
      "favicon": "/favicon.ico"
    },
    "features": {
      "ordering": true,
      "delivery": true,
      "pickup": true,
      "tableOrders": false,
      "waiterCall": false,
      "reservation": false,
      "story": true
    },
    "operation": {
      "schedule": "Lunes a Domingo · 11:00 a 00:30 hs",
      "estimatedTime": {
        "delivery": {
          "min": 25,
          "max": 45
        },
        "pickup": {
          "min": 10,
          "max": 25
        },
        "table": {
          "min": 10,
          "max": 30
        }
      }
    },
    "navigation": {
      "links": [
        {
          "label": "Inicio",
          "href": "inicio"
        },
        {
          "label": "Sabores",
          "href": "historia"
        },
        {
          "label": "Gelato",
          "href": "menu"
        },
        {
          "label": "Pedidos",
          "href": "contacto"
        }
      ],
      "cta": "Elegir sabores"
    },
    "ordering": {
      "enabled": true,
      "channels": [
        "web"
      ],
      "fulfillment": [
        "delivery",
        "pickup"
      ],
      "cashDiscountPercent": 10,
      "paymentMethods": [
        {
          "id": "cash",
          "label": "Efectivo",
          "requiresProof": false
        },
        {
          "id": "card",
          "label": "Tarjeta",
          "requiresProof": false
        },
        {
          "id": "transfer",
          "label": "Transferencia / QR",
          "requiresProof": true
        }
      ],
      "whatsapp": {
        "number": "549223000000",
        "defaultMessage": "Hola, quiero hacer un pedido en NUVOLA GELATERIA.",
        "tableOrderMessage": "Hola, envío el pedido desde mesa en NUVOLA GELATERIA.",
        "labelCheckout": "Enviar pedido por WhatsApp"
      }
    },
    "contact": {
      "address": "Güemes 2150 (entre Avellaneda y Alberti)",
      "zone": "Zona Güemes",
      "city": "Mar del Plata",
      "country": "Argentina",
      "fullAddress": "Mar del Plata, Buenos Aires, Argentina",
      "phone": "+54 9 223 555-0100",
      "email": "hola@nuvolademo.com",
      "instagram": "https://instagram.com",
      "mapsUrl": "https://www.google.com/maps",
      "coordinates": {
        "lat": -38.0,
        "lng": -57.55,
        "zoom": 15,
        "latDisplay": "38°00′00″ S",
        "lngDisplay": "57°33′00″ W"
      }
    },
    "seo": {
      "title": "NUVOLA GELATERIA | Gelateria Artesanal & Gelato Italiano",
      "description": "Gelato italiano artesanal, vitrinas de temporada y pedidos para compartir.",
      "locale": "es_AR"
    },
    "content": {
      showcase: {
    enabled: true,
    variant: "curated-grid", // Activa la vitrina de 4 sabores o formatos
    badgeText: "Naturale",
    eyebrow: "Pozetti Tradizionali · -12°C",
    titlePrefix: "Textura pura,",
    titleAccent: "cero cristales.",
    description: "Gelato conservado herméticamente bajo tapas de acero inoxidable sin contacto con la luz ni el aire.",
    targetCategoryId: "potes",
    actionButtonLabel: "Elegir sabores"
  },
      "hero": {
        "eyebrow": "Gelateria · Costa Italiana",
        "titlePrefix": "Gelato",
        "titleAccent": "fresco.",
        "subtitle": "Crema fresca, pistacho, fruta de estación y cucuruchos de waffle preparados al momento.",
        "cta": "Elegir sabores",
        "ctaHref": "menu",
        "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1600&q=85&auto=format&fit=crop"
      },
      "story": {
        "eyebrow": "Laboratorio · Gelato",
        "watermark": "CREMA",
        "titlePrefix": "Materia",
        "titleAccent": "en frío.",
        "sectionTag": "Gelateria Journal",
        "primaryDescription": "La textura es parte del sabor: menos artificio, mejor materia prima y una vitrina que cambia con la estación.",
        "secondaryDescription": "La textura es parte del sabor: menos artificio, mejor materia prima y una vitrina que cambia con la estación. La propuesta cambia con la materia, el servicio y el momento del día.",
        "backgroundImage": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1600&q=85&auto=format&fit=crop",
        "labels": {
          "processLine": "Gelateria Journal",
          "openArchive": "Explorar gelateria journal",
          "traceability": "Trazabilidad",
          "closeSheet": "Cerrar Ficha"
        },
        "archive": [
          {
            "titulo": "Nuvola · Proceso",
            "subtitulo": "Gelato",
            "nota": "La textura es parte del sabor: menos artificio, mejor materia prima y una vitrina que cambia con la estación.",
            "origen": "NUVOLA GELATERIA",
            "src": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=1600&q=85&auto=format&fit=crop"
          },
          {
            "titulo": "Materia · Selección",
            "subtitulo": "Gelateria Journal",
            "nota": "Una pieza de la identidad que define la experiencia y le da continuidad a la marca.",
            "origen": "NUVOLA GELATERIA",
            "src": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=1600&q=85&auto=format&fit=crop"
          }
        ]
      },
      "productDetail": {
        "fallbackTag": "Especialidad",
        "options": {
          "required": "Elegí 1",
          "optional": "Opcional",
          "requiredMark": "*",
          "personalized": "Personalización"
        },
        "notes": {
          "label": "Instrucciones o aclaraciones",
          "placeholder": "Ej. sin un ingrediente, presentación especial..."
        },
        "actions": {
          "add": "Sumar",
          "added": "Agregado",
          "chooseRequired": "Seleccioná opciones requeridas",
          "decreaseQuantity": "Disminuir cantidad",
          "increaseQuantity": "Aumentar cantidad",
          "close": "Cerrar detalle"
        }
      },
      "cart": {
        "eyebrow": "Pedido",
        "title": "Tu pedido",
        "emptyTitle": "Pedido vacío",
        "emptyDescription": "Elegí productos de la carta para comenzar.",
        "productSingular": "producto",
        "productPlural": "productos",
        "remove": "Quitar",
        "subtotal": "Subtotal",
        "continueDescription": "Revisá datos, entrega y pago en la siguiente pantalla.",
        "checkoutButton": "Ver pedido",
        "close": "Cerrar",
        "closeOrder": "Cerrar pedido"
      },
      "checkout": {
        "disabled": {
          "title": "Pedidos no disponibles",
          "description": "El canal de pedidos está temporalmente desactivado."
        },
        "header": {
          "backLabel": "Carta",
          "title": "Tu pedido",
          "onlineLabel": "Pedido online",
          "tablePrefix": "Mesa"
        },
        "hero": {
          "tableLabel": "Mesa",
          "onlineLabel": "Pedido online",
          "title": "Tu pedido",
          "description": "Revisá la selección y completá los últimos datos."
        },
        "selection": {
          "label": "Selección",
          "units": "unidades",
          "perUnit": "c/u",
          "remove": "Quitar",
          "decrease": "Disminuir",
          "increase": "Aumentar"
        },
        "empty": {
          "title": "Pedido vacío",
          "description": "Elegí productos desde la carta para comenzar.",
          "button": "Volver a la carta"
        },
        "form": {
          "fulfillmentLabel": "Entrega",
          "delivery": "Envío",
          "pickup": "Retiro",
          "customerNameLabel": "Nombre",
          "customerNamePlaceholder": "Tu nombre",
          "addressLabel": "Dirección",
          "addressPlaceholder": "Dirección y timbre",
          "paymentLabel": "Medio de pago",
          "notesLabel": "Aclaraciones",
          "notesDeliveryPlaceholder": "Ej. timbre, piso, recepción...",
          "notesTablePlaceholder": "Ej. sin sal, sin cebolla..."
        },
        "summary": {
          "subtotal": "Subtotal",
          "cashPrefix": "Efectivo",
          "total": "Total",
          "completedLabel": "Pedido completo",
          "estimatedLabel": "Demora estimada"
        },
        "actions": {
          "processing": "Procesando...",
          "sendToKitchen": "Enviar pedido",
          "newOrder": "Nueva orden",
          "openWhatsApp": "Abrir WhatsApp",
          "continueArrow": "Continuar"
        },
        "confirmation": {
          "preparedLabel": "Pedido preparado",
          "confirmedLabel": "Pedido confirmado",
          "whatsAppDescription": "Tu pedido está listo. Solo falta enviarlo desde WhatsApp.",
          "tableDescriptionPrefix": "La cocina recibió tu pedido",
          "kitchenTableSuffix": "de la Mesa",
          "preparedToastTitle": "Pedido preparado",
          "preparedToastDescription": "Abrimos WhatsApp para continuar.",
          "confirmedToastTitle": "Pedido confirmado",
          "confirmedToastDescriptionPrefix": "La cocina recibió la comanda."
        },
        "validation": {
          "emptyTitle": "La comanda está vacía",
          "emptyDescription": "Elegí al menos un producto antes de continuar.",
          "nameTitle": "Falta tu nombre",
          "nameDescription": "Necesitamos identificar tu pedido.",
          "addressTitle": "Falta la dirección",
          "addressDescription": "Completá la dirección para el envío.",
          "submitErrorTitle": "No pudimos enviar el pedido",
          "submitErrorDescription": "Revisá tu conexión e intentá nuevamente."
        },
        "helper": {
          "table": "El pedido se enviará directamente al servicio.",
          "online": "La siguiente acción abrirá WhatsApp con la comanda preparada."
        },
        "aria": {
          "decrease": "Disminuir cantidad",
          "increase": "Aumentar cantidad",
          "remove": "Quitar producto",
          "openWhatsApp": "Abrir WhatsApp",
          "newOrder": "Crear nueva orden"
        }
      },
      "menuUi": {
        "productPersonalizable": "Personalizable",
        "viewDetail": "Ver detalle",
        "prepLabel": "Preparación",
        "fallbackKitchen": "Cocina de autor",
        "choose": "Elegir",
        "added": "Listo",
        "add": "Agregar",
        "ariaViewProduct": "Ver detalle de",
        "categoryCountSingular": "producto",
        "categoryCountPlural": "productos",
        "allCategories": "Todos",
        "listView": "Vista lista",
        "gridView": "Vista grilla",
        "ariaListView": "Cambiar a vista lista",
        "ariaGridView": "Cambiar a vista grilla",
        "ariaAllCategories": "Mostrar todos los productos"
      },
      "tableUi": {
        "serviceLabel": "Servicio en salón",
        "tablePrefix": "Mesa",
        "waiterButton": "Mozo / Cuenta",
        "allCategories": "Todos",
        "listView": "Vista lista",
        "gridView": "Vista grilla",
        "ariaListView": "Cambiar a vista lista",
        "ariaGridView": "Cambiar a vista grilla",
        "ariaWaiter": "Solicitar atención o pedir la cuenta"
      },
      "cartUi": {
        "ariaOpen": "Abrir pedido"
      },
      "navbarUi": {
        "themeDark": "DARK",
        "themeLight": "LIGHT",
        "ariaChangeTheme": "Cambiar tema",
        "ariaOpenOrder": "Abrir pedido",
        "ariaOpenMenu": "Abrir menú",
        "ariaCloseMenu": "Cerrar menú",
        "mobileNavigationLabel": "Navegación"
      },
      "contactUi": {
        "waitTimeTableLabel": "Salón",
        "waitTimeDeliveryLabel": "Delivery",
        "minutesSuffix": "min"
      },
      "menu": {
        "eyebrow": "Gelato & Pasticceria Fredda",
        "title": "Sabores",
        "subtitle": "Cucuruchos, potes, affogatos y toppings para construir tu propia combinación."
      },
      "ctaTransition": {
        "eyebrow": "Gelateria Artesanal & Gelato Italiano",
        "titlePrefix": "Materia",
        "titleAccent": "en frío.",
        "description": "Gelato italiano artesanal, vitrinas de temporada y pedidos para compartir.",
        "buttonText": "Elegir sabores",
        "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&q=85&auto=format&fit=crop"
      },
      "contact": {
        "eyebrow": "Ubicación & Concierge",
        "statusBadge": "Operación activa",
        "mainLabel": "Establecimiento",
        "title": "Pick-up & Delivery",
        "formEyebrow": "Contacto",
        "formTitulo": "Pick-up & Delivery",
        "formSubtitulo": "Gelato italiano artesanal, vitrinas de temporada y pedidos para compartir.",
        "nameLabel": "Nombre / empresa",
        "phoneLabel": "Teléfono / WhatsApp",
        "emailLabel": "Correo electrónico",
        "messageLabel": "Mensaje",
        "submitSending": "Abriendo WhatsApp...",
        "submitSent": "Mensaje enviado ✓",
        "botonEnviar": "Consultar",
        "addressLabel": "Dirección",
        "scheduleLabel": "Horarios & Canales",
        "mapEyebrow": "Ubicación",
        "directionsButton": "Cómo llegar",
        "instagramLabel": "Instagram",
        "whatsappLabel": "WhatsApp",
        "copyButton": "Copiar",
        "copiedButton": "Copiado",
        "mapsButton": "Abrir ubicación",
        "receptionPrompt": "Pick-up & Delivery",
        "receptionButton": "Consultar"
      },
      "waiterModal": {
        "eyebrow": "NUVOLA GELATERIA",
        "callTitle": "Solicitar atención",
        "callSubtitle": "Asistencia para ordenar o consultas",
        "callMessage": "Solicita asistencia desde la mesa",
        "billTitle": "Pedir la Cuenta",
        "billSubtitle": "Efectivo, Tarjeta o QR",
        "paymentPrompt": "¿Cómo deseás abonar la cuenta?",
        "sentTitle": "Aviso Enviado",
        "sentSubtitle": "El equipo ya fue notificado:",
        "backButton": "Volver",
        "confirmButton": "Confirmar",
        "errorMessage": "No pudimos notificar al servicio."
      },
      "footer": {
        "backgroundImage": "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=1600&q=85&auto=format&fit=crop",
        "description": "NUVOLA GELATERIA · Gelato Italiano",
        "credits": "Gastro Engine Core",
        "navigationLabel": "Navegación",
        "contactLabel": "Contacto",
        "establishmentLabel": "Establecimiento",
        "hoursLabel": "Horarios",
        "socialsLabel": "Comunidad",
        "instagramLabel": "Instagram",
        "whatsappLabel": "WhatsApp",
        "locationLabel": "Ubicación",
        "identityLabel": "Identidad",
        "backToTop": "Volver arriba"
      }
    }
  },
  "menu": {
    "categories": icecreamCategories,
    "products": icecreamProducts
  }
} satisfies GastroPreset;
