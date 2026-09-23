"use client";

import type {
  HTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type TextureVariant =
  | "fabric-of-squares"
  | "grid-noise"
  | "inflicted"
  | "debut-light"
  | "groovepaper"
  | "none";

interface BackgroundImageTextureProps
  extends HTMLAttributes<HTMLDivElement> {
  variant?: TextureVariant;
  opacity?: number;
  children?: ReactNode;
}

const textures: Record<
  Exclude<TextureVariant, "none">,
  string
> = {
  "fabric-of-squares": `
    linear-gradient(45deg, rgba(255,255,255,.035) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(255,255,255,.035) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(255,255,255,.035) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,.035) 75%)
  `,

  "grid-noise": `
    linear-gradient(
      rgba(255,255,255,.035) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(255,255,255,.035) 1px,
      transparent 1px
    )
  `,

  inflicted: `
    repeating-linear-gradient(
      0deg,
      rgba(255,255,255,.018) 0px,
      rgba(255,255,255,.018) 1px,
      transparent 1px,
      transparent 3px
    )
  `,

  "debut-light": `
    radial-gradient(
      circle at 20% 20%,
      rgba(255,255,255,.05) 0 1px,
      transparent 1px
    )
  `,

  groovepaper: `
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,.015) 0,
      rgba(255,255,255,.015) 1px,
      transparent 1px,
      transparent 4px
    )
  `,
};

export function BackgroundImageTexture({
  variant = "fabric-of-squares",
  opacity = 0.5,
  className,
  children,
  style,
  ...props
}: BackgroundImageTextureProps) {
  const safeOpacity = Math.min(
    1,
    Math.max(0, opacity)
  );

  const backgroundImage =
    variant === "none"
      ? undefined
      : textures[variant];

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        className
      )}
      style={style}
      {...props}
    >
      {variant !== "none" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            opacity: safeOpacity,
            backgroundImage,
            backgroundSize:
              variant === "grid-noise"
                ? "18px 18px"
                : variant ===
                    "fabric-of-squares"
                  ? "16px 16px"
                  : "auto",
          }}
        />
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}