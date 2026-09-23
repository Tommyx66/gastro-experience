import { NextResponse } from "next/server";

import type {
  GastroNiche,
} from "@/config/presets/types";

import {
  isGastroNiche,
} from "@/config/presets";

/* =========================================================
   TYPES
   ========================================================= */

export interface OrderPayload {
  niche?: GastroNiche;

  orderId?: string;

  channel?:
    | "web"
    | "table";

  fulfillment?:
    | "delivery"
    | "pickup"
    | "onsite";

  tableNumber?:
    | string
    | null;

  customerName?: string;

  address?: string;

  paymentMethod?: string;

  discountAmount?: number;

  notes?: string;

  items?: Array<{
    cartItemId: string;

    productId?: string;

    name: string;

    price: number;

    quantity: number;

    notes?: string;

    options?: Array<{
      groupId: string;
      groupName: string;
      itemId: string;
      itemName: string;
      priceDelta: number;
    }>;
  }>;

  total?: number;

  timestamp?: number;

  status?: string;

  /* ========================================================
     ASISTENCIA DE SALÓN
     ======================================================== */

  type?:
    | "call_waiter"
    | "request_bill"
    | "asistencia_salon";

  mesa?: string;

  message?: string;

  mensaje?: string;

  metodoPago?: string | null;
}

/* =========================================================
   POST
   ========================================================= */

export async function POST(
  request: Request
) {
  try {
    const body =
      (await request.json()) as OrderPayload;

    const niche =
      body.niche &&
      isGastroNiche(
        body.niche
      )
        ? body.niche
        : "restaurant";

    /* ======================================================
       1. ASISTENCIA DE SALÓN
       ====================================================== */

    const isWaiterRequest =
      body.type ===
        "call_waiter" ||
      body.type ===
        "request_bill" ||
      body.type ===
        "asistencia_salon";

    if (isWaiterRequest) {
      const table =
        body.tableNumber ||
        body.mesa ||
        "S/N";

      const message =
        body.message ||
        body.mensaje ||
        "Solicitud de asistencia general";

      const paymentMethod =
        body.paymentMethod ||
        body.metodoPago ||
        null;

      console.info(
        `[SALÓN - ${niche} - MESA ${table}] Asistencia solicitada:`,
        {
          niche,

          type:
            body.type,

          message,

          paymentMethod,

          timestamp:
            body.timestamp ||
            Date.now(),
        }
      );

      return NextResponse.json(
        {
          success: true,

          niche,

          message:
            `Aviso recibido correctamente para la mesa ${table}.`,

          timestamp:
            Date.now(),
        },
        {
          status: 200,
        }
      );
    }

    /* ======================================================
       2. COMANDA
       ====================================================== */

    if (
      !Array.isArray(
        body.items
      ) ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "La comanda no contiene ítems válidos.",
        },
        {
          status: 400,
        }
      );
    }

    const orderId =
      body.orderId ||
      `G-${Math.floor(
        1000 +
          Math.random() *
            9000
      )}`;

    console.info(
      `[COMANDA NUEVA #${orderId}] Niche: ${niche} | Canal: ${
        body.channel ||
        "web"
      } | Total: $${
        body.total || 0
      }`,
      {
        niche,

        orderId,

        customer:
          body.customerName ||
          "Anónimo",

        table:
          body.tableNumber ||
          "N/A",

        itemsCount:
          body.items.length,

        items:
          body.items.map(
            (item) => ({
              productId:
                item.productId ||
                null,

              name:
                item.name,

              quantity:
                item.quantity,

              price:
                item.price,
            })
          ),

        fulfillment:
          body.fulfillment ||
          "delivery",

        paymentMethod:
          body.paymentMethod ||
          "Efectivo",

        timestamp:
          body.timestamp ||
          Date.now(),
      }
    );

    /* ======================================================
       INTEGRACIONES FUTURAS
       ======================================================

       Acá después podemos conectar:

       - Supabase
       - KDS
       - WebSockets
       - Impresora térmica
       - Estado del pedido
       - Dashboard de cocina
       - Identidad del cliente / tenant

       El niche ya llega correctamente separado.
    */

    return NextResponse.json(
      {
        success: true,

        niche,

        orderId,

        message:
          "Comanda registrada correctamente.",

        timestamp:
          Date.now(),
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Error crítico al procesar la comanda:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Error interno del servidor al procesar la solicitud.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   GET
   ========================================================= */

export async function GET() {
  return NextResponse.json(
    {
      status:
        "Gastro Engine API operational",

      timestamp:
        Date.now(),
    },
    {
      status: 200,
    }
  );
}