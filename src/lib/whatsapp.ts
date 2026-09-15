import type { CartItem } from "@/store/use-cart-store";

interface WhatsAppCheckoutData {
  businessName: string;
  whatsapp: string;
  customerName: string;
  deliveryMode?: "delivery" | "pickup";
  address?: string;
  notes?: string;
  items: CartItem[];
  total: number;
}

function formatARS(value: number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

export function buildWhatsAppOrder({
  businessName,
  customerName,
  deliveryMode,
  address,
  notes,
  items,
  total,
}: Omit<WhatsAppCheckoutData, "whatsapp">): string {
  const lines = items.map((item) => {
    const options =
      item.options && item.options.length > 0
        ? ` (${item.options.map((option) => option.name).join(", ")})`
        : "";

    return `${item.quantity}x ${item.name}${options} - ${formatARS(
      item.price * item.quantity,
    )}`;
  });

  const delivery =
    deliveryMode === "delivery"
      ? `Modalidad: Envío\nDirección: ${address?.trim() || "A confirmar"}`
      : deliveryMode === "pickup"
        ? "Modalidad: Retiro en local"
        : "";

  return [
    `Hola ${businessName}, quiero hacer este pedido:`,
    "",
    ...lines,
    "",
    `Total: ${formatARS(total)}`,
    customerName.trim()
      ? `Nombre: ${customerName.trim()}`
      : "",
    delivery,
    notes?.trim()
      ? `Observaciones: ${notes.trim()}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppUrl(
  whatsapp: string,
  message: string,
): string {
  const cleanNumber = whatsapp.replace(/\D/g, "");

  if (!cleanNumber) {
    throw new Error("El número de WhatsApp no es válido.");
  }

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    message,
  )}`;
}