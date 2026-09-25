import type { GastroPreset } from "./types";

import {
  cateringCategories,
  cateringProducts,
} from "@/data/menus/catering";

export const cateringPreset = {
  "id": "catering",
  "label": "Catering Premium & Eventos Privados",
  "theme": {
    "mode": "dark",
    "accent": "#C7A56A",
    "accentStrong": "#E4C991",
    "accentContrast": "#090807",
    "colors": {
      "dark": {
        "bg": "#070707",
        "bgElevated": "#0D0C0A",
        "surface": "#12110F",
        "surfaceElevated": "#1A1713",
        "surfaceInverse": "#F7F3EB",
        "text": "#F7F3EB",
        "textMuted": "#C9C0B4",
        "textSubtle": "#8B837A",
        "accent": "#C7A56A",
        "accentStrong": "#E4C991",
        "accentContrast": "#090807",
        "accentSoft": "rgba(200,165,106,0.14)",
        "accentFaint": "rgba(200,165,106,0.07)",
        "accentBorder": "rgba(200,165,106,0.35)",
        "border": "rgba(255,255,255,0.10)",
        "borderStrong": "rgba(255,255,255,0.18)",
        "overlay": "rgba(7,7,7,0.90)",
        "control": "rgba(255,255,255,0.045)",
        "controlHover": "rgba(255,255,255,0.09)",
        "success": "#34D399",
        "warning": "#F59E0B",
        "danger": "#F87171"
      }
    },
    "typography": {
      "display": "Cormorant Garamond, Georgia, serif",
      "body": "Inter, Arial, Helvetica, sans-serif",
      "ui": "Inter, Arial, Helvetica, sans-serif",
      "mono": "monospace"
    }
  },
  "visual": {
    "navbar": "minimal",
    "hero": "hospitality",
    "heroStyle": {
      "variant": "hospitality",
      "imageTreatment": "natural",
      "overlay": "editorial",
      "composition": "split",
      "ctaShape": "outline",
      "grain": false,
      "parallax": true,
      "intensity": 0.8
    },
    "menu": "catalog",
    "productCard": "clean",
    "contact": "split",
    "cta": "editorial",
    "footer": "minimal",
    "story": {
      "variant": "hospitality",
      "layout": "editorial",
      "imageTreatment": "natural",
      "cardShape": "poster",
      "density": "airy",
      "watermark": false,
      "grain": false,
      "numbering": false,
      "motion": {
        "speed": 0.5,
        "direction": "left",
        "hoverLift": 5,
        "parallax": true,
        "pauseOnHover": true
      }
    }
  },
  "operation": {
    "primary": "delivery",
    "supported": [
      "delivery",
      "pickup",
      "counter"
    ]
  },
  "capabilities": {
    "ordering": true,
    "story": true,
    "delivery": true,
    "pickup": true,
    "tableOrders": false,
    "waiterCall": false,
    "reservation": true,
    "coffeeCustomizer": false,
    "beerTaps": false,
    "iceCreamSizes": false,
    "toppings": false,
    "brunch": true,
    "takeaway": true
  },
  "siteOverrides": {
    "brand": {
      "name": "MAISON TABLE",
      "shortName": "Maison",
      "descriptor": "Event Catering",
      "tagline": "Hospitality pensada hasta el último detalle",
      "description": "Catering premium para corporativos, celebraciones y experiencias privadas.",
      "logo": "/favicon.ico",
      "favicon": "/favicon.ico"
    },
    "features": {
      "ordering": true,
      "delivery": true,
      "pickup": true,
      "tableOrders": false,
      "waiterCall": false,
      "reservation": true,
      "story": true
    },
    "operation": {
      "schedule": "Lunes a Domingo · Eventos bajo reserva",
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
          "label": "Experiencias",
          "href": "historia"
        },
        {
          "label": "Propuestas",
          "href": "menu"
        },
        {
          "label": "Contacto",
          "href": "contacto"
        }
      ],
      "cta": "Consultar evento"
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
        "defaultMessage": "Hola, quiero hacer un pedido en MAISON TABLE.",
        "tableOrderMessage": "Hola, envío el pedido desde mesa en MAISON TABLE.",
        "labelCheckout": "Enviar pedido por WhatsApp"
      }
    },
    "contact": {
      "address": "Av. Constitución 4210 (Showroom)",
      "zone": "Constitución",
      "city": "Mar del Plata",
      "country": "Argentina",
      "fullAddress": "Mar del Plata, Buenos Aires, Argentina",
      "phone": "+54 9 223 555-0100",
      "email": "hola@maisondemo.com",
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
      "title": "MAISON TABLE | Catering Premium & Eventos Privados",
      "description": "Catering premium, estaciones en vivo y hospitality para eventos privados y corporativos.",
      "locale": "es_AR"
    },
    "content": {
      "hero": {
        "eyebrow": "Catering · Private Events",
        "titlePrefix": "Diseñamos",
        "titleAccent": "la ocasión.",
        "subtitle": "Menú, servicio y puesta en escena construidos alrededor de la escala y el carácter de cada evento.",
        "cta": "Consultar evento",
        "ctaHref": "menu",
        "image": "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=1600&q=85&auto=format&fit=crop"
      },
      "story": {
        "eyebrow": "Hospitality · Event Design",
        "watermark": "TABLE",
        "titlePrefix": "Cada detalle",
        "titleAccent": "forma parte.",
        "sectionTag": "Experience Journal",
        "primaryDescription": "Desde un breakfast corporativo hasta una estación en vivo, cada experiencia se diseña alrededor del evento.",
        "secondaryDescription": "Desde un breakfast corporativo hasta una estación en vivo, cada experiencia se diseña alrededor del evento. La propuesta cambia con la materia, el servicio y el momento del día.",
        "backgroundImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=85&auto=format&fit=crop",
        "labels": {
          "processLine": "Experience Journal",
          "openArchive": "Explorar experience journal",
          "traceability": "Trazabilidad",
          "closeSheet": "Cerrar Ficha"
        },
        "archive": [
          {
            "titulo": "Maison · Proceso",
            "subtitulo": "Diseñamos",
            "nota": "Desde un breakfast corporativo hasta una estación en vivo, cada experiencia se diseña alrededor del evento.",
            "origen": "MAISON TABLE",
            "src": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=1600&q=85&auto=format&fit=crop"
          },
          {
            "titulo": "Servicio · Selección",
            "subtitulo": "Experience Journal",
            "nota": "Una pieza de la identidad que define la experiencia y le da continuidad a la marca.",
            "origen": "MAISON TABLE",
            "src": "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1600&q=85&auto=format&fit=crop"
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
        "eyebrow": "Event Menu",
        "title": "Propuestas",
        "subtitle": "Finger food, live stations, corporate boxes y sweet tables para eventos memorables."
      },
      "ctaTransition": {
        "eyebrow": "Catering Premium & Eventos Privados",
        "titlePrefix": "Una experiencia",
        "titleAccent": "forma parte.",
        "description": "Catering premium, estaciones en vivo y hospitality para eventos privados y corporativos.",
        "buttonText": "Consultar evento",
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=85&auto=format&fit=crop"
      },
      "contact": {
        "eyebrow": "Ubicación & Concierge",
        "statusBadge": "Operación activa",
        "mainLabel": "Establecimiento",
        "title": "Diseñemos tu evento",
        "formEyebrow": "Contacto",
        "formTitulo": "Diseñemos tu evento",
        "formSubtitulo": "Catering premium, estaciones en vivo y hospitality para eventos privados y corporativos.",
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
        "receptionPrompt": "Diseñemos tu evento",
        "receptionButton": "Consultar"
      },
      "waiterModal": {
        "eyebrow": "MAISON TABLE",
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
        "backgroundImage": "https://images.unsplash.com/photo-1547592180-85f173990554?w=1600&q=85&auto=format&fit=crop",
        "description": "MAISON TABLE · Event Catering",
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
    "categories": cateringCategories,
    "products": cateringProducts
  }
} satisfies GastroPreset;
