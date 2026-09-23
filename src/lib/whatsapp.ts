import type { CartItem } from "@/store/use-cart-store";

export interface WhatsAppOrderPayload {
  orderId: string;
  businessName: string;
  customerName?: string;
  deliveryMode: "delivery" | "pickup" | "table";
  tableNumber?: string | null;
  address?: string;
  paymentMethod?: string;
  discountAmount?: number;
  notes?: string;
  items: CartItem[];
  total: number;
}

export function formatARS(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

export function buildWhatsAppOrder({
  orderId,
  businessName,
  customerName,
  deliveryMode,
  tableNumber,
  address,
  paymentMethod = "Efectivo",
  discountAmount = 0,
  notes,
  items,
  total,
}: WhatsAppOrderPayload): string {
  const isTable =
    deliveryMode === "table" &&
    Boolean(tableNumber);

  const isTransfer =
    paymentMethod.toLowerCase().includes("transferencia") ||
    paymentMethod.toLowerCase().includes("mercado pago") ||
    paymentMethod.toLowerCase().includes("qr");

  const now = new Date();

  const timeStr = `${String(
    now.getHours()
  ).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")} hs`;

  const lines: string[] = [];

  /* ========================================================
     CABECERA
     ======================================================== */

  if (isTable) {
    lines.push(
      `*COMANDA #${orderId} — MESA ${tableNumber}*`
    );
    lines.push(businessName.toUpperCase());
  } else if (deliveryMode === "delivery") {
    lines.push(
      `*PEDIDO DELIVERY #${orderId} — ${businessName.toUpperCase()}*`
    );
  } else {
    lines.push(
      `*PEDIDO RETIRO #${orderId} — ${businessName.toUpperCase()}*`
    );
  }

  lines.push("━━━━━━━━━━━━━━━━━━━━━");

  /* ========================================================
     DATOS
     ======================================================== */

  if (isTable) {
    lines.push(
      `*Sector:* Servicio en Salón (Mesa ${tableNumber})`
    );
  } else {
    if (customerName?.trim()) {
      lines.push(
        `*Cliente:* ${customerName
          .trim()
          .toUpperCase()}`
      );
    }

    if (deliveryMode === "delivery") {
      lines.push("*Modalidad:* Envío a domicilio");
      lines.push(
        `*Dirección:* ${
          address?.trim() || "A coordinar"
        }`
      );
    } else {
      lines.push("*Modalidad:* Retiro por salón");
    }
  }

  lines.push(`*Pago:* ${paymentMethod}`);

  if (isTransfer) {
    lines.push(
      "*Estado:* PENDIENTE DE COMPROBANTE"
    );
  }

  lines.push(`*Horario:* ${timeStr}`);

  lines.push("━━━━━━━━━━━━━━━━━━━━━");
  lines.push("");
  lines.push("*DETALLE DE COMANDA:*");
  lines.push("");

  /* ========================================================
     PRODUCTOS
     ======================================================== */

  items.forEach((item, index) => {
    const itemSubtotal = formatARS(
      item.price * item.quantity
    );

    lines.push(
      `*${item.quantity}x  ${item.name.toUpperCase()}*`
    );

    lines.push(
      `    Subtotal: ${itemSubtotal}`
    );

    if (item.options?.length) {
      item.options.forEach((option) => {
        const delta =
          option.priceDelta > 0
            ? ` (+${formatARS(option.priceDelta)})`
            : "";

        lines.push(
          `    > ${option.groupName}: ${option.itemName}${delta}`
        );
      });
    }

    if (item.notes?.trim()) {
      lines.push(
        `    > Obs: "${item.notes.trim()}"`
      );
    }

    if (index < items.length - 1) {
      lines.push("");
    }
  });

  /* ========================================================
     TOTAL
     ======================================================== */

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━━━━");

  if (discountAmount > 0) {
    const subtotalBeforeDiscount =
      total + discountAmount;

    lines.push(
      `Subtotal: ${formatARS(
        subtotalBeforeDiscount
      )}`
    );

    lines.push(
      `*Descuento Efectivo:* -${formatARS(
        discountAmount
      )}`
    );
  }

  lines.push(
    `*TOTAL A PAGAR: ${formatARS(total)}*`
  );

  /* ========================================================
     TRANSFERENCIA
     ======================================================== */

  if (isTransfer) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━");
    lines.push(
      "*MEDIO DE PAGO:* Transferencia / QR"
    );
    lines.push(
      "_Los datos de transferencia se comunican por el canal de atención._"
    );
  }

  /* ========================================================
     ACLARACIONES
     ======================================================== */

  if (notes?.trim()) {
    lines.push("━━━━━━━━━━━━━━━━━━━━━");

    lines.push(
      `*Aclaraciones:* "${notes.trim()}"`
    );
  }

  lines.push("━━━━━━━━━━━━━━━━━━━━━");

  lines.push(
    `_Comanda digital generada por ${businessName}_`
  );

  return lines.join("\n");
}

export function buildWhatsAppUrl(
  phone: string,
  message: string
): string {
  const cleanNumber = phone.replace(/\D/g, "");

  const encodedMessage =
    encodeURIComponent(message);

  if (!cleanNumber) {
    return `https://api.whatsapp.com/send?text=${encodedMessage}`;
  }

  return `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;
}