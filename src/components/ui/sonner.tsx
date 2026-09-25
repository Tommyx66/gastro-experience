"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner } from "sonner";

import { useThemeStore } from "@/store/use-theme-store";

export function Toaster() {
  const theme = useThemeStore(
    (state) => state.theme
  );

  return (
    <Sonner
theme={theme === "hybrid" ? "system" : theme}      position="top-center"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-2xl",
          title:
            "font-medium text-[var(--color-text)]",
          description:
            "text-[var(--color-text-muted)]",
          success:
            "border-[var(--color-success)]/30",
          warning:
            "border-[var(--color-warning)]/30",
          error:
            "border-[var(--color-danger)]/30",
        },
      }}
    />
  );
}