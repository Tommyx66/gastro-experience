"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Award,
  Beer,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";

import { useGastro } from "@/context/gastro-context";
import { useLenis } from "@/hooks/use-scroll";
import type { MenuProduct } from "@/data/menu";
import type {
  GastroShowcaseArtwork,
  GastroShowcaseConfig,
  GastroShowcaseProduct,
} from "@/config/presets/types";

interface NicheShowcaseProps {
  onOpenDetail?: (product: MenuProduct) => void;
}

function formatMoney(value: number) {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

function resolveShowcase(
  config: ReturnType<typeof useGastro>["config"],
): GastroShowcaseConfig | null {
  const candidate = (
    config.content as unknown as {
      showcase?: GastroShowcaseConfig;
    }
  ).showcase;

  if (!candidate || candidate.enabled === false) return null;
  if (candidate.engine !== "product-showroom") return null;
  if (!candidate.products.length) return null;

  return candidate;
}

function resolveMenuProduct(
  item: GastroShowcaseProduct,
  products: MenuProduct[],
) {
  return products.find(
    (product) =>
      product.id === item.id ||
      product.name.toLowerCase() === item.menuProductName?.toLowerCase(),
  );
}

function artworkSrc(artwork: GastroShowcaseArtwork) {
  return artwork.src;
}

function artworkRotation(artwork: GastroShowcaseArtwork) {
  return artwork.rotation ?? (artwork.type === "can" ? -12 : 0);
}

function artworkScale(artwork: GastroShowcaseArtwork) {
  return artwork.scale ?? (artwork.type === "can" ? 1.02 : 0.98);
}

function buildProductShadow(
  artwork: GastroShowcaseArtwork,
  hovered: boolean,
) {
  const glow = artwork.glow ?? "rgba(255,255,255,.16)";
  const shadow = artwork.shadowColor ?? "rgba(0,0,0,.72)";

  return [
    `drop-shadow(0 ${hovered ? 26 : 34}px ${hovered ? 28 : 22}px ${shadow})`,
    `drop-shadow(0 ${hovered ? 10 : 14}px ${hovered ? 18 : 12}px rgba(0,0,0,${hovered ? ".40" : ".30"}))`,
    `drop-shadow(0 0 ${hovered ? 34 : 22}px ${glow})`,
  ].join(" ");
}

function ProductArtwork({
  artwork,
  name,
  reducedMotion,
}: {
  artwork: GastroShowcaseArtwork;
  name: string;
  reducedMotion: boolean | null;
}) {
  const [hovered, setHovered] = useState(false);
  const hover = useMotionValue(0);
  const hoverSpring = useSpring(hover, {
    stiffness: 250,
    damping: 24,
    mass: 0.46,
  });

  const liftY = useTransform(hoverSpring, [0, 1], [0, -12]);
  const liftScale = useTransform(hoverSpring, [0, 1], [1, 1.045]);
  const liftZ = useTransform(hoverSpring, [0, 1], [0, 28]);
  const groundScale = useTransform(hoverSpring, [0, 1], [1, 0.62]);
  const groundOpacity = useTransform(hoverSpring, [0, 1], [0.72, 0.28]);
  const atmosphereScale = useTransform(hoverSpring, [0, 1], [1, 1.08]);
  const backShadowY = useTransform(hoverSpring, [0, 1], [18, 28]);
  const backShadowBlur = useTransform(hoverSpring, [0, 1], [7, 16]);
  const backShadowOpacity = useTransform(hoverSpring, [0, 1], [0.22, 0.38]);
  const backShadowScale = useTransform(hoverSpring, [0, 1], [0.94, 1.02]);

  const src = artworkSrc(artwork);
  const rotation = artworkRotation(artwork);
  const scale = artworkScale(artwork);

  const setHover = useCallback(
    (next: boolean) => {
      if (reducedMotion) return;
      setHovered(next);
      hover.set(next ? 1 : 0);
    },
    [hover, reducedMotion],
  );

  useEffect(() => {
    if (!reducedMotion) return;
    hover.set(0);
    setHovered(false);
  }, [hover, reducedMotion]);

  if (!src) {
    return (
      <div className="flex min-h-[320px] items-center justify-center px-8 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-subtle)] sm:min-h-[480px]">
        Falta el asset del producto
      </div>
    );
  }

  const maskStyle: CSSProperties = {
    WebkitMaskImage: `url("${src}")`,
    maskImage: `url("${src}")`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };

  return (
    <div
      className="relative h-[clamp(320px,76vw,620px)] w-full sm:h-[min(70vw,580px)] lg:h-[620px]"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[54%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[82px]"
        style={{
          background: artwork.glow ?? "var(--color-accent)",
          opacity: hovered ? 0.48 : 0.25,
          scale: atmosphereScale,
        }}
        transition={{ duration: 0.35 }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[52%] h-[70%] w-[56%] -translate-x-1/2 -translate-y-1/2"
        style={{
          filter: "brightness(0) blur(7px)",
          opacity: backShadowOpacity,
          y: backShadowY,
          scale: backShadowScale,
          ...maskStyle,
        }}
      />

      <div className="pointer-events-none absolute left-0 top-[4%] z-20 font-mono text-[7px] font-bold uppercase tracking-[0.24em] text-[var(--color-text-subtle)] opacity-55 sm:left-[2%] sm:top-[7%] sm:text-[8px] sm:tracking-[0.28em]">
        ORIGINAL PACKSHOT
      </div>

      <div className="pointer-events-none absolute right-0 top-[4%] z-20 text-right font-mono text-[7px] uppercase tracking-[0.16em] text-[var(--color-text-subtle)] opacity-55 sm:right-[2%] sm:top-[7%] sm:text-[8px] sm:tracking-[0.2em]">
        TAPROOM SERIES
      </div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-[82%] w-[88%] -translate-x-1/2 -translate-y-1/2 sm:h-[86%] sm:w-[80%] sm:max-w-[600px]"
        style={{
          y: liftY,
          z: liftZ,
          scale: liftScale,
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="relative h-full w-full origin-center"
          style={{
            rotate: rotation,
            scale,
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotate: rotation,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              ...maskStyle,
              background: artwork.shadowColor ?? "rgba(0,0,0,.78)",
              opacity: hovered ? 0.28 : 0.14,
              filter: `blur(${backShadowBlur.get()}px)`,
              transform: "translateY(18px) scale(.96)",
            }}
          />

          <Image
            src={src}
            alt={name}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 82vw, 620px"
            className="pointer-events-none select-none object-contain"
            style={{
              filter: buildProductShadow(artwork, hovered),
            }}
            draggable={false}
            priority
          />

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,transparent_18%,rgba(255,255,255,.22)_39%,transparent_52%)] opacity-0"
            style={maskStyle}
            animate={{ opacity: hovered ? 0.34 : 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-[9%] left-1/2 h-6 w-[40%] -translate-x-1/2 rounded-[50%] blur-[17px] sm:bottom-[8%] sm:h-7 sm:w-[32%]"
        style={{
          background: artwork.shadowColor ?? "rgba(0,0,0,.78)",
          opacity: groundOpacity,
          scaleX: groundScale,
          transformOrigin: "center",
        }}
      />

      <div className="pointer-events-none absolute bottom-[5%] left-1/2 h-px w-[58%] -translate-x-1/2 bg-[var(--color-border)] sm:w-[48%]" />

      <div className="pointer-events-none absolute bottom-[1%] left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)] opacity-55 sm:block sm:text-[8px] sm:tracking-[0.22em]">
        {hovered ? "FOCUS / DEPTH ACTIVE" : "HOVER TO REVEAL"}
      </div>
    </div>
  );
}

function ShowcaseStat({
  label,
  value,
  highlight,
  accent,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  accent: string;
}) {
  return (
    <div className="min-w-0 border-t border-[var(--color-border)] pt-3">
      <div className="font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-[var(--color-text-subtle)]">
        {label}
      </div>
      <div
        className="mt-1 font-mono text-[clamp(1.35rem,6vw,2.45rem)] font-black leading-none tracking-[-0.055em] tabular-nums sm:text-[clamp(1.5rem,3vw,2.45rem)]"
        style={{ color: highlight ? accent : "var(--color-text)" }}
      >
        {value}
      </div>
    </div>
  );
}

type SlideDirection = 1 | -1;

const showroomVariants = {
  enter: (direction: SlideDirection) => ({
    opacity: 0,
    x: direction > 0 ? 84 : -84,
    scale: 0.965,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: SlideDirection) => ({
    opacity: 0,
    x: direction > 0 ? -84 : 84,
    scale: 0.975,
  }),
};

export default function NicheShowcase({ onOpenDetail }: NicheShowcaseProps) {
  const { config, menu } = useGastro();
  const { scrollTo } = useLenis();
  const reducedMotion = useReducedMotion();
  const showcase = resolveShowcase(config);
  const products = showcase?.products ?? [];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(1);

  useEffect(() => {
    setSelectedIndex((current) => {
      if (!products.length) return 0;
      return Math.min(current, products.length - 1);
    });
  }, [products.length]);

  const activeProduct = products[selectedIndex] ?? products[0];

  const changeTo = useCallback(
    (nextIndex: number, direction: SlideDirection) => {
      if (!products.length) return;
      if (nextIndex === selectedIndex) return;
      setSlideDirection(direction);
      setSelectedIndex(nextIndex);
    },
    [products.length, selectedIndex],
  );

  const previous = useCallback(() => {
    if (!products.length) return;
    const nextIndex = selectedIndex === 0 ? products.length - 1 : selectedIndex - 1;
    changeTo(nextIndex, -1);
  }, [changeTo, products.length, selectedIndex]);

  const next = useCallback(() => {
    if (!products.length) return;
    const nextIndex = selectedIndex === products.length - 1 ? 0 : selectedIndex + 1;
    changeTo(nextIndex, 1);
  }, [changeTo, products.length, selectedIndex]);

  if (!showcase || !activeProduct) return null;

  const handleOrder = () => {
    const matched = resolveMenuProduct(activeProduct, menu.products);

    if (matched && onOpenDetail) {
      onOpenDetail(matched);
      return;
    }

    scrollTo("#menu", { offset: -20, duration: 1.05 });
  };

  return (
    <section
      id="destacados"
      className="relative isolate overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-bg)] py-12 sm:py-16 lg:py-22"
      style={{
        background: [
          `radial-gradient(circle at 78% 36%, ${activeProduct.ambientGlow} 0%, transparent 30%)`,
          `radial-gradient(circle at 22% 88%, ${activeProduct.ambientGlow} 0%, transparent 25%)`,
          "var(--color-bg)",
        ].join(","),
      }}
    >
      {showcase.atmosphereImage ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          <Image
            src={showcase.atmosphereImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover grayscale contrast-125 saturate-0"
            style={{ opacity: 0.1 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg,var(--color-bg) 0%,transparent 34%,transparent 66%,var(--color-bg) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,var(--color-bg) 0%,transparent 24%,transparent 72%,var(--color-bg) 100%)",
            }}
          />
        </div>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px,transparent 1px),linear-gradient(90deg,var(--color-border) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <header className="mb-6 flex flex-col gap-5 border-b border-[var(--color-border)] pb-5 sm:mb-7 sm:gap-6 sm:pb-6 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.24em] text-[var(--color-accent)] sm:text-[9px] sm:tracking-[0.28em]">
              <Beer size={14} strokeWidth={1.7} />
              <span>{showcase.header.eyebrow}</span>
            </div>

            <h2 className="mt-3 text-[clamp(2.75rem,11vw,7.2rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[var(--color-text)] sm:text-[clamp(3.6rem,6.6vw,7.2rem)] sm:leading-[0.82]">
              {showcase.header.titlePrefix}
              <span className="ml-0 mt-1 block font-serif italic font-normal text-[var(--color-accent)] sm:ml-2 sm:mt-0 sm:inline">
                {showcase.header.titleAccent}
              </span>
              {showcase.header.titleSuffix ?? ""}
            </h2>

            {showcase.header.description ? (
              <p className="mt-4 max-w-2xl text-[11px] leading-5 text-[var(--color-text-muted)] sm:text-sm sm:leading-6">
                {showcase.header.description}
              </p>
            ) : null}
          </div>

          <div className="flex items-end gap-3 font-mono">
            <span className="text-[clamp(2.7rem,10vw,4.5rem)] font-black leading-none tracking-[-0.08em] text-[var(--color-text)] sm:text-[clamp(3rem,5vw,4.5rem)]">
              {activeProduct.index}
            </span>
            <span className="pb-1 text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-subtle)] sm:pb-2 sm:text-[9px] sm:tracking-[0.24em]">
              / {String(products.length).padStart(2, "0")} TAPS
            </span>
          </div>
        </header>

        <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-8">
          <div className="order-2 flex min-w-0 flex-col justify-center lg:order-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeProduct.id}
                custom={slideDirection}
                variants={showroomVariants}
                initial={reducedMotion ? false : "enter"}
                animate="center"
                exit={reducedMotion ? undefined : "exit"}
                transition={{
                  duration: reducedMotion ? 0 : 0.46,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="flex flex-wrap items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.2em] sm:gap-3 sm:text-[9px] sm:tracking-[0.24em]">
                  <span style={{ color: activeProduct.accentColor }}>
                    {activeProduct.badge ?? `TAP ${activeProduct.index}`}
                  </span>
                  <span className="h-px w-7 bg-[var(--color-border)] sm:w-10" />
                  <span className="text-[var(--color-text-subtle)]">{activeProduct.style}</span>
                </div>

                <h3 className="mt-4 max-w-[760px] text-[clamp(2.55rem,11vw,6rem)] font-black uppercase leading-[0.82] tracking-[-0.075em] text-[var(--color-text)] sm:text-[clamp(3rem,5.8vw,6rem)] sm:leading-[0.78]">
                  {activeProduct.name}
                </h3>

                {activeProduct.subtitle ? (
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-[var(--color-text-muted)] sm:text-xs sm:tracking-[0.2em]">
                    {activeProduct.subtitle}
                  </p>
                ) : null}

                <p className="mt-4 max-w-xl text-[13px] leading-6 text-[var(--color-text-muted)] sm:text-[15px] sm:leading-7">
                  {activeProduct.description}
                </p>

                {activeProduct.award ? (
                  <div className="mt-6 flex gap-3 border-y border-[var(--color-border)] py-4">
                    <Award
                      size={17}
                      className="mt-0.5 shrink-0"
                      style={{ color: activeProduct.accentColor }}
                    />
                    <div>
                      <div className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
                        {activeProduct.award.label}
                      </div>
                      <div className="mt-1 text-xs font-semibold text-[var(--color-text)]">
                        {activeProduct.award.text}
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-[var(--color-border)] py-5 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-5">
                  {activeProduct.technical.map((spec) => (
                    <ShowcaseStat
                      key={`${activeProduct.id}-${spec.label}`}
                      label={spec.label}
                      value={`${spec.value}${spec.unit ?? ""}`}
                      highlight={spec.highlight}
                      accent={activeProduct.accentColor}
                    />
                  ))}
                </div>

                {activeProduct.secondary?.length ? (
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[7px] uppercase tracking-[0.13em] text-[var(--color-text-subtle)] sm:gap-x-5 sm:text-[8px] sm:tracking-[0.16em]">
                    {activeProduct.secondary.map((detail) => (
                      <span key={`${activeProduct.id}-${detail.label}`}>
                        <strong className="text-[var(--color-text)]">{detail.label}:</strong>{" "}
                        {detail.value}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={handleOrder}
                    className="group inline-flex min-h-12 w-full items-center justify-between gap-4 border border-[var(--color-accent)] bg-[var(--color-accent)] px-4 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-contrast)] transition-[filter,transform] duration-300 hover:brightness-110 active:scale-[0.985] sm:w-auto sm:gap-8 sm:px-5 sm:text-[9px] sm:tracking-[0.16em]"
                  >
                    <span className="flex min-w-0 items-center gap-2 truncate">
                      <ShoppingBag size={14} />
                      <span className="truncate">
                        {activeProduct.actionText ?? showcase.labels.action}
                      </span>
                    </span>
                    {activeProduct.price !== undefined ? (
                      <span className="shrink-0 tabular-nums">
                        {formatMoney(activeProduct.price)}
                      </span>
                    ) : (
                      <ArrowRight
                        size={14}
                        className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}
                  </button>

                  <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-[var(--color-text-subtle)] sm:text-[8px] sm:tracking-[0.18em]">
                    {activeProduct.footer?.[0] ?? "Cerveza artesanal"}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <div className="relative overflow-visible">
              <div className="pointer-events-none absolute left-0 top-[7%] z-20 hidden h-[80%] flex-col justify-between pr-4 sm:flex">
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-subtle)] opacity-55 [writing-mode:vertical-rl] rotate-180">
                  TAPROOM / ORIGINAL SERIES
                </span>
                <ArrowDownRight
                  size={16}
                  className="text-[var(--color-text-subtle)] opacity-60"
                />
              </div>

              <div className="pointer-events-none absolute right-0 top-[7%] hidden text-right font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--color-text-subtle)] opacity-55 sm:block">
                {activeProduct.footer?.[1] ?? "DRAFT / SERVICIO"}
              </div>

              <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
                <motion.div
                  key={activeProduct.id}
                  custom={slideDirection}
                  variants={showroomVariants}
                  initial={reducedMotion ? false : "enter"}
                  animate="center"
                  exit={reducedMotion ? undefined : "exit"}
                  transition={{
                    duration: reducedMotion ? 0 : 0.52,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <ProductArtwork
                    artwork={activeProduct.artwork}
                    name={activeProduct.name}
                    reducedMotion={reducedMotion}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <nav
          className="mt-4 border-y border-[var(--color-border)]"
          aria-label="Cervezas destacadas"
        >
          <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {products.map((product, index) => {
              const active = index === selectedIndex;

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => changeTo(index, index > selectedIndex ? 1 : -1)}
                  aria-pressed={active}
                  className="group relative min-w-[44vw] flex-1 cursor-pointer border-r border-[var(--color-border)] px-3 py-4 text-left last:border-r-0 sm:min-w-[185px] sm:px-5"
                >
                  <span
                    className="font-mono text-[8px] font-bold tracking-[0.18em]"
                    style={{
                      color: active
                        ? product.accentColor
                        : "var(--color-text-subtle)",
                    }}
                  >
                    {product.index}
                  </span>
                  <span className="mt-1 block truncate text-[10px] font-black uppercase tracking-[-0.02em] text-[var(--color-text)] sm:text-xs">
                    {product.name}
                  </span>
                  <span className="mt-1 block truncate font-mono text-[7px] uppercase tracking-[0.1em] text-[var(--color-text-subtle)] sm:text-[8px] sm:tracking-[0.12em]">
                    {product.style}
                  </span>
                  <span
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left transition-transform duration-300"
                    style={{
                      background: product.accentColor,
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={previous}
            aria-label={showcase.labels.previous}
            className="group inline-flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] sm:text-[9px] sm:tracking-[0.16em]"
          >
            <span className="flex h-9 w-9 items-center justify-center border border-[var(--color-border)] transition-transform group-hover:-translate-x-1">
              <ArrowLeft size={14} />
            </span>
            <span className="hidden sm:inline">{showcase.labels.previous}</span>
          </button>

          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--color-text-subtle)] sm:tracking-[0.22em]">
            {String(selectedIndex + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={next}
            aria-label={showcase.labels.next}
            className="group inline-flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] sm:text-[9px] sm:tracking-[0.16em]"
          >
            <span className="hidden sm:inline">{showcase.labels.next}</span>
            <span className="flex h-9 w-9 items-center justify-center border border-[var(--color-border)] transition-transform group-hover:translate-x-1">
              <ArrowRight size={14} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
