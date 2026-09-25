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
import { ArrowDownRight, ArrowLeft, ArrowRight, Award, Beer, ShoppingBag } from "lucide-react";
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

function resolveShowcase(config: ReturnType<typeof useGastro>["config"]): GastroShowcaseConfig | null {
  const candidate = (
    config.content as unknown as { showcase?: GastroShowcaseConfig }
  ).showcase;

  if (!candidate || candidate.enabled === false) return null;
  if (candidate.engine !== "product-showroom") return null;
  if (!candidate.products.length) return null;

  return candidate;
}

function resolveMenuProduct(item: GastroShowcaseProduct, products: MenuProduct[]) {
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

function buildProductShadow(artwork: GastroShowcaseArtwork, hovered: boolean) {
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
      <div className="flex min-h-[430px] items-center justify-center px-8 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-subtle)] sm:min-h-[560px]">
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
      className="relative h-[min(72vw,680px)] min-h-[440px] w-full sm:min-h-[540px] lg:h-[620px]"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[82px]"
        style={{
          background: artwork.glow ?? "var(--color-accent)",
          opacity: hovered ? 0.48 : 0.25,
          scale: atmosphereScale,
        }}
        transition={{ duration: 0.35 }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[52%] h-[70%] w-[48%] -translate-x-1/2 -translate-y-1/2"
        style={{
          filter: "brightness(0) blur(7px)",
          opacity: backShadowOpacity,
          y: backShadowY,
          scale: useTransform(hoverSpring, [0, 1], [0.94, 1.02]),
          ...maskStyle,
        }}
      />

      <div className="pointer-events-none absolute left-[2%] top-[7%] z-20 font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-white/24">
        ORIGINAL PACKSHOT
      </div>

      <div className="pointer-events-none absolute right-[2%] top-[7%] z-20 text-right font-mono text-[8px] uppercase tracking-[0.2em] text-white/22">
        TAPROOM SERIES
      </div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-[86%] w-[80%] max-w-[600px] -translate-x-1/2 -translate-y-1/2"
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
            sizes="(max-width: 1024px) 88vw, 620px"
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
        className="pointer-events-none absolute bottom-[8%] left-1/2 h-7 w-[32%] -translate-x-1/2 rounded-[50%] blur-[17px]"
        style={{
          background: artwork.shadowColor ?? "rgba(0,0,0,.78)",
          opacity: groundOpacity,
          scaleX: groundScale,
          transformOrigin: "center",
        }}
      />

      <div className="pointer-events-none absolute bottom-[5%] left-1/2 h-px w-[48%] -translate-x-1/2 bg-white/[0.08]" />

      <div className="pointer-events-none absolute bottom-[2%] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.22em] text-white/20">
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
    <div className="min-w-0 border-t border-white/10 pt-3">
      <div className="font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-[var(--color-text-subtle)]">
        {label}
      </div>
      <div
        className="mt-1 font-mono text-[clamp(1.5rem,3vw,2.45rem)] font-black leading-none tracking-[-0.055em] tabular-nums"
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
      className="relative isolate overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-bg)] py-14 sm:py-18 lg:py-22"
      style={{
        background: [
          `radial-gradient(circle at 78% 36%, ${activeProduct.ambientGlow} 0%, transparent 30%)`,
          `radial-gradient(circle at 22% 88%, ${activeProduct.ambientGlow} 0%, transparent 25%)`,
          "var(--color-bg)",
        ].join(","),
      }}
    >
      {showcase.atmosphereImage ? (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <Image
            src={showcase.atmosphereImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover grayscale contrast-125 saturate-0"
            style={{ opacity: 0.16 }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-bg)_0%,rgba(0,0,0,.12)_36%,rgba(0,0,0,.08)_64%,var(--color-bg)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-bg)_0%,transparent_24%,transparent_72%,var(--color-bg)_100%)]" />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <header className="mb-7 flex flex-col gap-6 border-b border-white/10 pb-6 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--color-accent)]">
              <Beer size={14} strokeWidth={1.7} />
              <span>{showcase.header.eyebrow}</span>
            </div>

            <h2 className="mt-3 text-[clamp(3rem,6.6vw,7.2rem)] font-black uppercase leading-[0.82] tracking-[-0.08em] text-[var(--color-text)]">
              {showcase.header.titlePrefix}
              <span className="ml-2 font-serif italic font-normal text-[var(--color-accent)]">
                {showcase.header.titleAccent}
              </span>
              {showcase.header.titleSuffix ?? ""}
            </h2>

            {showcase.header.description ? (
              <p className="mt-4 max-w-2xl text-[12px] leading-6 text-[var(--color-text-muted)] sm:text-sm">
                {showcase.header.description}
              </p>
            ) : null}
          </div>

          <div className="flex items-end gap-3 font-mono">
            <span className="text-[clamp(3rem,5vw,4.5rem)] font-black leading-none tracking-[-0.08em] text-[var(--color-text)]">
              {activeProduct.index}
            </span>
            <span className="pb-2 text-[9px] font-bold uppercase tracking-[0.24em] text-[var(--color-text-subtle)]">
              / {String(products.length).padStart(2, "0")} TAPS
            </span>
          </div>
        </header>

        <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-8">
          <div className="order-2 flex flex-col justify-center lg:order-1">
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
                <div className="flex items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.24em]">
                  <span style={{ color: activeProduct.accentColor }}>
                    {activeProduct.badge ?? `TAP ${activeProduct.index}`}
                  </span>
                  <span className="h-px w-10 bg-white/15" />
                  <span className="text-[var(--color-text-subtle)]">{activeProduct.style}</span>
                </div>

                <h3 className="mt-4 max-w-[760px] text-[clamp(3rem,5.8vw,6rem)] font-black uppercase leading-[0.78] tracking-[-0.075em] text-[var(--color-text)]">
                  {activeProduct.name}
                </h3>

                {activeProduct.subtitle ? (
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)] sm:text-xs">
                    {activeProduct.subtitle}
                  </p>
                ) : null}

                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-[15px]">
                  {activeProduct.description}
                </p>

                {activeProduct.award ? (
                  <div className="mt-6 flex gap-3 border-y border-white/10 py-4">
                    <Award size={17} className="mt-0.5 shrink-0" style={{ color: activeProduct.accentColor }} />
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

                <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-5 border-y border-white/10 py-5 sm:grid-cols-4 sm:gap-x-4">
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
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[8px] uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
                    {activeProduct.secondary.map((detail) => (
                      <span key={`${activeProduct.id}-${detail.label}`}>
                        <strong className="text-[var(--color-text)]">{detail.label}:</strong> {detail.value}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={handleOrder}
                    className="group inline-flex min-h-12 items-center justify-between gap-8 border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent-contrast)] transition-[filter,transform] duration-300 hover:brightness-110 active:scale-[0.985]"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBag size={14} />
                      {activeProduct.actionText ?? showcase.labels.action}
                    </span>
                    {activeProduct.price !== undefined ? (
                      formatMoney(activeProduct.price)
                    ) : (
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </button>

                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)]">
                    {activeProduct.footer?.[0] ?? "Cerveza artesanal"}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <div className="relative overflow-visible">
              <div className="pointer-events-none absolute left-0 top-[7%] z-20 flex h-[80%] flex-col justify-between pr-4">
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 [writing-mode:vertical-rl] rotate-180">
                  TAPROOM / ORIGINAL SERIES
                </span>
                <ArrowDownRight size={16} className="text-white/18" />
              </div>

              <div className="pointer-events-none absolute right-0 top-[7%] z-20 text-right font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
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

        <nav className="mt-4 border-y border-white/10" aria-label="Cervezas destacadas">
          <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {products.map((product, index) => {
              const active = index === selectedIndex;

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => changeTo(index, index > selectedIndex ? 1 : -1)}
                  aria-pressed={active}
                  className="group relative min-w-[150px] flex-1 cursor-pointer border-r border-white/10 px-4 py-4 text-left last:border-r-0 sm:min-w-[185px] sm:px-5"
                >
                  <span
                    className="font-mono text-[8px] font-bold tracking-[0.18em]"
                    style={{ color: active ? product.accentColor : "var(--color-text-subtle)" }}
                  >
                    {product.index}
                  </span>
                  <span className="mt-1 block truncate text-[11px] font-black uppercase tracking-[-0.02em] text-[var(--color-text)] sm:text-xs">
                    {product.name}
                  </span>
                  <span className="mt-1 block truncate font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
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
            className="group inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            <span className="flex h-9 w-9 items-center justify-center border border-white/10 transition-transform group-hover:-translate-x-1">
              <ArrowLeft size={14} />
            </span>
            <span className="hidden sm:inline">{showcase.labels.previous}</span>
          </button>

          <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--color-text-subtle)]">
            {String(selectedIndex + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={next}
            aria-label={showcase.labels.next}
            className="group inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            <span className="hidden sm:inline">{showcase.labels.next}</span>
            <span className="flex h-9 w-9 items-center justify-center border border-white/10 transition-transform group-hover:translate-x-1">
              <ArrowRight size={14} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
