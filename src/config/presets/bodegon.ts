import type { GastroPreset } from "./types";

import {
  bodegonCategories,
  bodegonProducts,
} from "@/data/menus/bodegon";

export const bodegonPreset = {
  "id": "bodegon",
  "label": "Bodegón Porteño & Cantina",
  "theme": {
    "mode": "hybrid",
    "accent": "#C59745",
    "accentStrong": "#E0B86E",
    "accentContrast": "#090807",
    "colors": {
      "hybrid": {
        "bg": "#17130F",
        "bgElevated": "#201A15",
        "surface": "#2A2119",
        "surfaceElevated": "#33271E",
        "surfaceInverse": "#F6EFE4",
        "text": "#F6EFE4",
        "textMuted": "#CDBEAA",
        "textSubtle": "#948575",
        "accent": "#C59745",
        "accentStrong": "#E0B86E",
        "accentContrast": "#17110C",
        "accentSoft": "rgba(197,151,69,0.16)",
        "accentFaint": "rgba(197,151,69,0.08)",
        "accentBorder": "rgba(197,151,69,0.38)",
        "border": "rgba(246,239,228,0.12)",
        "borderStrong": "rgba(246,239,228,0.22)",
        "overlay": "rgba(23,19,15,0.90)",
        "control": "rgba(246,239,228,0.05)",
        "controlHover": "rgba(246,239,228,0.09)",
        "success": "#34D399",
        "warning": "#F59E0B",
        "danger": "#F87171"
      }
    },
    "typography": {
      "display": "DM Serif Display, Georgia, serif",
      "body": "Inter, Arial, Helvetica, sans-serif",
      "ui": "Inter, Arial, Helvetica, sans-serif",
      "mono": "monospace"
    }
  },
  "visual": {
    "navbar": "editorial",
    "hero": "editorial",
    "heroStyle": {
      "variant": "editorial",
      "imageTreatment": "film",
      "overlay": "editorial",
      "composition": "editorial",
      "ctaShape": "outline",
      "grain": true,
      "parallax": false,
      "intensity": 0.8
    },
    "menu": "catalog",
    "productCard": "photo",
    "contact": "split",
    "cta": "immersive",
    "footer": "editorial",
    "story": {
      "variant": "cantina",
      "layout": "lookbook",
      "imageTreatment": "sepia",
      "cardShape": "ticket",
      "density": "balanced",
      "watermark": true,
      "grain": true,
      "numbering": true,
      "motion": {
        "speed": 0.42,
        "direction": "left",
        "hoverLift": 2,
        "parallax": false,
        "pauseOnHover": true
      }
    }
  },
  "operation": {
    "primary": "table",
    "supported": [
      "table",
      "pickup"
    ]
  },
  "capabilities": {
    "ordering": true,
    "story": true,
    "delivery": false,
    "pickup": true,
    "tableOrders": true,
    "waiterCall": true,
    "reservation": true,
    "coffeeCustomizer": false,
    "beerTaps": false,
    "iceCreamSizes": false,
    "toppings": false,
    "brunch": false,
    "takeaway": true
  },
  "siteOverrides": {
    "brand": {
      "name": "LA VEREDA",
      "shortName": "Vereda",
      "descriptor": "Bodegón Porteño",
      "tagline": "Platos abundantes, vermut y sobremesas largas",
      "description": "Bodegón de cocina de barrio con platos de olla, milanesas y pastas caseras.",
      "logo": "/favicon.ico",
      "favicon": "/favicon.ico"
    },
    "features": {
      "ordering": true,
      "delivery": false,
      "pickup": true,
      "tableOrders": true,
      "waiterCall": true,
      "reservation": true,
      "story": true
    },
    "operation": {
      "schedule": "Martes a Domingo · 12:00 a 16:00 y 20:00 a 01:00 hs",
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
          "label": "Cantina",
          "href": "historia"
        },
        {
          "label": "Carta",
          "href": "menu"
        },
        {
          "label": "Reservas",
          "href": "contacto"
        }
      ],
      "cta": "Ver la carta"
    },
    "ordering": {
      "enabled": true,
      "channels": [
        "web",
        "table"
      ],
      "fulfillment": [
        "pickup",
        "onsite"
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
        "defaultMessage": "Hola, quiero hacer un pedido en LA VEREDA.",
        "tableOrderMessage": "Hola, envío el pedido desde mesa en LA VEREDA.",
        "labelCheckout": "Enviar pedido por WhatsApp"
      }
    },
    "contact": {
      "address": "Olavarría 2840 (esq. Brown)",
      "zone": "Barrio Chauvin",
      "city": "Mar del Plata",
      "country": "Argentina",
      "fullAddress": "Mar del Plata, Buenos Aires, Argentina",
      "phone": "+54 9 223 555-0100",
      "email": "hola@veredademo.com",
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
      "title": "LA VEREDA | Bodegón Porteño & Cantina",
      "description": "Cocina porteña abundante, vermut y sobremesas largas.",
      "locale": "es_AR"
    },
    "content": {
      "hero": {
        "eyebrow": "Bodegón · Barrio & Cantina",
        "titlePrefix": "Lo",
        "titleAccent": "de siempre, pero bien.",
        "subtitle": "Milanesas, platos de olla, pasta casera y vermut servido como corresponde.",
        "cta": "Ver la carta",
        "ctaHref": "menu",
        "image": "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1600&q=85&auto=format&fit=crop"
      },showcase: {
    enabled: true,
    variant: "heroic-split", // Activa el plato del día destacado
    badgeText: "Sugerencia del Mozo",
    eyebrow: "Plato del Día de la Cantina",
    titlePrefix: "Comer bien,",
    titleAccent: "abundante",
    titleSuffix: "y compartido.",
    description: "Milanesas gigantes al hierro de nalga tierna, gratinadas con abundante mozzarella y salsa casera.",
    targetProductId: "milanesa-napolitana-compartir",
    actionButtonLabel: "Marchar para la mesa",
    metrics: [
      { label: "Porción", value: "Para 2", isAccent: true },
      { label: "Guarnición", value: "Fritas o puré" },
      { label: "Cocción", value: "Al momento" }
    ],
    footerNote: {
      left: "Sale con fritas a caballo",
      right: "Receta de la casa"
    }
  },
      
      "story": {
        "eyebrow": "Cantina · Cocina de Barrio",
        "watermark": "MESA",
        "titlePrefix": "Lo que importa",
        "titleAccent": "se comparte.",
        "sectionTag": "Archivo de la Casa",
        "primaryDescription": "Una mesa generosa, recetas reconocibles y una barra donde la sobremesa empieza antes del plato principal.",
        "secondaryDescription": "Una mesa generosa, recetas reconocibles y una barra donde la sobremesa empieza antes del plato principal. La propuesta cambia con la materia, el servicio y el momento del día.",
        "backgroundImage": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1600&q=85&auto=format&fit=crop",
        "labels": {
          "processLine": "Archivo de la Casa",
          "openArchive": "Explorar archivo de la casa",
          "traceability": "Trazabilidad",
          "closeSheet": "Cerrar Ficha"
        },
        "archive": [
          {
            "titulo": "Vereda · Proceso",
            "subtitulo": "Lo",
            "nota": "Una mesa generosa, recetas reconocibles y una barra donde la sobremesa empieza antes del plato principal.",
            "origen": "LA VEREDA",
            "src": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1600&q=85&auto=format&fit=crop"
          },
          {
            "titulo": "Materia · Selección",
            "subtitulo": "Archivo de la Casa",
            "nota": "Una pieza de la identidad que define la experiencia y le da continuidad a la marca.",
            "origen": "LA VEREDA",
            "src": "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=1600&q=85&auto=format&fit=crop"
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
        "eyebrow": "Comanda",
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
        "eyebrow": "Cantina & Cocina de Olla",
        "title": "Carta",
        "subtitle": "Plato del día, milanesas para compartir, pastas caseras y vermut de sifón."
      },
      "ctaTransition": {
        "eyebrow": "Bodegón Porteño & Cantina",
        "titlePrefix": "Lo que importa",
        "titleAccent": "se comparte.",
        "description": "Cocina porteña abundante, vermut y sobremesas largas.",
        "buttonText": "Ver la carta",
        "image": "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=1600&q=85&auto=format&fit=crop"
      },
      "contact": {
        "eyebrow": "Ubicación & Concierge",
        "statusBadge": "Operación activa",
        "mainLabel": "Establecimiento",
        "title": "Salón, reservas y take away",
        "formEyebrow": "Contacto",
        "formTitulo": "Salón, reservas y take away",
        "formSubtitulo": "Cocina porteña abundante, vermut y sobremesas largas.",
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
        "receptionPrompt": "Salón, reservas y take away",
        "receptionButton": "Consultar"
      },
      "waiterModal": {
        "eyebrow": "LA VEREDA",
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
        "backgroundImage": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1600&q=85&auto=format&fit=crop",
        "description": "LA VEREDA · Bodegón Porteño",
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
    "categories": bodegonCategories,
    "products": bodegonProducts
  }
} satisfies GastroPreset;
