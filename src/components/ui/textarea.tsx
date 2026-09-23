import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        [
          "flex min-h-24 w-full resize-y",
          "rounded-xl",
          "border border-[var(--color-border)]",
          "bg-[var(--color-control)]",
          "px-3.5 py-3",
          "text-sm leading-relaxed text-[var(--color-text)]",
          "transition-colors outline-none",
          "placeholder:text-[var(--color-text-subtle)]",
          "focus-visible:border-[var(--color-accent)]",
          "focus-visible:ring-3",
          "focus-visible:ring-[var(--color-accent-soft)]",
          "disabled:cursor-not-allowed",
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

export { Textarea };