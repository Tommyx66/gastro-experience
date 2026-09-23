"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { useGastro } from "@/context/gastro-context";
import { useLenis } from "@/hooks/use-scroll";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { config, preset } = useGastro();
  const { content, brand } = config;
  const hero = content.hero;
  const { scrollTo } = useLenis();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "11%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.01]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.45]);

  const handleCtaClick = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const cleanId = targetId.replace(/^#/, "");
    if (!cleanId || cleanId === "inicio") {
      scrollTo(0, { duration: 1.2 });
      return;
    }
    scrollTo(`#${cleanId}`, { offset: -16, duration: 1.2 });
  };

  const isEditorial = (preset as any)?.visual?.hero === "editorial";

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-[100svh] w-full overflow-hidden overflow-x-clip bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-500"
    >
      {/* =========================================================
          IMAGEN DE FONDO & OVERLAYS
      ========================================================== */}
      <motion.div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-[-7%]"
        >
          <Image
            src={hero.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`object-cover transition-[filter,transform] duration-700 ${
              isEditorial
                ? "brightness-[0.78] contrast-[1.02] saturate-[0.88]"
                : "brightness-[0.52] contrast-[1.14] saturate-[0.62]"
            }`}
          />
        </motion.div>

        {!isEditorial && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/90 via-[var(--color-bg)]/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/40 to-[var(--color-bg)]/5" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_38%,transparent_0%,transparent_25%,var(--color-bg)_100%)] opacity-50" />
            <div className="absolute left-1/2 top-[26%] h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.055] blur-[100px] sm:h-[420px] sm:w-[420px] sm:blur-[140px]" />
          </>
        )}

        {isEditorial && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/18 via-transparent to-[var(--color-bg)]/84" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/62 via-transparent to-transparent" />
            <div className="absolute inset-y-0 left-[8%] w-px bg-[var(--color-text)]/12" />
            <div className="absolute bottom-[12%] right-[8%] h-[180px] w-[180px] rounded-full bg-[var(--color-accent)] opacity-[0.07] blur-[90px] sm:h-[260px] sm:w-[260px] sm:blur-[120px]" />
          </>
        )}
      </motion.div>

      {/* =========================================================
          TOP RAIL
      ========================================================== */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-4 pt-4 sm:px-8 sm:pt-7 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-[1600px] items-start justify-between gap-4 border-b border-[var(--color-text)]/12 pb-3 sm:pb-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] min-[380px]:text-[9px] sm:text-[10px] sm:tracking-[0.24em]">
              {hero.eyebrow}
            </span>
            <span className="hidden h-px w-8 shrink-0 bg-[var(--color-accent)] opacity-70 sm:block" />
            <span className="hidden truncate font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--color-text-subtle)] md:block">
              {brand.descriptor}
            </span>
          </div>

          <div className="hidden shrink-0 items-center gap-3 min-[420px]:flex sm:gap-5">
            <span className="font-mono text-[8px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-subtle)]">
              01
            </span>
            <span className="h-px w-6 bg-[var(--color-text)]/15 sm:w-10" />
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)]">
              {isEditorial ? "Editorial" : "Experience"}
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          SIDE RAIL
      ========================================================== */}
      <div className="pointer-events-none absolute bottom-12 left-4 z-20 hidden flex-col items-center gap-4 md:flex lg:left-6">
        <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-[var(--color-text-subtle)] [writing-mode:vertical-rl]">
          Scroll to explore
        </span>
        <span className="h-16 w-px bg-gradient-to-b from-[var(--color-accent)] to-transparent" />
      </div>

      {/* =========================================================
          CONTENT PRINCIPAL
      ========================================================== */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex min-h-[100svh] w-full items-end"
      >
        <div className="mx-auto w-full max-w-[1600px] px-4 pb-7 pt-28 sm:px-8 sm:pb-10 sm:pt-32 md:px-12 md:pb-14 lg:px-16 lg:pb-16">
          {isEditorial ? (
            <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.55fr)] lg:items-end">
              <div className="min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="mb-4 flex items-center gap-3 sm:mb-5"
                >
                  <span className="h-px w-8 shrink-0 bg-[var(--color-accent)] sm:w-10" />
                  <span className="truncate font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] sm:text-[9px] sm:tracking-[0.26em]">
                    {brand.descriptor}
                  </span>
                </motion.div>

                {/* TÍTULO EDITORIAL SIN QUIEBRES FORZADOS */}
                <h1 className="max-w-[900px] select-none break-normal hyphens-none text-[clamp(2.1rem,9.5vw,8.5rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-[clamp(3.5rem,8.5vw,8.5rem)]">
                  <span className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="block break-normal text-[var(--color-text)]"
                    >
                      {hero.titlePrefix}
                    </motion.span>
                  </span>

                  <span className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                      className="block break-normal font-serif text-[clamp(2.2rem,9.2vw,8.2rem)] font-light italic leading-[0.9] tracking-[-0.03em] text-[var(--color-accent)] sm:text-[clamp(3.3rem,8vw,8.2rem)]"
                    >
                      {hero.titleAccent}
                    </motion.span>
                  </span>
                </h1>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.52 }}
                  className="mt-6 max-w-xl border-l border-[var(--color-accent)] pl-3.5 sm:mt-10 sm:pl-5"
                >
                  <p className="break-normal text-[13px] font-light leading-relaxed text-[var(--color-text-muted)] sm:text-base md:text-lg">
                    {hero.subtitle}
                  </p>
                </motion.div>
              </div>

              {/* CTA EDITORIAL */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.62 }}
                className="flex min-w-0 flex-col items-start gap-5 border-t border-[var(--color-text)]/15 pt-5 lg:items-end lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 lg:text-right"
              >
                <span className="max-w-full font-mono text-[8px] uppercase leading-relaxed tracking-[0.16em] text-[var(--color-text-subtle)] sm:max-w-xs sm:text-[9px] sm:tracking-[0.2em]">
                  {hero.eyebrow}
                </span>

                <a
                  href={`#${hero.ctaHref}`}
                  onClick={(e) => handleCtaClick(e, hero.ctaHref)}
                  className="group flex max-w-full cursor-pointer items-center gap-3 sm:gap-4"
                >
                  <span className="max-w-[170px] font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-accent)] sm:text-[9px] sm:tracking-[0.2em] lg:text-right">
                    {hero.cta}
                  </span>

                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 active:scale-95 sm:h-14 sm:w-14">
                    <ArrowDownRight size={16} strokeWidth={1.8} />
                  </span>
                </a>
              </motion.div>
            </div>
          ) : (
            <div className="min-w-0">
              <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,auto)] lg:items-end">
                <div className="min-w-0">
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.18 }}
                    className="mb-4 flex items-center gap-3 sm:mb-5"
                  >
                    <span className="h-px w-8 shrink-0 bg-[var(--color-accent)] sm:w-10" />
                    <span className="truncate font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] sm:text-[9px] sm:tracking-[0.27em]">
                      {hero.eyebrow}
                    </span>
                  </motion.div>

                  {/* TÍTULO STANDARD SIN QUIEBRES FORZADOS */}
                  <h1 className="select-none break-normal hyphens-none text-[clamp(2.2rem,9.8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.055em] sm:text-[clamp(3.8rem,9vw,9rem)]">
                    <span className="block overflow-hidden">
                      <motion.span
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.95, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        className="block break-normal text-[var(--color-text)]"
                      >
                        {hero.titlePrefix}
                      </motion.span>
                    </span>

                    <span className="block overflow-hidden">
                      <motion.span
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.33, ease: [0.16, 1, 0.3, 1] }}
                        className="block break-normal font-serif text-[clamp(2.2rem,9.4vw,8.6rem)] font-light italic leading-[0.9] tracking-[-0.035em] text-[var(--color-accent)] sm:text-[clamp(3.6rem,8.5vw,8.6rem)]"
                      >
                        {hero.titleAccent}
                      </motion.span>
                    </span>
                  </h1>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.52 }}
                    className="mt-6 max-w-xl border-l border-[var(--color-accent)] pl-3.5 sm:mt-10 sm:pl-5"
                  >
                    <p className="break-normal text-[13px] font-light leading-relaxed text-[var(--color-text-muted)] sm:text-base md:text-lg">
                      {hero.subtitle}
                    </p>
                  </motion.div>
                </div>

                {/* SIDE CONTENT */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="flex min-w-0 flex-col items-start gap-5 pb-1 lg:items-end"
                >
                  <p className="max-w-full break-normal border-l border-[var(--color-accent)] pl-3.5 text-[13px] font-light leading-relaxed text-[var(--color-text-muted)] sm:max-w-sm sm:text-base lg:border-l-0 lg:border-r lg:pr-4 lg:text-right">
                    {hero.subtitle}
                  </p>

                  <a
                    href={`#${hero.ctaHref}`}
                    onClick={(e) => handleCtaClick(e, hero.ctaHref)}
                    className="group flex max-w-full cursor-pointer items-center gap-3 sm:gap-4"
                  >
                    <span className="max-w-[170px] font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-accent)] sm:text-[9px] sm:tracking-[0.22em]">
                      {hero.cta}
                    </span>

                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 active:scale-95 sm:h-14 sm:w-14">
                      <ArrowUpRight size={16} strokeWidth={1.8} />
                    </span>
                  </a>
                </motion.div>
              </div>

              {/* META FOOTER */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.58 }}
                className="mt-7 grid min-w-0 border-t border-[var(--color-text)]/12 pt-3 sm:mt-8 sm:grid-cols-3 sm:pt-4"
              >
                <span className="truncate py-2 font-mono text-[8px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)] sm:border-r sm:border-[var(--color-text)]/12 sm:pr-5">
                  {brand.descriptor}
                </span>

                <span className="hidden truncate py-2 pl-5 font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--color-text-subtle)] sm:block sm:border-r sm:border-[var(--color-text)]/12">
                  Cocina · Espacio · Experiencia
                </span>

                <span className="hidden truncate py-2 pl-5 font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--color-text-subtle)] sm:block sm:text-right">
                  01 — Inicio
                </span>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}