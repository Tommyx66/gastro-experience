import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { GastroNiche } from "@/config/presets/types";
import { DEFAULT_NICHE } from "@/config/presets";

import type { MenuProduct } from "@/data/menu";

import {
  menuProducts as legacyRestaurantProducts,
} from "@/data/menus/restaurant";

export interface SelectedOptionSnapshot {
  groupId: string;
  groupName: string;
  itemId: string;
  itemName: string;
  priceDelta: number;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  image?: string;
  basePrice: number;
  price: number;
  quantity: number;
  notes?: string;
  options: SelectedOptionSnapshot[];
}

export type OrderChannel =
  | "web"
  | "table";

export type OrderFulfillment =
  | "delivery"
  | "pickup"
  | "onsite";

export type OrderStatus =
  | "created"
  | "submitted"
  | "confirmed"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export interface ActiveOrder {
  orderId: string;
  channel: OrderChannel;
  fulfillment: OrderFulfillment;
  tableNumber: string | null;
  customerName: string;
  address?: string;
  paymentMethod: string;
  discountAmount: number;
  notes?: string;
  items: CartItem[];
  total: number;
  timestamp: number;
  status: OrderStatus;
}

interface CartBucket {
  items: CartItem[];
  activeOrder: ActiveOrder | null;
}

interface PersistedCartState {
  niche?: GastroNiche;

  items?: unknown;

  activeOrder?:
    | ActiveOrder
    | null;

  buckets?: Partial<
    Record<
      GastroNiche,
      CartBucket
    >
  >;
}

interface CartStore {
  niche: GastroNiche;

  items: CartItem[];
  isOpen: boolean;
  activeOrder: ActiveOrder | null;

  buckets: Record<
    GastroNiche,
    CartBucket
  >;

  setNiche: (
    niche: GastroNiche
  ) => void;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addItem: (
    product: MenuProduct,
    options: SelectedOptionSnapshot[],
    quantity?: number,
    notes?: string
  ) => void;

  removeItem: (
    cartItemId: string
  ) => void;

  updateQuantity: (
    cartItemId: string,
    quantity: number
  ) => void;

  clearCart: () => void;

  subtotal: () => number;

  setActiveOrder: (
    order: ActiveOrder
  ) => void;

  clearActiveOrder: () => void;
}

/* =========================================================
   HELPERS
   ========================================================= */

function createEmptyBucket(): CartBucket {
  return {
    items: [],
    activeOrder: null,
  };
}

function safeNumber(
  value: unknown,
  fallback = 0
): number {
  const numeric =
    typeof value === "number"
      ? value
      : Number(value);

  return Number.isFinite(numeric)
    ? numeric
    : fallback;
}

function normalizeQuantity(
  value: unknown
): number {
  const numeric = Math.floor(
    safeNumber(value, 1)
  );

  return Math.max(
    1,
    numeric
  );
}

function normalizeOptionSnapshot(
  rawOption: unknown
): SelectedOptionSnapshot | null {
  if (
    !rawOption ||
    typeof rawOption !== "object"
  ) {
    return null;
  }

  const option =
    rawOption as Record<
      string,
      unknown
    >;

  const groupId = String(
    option.groupId ?? ""
  );

  const groupName = String(
    option.groupName ??
      "Opciones"
  );

  const itemId = String(
    option.itemId ??
      option.optionId ??
      option.id ??
      ""
  );

  const itemName = String(
    option.itemName ??
      option.optionName ??
      option.name ??
      ""
  );

  const priceDelta =
    safeNumber(
      option.priceDelta ??
        option.price ??
        0,
      0
    );

  if (
    !groupId ||
    !itemId ||
    !itemName
  ) {
    return null;
  }

  return {
    groupId,
    groupName,
    itemId,
    itemName,
    priceDelta,
  };
}

function normalizeOptions(
  rawOptions: unknown
): SelectedOptionSnapshot[] {
  if (
    !Array.isArray(
      rawOptions
    )
  ) {
    return [];
  }

  return rawOptions
    .map(
      normalizeOptionSnapshot
    )
    .filter(
      (
        option
      ): option is SelectedOptionSnapshot =>
        option !== null
    );
}

function calculateOptionsDelta(
  options: SelectedOptionSnapshot[]
): number {
  return options.reduce(
    (
      sum,
      option
    ) =>
      sum +
      safeNumber(
        option.priceDelta,
        0
      ),
    0
  );
}

function generateCartItemId(
  productId: string,
  options: SelectedOptionSnapshot[],
  notes = ""
): string {
  const sortedOptions =
    [
      ...options,
    ]
      .map(
        (option) =>
          `${option.groupId}:${option.itemId}`
      )
      .sort()
      .join("|");

  const normalizedNotes =
    notes
      .trim()
      .toLowerCase();

  return [
    productId,
    sortedOptions,
    normalizedNotes,
  ].join("-");
}

/* =========================================================
   LEGACY MIGRATION
   ========================================================= */

