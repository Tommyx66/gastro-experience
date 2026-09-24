"use client";

import { Suspense, useRef, useState } from "react";
import {
  Utensils,
  Bell,
  LayoutGrid,
  List,
  ShoppingBag,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Hero from "@/components/sections/Hero";
import ChefStoryMarquee from "@/components/sections/ChefStoryMarquee";
import CtaTransition from "@/components/sections/CtaTransition";
import Contact from "@/components/sections/Contact";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";

import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ProductCard from "@/components/ui/ProductCard";
import ProductDetailModal from "@/components/ui/ProductDetailModal";
import CallWaiterModal from "@/components/ui/CallWaiterModal";
import CartDrawer from "@/components/ui/CartDrawer";

import { BackgroundImageTexture } from "@/components/ui/bg-image-texture";
import TextAnimate from "@/components/ui/text-animate";

import type { MenuProduct } from "@/data/menu";
import { useRestaurantContext } from "@/hooks/use-restaurant-context";
import { useCartStore } from "@/store/use-cart-store";
import { GastroProvider, useGastro } from "@/context/gastro-context";

/* =========================================================
   MENU EXPLORER
========================================================= */

function MenuExplorer({
  activeCategory,
  viewMode,
  onOpenDetail,
}: {
  activeCategory: string;
  viewMode: "grid" | "list";
  onOpenDetail: (product: MenuProduct) => void;
}) {
  const { config, menu } = useGastro();
  const menuUi = config.content.menuUi;
  const { categories: menuCategories, products: menuProducts } = menu;

  const categoriesToRender =
    activeCategory === "all"
      ? menuCategories
      : menuCategories.filter((category) => category.id === activeCategory);

  return (
    <div className="space-y-12 sm:space-y-16">
      {categoriesToRender.map((category) => {
        const products = menuProducts.filter(
          (product) => product.categoryId === category.id
        );

        if (!products.length) return null;

        const productLabel =
          products.length === 1
            ? menuUi.categoryCountSingular
            : menuUi.categoryCountPlural;

        return (
          <section
            key={category.id}
            id={`cat-${category.id}`}
            className="scroll-mt-28"
          >
            <div className="mb-4 flex items-baseline justify-between border-b border-[var(--color-border)] pb-3 sm:mb-6">
              <div className="min-w-0">
                <h3 className="flex items-center gap-2 text-lg font-bold uppercase tracking-tight text-[var(--color-text)] sm:text-2xl">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  <span>{category.name}</span>
                </h3>

                {category.description && (
                  <p className="mt-1 max-w-xl text-[11px] font-light leading-relaxed text-[var(--color-text-muted)] sm:text-xs">
                    {category.description}
                  </p>
                )}
              </div>

              <span className="ml-3 shrink-0 font-mono text-xs font-bold tracking-widest text-[var(--color-accent)]">
                {products.length} {productLabel}
              </span>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
                  : "grid gap-3"
              }
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  onOpenDetail={onOpenDetail}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* =========================================================
   CATEGORY RAIL
========================================================= */

function CategoryRail({
  activeTab,
  onTabChange,
  allLabel,
  ariaAllCategories,
}: {
  activeTab: string;
  onTabChange: (categoryId: string) => void;
  allLabel?: string;
  ariaAllCategories?: string;
}) {
  const { config, menu } = useGastro();
  const { categories: menuCategories, products: menuProducts } = menu;
  const menuUi = config.content.menuUi;

  const resolvedAllLabel = allLabel ?? menuUi.allCategories;
  const resolvedAriaAllCategories = ariaAllCategories ?? menuUi.ariaAllCategories;

  const scrollRef = useRef<HTMLDivElement>(null);
  const totalProducts = menuProducts.length;

  const getCount = (categoryId: string) =>
    menuProducts.filter((product) => product.categoryId === categoryId).length;

  const scrollCategories = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="min-w-0 flex-1 sm:hidden">
        <div className="relative">
          <select
            value={activeTab}
            onChange={(e) => onTabChange(e.target.value)}
            aria-label="Seleccionar categoría"
            className="block w-full appearance-none rounded-full border border-[var(--color-border)] bg-[var(--color-control)] px-4 py-2.5 pr-10 text-[10px] font-semibold leading-none text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-accent-border)]"
          >
            <option value="all">
              {resolvedAllLabel} ({totalProducts})
            </option>
            {menuCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({getCount(category.id)})
              </option>
            ))}
          </select>

          <ChevronDown
            size={15}
            strokeWidth={1.8}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="hidden min-w-0 flex-1 items-center gap-1.5 sm:flex">
        <button
          type="button"
          onClick={() => onTabChange("all")}
          aria-label={resolvedAriaAllCategories}
          aria-pressed={activeTab === "all"}
          className={`shrink-0 rounded-full border px-3.5 py-2 text-[10px] font-semibold leading-none transition-all duration-200 cursor-pointer ${
            activeTab === "all"
              ? "border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-bg)] shadow-sm"
              : "border-[var(--color-border)] bg-[var(--color-control)] text-[var(--color-text-muted)] hover:border-[var(--color-accent-border)] hover:text-[var(--color-text)]"
          }`}
        >
          {resolvedAllLabel} <span className="tabular-nums opacity-60">({totalProducts})</span>
        </button>

        <button
          type="button"
          onClick={() => scrollCategories("left")}
          aria-label="Desplazar categorías hacia la izquierda"
          className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-control)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent-border)] hover:text-[var(--color-text)] active:scale-95"
        >
          <ChevronLeft size={14} strokeWidth={1.8} />
        </button>

        <div
          ref={scrollRef}
          data-lenis-prevent="true"
          onWheel={(event) => event.stopPropagation()}
          onTouchMove={(event) => event.stopPropagation()}
          className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden overscroll-contain scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max items-center gap-1.5 py-0.5 pr-1">
            {menuCategories.map((category) => {
              const count = getCount(category.id);
              const isActive = activeTab === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onTabChange(category.id)}
                  aria-pressed={isActive}
                  className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3.5 py-2 text-[10px] font-semibold leading-none transition-all duration-200 ${
                    isActive
                      ? "border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-bg)] shadow-sm"
                      : "border-[var(--color-border)] bg-[var(--color-control)] text-[var(--color-text-muted)] hover:border-[var(--color-accent-border)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {category.name} <span className="tabular-nums opacity-55">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollCategories("right")}
          aria-label="Desplazar categorías hacia la derecha"
          className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-control)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent-border)] hover:text-[var(--color-text)] active:scale-95"
        >
          <ChevronRight size={14} strokeWidth={1.8} />
        </button>
      </div>
    </>
  );
}

