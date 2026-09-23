"use client";

import {
  ArrowUp,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import type {
  SiteConfig,
} from "@/config/site";

import {
  useRestaurantContext,
} from "@/hooks/use-restaurant-context";

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
   BACK TO TOP
   ========================================================= */

function BackToTop({
  label,
  inverse = false,
}: {
  label: string;
  inverse?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="group inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition-opacity hover:opacity-60"
      style={{
        color: inverse
          ? "#FFFFFF"
          : "var(--color-text)",

        fontFamily:
          "var(--font-mono-family, monospace)",

        textShadow: inverse
          ? "0 1px 4px rgba(0,0,0,0.65)"
          : "none",
      }}
    >
      {label}

      <span
        className="flex h-8 w-8 items-center justify-center rounded-full border transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{
          background:
            inverse
              ? "rgba(0,0,0,0.24)"
              : "transparent",

          borderColor:
            inverse
              ? "rgba(255,255,255,0.68)"
              : "var(--color-border-strong)",

          boxShadow:
            inverse
              ? "0 4px 18px rgba(0,0,0,0.18)"
              : "none",

          backdropFilter:
            inverse
              ? "blur(6px)"
              : "none",
        }}
      >
        <ArrowUp size={13} />
      </span>
    </button>
  );
}

/* =========================================================
   EDITORIAL FOOTER
   ========================================================= */

