"use client";

import Image from "next/image";

import {
  useGastro,
} from "@/context/gastro-context";

import {
  useLenis,
} from "@/hooks/use-scroll";

export default function Logo() {
  const {
    config,
    preset,
  } = useGastro();

  const { scrollTo } =
    useLenis();

  const { brand } =
    config;

  const navbarVariant =
    preset.visual?.navbar ??
    "pill";

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    scrollTo(0, {
      duration: 1.1,
    });
  };

  const logoRadius =
    navbarVariant ===
    "editorial"
      ? "rounded-[14px]"
      : navbarVariant ===
        "minimal"
      ? "rounded-[10px]"
      : "rounded-full";

  return (
    <a
      href="#inicio"
      onClick={handleClick}
      aria-label={`${brand.name} - Ir al inicio`}
      className={[
        "group flex min-h-[44px] cursor-pointer select-none items-center py-1.5 touch-manipulation",
        navbarVariant ===
        "editorial"
          ? "gap-3.5"
          : "gap-2.5 sm:gap-3",
      ].join(" ")}
    >
      <div
        className={[
          "relative shrink-0 overflow-hidden border bg-[var(--color-surface-elevated)] shadow-sm transition-all duration-300 group-hover:border-[var(--color-accent)] group-active:scale-95",
          logoRadius,
          navbarVariant ===
          "editorial"
            ? "h-10 w-10 sm:h-11 sm:w-11"
            : "h-8 w-8 sm:h-9 sm:w-9",
          navbarVariant ===
          "minimal"
            ? "border-[var(--color-border)]"
            : "border-[var(--color-accent-border)]",
        ].join(" ")}
      >
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          sizes="44px"
          className="object-cover"
        />

        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
      </div>

      <div className="flex min-w-0 flex-col">
        <span
          className={[
            "font-semibold leading-none tracking-tight text-[var(--color-text)] transition-colors duration-200 group-hover:text-[var(--color-accent)]",
            navbarVariant ===
            "editorial"
              ? "text-sm sm:text-base"
              : "text-xs sm:text-sm",
          ].join(" ")}
        >
          {brand.name}
        </span>

        <span
          className={[
            "mt-1 font-mono text-[8px] uppercase tracking-[0.25em] text-[var(--color-accent)] sm:text-[9px]",
            navbarVariant ===
            "minimal"
              ? "hidden"
              : "",
          ].join(" ")}
        >
          {brand.descriptor}
        </span>
      </div>
    </a>
  );
}