/* =========================================================
   VIEW MODE TOGGLE
========================================================= */

function ViewModeToggle({
  viewMode,
  setViewMode,
}: {
  viewMode: "grid" | "list";
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  const { config } = useGastro();
  const menuUi = config.content.menuUi;

  return (
    <div className="flex shrink-0 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-control)] p-0.5 sm:p-1">
      <button
        type="button"
        onClick={() => setViewMode("list")}
        aria-label={menuUi.ariaListView}
        aria-pressed={viewMode === "list"}
        className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-200 sm:h-8 sm:w-8 ${
          viewMode === "list"
            ? "bg-[var(--color-text)] text-[var(--color-bg)] shadow-sm"
            : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        }`}
      >
        <List size={13} />
      </button>

      <button
        type="button"
        onClick={() => setViewMode("grid")}
        aria-label={menuUi.ariaGridView}
        aria-pressed={viewMode === "grid"}
        className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-200 sm:h-8 sm:w-8 ${
          viewMode === "grid"
            ? "bg-[var(--color-text)] text-[var(--color-bg)] shadow-sm"
            : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        }`}
      >
        <LayoutGrid size={13} />
      </button>
    </div>
  );
}

/* =========================================================
   CART FLOATING BUTTON (DERECHA)
========================================================= */

function CartFloatingButton() {
  const { config } = useGastro();
  const cartUi = config.content.cartUi;

  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={cartUi.ariaOpen}
      className="fixed bottom-4 right-4 z-[70] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[var(--color-accent-border)] bg-[var(--color-surface)] text-[var(--color-accent)] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-[var(--color-accent-soft)] active:scale-95 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
    >
      <ShoppingBag size={18} strokeWidth={1.8} />

      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 font-mono text-[9px] font-bold text-[var(--color-accent-contrast)]">
          {totalItems}
        </span>
      )}
    </button>
  );
}

/* =========================================================
   TABLE MODE
========================================================= */

