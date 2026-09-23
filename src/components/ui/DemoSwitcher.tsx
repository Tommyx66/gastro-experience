"use client";

import { Layers, Check } from "lucide-react";
import { useMemo, useState } from "react";

import { presets } from "@/config/presets";
import type { GastroNiche } from "@/config/presets/types";
import { useGastro } from "@/context/gastro-context";

export default function DemoSwitcher() {
  const { niche, setNiche } = useGastro();
  const [open, setOpen] = useState(false);

  const entries = useMemo(
    () =>
      (Object.keys(presets) as GastroNiche[]).map((id) => ({
        id,
        label: presets[id].label,
      })),
    [],
  );

  return (
    <div className="fixed bottom-5 left-4 z-[100] sm:bottom-6 sm:left-6">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-1.5 shadow-2xl backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Cambiar demo"
          className="flex h-10 min-w-[152px] items-center justify-between gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-control)] px-3 text-left text-xs font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-accent-border)]"
        >
          <span className="flex items-center gap-2">
            <Layers size={14} className="text-[var(--color-accent)]" />
            Demo · {presets[niche].label}
          </span>
        </button>

        {open && (
          <div
            role="listbox"
            aria-label="Seleccionar demo"
            className="mt-1.5 max-h-64 w-full overflow-y-auto overscroll-contain rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1"
            data-lenis-prevent="true"
            onWheel={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
          >
            {entries.map((entry) => {
              const active = entry.id === niche;

              return (
                <button
                  key={entry.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setNiche(entry.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
                    active
                      ? "bg-[var(--color-accent-soft)] text-[var(--color-text)]"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-control)] hover:text-[var(--color-text)]"
                  }`}
                >
                  <span className="truncate">{entry.label}</span>
                  {active && <Check size={13} className="shrink-0 text-[var(--color-accent)]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
