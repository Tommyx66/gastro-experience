import * as React from "react";

import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        [
          "h-10 w-full min-w-0 rounded-xl",
          "border border-[var(--color-border)]",
          "bg-[var(--color-control)]",
          "px-3.5 py-2",
          "text-sm text-[var(--color-text)]",
          "transition-colors outline-none",
          "placeholder:text-[var(--color-text-subtle)]",
          "focus-visible:border-[var(--color-accent)]",
          "focus-visible:ring-3 focus-visible:ring-[var(--color-accent-soft)]",
          "disabled:pointer-events-none disabled:cursor-not-allowed",
          "disabled:opacity-50",
          "aria-invalid:border-[var(--color-danger)]",
          "aria-invalid:ring-3",
          "aria-invalid:ring-[var(--color-danger)]/15",
        ].join(" "),
        className
      )}
      {...props}
    />
  );
}

export { Input };