function migrateLegacyCartItems(
  items: unknown
): CartItem[] {
  if (
    !Array.isArray(items)
  ) {
    return [];
  }

  const migratedItems =
    items.map<CartItem | null>(
      (
        rawItem
      ): CartItem | null => {
        if (
          !rawItem ||
          typeof rawItem !==
            "object"
        ) {
          return null;
        }

        const item =
          rawItem as Record<
            string,
            unknown
          >;

        const productId =
          String(
            item.productId ??
              ""
          );

        if (!productId) {
          return null;
        }

        /*
         * La versión vieja del carrito
         * estaba vinculada al menú de Restaurant.
         * Solo la usamos para migrar
         * los datos existentes.
         */
        const product =
          legacyRestaurantProducts.find(
            (candidate) =>
              candidate.id ===
              productId
          );

        const options =
          normalizeOptions(
            item.options
          );

        const rawBasePrice =
          safeNumber(
            item.basePrice,
            NaN
          );

        const fallbackProductPrice =
          product?.price ?? 0;

        const basePrice =
          Number.isFinite(
            rawBasePrice
          )
            ? rawBasePrice
            : fallbackProductPrice;

        const optionDelta =
          calculateOptionsDelta(
            options
          );

        const price =
          basePrice +
          optionDelta;

        const quantity =
          normalizeQuantity(
            item.quantity
          );

        const notes =
          typeof item.notes ===
          "string"
            ? item.notes.trim()
            : "";

        const cartItemId =
          typeof item.cartItemId ===
            "string" &&
          item.cartItemId.length >
            0
            ? item.cartItemId
            : generateCartItemId(
                productId,
                options,
                notes
              );

        const migratedItem:
          CartItem = {
            cartItemId,
            productId,

            name: String(
              item.name ??
                product?.name ??
                "Producto"
            ),

            image:
              typeof item.image ===
              "string"
                ? item.image
                : product?.image,

            basePrice:
              safeNumber(
                basePrice,
                fallbackProductPrice
              ),

            price:
              safeNumber(
                price,
                fallbackProductPrice
              ),

            quantity,

            notes:
              notes ||
              undefined,

            options,
          };

        return migratedItem;
      }
    );

  return migratedItems.filter(
    (
      item
    ): item is CartItem =>
      item !== null
  );
}

function migrateLegacyOrder(
  order:
    | ActiveOrder
    | null
    | undefined
): ActiveOrder | null {
  if (!order) {
    return null;
  }

  return {
    ...order,

    items:
      migrateLegacyCartItems(
        order.items
      ),

    total:
      safeNumber(
        order.total,
        0
      ),

    discountAmount:
      safeNumber(
        order.discountAmount,
        0
      ),
  };
}

/* =========================================================
   STORE
   ========================================================= */

