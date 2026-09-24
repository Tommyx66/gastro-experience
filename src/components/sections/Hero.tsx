"use client";

import {
  useMemo,
  useRef,
  type MouseEvent,
} from "react";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import Image from "next/image";

import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

import {
  useGastro,
} from "@/context/gastro-context";

import {
  useLenis,
} from "@/hooks/use-scroll";

import type {
  GastroHeroComposition,
  GastroHeroCtaShape,
  GastroHeroImageTreatment,
  GastroHeroOverlay,
  GastroHeroStyleConfig,
  GastroHeroVariant,
} from "@/presets/types";

/* =========================================================
   TYPES
========================================================= */

type HeroRuntimeConfig = {
  variant:
    GastroHeroVariant;

  imageTreatment:
    GastroHeroImageTreatment;

  overlay:
    GastroHeroOverlay;

  composition:
    GastroHeroComposition;

  ctaShape:
    GastroHeroCtaShape;

  grain:
    boolean;

  parallax:
    boolean;

  intensity:
    number;

  imageClass:
    string;

  titleClass:
    string;

  accentTitleClass:
    string;

  copyClass:
    string;

  topLabel:
    string;

  sectionMeta:
    string;

  sideRail:
    boolean;

  ctaDirection:
    "upRight" | "downRight";

  glow:
    boolean;
};

/* =========================================================
   VARIANT DEFAULTS
========================================================= */

const HERO_VARIANT_DEFAULTS: Record<
  GastroHeroVariant,
  HeroRuntimeConfig
> = {
  cinematic: {
    variant: "cinematic",
    imageTreatment: "cinematic",
    overlay: "cinematic",
    composition: "standard",
    ctaShape: "circle",
    grain: false,
    parallax: true,
    intensity: 1,
    imageClass:
      "brightness-[0.5] contrast-[1.14] saturate-[0.62]",
    titleClass:
      "font-black uppercase tracking-[-0.055em]",
    accentTitleClass:
      "font-serif font-light italic tracking-[-0.035em]",
    copyClass:
      "border-l border-[var(--color-accent)]",
    topLabel: "Experience",
    sectionMeta: "Experience",
    sideRail: true,
    ctaDirection: "upRight",
    glow: true,
  },

  editorial: {
    variant: "editorial",
    imageTreatment: "film",
    overlay: "editorial",
    composition: "editorial",
    ctaShape: "circle",
    grain: false,
    parallax: true,
    intensity: 0.9,
    imageClass:
      "brightness-[0.78] contrast-[1.02] saturate-[0.88]",
    titleClass:
      "font-black uppercase tracking-[-0.05em]",
    accentTitleClass:
      "font-serif font-light italic tracking-[-0.03em]",
    copyClass:
      "border-l border-[var(--color-accent)]",
    topLabel: "Editorial",
    sectionMeta: "Editorial",
    sideRail: true,
    ctaDirection: "downRight",
    glow: true,
  },

  minimal: {
    variant: "minimal",
    imageTreatment: "natural",
    overlay: "paper",
    composition: "standard",
    ctaShape: "outline",
    grain: false,
    parallax: false,
    intensity: 0.72,
    imageClass:
      "brightness-[0.86] contrast-[0.98] saturate-[0.96]",
    titleClass:
      "font-semibold uppercase tracking-[-0.045em]",
    accentTitleClass:
      "font-serif font-light italic tracking-[-0.025em]",
    copyClass:
      "border-l border-[var(--color-accent)]",
    topLabel: "Profile",
    sectionMeta: "Minimal",
    sideRail: false,
    ctaDirection: "upRight",
    glow: false,
  },

  ritual: {
    variant: "ritual",
    imageTreatment: "soft",
    overlay: "paper",
    composition: "centered",
    ctaShape: "pill",
    grain: true,
    parallax: true,
    intensity: 0.82,
    imageClass:
      "brightness-[0.84] contrast-[0.95] saturate-[0.92]",
    titleClass:
      "font-semibold uppercase tracking-[-0.045em]",
    accentTitleClass:
      "font-serif font-light italic tracking-[-0.025em]",
    copyClass:
      "border-t border-[var(--color-accent)]",
    topLabel: "Ritual",
    sectionMeta: "Daily Ritual",
    sideRail: false,
    ctaDirection: "downRight",
    glow: true,
  },

  industrial: {
    variant: "industrial",
    imageTreatment: "highContrast",
    overlay: "edge",
    composition: "split",
    ctaShape: "square",
    grain: true,
    parallax: false,
    intensity: 1.14,
    imageClass:
      "brightness-[0.46] contrast-[1.22] saturate-[0.74]",
    titleClass:
      "font-black uppercase tracking-[-0.06em]",
    accentTitleClass:
      "font-mono font-bold uppercase tracking-[-0.025em]",
    copyClass:
      "border-l border-[var(--color-accent)]",
    topLabel: "Industrial",
    sectionMeta: "Taproom",
    sideRail: true,
    ctaDirection: "upRight",
    glow: false,
  },

  playful: {
    variant: "playful",
    imageTreatment: "natural",
    overlay: "paper",
    composition: "centered",
    ctaShape: "pill",
    grain: false,
    parallax: true,
    intensity: 0.76,
    imageClass:
      "brightness-[0.94] contrast-[0.96] saturate-[1.06]",
    titleClass:
      "font-black uppercase tracking-[-0.045em]",
    accentTitleClass:
      "font-serif font-light italic tracking-[-0.02em]",
    copyClass:
      "border-t border-[var(--color-accent)]",
    topLabel: "Playful",
    sectionMeta: "Fresh",
    sideRail: false,
    ctaDirection: "downRight",
    glow: true,
  },

  hospitality: {
    variant: "hospitality",
    imageTreatment: "natural",
    overlay: "editorial",
    composition: "split",
    ctaShape: "outline",
    grain: false,
    parallax: true,
    intensity: 0.88,
    imageClass:
      "brightness-[0.74] contrast-[1.0] saturate-[0.94]",
    titleClass:
      "font-black uppercase tracking-[-0.048em]",
    accentTitleClass:
      "font-serif font-light italic tracking-[-0.028em]",
    copyClass:
      "border-l border-[var(--color-accent)]",
    topLabel: "Hospitality",
    sectionMeta: "Hospitality",
    sideRail: true,
    ctaDirection: "downRight",
    glow: true,
  },
};

