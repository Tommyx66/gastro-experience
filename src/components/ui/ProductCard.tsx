"use client";

import Image from "next/image";
import {
  Beer,
  Check,
  ChevronRight,
  Clock3,
  Coffee,
  Flame,
  IceCreamBowl,
  Plus,
  SlidersHorizontal,
  Sparkles,
  Users,
  Utensils,
  Wheat,
} from "lucide-react";
import { useMemo, useState, type MouseEvent } from "react";

import { useGastro } from "@/context/gastro-context";
import type { MenuProduct } from "@/data/menu";
import { useCartStore } from "@/store/use-cart-store";
import { BackgroundImageTexture } from "@/components/ui/bg-image-texture";

interface ProductCardProps {
  product: MenuProduct;
  viewMode?: "grid" | "list";
  onOpenDetail?: (product: MenuProduct) => void;
}

export default function ProductCard({
  product,
  viewMode = "grid",
  onOpenDetail,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { config, preset, niche } = useGastro();

  const menuUi = config.content.menuUi;
  const variant = preset.visual?.productCard ?? "photo";

  const [justAdded, setJustAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasOptions = Boolean(product.optionGroups?.length);
  const hasImage = Boolean(product.image && !imageError);

  const price = product.price.toLocaleString("es-AR");

  // Extracción inteligente de IBU / ABV para Brewery
  const beerMeta = useMemo(() => {
    if (niche !== "brewery") return null;
    const desc = product.description || "";
    const ibuMatch = desc.match(/IBU\s*(\d+)/i);
    const abvMatch = desc.match(/ABV\s*([\d.,]+%?)/i);

    return {
      ibu: ibuMatch ? ibuMatch[1] : null,
      abv: abvMatch
        ? abvMatch[1].endsWith("%")
          ? abvMatch[1]
          : `${abvMatch[1]}%`
        : null,
    };
  }, [niche, product.description]);

  const handleAdd = (event: MouseEvent) => {
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
    <SlidersHorizontal size={13} strokeWidth={1.8} />
  ) : justAdded ? (
    <Check size={14} strokeWidth={2.5} />
  ) : (
    <Plus size={15} strokeWidth={1.8} />
  );

  const actionLabel = hasOptions
    ? menuUi.choose
    : justAdded
    ? menuUi.added
    : menuUi.add;

  const detailHint = hasOptions ? "Personalizar" : "Detalle";

  /* =========================================================
     BADGES TÁCTICOS POR NICHO
  ========================================================== */
  const renderNicheBadge = () => {
    switch (niche) {
      case "brewery":
        return (
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[8px] font-bold">
            <span className="inline-flex items-center gap-1 rounded border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-1.5 py-0.5 text-[var(--color-accent)]">
              <Beer size={9} />
              <span>TAP</span>
            </span>
            {beerMeta?.abv && (
              <span className="rounded border border-[var(--color-border)] bg-[var(--color-control)] px-1.5 py-0.5 text-[var(--color-text-muted)]">
                {beerMeta.abv}
              </span>
            )}
            {beerMeta?.ibu && (
              <span className="rounded border border-[var(--color-border)] bg-[var(--color-control)] px-1.5 py-0.5 text-[var(--color-text-muted)]">
                {beerMeta.ibu} IBU
              </span>
            )}
          </div>
        );

      case "cafe":
        return (
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[8px]">
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-2 py-0.5 font-semibold text-[var(--color-accent)]">
              <Coffee size={9} />
              <span>ORIGEN</span>
            </span>
            {product.prepTime && (
              <span className="text-[var(--color-text-subtle)]">
                · {product.prepTime}
              </span>
            )}
          </div>
        );

      case "bakery":
        return (
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[8px]">
            <span className="inline-flex items-center gap-1 rounded border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-2 py-0.5 font-semibold text-[var(--color-accent)]">
              <Wheat size={9} />
              <span>MASA MADRE</span>
            </span>
            {product.tags?.[0] && (
              <span className="text-[var(--color-text-subtle)]">
                · {product.tags[0]}
              </span>
            )}
          </div>
        );

      case "icecream":
        return (
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[8px]">
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-2 py-0.5 font-bold text-[var(--color-accent)]">
              <IceCreamBowl size={9} />
              <span>GELATO</span>
            </span>
            {hasOptions && (
              <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-control)] px-1.5 py-0.5 text-[var(--color-text-muted)]">
                Combinable
              </span>
            )}
          </div>
        );

      case "bodegon":
        return (
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[8px]">
            <span className="inline-flex items-center gap-1 rounded border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-1.5 py-0.5 font-bold uppercase text-[var(--color-accent)]">
              <Utensils size={9} />
              <span>CANTINA</span>
            </span>
            {product.tags?.includes("Para compartir") && (
              <span className="inline-flex items-center gap-1 text-[var(--color-text-muted)]">
                <Users size={9} />
                <span>2 personas</span>
              </span>
            )}
          </div>
        );

      case "catering":
        return (
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[8px]">
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-2 py-0.5 font-semibold tracking-wider text-[var(--color-accent)]">
              <Sparkles size={9} />
              <span>EVENTOS</span>
            </span>
            {product.tags?.[0] && (
              <span className="text-[var(--color-text-subtle)]">
                · {product.tags[0]}
              </span>
            )}
          </div>
        );

      default:
        return (
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[8px]">
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-2 py-0.5 font-semibold text-[var(--color-accent)]">
              <Flame size={9} />
              <span>FUEGO</span>
            </span>
            {product.tags?.[0] && (
              <span className="text-[var(--color-text-subtle)]">
                · {product.tags[0]}
              </span>
            )}
          </div>
        );
    }
  };

  /* =========================================================
     VISTA LISTA
  ========================================================== */
  if (viewMode === "list") {
    return (
      <article className="group relative border-b border-[var(--color-border)] py-4 sm:py-5 transition-colors duration-300 hover:bg-[var(--color-control)]">
        <div className="grid grid-cols-[76px_minmax(0,1fr)_auto] items-center gap-4 sm:grid-cols-[100px_minmax(0,1fr)_auto] sm:gap-6">
          {/* FOTO MINIATURA */}
          <button
            type="button"
            onClick={handleOpenDetail}
            aria-label={`${menuUi.ariaViewProduct} ${product.name}`}
            className="relative aspect-square w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-left transition-all duration-300 group-hover:border-[var(--color-accent-border)] cursor-pointer"
          >
            {hasImage ? (
              <Image
                src={product.image!}
                alt={product.name}
                fill
                sizes="100px"
                onError={() => setImageError(true)}
                className="object-cover brightness-[0.88] transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <BackgroundImageTexture
                variant="grid-noise"
                opacity={0.14}
                className="h-full w-full"
              >
                <div className="flex h-full items-center justify-center px-2 text-center">
                  <span className="font-mono text-[7px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
                    {product.name}
                  </span>
                </div>
              </BackgroundImageTexture>
            )}
          </button>

          {/* INFORMACIÓN CENTRAL */}
          <button
            type="button"
            onClick={handleOpenDetail}
            className="min-w-0 text-left cursor-pointer"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                {renderNicheBadge()}
              </div>

              <h3 className="truncate text-sm sm:text-base font-semibold tracking-[-0.02em] text-[var(--color-text)] leading-snug">
                {product.name}
              </h3>

              {product.description && (
                <p className="line-clamp-2 max-w-xl text-[11px] font-light leading-relaxed text-[var(--color-text-muted)]">
                  {product.description}
                </p>
              )}
            </div>

            <div className="mt-2 flex items-center gap-3">
              <span className="hidden items-center gap-1 font-mono text-[8px] uppercase tracking-wider text-[var(--color-text-subtle)] sm:flex hover:text-[var(--color-accent)]">
                <span>{detailHint}</span>
                <ChevronRight size={10} />
              </span>
            </div>
          </button>

          {/* PRECIO Y ACCIÓN */}
          <div className="flex flex-col items-end gap-2.5 pl-2 shrink-0">
            <span className="font-mono text-sm sm:text-base font-bold tabular-nums text-[var(--color-accent)]">
              ${price}
            </span>

            <button
              type="button"
              onClick={handleAdd}
              aria-label={actionLabel}
              className="flex h-9 w-9 sm:h-10 sm:w-10 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 active:scale-95"
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
        </div>
      </article>
    );
  }

  /* =========================================================
     VISTA GRILLA (DEFAULT)
  ========================================================== */
  const isClean = variant === "clean";
  const isCompact = variant === "compact";

  return (
    <article
      className={[
        "group relative flex w-full flex-col justify-between overflow-hidden border transition-all duration-500 rounded-[20px]",
        isClean
          ? "border-[var(--color-border)] bg-transparent"
          : isCompact
          ? "border-[var(--color-border)] bg-[var(--color-surface)]"
          : "border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm hover:shadow-xl",
        "hover:border-[var(--color-accent-border)]",
        !isClean && !isCompact && "hover:-translate-y-1",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        onClick={handleOpenDetail}
        aria-label={`${menuUi.ariaViewProduct} ${product.name}`}
        className="block w-full text-left cursor-pointer"
      >
        {/* IMAGEN Y OVERLAY */}
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
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImageError(true)}
              className={[
                "object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                !isClean &&
                  "brightness-[0.88] group-hover:scale-105 group-hover:brightness-95",
                isClean && "group-hover:scale-105",
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
              <div className="flex h-full items-center justify-center px-4 text-center">
                <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
                  {product.name}
                </span>
              </div>
            </BackgroundImageTexture>
          )}

          {/* GRADIENT SUAVE */}
          <div
            className={[
              "pointer-events-none absolute inset-0",
              isClean
                ? "bg-gradient-to-t from-black/25 via-transparent to-transparent"
                : "bg-gradient-to-t from-black/85 via-black/20 to-transparent",
            ].join(" ")}
          />

          {/* BADGES EN ESQUINA SUPERIOR */}
          <div className="absolute inset-x-3.5 top-3.5 flex items-start justify-between gap-2 z-10">
            <div className="flex flex-wrap items-center gap-1.5">
              {renderNicheBadge()}
            </div>

            {/* PRECIO FLOTANTE EN VARIANTE COMPACT */}
            {isCompact && (
              <span className="rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-xs font-bold text-white shadow-md backdrop-blur-md">
                ${price}
              </span>
            )}
          </div>

          {/* TÍTULO Y PRECIO DENTRO DE FOTO (VARIANTE ESTÁNDAR) */}
          {!isClean && !isCompact && (
            <div className="absolute inset-x-4 bottom-3.5 flex items-end justify-between gap-3 z-10">
              <div className="min-w-0 flex-1">
                <h4 className="truncate font-semibold tracking-[-0.03em] text-white text-base sm:text-lg leading-tight">
                  {product.name}
                </h4>
                <span className="mt-1 block font-mono text-[9px] uppercase tracking-wider text-white/70">
                  {menuUi.viewDetail}
                </span>
              </div>

              <span className="shrink-0 font-mono text-sm sm:text-base font-bold tabular-nums text-[var(--color-accent-strong)]">
                ${price}
              </span>
            </div>
          )}
        </div>

        {/* CUERPO TEXTUAL */}
        <div
          className={[
            "min-w-0 space-y-1.5",
            isClean ? "p-4" : isCompact ? "p-3.5" : "p-4 sm:p-5",
          ].join(" ")}
        >
          {isClean && (
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="truncate font-semibold tracking-[-0.02em] text-[var(--color-text)] text-sm sm:text-base">
                {product.name}
              </h4>
              <span className="shrink-0 font-mono text-xs sm:text-sm font-bold tabular-nums text-[var(--color-accent)]">
                ${price}
              </span>
            </div>
          )}

          {isCompact && (
            <h4 className="truncate font-semibold tracking-[-0.02em] text-[var(--color-text)] text-sm">
              {product.name}
            </h4>
          )}

          {product.description && (
            <p className="line-clamp-2 text-[11px] font-light leading-relaxed text-[var(--color-text-muted)]">
              {product.description}
            </p>
          )}
        </div>
      </button>

      {/* BARRA INFERIOR DE ACCIÓN */}
      <div className="flex items-center justify-between gap-3 border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)]/60 px-4 py-2.5 sm:px-5">
        <span className="min-w-0 truncate font-mono text-[8px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
          {hasOptions ? "Personalizable" : product.prepTime ? `${menuUi.prepLabel} · ${product.prepTime}` : "Listo para salir"}
        </span>

        <button
          type="button"
          onClick={handleAdd}
          aria-label={actionLabel}
          className="flex h-8 sm:h-8.5 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 font-mono text-[8px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95"
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
          <span>{actionLabel}</span>
        </button>
      </div>
    </article>
  );
}