export const useCartStore =
  create<CartStore>()(
    persist(
      (set, get) => ({
        niche:
          DEFAULT_NICHE,

        items: [],

        isOpen: false,

        activeOrder:
          null,

        buckets: {
          restaurant:
            createEmptyBucket(),

          cafe:
            createEmptyBucket(),

          brewery:
            createEmptyBucket(),

          icecream:
            createEmptyBucket(),

          bakery:
            createEmptyBucket(),

          bodegon:
            createEmptyBucket(),

          catering:
            createEmptyBucket(),
        },

        /* =================================================
           NICHE
           ================================================= */

        setNiche: (
          nextNiche
        ) =>
          set((state) => {
            if (
              state.niche ===
              nextNiche
            ) {
              return state;
            }

            /*
             * Guardamos la bolsa actual
             * dentro de su propio niche.
             */
            const currentBucket: CartBucket =
              {
                items:
                  state.items,

                activeOrder:
                  state.activeOrder,
              };

            /*
             * Recuperamos la bolsa
             * correspondiente al nuevo niche.
             */
            const nextBucket =
              state.buckets[
                nextNiche
              ] ??
              createEmptyBucket();

            return {
              niche:
                nextNiche,

              items:
                nextBucket.items,

              activeOrder:
                nextBucket.activeOrder,

              isOpen:
                false,

              buckets: {
                ...state.buckets,

                [state.niche]:
                  currentBucket,
              },
            };
          }),

        /* =================================================
           CART UI
           ================================================= */

        openCart: () =>
          set({
            isOpen: true,
          }),

        closeCart: () =>
          set({
            isOpen: false,
          }),

        toggleCart: () =>
          set((state) => ({
            isOpen:
              !state.isOpen,
          })),

        /* =================================================
           ADD ITEM
           ================================================= */

        addItem: (
          product,
          rawOptions,
          quantity = 1,
          notes = ""
        ) => {
          const options =
            normalizeOptions(
              rawOptions
            );

          const safeBasePrice =
            safeNumber(
              product.price,
              0
            );

          const optionsDelta =
            calculateOptionsDelta(
              options
            );

          const unitPrice =
            safeNumber(
              safeBasePrice +
                optionsDelta,
              safeBasePrice
            );

          const safeQuantity =
            normalizeQuantity(
              quantity
            );

          const trimmedNotes =
            notes.trim();

          const cartItemId =
            generateCartItemId(
              product.id,
              options,
              trimmedNotes
            );

          set((state) => {
            const existingIndex =
              state.items.findIndex(
                (item) =>
                  item.cartItemId ===
                  cartItemId
              );

            if (
              existingIndex >= 0
            ) {
              const updatedItems =
                [
                  ...state.items,
                ];

              const current =
                updatedItems[
                  existingIndex
                ];

              updatedItems[
                existingIndex
              ] = {
                ...current,

                quantity:
                  normalizeQuantity(
                    current.quantity +
                      safeQuantity
                  ),

                price:
                  safeNumber(
                    current.price,
                    unitPrice
                  ),

                basePrice:
                  safeNumber(
                    current.basePrice,
                    safeBasePrice
                  ),

                options,
              };

              return {
                items:
                  updatedItems,

                isOpen:
                  true,
              };
            }

            const newItem:
              CartItem = {
                cartItemId,

                productId:
                  product.id,

                name:
                  product.name,

                image:
                  product.image,

                basePrice:
                  safeBasePrice,

                price:
                  unitPrice,

                quantity:
                  safeQuantity,

                notes:
                  trimmedNotes ||
                  undefined,

                options,
              };

            return {
              items: [
                ...state.items,
                newItem,
              ],

              isOpen:
                true,
            };
          });
        },

        /* =================================================
           REMOVE ITEM
           ================================================= */

        removeItem: (
          cartItemId
        ) =>
          set((state) => ({
            items:
              state.items.filter(
                (item) =>
                  item.cartItemId !==
                  cartItemId
              ),
          })),

        /* =================================================
           UPDATE QUANTITY
           ================================================= */

        updateQuantity: (
          cartItemId,
          quantity
        ) =>
          set((state) => {
            const nextQuantity =
              Math.floor(
                safeNumber(
                  quantity,
                  0
                )
              );

            if (
              nextQuantity <= 0
            ) {
              return {
                items:
                  state.items.filter(
                    (item) =>
                      item.cartItemId !==
                      cartItemId
                  ),
              };
            }

            return {
              items:
                state.items.map(
                  (item) =>
                    item.cartItemId ===
                    cartItemId
                      ? {
                          ...item,

                          quantity:
                            nextQuantity,

                          price:
                            safeNumber(
                              item.price,
                              item.basePrice
                            ),
                        }
                      : item
                ),
            };
          }),

        /* =================================================
           CLEAR CART
           ================================================= */

        clearCart: () =>
          set({
            items: [],
          }),

        /* =================================================
           SUBTOTAL
           ================================================= */

        subtotal: () =>
          get().items.reduce(
            (
              sum,
              item
            ) => {
              const unitPrice =
                safeNumber(
                  item.price,

                  safeNumber(
                    item.basePrice,
                    0
                  ) +
                    calculateOptionsDelta(
                      item.options
                    )
                );

              const quantity =
                normalizeQuantity(
                  item.quantity
                );

              return (
                sum +
                unitPrice *
                  quantity
              );
            },
            0
          ),

        /* =================================================
           ACTIVE ORDER
           ================================================= */

        setActiveOrder: (
          order
        ) =>
          set({
            activeOrder:
              order,

            items: [],
          }),

        clearActiveOrder: () =>
          set({
            activeOrder:
              null,
          }),
      }),

      {
        name:
          "gastro-engine-cart",

        version: 4,

        partialize:
          (state) => ({
            niche:
              state.niche,

            items:
              state.items,

            activeOrder:
              state.activeOrder,

            buckets: {
              ...state.buckets,

              [state.niche]: {
                items:
                  state.items,

                activeOrder:
                  state.activeOrder,
              },
            },
          }),

        migrate:
          (
            persistedState
          ) => {
            const state =
              persistedState as
                | PersistedCartState
                | undefined;

            /*
             * Migramos una única vez
             * el carrito viejo global
             * a Restaurant.
             */
            const migratedItems =
              migrateLegacyCartItems(
                state?.items
              );

            const migratedOrder =
              migrateLegacyOrder(
                state?.activeOrder
              );

            return {
              niche:
                DEFAULT_NICHE,

              items:
                migratedItems,

              activeOrder:
                migratedOrder,

              buckets: {
                restaurant: {
                  items:
                    migratedItems,

                  activeOrder:
                    migratedOrder,
                },

                cafe:
                  state?.buckets
                    ?.cafe ??
                  createEmptyBucket(),

                brewery:
                  state?.buckets
                    ?.brewery ??
                  createEmptyBucket(),

                icecream:
                  state?.buckets
                    ?.icecream ??
                  createEmptyBucket(),

                bakery:
                  state?.buckets
                    ?.bakery ??
                  createEmptyBucket(),

                bodegon:
                  state?.buckets
                    ?.bodegon ??
                  createEmptyBucket(),

                catering:
                  state?.buckets
                    ?.catering ??
                  createEmptyBucket(),
              },
            };
          },
      }
    )
  );