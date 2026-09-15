"use client";

import Image from "next/image";
import { Plus } from "lucide-react";

import type { MenuProduct } from "@/data/menu";
import { useCartStore } from "@/store/use-cart-store";

interface ProductCardProps {
  product: MenuProduct;
}

export function ProductCard({
  product,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="group overflow-hidden rounded-[1.5rem] bg-white/[0.04] ring-1 ring-white/[0.08] transition-transform duration-500 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-white/[0.03]" />
        )}

        {product.tags?.[0] && (
          <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
            {product.tags[0]}
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-4 p-5">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-medium text-white">
            {product.name}
          </h3>

          {product.description && (
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-white/50">
              {product.description}
            </p>
          )}

          <p className="mt-4 text-sm font-medium text-white/80">
            {product.price.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              maximumFractionDigits: 0,
            })}
          </p>
        </div>

        <button
          type="button"
          aria-label={`Agregar ${product.name}`}
          onClick={() => addItem(product)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white text-black transition-transform duration-300 hover:scale-105"
        >
          <Plus size={18} strokeWidth={1.8} />
        </button>
      </div>
    </article>
  );
}