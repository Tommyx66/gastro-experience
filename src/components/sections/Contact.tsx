"use client";

import dynamic from "next/dynamic";
import { type FormEvent, type ReactNode, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";

import type { SiteConfig } from "@/config/site";
import { useRestaurantContext } from "@/hooks/use-restaurant-context";

const InteractiveContactMap = dynamic(
  () => import("@/components/sections/InteractiveContactMap"),
  { ssr: false },
);

function InstagramIcon({ size = 17 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.3" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function openWhatsApp(number: string, message: string) {
  const phone = number.replace(/\D/g, "");
  if (!phone) return;

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="group block min-w-0">
      <span
        className="mb-2 block font-mono text-[9px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: "var(--color-text-subtle)" }}
      >
        {label}
      </span>

      <span
        className="block rounded-[16px] border px-4 transition-all duration-300 group-focus-within:border-[var(--color-accent)] group-focus-within:bg-[var(--color-accent-faint)]"
        style={{
          borderColor: "var(--color-border)",
          background: "var(--color-control)",
        }}
      >
        <input
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className="block h-12 w-full min-w-0 bg-transparent text-[14px] outline-none"
          style={{
            color: "var(--color-text)",
            fontFamily: "var(--font-body, sans-serif)",
          }}
        />
      </span>
    </label>
  );
}

function ContactForm({ config }: { config: SiteConfig }) {
  const contact = config.content.contact;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    const parts = [`Hola, soy ${name || "un cliente"}.`];
    if (phone) parts.push(`Teléfono: ${phone}`);
    if (email) parts.push(`Email: ${email}`);
    if (message) parts.push("", message);

    setSending(true);
    openWhatsApp(config.ordering.whatsapp.number, parts.join("\n"));
    event.currentTarget.reset();
    setSending(false);
    setSent(true);

    window.setTimeout(() => setSent(false), 3500);
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-0">
      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <Field label={contact.nameLabel} name="name" required autoComplete="name" />
        <Field label={contact.phoneLabel} name="phone" autoComplete="tel" />
      </div>

      <div className="mt-4">
        <Field label={contact.emailLabel} name="email" type="email" autoComplete="email" />
      </div>

      <label className="group mt-4 block min-w-0">
        <span
          className="mb-2 block font-mono text-[9px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: "var(--color-text-subtle)" }}
        >
          {contact.messageLabel}
        </span>

        <span
          className="block rounded-[16px] border px-4 transition-all duration-300 group-focus-within:border-[var(--color-accent)] group-focus-within:bg-[var(--color-accent-faint)]"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-control)",
          }}
        >
          <textarea
            name="message"
            rows={5}
            required
            className="block w-full min-w-0 resize-none bg-transparent py-4 text-[14px] leading-6 outline-none"
            style={{
              color: "var(--color-text)",
              fontFamily: "var(--font-body, sans-serif)",
            }}
          />
        </span>
      </label>

      <div
        className="mt-5 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-end sm:justify-between"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p
          className="max-w-md text-[11px] leading-5"
          style={{
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-body, sans-serif)",
          }}
        >
          {contact.formSubtitulo}
        </p>

        <button
          type="submit"
          disabled={sending}
          className="group inline-flex h-12 w-full shrink-0 items-center justify-between gap-5 rounded-full border px-5 text-[9px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[190px]"
          style={{
            background: sent ? "var(--color-surface-elevated)" : "var(--color-accent)",
            borderColor: sent ? "var(--color-border-strong)" : "var(--color-accent)",
            color: sent ? "var(--color-text)" : "var(--color-accent-contrast)",
            boxShadow: sent ? "none" : "0 16px 40px var(--color-accent-soft)",
            fontFamily: "var(--font-mono-family, monospace)",
          }}
        >
          <span className="truncate">
            {sending ? contact.submitSending : sent ? contact.submitSent : contact.botonEnviar}
          </span>

          {sent ? (
            <Check size={16} className="shrink-0" />
          ) : (
            <ArrowUpRight
              size={16}
              className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          )}
        </button>
      </div>
    </form>
  );
}

function DirectChannel({
  href,
  icon,
  children,
  external = false,
}: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex min-w-0 items-start gap-3 rounded-[14px] border px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent-border)] hover:bg-[var(--color-control-hover)]"
      style={{
        borderColor: "var(--color-border)",
        color: "var(--color-text)",
        background: "rgba(255,255,255,0.02)",
        fontFamily: "var(--font-body, sans-serif)",
      }}
    >
      <span className="mt-0.5 shrink-0" style={{ color: "var(--color-accent)" }}>
        {icon}
      </span>
      <span className="min-w-0 break-words text-sm leading-5">{children}</span>
      <ArrowUpRight
        size={14}
        className="ml-auto mt-0.5 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
      />
    </a>
  );
}

