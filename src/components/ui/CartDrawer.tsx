"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

import Link from "next/link";

import {
  useGastro,
} from "@/context/gastro-context";

import {
  useCartStore,
} from "@/store/use-cart-store";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  BackgroundImageTexture,
} from "@/components/ui/bg-image-texture";

/* =========================================================
   HELPERS
   ========================================================= */

function safePrice(
  value: unknown,
): number {
  const numeric =
    typeof value === "number"
      ? value
      : Number(value);

  return Number.isFinite(
    numeric,
  )
    ? numeric
    : 0;
}

function formatPrice(
  value: unknown,
): string {
  return safePrice(
    value,
  ).toLocaleString(
    "es-AR",
  );
}

/* =========================================================
   IMAGE RESOLUTION
   ========================================================= */

function isUsableImageSource(
  value: unknown,
): value is string {
  if (
    typeof value !==
    "string"
  ) {
    return false;
  }

  const source =
    value.trim();

  if (!source) {
    return false;
  }

  return (
    source.startsWith(
      "http://",
    ) ||
    source.startsWith(
      "https://",
    ) ||
    source.startsWith(
      "/",
    ) ||
    source.startsWith(
      "data:image/",
    )
  );
}

function readImageSource(
  value: unknown,
): string | null {
  if (
    isUsableImageSource(
      value,
    )
  ) {
    return value;
  }

  if (
    !value ||
    typeof value !==
      "object"
  ) {
    return null;
  }

  const record =
    value as Record<
      string,
      unknown
    >;

  const candidates = [
    record.image,
    record.imageUrl,
    record.imageURL,
    record.src,
    record.photo,
    record.photoUrl,
    record.thumbnail,
    record.thumbnailUrl,
    record.cover,
    record.coverImage,
  ];

  for (
    const candidate of candidates
  ) {
    if (
      isUsableImageSource(
        candidate,
      )
    ) {
      return candidate;
    }
  }

  return null;
}

function readIdentifier(
  value: unknown,
): string | null {
  if (
    value === null ||
    value === undefined
  ) {
    return null;
  }

  if (
    typeof value ===
      "string" ||
    typeof value ===
      "number"
  ) {
    return String(
      value,
    );
  }

  if (
    typeof value ===
      "object"
  ) {
    const record =
      value as Record<
        string,
        unknown
      >;

    const candidates = [
      record.id,
      record.productId,
      record.menuProductId,
      record.itemId,
      record.slug,
    ];

    for (
      const candidate of candidates
    ) {
      if (
        typeof candidate ===
          "string" ||
        typeof candidate ===
          "number"
      ) {
        return String(
          candidate,
        );
      }
    }
  }

  return null;
}

function readName(
  value: unknown,
): string | null {
  if (
    !value ||
    typeof value !==
      "object"
  ) {
    return null;
  }

  const record =
    value as Record<
      string,
      unknown
    >;

  const candidates = [
    record.name,
    record.title,
    record.nombre,
    record.titulo,
  ];

  for (
    const candidate of candidates
  ) {
    if (
      typeof candidate ===
      "string"
    ) {
      const normalized =
        candidate.trim();

      if (
        normalized
      ) {
        return normalized;
      }
    }
  }

  return null;
}

function normalizeText(
  value: string | null,
): string {
  return (
    value
      ?.trim()
      .toLocaleLowerCase(
        "es-AR",
      ) ?? ""
  );
}

function collectProducts(
  value: unknown,
): unknown[] {
  if (
    !value ||
    typeof value !==
      "object"
  ) {
    return [];
  }

  if (
    Array.isArray(value)
  ) {
    return value;
  }

  const record =
    value as Record<
      string,
      unknown
    >;

  const products: unknown[] =
    [];

  if (
    Array.isArray(
      record.products,
    )
  ) {
    products.push(
      ...record.products,
    );
  }

  if (
    Array.isArray(
      record.items,
    )
  ) {
    products.push(
      ...record.items,
    );
  }

  if (
    Array.isArray(
      record.categories,
    )
  ) {
    for (
      const category of
        record.categories
    ) {
      products.push(
        ...collectProducts(
          category,
        ),
      );
    }
  }

  return products;
}