function EditorialFooter({
  config,
}: {
  config: SiteConfig;
}) {
  const footer =
    config.content.footer;

  const contact =
    config.contact;

  return (
    <footer
      style={{
        background:
          "var(--color-bg)",
        color:
          "var(--color-text)",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20 lg:px-14">
        <div
          className="mb-14 h-px w-full"
          style={{
            background:
              "var(--color-accent)",
          }}
        />

        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <div>
            <div
              className="mb-7 text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{
                color:
                  "var(--color-accent)",
                fontFamily:
                  "var(--font-mono-family, monospace)",
              }}
            >
              {
                config.brand.descriptor
              }
            </div>

            <div
              className="max-w-4xl text-[clamp(3rem,7.8vw,7.4rem)] leading-[0.78] tracking-[-0.055em]"
              style={{
                color:
                  "var(--color-text)",
                fontFamily:
                  "var(--font-display, serif)",
                fontWeight:
                  400,
              }}
            >
              {
                config.brand.name
              }
            </div>

            <p
              className="mt-9 max-w-lg text-sm leading-7"
              style={{
                color:
                  "var(--color-text-muted)",
                fontFamily:
                  "var(--font-body, sans-serif)",
              }}
            >
              {
                footer.description
              }
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-2">
            <div>
              <div
                className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{
                  color:
                    "var(--color-text-subtle)",
                  fontFamily:
                    "var(--font-mono-family, monospace)",
                }}
              >
                {
                  footer.navigationLabel
                }
              </div>

              <nav className="space-y-3">
                {config.navigation.links.map(
                  (link) => (
                    <a
                      key={
                        link.href
                      }
                      href={`#${link.href}`}
                      className="group flex items-center gap-2 text-sm transition-opacity hover:opacity-60"
                      style={{
                        color:
                          "var(--color-text)",
                        fontFamily:
                          "var(--font-body, sans-serif)",
                      }}
                    >
                      {
                        link.label
                      }

                      <ArrowUpRight
                        size={13}
                        className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                        style={{
                          color:
                            "var(--color-accent)",
                        }}
                      />
                    </a>
                  ),
                )}
              </nav>
            </div>

            <div>
              <div
                className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{
                  color:
                    "var(--color-text-subtle)",
                  fontFamily:
                    "var(--font-mono-family, monospace)",
                }}
              >
                {
                  footer.contactLabel
                }
              </div>

              <div className="space-y-4">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-start gap-3 text-sm transition-opacity hover:opacity-60"
                  style={{
                    color:
                      "var(--color-text)",
                    fontFamily:
                      "var(--font-body, sans-serif)",
                  }}
                >
                  <Phone
                    size={14}
                    className="mt-0.5 shrink-0"
                  />

                  {
                    contact.phone
                  }
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-3 text-sm transition-opacity hover:opacity-60"
                  style={{
                    color:
                      "var(--color-text)",
                    fontFamily:
                      "var(--font-body, sans-serif)",
                  }}
                >
                  <Mail
                    size={14}
                    className="mt-0.5 shrink-0"
                  />

                  <span className="break-all">
                    {
                      contact.email
                    }
                  </span>
                </a>

                <div
                  className="flex items-start gap-3 text-sm"
                  style={{
                    color:
                      "var(--color-text)",
                    fontFamily:
                      "var(--font-body, sans-serif)",
                  }}
                >
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0"
                  />

                  {
                    contact.fullAddress
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col gap-6 border-t pt-7 md:flex-row md:items-center md:justify-between"
          style={{
            borderColor:
              "var(--color-border)",
          }}
        >
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            <a
              href={
                contact.instagram
              }
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-60"
              style={{
                color:
                  "var(--color-text)",
                fontFamily:
                  "var(--font-mono-family, monospace)",
              }}
            >
              <InstagramIcon />

              {
                footer.instagramLabel
              }
            </a>

            <a
              href={`https://wa.me/${config.ordering.whatsapp.number}`}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-60"
              style={{
                color:
                  "var(--color-text)",
                fontFamily:
                  "var(--font-mono-family, monospace)",
              }}
            >
              {
                footer.whatsappLabel
              }
            </a>
          </div>

          <BackToTop
            label={
              footer.backToTop
            }
          />
        </div>
      </div>

      <div
        className="border-t px-6 py-5 md:px-10 lg:px-14"
        style={{
          background:
            "var(--color-bg-elevated)",
          borderColor:
            "var(--color-border)",
        }}
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 text-[9px] uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between">
          <span
            style={{
              color:
                "var(--color-text-subtle)",
              fontFamily:
                "var(--font-mono-family, monospace)",
            }}
          >
            {
              footer.credits
            }
          </span>

          <span
            style={{
              color:
                "var(--color-text-subtle)",
              fontFamily:
                "var(--font-mono-family, monospace)",
            }}
          >
            {
              footer.identityLabel
            }
          </span>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   MINIMAL / CAFE FOOTER
   ========================================================= */

function MinimalFooter({
  config,
}: {
  config: SiteConfig;
}) {
  const footer =
    config.content.footer;

  const contact =
    config.contact;

  return (
    <footer
      style={{
        background:
          "var(--color-bg)",
        color:
          "var(--color-text)",
      }}
    >
      <div className="relative h-[430px] overflow-hidden md:h-[540px]">
        <img
          src={
            footer.backgroundImage
          }
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.12) 32%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-10 md:px-10 md:pb-12 lg:px-14">
          <div
            className="max-w-5xl text-[clamp(3.5rem,9.6vw,8.7rem)] leading-[0.8] tracking-[-0.06em]"
            style={{
              color:
                "#FFFFFF",
              fontFamily:
                "var(--font-display, serif)",
              fontWeight:
                400,

              textShadow:
                "0 2px 22px rgba(0,0,0,0.28)",
            }}
          >
            {
              config.brand.name
            }
          </div>

          <p
            className="mt-7 max-w-md text-sm leading-7"
            style={{
              color:
                "#FFFFFF",
              opacity:
                0.86,
              fontFamily:
                "var(--font-body, sans-serif)",
              textShadow:
                "0 1px 8px rgba(0,0,0,0.5)",
            }}
          >
            {
              footer.description
            }
          </p>

          <div className="mt-8">
            <BackToTop
              label={
                footer.backToTop
              }
              inverse
            />
          </div>
        </div>
      </div>

      <div
        className="border-t"
        style={{
          background:
            "var(--color-surface)",
          borderColor:
            "var(--color-border)",
        }}
      >
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-2 lg:grid-cols-4">
          <FooterInfo
            label={
              footer.establishmentLabel
            }
            value={
              config.brand.descriptor
            }
          />

          <FooterInfo
            label={
              footer.locationLabel
            }
            value={
              contact.fullAddress
            }
          />

          <FooterInfo
            label={
              footer.hoursLabel
            }
            value={
              config.operation.schedule
            }
          />

          <div
            className="border-t p-7 md:border-l md:border-t-0"
            style={{
              borderColor:
                "var(--color-border)",
            }}
          >
            <div
              className="mb-5 text-[10px] font-semibold uppercase tracking-[0.17em]"
              style={{
                color:
                  "var(--color-text-subtle)",
                fontFamily:
                  "var(--font-mono-family, monospace)",
              }}
            >
              {
                footer.socialsLabel
              }
            </div>

            <div className="space-y-3">
              <a
                href={
                  contact.instagram
                }
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm transition-opacity hover:opacity-60"
                style={{
                  color:
                    "var(--color-text)",
                  fontFamily:
                    "var(--font-body, sans-serif)",
                }}
              >
                <InstagramIcon />

                {
                  footer.instagramLabel
                }
              </a>

              <a
                href={`https://wa.me/${config.ordering.whatsapp.number}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm transition-opacity hover:opacity-60"
                style={{
                  color:
                    "var(--color-text)",
                  fontFamily:
                    "var(--font-body, sans-serif)",
                }}
              >
                {
                  footer.whatsappLabel
                }
              </a>
            </div>
          </div>
        </div>

        <div
          className="border-t px-6 py-5 md:px-10 lg:px-14"
          style={{
            borderColor:
              "var(--color-border)",
          }}
        >
          <div className="mx-auto flex max-w-[1400px] flex-col gap-2 text-[9px] uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between">
            <span
              style={{
                color:
                  "var(--color-text-subtle)",
                fontFamily:
                  "var(--font-mono-family, monospace)",
              }}
            >
              {
                footer.credits
              }
            </span>

            <span
              style={{
                color:
                  "var(--color-text-subtle)",
                fontFamily:
                  "var(--font-mono-family, monospace)",
              }}
            >
              {
                config.brand.tagline
              }
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   COMPACT
   ========================================================= */

function CompactFooter({
  config,
}: {
  config: SiteConfig;
}) {
  const footer =
    config.content.footer;

  const contact =
    config.contact;

  return (
    <footer
      className="border-t"
      style={{
        background:
          "var(--color-bg)",
        borderColor:
          "var(--color-border)",
        color:
          "var(--color-text)",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-7 px-6 py-9 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
        <div>
          <div
            className="text-xl"
            style={{
              fontFamily:
                "var(--font-display, serif)",
            }}
          >
            {
              config.brand.name
            }
          </div>

          <div
            className="mt-2 text-[9px] uppercase tracking-[0.16em]"
            style={{
              color:
                "var(--color-text-subtle)",
              fontFamily:
                "var(--font-mono-family, monospace)",
            }}
          >
            {
              footer.description
            }
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
          <a
            href={`tel:${contact.phone}`}
            className="text-[10px] uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
            style={{
              color:
                "var(--color-text)",
              fontFamily:
                "var(--font-mono-family, monospace)",
            }}
          >
            {
              contact.phone
            }
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="text-[10px] uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
            style={{
              color:
                "var(--color-text)",
              fontFamily:
                "var(--font-mono-family, monospace)",
            }}
          >
            {
              contact.email
            }
          </a>

          <BackToTop
            label={
              footer.backToTop
            }
          />
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   SUPPORT
   ========================================================= */

function FooterInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="border-t p-7 md:border-r md:border-t-0"
      style={{
        borderColor:
          "var(--color-border)",
      }}
    >
      <div
        className="mb-5 text-[10px] font-semibold uppercase tracking-[0.17em]"
        style={{
          color:
            "var(--color-text-subtle)",
          fontFamily:
            "var(--font-mono-family, monospace)",
        }}
      >
        {label}
      </div>

      <p
        className="text-sm leading-6"
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
   MAIN
   ========================================================= */

export default function Footer() {
  const {
    preset,
    config,
  } =
    useRestaurantContext();

  const variant =
    preset.visual?.footer ??
    "compact";

  if (
    variant === "editorial"
  ) {
    return (
      <EditorialFooter
        config={
          config
        }
      />
    );
  }

  if (
    variant === "minimal"
  ) {
    return (
      <MinimalFooter
        config={
          config
        }
      />
    );
  }

  return (
    <CompactFooter
      config={
        config
      }
    />
  );
}