function ContactTopline({
  eyebrow,
  status,
}: {
  eyebrow: string;
  status: string;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="h-px w-10" style={{ background: "var(--color-accent)" }} />
        <span
          className="font-mono text-[9px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "var(--color-accent)" }}
        >
          {eyebrow}
        </span>
      </div>

      <span
        className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.16em]"
        style={{
          color: "var(--color-text)",
          borderColor: "var(--color-accent-border)",
          background: "var(--color-accent-faint)",
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: "var(--color-accent-strong)",
            boxShadow: "0 0 0 4px var(--color-accent-soft)",
          }}
        />
        {status}
      </span>
    </div>
  );
}

function SplitContact({ config }: { config: SiteConfig }) {
  const { preset } = useRestaurantContext();
  const contact = config.content.contact;
  const data = config.contact;
  const isBrewery = preset.id === "brewery";
  const image = isBrewery
    ? "https://images.unsplash.com/photo-1774106148002-3134e8b6f715?w=1800&q=86&auto=format&fit=crop"
    : config.content.hero.image;

  return (
    <section
      id="contacto"
      className="overflow-hidden py-16 sm:py-20 md:py-28"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10">
        <ContactTopline eyebrow={contact.eyebrow} status={contact.statusBadge} />

        <div className="grid min-w-0 overflow-hidden rounded-[28px] border lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.78fr)]" style={{ borderColor: "var(--color-border-strong)" }}>
          <div className="relative min-h-[500px] overflow-hidden bg-black sm:min-h-[620px] lg:min-h-[700px]">
            <img
              src={image}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out hover:scale-[1.025]"
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,5,5,.20) 0%, rgba(5,5,5,.02) 36%, rgba(5,5,5,.88) 100%), linear-gradient(90deg, rgba(5,5,5,.12) 0%, transparent 55%, rgba(5,5,5,.30) 100%)",
              }}
            />

            <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-4 sm:inset-x-8 sm:top-8">
              <div className="rounded-full border px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.16em]" style={{ borderColor: "rgba(255,255,255,.20)", background: "rgba(8,8,8,.35)", color: "#fff", backdropFilter: "blur(12px)" }}>
                {contact.mainLabel}
              </div>

              <div className="text-right font-mono text-[7px] font-bold uppercase leading-4 tracking-[0.16em] text-white/75 sm:text-[8px]">
                <div>{data.coordinates.latDisplay}</div>
                <div>{data.coordinates.lngDisplay}</div>
              </div>
            </div>

            <div className="absolute inset-x-5 bottom-6 sm:inset-x-8 sm:bottom-8">
              <div className="mb-3 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-white/70 sm:text-[9px]">
                {contact.mainLabel}
              </div>

              <h2
                className="max-w-3xl text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.82] tracking-[-0.06em] text-white sm:text-[clamp(4rem,6vw,7.5rem)]"
                style={{ fontFamily: "var(--font-display, serif)", fontWeight: 400, textShadow: "0 4px 30px rgba(0,0,0,.30)" }}
              >
                {contact.title}
              </h2>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-white/70 sm:text-[9px]">
                  {data.zone}
                </span>
                <span className="hidden h-px w-10 bg-white/20 sm:block" />
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-white/70 sm:text-[9px]">
                  {config.operation.schedule}
                </span>
              </div>
            </div>
          </div>

          <div className="min-w-0 p-5 sm:p-8 md:p-10 lg:p-12 xl:p-14" style={{ background: "var(--color-surface)" }}>
            <div className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.20em]" style={{ color: "var(--color-accent)" }}>
              {contact.formEyebrow}
            </div>

            <h3
              className="max-w-2xl text-[clamp(2.7rem,8vw,5.5rem)] leading-[0.86] tracking-[-0.055em]"
              style={{ fontFamily: "var(--font-display, serif)", fontWeight: 400 }}
            >
              {contact.formTitulo}
            </h3>

            <p className="mt-5 max-w-xl text-[13px] leading-6" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body, sans-serif)" }}>
              {contact.formSubtitulo}
            </p>

            <div className="mt-8 sm:mt-10">
              <ContactForm config={config} />
            </div>

            <div className="mt-8 border-t pt-7 sm:mt-10" style={{ borderColor: "var(--color-border)" }}>
              <div className="mb-4 font-mono text-[8px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--color-text-subtle)" }}>
                {contact.addressLabel}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <DirectChannel href={`tel:${data.phone}`} icon={<Phone size={14} />}>
                  {data.phone}
                </DirectChannel>
                <DirectChannel href={`mailto:${data.email}`} icon={<Mail size={14} />}>
                  {data.email}
                </DirectChannel>
                <DirectChannel href={data.instagram} icon={<InstagramIcon />} external>
                  {contact.instagramLabel}
                </DirectChannel>
                <DirectChannel href={data.mapsUrl} icon={<Navigation size={14} />} external>
                  {contact.directionsButton}
                </DirectChannel>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border" style={{ borderColor: "var(--color-border)", background: "var(--color-border)" }}>
              <div className="p-4" style={{ background: "var(--color-surface)" }}>
                <div className="mb-2 flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--color-text-subtle)" }}>
                  <MapPin size={12} />
                  {contact.addressLabel}
                </div>
                <p className="text-xs leading-5" style={{ color: "var(--color-text-muted)" }}>{data.fullAddress}</p>
              </div>

              <div className="p-4" style={{ background: "var(--color-surface)" }}>
                <div className="mb-2 flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--color-text-subtle)" }}>
                  <Clock3 size={12} />
                  {contact.scheduleLabel}
                </div>
                <p className="text-xs leading-5" style={{ color: "var(--color-text-muted)" }}>{config.operation.schedule}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapContact({ config }: { config: SiteConfig }) {
  const contact = config.content.contact;
  const data = config.contact;
  const { lat, lng, zoom } = data.coordinates;

  return (
    <section id="contacto" className="overflow-hidden py-16 sm:py-20 md:py-28" style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10">
        <ContactTopline eyebrow={contact.eyebrow} status={contact.statusBadge} />

        <div className="grid min-w-0 gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch lg:gap-12">
          <div className="min-w-0 self-end">
            <div className="mb-5 font-mono text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--color-text-subtle)" }}>
              {contact.mainLabel}
            </div>
            <h2 className="max-w-2xl text-[clamp(3.4rem,8vw,8rem)] leading-[0.82] tracking-[-0.07em]" style={{ fontFamily: "var(--font-display, serif)", fontWeight: 400 }}>
              {contact.title}
            </h2>
            <p className="mt-6 max-w-lg text-[13px] leading-7 sm:text-sm" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body, sans-serif)" }}>
              {contact.formSubtitulo}
            </p>

            <div className="mt-8 grid gap-3">
              <DirectChannel href={`tel:${data.phone}`} icon={<Phone size={14} />}>
                {data.phone}
              </DirectChannel>
              <DirectChannel href={`mailto:${data.email}`} icon={<Mail size={14} />}>
                {data.email}
              </DirectChannel>
              <DirectChannel href={data.instagram} icon={<InstagramIcon />} external>
                {contact.instagramLabel}
              </DirectChannel>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border" style={{ borderColor: "var(--color-border)", background: "var(--color-border)" }}>
              <div className="p-4" style={{ background: "var(--color-surface)" }}>
                <MapPin size={14} style={{ color: "var(--color-accent)" }} />
                <div className="mt-3 font-mono text-[8px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--color-text-subtle)" }}>
                  {contact.addressLabel}
                </div>
                <p className="mt-2 text-xs leading-5" style={{ color: "var(--color-text-muted)" }}>{data.fullAddress}</p>
              </div>
              <div className="p-4" style={{ background: "var(--color-surface)" }}>
                <Clock3 size={14} style={{ color: "var(--color-accent)" }} />
                <div className="mt-3 font-mono text-[8px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--color-text-subtle)" }}>
                  {contact.scheduleLabel}
                </div>
                <p className="mt-2 text-xs leading-5" style={{ color: "var(--color-text-muted)" }}>{config.operation.schedule}</p>
              </div>
            </div>
          </div>

          <div className="relative isolate min-h-[480px] overflow-hidden rounded-[28px] border sm:min-h-[620px]" style={{ borderColor: "var(--color-border-strong)", background: "var(--color-surface)" }}>
            <InteractiveContactMap lat={lat} lng={lng} zoom={zoom ?? 16} />

            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.08) 0%, transparent 32%, rgba(0,0,0,.48) 100%)" }} />

            <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3 sm:left-6 sm:right-6 sm:top-6">
              <span className="rounded-full border px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.16em] backdrop-blur-md" style={{ color: "var(--color-text)", borderColor: "var(--color-accent-border)", background: "var(--color-bg-elevated)" }}>
                {contact.mapEyebrow}
              </span>
              <span className="text-right font-mono text-[7px] font-bold uppercase leading-4 tracking-[0.15em] text-white/80 sm:text-[8px]">
                <div>{data.coordinates.latDisplay}</div>
                <div>{data.coordinates.lngDisplay}</div>
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-3 sm:bottom-6 sm:left-6 sm:right-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="rounded-[16px] border px-4 py-3 backdrop-blur-md" style={{ color: "var(--color-text)", borderColor: "var(--color-accent-border)", background: "var(--color-bg-elevated)" }}>
                <div className="font-mono text-[8px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--color-text-subtle)" }}>
                  {data.zone}
                </div>
                <div className="mt-1 text-sm" style={{ fontFamily: "var(--font-body, sans-serif)" }}>
                  {data.fullAddress}
                </div>
              </div>

              <a href={data.mapsUrl} target="_blank" rel="noreferrer" className="group inline-flex h-11 shrink-0 items-center justify-center gap-4 rounded-full border px-6 text-[9px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5" style={{ background: "var(--color-accent)", borderColor: "var(--color-accent)", color: "var(--color-accent-contrast)", fontFamily: "var(--font-mono-family, monospace)", boxShadow: "0 18px 40px var(--color-accent-soft)" }}>
                <span>{contact.directionsButton}</span>
                <Navigation size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-10 md:mt-14 md:pt-14" style={{ borderColor: "var(--color-border)" }}>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <div className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.20em]" style={{ color: "var(--color-accent)" }}>
                {contact.formEyebrow}
              </div>
              <h3 className="max-w-xl text-[clamp(2.7rem,6vw,5rem)] leading-[0.86] tracking-[-0.06em]" style={{ fontFamily: "var(--font-display, serif)", fontWeight: 400 }}>
                {contact.formTitulo}
              </h3>
            </div>
            <ContactForm config={config} />
          </div>
        </div>
      </div>
    </section>
  );
}

