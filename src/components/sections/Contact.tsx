"use client";

import dynamic from "next/dynamic";

import {
  type FormEvent,
  type ReactNode,
  useState,
} from "react";

import {
  ArrowRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";

import type {
  SiteConfig,
} from "@/config/site";

import {
  useRestaurantContext,
} from "@/hooks/use-restaurant-context";

/* =========================================================
   LEAFLET
========================================================= */

const InteractiveContactMap =
  dynamic(
    () =>
      import(
        "@/components/sections/InteractiveContactMap"
      ),
    {
      ssr: false,
    },
  );

/* =========================================================
   INSTAGRAM
========================================================= */

function InstagramIcon({
  size = 17,
}: {
  size?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="17.3"
        cy="6.8"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

/* =========================================================
   WHATSAPP
========================================================= */

function openWhatsApp(
  number: string,
  message: string,
) {
  const phone =
    number.replace(
      /\D/g,
      "",
    );

  if (!phone) {
    return;
  }

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(
      message,
    )}`,
    "_blank",
    "noopener,noreferrer",
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

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
    <label className="block min-w-0">
      <span
        className="
          mb-2
          block
          font-mono
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.16em]
        "
        style={{
          color:
            "var(--color-text-subtle)",
        }}
      >
        {label}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="
          block
          w-full
          min-w-0
          border-0
          border-b
          bg-transparent
          px-0
          py-3
          text-[15px]
          outline-none
          transition-colors
        "
        style={{
          color:
            "var(--color-text)",
          borderBottomColor:
            "var(--color-border-strong)",
          fontFamily:
            "var(--font-body, sans-serif)",
        }}
      />
    </label>
  );
}

/* =========================================================
   CONTACT FORM
========================================================= */

function ContactForm({
  config,
}: {
  config: SiteConfig;
}) {
  const contact =
    config.content.contact;

  const [
    sent,
    setSent,
  ] = useState(false);

  const [
    sending,
    setSending,
  ] = useState(false);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (sending) {
      return;
    }

    const form =
      new FormData(
        event.currentTarget,
      );

    const name =
      String(
        form.get("name") ?? "",
      ).trim();

    const phone =
      String(
        form.get("phone") ?? "",
      ).trim();

    const email =
      String(
        form.get("email") ?? "",
      ).trim();

    const message =
      String(
        form.get("message") ?? "",
      ).trim();

    const parts: string[] = [
      `Hola, soy ${
        name || "un cliente"
      }.`,
    ];

    if (phone) {
      parts.push(
        `Teléfono: ${phone}`,
      );
    }

    if (email) {
      parts.push(
        `Email: ${email}`,
      );
    }

    if (message) {
      parts.push(
        "",
        message,
      );
    }

    setSending(true);

    openWhatsApp(
      config.ordering.whatsapp
        .number,
      parts.join("\n"),
    );

    event.currentTarget.reset();

    setSending(false);
    setSent(true);

    window.setTimeout(
      () => {
        setSent(false);
      },
      3500,
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        min-w-0
        space-y-7
        sm:space-y-8
      "
    >
      <div className="grid min-w-0 gap-7 md:grid-cols-2 md:gap-8">
        <Field
          label={
            contact.nameLabel
          }
          name="name"
          required
          autoComplete="name"
        />

        <Field
          label={
            contact.phoneLabel
          }
          name="phone"
          autoComplete="tel"
        />
      </div>

      <Field
        label={
          contact.emailLabel
        }
        name="email"
        type="email"
        autoComplete="email"
      />

      <label className="block min-w-0">
        <span
          className="
            mb-2
            block
            font-mono
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.16em]
          "
          style={{
            color:
              "var(--color-text-subtle)",
          }}
        >
          {
            contact.messageLabel
          }
        </span>

        <textarea
          name="message"
          rows={4}
          required
          className="
            block
            w-full
            min-w-0
            resize-none
            border-0
            border-b
            bg-transparent
            px-0
            py-3
            text-[15px]
            leading-7
            outline-none
          "
          style={{
            color:
              "var(--color-text)",
            borderBottomColor:
              "var(--color-border-strong)",
            fontFamily:
              "var(--font-body, sans-serif)",
          }}
        />
      </label>

      <div
        className="
          flex
          min-w-0
          flex-col
          gap-5
          pt-1
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <p
          className="
            max-w-md
            text-xs
            leading-6
          "
          style={{
            color:
              "var(--color-text-muted)",
            fontFamily:
              "var(--font-body, sans-serif)",
          }}
        >
          {
            contact.formSubtitulo
          }
        </p>

        <button
          type="submit"
          disabled={sending}
          className="
            group
            inline-flex
            h-12
            w-full
            min-w-0
            items-center
            justify-between
            gap-4
            rounded-full
            border
            px-5
            text-[9px]
            font-bold
            uppercase
            tracking-[0.14em]
            shadow-[0_12px_36px_var(--color-accent-soft)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:brightness-110
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:w-auto
            sm:min-w-[220px]
            sm:gap-5
            sm:px-7
            sm:text-[10px]
            sm:tracking-[0.18em]
          "
          style={{
            background:
              sent
                ? "var(--color-surface-elevated)"
                : "var(--color-accent)",

            borderColor:
              sent
                ? "var(--color-border-strong)"
                : "var(--color-accent)",

            color:
              sent
                ? "var(--color-text)"
                : "var(--color-accent-contrast)",

            fontFamily:
              "var(--font-mono-family, monospace)",
          }}
        >
          <span className="min-w-0 truncate">
            {sending
              ? contact.submitSending
              : sent
                ? contact.submitSent
                : contact.botonEnviar}
          </span>

          {sent ? (
            <Check
              size={16}
              className="shrink-0"
            />
          ) : (
            <ArrowRight
              size={16}
              className="
                shrink-0
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          )}
        </button>
      </div>
    </form>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  icon,
  label,
  value,
  borderLeft = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  borderLeft?: boolean;
}) {
  return (
    <div
      className={[
        "min-w-0 p-5 sm:p-7",
        borderLeft
          ? "border-t md:border-l md:border-t-0"
          : "",
      ].join(" ")}
      style={{
        borderColor:
          "var(--color-border)",
      }}
    >
      <div
        className="
          mb-4
          flex
          items-center
          gap-2
          font-mono
          text-[8px]
          font-bold
          uppercase
          tracking-[0.18em]
        "
        style={{
          color:
            "var(--color-text-subtle)",
        }}
      >
        {icon}
        <span className="min-w-0 truncate">
          {label}
        </span>
      </div>

      <p
        className="
          break-words
          text-sm
          leading-6
        "
        style={{
          color:
            "var(--color-text)",
          fontFamily:
            "var(--font-body, sans-serif)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   DIRECT CHANNEL
========================================================= */

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
      target={
        external ? "_blank" : undefined
      }
      rel={
        external
          ? "noreferrer"
          : undefined
      }
      className="
        flex
        min-w-0
        items-start
        gap-3
        text-sm
        transition-opacity
        hover:opacity-60
      "
      style={{
        color:
          "var(--color-text)",
        fontFamily:
          "var(--font-body, sans-serif)",
      }}
    >
      <span className="mt-0.5 shrink-0">
        {icon}
      </span>

      <span className="min-w-0 break-words">
        {children}
      </span>
    </a>
  );
}

/* =========================================================
   MAP CONTACT
========================================================= */

function MapContact({
  config,
}: {
  config: SiteConfig;
}) {
  const contact =
    config.content.contact;

  const data =
    config.contact;

  const {
    lat,
    lng,
    zoom,
  } =
    data.coordinates;

  return (
    <section
      id="contacto"
      className="
        overflow-hidden
        py-20
        sm:py-24
        md:py-36
      "
      style={{
        background:
          "var(--color-bg)",
        color:
          "var(--color-text)",
      }}
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-4
          sm:px-6
          md:px-10
          lg:px-14
        "
      >
        {/* HEADER + MAP */}

        <div
          className="
            grid
            min-w-0
            gap-10
            lg:grid-cols-[0.9fr_1.1fr]
            lg:items-end
            lg:gap-12
          "
        >
          <div className="min-w-0">
            <div
              className="
                mb-6
                flex
                min-w-0
                items-center
                gap-3
                sm:mb-8
                sm:gap-4
              "
            >
              <span
                className="
                  h-px
                  w-9
                  shrink-0
                  sm:w-14
                "
                style={{
                  background:
                    "var(--color-accent)",
                }}
              />

              <span
                className="
                  min-w-0
                  truncate
                  font-mono
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[var(--color-accent)]
                  sm:text-[9px]
                  sm:tracking-[0.24em]
                "
              >
                {contact.eyebrow}
              </span>
            </div>

            <div
              className="
                font-mono
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[var(--color-text-subtle)]
                sm:text-[9px]
                sm:tracking-[0.2em]
              "
            >
              {contact.mainLabel}
            </div>

            <h2
              className="
                mt-4
                max-w-3xl
                break-words
                text-[clamp(3rem,13vw,8rem)]
                leading-[0.82]
                tracking-[-0.075em]
                sm:mt-5
                sm:text-[clamp(3.5rem,7.5vw,8rem)]
                sm:tracking-[-0.07em]
              "
              style={{
                fontFamily:
                  "var(--font-display, serif)",
                fontWeight: 400,
              }}
            >
              {contact.title}
            </h2>

            <p
              className="
                mt-6
                max-w-lg
                break-words
                text-[13px]
                leading-7
                sm:mt-8
                sm:text-sm
              "
              style={{
                color:
                  "var(--color-text-muted)",
                fontFamily:
                  "var(--font-body, sans-serif)",
              }}
            >
              {
                contact.formSubtitulo
              }
            </p>

            <div
              className="
                mt-7
                flex
                items-center
                gap-3
                sm:mt-9
              "
            >
              <span
                className="
                  h-2
                  w-2
                  shrink-0
                  rounded-full
                "
                style={{
                  background:
                    "var(--color-accent)",
                  boxShadow:
                    "0 0 0 5px var(--color-accent-soft)",
                }}
              />

              <span
                className="
                  min-w-0
                  font-mono
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[var(--color-text-muted)]
                  sm:text-[9px]
                  sm:tracking-[0.18em]
                "
              >
                {contact.statusBadge}
              </span>
            </div>
          </div>

          {/* MAP */}

          <div
            className="
              gastro-contact-map
              relative
              isolate
              h-[360px]
              w-full
              overflow-hidden
              rounded-[24px]
              border
              sm:h-[430px]
              sm:rounded-[28px]
              md:h-[500px]
              lg:h-[560px]
            "
            style={{
              borderColor:
                "var(--color-border-strong)",
              background:
                "var(--color-surface)",
              isolation:
                "isolate",
            }}
          >
            <div
              className="
                absolute
                inset-0
                z-0
              "
            >
              <InteractiveContactMap
                lat={lat}
                lng={lng}
                zoom={
                  zoom ?? 16
                }
              />
            </div>

            {/* VISUAL TREATMENT */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-10
              "
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, transparent 28%, transparent 68%, rgba(0,0,0,0.30) 100%)",
              }}
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-10
              "
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, var(--color-accent-soft) 0%, transparent 24%)",
                mixBlendMode:
                  "soft-light",
              }}
            />

            {/* TOP META */}

            <div
              className="
                pointer-events-none
                absolute
                left-4
                right-4
                top-4
                z-20
                flex
                min-w-0
                flex-col
                items-start
                gap-3
                sm:left-6
                sm:right-6
                sm:top-6
                sm:flex-row
                sm:items-start
                sm:justify-between
              "
            >
              <div
                className="
                  max-w-[calc(100%-8px)]
                  rounded-full
                  border
                  px-3
                  py-1.5
                  font-mono
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  backdrop-blur-md
                  sm:text-[8px]
                  sm:tracking-[0.18em]
                "
                style={{
                  color:
                    "var(--color-text)",
                  borderColor:
                    "var(--color-accent-border)",
                  background:
                    "var(--color-bg-elevated)",
                  boxShadow:
                    "0 8px 24px rgba(0,0,0,0.12)",
                }}
              >
                {contact.mapEyebrow}
              </div>

              <div
                className="
                  max-w-full
                  text-left
                  font-mono
                  text-[7px]
                  font-bold
                  uppercase
                  leading-4
                  tracking-[0.13em]
                  sm:text-right
                  sm:text-[8px]
                  sm:leading-5
                  sm:tracking-[0.16em]
                "
                style={{
                  color:
                    "var(--color-text)",
                  textShadow:
                    "0 1px 7px rgba(0,0,0,0.5)",
                }}
              >
                <div>
                  {
                    data.coordinates
                      .latDisplay
                  }
                </div>

                <div>
                  {
                    data.coordinates
                      .lngDisplay
                  }
                </div>
              </div>
            </div>

            {/* LOCATION LABEL */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-20
                left-4
                z-20
                sm:bottom-24
                sm:left-6
              "
            >
              <div
                className="
                  max-w-[60vw]
                  rounded-full
                  border
                  px-3
                  py-1.5
                  font-mono
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  backdrop-blur-md
                  sm:text-[8px]
                  sm:tracking-[0.18em]
                "
                style={{
                  color:
                    "var(--color-text)",
                  borderColor:
                    "var(--color-accent-border)",
                  background:
                    "var(--color-bg-elevated)",
                  boxShadow:
                    "0 8px 24px rgba(0,0,0,0.12)",
                }}
              >
                {data.zone}
              </div>
            </div>

            {/* DIRECTIONS */}

            <a
              href={
                data.mapsUrl
              }
              target="_blank"
              rel="noreferrer"
              className="
                group
                absolute
                bottom-4
                left-4
                right-4
                z-20
                inline-flex
                h-11
                items-center
                justify-between
                gap-3
                rounded-full
                border
                px-5
                text-[8px]
                font-bold
                uppercase
                tracking-[0.15em]
                shadow-[0_12px_36px_var(--color-accent-soft)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:brightness-110
                sm:bottom-6
                sm:left-auto
                sm:right-6
                sm:w-auto
                sm:min-w-[170px]
                sm:justify-center
                sm:gap-4
                sm:px-6
                sm:text-[9px]
                sm:tracking-[0.18em]
              "
              style={{
                background:
                  "var(--color-accent)",
                borderColor:
                  "var(--color-accent)",
                color:
                  "var(--color-accent-contrast)",
                fontFamily:
                  "var(--font-mono-family, monospace)",
              }}
            >
              <span>
                {
                  contact.directionsButton
                }
              </span>

              <Navigation
                size={15}
                className="
                  shrink-0
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>
          </div>
        </div>

        {/* INFO STRIP */}

        <div
          className="
            mt-10
            grid
            min-w-0
            border-y
            md:mt-12
            md:grid-cols-3
          "
          style={{
            borderColor:
              "var(--color-border)",
          }}
        >
          <InfoItem
            icon={
              <MapPin
                size={14}
              />
            }
            label={
              contact.addressLabel
            }
            value={
              data.fullAddress
            }
          />

          <InfoItem
            icon={
              <Clock3
                size={14}
              />
            }
            label={
              contact.scheduleLabel
            }
            value={
              config.operation
                .schedule
            }
            borderLeft
          />

          <div
            className="
              min-w-0
              border-t
              p-5
              md:border-l
              md:border-t-0
              md:p-7
            "
            style={{
              borderColor:
                "var(--color-border)",
            }}
          >
            <div
              className="
                mb-4
                font-mono
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[var(--color-text-subtle)]
              "
            >
              {
                contact.directChannelsLabel
              }
            </div>

            <div className="space-y-3">
              <DirectChannel
                href={`tel:${data.phone}`}
                icon={
                  <Phone
                    size={14}
                  />
                }
              >
                {data.phone}
              </DirectChannel>

              <DirectChannel
                href={`mailto:${data.email}`}
                icon={
                  <Mail
                    size={14}
                  />
                }
              >
                {data.email}
              </DirectChannel>

              <DirectChannel
                href={
                  data.instagram
                }
                icon={
                  <InstagramIcon />
                }
                external
              >
                {
                  contact.instagramLabel
                }
              </DirectChannel>
            </div>
          </div>
        </div>

        {/* FORM */}

        <div
          className="
            mt-12
            border-t
            pt-12
            sm:mt-14
            sm:pt-14
            md:mt-20
            md:pt-20
          "
          style={{
            borderColor:
              "var(--color-border)",
          }}
        >
          <div
            className="
              grid
              min-w-0
              gap-10
              lg:grid-cols-[0.8fr_1.2fr]
              lg:gap-20
            "
          >
            <div className="min-w-0">
              <div
                className="
                  mb-3
                  font-mono
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[var(--color-accent)]
                  sm:mb-4
                  sm:text-[9px]
                  sm:tracking-[0.22em]
                "
              >
                {
                  contact.formEyebrow
                }
              </div>

              <h3
                className="
                  max-w-xl
                  break-words
                  text-[clamp(2.6rem,11vw,5.2rem)]
                  leading-[0.85]
                  tracking-[-0.065em]
                  sm:text-[clamp(2.8rem,4.5vw,5.2rem)]
                  sm:tracking-[-0.06em]
                "
                style={{
                  fontFamily:
                    "var(--font-display, serif)",
                  fontWeight: 400,
                }}
              >
                {
                  contact.formTitulo
                }
              </h3>
            </div>

            <div className="min-w-0 pt-0 lg:pt-4">
              <ContactForm
                config={config}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SPLIT CONTACT
========================================================= */

function SplitContact({
  config,
}: {
  config: SiteConfig;
}) {
  const contact =
    config.content.contact;

  const data =
    config.contact;

  return (
    <section
      id="contacto"
      className="
        py-16
        sm:py-20
        md:py-28
      "
      style={{
        background:
          "var(--color-bg)",
        color:
          "var(--color-text)",
      }}
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-4
          sm:px-5
          md:px-8
          lg:px-12
        "
      >
        <div
          className="
            grid
            min-w-0
            overflow-hidden
            rounded-[24px]
            border
            sm:rounded-[28px]
            lg:grid-cols-[0.94fr_1.06fr]
          "
          style={{
            borderColor:
              "var(--color-border)",
            background:
              "var(--color-surface)",
          }}
        >
          {/* IMAGE */}

          <div
            className="
              relative
              min-h-[430px]
              sm:min-h-[540px]
              lg:min-h-[760px]
            "
          >
            <img
              src={
                config.content
                  .hero.image
              }
              alt=""
              draggable={false}
              className="
                absolute
                inset-0
                h-full
                w-full
                select-none
                object-cover
              "
            />

            <div
              className="
                absolute
                inset-0
              "
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.52) 0%, transparent 38%, rgba(0,0,0,0.76) 100%)",
              }}
            />

            {/* IMAGE TOP */}

            <div
              className="
                absolute
                left-5
                right-5
                top-5
                flex
                flex-col
                items-start
                gap-3
                sm:left-9
                sm:right-9
                sm:top-9
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <span
                className="
                  max-w-full
                  font-mono
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  sm:text-[10px]
                  sm:tracking-[0.18em]
                "
                style={{
                  color:
                    "#FFFFFF",
                }}
              >
                {
                  contact.eyebrow
                }
              </span>

              <span
                className="
                  flex
                  items-center
                  gap-2
                  font-mono
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.13em]
                  sm:text-[9px]
                  sm:tracking-[0.16em]
                "
                style={{
                  color:
                    "#FFFFFF",
                }}
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                  "
                  style={{
                    background:
                      "var(--color-accent)",
                  }}
                />

                {
                  contact.statusBadge
                }
              </span>
            </div>

            {/* IMAGE BOTTOM */}

            <div
              className="
                absolute
                bottom-7
                left-5
                right-5
                sm:bottom-10
                sm:left-9
                sm:right-9
              "
            >
              <div
                className="
                  mb-3
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.14em]
                  sm:mb-4
                  sm:text-[10px]
                  sm:tracking-[0.16em]
                "
                style={{
                  color:
                    "#FFFFFF",
                  opacity: 0.82,
                  textShadow:
                    "0 1px 6px rgba(0,0,0,0.45)",
                }}
              >
                {
                  contact.mainLabel
                }
              </div>

              <h2
                className="
                  max-w-2xl
                  break-words
                  text-[clamp(3rem,13vw,7rem)]
                  leading-[0.84]
                  tracking-[-0.065em]
                  sm:text-[clamp(3.5rem,7vw,7rem)]
                  sm:tracking-[-0.06em]
                "
                style={{
                  color:
                    "#FFFFFF",
                  fontFamily:
                    "var(--font-display, serif)",
                  fontWeight: 400,
                  textShadow:
                    "0 2px 20px rgba(0,0,0,0.25)",
                }}
              >
                {
                  contact.title
                }
              </h2>

              <p
                className="
                  mt-5
                  max-w-xl
                  break-words
                  text-[11px]
                  leading-6
                  sm:mt-7
                  sm:text-xs
                "
                style={{
                  color:
                    "#FFFFFF",
                  opacity: 0.86,
                  fontFamily:
                    "var(--font-body, sans-serif)",
                  textShadow:
                    "0 1px 7px rgba(0,0,0,0.5)",
                }}
              >
                {
                  data.fullAddress
                }
              </p>
            </div>
          </div>

          {/* FORM SIDE */}

          <div
            className="
              min-w-0
              p-5
              sm:p-8
              md:p-10
              lg:p-14
            "
          >
            <div
              className="
                mb-3
                font-mono
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[var(--color-accent-strong)]
                sm:mb-4
                sm:text-[10px]
                sm:tracking-[0.18em]
              "
            >
              {
                contact.formEyebrow
              }
            </div>

            <h3
              className="
                max-w-2xl
                break-words
                text-[clamp(2.5rem,11vw,4.7rem)]
                leading-[0.88]
                tracking-[-0.05em]
                sm:text-[clamp(2.5rem,4vw,4.7rem)]
                sm:leading-[0.9]
                sm:tracking-[-0.045em]
              "
              style={{
                fontFamily:
                  "var(--font-display, serif)",
                fontWeight: 400,
              }}
            >
              {
                contact.formTitulo
              }
            </h3>

            <p
              className="
                mt-5
                max-w-xl
                break-words
                text-[13px]
                leading-7
                sm:text-sm
              "
              style={{
                color:
                  "var(--color-text-muted)",
                fontFamily:
                  "var(--font-body, sans-serif)",
              }}
            >
              {
                contact.formSubtitulo
              }
            </p>

            <div
              className="
                mt-9
                sm:mt-12
              "
            >
              <ContactForm
                config={config}
              />
            </div>

            <div
              className="
                mt-10
                border-t
                pt-6
                sm:mt-14
                sm:pt-7
              "
              style={{
                borderColor:
                  "var(--color-border)",
              }}
            >
              <div className="space-y-4">
                <DirectChannel
                  href={`tel:${data.phone}`}
                  icon={
                    <Phone
                      size={14}
                    />
                  }
                >
                  {data.phone}
                </DirectChannel>

                <DirectChannel
                  href={`mailto:${data.email}`}
                  icon={
                    <Mail
                      size={14}
                    />
                  }
                >
                  {data.email}
                </DirectChannel>

                <DirectChannel
                  href={
                    data.instagram
                  }
                  icon={
                    <InstagramIcon />
                  }
                  external
                >
                  {
                    contact.instagramLabel
                  }
                </DirectChannel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MINIMAL
========================================================= */

function MinimalContact({
  config,
}: {
  config: SiteConfig;
}) {
  const contact =
    config.content.contact;

  const data =
    config.contact;

  return (
    <section
      id="contacto"
      className="
        py-20
        sm:py-24
        md:py-36
      "
      style={{
        background:
          "var(--color-bg)",
        color:
          "var(--color-text)",
      }}
    >
      <div
        className="
          mx-auto
          w-full
          max-w-6xl
          px-4
          sm:px-6
        "
      >
        <div
          className="
            grid
            min-w-0
            gap-12
            lg:grid-cols-[0.8fr_1.2fr]
            lg:gap-16
          "
        >
          <div className="min-w-0">
            <div
              className="
                mb-5
                font-mono
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[var(--color-accent)]
                sm:mb-6
                sm:text-[10px]
                sm:tracking-[0.18em]
              "
            >
              {
                contact.eyebrow
              }
            </div>

            <h2
              className="
                break-words
                text-[clamp(3rem,13vw,7rem)]
                leading-[0.84]
                tracking-[-0.06em]
                sm:text-[clamp(3.4rem,7vw,7rem)]
                sm:leading-[0.86]
                sm:tracking-[-0.055em]
              "
              style={{
                fontFamily:
                  "var(--font-display, serif)",
                fontWeight: 400,
              }}
            >
              {
                contact.title
              }
            </h2>

            <p
              className="
                mt-6
                max-w-md
                break-words
                text-[13px]
                leading-7
                sm:mt-8
                sm:text-sm
              "
              style={{
                color:
                  "var(--color-text-muted)",
                fontFamily:
                  "var(--font-body, sans-serif)",
              }}
            >
              {
                contact.formSubtitulo
              }
            </p>

            <div
              className="
                mt-8
                space-y-4
                sm:mt-10
              "
            >
              <DirectChannel
                href={`tel:${data.phone}`}
                icon={
                  <Phone
                    size={14}
                  />
                }
              >
                {data.phone}
              </DirectChannel>

              <DirectChannel
                href={`mailto:${data.email}`}
                icon={
                  <Mail
                    size={14}
                  />
                }
              >
                {data.email}
              </DirectChannel>

              <div
                className="
                  flex
                  min-w-0
                  items-start
                  gap-3
                  text-sm
                "
                style={{
                  color:
                    "var(--color-text)",
                  fontFamily:
                    "var(--font-body, sans-serif)",
                }}
              >
                <MapPin
                  size={14}
                  className="
                    mt-0.5
                    shrink-0
                  "
                />

                <span className="min-w-0 break-words">
                  {
                    data.fullAddress
                  }
                </span>
              </div>
            </div>
          </div>

          <div
            className="
              min-w-0
              border-t
              pt-9
              lg:border-l
              lg:border-t-0
              lg:pl-12
              lg:pt-0
            "
            style={{
              borderColor:
                "var(--color-border)",
            }}
          >
            <div
              className="
                mb-6
                font-mono
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[var(--color-text-subtle)]
                sm:mb-8
                sm:text-[10px]
                sm:tracking-[0.18em]
              "
            >
              {
                contact.formEyebrow
              }
            </div>

            <ContactForm
              config={config}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function Contact() {
  const {
    preset,
    config,
  } =
    useRestaurantContext();

  const variant =
    preset.visual?.contact ??
    "minimal";

  if (
    variant === "map"
  ) {
    return (
      <MapContact
        config={config}
      />
    );
  }

  if (
    variant === "split"
  ) {
    return (
      <SplitContact
        config={config}
      />
    );
  }

  return (
    <MinimalContact
      config={config}
    />
  );
}