function TableMode() {
  const { tableNumber } = useRestaurantContext();
  const { config } = useGastro();

  const tableUi = config.content.tableUi;
  const menuUi = config.content.menuUi;

  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(null);
  const [isWaiterModalOpen, setIsWaiterModalOpen] = useState(false);

  if (!tableNumber) return null;

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pb-32 text-[var(--color-text)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 px-4 py-3.5 backdrop-blur-2xl sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
              <Utensils size={17} />
            </span>

            <div>
              <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--color-accent)]">
                {tableUi.serviceLabel}
              </span>
              <h1 className="text-lg font-bold sm:text-xl">
                {tableUi.tablePrefix} {tableNumber}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle floating={false} compact />

            <button
              type="button"
              onClick={() => setIsWaiterModalOpen(true)}
              aria-label={tableUi.ariaWaiter}
              className="flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] transition-all active:scale-95"
            >
              <Bell size={14} />
              <span>{tableUi.waiterButton}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="sticky top-[69px] z-30 -mx-4 mb-6 flex min-w-0 items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 px-3 py-2.5 shadow-xl backdrop-blur-2xl sm:-mx-6 sm:mb-10 sm:rounded-full sm:border sm:px-4 sm:py-2.5">
          <CategoryRail
            activeTab={activeTab}
            onTabChange={setActiveTab}
            allLabel={tableUi.allCategories}
            ariaAllCategories={menuUi.ariaAllCategories}
          />

          <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>

        <MenuExplorer
          activeCategory={activeTab}
          viewMode={viewMode}
          onOpenDetail={setSelectedProduct}
        />
      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CallWaiterModal
        mesa={tableNumber}
        isOpen={isWaiterModalOpen}
        onClose={() => setIsWaiterModalOpen(false)}
      />

      <CartDrawer />
      <CartFloatingButton />
    </main>
  );
}

/* =========================================================
   PUBLIC MODE
========================================================= */

function PublicMode() {
  const { config } = useGastro();
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(null);

  return (
    <SmoothScroll>
      <Navbar />

      <main className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
        <Hero />
        <ChefStoryMarquee />

        <section
          id="menu"
          className="relative border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-14 sm:px-8 sm:py-20 md:px-12 md:py-28 lg:px-16"
        >
          <div className="mx-auto max-w-7xl">
            <BackgroundImageTexture
              variant="grid-noise"
              opacity={0.08}
              className="mb-8 rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] sm:mb-12"
            >
              <div className="px-6 py-7 sm:px-8 sm:py-9">
                <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-accent)]">
                  {config.content.menu.eyebrow}
                </span>

                <TextAnimate
                  text={config.content.menu.title}
                  type="fadeInUp"
                  className="text-3xl font-light uppercase leading-[0.95] tracking-tight text-[var(--color-text)] sm:text-5xl md:text-6xl"
                />

                <p className="mt-3 max-w-xl text-xs leading-relaxed text-[var(--color-text-muted)] sm:text-sm md:text-base">
                  {config.content.menu.subtitle}
                </p>
              </div>
            </BackgroundImageTexture>

            <div className="sticky top-16 z-30 mb-8 flex min-w-0 items-center gap-2 rounded-2xl border-y border-[var(--color-border)] bg-[var(--color-surface)]/95 px-3 py-2.5 shadow-xl backdrop-blur-2xl sm:top-20 sm:mb-12 sm:rounded-full sm:border sm:px-4 sm:py-2.5">
              <CategoryRail activeTab={activeTab} onTabChange={setActiveTab} />
              <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>

            <MenuExplorer
              activeCategory={activeTab}
              viewMode={viewMode}
              onOpenDetail={setSelectedProduct}
            />
          </div>
        </section>

        <Contact />
        <CtaTransition />
      </main>

      <Footer />

      {/* WHATSAPP ABAJO A LA IZQUIERDA Y COMANDA ABAJO A LA DERECHA */}
      <WhatsAppButton />
      <CartFloatingButton />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer />
    </SmoothScroll>
  );
}

/* =========================================================
   RESTAURANT APP
========================================================= */

function RestaurantApp() {
  const { mode, tableNumber } = useRestaurantContext();

  if (mode === "table" && tableNumber) {
    return <TableMode />;
  }

  return <PublicMode />;
}

/* =========================================================
   HOME (SIN BOTÓN DE DEMOSWITCHER)
========================================================= */

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-bg)]" />}>
      <GastroProvider>
        <RestaurantApp />
      </GastroProvider>
    </Suspense>
  );
}