/* =========================================================
   IMAGE TREATMENT OVERRIDES
========================================================= */

const IMAGE_TREATMENT_CLASSES: Record<
  GastroHeroImageTreatment,
  string
> = {
  cinematic:
    "brightness-[0.5] contrast-[1.14] saturate-[0.62]",

  film:
    "brightness-[0.64] contrast-[1.08] saturate-[0.78]",

  natural:
    "brightness-[0.93] contrast-[0.98] saturate-[1.02]",

  soft:
    "brightness-[0.88] contrast-[0.94] saturate-[0.94]",

  highContrast:
    "brightness-[0.46] contrast-[1.22] saturate-[0.74]",

  grain:
    "brightness-[0.58] contrast-[1.12] saturate-[0.76]",
};

/* =========================================================
   OVERLAY CLASSES
========================================================= */

const OVERLAY_CLASSES: Record<
  GastroHeroOverlay,
  string
> = {
  cinematic:
    "bg-gradient-to-r from-[var(--color-bg)]/90 via-[var(--color-bg)]/35 to-transparent",

  editorial:
    "bg-gradient-to-r from-[var(--color-bg)]/62 via-transparent to-transparent",

  paper:
    "bg-gradient-to-b from-[var(--color-bg)]/12 via-transparent to-[var(--color-bg)]/88",

  none:
    "",

  edge:
    "bg-[radial-gradient(circle_at_72%_34%,transparent_0%,transparent_20%,var(--color-bg)_88%)]",
};

/* =========================================================
   HELPERS
========================================================= */

function getHeroVariant(
  style:
    | GastroHeroStyleConfig
    | undefined,
  legacy:
    | GastroHeroVariant
    | undefined,
): GastroHeroVariant {
  return (
    style?.variant ??
    legacy ??
    "cinematic"
  );
}