function resolveProductImage(
  item: unknown,
  menu: unknown,
): string | null {
  const cartItem =
    item as Record<
      string,
      unknown
    >;

  /* -------------------------------------------------------
     1. Image already stored in cart
     ------------------------------------------------------- */

  const directImage =
    readImageSource(
      cartItem.image,
    ) ??
    readImageSource(
      cartItem.imageUrl,
    ) ??
    readImageSource(
      cartItem.photo,
    ) ??
    readImageSource(
      cartItem.product,
    );

  if (directImage) {
    return directImage;
  }

  /* -------------------------------------------------------
     2. Resolve product from cart identifiers
     ------------------------------------------------------- */

  const itemId =
    readIdentifier(
      cartItem.productId,
    ) ??
    readIdentifier(
      cartItem.menuProductId,
    ) ??
    readIdentifier(
      cartItem.itemId,
    ) ??
    readIdentifier(
      cartItem.product,
    ) ??
    readIdentifier(
      cartItem.id,
    );

  const itemName =
    normalizeText(
      readName(item),
    );

  const products =
    collectProducts(
      menu,
    );

  /* -------------------------------------------------------
     3. Match by ID
     ------------------------------------------------------- */

  if (itemId) {
    for (
      const product of products
    ) {
      const productId =
        readIdentifier(
          product,
        );

      if (
        productId &&
        productId ===
          itemId
      ) {
        const image =
          readImageSource(
            product,
          );

        if (image) {
          return image;
        }
      }
    }
  }

  /* -------------------------------------------------------
     4. Match by product name
     ------------------------------------------------------- */

  if (itemName) {
    for (
      const product of products
    ) {
      const productName =
        normalizeText(
          readName(
            product,
          ),
        );

      if (
        productName &&
        productName ===
          itemName
      ) {
        const image =
          readImageSource(
            product,
          );

        if (image) {
          return image;
        }
      }
    }
  }

  return null;
}

