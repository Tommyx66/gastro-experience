"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import Image from "next/image";

import {
  ArrowLeft,
  ArrowUpRight,
  Beer,
  Coffee,
  Flame,
  IceCreamBowl,
  MapPin,
  Sparkles,
  Utensils,
  Wheat,
} from "lucide-react";

import { useGastro } from "@/context/gastro-context";

import type {
  GastroStoryCardShape,
  GastroStoryDensity,
  GastroStoryImageTreatment,
  GastroStoryLayout,
  GastroStoryStyleConfig,
  GastroStoryVariant,
} from "@/config/presets/types";

import type {
  StoryArchiveItem,
} from "@/config/site";

const DRAG_THRESHOLD = 8;

/* =========================================================
   TYPES
========================================================= */

type StoryLabels = {
  traceability: string;
  closeSheet: string;
  processLine: string;
  openArchive: string;
};

type StoryRuntimeConfig = {
  variant:
    GastroStoryVariant;

  layout:
    GastroStoryLayout;

  imageTreatment:
    GastroStoryImageTreatment;

  cardShape:
    GastroStoryCardShape;

  density:
    GastroStoryDensity;

  watermark:
    boolean;

  grain:
    boolean;

  numbering:
    boolean;

  motion: {
    speed: number;

    direction:
      | "left"
      | "right";

    hoverLift: number;

    parallax: boolean;

    pauseOnHover: boolean;
  };
};

/* =========================================================
   STYLE PRESETS
========================================================= */

const STORY_VARIANT_DEFAULTS: Record<
  GastroStoryVariant,
  StoryRuntimeConfig
> = {
  fire: {
    variant: "fire",
    layout: "marquee",
    imageTreatment: "film",
    cardShape: "poster",
    density: "balanced",
    watermark: true,
    grain: true,
    numbering: true,
    motion: {
      speed: 0.8,
      direction: "left",
      hoverLift: 6,
      parallax: true,
      pauseOnHover: true,
    },
  },

  ritual: {
    variant: "ritual",
    layout: "editorial",
    imageTreatment: "natural",
    cardShape: "soft",
    density: "airy",
    watermark: false,
    grain: true,
    numbering: false,
    motion: {
      speed: 0.34,
      direction: "left",
      hoverLift: 4,
      parallax: true,
      pauseOnHover: true,
    },
  },

  taproom: {
    variant: "taproom",
    layout: "marquee",
    imageTreatment: "highContrast",
    cardShape: "poster",
    density: "dense",
    watermark: true,
    grain: true,
    numbering: true,
    motion: {
      speed: 1.15,
      direction: "right",
      hoverLift: 8,
      parallax: false,
      pauseOnHover: true,
    },
  },

  atelier: {
    variant: "atelier",
    layout: "lookbook",
    imageTreatment: "soft",
    cardShape: "framed",
    density: "airy",
    watermark: true,
    grain: true,
    numbering: false,
    motion: {
      speed: 0.32,
      direction: "left",
      hoverLift: 3,
      parallax: true,
      pauseOnHover: true,
    },
  },

  gelateria: {
    variant: "gelateria",
    layout: "stacked",
    imageTreatment: "natural",
    cardShape: "soft",
    density: "airy",
    watermark: false,
    grain: false,
    numbering: false,
    motion: {
      speed: 0.42,
      direction: "left",
      hoverLift: 10,
      parallax: true,
      pauseOnHover: true,
    },
  },

  cantina: {
    variant: "cantina",
    layout: "lookbook",
    imageTreatment: "sepia",
    cardShape: "ticket",
    density: "balanced",
    watermark: true,
    grain: true,
    numbering: true,
    motion: {
      speed: 0.42,
      direction: "left",
      hoverLift: 2,
      parallax: false,
      pauseOnHover: true,
    },
  },

  hospitality: {
    variant: "hospitality",
    layout: "editorial",
    imageTreatment: "natural",
    cardShape: "poster",
    density: "airy",
    watermark: false,
    grain: false,
    numbering: true,
    motion: {
      speed: 0.5,
      direction: "left",
      hoverLift: 5,
      parallax: true,
      pauseOnHover: true,
    },
  },
};

/* =========================================================
   ICONS
========================================================= */

const STORY_ICONS = {
  fire: Flame,
  ritual: Coffee,
  taproom: Beer,
  atelier: Wheat,
  gelateria: IceCreamBowl,
  cantina: Utensils,
  hospitality: Sparkles,
} as const;

/* =========================================================
   IMAGE TREATMENT
========================================================= */

const IMAGE_TREATMENTS: Record<
  GastroStoryImageTreatment,
  string
