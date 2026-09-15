"use client";

import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";

import { useCartStore } from "@/store/use-cart-store";
import {
  buildWhatsAppOrder,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";

const WHATSAPP_NUMBER = "549223000000";
const BUSINESS_NAME = "Gastro Experience";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    clearCart,
  } = useCartStore();

  const [customerName, setCustomerName] =
    useState("");

  const [deliveryMode, setDeliveryMode] =
    useState<"delivery" | "pickup">("pickup");

  const [address, setAddress] = useState("");

  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const total = subtotal();

  function handleCheckout() {
    if (!items.length) return;

    const message = buildWhatsAppOrder({
      businessName: BUSINESS_NAME,
      customerName,
      deliveryMode,
      address,
      notes,
      items,
      total,
    });

    const url = buildWhatsAppUrl(
      WHATSAPP_NUMBER,
      message,
    );

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-[#111] text-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              Tu pedido
            </p>

            <h2 className="mt-1 text-xl">
              {items.length
                ? `${items.length} productos`
                : "Carrito vacío"}
            </h2>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="rounded-full border border-white/10 p-2 text-white/70 transition hover:text-white"
          >
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {!items.length ? (
            <div className="flex h-full items-center justify-center text-sm text-white/40">
              Todavía no agregaste productos.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-white/50">
                        {item.price.toLocaleString(
                          "es-AR",
                          {
                            style: "currency",
                            currency: "ARS",
                            maximumFractionDigits: 0,
                          },
                        )}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.productId)
                      }
                      className="text-xs text-white/30 transition hover:text-white"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-white/10">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity - 1,
                          )
                        }
                        className="p-2 text-white/60 hover:text-white"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="min-w-5 text-center text-sm">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity + 1,
                          )
                        }
                        className="p-2 text-white/60 hover:text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <span className="text-sm">
                      {(item.price * item.quantity).toLocaleString(
                        "es-AR",
                        {
                          style: "currency",
                          currency: "ARS",
                          maximumFractionDigits: 0,
                        },
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-8 space-y-4">
              <input
                value={customerName}
                onChange={(event) =>
                  setCustomerName(event.target.value)
                }
                placeholder="Nombre"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-white/30"
              />

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setDeliveryMode("pickup")
                  }
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    deliveryMode === "pickup"
                      ? "border-white bg-white text-black"
                      : "border-white/10 text-white/60"
                  }`}
                >
                  Retiro
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setDeliveryMode("delivery")
                  }
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    deliveryMode === "delivery"
                      ? "border-white bg-white text-black"
                      : "border-white/10 text-white/60"
                  }`}
                >
                  Envío
                </button>
              </div>

              {deliveryMode === "delivery" && (
                <input
                  value={address}
                  onChange={(event) =>
                    setAddress(event.target.value)
                  }
                  placeholder="Dirección de entrega"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-white/30"
                />
              )}

              <textarea
                value={notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
                placeholder="Observaciones"
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-white/30"
              />
            </div>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-white/10 p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-white/50">
                Total
              </span>

              <strong className="text-xl">
                {total.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  maximumFractionDigits: 0,
                })}
              </strong>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full rounded-full bg-white px-5 py-4 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.01]"
            >
              Enviar pedido por WhatsApp
            </button>

            <button
              type="button"
              onClick={clearCart}
              className="mt-3 w-full text-xs text-white/30 hover:text-white"
            >
              Vaciar pedido
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}