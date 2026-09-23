import { create } from "zustand";

interface UIStore {
  activeCategoryFilter: string;
  isSearchModalOpen: boolean;
  setActiveCategoryFilter: (categoryId: string) => void;
  setSearchModalOpen: (isOpen: boolean) => void;
  toggleSearchModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  activeCategoryFilter: "all",
  isSearchModalOpen: false,

  setActiveCategoryFilter: (categoryId) => set({ activeCategoryFilter: categoryId }),
  setSearchModalOpen: (isOpen) => set({ isSearchModalOpen: isOpen }),
  toggleSearchModal: () => set((state) => ({ isSearchModalOpen: !state.isSearchModalOpen })),
}));