function MinimalContact({ config }: { config: SiteConfig }) {
  const contact = config.content.contact;
  const data = config.contact;

  return (
    <section id="contacto" className="py-20 sm:py-24 md:py-32" style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <ContactTopline eyebrow={contact.eyebrow} status={contact.statusBadge} />

        <div className="grid min-w-0 gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="min-w-0">
            <div className="font-mono text-[9px] font-bold uppercase tracking-[0.20em]" style={{ color: "var(--color-text-subtle)" }}>
              {contact.mainLabel}
            </div>
            <h2 className="mt-4 text-[clamp(3.2rem,8vw,7rem)] leading-[0.84] tracking-[-0.06em]" style={{ fontFamily: "var(--font-display, serif)", fontWeight: 400 }}>
              {contact.title}
            </h2>
            <p className="mt-6 max-w-md text-[13px] leading-7 sm:text-sm" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body, sans-serif)" }}>
              {contact.formSubtitulo}
            </p>

            <div className="mt-8 grid gap-3">
              <DirectChannel href={`tel:${data.phone}`} icon={<Phone size={14} />}>
                {data.phone}
              </DirectChannel>
              <DirectChannel href={`mailto:${data.email}`} icon={<Mail size={14} />}>
                {data.email}
              </DirectChannel>
              <DirectChannel href={data.instagram} icon={<InstagramIcon />} external>
                {contact.instagramLabel}
              </DirectChannel>
            </div>
          </div>

          <div className="min-w-0 border-t pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0" style={{ borderColor: "var(--color-border)" }}>
            <div className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.20em]" style={{ color: "var(--color-accent)" }}>
              {contact.formEyebrow}
            </div>
            <h3 className="max-w-2xl text-[clamp(2.6rem,6vw,5rem)] leading-[0.88] tracking-[-0.055em]" style={{ fontFamily: "var(--font-display, serif)", fontWeight: 400 }}>
              {contact.formTitulo}
            </h3>
            <div className="mt-8 sm:mt-10">
              <ContactForm config={config} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  const { preset, config } = useRestaurantContext();
  const variant = preset.visual?.contact ?? "minimal";

  if (variant === "map") return <MapContact config={config} />;
  if (variant === "split") return <SplitContact config={config} />;
  return <MinimalContact config={config} />;
}
