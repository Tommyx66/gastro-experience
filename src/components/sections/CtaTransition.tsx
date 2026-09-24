"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { SiteConfig, ThemeMode } from "@/config/site";
import type { GastroPreset } from "@/config/presets/types";
import { useGastro } from "@/context/gastro-context";
import { useThemeStore } from "@/store/use-theme-store";

// Fotografía curada exclusiva para el bloque de transición CTA
const NICHE_CTA_IMAGES: Record<string, string> = {
  restaurant: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=85",
  cafe: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1920&q=85",
  brewery: "https://images.unsplash.com/photo-1518085250887-2f903c200fee?auto=format&fit=crop&w=1920&q=85",
  bakery: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1920&q=85",
  icecream: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1920&q=85",
  bodegon: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1920&q=85",
  catering: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1920&q=85",
};

function getColors(preset: GastroPreset, theme: ThemeMode) {
  const colors = preset.theme.colors?.[theme];

  return {
    bg: colors?.bg ?? "var(--color-bg)",
    bgElevated: colors?.bgElevated ?? "var(--color-bg-elevated)",
    surface: colors?.surface ?? "var(--color-surface)",
    surfaceElevated: colors?.surfaceElevated ?? "var(--color-surface-elevated)",
    surfaceInverse: colors?.surfaceInverse ?? "var(--color-surface-inverse)",
    text: colors?.text ?? "var(--color-text)",
    muted: colors?.textMuted ?? "var(--color-text-muted)",
    subtle: colors?.textSubtle ?? "var(--color-text-subtle)",
    accent: colors?.accent ?? "var(--color-accent)",
    accentStrong: colors?.accentStrong ?? "var(--color-accent-strong)",
    accentContrast: colors?.accentContrast ?? "var(--color-accent-contrast)",
    accentSoft: colors?.accentSoft ?? "var(--color-accent-soft)",
    accentFaint: colors?.accentFaint ?? "var(--color-accent-faint)",
    accentBorder: colors?.accentBorder ?? "var(--color-accent-border)",
    border: colors?.border ?? "var(--color-border)",
    borderStrong: colors?.borderStrong ?? "var(--color-border-strong)",
    overlay: colors?.overlay ?? "var(--color-overlay)",
  };
}

type CtaColors = ReturnType<typeof getColors>;