function mergeHeroStyle(
  config:
    | GastroHeroStyleConfig
    | undefined,
  legacy:
    | GastroHeroVariant
    | undefined,
): HeroRuntimeConfig {
  const variant =
    getHeroVariant(
      config,
      legacy,
    );

  const defaults =
    HERO_VARIANT_DEFAULTS[
      variant
    ];

  return {
    ...defaults,
    ...config,

    variant,

    imageTreatment:
      config?.imageTreatment ??
      defaults.imageTreatment,

    overlay:
      config?.overlay ??
      defaults.overlay,

    composition:
      config?.composition ??
      defaults.composition,

    ctaShape:
      config?.ctaShape ??
      defaults.ctaShape,

    grain:
      config?.grain ??
      defaults.grain,

    parallax:
      config?.parallax ??
      defaults.parallax,

    intensity:
      config?.intensity ??
      defaults.intensity,

    imageClass:
      IMAGE_TREATMENT_CLASSES[
        config?.imageTreatment ??
          defaults.imageTreatment
      ],

    ctaDirection:
      defaults.ctaDirection,
  };
}

/* =========================================================
   COMPONENT
========================================================= */

export default function Hero() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const {
    config,
    preset,
  } = useGastro();

  const {
    content,
    brand,
  } = config;

  const hero =
    content.hero;

  const { scrollTo } =
    useLenis();

  const heroStyle =
    useMemo(
      () =>
        mergeHeroStyle(
          preset.visual?.heroStyle,
          preset.visual?.hero,
        ),
      [
        preset.visual?.hero,
        preset.visual?.heroStyle,
      ],
    );

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: [
      "start start",
      "end start",
    ],
  });

  const imageY =
    useTransform(
      scrollYProgress,
      [0, 1],
      ["0%", `${10 * heroStyle.intensity}%`],
    );

  const imageScale =
    useTransform(
      scrollYProgress,
      [0, 1],
      [
        heroStyle.parallax
          ? 1.08
          : 1.03,
        1.01,
      ],
    );

  const contentY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [
        "0%",
        `${
          12 *
          heroStyle.intensity
        }%`,
      ],
    );

  const imageOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.85],
      [1, 0.45],
    );

  /* =======================================================
     CTA
  ======================================================== */

  const handleCtaClick = (
    event:
      MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    event.preventDefault();

    const cleanId =
      targetId.replace(
        /^#/,
        "",
      );

    if (
      !cleanId ||
      cleanId === "inicio"
    ) {
      scrollTo(0, {
        duration: 1.2,
      });

      return;
    }

    scrollTo(
      `#${cleanId}`,
      {
        offset: -16,
        duration: 1.2,
      },
    );
  };

  /* =======================================================
     CTA SHAPE
  ======================================================== */

  const ctaShapeClass =
    (() => {
      switch (
        heroStyle.ctaShape
      ) {
        case "pill":
          return `
            rounded-full
            px-6
          `;

        case "square":
          return `
            rounded-none
          `;

        case "outline":
          return `
            rounded-none
            bg-transparent
            text-[var(--color-text)]
            hover:bg-[var(--color-accent)]
            hover:text-[var(--color-accent-contrast)]
          `;

        case "circle":
        default:
          return `
            rounded-full
            h-12
            w-12
            sm:h-14
            sm:w-14
          `;
      }
    })();

  /* =======================================================
     COMPOSITION
  ======================================================== */

  const compositionClass =
    (() => {
      switch (
        heroStyle.composition
      ) {
        case "editorial":
          return `
            lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.55fr)]
          `;

        case "centered":
          return `
            mx-auto
            max-w-[1100px]
            text-center
            lg:text-center
          `;

        case "split":
          return `
            lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)]
          `;

        case "standard":
        default:
          return `
            lg:grid-cols-[minmax(0,1fr)_minmax(260px,auto)]
          `;
      }
    })();

  const centered =
    heroStyle.composition ===
    "centered";

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="
        relative
        min-h-[100svh]
        w-full
        overflow-hidden
        overflow-x-clip
        bg-[var(--color-bg)]
        text-[var(--color-text)]
        transition-colors
        duration-500
      "
    >
      {/* ===================================================
          BACKGROUND
      ==================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >
        <motion.div
          style={{
            y: heroStyle.parallax
              ? imageY
              : 0,
            scale: imageScale,
            opacity:
              imageOpacity,
          }}
          className="
            absolute
            inset-[-7%]
          "
        >
          <Image
            src={hero.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={[
              "object-cover",
              "transition-[filter,transform]",
              "duration-700",
              heroStyle.imageClass ||
                IMAGE_TREATMENT_CLASSES[
                  heroStyle
                    .imageTreatment
                ],
            ].join(" ")}
          />
        </motion.div>

        {/* MAIN OVERLAY */}

        <div
          className={`
            absolute
            inset-0
            ${OVERLAY_CLASSES[
              heroStyle.overlay
            ]}
          `}
        />

        {/* CINEMATIC LOWER FADE */}

        {heroStyle.overlay !==
          "none" && (
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[var(--color-bg)]
              via-[var(--color-bg)]/38
              to-transparent
            "
          />
        )}

        {/* SIDE EDGE */}

        {(
          heroStyle.variant ===
            "editorial" ||
          heroStyle.variant ===
            "hospitality" ||
          heroStyle.variant ===
            "industrial"
        ) && (
          <div
            className="
              absolute
              inset-y-0
              left-[8%]
              w-px
              bg-[var(--color-text)]/12
            "
          />
        )}

        {/* ACCENT GLOW */}

        {heroStyle.glow && (
          <div
            className={`
              absolute
              h-[260px]
              w-[260px]
              rounded-full
              bg-[var(--color-accent)]
              blur-[110px]
              ${
                centered
                  ? "left-1/2 top-[24%] -translate-x-1/2"
                  : "left-1/2 top-[26%] -translate-x-1/2"
              }
              opacity-[0.055]
              sm:h-[420px]
              sm:w-[420px]
              sm:blur-[140px]
            `}
          />
        )}

        {/* VARIANT DETAILS */}

        {heroStyle.variant ===
          "industrial" && (
          <div
            className="
              absolute
              inset-0
              opacity-30
              [background-image:linear-gradient(var(--color-text)_1px,transparent_1px),linear-gradient(90deg,var(--color-text)_1px,transparent_1px)]
              [background-size:80px_80px]
              [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_70%,transparent)]
            "
          />
        )}

        {heroStyle.variant ===
          "ritual" && (
          <div
            className="
              absolute
              right-[12%]
              top-[22%]
              hidden
              h-40
              w-40
              rounded-full
              border
              border-[var(--color-accent)]/20
              md:block
            "
          />
        )}

        {heroStyle.variant ===
          "playful" && (
          <>
            <div
              className="
                absolute
                right-[8%]
                top-[26%]
                h-20
                w-20
                rounded-full
                border
                border-[var(--color-accent)]/35
                md:h-28
                md:w-28
              "
            />

            <div
              className="
                absolute
                right-[11%]
                top-[30%]
                h-8
                w-8
                rounded-full
                bg-[var(--color-accent)]/25
                blur-md
              "
            />
          </>
        )}

        {heroStyle.grain && (
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.1]
              mix-blend-overlay
              [background-image:url('/noise.png')]
              [background-size:180px_180px]
            "
          />
        )}
      </motion.div>

      {/* ===================================================
          TOP RAIL
      ==================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-20
          px-4
          pt-4
          sm:px-8
          sm:pt-7
          md:px-12
          lg:px-16
          ${
            centered
              ? "text-center"
              : ""
          }
        `}
      >
        <div
          className={`
            mx-auto
            flex
            max-w-[1600px]
            items-start
            justify-between
            gap-4
            border-b
            border-[var(--color-text)]/12
            pb-3
            sm:pb-4
            ${
              centered
                ? "justify-center"
                : ""
            }
          `}
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-3
            "
          >
            <span
              className="
                shrink-0
                font-mono
                text-[8px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[var(--color-accent)]
                min-[380px]:text-[9px]
                sm:text-[10px]
                sm:tracking-[0.24em]
              "
            >
              {hero.eyebrow}
            </span>

            <span
              className="
                hidden
                h-px
                w-8
                shrink-0
                bg-[var(--color-accent)]
                sm:block
              "
            />

            <span
              className="
                hidden
                truncate
                font-mono
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-[var(--color-text-subtle)]
                md:block
              "
            >
              {brand.descriptor}
            </span>
          </div>

          {!centered && (
            <div
              className="
                hidden
                shrink-0
                items-center
                gap-3
                min-[420px]:flex
                sm:gap-5
              "
            >
              <span
                className="
                  font-mono
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-[var(--color-text-subtle)]
                "
              >
                01
              </span>

              <span
                className="
                  h-px
                  w-6
                  bg-[var(--color-text)]/15
                  sm:w-10
                "
              />

              <span
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.18em]
                  text-[var(--color-text-subtle)]
                "
              >
                {
                  heroStyle.sectionMeta
                }
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ===================================================
          SIDE RAIL
      ==================================================== */}

      {heroStyle.sideRail && (
        <div
          className="
            pointer-events-none
            absolute
            bottom-12
            left-4
            z-20
            hidden
            flex-col
            items-center
            gap-4
            md:flex
            lg:left-6
          "
        >
          <span
            className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.28em]
              text-[var(--color-text-subtle)]
              [writing-mode:vertical-rl]
            "
          >
            Scroll to explore
          </span>

          <span
            className="
              h-16
              w-px
              bg-gradient-to-b
              from-[var(--color-accent)]
              to-transparent
            "
          />
        </div>
      )}

      {/* ===================================================
          MAIN CONTENT
      ==================================================== */}

      <motion.div
        style={{
          y: contentY,
        }}
        className="
          relative
          z-10
          flex
          min-h-[100svh]
          w-full
          items-end
        "
      >
        <div
          className={`
            mx-auto
            w-full
            max-w-[1600px]
            px-4
            pb-7
            pt-28
            sm:px-8
            sm:pb-10
            sm:pt-32
            md:px-12
            md:pb-14
            lg:px-16
            lg:pb-16
            ${
              centered
                ? "flex justify-center"
                : ""
            }
          `}
        >
          <div
            className={`
              grid
              min-w-0
              gap-8
              lg:items-end
              ${compositionClass}
              ${
                centered
                  ? "w-full max-w-[1050px]"
                  : ""
              }
            `}
          >
            {/* =================================================
                LEFT / MAIN COPY
            ================================================== */}

            <div
              className={`
                min-w-0
                ${
                  centered
                    ? "mx-auto max-w-4xl"
                    : ""
                }
              `}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                }}
                className={`
                  mb-4
                  flex
                  items-center
                  gap-3
                  sm:mb-5
                  ${
                    centered
                      ? "justify-center"
                      : ""
                  }
                `}
              >
                {!centered && (
                  <span
                    className="
                      h-px
                      w-8
                      shrink-0
                      bg-[var(--color-accent)]
                      sm:w-10
                    "
                  />
                )}

                <span
                  className="
                    truncate
                    font-mono
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[var(--color-accent)]
                    sm:text-[9px]
                    sm:tracking-[0.26em]
                  "
                >
                  {hero.eyebrow}
                </span>
              </motion.div>

              <h1
                className={`
                  select-none
                  break-normal
                  hyphens-none
                  text-[clamp(2.25rem,9.5vw,8.5rem)]
                  leading-[0.84]
                  ${heroStyle.titleClass}
                  ${
                    centered
                      ? "mx-auto max-w-[1000px]"
                      : "max-w-[1000px]"
                  }
                `}
              >
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{
                      y: "110%",
                    }}
                    animate={{
                      y: 0,
                    }}
                    transition={{
                      duration: 0.95,
                      delay: 0.25,
                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],
                    }}
                    className="
                      block
                      break-normal
                      text-[var(--color-text)]
                    "
                  >
                    {hero.titlePrefix}
                  </motion.span>
                </span>

                <span className="block overflow-hidden">
                  <motion.span
                    initial={{
                      y: "110%",
                    }}
                    animate={{
                      y: 0,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.34,
                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],
                    }}
                    className={`
                      block
                      break-normal
                      text-[clamp(2.25rem,9.2vw,8.2rem)]
                      leading-[0.9]
                      text-[var(--color-accent)]
                      sm:text-[clamp(3.3rem,8vw,8.2rem)]
                      ${heroStyle.accentTitleClass}
                      ${
                        heroStyle.variant ===
                        "industrial"
                          ? "text-[clamp(2rem,8.5vw,7.8rem)]"
                          : ""
                      }
                    `}
                  >
                    {hero.titleAccent}
                  </motion.span>
                </span>
              </h1>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.52,
                }}
                className={`
                  mt-6
                  max-w-xl
                  pl-3.5
                  sm:mt-10
                  sm:pl-5
                  ${heroStyle.copyClass}
                  ${
                    centered
                      ? "mx-auto text-left"
                      : ""
                  }
                  ${
                    heroStyle.composition ===
                    "centered"
                      ? "border-l-0 border-t px-0 pt-4"
                      : ""
                  }
                `}
              >
                <p
                  className="
                    break-normal
                    text-[13px]
                    font-light
                    leading-relaxed
                    text-[var(--color-text-muted)]
                    sm:text-base
                    md:text-lg
                  "
                >
                  {
                    hero.subtitle
                  }
                </p>
              </motion.div>
            </div>

            {/* =================================================
                RIGHT / ACTION
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.62,
              }}
              className={`
                flex
                min-w-0
                flex-col
                gap-5
                pb-1
                ${
                  centered
                    ? "items-center text-center"
                    : "items-start lg:items-end"
                }
                ${
                  heroStyle.variant ===
                  "industrial"
                    ? "lg:border-l lg:border-[var(--color-text)]/14 lg:pl-8"
                    : ""
                }
              `}
            >
              <span
                className="
                  max-w-xs
                  font-mono
                  text-[8px]
                  uppercase
                  leading-relaxed
                  tracking-[0.16em]
                  text-[var(--color-text-subtle)]
                  sm:text-[9px]
                  sm:tracking-[0.2em]
                "
              >
                {
                  brand.descriptor
                }
              </span>

              <p
                className={`
                  max-w-full
                  text-[13px]
                  font-light
                  leading-relaxed
                  text-[var(--color-text-muted)]
                  sm:text-base
                  ${
                    centered
                      ? "max-w-md"
                      : "max-w-sm lg:text-right"
                  }
                `}
              >
                {
                  hero.subtitle
                }
              </p>

              <a
                href={`#${hero.ctaHref}`}
                onClick={(
                  event,
                ) =>
                  handleCtaClick(
                    event,
                    hero.ctaHref,
                  )
                }
                className={`
                  group
                  flex
                  max-w-full
                  cursor-pointer
                  items-center
                  gap-3
                  sm:gap-4
                  ${
                    heroStyle.ctaShape ===
                    "pill"
                      ? "rounded-full border border-[var(--color-accent)] px-4 py-2"
                      : ""
                  }
                `}
              >
                <span
                  className="
                    max-w-[170px]
                    font-mono
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[var(--color-text)]
                    transition-colors
                    duration-300
                    group-hover:text-[var(--color-accent)]
                    sm:text-[9px]
                    sm:tracking-[0.2em]
                  "
                >
                  {hero.cta}
                </span>

                <span
                  className={`
                    flex
                    shrink-0
                    items-center
                    justify-center
                    border
                    border-[var(--color-accent)]
                    bg-[var(--color-accent)]
                    text-[var(--color-accent-contrast)]
                    shadow-lg
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:scale-105
                    active:scale-95
                    ${ctaShapeClass}
                    ${
                      heroStyle.ctaShape ===
                      "outline"
                        ? "shadow-none"
                        : ""
                    }
                  `}
                >
                  {heroStyle.ctaDirection ===
                  "downRight" ? (
                    <ArrowDownRight
                      size={16}
                      strokeWidth={1.8}
                    />
                  ) : (
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.8}
                    />
                  )}
                </span>
              </a>
            </motion.div>
          </div>

          {/* =================================================
              META FOOTER
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.7,
            }}
            className={`
              mt-7
              grid
              min-w-0
              border-t
              border-[var(--color-text)]/12
              pt-3
              sm:mt-8
              sm:grid-cols-3
              sm:pt-4
              ${
                centered
                  ? "mx-auto w-full max-w-[1050px]"
                  : ""
              }
            `}
          >
            <span
              className="
                truncate
                py-2
                font-mono
                text-[8px]
                uppercase
                tracking-[0.18em]
                text-[var(--color-text-subtle)]
                sm:border-r
                sm:border-[var(--color-text)]/12
                sm:pr-5
              "
            >
              {
                brand.descriptor
              }
            </span>

            <span
              className="
                hidden
                truncate
                py-2
                pl-5
                font-mono
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-[var(--color-text-subtle)]
                sm:block
                sm:border-r
                sm:border-[var(--color-text)]/12
              "
            >
              {heroStyle.variant ===
              "industrial"
                ? "Taproom · Canillas · Comunidad"
                : heroStyle.variant ===
                    "ritual"
                  ? "Ritual · Producto · Tiempo"
                  : heroStyle.variant ===
                      "playful"
                    ? "Color · Producto · Experiencia"
                    : heroStyle.variant ===
                        "hospitality"
                      ? "Hospitality · Events · Experience"
                      : "Cocina · Espacio · Experiencia"}
            </span>

            <span
              className="
                hidden
                truncate
                py-2
                pl-5
                font-mono
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-[var(--color-text-subtle)]
                sm:block
                sm:text-right
              "
            >
              01 — Inicio
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}