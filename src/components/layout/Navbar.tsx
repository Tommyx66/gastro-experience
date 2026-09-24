"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Menu,
  Moon,
  Sun,
  ShoppingBag,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useGastro } from "@/context/gastro-context";
import { useRestaurantContext } from "@/hooks/use-restaurant-context";
import { useLenis } from "@/hooks/use-scroll";
import { useThemeStore } from "@/store/use-theme-store";
import { useCartStore } from "@/store/use-cart-store";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);

  const { theme, toggleTheme } = useThemeStore();
  const items = useCartStore((state) => state.items);
  const { scrollTo } = useLenis();
  const { config, niche } = useGastro();
  const { tableNumber } = useRestaurantContext();

  const { navigation, brand, content } = config;
  const navbarUi = content.navbarUi;
  const ctaTarget = content.hero.ctaHref || "menu";

  const orderHref = tableNumber
    ? `/pedido?type=${encodeURIComponent(niche)}&mesa=${encodeURIComponent(tableNumber)}`
    : `/pedido?type=${encodeURIComponent(niche)}`;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeLabel =
    theme === "dark" ? navbarUi.themeDark : navbarUi.themeLight;

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const previous = lastScrollY.current;

      setScrolled(current > 24);

      if (current > previous && current > 160 && !open) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : previous;
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    event.preventDefault();
    setOpen(false);

    const id = target.replace(/^#/, "");

    window.setTimeout(() => {
      if (!id || id === "inicio") {
        scrollTo(0, { duration: 1 });
        return;
      }

      scrollTo(`#${id}`, {
        offset: -20,
        duration: 1,
      });
    }, 50);
  };

  const controlClass =
    "group relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-control)] text-[var(--color-text-muted)] shadow-sm transition-all duration-300 hover:border-[var(--color-accent-border)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)] active:scale-95";

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0, scale: 0.97 }}
        animate={{
          y: visible ? 0 : -120,
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.97,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div className="mx-auto flex max-w-7xl justify-center">
          <div
            className={[
              "pointer-events-auto flex items-center gap-1.5 rounded-full border p-1.5",
              "transition-all duration-500",
              scrolled
                ? "border-[var(--color-accent-border)] bg-[var(--color-bg)]/90 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-2xl"
                : "border-[var(--color-border)] bg-[var(--color-surface)]/90 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl",
            ].join(" ")}
          >
            {/* BRAND */}
            <a
              href="#inicio"
              onClick={(event) => handleNavClick(event, "inicio")}
              aria-label={brand.name}
              className="group relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[var(--color-accent-border)] bg-[var(--color-surface-elevated)]"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                sizes="40px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
            </a>

            {/* DESKTOP NAV */}
            <nav className="hidden items-center px-1 md:flex">
              {navigation.links.map((link) => (
                <a
                  key={link.href}
                  href={`#${link.href}`}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="group relative cursor-pointer rounded-full px-3.5 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--color-text-muted)] transition-colors duration-300 hover:text-[var(--color-text)]"
                >
                  {link.label}
                  <span className="absolute bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-4" />
                </a>
              ))}
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden items-center gap-1.5 pl-1 md:flex">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={navbarUi.ariaChangeTheme}
                title={mounted ? themeLabel : undefined}
                suppressHydrationWarning
                className={controlClass}
              >
                {!mounted ? (
                  <span className="h-3.5 w-3.5 opacity-0" aria-hidden="true" />
                ) : theme === "dark" ? (
                  <Moon
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:rotate-12"
                  />
                ) : (
                  <Sun
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                )}
              </button>

              <a
                href={`#${ctaTarget}`}
                onClick={(event) => handleNavClick(event, ctaTarget)}
                className="group inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-[var(--color-accent)] px-4.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent-contrast)] shadow-[0_8px_24px_var(--color-accent-soft)] transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
              >
                {navigation.cta}
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* MOBILE CONTROLS */}
            <div className="ml-0 flex items-center gap-1.5 md:hidden">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={navbarUi.ariaChangeTheme}
                title={mounted ? themeLabel : undefined}
                suppressHydrationWarning
                className={controlClass}
              >
                {!mounted ? (
                  <span className="h-3.5 w-3.5 opacity-0" aria-hidden="true" />
                ) : theme === "dark" ? (
                  <Moon
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:rotate-12"
                  />
                ) : (
                  <Sun
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                )}
              </button>

              <a
                href={orderHref}
                aria-label={navbarUi.ariaOpenOrder}
                className={`relative ${controlClass}`}
              >
                <ShoppingBag size={14} strokeWidth={1.8} />
                {mounted && totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 font-mono text-[8px] font-bold text-[var(--color-accent-contrast)]">
                    {totalItems}
                  </span>
                )}
              </a>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-label={open ? navbarUi.ariaCloseMenu : navbarUi.ariaOpenMenu}
                aria-expanded={open}
                className={controlClass}
              >
                {open ? (
                  <X size={15} strokeWidth={1.8} />
                ) : (
                  <Menu size={15} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] flex flex-col bg-[var(--color-bg)] px-6 pb-8 pt-24 md:hidden"
          >
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--color-accent)]">
                  {navbarUi.mobileNavigationLabel}
                </span>
              </div>

              <div className="flex-1">
                {navigation.links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={`#${link.href}`}
                    onClick={(event) => handleNavClick(event, link.href)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="flex cursor-pointer items-center justify-between border-b border-[var(--color-border)] py-5 text-2xl font-light uppercase tracking-tight text-[var(--color-text-muted)] transition-colors active:text-[var(--color-accent)]"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-[9px] text-[var(--color-accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </motion.a>
                ))}
              </div>

              <a
                href={`#${ctaTarget}`}
                onClick={(event) => handleNavClick(event, ctaTarget)}
                className="mt-8 flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-accent-contrast)] shadow-[0_12px_36px_var(--color-accent-soft)]"
              >
                {navigation.cta}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}