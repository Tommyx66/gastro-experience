"use client";

import {
  Button as ButtonPrimitive,
} from "@base-ui/react/button";

import {
  cva,
  type VariantProps,
} from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "shrink-0",
    "gap-2",
    "whitespace-nowrap",
    "font-mono",
    "font-medium",
    "outline-none",
    "transition-all",
    "duration-200",
    "select-none",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "focus-visible:ring-2",
    "focus-visible:ring-[var(--color-accent-border)]",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[var(--color-bg)]",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-text)] text-[var(--color-bg)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-contrast)]",

        outline:
          "border border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)] hover:border-[var(--color-accent-border)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]",

        secondary:
          "bg-[var(--color-control)] text-[var(--color-text)] hover:bg-[var(--color-control-hover)]",

        ghost:
          "bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-control)] hover:text-[var(--color-text)]",

        destructive:
          "border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/15",

        link:
          "h-auto bg-transparent p-0 text-[var(--color-accent)] underline-offset-4 hover:underline",

        accent:
          "bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-[0_10px_30px_var(--color-accent-soft)] hover:brightness-110",

        "accent-outline":
          "border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-contrast)]",
      },

      size: {
        default:
          "min-h-9 rounded-xl px-3.5 text-sm",

        xs:
          "min-h-7 rounded-lg px-2.5 text-xs",

        sm:
          "min-h-8 rounded-lg px-3 text-xs",

        lg:
          "min-h-11 rounded-xl px-5 text-sm",

        icon:
          "size-9 rounded-xl",

        "icon-xs":
          "size-6 rounded-md",

        "icon-sm":
          "size-8 rounded-lg",

        "icon-lg":
          "size-11 rounded-xl",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps =
  ButtonPrimitive.Props &
    VariantProps<
      typeof buttonVariants
    >;

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
    />
  );
}

export {
  Button,
  buttonVariants,
};