> = {
  film: `
    brightness-[0.63]
    contrast-[1.06]
    saturate-[0.86]
    grayscale-[0.08]
  `,

  natural: `
    brightness-[0.94]
    contrast-[0.98]
    saturate-[1.02]
  `,

  grain: `
    brightness-[0.68]
    contrast-[1.08]
    saturate-[0.82]
    grayscale-[0.08]
  `,

  sepia: `
    brightness-[0.68]
    contrast-[1.08]
    saturate-[0.72]
    sepia-[0.28]
  `,

  soft: `
    brightness-[0.88]
    contrast-[0.95]
    saturate-[0.9]
  `,

  highContrast: `
    brightness-[0.54]
    contrast-[1.22]
    saturate-[0.76]
  `,
};

/* =========================================================
   CARD SHAPES
========================================================= */

const CARD_SHAPES: Record<
  GastroStoryCardShape,
  string
> = {
  rect: `
    rounded-none
  `,

  soft: `
    rounded-[1.35rem]
    border-[var(--color-border)]
  `,

  framed: `
    rounded-none
    border-2
    border-[var(--color-text)]/20
    p-1
    bg-[var(--color-surface)]
  `,

  poster: `
    rounded-none
  `,

  ticket: `
    rounded-sm
    border-dashed
    border-[var(--color-text)]/22
  `,
};

/* =========================================================
   HELPERS
========================================================= */

function mergeStoryStyle(
  config:
    | GastroStoryStyleConfig
    | undefined,
): StoryRuntimeConfig {
  const variant =
    config?.variant ??
    "fire";

  const defaults =
    STORY_VARIANT_DEFAULTS[
      variant
    ];

  return {
    ...defaults,
    ...config,

    motion: {
      ...defaults.motion,
      ...config?.motion,
    },
  };
}

function getDensityClasses(
  density:
    GastroStoryDensity,
) {
  switch (density) {
    case "airy":
      return {
        section:
          "py-16 sm:py-20 md:py-28",
        gap:
          "gap-5 sm:gap-6 lg:gap-7",
        card:
          "h-[400px] w-[260px] sm:h-[470px] sm:w-[320px] md:h-[540px] md:w-[355px]",
      };

    case "dense":
      return {
        section:
          "py-12 sm:py-16 md:py-20",
        gap:
          "gap-3 sm:gap-4 lg:gap-5",
        card:
          "h-[410px] w-[270px] sm:h-[470px] sm:w-[315px] md:h-[520px] md:w-[345px]",
      };

    case "balanced":
    default:
      return {
        section:
          "py-14 sm:py-18 md:py-24",
        gap:
          "gap-4 sm:gap-5 lg:gap-6",
        card:
          "h-[440px] w-[280px] sm:h-[500px] sm:w-[330px] md:h-[560px] md:w-[370px]",
      };
  }
}

