import { create } from "zustand";
import type { MenuProduct, MenuOption } from "@/data/menu";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  options?: MenuOption[];
  note?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  addItem: (
    product: MenuProduct,
    quantity?: number,
    options?: MenuOption[],
    note?: string,
  ) => void;

  removeItem: (productId: string) => void;

  updateQuantity: (
    productId: string,
    quantity: number,
  ) => void;

  clearCart: () => void;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  totalItems: () => number;
  subtotal: () => number;
}

function optionsKey(options: MenuOption[] = []) {
  return options
    .map((option) => option.id)
    .sort()
    .join("|");
}

export const useCartStore = create<CartState>(
  (set, get) => ({
    items: [],
    isOpen: false,

    addItem: (
      product,
      quantity = 1,
      options = [],
      note = "",
    ) => {
      const currentItems = get().items;

      const existingIndex = currentItems.findIndex(
        (item) =>
          item.productId === product.id &&
          optionsKey(item.options) === optionsKey(options),
      );

      if (existingIndex !== -1) {
        const updated = [...currentItems];

        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity:
            updated[existingIndex].quantity + quantity,
        };

        set({
          items: updated,
          isOpen: true,
        });

        return;
      }

      const optionDelta = options.reduce(
        (total, option) =>
          total + (option.priceDelta ?? 0),
        0,
      );

      set({
        items: [
          ...currentItems,
          {
            productId: product.id,
            name: product.name,
            price: product.price + optionDelta,
            quantity,
            image: product.image,
            options,
            note,
          },
        ],
        isOpen: true,
      });
    },

    removeItem: (productId) => {
      set({
        items: get().items.filter(
          (item) => item.productId !== productId,
        ),
      });
    },

    updateQuantity: (productId, quantity) => {
      if (quantity <= 0) {
        get().removeItem(productId);
        return;
      }

      set({
        items: get().items.map((item) =>
          item.productId === productId
            ? { ...item, quantity }
            : item,
        ),
      });
    },

    clearCart: () => {
      set({
        items: [],
        isOpen: false,
      });
    },

    openCart: () => {
      set({ isOpen: true });
    },

    closeCart: () => {
      set({ isOpen: false });
    },

    toggleCart: () => {
      set({
        isOpen: !get().isOpen,
      });
    },

    totalItems: () =>
      get().items.reduce(
        (total, item) => total + item.quantity,
        0,
      ),

    subtotal: () =>
      get().items.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0,
      ),
  }),
);