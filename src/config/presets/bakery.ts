import type { GastroPreset } from "./types";

import {
  bakeryCategories,
  bakeryProducts,
} from "@/data/menus/bakery";

export const bakeryPreset = {
  "id": "bakery",
  "label": "Panadería de Masa Madre & Obrador",
  "theme": {
    "mode": "light",
    "accent": "#A36E43",
    "accentStrong": "#754928",
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
        "accent": "#A36E43",
        "accentStrong": "#754928",
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
      "display": "Cormorant Garamond, Georgia, serif",
      "body": "Inter, Arial, Helvetica, sans-serif",
      "ui": "Inter, Arial, Helvetica, sans-serif",
      "mono": "monospace"
    }
  },
  "visual": {
    "navbar": "minimal",
    "hero": "editorial",
    "heroStyle": {
      "variant": "editorial",
      "imageTreatment": "soft",
      "overlay": "paper",
      "composition": "editorial",
      "ctaShape": "outline",
      "grain": true,
      "parallax": true,
      "intensity": 0.8
    },
    "menu": "catalog",
    "productCard": "clean",
    "contact": "split",
    "cta": "editorial",
    "footer": "minimal",
    "story": {
      "variant": "atelier",
      "layout": "lookbook",
      "imageTreatment": "soft",
      "cardShape": "framed",
      "density": "airy",
      "watermark": true,
      "grain": true,
      "numbering": false,
      "motion": {
        "speed": 0.3,
        "direction": "left",
        "hoverLift": 3,
        "parallax": true,
        "pauseOnHover": true
      }
    }
  },
  "operation": {
    "primary": "counter",
    "supported": [
      "counter",
      "pickup"
    ]
  },
  "capabilities": {
    "ordering": true,
    "story": true,
    "delivery": false,
    "pickup": true,
    "tableOrders": false,
    "waiterCall": false,
    "reservation": false,
    "coffeeCustomizer": true,
    "beerTaps": false,
    "iceCreamSizes": false,
    "toppings": false,
    "brunch": true,
    "takeaway": true
  },
  "siteOverrides": {
    "brand": {
      "name": "MIGA MADRE",
      "shortName": "Miga",
      "descriptor": "Panadería de Autor",
      "tagline": "Harina, fermentación y fuego de obrador",
      "description": "Panadería artesanal con masa madre, laminados franceses y producción diaria.",
      "logo": "/favicon.ico",
      "favicon": "/favicon.ico"
    },
    "features": {
      "ordering": true,
      "delivery": false,
      "pickup": true,
      "tableOrders": false,
      "waiterCall": false,
      "reservation": false,
      "story": true
    },
    "operation": {
      "schedule": "Lunes a Sábado · 07:00 a 20:00 hs",
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
          "label": "Obrador",
          "href": "historia"
        },
        {
          "label": "Mostrador",
          "href": "menu"
        },
        {
          "label": "Encargos",
          "href": "contacto"
        }
      ],
      "cta": "Encargar"
    },
    "ordering": {
      "enabled": true,
      "channels": [
        "web"
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
        "defaultMessage": "Hola, quiero hacer un pedido en MIGA MADRE.",
        "tableOrderMessage": "Hola, envío el pedido desde mesa en MIGA MADRE.",
        "labelCheckout": "Enviar pedido por WhatsApp"
      }
    },
    "contact": {
      "address": "La Rioja 1822 (entre Luro y San Martín)",
      "zone": "Barrio La Perla",
      "city": "Mar del Plata",
      "country": "Argentina",
      "fullAddress": "Mar del Plata, Buenos Aires, Argentina",
      "phone": "+54 9 223 555-0100",
      "email": "hola@migademo.com",
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
      "title": "MIGA MADRE | Panadería de Masa Madre & Obrador",
      "description": "Masa madre, laminado francés y horno de piso en producción diaria.",
      "locale": "es_AR"
    },
    "content": {
      "hero": {
        "eyebrow": "Obrador · Producción Diaria",
        "titlePrefix": "Masa",
        "titleAccent": "madre.",
        "subtitle": "Hogazas de 850 g, viennoiserie francesa y focaccia al corte saliendo del horno durante todo el día.",
        "cta": "Encargar",
        "ctaHref": "menu",
        "image": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=1600&q=85&auto=format&fit=crop"
      },
      "story": {
        "eyebrow": "Obrador · Fermentación Lenta",
        "watermark": "MIGA",
        "titlePrefix": "El tiempo",
        "titleAccent": "también se amasa.",
        "sectionTag": "Cuaderno del Obrador",
        "primaryDescription": "Harina, hidratación, temperatura y fuego construyen una textura que no se puede acelerar.",
        "secondaryDescription": "Harina, hidratación, temperatura y fuego construyen una textura que no se puede acelerar. La propuesta cambia con la materia, el servicio y el momento del día.",
        "backgroundImage": "https://images.unsplash.com/photo-1590301157172-7ba48dd1c2b2?w=1600&q=85&auto=format&fit=crop",
        "labels": {
          "processLine": "Cuaderno del Obrador",
          "openArchive": "Explorar cuaderno del obrador",
          "traceability": "Trazabilidad",
          "closeSheet": "Cerrar Ficha"
        },
        "archive": [
          {
            "titulo": "Miga · Proceso",
            "subtitulo": "Masa",
            "nota": "Harina, hidratación, temperatura y fuego construyen una textura que no se puede acelerar.",
            "origen": "MIGA MADRE",
            "src": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1600&q=85&auto=format&fit=crop"
          },
          {
            "titulo": "Materia · Selección",
            "subtitulo": "Cuaderno del Obrador",
            "nota": "Una pieza de la identidad que define la experiencia y le da continuidad a la marca.",
            "origen": "MIGA MADRE",
            "src": "https://images.unsplash.com/photo-1519869325930-281384150729?w=1600&q=85&auto=format&fit=crop"
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
        "eyebrow": "Horno & Obrador",
        "title": "Mostrador",
        "subtitle": "Hogazas, croissants, focaccia y cajas de desayuno para retirar durante la jornada."
      },
      "ctaTransition": {
        "eyebrow": "Panadería de Masa Madre & Obrador",
        "titlePrefix": "El tiempo",
        "titleAccent": "también se amasa.",
        "description": "Masa madre, laminado francés y horno de piso en producción diaria.",
        "buttonText": "Encargar",
        "image": "https://images.unsplash.com/photo-1525265332434-d52e2314161d?w=1600&q=85&auto=format&fit=crop"
      },
      "contact": {
        "eyebrow": "Ubicación & Concierge",
        "statusBadge": "Operación activa",
        "mainLabel": "Establecimiento",
        "title": "Mostrador & Encargos",
        "formEyebrow": "Contacto",
        "formTitulo": "Mostrador & Encargos",
        "formSubtitulo": "Masa madre, laminado francés y horno de piso en producción diaria.",
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
        "receptionPrompt": "Mostrador & Encargos",
        "receptionButton": "Consultar"
      },
      "waiterModal": {
        "eyebrow": "MIGA MADRE",
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
        "backgroundImage": "https://images.unsplash.com/photo-1609525313344-a56b96f20718?w=1600&q=85&auto=format&fit=crop",
        "description": "MIGA MADRE · Panadería de Autor",
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
    "categories": bakeryCategories,
    "products": bakeryProducts
  }
} satisfies GastroPreset;