function getLayoutClasses(
  layout:
    GastroStoryLayout,
) {
  switch (layout) {
    case "editorial":
      return {
        columns:
          "lg:grid-cols-[240px_minmax(0,1fr)]",
        gap:
          "lg:gap-20",
        header:
          "mb-7 sm:mb-8",
        cardRadius:
          "rounded-[1.2rem]",
      };

    case "stacked":
      return {
        columns:
          "lg:grid-cols-[200px_minmax(0,1fr)]",
        gap:
          "lg:gap-10",
        header:
          "mb-4 sm:mb-5",
        cardRadius:
          "rounded-[1.5rem]",
      };

    case "lookbook":
      return {
        columns:
          "lg:grid-cols-[260px_minmax(0,1fr)]",
        gap:
          "lg:gap-16",
        header:
          "mb-6 sm:mb-7",
        cardRadius:
          "rounded-none",
      };

    case "marquee":
    default:
      return {
        columns:
          "lg:grid-cols-[280px_minmax(0,1fr)]",
        gap:
          "lg:gap-14",
        header:
          "mb-5",
        cardRadius:
          "rounded-none",
      };
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function ChefStoryMarquee() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const carouselRef =
    useRef<HTMLDivElement>(null);

  const animationFrameRef =
    useRef<number | null>(null);

  const interactionTimeoutRef =
    useRef<number | null>(null);

  const interactingRef =
    useRef(false);

  const pointerIdRef =
    useRef<number | null>(null);

  const autoScrollPositionRef =
    useRef(0);

  const dragRef = useRef({
    pointerDown: false,
    dragging: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const [
    zoomedItem,
    setZoomedItem,
  ] = useState<StoryArchiveItem | null>(
    null,
  );

  const {
    config,
    preset,
  } = useGastro();

  const story =
    config.content.story;

  const bitacora =
    story.archive ?? [];

  const storyStyle =
    useMemo(
      () =>
        mergeStoryStyle(
          preset.visual?.story,
        ),
      [preset.visual?.story],
    );

  const densityClasses =
    useMemo(
      () =>
        getDensityClasses(
          storyStyle.density,
        ),
      [storyStyle.density],
    );

  const layoutClasses =
    useMemo(
      () =>
        getLayoutClasses(
          storyStyle.layout,
        ),
      [storyStyle.layout],
    );

  const StoryIcon =
    STORY_ICONS[
  storyStyle.variant as keyof typeof STORY_ICONS
]

  const imageTreatment =
    IMAGE_TREATMENTS[
      storyStyle.imageTreatment
    ];

  const storyLabels =
    useMemo<StoryLabels>(
      () => ({
        traceability:
          story.labels.traceability ??
          "Trazabilidad",

        closeSheet:
          story.labels.closeSheet ??
          "Cerrar Ficha",

        processLine:
          (
            story.labels as Partial<
              StoryLabels
            >
          ).processLine ??
          "Proceso",

        openArchive:
          (
            story.labels as Partial<
              StoryLabels
            >
          ).openArchive ??
          "Explorar archivo",
      }),
      [story.labels],
    );

  const extendedArchive =
    useMemo(
      () => [
        ...bitacora,
        ...bitacora,
      ],
      [bitacora],
    );

  const {
    scrollYProgress,
  } = useScroll({
    target: containerRef,
    offset: [
      "start end",
      "end start",
    ],
  });

  const imageY =
    useTransform(
      scrollYProgress,
      [0, 1],
      ["-8%", "8%"],
    );

  const watermarkY =
    useTransform(
      scrollYProgress,
      [0, 1],
      ["6%", "-5%"],
    );

  /* =======================================================
     AUTO SCROLL / DRAG
  ======================================================== */

  useEffect(() => {
    const carousel =
      carouselRef.current;

    if (
      !carousel ||
      bitacora.length === 0 ||
      storyStyle.motion.speed <= 0
    ) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reducedMotion) {
      return;
    }

    autoScrollPositionRef.current =
      carousel.scrollLeft;

    const pauseTemporarily = (
      duration = 850,
    ) => {
      interactingRef.current =
        true;

      if (
        interactionTimeoutRef.current !==
        null
      ) {
        window.clearTimeout(
          interactionTimeoutRef.current,
        );
      }

      interactionTimeoutRef.current =
        window.setTimeout(() => {
          interactingRef.current =
            false;

          autoScrollPositionRef.current =
            carousel.scrollLeft;
        }, duration);
    };

    const normalizePosition = (
      position: number,
      halfWidth: number,
    ) => {
      if (halfWidth <= 0) {
        return position;
      }

      const normalized =
        position % halfWidth;

      return normalized < 0
        ? normalized + halfWidth
        : normalized;
    };

    const tick = () => {
      if (
        !interactingRef.current &&
        !dragRef.current.dragging
      ) {
        const direction =
          storyStyle.motion.direction ===
          "right"
            ? 1
            : -1;

        autoScrollPositionRef.current +=
          storyStyle.motion.speed *
          direction;

        const halfWidth =
          carousel.scrollWidth / 2;

        autoScrollPositionRef.current =
          normalizePosition(
            autoScrollPositionRef.current,
            halfWidth,
          );

        carousel.scrollLeft =
          autoScrollPositionRef.current;
      } else {
        autoScrollPositionRef.current =
          carousel.scrollLeft;
      }

      animationFrameRef.current =
        requestAnimationFrame(tick);
    };

    const handleWheel = () => {
      pauseTemporarily(1000);
    };

    const handleMouseEnter = () => {
      if (
        storyStyle.motion.pauseOnHover
      ) {
        pauseTemporarily(1200);
      }
    };

    const handlePointerDown = (
      event: PointerEvent,
    ) => {
      pointerIdRef.current =
        event.pointerId;

      autoScrollPositionRef.current =
        carousel.scrollLeft;

      dragRef.current = {
        pointerDown: true,
        dragging: false,
        startX: event.clientX,
        startScrollLeft:
          carousel.scrollLeft,
      };
    };

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      if (
        !dragRef.current.pointerDown ||
        pointerIdRef.current !==
          event.pointerId
      ) {
        return;
      }

      const delta =
        event.clientX -
        dragRef.current.startX;

      if (
        !dragRef.current.dragging &&
        Math.abs(delta) >=
          DRAG_THRESHOLD
      ) {
        dragRef.current.dragging =
          true;

        interactingRef.current =
          true;

        carousel.setPointerCapture(
          event.pointerId,
        );

        carousel.classList.add(
          "cursor-grabbing",
        );
      }

      if (
        !dragRef.current.dragging
      ) {
        return;
      }

      const nextScroll =
        dragRef.current
          .startScrollLeft -
        delta;

      carousel.scrollLeft =
        nextScroll;

      autoScrollPositionRef.current =
        nextScroll;
    };

    const stopDrag = (
      event?: PointerEvent,
    ) => {
      if (
        event &&
        pointerIdRef.current !==
          event.pointerId
      ) {
        return;
      }

      const wasDragging =
        dragRef.current.dragging;

      dragRef.current = {
        pointerDown: false,
        dragging: false,
        startX: 0,
        startScrollLeft: 0,
      };

      pointerIdRef.current = null;

      carousel.classList.remove(
        "cursor-grabbing",
      );

      autoScrollPositionRef.current =
        carousel.scrollLeft;

      if (
        wasDragging &&
        event &&
        carousel.hasPointerCapture(
          event.pointerId,
        )
      ) {
        carousel.releasePointerCapture(
          event.pointerId,
        );
      }

      if (wasDragging) {
        pauseTemporarily(650);
      }
    };

    carousel.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: true,
      },
    );

    carousel.addEventListener(
      "mouseenter",
      handleMouseEnter,
    );

    carousel.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    carousel.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    carousel.addEventListener(
      "pointerup",
      stopDrag,
    );

    carousel.addEventListener(
      "pointercancel",
      stopDrag,
    );

    carousel.addEventListener(
      "pointerleave",
      stopDrag,
    );

    animationFrameRef.current =
      requestAnimationFrame(tick);

    return () => {
      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current,
        );
      }

      if (
        interactionTimeoutRef.current !==
        null
      ) {
        window.clearTimeout(
          interactionTimeoutRef.current,
        );
      }

      carousel.removeEventListener(
        "wheel",
        handleWheel,
      );

      carousel.removeEventListener(
        "mouseenter",
        handleMouseEnter,
      );

      carousel.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      carousel.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      carousel.removeEventListener(
        "pointerup",
        stopDrag,
      );

      carousel.removeEventListener(
        "pointercancel",
        stopDrag,
      );

      carousel.removeEventListener(
        "pointerleave",
        stopDrag,
      );
    };
  }, [
    bitacora.length,
    storyStyle.motion.direction,
    storyStyle.motion.pauseOnHover,
    storyStyle.motion.speed,
  ]);

  /* =======================================================
     BODY LOCK
  ======================================================== */

  useEffect(() => {
    if (!zoomedItem) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [zoomedItem]);

  /* =======================================================
     ESCAPE
  ======================================================== */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setZoomedItem(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  /* =======================================================
     EMPTY STATE
  ======================================================== */

  if (!bitacora.length) {
    return null;
  }

  return (
    <>
      <section
        id="historia"
        className={[
          "relative",
          "w-full",
          "overflow-hidden",
          "border-t",
          "border-[var(--color-border)]",
          "bg-[var(--color-surface)]",
          "text-[var(--color-text)]",
          "transition-colors",
          "duration-500",
          densityClasses.section,
        ].join(" ")}
      >
        {/* ===================================================
            OPENING SPACE
        ==================================================== */}

        <div
          className="
            h-16
            w-full
            bg-[var(--color-bg)]
            sm:h-24
            md:h-32
          "
        />

        {/* ===================================================
            OPENING IMAGE
        ==================================================== */}

        <div
          ref={containerRef}
          className="
            relative
            h-[54vh]
            min-h-[420px]
            w-full
            overflow-hidden
            sm:h-[62vh]
            md:h-[70vh]
          "
        >
          <motion.div
            style={{
              y: storyStyle.motion.parallax
                ? imageY
                : 0,
            }}
            className="
              absolute
              inset-[-8%]
            "
          >
            <Image
              src={
                story.backgroundImage
              }
              alt=""
              fill
              sizes="100vw"
              className={[
                "object-cover",
                "transition-transform",
                "duration-700",
                imageTreatment,
              ].join(" ")}
            />
          </motion.div>

          {/* =================================================
              OVERLAY
          ================================================== */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[var(--color-surface)]
              via-[var(--color-surface)]/45
              to-transparent
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[var(--color-surface)]/55
              via-transparent
              to-transparent
            "
          />

          {storyStyle.variant ===
            "taproom" && (
            <div
              className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_72%_30%,transparent_0%,transparent_16%,rgba(0,0,0,0.28)_100%)]
              "
            />
          )}

          {storyStyle.variant ===
            "atelier" && (
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-b
                from-transparent
                via-[var(--color-surface)]/12
                to-[var(--color-surface)]/84
              "
            />
          )}

          {storyStyle.variant ===
            "gelateria" && (
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-b
                from-white/12
                via-transparent
                to-[var(--color-surface)]/82
              "
            />
          )}

          {storyStyle.variant ===
            "cantina" && (
            <div
              className="
                absolute
                inset-0
                bg-[#2a1f15]/20
                mix-blend-multiply
              "
            />
          )}

          {/* =================================================
              RAIL
          ================================================== */}

          <div
            className="
              absolute
              left-[7%]
              top-0
              h-full
              w-px
              bg-[var(--color-text)]/10
            "
          />

          {/* =================================================
              GRAIN
          ================================================== */}

          {storyStyle.grain && (
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.12]
                mix-blend-overlay
                [background-image:url('/noise.png')]
                [background-size:180px_180px]
              "
            />
          )}

          {/* =================================================
              WATERMARK
          ================================================== */}

          {storyStyle.watermark && (
            <motion.div
              style={{
                y: storyStyle.motion
                  .parallax
                  ? watermarkY
                  : 0,
              }}
              className="
                absolute
                bottom-[4%]
                left-0
                whitespace-nowrap
                pl-4
                sm:pl-8
                md:pl-12
                lg:pl-16
              "
            >
              <span
                className="
                  select-none
                  text-[clamp(5rem,18vw,18rem)]
                  font-black
                  uppercase
                  leading-none
                  tracking-[-0.08em]
                  text-transparent
                "
                style={{
                  WebkitTextStroke:
                    "1px color-mix(in srgb, var(--color-accent) 30%, transparent)",
                }}
              >
                {
                  story.watermark
                }
              </span>
            </motion.div>
          )}

          {/* =================================================
              COPY
          ================================================== */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              z-10
              px-4
              pb-8
              sm:px-8
              sm:pb-10
              md:px-12
              md:pb-14
              lg:px-16
              lg:pb-16
            "
          >
            <div
              className="
                mx-auto
                flex
                max-w-[1600px]
                flex-col
                gap-7
              "
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.7,
                }}
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <StoryIcon
                  size={12}
                  strokeWidth={1.6}
                  className="
                    text-[var(--color-accent)]
                  "
                />

                <span
                  className="
                    font-mono
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-[var(--color-accent)]
                    sm:text-[10px]
                  "
                >
                  {story.eyebrow}
                </span>
              </motion.div>

              <div
                className="
                  grid
                  gap-8
                  lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.35fr)]
                  lg:items-end
                "
              >
                <motion.h2
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.95,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  className={`
                    max-w-[1050px]
                    text-[clamp(2.8rem,8vw,8.5rem)]
                    font-black
                    uppercase
                    leading-[0.83]
                    tracking-[-0.06em]
                    ${
                      storyStyle.variant ===
                      "gelateria"
                        ? "text-[var(--color-text)]"
                        : ""
                    }
                  `}
                >
                  {
                    story.titlePrefix
                  }

                  <span
                    className={`
                      block
                      font-serif
                      font-light
                      italic
                      tracking-[-0.035em]
                      text-[var(--color-accent)]
                      ${
                        storyStyle.variant ===
                        "taproom"
                          ? "font-sans not-italic tracking-[-0.055em]"
                          : ""
                      }
                      ${
                        storyStyle.variant ===
                        "atelier"
                          ? "tracking-[-0.05em]"
                          : ""
                      }
                    `}
                  >
                    {
                      story.titleAccent
                    }
                  </span>
                </motion.h2>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.12,
                  }}
                  className={`
                    max-w-sm
                    border-l
                    border-[var(--color-accent)]
                    pl-4
                    ${
                      storyStyle.variant ===
                      "gelateria"
                        ? "rounded-r-lg bg-white/12 py-3 pr-4 backdrop-blur-sm"
                        : ""
                    }
                  `}
                >
                  <p
                    className="
                      text-xs
                      font-light
                      leading-relaxed
                      text-[var(--color-text-muted)]
                      sm:text-sm
                    "
                  >
                    {
                      story.primaryDescription
                    }
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            ARCHIVE
        ==================================================== */}

        <div
          className="
            relative
            z-10
          "
        >
          <div
            className={[
              "mx-auto",
              "grid",
              "max-w-[1600px]",
              "px-4",
              "sm:px-8",
              "md:px-12",
              "lg:px-16",
              layoutClasses.columns,
              layoutClasses.gap,
            ].join(" ")}
          >
            {/* =================================================
                LEFT
            ================================================== */}

            <div
              className="
                flex
                flex-col
                justify-between
                gap-8
              "
            >
              <div>
                <div
                  className="
                    mb-5
                    flex
                    items-center
                    gap-3
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.28em]
                      text-[var(--color-accent)]
                    "
                  >
                    02
                  </span>

                  <span
                    className="
                      h-px
                      w-8
                      bg-[var(--color-accent)]
                    "
                  />

                  <span
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.22em]
                      text-[var(--color-text-subtle)]
                    "
                  >
                    {
                      story.sectionTag
                    }
                  </span>
                </div>

                <p
                  className="
                    max-w-xs
                    text-sm
                    font-light
                    leading-relaxed
                    text-[var(--color-text-muted)]
                    sm:text-base
                  "
                >
                  {
                    story.secondaryDescription
                  }
                </p>
              </div>

              <div className="hidden lg:block">
                <div
                  className="
                    border-t
                    border-[var(--color-border)]
                    pt-4
                  "
                >
                  <span
                    className="
                      block
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.25em]
                      text-[var(--color-text-subtle)]
                    "
                  >
                    {
                      storyLabels.processLine
                    }
                  </span>

                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <span
                      className="
                        h-px
                        w-10
                        bg-[var(--color-accent)]
                      "
                    />

                    <span
                      className="
                        font-mono
                        text-[8px]
                        uppercase
                        tracking-[0.2em]
                        text-[var(--color-accent)]
                      "
                    >
                      {storyStyle.variant ===
                      "taproom"
                        ? "Brewhouse"
                        : storyStyle.variant ===
                            "atelier"
                          ? "Obrador"
                          : storyStyle.variant ===
                              "gelateria"
                            ? "Laboratorio"
                            : storyStyle.variant ===
                                "cantina"
                              ? "Cantina"
                              : "Archive"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT
            ================================================== */}

            <div className="min-w-0">
              <div
                className={[
                  "flex",
                  "items-end",
                  "justify-between",
                  "border-b",
                  "border-[var(--color-border)]",
                  "pb-4",
                  layoutClasses.header,
                ].join(" ")}
              >
                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-[var(--color-text-subtle)]
                  "
                >
                  {
                    storyLabels.openArchive
                  }
                </span>

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-[var(--color-text-subtle)]
                  "
                >
                  {String(
                    bitacora.length,
                  ).padStart(
                    2,
                    "0",
                  )}{" "}
                  entries
                </span>
              </div>

              <div
                ref={carouselRef}
                className="
                  flex
                  w-full
                  max-w-full
                  cursor-grab
                  select-none
                  touch-pan-x
                  overflow-x-auto
                  overscroll-x-contain
                  pb-4
                  scrollbar-none
                  active:cursor-grabbing
                "
                style={{
                  scrollbarWidth:
                    "none",
                  msOverflowStyle:
                    "none",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 2%, black 97%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 2%, black 97%, transparent 100%)",
                }}
              >
                <div
                  className={[
                    "flex",
                    "w-max",
                    "shrink-0",
                    densityClasses.gap,
                    "pr-8",
                    "sm:pr-10",
                  ].join(" ")}
                >
                  {extendedArchive.map(
                    (
                      item,
                      index,
                    ) => {
                      const itemNumber =
                        (index %
                          bitacora.length) +
                        1;

                      const isLookbook =
                        storyStyle.layout ===
                        "lookbook";

                      const lookbookWidth =
                        isLookbook &&
                        index % 3 === 1
                          ? "md:w-[410px]"
                          : "";

                      const shouldRound =
                        storyStyle.cardShape ===
                        "soft";

                      return (
                        <motion.button
                          key={`${item.titulo}-${index}`}
                          type="button"
                          onClick={() =>
                            setZoomedItem(
                              item,
                            )
                          }
                          whileHover={{
                            y:
                              storyStyle.motion
                                .hoverLift,
                          }}
                          whileTap={{
                            scale: 0.99,
                          }}
                          className={[
                            "group",
                            "relative",
                            "shrink-0",
                            "cursor-pointer",
                            "overflow-hidden",
                            "border",
                            "border-[var(--color-text)]/12",
                            "bg-[var(--color-bg)]",
                            "text-left",
                            "transition-all",
                            "duration-500",
                            "hover:border-[var(--color-accent-border)]",
                            CARD_SHAPES[
                              storyStyle.cardShape
                            ],
                            densityClasses.card,
                            lookbookWidth,
                            shouldRound
                              ? layoutClasses.cardRadius
                              : "",
                          ].join(
                            " ",
                          )}
                          aria-label={`${storyLabels.openArchive}: ${item.titulo}`}
                        >
                          <Image
                            src={item.src}
                            alt=""
                            fill
                            sizes="
                              (max-width: 640px) 280px,
                              (max-width: 768px) 330px,
                              410px
                            "
                            className={[
                              "object-cover",
                              "transition-transform",
                              "duration-[900ms]",
                              "ease-[cubic-bezier(0.16,1,0.3,1)]",
                              imageTreatment,
                              "group-hover:scale-[1.055]",
                            ].join(
                              " ",
                            )}
                          />

                          <div
                            className={`
                              absolute
                              inset-0
                              bg-gradient-to-t
                              ${
                                storyStyle.variant ===
                                "gelateria"
                                  ? "from-[#231b16]/72 via-[#231b16]/20 to-transparent"
                                  : "from-black via-black/25 to-transparent"
                              }
                            `}
                          />

                          {storyStyle.grain && (
                            <div
                              className="
                                pointer-events-none
                                absolute
                                inset-0
                                opacity-[0.11]
                                mix-blend-overlay
                                [background-image:url('/noise.png')]
                                [background-size:180px_180px]
                              "
                            />
                          )}

                          {storyStyle.variant ===
                            "taproom" && (
                            <div
                              className="
                                absolute
                                inset-0
                                bg-[linear-gradient(135deg,transparent_38%,rgba(255,255,255,0.09)_100%)]
                              "
                            />
                          )}

                          {storyStyle.variant ===
                            "atelier" && (
                            <div
                              className="
                                absolute
                                inset-1
                                border
                                border-white/22
                                pointer-events-none
                              "
                            />
                          )}

                          <div
                            className="
                              absolute
                              left-4
                              right-4
                              top-4
                              z-10
                              flex
                              items-start
                              justify-between
                            "
                          >
                            <div className="flex items-center gap-3">
                              {storyStyle.numbering && (
                                <>
                                  <span
                                    className="
                                      font-mono
                                      text-[8px]
                                      font-bold
                                      uppercase
                                      tracking-[0.22em]
                                      text-[var(--color-accent)]
                                    "
                                  >
                                    {String(
                                      itemNumber,
                                    ).padStart(
                                      2,
                                      "0",
                                    )}
                                  </span>

                                  <span
                                    className="
                                      h-px
                                      w-7
                                      bg-[var(--color-accent)]
                                    "
                                  />
                                </>
                              )}

                              <span
                                className="
                                  max-w-[150px]
                                  font-mono
                                  text-[8px]
                                  uppercase
                                  tracking-[0.18em]
                                  text-white/72
                                "
                              >
                                {
                                  item.subtitulo
                                }
                              </span>
                            </div>

                            <span
                              className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                border
                                border-white/18
                                bg-black/15
                                text-white/80
                                backdrop-blur-md
                                transition-all
                                duration-300
                                group-hover:border-[var(--color-accent-border)]
                                group-hover:bg-[var(--color-accent)]
                                group-hover:text-[var(--color-accent-contrast)]
                              "
                            >
                              <ArrowUpRight
                                size={14}
                                strokeWidth={1.7}
                              />
                            </span>
                          </div>

                          <div
                            className="
                              absolute
                              bottom-5
                              left-4
                              right-4
                              z-10
                              border-t
                              border-white/15
                              pt-4
                            "
                          >
                            <span
                              className={`
                                mb-2
                                block
                                max-w-[92%]
                                text-[clamp(1.4rem,3vw,2.1rem)]
                                font-semibold
                                uppercase
                                leading-[0.92]
                                tracking-[-0.035em]
                                text-white
                                ${
                                  storyStyle.variant ===
                                  "atelier"
                                    ? "font-serif normal-case italic tracking-[-0.02em]"
                                    : ""
                                }
                                ${
                                  storyStyle.variant ===
                                  "gelateria"
                                    ? "normal-case tracking-[-0.025em]"
                                    : ""
                                }
                              `}
                            >
                              {
                                item.titulo
                              }
                            </span>

                            <span
                              className="
                                flex
                                items-center
                                gap-1.5
                                font-mono
                                text-[8px]
                                uppercase
                                tracking-[0.18em]
                                text-white/58
                              "
                            >
                              <MapPin
                                size={10}
                                strokeWidth={1.6}
                                className="
                                  text-[var(--color-accent)]
                                "
                              />

                              {
                                item.origen
                              }
                            </span>
                          </div>
                        </motion.button>
                      );
                    },
                  )}
                </div>
              </div>

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.22em]
                    text-[var(--color-text-subtle)]
                  "
                >
                  {storyStyle.variant ===
                  "taproom"
                    ? "Drag the taproom"
                    : storyStyle.variant ===
                        "atelier"
                      ? "Explore the atelier"
                      : storyStyle.variant ===
                          "gelateria"
                        ? "Explore flavors"
                        : "Drag to explore"}
                </span>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <ArrowLeft
                    size={11}
                    strokeWidth={1.5}
                    className="
                      text-[var(--color-accent)]
                    "
                  />

                  <span
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.2em]
                      text-[var(--color-text-subtle)]
                    "
                  >
                    {
                      storyLabels.openArchive
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          DETAIL SHEET
      ======================================================== */}

      <AnimatePresence>
        {zoomedItem && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setZoomedItem(null)
            }
            className="
              fixed
              inset-0
              z-[140]
              flex
              cursor-pointer
              items-stretch
              justify-center
              bg-black/88
              p-0
              backdrop-blur-xl
              sm:p-6
              md:p-10
            "
          >
            <motion.div
              initial={{
                y: 24,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 24,
                opacity: 0,
              }}
              transition={{
                duration: 0.55,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              data-lenis-prevent="true"
              className={`
                relative
                flex
                max-h-full
                w-full
                overflow-hidden
                border
                border-[var(--color-border-strong)]
                bg-[var(--color-surface)]
                shadow-[0_40px_120px_rgba(0,0,0,0.55)]
                sm:max-w-6xl
                md:flex-row
                ${
                  storyStyle.cardShape ===
                  "soft"
                    ? "rounded-[1.5rem]"
                    : ""
                }
              `}
              role="dialog"
              aria-modal="true"
              aria-label={
                zoomedItem.titulo
              }
              onClick={(
                event,
              ) =>
                event.stopPropagation()
              }
            >
              <div
                className="
                  relative
                  min-h-[42vh]
                  w-full
                  md:min-h-0
                  md:w-[58%]
                "
              >
                <Image
                  src={
                    zoomedItem.src
                  }
                  alt={
                    zoomedItem.titulo
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className={[
                    "object-cover",
                    "brightness-[0.82]",
                    "contrast-[1.04]",
                    IMAGE_TREATMENTS[
                      storyStyle.imageTreatment
                    ],
                  ].join(
                    " ",
                  )}
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/55
                    via-transparent
                    to-transparent
                  "
                />

                <div
                  className="
                    absolute
                    left-5
                    top-5
                    font-mono
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-white/72
                    sm:left-7
                    sm:top-7
                  "
                >
                  {
                    zoomedItem.subtitulo
                  }
                </div>
              </div>

              <div
                className="
                  flex
                  min-h-0
                  w-full
                  flex-col
                  justify-between
                  overflow-y-auto
                  p-6
                  sm:p-8
                  md:w-[42%]
                  md:border-l
                  md:border-[var(--color-border)]
                  md:p-10
                "
              >
                <div>
                  <div
                    className="
                      mb-6
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <StoryIcon
                      size={12}
                      strokeWidth={1.6}
                      className="
                        text-[var(--color-accent)]
                      "
                    />

                    <span
                      className="
                        font-mono
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.24em]
                        text-[var(--color-accent)]
                      "
                    >
                      {
                        zoomedItem.subtitulo
                      }
                    </span>
                  </div>

                  <div
                    className="
                      mb-3
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.22em]
                      text-[var(--color-text-subtle)]
                    "
                  >
                    {
                      storyLabels.traceability
                    }
                  </div>

                  <h3
                    className={`
                      max-w-md
                      text-[clamp(2rem,5vw,4rem)]
                      font-black
                      uppercase
                      leading-[0.86]
                      tracking-[-0.05em]
                      ${
                        storyStyle.variant ===
                        "atelier"
                          ? "font-serif normal-case italic tracking-[-0.03em]"
                          : ""
                      }
                      ${
                        storyStyle.variant ===
                        "gelateria"
                          ? "normal-case tracking-[-0.03em]"
                          : ""
                      }
                    `}
                  >
                    {
                      zoomedItem.titulo
                    }
                  </h3>

                  <div
                    className="
                      mt-7
                      border-t
                      border-[var(--color-border)]
                      pt-6
                    "
                  >
                    <p
                      className="
                        max-w-md
                        text-sm
                        font-light
                        leading-relaxed
                        text-[var(--color-text-muted)]
                        sm:text-base
                      "
                    >
                      {
                        zoomedItem.nota
                      }
                    </p>
                  </div>

                  <div
                    className="
                      mt-7
                      border-l
                      border-[var(--color-accent)]
                      pl-4
                    "
                  >
                    <span
                      className="
                        block
                        font-mono
                        text-[8px]
                        uppercase
                        tracking-[0.2em]
                        text-[var(--color-text-subtle)]
                      "
                    >
                      {
                        storyLabels.traceability
                      }
                    </span>

                    <span
                      className="
                        mt-1.5
                        block
                        font-mono
                        text-[11px]
                        font-medium
                        uppercase
                        tracking-[0.12em]
                        text-[var(--color-text)]
                      "
                    >
                      {
                        zoomedItem.origen
                      }
                    </span>
                  </div>
                </div>

                <div
                  className="
                    mt-8
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-t
                    border-[var(--color-border)]
                    pt-5
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.2em]
                      text-[var(--color-text-subtle)]
                    "
                  >
                    Esc
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setZoomedItem(
                        null,
                      )
                    }
                    className="
                      inline-flex
                      min-h-[44px]
                      items-center
                      gap-3
                      border
                      border-[var(--color-border-strong)]
                      px-5
                      py-2.5
                      font-mono
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[var(--color-text)]
                      transition-all
                      duration-300
                      hover:border-[var(--color-accent-border)]
                      hover:bg-[var(--color-accent-soft)]
                      hover:text-[var(--color-accent)]
                    "
                  >
                    {
                      storyLabels.closeSheet
                    }

                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}