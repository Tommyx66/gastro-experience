"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  ChevronRight,
  Minus,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import { useGastro } from "@/context/gastro-context";
import {
  useCartStore,
  type SelectedOptionSnapshot,
} from "@/store/use-cart-store";
import type { MenuProduct } from "@/data/menu";

/* =========================================================
   TYPES
========================================================= */

type ProductDetailModalProps = {
  product: MenuProduct | null;
  open?: boolean;
  onClose: () => void;
};

type SelectedOptions = Record<string, string[]>;

type NormalizedOption = {
  id: string;
  name: string;
  priceDelta: number;
};

type NormalizedGroup = {
  id: string;
  name: string;
  required: boolean;
  multiple: boolean;
  options: NormalizedOption[];
};

type Feedback =
  | {
      type: "warning";
      title: string;
      description: string;
    }
  | {
      type: "success";
      title: string;
      description: string;
    }
  | null;

/* =========================================================
   HELPERS
========================================================= */

function safePrice(value: unknown): number {
  const numeric = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function formatPrice(value: unknown): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(safePrice(value));
}

function normalizeOptionGroups(product: MenuProduct | null): NormalizedGroup[] {
  if (!product) return [];

  const groups = Array.isArray(product.optionGroups)
    ? product.optionGroups
    : [];

  return groups
    .map((group, groupIndex) => {
      const options = Array.isArray(group.items) ? group.items : [];

      return {
        id: group.id || `group-${groupIndex}`,
        name: group.name || "Opciones",
        required: Boolean(group.required),
        multiple: group.type === "multiple",
        options: options.map((option, optionIndex) => ({
          id: option.id || `option-${groupIndex}-${optionIndex}`,
          name: option.name || "Opción",
          priceDelta: safePrice(option.priceDelta),
        })),
      };
    })
    .filter((group) => group.options.length > 0);
}

/* =========================================================
   COMPONENT
========================================================= */