function EditorialCTA({
  config,
  colors,
  niche,
}: {
  config: SiteConfig;
  colors: CtaColors;
  niche: string;
}) {
  const cta = config.content.ctaTransition;
  const image = (cta as any)?.image ?? NICHE_CTA_IMAGES[niche];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: colors.bg, color: colors.text }}
    >
      <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div
          className="relative overflow-hidden border"
          style={{ borderColor: colors.borderStrong, background: colors.surface }}
        >
          <div className="relative h-[68vh] min-h-[560px] md:h-[760px]">
            <img
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(20,12,8,0.48) 0%, rgba(20,12,8,0.10) 27%, rgba(20,12,8,0.05) 45%, rgba(20,12,8,0.74) 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(20,12,8,0.52) 0%, transparent 32%, transparent 70%, rgba(20,12,8,0.18) 100%)",
              }}
            />

            <div className="absolute left-6 right-6 top-6 flex items-start justify-between gap-6 md:left-10 md:right-10 md:top-10 lg:left-14 lg:right-14">
              <div>
                <span
                  className="block text-[9px] font-bold uppercase tracking-[0.24em]"
                  style={{
                    color: "#FFFFFF",
                    fontFamily: "var(--font-mono-family, monospace)",
                    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  {cta.eyebrow}
                </span>
                <div
                  className="mt-3 h-px w-16"
                  style={{ background: colors.accentStrong }}
                />
              </div>

              <span
                className="text-right text-[9px] font-bold uppercase tracking-[0.2em]"
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontFamily: "var(--font-mono-family, monospace)",
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                {config.brand.shortName}
              </span>
            </div>
          </div>

          <div className="relative" style={{ background: colors.surface }}>
            <div
              className="absolute left-0 right-0 top-0 h-[3px]"
              style={{ background: colors.accent }}
            />

            <div className="px-6 pb-10 pt-12 md:px-10 md:pb-14 md:pt-16 lg:px-14 lg:pb-18 lg:pt-20">
              <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">
                <div>
                  <div
                    className="mb-6 text-[9px] font-bold uppercase tracking-[0.24em]"
                    style={{
                      color: colors.accentStrong,
                      fontFamily: "var(--font-mono-family, monospace)",
                    }}
                  >
                    {config.brand.descriptor}
                  </div>

                  <h2
                    className="max-w-6xl text-[clamp(4rem,9.8vw,10rem)] leading-[0.78] tracking-[-0.075em]"
                    style={{
                      color: colors.text,
                      fontFamily: "var(--font-display, serif)",
                      fontWeight: 400,
                    }}
                  >
                    {cta.titlePrefix}
                    <br />
                    <span style={{ color: colors.accentStrong, fontStyle: "italic" }}>
                      {cta.titleAccent}
                    </span>
                  </h2>
                </div>

                <div className="flex flex-col justify-end">
                  <div
                    className="mb-7 text-[9px] font-bold uppercase tracking-[0.22em]"
                    style={{
                      color: colors.subtle,
                      fontFamily: "var(--font-mono-family, monospace)",
                    }}
                  >
                    02 / EXPERIENCIA
                  </div>

                  <p
                    className="text-sm leading-7"
                    style={{
                      color: colors.muted,
                      fontFamily: "var(--font-body, sans-serif)",
                    }}
                  >
                    {cta.description}
                  </p>

                  <div
                    className="my-8 h-px w-full"
                    style={{ background: colors.border }}
                  />

                  <a
                    href="#contacto"
                    className="group flex items-center justify-between border-b pb-4 cursor-pointer"
                    style={{ borderColor: colors.accent }}
                  >
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.2em]"
                      style={{
                        color: colors.text,
                        fontFamily: "var(--font-mono-family, monospace)",
                      }}
                    >
                      {cta.buttonText}
                    </span>

                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
                      style={{
                        background: colors.accent,
                        color: colors.accentContrast,
                      }}
                    >
                      <ArrowRight size={15} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImmersiveCTA({
  config,
  colors,
  niche,
}: {
  config: SiteConfig;
  colors: CtaColors;
  niche: string;
}) {
  const cta = config.content.ctaTransition;
  const image = (cta as any)?.image ?? NICHE_CTA_IMAGES[niche];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: colors.bg, color: colors.text }}
    >
      <div className="relative min-h-[760px] md:min-h-[900px]">
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(3,3,3,0.6) 0%, rgba(3,3,3,0.06) 28%, rgba(3,3,3,0.16) 46%, rgba(3,3,3,0.94) 100%)",
          }}
        />

        <div className="absolute left-6 right-6 top-7 md:left-10 md:right-10 md:top-10 lg:left-14 lg:right-14">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span className="h-px w-14" style={{ background: colors.accent }} />
              <span
                className="text-[9px] font-bold uppercase tracking-[0.24em]"
                style={{
                  color: "#FFFFFF",
                  fontFamily: "var(--font-mono-family, monospace)",
                  textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                }}
              >
                {cta.eyebrow}
              </span>
            </div>

            <span
              className="text-[9px] font-bold uppercase tracking-[0.2em]"
              style={{
                color: "rgba(255,255,255,0.62)",
                fontFamily: "var(--font-mono-family, monospace)",
              }}
            >
              {config.brand.shortName}
            </span>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[760px] max-w-[1500px] flex-col justify-end px-6 pb-10 md:min-h-[900px] md:px-10 md:pb-14 lg:px-14 lg:pb-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end lg:gap-20">
            <div>
              <div
                className="mb-6 text-[9px] font-bold uppercase tracking-[0.24em]"
                style={{
                  color: colors.accentStrong,
                  fontFamily: "var(--font-mono-family, monospace)",
                }}
              >
                SALÓN · RESERVAS · NOCHE
              </div>

              <h2
                className="max-w-6xl text-[clamp(4.3rem,10.4vw,11rem)] leading-[0.75] tracking-[-0.08em]"
                style={{
                  color: "#FFFFFF",
                  fontFamily: "var(--font-display, serif)",
                  fontWeight: 400,
                  textShadow: "0 4px 28px rgba(0,0,0,0.3)",
                }}
              >
                {cta.titlePrefix}
                <br />
                <span style={{ color: colors.accentStrong, fontStyle: "italic" }}>
                  {cta.titleAccent}
                </span>
              </h2>
            </div>

            <div className="flex flex-col items-start lg:items-end">
              <p
                className="max-w-sm text-sm leading-7 lg:text-right"
                style={{
                  color: "#FFFFFF",
                  opacity: 0.78,
                  fontFamily: "var(--font-body, sans-serif)",
                  textShadow: "0 2px 12px rgba(0,0,0,0.45)",
                }}
              >
                {cta.description}
              </p>

              <a
                href="#contacto"
                className="group mt-8 flex items-center gap-4 cursor-pointer"
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    color: "#FFFFFF",
                    fontFamily: "var(--font-mono-family, monospace)",
                    textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                  }}
                >
                  {cta.buttonText}
                </span>

                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: colors.accent,
                    color: colors.accentContrast,
                    boxShadow: "0 12px 40px var(--color-accent-soft)",
                  }}
                >
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MinimalCTA({
  config,
  colors,
}: {
  config: SiteConfig;
  colors: CtaColors;
}) {
  const cta = config.content.ctaTransition;

  return (
    <section
      className="relative overflow-hidden border-y py-28 md:py-36"
      style={{
        background: colors.surface,
        borderColor: colors.border,
        color: colors.text,
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em]"
          style={{
            color: colors.accent,
            fontFamily: "var(--font-mono-family, monospace)",
          }}
        >
          {cta.eyebrow}
        </div>

        <h2
          className="text-[clamp(3.4rem,7vw,7rem)] leading-[0.86] tracking-[-0.055em]"
          style={{ fontFamily: "var(--font-display, serif)", fontWeight: 400 }}
        >
          {cta.titlePrefix}
          <br />
          <span style={{ color: colors.accentStrong, fontStyle: "italic" }}>
            {cta.titleAccent}
          </span>
        </h2>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            className="max-w-xl text-sm leading-7"
            style={{
              color: colors.muted,
              fontFamily: "var(--font-body, sans-serif)",
            }}
          >
            {cta.description}
          </p>

          <a href="#contacto" className="group inline-flex items-center gap-4 cursor-pointer">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{
                color: colors.text,
                fontFamily: "var(--font-mono-family, monospace)",
              }}
            >
              {cta.buttonText}
            </span>

            <span
              className="flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
              style={{
                background: colors.accent,
                color: colors.accentContrast,
              }}
            >
              <ArrowRight size={15} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function CtaTransition() {
  const { preset, config, niche } = useGastro();
  const theme = useThemeStore((state) => state.theme);
  const colors = getColors(preset, theme);
  const variant = preset.visual?.cta ?? "minimal";

  if (variant === "editorial") {
    return <EditorialCTA config={config} colors={colors} niche={niche} />;
  }

  if (variant === "immersive") {
    return <ImmersiveCTA config={config} colors={colors} niche={niche} />;
  }

  return <MinimalCTA config={config} colors={colors} />;
}