/* =========================================================
   COMPONENT
   ========================================================= */

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
  } = useCartStore();

  const {
    config,
    niche,
    menu,
  } = useGastro();

  const copy =
    config.content.cart;

  const checkoutCopy =
    config.content.checkout;

  const total =
    safePrice(
      subtotal(),
    );

  const totalUnits =
    items.reduce(
      (sum, item) =>
        sum +
        Math.max(
          0,
          Number.isFinite(
            Number(
              item.quantity,
            ),
          )
            ? Math.floor(
                Number(
                  item.quantity,
                ),
              )
            : 0,
        ),
      0,
    );

  const checkoutHref =
    `/pedido?type=${encodeURIComponent(
      niche,
    )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110]">
          <motion.button
            type="button"
            aria-label={
              copy.closeOrder
            }
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={closeCart}
            className="absolute inset-0 bg-[var(--color-overlay)] backdrop-blur-sm"
          />

          <motion.aside
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 320,
            }}
            className="
              absolute
              right-0
              top-0
              flex
              h-full
              w-full
              max-w-lg
              flex-col
              border-l
              border-[var(--color-border)]
              bg-[var(--color-bg)]
              text-[var(--color-text)]
              shadow-2xl
            "
          >
            <BackgroundImageTexture
              variant="grid-noise"
              opacity={0.09}
              className="border-b border-[var(--color-border)]"
            >
              <header className="relative z-10 px-5 py-5 sm:px-6 sm:py-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                      {
                        copy.eyebrow
                      }
                    </span>

                    <h2 className="mt-1.5 text-3xl font-light uppercase tracking-tight sm:text-4xl">
                      {copy.title}
                    </h2>

                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
                      {totalUnits}{" "}
                      {totalUnits ===
                      1
                        ? copy.productSingular
                        : copy.productPlural}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={
                      closeCart
                    }
                    aria-label={
                      copy.close
                    }
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[var(--color-border)]
                      bg-[var(--color-control)]
                      text-[var(--color-text-muted)]
                      transition-all
                      hover:border-[var(--color-accent-border)]
                      hover:text-[var(--color-accent)]
                      active:scale-95
                    "
                  >
                    <X size={16} />
                  </button>
                </div>
              </header>
            </BackgroundImageTexture>

            <div
              data-lenis-prevent
              onWheel={(event) =>
                event.stopPropagation()
              }
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5"
            >
              {items.length ===
              0 ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center"
                >
                  <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <ShoppingBag
                      size={28}
                      strokeWidth={1.6}
                    />
                  </span>

                  <h3 className="text-2xl font-light uppercase">
                    {
                      copy.emptyTitle
                    }
                  </h3>

                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {
                      copy.emptyDescription
                    }
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {items.map(
                    (item) => {
                      const quantity =
                        Math.max(
                          1,
                          Number.isFinite(
                            Number(
                              item.quantity,
                            ),
                          )
                            ? Math.floor(
                                Number(
                                  item.quantity,
                                ),
                              )
                            : 1,
                        );

                      const unitPrice =
                        safePrice(
                          item.price,
                        );

                      const itemTotal =
                        unitPrice *
                        quantity;

                      const image =
                        resolveProductImage(
                          item,
                          menu,
                        );

                      return (
                        <motion.article
                          layout
                          key={
                            item.cartItemId
                          }
                          className="
                            overflow-hidden
                            rounded-[24px]
                            border
                            border-[var(--color-border)]
                            bg-[var(--color-surface)]
                          "
                        >
                          <div className="p-4 sm:p-5">
                            <div className="flex gap-4">
                              {/* PRODUCT IMAGE */}
                              <div
                                className="
                                  relative
                                  h-[76px]
                                  w-[76px]
                                  shrink-0
                                  overflow-hidden
                                  rounded-[18px]
                                  border
                                  border-[var(--color-border)]
                                  bg-[var(--color-surface-elevated)]
                                "
                              >
                                {image ? (
                                  <img
                                    src={
                                      image
                                    }
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    className="absolute inset-0 h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center text-[var(--color-text-subtle)]">
                                    <ShoppingBag
                                      size={22}
                                      strokeWidth={
                                        1.5
                                      }
                                    />
                                  </div>
                                )}

                                <span className="absolute bottom-1.5 left-1.5 flex min-h-6 min-w-6 items-center justify-center rounded-full border border-[var(--color-accent-border)] bg-[var(--color-bg)]/90 px-1.5 font-mono text-[9px] font-bold text-[var(--color-accent)] shadow-sm backdrop-blur-sm">
                                  {
                                    quantity
                                  }
                                </span>
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <h3 className="line-clamp-2 text-sm font-semibold">
                                      {
                                        item.name
                                      }
                                    </h3>

                                    <p className="mt-1 font-mono text-[10px] text-[var(--color-accent)]">
                                      $
                                      {formatPrice(
                                        unitPrice,
                                      )}{" "}
                                      c/u
                                    </p>
                                  </div>

                                  <span className="shrink-0 font-mono text-sm font-bold tabular-nums">
                                    $
                                    {formatPrice(
                                      itemTotal,
                                    )}
                                  </span>
                                </div>

                                {item.options
                                  ?.length >
                                  0 && (
                                  <div className="mt-3 space-y-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-control)] p-3">
                                    {item.options.map(
                                      (
                                        option,
                                      ) => (
                                        <div
                                          key={`${option.groupId}-${option.itemId}`}
                                          className="flex min-w-0 items-start justify-between gap-3 text-[10px]"
                                        >
                                          <span className="min-w-0 text-[var(--color-text-muted)]">
                                            {
                                              option.itemName
                                            }
                                          </span>

                                          {safePrice(
                                            option.priceDelta,
                                          ) >
                                            0 && (
                                            <span className="shrink-0 font-mono text-[var(--color-accent)]">
                                              +$
                                              {formatPrice(
                                                option.priceDelta,
                                              )}
                                            </span>
                                          )}
                                        </div>
                                      ),
                                    )}
                                  </div>
                                )}

                                {item.notes && (
                                  <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-[var(--color-text-subtle)]">
                                    “
                                    {
                                      item.notes
                                    }
                                    ”
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  removeItem(
                                    item.cartItemId,
                                  )
                                }
                                aria-label={`${copy.remove} ${item.name}`}
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  rounded-full
                                  px-3
                                  py-2
                                  font-mono
                                  text-[8px]
                                  uppercase
                                  tracking-[0.12em]
                                  text-[var(--color-text-subtle)]
                                  transition-colors
                                  hover:bg-[var(--color-control)]
                                  hover:text-[var(--color-danger)]
                                "
                              >
                                <Trash2
                                  size={12}
                                />

                                {
                                  copy.remove
                                }
                              </button>

                              <div className="flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-control)] p-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.cartItemId,
                                      quantity -
                                        1,
                                    )
                                  }
                                  aria-label={
                                    checkoutCopy
                                      .aria
                                      .decrease
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)] active:scale-90"
                                >
                                  <Minus
                                    size={
                                      12
                                    }
                                  />
                                </button>

                                <span className="w-8 text-center font-mono text-[10px] font-bold tabular-nums">
                                  {
                                    quantity
                                  }
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.cartItemId,
                                      quantity +
                                        1,
                                    )
                                  }
                                  aria-label={
                                    checkoutCopy
                                      .aria
                                      .increase
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)] active:scale-90"
                                >
                                  <Plus
                                    size={
                                      12
                                    }
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      );
                    },
                  )}
                </div>
              )}
            </div>

            {items.length >
              0 && (
              <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 sm:px-6 sm:py-6">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
                      {
                        copy.subtotal
                      }
                    </span>

                    <p className="mt-1 text-[10px] text-[var(--color-text-muted)]">
                      {
                        totalUnits
                      }{" "}
                      unidades
                    </p>
                  </div>

                  <span className="font-mono text-2xl font-bold tabular-nums sm:text-3xl">
                    $
                    {formatPrice(
                      total,
                    )}
                  </span>
                </div>

                <Link
                  href={
                    checkoutHref
                  }
                  onClick={
                    closeCart
                  }
                  className={buttonVariants(
                    {
                      variant:
                        "accent",
                      size: "lg",
                      className:
                        "w-full rounded-full",
                    },
                  )}
                >
                  {
                    copy.checkoutButton
                  }

                  <ArrowRight
                    size={15}
                  />
                </Link>

                <p className="mt-3 text-center text-[9px] leading-relaxed text-[var(--color-text-subtle)]">
                  {
                    copy.continueDescription
                  }
                </p>
              </footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}