export default function ProductDetailModal({
  product,
  open,
  onClose,
}: ProductDetailModalProps) {
  const { config, preset } = useGastro();
  const addItem = useCartStore((state) => state.addItem);

  const copy = config.content.productDetail;
  const visualVariant = (preset as any).visual?.productCard ?? "photo";
  const isOpen = open ?? Boolean(product);

  /* =======================================================
     STATE
  ======================================================= */

  const [mounted, setMounted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const modalRootRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<Record<string, HTMLElement | null>>({});
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const groups = useMemo(() => normalizeOptionGroups(product), [product]);

  /* =======================================================
     MOUNT
  ======================================================= */

  useEffect(() => {
    setMounted(true);
    return () => {
      if (feedbackTimer.current) {
        clearTimeout(feedbackTimer.current);
      }
    };
  }, []);

  /* =======================================================
     RESET
  ======================================================= */

  useEffect(() => {
    if (!isOpen || !product) return;

    setSelectedOptions({});
    setNotes("");
    setQuantity(1);
    setFeedback(null);

    requestAnimationFrame(() => {
      modalRootRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
      rightScrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [isOpen, product]);

  /* =======================================================
     BODY LOCK
  ======================================================= */

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [isOpen]);

  /* =======================================================
     KEYBOARD
  ======================================================= */

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  /* =======================================================
     SCROLL ISOLATION (PREVIENE INTERCEPCIÓN DE LENIS)
  ======================================================= */

  useEffect(() => {
    if (!isOpen) return;

    const outerElement = modalRootRef.current;
    const innerElement = rightScrollRef.current;

    const stopWheel = (event: WheelEvent) => event.stopPropagation();
    const stopTouch = (event: TouchEvent) => event.stopPropagation();

    [outerElement, innerElement].forEach((element) => {
      if (!element) return;
      element.addEventListener("wheel", stopWheel, { capture: true, passive: true });
      element.addEventListener("touchmove", stopTouch, { capture: true, passive: true });
    });

    return () => {
      [outerElement, innerElement].forEach((element) => {
        if (!element) return;
        element.removeEventListener("wheel", stopWheel, true);
        element.removeEventListener("touchmove", stopTouch, true);
      });
    };
  }, [isOpen]);

  /* =======================================================
     PRICE CALCULATION
  ======================================================= */

  const calculatedPrice = useMemo(() => {
    if (!product) return 0;

    let total = safePrice(product.price);

    for (const group of groups) {
      const selected = selectedOptions[group.id] ?? [];
      for (const option of group.options) {
        if (selected.includes(option.id)) {
          total += option.priceDelta;
        }
      }
    }

    return safePrice(total);
  }, [product, groups, selectedOptions]);

  /* =======================================================
     VALIDATION
  ======================================================= */

  const allRequiredSelected = useMemo(
    () =>
      groups.every((group) => {
        if (!group.required) return true;
        return (selectedOptions[group.id] ?? []).length > 0;
      }),
    [groups, selectedOptions]
  );

  const selectedOptionCount = Object.values(selectedOptions).reduce(
    (total, values) => total + values.length,
    0
  );

  /* =======================================================
     FEEDBACK TOAST
  ======================================================= */

  const showFeedback = (next: Feedback) => {
    setFeedback(next);
    if (feedbackTimer.current) {
      clearTimeout(feedbackTimer.current);
    }
    feedbackTimer.current = setTimeout(() => {
      setFeedback(null);
    }, 2600);
  };

  /* =======================================================
     TOGGLE OPTION
  ======================================================= */

  const toggleOption = (
    groupId: string,
    optionId: string,
    multiple: boolean
  ) => {
    setSelectedOptions((current) => {
      const existing = current[groupId] ?? [];

      if (!multiple) {
        return {
          ...current,
          [groupId]: existing[0] === optionId ? [] : [optionId],
        };
      }

      return {
        ...current,
        [groupId]: existing.includes(optionId)
          ? existing.filter((id) => id !== optionId)
          : [...existing, optionId],
      };
    });

    setFeedback(null);
  };

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAdd = () => {
    if (!product) return;

    const missingGroup = groups.find(
      (group) => group.required && (selectedOptions[group.id] ?? []).length === 0
    );

    if (missingGroup) {
      showFeedback({
        type: "warning",
        title: "Falta elegir una opción",
        description: missingGroup.name,
      });

      requestAnimationFrame(() => {
        const target = groupRefs.current[missingGroup.id];
        target?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });

      return;
    }

    const snapshots: SelectedOptionSnapshot[] = groups.flatMap((group) => {
      const selected = selectedOptions[group.id] ?? [];

      return selected
        .map((optionId) => {
          const option = group.options.find((cand) => cand.id === optionId);
          if (!option) return null;

          return {
            groupId: group.id,
            groupName: group.name,
            itemId: option.id,
            itemName: option.name,
            priceDelta: option.priceDelta,
          };
        })
        .filter((opt): opt is SelectedOptionSnapshot => opt !== null);
    });

    addItem(product, snapshots, quantity, notes);

    showFeedback({
      type: "success",
      title: copy.actions.added,
      description: `${quantity} × ${product.name}`,
    });

    window.setTimeout(onClose, 650);
  };

  if (!mounted || !isOpen || !product) {
    return null;
  }

  const imageSrc =
    typeof product.image === "string" && product.image.length > 0
      ? product.image
      : null;

  const titleNumber =
    visualVariant === "clean"
      ? "Selección"
      : visualVariant === "compact"
      ? "Detalle"
      : "Experiencia";

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="product-detail-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-black/75 p-2 backdrop-blur-lg sm:p-5 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
      >
        {/* BACKDROP CLICK */}
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.actions.close}
          className="absolute inset-0 cursor-default"
        />

        {/* =================================================
            MODAL CARD (EN MD: ALTURA CONTENIDA Y OVERFLOW-HIDDEN)
        ================================================== */}
        <motion.div
          ref={modalRootRef}
          data-product-modal-scroll
          data-lenis-prevent
          initial={{ y: 26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 330, damping: 30 }}
          onClick={(event) => event.stopPropagation()}
          className="
            relative
            z-10
            mx-auto
            h-full
            w-full
            max-w-[1120px]
            overflow-y-auto
            overflow-x-hidden
            overscroll-contain
            rounded-[28px]
            border
            border-[var(--color-border-strong)]
            bg-[var(--color-bg)]
            text-[var(--color-text)]
            shadow-[0_40px_140px_rgba(0,0,0,0.48)]
            [scrollbar-width:thin]
            [-webkit-overflow-scrolling:touch]
            [scrollbar-color:var(--color-accent-border)_transparent]
            md:h-[min(880px,calc(100dvh-64px))]
            md:overflow-hidden
          "
          style={{ touchAction: "pan-y" }}
        >
          {/* =================================================
              CONTENT GRID (MD: H-FULL)
          ================================================== */}
          <div className="grid h-full md:grid-cols-[minmax(340px,0.85fr)_minmax(0,1.15fr)]">
            {/* =============================================
                COLUMNA IZQUIERDA (TOTALMENTE ESTÁTICA EN DESKTOP)
            ============================================== */}
            <div
              className="
                relative
                min-h-[340px]
                overflow-hidden
                border-b
                border-[var(--color-border)]
                md:h-full
                md:min-h-0
                md:border-b-0
                md:border-r
              "
            >
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  priority
                  draggable={false}
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="pointer-events-none select-none object-cover brightness-[0.74] contrast-[1.04]"
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--color-surface-elevated)]" />
              )}

              {/* GRADIENTE SUPERIOR E INFERIOR */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/15" />

              {/* BARRA SUPERIOR: TAGS & BOTÓN CERRAR */}
              <div className="absolute inset-x-5 top-5 z-10 flex items-start justify-between gap-4 md:inset-x-6 md:top-6">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="shrink-0 font-mono text-[8px] font-bold uppercase tracking-[0.23em] text-[var(--color-accent-strong)]">
                    {titleNumber}
                  </span>
                  <span className="h-px w-5 shrink-0 bg-[var(--color-accent)]" />
                  {product.tags?.[0] && (
                    <span className="max-w-[145px] truncate font-mono text-[8px] font-bold uppercase tracking-[0.13em] text-white/70">
                      {product.tags[0]}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label={copy.actions.close}
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:bg-black/60 active:scale-95"
                >
                  <X size={15} />
                </button>
              </div>

              {/* CABECERA INFERIOR FIJA CON TÍTULO Y PRECIO */}
              <div className="absolute inset-x-5 bottom-7 z-10 md:inset-x-6 md:bottom-8">
                <div className="mb-2.5 flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-white/60">
                  <Sparkles size={11} className="text-[var(--color-accent)]" />
                  <span>
                    {groups.length ? "Personalizá tu orden" : "Receta de Autor"}
                  </span>
                </div>

                <h2 className="max-w-xl text-[clamp(2.4rem,5.5vw,5rem)] font-semibold uppercase leading-[0.84] tracking-[-0.065em] text-white">
                  {product.name}
                </h2>

                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-sm font-bold tracking-[0.06em] text-[var(--color-accent-strong)]">
                    {formatPrice(calculatedPrice)} c/u
                  </span>

                  {selectedOptionCount > 0 && (
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-white/75 backdrop-blur-md">
                      {selectedOptionCount} agregadas
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* =============================================
                COLUMNA DERECHA (SCROLL INDEPENDIENTE EN DESKTOP)
            ============================================== */}
            <div className="flex min-w-0 flex-col md:h-full md:min-h-0 md:overflow-hidden">
              {/* ÁREA SCROLLEABLE DE OPCIONES */}
              <div
                ref={rightScrollRef}
                data-lenis-prevent
                data-lenis-prevent-wheel
                data-lenis-prevent-touch
                className="
                  flex-1
                  px-5
                  pb-6
                  pt-6
                  sm:px-7
                  sm:pt-8
                  md:overflow-y-auto
                  md:overscroll-contain
                  md:px-8
                  md:pt-9
                  [scrollbar-width:thin]
                  [scrollbar-color:var(--color-accent-border)_transparent]
                "
              >
                {/* DESCRIPCIÓN */}
                {product.description && (
                  <div className="border-l-2 border-[var(--color-accent)] pl-4">
                    <p className="max-w-xl text-xs sm:text-sm font-light leading-relaxed text-[var(--color-text-muted)]">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* GRUPOS DE OPCIONES */}
                <div className="mt-7 space-y-7">
                  {groups.map((group, groupIndex) => {
                    const selected = selectedOptions[group.id] ?? [];

                    return (
                      <section
                        key={group.id}
                        ref={(node) => {
                          groupRefs.current[group.id] = node;
                        }}
                      >
                        <div className="mb-3.5 flex items-start justify-between gap-3 border-b border-[var(--color-border)] pb-3">
                          <div>
                            <div className="mb-1.5 flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                              <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                              <span className="h-px w-4 bg-[var(--color-accent)]" />
                            </div>

                            <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                              {group.name}
                            </h3>

                            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.13em] text-[var(--color-text-subtle)]">
                              {group.multiple
                                ? "Podés elegir varias"
                                : group.required
                                ? "Elegí una opción"
                                : "Opcional"}
                            </p>
                          </div>

                          {group.required && (
                            <span className="shrink-0 rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--color-accent)]">
                              Requerido
                            </span>
                          )}
                        </div>

                        <div className="space-y-2">
                          {group.options.map((option) => {
                            const active = selected.includes(option.id);

                            return (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() =>
                                  toggleOption(
                                    group.id,
                                    option.id,
                                    group.multiple
                                  )
                                }
                                aria-pressed={active}
                                className="group flex min-h-[58px] w-full cursor-pointer items-center gap-3 rounded-[18px] border px-4 py-3 text-left transition-all duration-200 active:scale-[0.995]"
                                style={{
                                  borderColor: active
                                    ? "var(--color-accent)"
                                    : "var(--color-border)",
                                  background: active
                                    ? "var(--color-accent)"
                                    : "var(--color-surface)",
                                  color: active
                                    ? "var(--color-accent-contrast)"
                                    : "var(--color-text)",
                                  boxShadow: active
                                    ? "0 8px 24px var(--color-accent-soft)"
                                    : undefined,
                                }}
                              >
                                <span
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors"
                                  style={{
                                    borderColor: active
                                      ? "rgba(255,255,255,0.3)"
                                      : "var(--color-border)",
                                    background: active
                                      ? "rgba(255,255,255,0.15)"
                                      : "var(--color-control)",
                                  }}
                                >
                                  {active ? (
                                    <Check size={13} strokeWidth={2.5} />
                                  ) : (
                                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-text-subtle)]" />
                                  )}
                                </span>

                                <span className="min-w-0 flex-1">
                                  <span className="block text-xs sm:text-sm font-medium leading-snug">
                                    {option.name}
                                  </span>

                                  {option.priceDelta > 0 && (
                                    <span
                                      className="mt-0.5 block font-mono text-[9px] font-semibold"
                                      style={{
                                        color: active
                                          ? "inherit"
                                          : "var(--color-accent)",
                                        opacity: active ? 0.8 : 1,
                                      }}
                                    >
                                      + {formatPrice(option.priceDelta)}
                                    </span>
                                  )}
                                </span>

                                <ChevronRight
                                  size={13}
                                  className="shrink-0 opacity-30 transition-transform duration-200 group-hover:translate-x-0.5"
                                />
                              </button>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
                </div>

                {/* NOTAS DE PEDIDO */}
                <section className="mt-8 border-t border-[var(--color-border)] pt-6">
                  <div className="mb-2.5">
                    <span className="mb-1 block font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
                      Observaciones
                    </span>
                    <h3 className="text-base font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                      {copy.notes.label}
                    </h3>
                  </div>

                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder={copy.notes.placeholder}
                    rows={3}
                    maxLength={180}
                    className="w-full resize-none rounded-[18px] border border-[var(--color-border)] bg-[var(--color-control)] px-4 py-3 text-xs leading-relaxed outline-none transition-all placeholder:text-[var(--color-text-subtle)] hover:border-[var(--color-border-strong)] focus:border-[var(--color-accent-border)] focus:bg-[var(--color-accent-faint)]"
                  />
                </section>

                <div className="h-6 md:h-10" />
              </div>

              {/* BARRA DE ACCIÓN ANCLADA (STICKY / FIXED BOTTOM) */}
              <div className="sticky bottom-0 z-30 shrink-0 border-t border-[var(--color-border)] bg-[var(--color-bg)]/98 p-3.5 backdrop-blur-2xl sm:p-4">
                <div className="flex items-center gap-2.5">
                  {/* SELECTOR DE CANTIDAD */}
                  <div className="flex h-11 shrink-0 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((v) => Math.max(1, v - 1))}
                      disabled={quantity <= 1}
                      aria-label={copy.actions.decreaseQuantity}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-all hover:bg-[var(--color-control)] hover:text-[var(--color-text)] disabled:opacity-30 cursor-pointer active:scale-90"
                    >
                      <Minus size={13} />
                    </button>

                    <span className="w-7 text-center font-mono text-xs font-bold tabular-nums">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => setQuantity((v) => v + 1)}
                      aria-label={copy.actions.increaseQuantity}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-all hover:bg-[var(--color-control)] hover:text-[var(--color-text)] cursor-pointer active:scale-90"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* BOTÓN SUMAR */}
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="group flex h-11 min-w-0 flex-1 cursor-pointer items-center justify-between gap-3 rounded-full bg-[var(--color-accent)] px-5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent-contrast)] shadow-lg transition-all duration-300 hover:brightness-110 active:scale-[0.985]"
                  >
                    <span className="min-w-0 truncate">
                      {allRequiredSelected
                        ? copy.actions.add
                        : copy.actions.chooseRequired}
                    </span>

                    <span className="shrink-0 font-mono text-xs font-bold tabular-nums">
                      {allRequiredSelected
                        ? formatPrice(calculatedPrice * quantity)
                        : "—"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FEEDBACK TOAST */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="pointer-events-none fixed left-4 right-4 top-4 z-[150] mx-auto flex max-w-md items-start gap-3 rounded-[20px] border bg-[var(--color-surface)]/98 px-4 py-3.5 shadow-2xl backdrop-blur-xl"
              style={{
                borderColor:
                  feedback.type === "warning"
                    ? "var(--color-accent-border)"
                    : "rgba(52,211,153,0.30)",
              }}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)]"
                style={{
                  color:
                    feedback.type === "warning"
                      ? "var(--color-accent)"
                      : "#34D399",
                }}
              >
                {feedback.type === "warning" ? (
                  <AlertCircle size={16} />
                ) : (
                  <Check size={16} />
                )}
              </span>

              <div className="min-w-0">
                <p className="text-xs font-semibold">{feedback.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
                  {feedback.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}