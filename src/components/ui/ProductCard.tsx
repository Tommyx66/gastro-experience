"use client";

import Image from "next/image";
import {
  Check,
  ChevronRight,
  Clock3,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import {
  useState,
  type MouseEvent,
} from "react";

import { useGastro } from "@/context/gastro-context";
import type { MenuProduct } from "@/data/menu";
import { useCartStore } from "@/store/use-cart-store";
import { BackgroundImageTexture } from "@/components/ui/bg-image-texture";

interface ProductCardProps {
  product: MenuProduct;
  viewMode?: "grid" | "list";
  onOpenDetail?: (
    product: MenuProduct,
  ) => void;
}

export default function ProductCard({
  product,
  viewMode = "grid",
  onOpenDetail,
}: ProductCardProps) {
  const addItem =
    useCartStore(
      (state) => state.addItem,
    );

  const { config, preset } =
    useGastro();

  const menuUi =
    config.content.menuUi;

  const variant =
    preset.visual?.productCard ??
    "photo";

  const [justAdded, setJustAdded] =
    useState(false);

  const [imageError, setImageError] =
    useState(false);

  const hasOptions =
    Boolean(
      product.optionGroups?.length,
    );

  const hasImage =
    Boolean(
      product.image &&
        !imageError,
    );

  const price =
    product.price.toLocaleString(
      "es-AR",
    );

  const handleAdd = (
    event: MouseEvent,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (hasOptions) {
      onOpenDetail?.(product);
      return;
    }

    addItem(product, [], 1);

    setJustAdded(true);

    window.setTimeout(() => {
      setJustAdded(false);
    }, 1100);
  };

  const handleOpenDetail = () => {
    onOpenDetail?.(product);
  };

  const actionIcon = hasOptions ? (
    <SlidersHorizontal
      size={14}
      strokeWidth={1.8}
    />
  ) : justAdded ? (
    <Check
      size={14}
      strokeWidth={2.5}
    />
  ) : (
    <Plus
      size={15}
      strokeWidth={1.8}
    />
  );

  const actionLabel = hasOptions
    ? menuUi.choose
    : justAdded
      ? menuUi.added
      : menuUi.add;

  const detailHint =
    hasOptions
      ? "Personalizar"
      : "Agregar";

  /* =========================================================
     LIST
     ========================================================= */

  if (viewMode === "list") {
    return (
      <article
        className="
          group
          relative
          border-b
          border-[var(--color-border)]
          py-4
          sm:py-5
        "
      >
        <div
          className="
            grid
            grid-cols-[76px_minmax(0,1fr)_auto]
            items-center
            gap-4
            sm:grid-cols-[110px_minmax(0,1fr)_auto]
            sm:gap-5
          "
        >
          {/* IMAGE */}

          <button
            type="button"
            onClick={handleOpenDetail}
            aria-label={`${menuUi.ariaViewProduct} ${product.name}`}
            className="
              relative
              aspect-square
              w-full
              overflow-hidden
              border
              border-[var(--color-border)]
              bg-[var(--color-surface-elevated)]
              text-left
              transition-all
              duration-500
              group-hover:border-[var(--color-accent-border)]
            "
          >
            {hasImage ? (
              <Image
                src={product.image!}
                alt={product.name}
                fill
                sizes="110px"
                onError={() =>
                  setImageError(true)
                }
                className="
                  object-cover
                  brightness-[0.88]
                  transition-transform
                  duration-700
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  group-hover:scale-105
                "
              />
            ) : (
              <BackgroundImageTexture
                variant="grid-noise"
                opacity={0.14}
                className="h-full w-full"
              >
                <div className="flex h-full items-center justify-center px-3 text-center">
                  <span className="font-mono text-[7px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                    {product.name}
                  </span>
                </div>
              </BackgroundImageTexture>
            )}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/25
                to-transparent
              "
            />
          </button>

          {/* INFO */}

          <button
            type="button"
            onClick={handleOpenDetail}
            className="
              min-w-0
              text-left
            "
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="
                      h-px
                      w-5
                      shrink-0
                      bg-[var(--color-accent)]
                      sm:w-7
                    "
                  />

                  {product.tags?.[0] && (
                    <span
                      className="
                        truncate
                        font-mono
                        text-[7px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-[var(--color-text-subtle)]
                      "
                    >
                      {product.tags[0]}
                    </span>
                  )}
                </div>

                <h3
                  className="
                    mt-2
                    truncate
                    text-[15px]
                    font-semibold
                    tracking-[-0.02em]
                    text-[var(--color-text)]
                    sm:text-[18px]
                  "
                >
                  {product.name}
                </h3>

                {product.description && (
                  <p
                    className="
                      mt-1
                      hidden
                      max-w-xl
                      line-clamp-2
                      text-[11px]
                      leading-relaxed
                      text-[var(--color-text-muted)]
                      sm:block
                    "
                  >
                    {product.description}
                  </p>
                )}
              </div>

              <span
                className="
                  shrink-0
                  font-mono
                  text-[12px]
                  font-bold
                  tabular-nums
                  text-[var(--color-accent)]
                  sm:text-[14px]
                "
              >
                ${price}
              </span>
            </div>

            <div
              className="
                mt-2.5
                flex
                items-center
                gap-4
              "
            >
              {product.prepTime && (
                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.12em]
                    text-[var(--color-text-subtle)]
                  "
                >
                  <Clock3 size={10} />

                  {menuUi.prepLabel} ·{" "}
                  {product.prepTime}
                </span>
              )}

              <span
                className="
                  hidden
                  items-center
                  gap-1
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.12em]
                  text-[var(--color-text-subtle)]
                  md:flex
                "
              >
                {detailHint}

                <ChevronRight size={10} />
              </span>
            </div>
          </button>

          {/* ACTION */}

          <button
            type="button"
            onClick={handleAdd}
            aria-label={actionLabel}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              transition-all
              duration-300
              active:scale-95
              sm:h-11
              sm:w-11
            "
            style={{
              background: justAdded
                ? "var(--color-surface-elevated)"
                : hasOptions
                  ? "var(--color-accent-soft)"
                  : "var(--color-accent)",
              borderColor: justAdded
                ? "var(--color-border-strong)"
                : hasOptions
                  ? "var(--color-accent-border)"
                  : "var(--color-accent)",
              color: justAdded
                ? "var(--color-text)"
                : hasOptions
                  ? "var(--color-accent)"
                  : "var(--color-accent-contrast)",
            }}
          >
            {actionIcon}
          </button>
        </div>
      </article>
    );
  }

  /* =========================================================
     GRID
     ========================================================= */

  const isClean =
    variant === "clean";

  const isCompact =
    variant === "compact";

  return (
    <article
      className={[
        "group relative w-full overflow-hidden border transition-all duration-500",
        isClean
          ? "border-[var(--color-border)] bg-transparent"
          : isCompact
            ? "border-[var(--color-border)] bg-[var(--color-surface)]"
            : "border-[var(--color-border)] bg-[var(--color-surface)]",
        "hover:border-[var(--color-accent-border)]",
        !isClean &&
          !isCompact &&
          "hover:-translate-y-1",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        onClick={handleOpenDetail}
        aria-label={`${menuUi.ariaViewProduct} ${product.name}`}
        className="block w-full text-left"
      >
        {/* IMAGE */}

        <div
          className={[
            "relative w-full overflow-hidden bg-[var(--color-surface-elevated)]",
            isCompact
              ? "aspect-[16/10]"
              : isClean
                ? "aspect-[1/1]"
                : "aspect-[4/3]",
          ].join(" ")}
        >
          {hasImage ? (
            <Image
              src={product.image!}
              alt={product.name}
              fill
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                33vw
              "
              onError={() =>
                setImageError(true)
              }
              className={[
                "object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                !isClean &&
                  "brightness-[0.86] group-hover:scale-[1.045] group-hover:brightness-[0.94]",
                isClean &&
                  "group-hover:scale-[1.025]",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          ) : (
            <BackgroundImageTexture
              variant="grid-noise"
              opacity={0.15}
              className="h-full w-full"
            >
              <div className="flex h-full items-center justify-center px-6 text-center">
                <span
                  className="
                    font-mono
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[var(--color-accent)]
                  "
                >
                  {product.name}
                </span>
              </div>
            </BackgroundImageTexture>
          )}

          {/* IMAGE GRADIENT */}

          <div
            className={[
              "pointer-events-none absolute inset-0",
              isClean
                ? "bg-gradient-to-t from-black/25 via-transparent to-transparent"
                : "bg-gradient-to-t from-black/80 via-black/10 to-transparent",
            ].join(" ")}
          />

          {/* EDITORIAL IMAGE META */}

          {!isCompact && (
            <div
              className="
                absolute
                left-4
                right-4
                top-4
                flex
                items-start
                justify-between
                gap-3
              "
            >
              <div className="flex items-center gap-2">
                <span
                  className="
                    h-px
                    w-5
                    bg-[var(--color-accent)]
                  "
                />

                {product.tags?.[0] && (
                  <span
                    className="
                      max-w-[150px]
                      truncate
                      font-mono
                      text-[7px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                    "
                    style={{
                      color: isClean
                        ? "var(--color-text-subtle)"
                        : "#FFFFFF",
                    }}
                  >
                    {product.tags[0]}
                  </span>
                )}
              </div>

              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  backdrop-blur-md
                  transition-all
                  duration-300
                  group-hover:scale-105
                "
                style={{
                  borderColor: isClean
                    ? "var(--color-border-strong)"
                    : "rgba(255,255,255,0.18)",
                  background: isClean
                    ? "var(--color-surface)"
                    : "rgba(0,0,0,0.22)",
                  color: isClean
                    ? "var(--color-accent)"
                    : "#FFFFFF",
                }}
              >
                <ChevronRight
                  size={13}
                  strokeWidth={1.8}
                />
              </span>
            </div>
          )}

          {/* PHOTO VARIANT PRICE */}

          {!isClean && (
            <div
              className="
                absolute
                bottom-4
                left-4
                right-4
                flex
                items-end
                justify-between
                gap-4
              "
            >
              <div className="min-w-0">
                <span
                  className="
                    block
                    max-w-full
                    truncate
                    text-[clamp(1.35rem,3vw,2rem)]
                    font-semibold
                    leading-none
                    tracking-[-0.03em]
                    text-white
                  "
                >
                  {product.name}
                </span>

                <span
                  className="
                    mt-2
                    block
                    font-mono
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-white/70
                  "
                >
                  {menuUi.viewDetail}
                </span>
              </div>

              <span
                className="
                  shrink-0
                  font-mono
                  text-sm
                  font-bold
                  tabular-nums
                  text-[var(--color-accent-strong)]
                "
              >
                ${price}
              </span>
            </div>
          )}
        </div>

        {/* INFO */}

        <div
          className={[
            "min-w-0",
            isClean
              ? "p-4"
              : isCompact
                ? "p-3.5"
                : "p-4 sm:p-5",
          ].join(" ")}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {isClean && (
                <div
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      h-px
                      w-5
                      bg-[var(--color-accent)]
                    "
                  />

                  {product.tags?.[0] && (
                    <span
                      className="
                        truncate
                        font-mono
                        text-[7px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-[var(--color-text-subtle)]
                      "
                    >
                      {product.tags[0]}
                    </span>
                  )}
                </div>
              )}

              <h3
                className={[
                  "truncate font-semibold tracking-[-0.02em]",
                  isCompact
                    ? "text-[14px]"
                    : "text-[15px] sm:text-lg",
                ].join(" ")}
              >
                {product.name}
              </h3>

              {product.description && (
                <p
                  className="
                    mt-1.5
                    line-clamp-2
                    text-[11px]
                    leading-relaxed
                    text-[var(--color-text-muted)]
                    sm:text-xs
                  "
                >
                  {product.description}
                </p>
              )}
            </div>

            {isClean && (
              <span
                className="
                  shrink-0
                  font-mono
                  text-sm
                  font-bold
                  tabular-nums
                  text-[var(--color-accent)]
                "
              >
                ${price}
              </span>
            )}
          </div>

          {isClean && (
            <div className="mt-3 flex items-center justify-between gap-3">
              <span
                className="
                  flex
                  items-center
                  gap-1.5
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.12em]
                  text-[var(--color-text-subtle)]
                "
              >
                {product.prepTime && (
                  <>
                    <Clock3 size={10} />

                    {menuUi.prepLabel} ·{" "}
                    {product.prepTime}
                  </>
                )}
              </span>

              <span
                className="
                  font-mono
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[var(--color-text-subtle)]
                "
              >
                {menuUi.viewDetail}
              </span>
            </div>
          )}

          {isCompact && (
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                {product.prepTime
                  ? `${menuUi.prepLabel} · ${product.prepTime}`
                  : menuUi.fallbackKitchen}
              </span>

              <span className="font-mono text-sm font-bold tabular-nums text-[var(--color-accent)]">
                ${price}
              </span>
            </div>
          )}
        </div>
      </button>

      {/* ACTION */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-3
          border-t
          border-[var(--color-border)]
          px-4
          py-3
          sm:px-5
        "
      >
        <span
          className="
            min-w-0
            truncate
            font-mono
            text-[7px]
            font-medium
            uppercase
            tracking-[0.16em]
            text-[var(--color-text-subtle)]
          "
        >
          {product.prepTime
            ? `${menuUi.prepLabel} · ${product.prepTime}`
            : menuUi.fallbackKitchen}
        </span>

        <button
          type="button"
          onClick={handleAdd}
          aria-label={actionLabel}
          className="
            flex
            h-9
            shrink-0
            items-center
            gap-2
            rounded-full
            border
            px-3
            font-mono
            text-[8px]
            font-bold
            uppercase
            tracking-[0.14em]
            transition-all
            duration-300
            active:scale-95
          "
          style={{
            background: justAdded
              ? "var(--color-surface-elevated)"
              : hasOptions
                ? "var(--color-accent-soft)"
                : "var(--color-accent)",
            borderColor: justAdded
              ? "var(--color-border-strong)"
              : hasOptions
                ? "var(--color-accent-border)"
                : "var(--color-accent)",
            color: justAdded
              ? "var(--color-text)"
              : hasOptions
                ? "var(--color-accent)"
                : "var(--color-accent-contrast)",
          }}
        >
          {actionIcon}

          <span className="hidden sm:inline">
            {actionLabel}
          </span>
        </button>
      </div>
    </article>
  );
}