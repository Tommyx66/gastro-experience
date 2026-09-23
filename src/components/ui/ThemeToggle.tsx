"use client";

import { Moon, Sun } from "lucide-react";
import { useGastro } from "@/context/gastro-context";
import { useThemeStore } from "@/store/use-theme-store";

export default function ThemeToggle({
  floating = false,
  compact = true,
}: {
  floating?: boolean;
  compact?: boolean;
}) {
  const { theme, toggleTheme } = useThemeStore();
  const { config } = useGastro();
  const copy = config.content.navbarUi;

  const icon =
    theme === "dark" ? (
      <Moon size={14} strokeWidth={1.8} className="text-[var(--color-accent)]" />
    ) : (
      <Sun size={14} strokeWidth={1.8} className="text-[var(--color-accent)]" />
    );

  if (compact || !floating) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={copy.ariaChangeTheme}
        title={theme === "dark" ? copy.themeDark : copy.themeLight}
        className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-control)] text-[var(--color-text)] transition-all hover:border-[var(--color-accent-border)] hover:bg-[var(--color-accent-soft)] active:scale-95"
      >
        {icon}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={copy.ariaChangeTheme}
      className="flex h-10 cursor-pointer items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-control)] px-3.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--color-text)] transition-all hover:border-[var(--color-accent-border)] hover:bg-[var(--color-accent-soft)] active:scale-95"
    >
      {icon}
      <span>{theme === "dark" ? copy.themeDark : copy.themeLight}</span>
    </button>
  );
}