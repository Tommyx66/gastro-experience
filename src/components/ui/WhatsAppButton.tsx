"use client";

import { useGastro } from "@/context/gastro-context";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const { config } = useGastro();
  const whatsapp = config.ordering.whatsapp;

  if (!whatsapp?.number) return null;

  const href = buildWhatsAppUrl(whatsapp.number, whatsapp.defaultMessage);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-4 left-4 z-[70] flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]/95 text-[var(--color-success)] shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:border-[var(--color-success)] hover:bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] active:scale-95 sm:bottom-6 sm:left-6 sm:h-12 sm:w-auto sm:gap-2.5 sm:px-4"
    >
      <WhatsAppIcon size={19} />
      <span className="hidden font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--color-text)] sm:inline">
        WhatsApp
      </span>
    </a>
  );
}