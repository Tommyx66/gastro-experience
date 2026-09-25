"use client";

import Link from "next/link";

import {
  Suspense,
  useState,
  type ReactNode,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  MapPin,
  Minus,
  Moon,
  Plus,
  QrCode,
  Receipt,
  Send,
  ShoppingBag,
  Sparkles,
  Sun,
  Trash2,
  User,
} from "lucide-react";
import type { GastroNiche } from "@/config/presets/types";
import { toast } from "sonner";

import {
  buildWhatsAppOrder,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";

import {
  useCartStore,
  type ActiveOrder,
} from "@/store/use-cart-store";

import {
  useRestaurantContext,
} from "@/hooks/use-restaurant-context";

import {
  useThemeStore,
} from "@/store/use-theme-store";

import {
  GastroProvider,
  useGastro,
} from "@/context/gastro-context";

import {
  Button,
  buttonVariants,
} from "@/components/ui/Button";

import TextAnimate from "@/components/ui/text-animate";
import DemoSwitcher from "@/components/ui/DemoSwitcher";

type FulfillmentMode =
  | "delivery"
  | "pickup";

type CheckoutCopy =
  (typeof import("@/config/site").siteConfig)["content"]["checkout"];

/* =========================================================
   FORMATTERS
========================================================= */

function formatMoney(
  value: number,
) {
  return `$${value.toLocaleString(
    "es-AR",
  )}`;
}

/* =========================================================
   PAYMENT ICON
========================================================= */

function PaymentIcon({
  id,
}: {
  id: string;
}) {
  if (id === "cash") {
    return (
      <Banknote
        size={16}
        strokeWidth={1.7}
      />
    );
  }

  if (id === "card") {
    return (
      <CreditCard
        size={16}
        strokeWidth={1.7}
      />
    );
  }

  if (id === "transfer") {
    return (
      <QrCode
        size={16}
        strokeWidth={1.7}
      />
    );
  }

  return (
    <Receipt
      size={16}
      strokeWidth={1.7}
    />
  );
}

/* =========================================================
   THEME CONTROL
========================================================= */

function ThemeControl() {
  const {
    theme,
    toggleTheme,
  } = useThemeStore();

  const {
    config,
  } = useGastro();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        config.content.navbarUi
          .ariaChangeTheme
      }
      title={
        theme === "dark"
          ? config.content.navbarUi
              .themeDark
          : config.content.navbarUi
              .themeLight
      }
      className="
        group
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        border-[var(--color-border)]
        bg-[var(--color-control)]
        text-[var(--color-text-muted)]
        transition-all
        duration-300
        hover:border-[var(--color-accent-border)]
        hover:bg-[var(--color-accent-soft)]
        hover:text-[var(--color-accent)]
        active:scale-[0.94]
      "
    >
      {theme === "dark" ? (
        <Moon
          size={14}
          strokeWidth={1.7}
          className="
            transition-transform
            duration-300
            group-hover:rotate-[-12deg]
          "
        />
      ) : (
        <Sun
          size={14}
          strokeWidth={1.7}
          className="
            transition-transform
            duration-300
            group-hover:rotate-45
          "
        />
      )}
    </button>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header({
  isTableMode,
  tableNumber,
}: {
  isTableMode: boolean;
  tableNumber: string | null;
}) {
  const {
    config,
    niche,
  } = useGastro();

  const copy =
    config.content.checkout;

  const hasMesaReference =
    Boolean(tableNumber);

  const backHref =
    hasMesaReference
      ? `/?type=${encodeURIComponent(
          niche,
        )}&mesa=${encodeURIComponent(
          tableNumber ?? "",
        )}#menu`
      : `/?type=${encodeURIComponent(
          niche,
        )}#menu`;

  return (
    <header
      className="
        sticky
        top-3
        z-50
        mx-auto
        w-[calc(100%-8px)]
        max-w-5xl
        rounded-full
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]/92
        p-1.5
        shadow-[0_18px_60px_rgba(0,0,0,0.14)]
        backdrop-blur-2xl
      "
    >
      <div
        className="
          grid
          min-h-[52px]
          grid-cols-[40px_minmax(0,1fr)_40px]
          items-center
          gap-2
        "
      >
        <Link
          href={backHref}
          aria-label={
            copy.header.backLabel
          }
          className="
            group
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-[var(--color-border)]
            bg-[var(--color-control)]
            text-[var(--color-text-muted)]
            transition-all
            duration-300
            hover:border-[var(--color-accent-border)]
            hover:bg-[var(--color-accent-soft)]
            hover:text-[var(--color-accent)]
            active:scale-[0.94]
          "
        >
          <ArrowLeft
            size={15}
            strokeWidth={1.8}
            className="
              transition-transform
              duration-300
              group-hover:-translate-x-0.5
            "
          />
        </Link>

        <div className="min-w-0 px-1 text-center">
          <span
            className="
              block
              truncate
              font-mono
              text-[7px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[var(--color-accent)]
              min-[380px]:text-[8px]
              sm:text-[9px]
              sm:tracking-[0.28em]
            "
          >
            {isTableMode
              ? `${copy.header.tablePrefix} ${tableNumber}`
              : copy.header.title}
          </span>

          <span
            className="
              mt-0.5
              hidden
              truncate
              font-mono
              text-[7px]
              uppercase
              tracking-[0.16em]
              text-[var(--color-text-subtle)]
              sm:block
            "
          >
            {isTableMode
              ? "Servicio en mesa"
              : hasMesaReference
                ? "Pedido con referencia de mesa"
                : "Pedido online"}
          </span>
        </div>

        <div className="flex justify-end">
          <ThemeControl />
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        className="
          mb-2
          block
          px-1
          font-mono
          text-[8px]
          font-bold
          uppercase
          tracking-[0.22em]
          text-[var(--color-text-subtle)]
        "
      >
        {label}
      </label>

      <div
        className="
          flex
          min-h-[54px]
          min-w-0
          items-center
          gap-3
          rounded-[18px]
          border
          border-[var(--color-border)]
          bg-[var(--color-control)]
          px-3.5
          transition-all
          duration-300
          hover:border-[var(--color-border-strong)]
          hover:bg-[var(--color-control-hover)]
          focus-within:border-[var(--color-accent-border)]
          focus-within:bg-[var(--color-accent-faint)]
          focus-within:shadow-[0_0_0_3px_var(--color-accent-faint)]
        "
      >
        <span
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[var(--color-accent-soft)]
            text-[var(--color-accent)]
          "
        >
          {icon}
        </span>

        <div className="min-w-0 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ORDER SUMMARY
========================================================= */

function OrderSummary({
  subtotal,
  discount,
  total,
  discountPercent,
}: {
  subtotal: number;
  discount: number;
  total: number;
  discountPercent: number;
}) {
  const {
    config,
  } = useGastro();

  const copy =
    config.content.checkout
      .summary;

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-[var(--color-border)]
        bg-[var(--color-bg-elevated)]
        p-5
        sm:p-6
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-[var(--color-accent-soft)]
          blur-3xl
        "
      />

      <div className="relative min-w-0">
        <div
          className="
            flex
            min-w-0
            items-start
            justify-between
            gap-4
          "
        >
          <div className="min-w-0">
            <span
              className="
                block
                font-mono
                text-[8px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[var(--color-accent)]
              "
            >
              Resumen
            </span>

            <span
              className="
                mt-1
                block
                text-[11px]
                leading-relaxed
                text-[var(--color-text-muted)]
              "
            >
              {copy.completedLabel}
            </span>
          </div>

          <span
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[var(--color-accent-soft)]
              text-[var(--color-accent)]
            "
          >
            <Receipt
              size={16}
              strokeWidth={1.6}
            />
          </span>
        </div>

        <div
          className="
            mt-6
            space-y-3
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              text-sm
            "
          >
            <span className="min-w-0 text-[var(--color-text-muted)]">
              {copy.subtotal}
            </span>

            <span
              className="
                shrink-0
                font-mono
                text-xs
                font-semibold
                tabular-nums
              "
            >
              {formatMoney(
                subtotal,
              )}
            </span>
          </div>

          {discount > 0 && (
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                text-sm
                text-[var(--color-success)]
              "
            >
              <span className="min-w-0">
                {copy.cashPrefix} ·{" "}
                {discountPercent}%
              </span>

              <span
                className="
                  shrink-0
                  font-mono
                  text-xs
                  font-semibold
                  tabular-nums
                "
              >
                -{formatMoney(
                  discount,
                )}
              </span>
            </div>
          )}
        </div>

        <div
          className="
            my-5
            h-px
            bg-[var(--color-border)]
          "
        />

        <div
          className="
            flex
            min-w-0
            items-end
            justify-between
            gap-4
          "
        >
          <div className="min-w-0">
            <span
              className="
                block
                font-mono
                text-[8px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[var(--color-text-subtle)]
              "
            >
              Total
            </span>

            <p
              className="
                mt-1
                text-[10px]
                leading-relaxed
                text-[var(--color-text-muted)]
              "
            >
              {copy.total}
            </p>
          </div>

          <span
            className="
              shrink-0
              text-[clamp(2rem,8vw,3.8rem)]
              font-light
              leading-none
              tracking-[-0.065em]
              tabular-nums
            "
          >
            {formatMoney(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PRODUCT ROW
========================================================= */

function ProductRow({
  item,
  onRemove,
  onDecrease,
  onIncrease,
  copy,
  index,
}: {
  item: ReturnType<
    typeof useCartStore.getState
  >["items"][number];

  onRemove: () => void;
  onDecrease: () => void;
  onIncrease: () => void;

  copy: CheckoutCopy;
  index: number;
}) {
  const itemTotal =
    item.price * item.quantity;

  return (
    <article
      className="
        group
        relative
        border-b
        border-[var(--color-border)]
        py-5
        sm:py-8
      "
    >
      <div
        className="
          grid
          min-w-0
          grid-cols-[68px_minmax(0,1fr)]
          gap-3.5
          min-[380px]:grid-cols-[76px_minmax(0,1fr)]
          sm:grid-cols-[96px_minmax(0,1fr)]
          sm:gap-5
        "
      >
        {/* IMAGE */}

        <div
          className="
            relative
            aspect-square
            w-full
            min-w-0
            shrink-0
            overflow-hidden
            rounded-[18px]
            border
            border-[var(--color-border)]
            bg-[var(--color-surface-elevated)]
            sm:rounded-[20px]
          "
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              draggable={false}
              className="
                h-full
                w-full
                select-none
                object-cover
                transition-transform
                duration-700
                ease-[cubic-bezier(0.16,1,0.3,1)]
                group-hover:scale-[1.04]
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                text-[var(--color-accent)]
              "
            >
              <ShoppingBag
                size={21}
                strokeWidth={1.4}
              />
            </div>
          )}

          <span
            className="
              absolute
              bottom-2
              left-2
              flex
              h-6
              min-w-6
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-black/55
              px-1.5
              font-mono
              text-[8px]
              font-bold
              text-white
              shadow-lg
              backdrop-blur-md
            "
          >
            {item.quantity}
          </span>
        </div>

        {/* CONTENT */}

        <div className="min-w-0">
          {/* TOP */}

          <div
            className="
              flex
              min-w-0
              items-start
              gap-3
            "
          >
            <div className="min-w-0 flex-1">
              <div
                className="
                  mb-1
                  flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    font-mono
                    text-[8px]
                    font-bold
                    tracking-[0.16em]
                    text-[var(--color-accent)]
                  "
                >
                  {String(
                    index + 1,
                  ).padStart(
                    2,
                    "0",
                  )}
                </span>

                <span
                  className="
                    h-px
                    w-4
                    shrink-0
                    bg-[var(--color-border-strong)]
                  "
                />
              </div>

              <h2
                className="
                  break-words
                  text-[15px]
                  font-semibold
                  leading-[1.1]
                  tracking-[-0.025em]
                  sm:text-[18px]
                  sm:leading-tight
                "
              >
                {item.name}
              </h2>

              <p
                className="
                  mt-1
                  break-words
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.11em]
                  text-[var(--color-text-subtle)]
                  sm:text-[9px]
                "
              >
                {formatMoney(item.price)}{" "}
                {copy.selection.perUnit}
              </p>
            </div>

            <span
              className="
                max-w-[40%]
                shrink-0
                text-right
                font-mono
                text-[11px]
                font-bold
                leading-tight
                tabular-nums
                sm:text-sm
              "
            >
              {formatMoney(
                itemTotal,
              )}
            </span>
          </div>

          {/* OPTIONS */}

          {item.options?.length > 0 && (
            <div
              className="
                mt-3
                space-y-1
                border-l
                border-[var(--color-accent-border)]
                pl-3
              "
            >
              {item.options.map(
                (
                  option,
                ) => (
                  <p
                    key={`${option.groupId}-${option.itemId}`}
                    className="
                      break-words
                      text-[10px]
                      leading-[1.45]
                      text-[var(--color-text-muted)]
                      sm:text-[11px]
                    "
                  >
                    <span className="text-[var(--color-text-subtle)]">
                      {
                        option.groupName
                      }
                    </span>

                    <span className="mx-1 text-[var(--color-text-subtle)]">
                      ·
                    </span>

                    <span className="text-[var(--color-text)]">
                      {
                        option.itemName
                      }
                    </span>
                  </p>
                ),
              )}
            </div>
          )}

          {/* NOTE */}

          {item.notes && (
            <p
              className="
                mt-2.5
                break-words
                text-[10px]
                italic
                leading-relaxed
                text-[var(--color-text-subtle)]
              "
            >
              “{item.notes}”
            </p>
          )}

          {/* ACTIONS */}

          <div
            className="
              mt-4
              flex
              min-w-0
              items-center
              justify-between
              gap-3
            "
          >
            <button
              type="button"
              onClick={
                onRemove
              }
              aria-label={`${copy.selection.remove} ${item.name}`}
              className="
                group/remove
                inline-flex
                min-w-0
                items-center
                gap-1.5
                rounded-full
                border
                border-transparent
                px-2
                py-1.5
                font-mono
                text-[8px]
                font-bold
                uppercase
                tracking-[0.11em]
                text-[var(--color-text-subtle)]
                transition-all
                duration-200
                hover:border-[rgba(248,113,113,0.18)]
                hover:bg-[rgba(248,113,113,0.08)]
                hover:text-[var(--color-danger)]
                active:scale-95
              "
            >
              <Trash2
                size={11}
                strokeWidth={1.8}
                className="
                  shrink-0
                  transition-transform
                  duration-200
                  group-hover/remove:scale-110
                "
              />

              <span className="truncate">
                {copy.selection.remove}
              </span>
            </button>

            <div
              className="
                flex
                shrink-0
                items-center
                rounded-full
                border
                border-[var(--color-border)]
                bg-[var(--color-control)]
                p-1
                shadow-sm
              "
            >
              <button
                type="button"
                onClick={
                  onDecrease
                }
                aria-label={
                  copy.aria.decrease
                }
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-[var(--color-text-muted)]
                  transition-all
                  duration-200
                  hover:bg-[var(--color-accent-soft)]
                  hover:text-[var(--color-accent)]
                  active:scale-90
                "
              >
                <Minus
                  size={12}
                />
              </button>

              <span
                className="
                  w-7
                  text-center
                  font-mono
                  text-[10px]
                  font-semibold
                  tabular-nums
                "
              >
                {
                  item.quantity
                }
              </span>

              <button
                type="button"
                onClick={
                  onIncrease
                }
                aria-label={
                  copy.aria.increase
                }
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-[var(--color-text-muted)]
                  transition-all
                  duration-200
                  hover:bg-[var(--color-accent-soft)]
                  hover:text-[var(--color-accent)]
                  active:scale-90
                "
              >
                <Plus
                  size={12}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   CHECKOUT CONTENT
========================================================= */

function CheckoutContent() {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    setActiveOrder,
    clearActiveOrder,
  } = useCartStore();

  const {
    mode,
    tableNumber,
  } =
    useRestaurantContext();

  const {
    config,
    niche,
    preset,
  } = useGastro();

  const {
    ordering,
    brand,
    operation,
    features,
  } = config;

  const copy =
    config.content.checkout;

  const isTableMode =
    preset.capabilities
      .tableOrders &&
    mode === "table" &&
    Boolean(
      tableNumber,
    );

  const tableReference =
    tableNumber?.trim() ||
    null;

  const supportsCounter =
    preset.operation.supported.includes(
      "counter",
    );

  const hasDelivery =
    preset.capabilities.delivery &&
    features.delivery;

  const hasPickup =
    (preset.capabilities
      .pickup ||
      preset.capabilities
        .takeaway ||
      supportsCounter) &&
    features.pickup;

  const pickupLabel =
    supportsCounter &&
    !preset.capabilities
      .takeaway
      ? "Mostrador"
      : preset.capabilities
            .takeaway
        ? "Take Away"
        : copy.form
            .pickup;

  const defaultFulfillment:
    FulfillmentMode =
    hasDelivery
      ? "delivery"
      : "pickup";

  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [
    fulfillmentMode,
    setFulfillmentMode,
  ] =
    useState<FulfillmentMode>(
      defaultFulfillment,
    );

  const [
    address,
    setAddress,
  ] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<
  "Efectivo" | "Tarjeta" | "Transferencia / QR"
>("Efectivo");

  const [
    notes,
    setNotes,
  ] = useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    submittedOrder,
    setSubmittedOrder,
  ] = useState<ActiveOrder | null>(
    null,
  );

  const rawSubtotal =
    subtotal();

  const selectedPayment =
    ordering.paymentMethods.find(
      (method) =>
        method.label ===
        paymentMethod,
    );

  const isCash =
    selectedPayment?.id ===
    "cash";

  const discountPercent =
    ordering.cashDiscountPercent ||
    0;

  const discountAmount =
    isCash
      ? Math.round(
          rawSubtotal *
            (discountPercent /
              100),
        )
      : 0;

  const total =
    rawSubtotal -
    discountAmount;

  const totalItems =
    items.reduce(
      (sum, item) =>
        sum + item.quantity,
      0,
    );

  const estimatedTime =
    submittedOrder
      ? submittedOrder.fulfillment ===
        "pickup"
        ? operation
            .estimatedTime
            .pickup
        : submittedOrder.fulfillment ===
            "onsite"
          ? operation
              .estimatedTime
              .table
          : operation
              .estimatedTime
              .delivery
      : null;

  /* =======================================================
     RESET
  ======================================================= */

  const resetOrder = () => {
    setSubmittedOrder(
      null,
    );

    clearActiveOrder();

    setCustomerName("");
    setAddress("");
    setNotes("");

    setPaymentMethod(
      ordering.paymentMethods[0]
        ?.label ?? "",
    );

    setFulfillmentMode(
      defaultFulfillment,
    );
  };

  /* =======================================================
     CREATE ORDER
  ======================================================= */

  const createOrder =
    async () => {
      if (!items.length) {
        toast.warning(
          copy.validation
            .emptyTitle,
          {
            description:
              copy.validation
                .emptyDescription,
          },
        );

        return;
      }

      if (
        !isTableMode &&
        !customerName.trim()
      ) {
        toast.warning(
          copy.validation
            .nameTitle,
          {
            description:
              copy.validation
                .nameDescription,
          },
        );

        return;
      }

      if (
        !isTableMode &&
        fulfillmentMode ===
          "delivery" &&
        !address.trim()
      ) {
        toast.warning(
          copy.validation
            .addressTitle,
          {
            description:
              copy.validation
                .addressDescription,
          },
        );

        return;
      }

      const orderId =
        `G-${Math.floor(
          1000 +
            Math.random() *
              9000,
        )}`;

      const mergedNotes = [
        notes.trim(),
        !isTableMode &&
        tableReference
          ? `Mesa de referencia: ${tableReference}`
          : null,
      ]
        .filter(Boolean)
        .join(" · ");

      const newOrder:
        ActiveOrder = {
        orderId,

        channel:
          isTableMode
            ? "table"
            : "web",

        fulfillment:
          isTableMode
            ? "onsite"
            : fulfillmentMode,

        tableNumber:
          tableReference,

        customerName:
          customerName.trim(),

        address:
          address.trim(),

        paymentMethod,

        discountAmount,

        notes:
          mergedNotes,

        items: [
          ...items,
        ],

        total,

        timestamp:
          Date.now(),

        status:
          isTableMode
            ? "submitted"
            : "created",
      };

      setIsSubmitting(
        true,
      );

      try {
        if (isTableMode) {
          const response =
            await fetch(
              "/api/pedidos",
              {
                method:
                  "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body:
                  JSON.stringify({
                    ...newOrder,
                    niche,
                  }),
              },
            );

          if (!response.ok) {
            throw new Error(
              `HTTP_${response.status}`,
            );
          }

          setActiveOrder(
            newOrder,
          );

          setSubmittedOrder(
            newOrder,
          );

          toast.success(
            copy.confirmation
              .confirmedToastTitle,
            {
              description:
                `${copy.confirmation.confirmedToastDescriptionPrefix} ${tableReference}.`,
            },
          );

          return;
        }

        const message =
          buildWhatsAppOrder({
            orderId,

            businessName:
              brand.name,

            customerName:
              customerName.trim(),

            deliveryMode:
              fulfillmentMode,

            tableNumber:
              tableReference,

            address:
              address.trim(),

            paymentMethod,

            discountAmount,

            notes:
              mergedNotes,

            items,

            total,
          });

        const url =
          buildWhatsAppUrl(
            ordering.whatsapp
              .number,
            message,
          );

        setActiveOrder(
          newOrder,
        );

        setSubmittedOrder(
          newOrder,
        );

        window.open(
          url,
          "_blank",
          "noopener,noreferrer",
        );

        toast.success(
          copy.confirmation
            .preparedToastTitle,
          {
            description:
              copy.confirmation
                .preparedToastDescription,
          },
        );
      } catch {
        toast.error(
          copy.validation
            .submitErrorTitle,
          {
            description:
              copy.validation
                .submitErrorDescription,
          },
        );
      } finally {
        setIsSubmitting(
          false,
        );
      }
    };

  /* =======================================================
     REOPEN WHATSAPP
  ======================================================= */

  const reopenWhatsApp = (
    order: ActiveOrder,
  ) => {
    const message =
      buildWhatsAppOrder({
        orderId:
          order.orderId,

        businessName:
          brand.name,

        customerName:
          order.customerName,

        deliveryMode:
          order.fulfillment ===
          "pickup"
            ? "pickup"
            : "delivery",

        tableNumber:
          order.tableNumber,

        address:
          order.address || "",

        paymentMethod:
          order.paymentMethod,

        discountAmount:
          order.discountAmount,

        notes:
          order.notes || "",

        items:
          order.items,

        total:
          order.total,
      });

    const url =
      buildWhatsAppUrl(
        ordering.whatsapp
          .number,
        message,
      );

    window.open(
      url,
      "_blank",
      "noopener,noreferrer",
    );
  };

  /* =======================================================
     ORDERING DISABLED
  ======================================================= */

  if (!ordering.enabled) {
    return (
      <main
        className="
          min-h-screen
          bg-[var(--color-bg)]
          text-[var(--color-text)]
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-screen
            w-full
            max-w-5xl
            items-center
            justify-center
            px-4
            py-12
          "
        >
          <div
            className="
              w-full
              max-w-xl
              rounded-[32px]
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              p-7
              text-center
              shadow-[0_24px_80px_rgba(0,0,0,0.12)]
              sm:p-12
            "
          >
            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                border
                border-[var(--color-accent-border)]
                bg-[var(--color-accent-soft)]
                text-[var(--color-accent)]
              "
            >
              <ShoppingBag
                size={28}
                strokeWidth={1.5}
              />
            </div>

            <h1
              className="
                mt-7
                text-4xl
                font-light
                uppercase
                tracking-[-0.05em]
                sm:text-6xl
              "
            >
              {
                copy.disabled
                  .title
              }
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-md
                text-sm
                leading-7
                text-[var(--color-text-muted)]
              "
            >
              {
                copy.disabled
                  .description
              }
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     CONFIRMATION
  ======================================================= */

  if (submittedOrder) {
    const isWhatsApp =
      submittedOrder.channel ===
      "web";

    return (
      <main
        className="
          min-h-screen
          bg-[var(--color-bg)]
          text-[var(--color-text)]
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-5xl
            px-4
            pb-20
            pt-3
            sm:px-6
            sm:pb-24
          "
        >
          <Header
            isTableMode={
              isTableMode
            }
            tableNumber={
              tableNumber
            }
          />

          <section
            className="
              mx-auto
              max-w-3xl
              pb-4
              pt-20
              text-center
              sm:pt-28
            "
          >
            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                border
                border-[var(--color-accent-border)]
                bg-[var(--color-accent-soft)]
                text-[var(--color-accent)]
                shadow-[0_18px_60px_var(--color-accent-soft)]
              "
            >
              {isWhatsApp ? (
                <Send
                  size={28}
                  strokeWidth={1.6}
                />
              ) : (
                <Check
                  size={30}
                  strokeWidth={1.7}
                />
              )}
            </div>

            <span
              className="
                mt-7
                block
                font-mono
                text-[9px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[var(--color-accent)]
              "
            >
              {isWhatsApp
                ? copy.confirmation
                    .preparedLabel
                : copy.confirmation
                    .confirmedLabel}
            </span>

            <TextAnimate
              text={`#${submittedOrder.orderId}`}
              type="fadeInUp"
              className="
                mt-3
                text-5xl
                font-light
                uppercase
                tracking-[-0.055em]
                sm:text-7xl
              "
            />

            <p
              className="
                mx-auto
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-[var(--color-text-muted)]
              "
            >
              {isWhatsApp
                ? copy.confirmation
                    .whatsAppDescription
                : `${copy.confirmation.tableDescriptionPrefix}${
                    tableNumber
                      ? ` ${copy.confirmation.kitchenTableSuffix} ${tableNumber}`
                      : ""
                  }.`}
            </p>
          </section>

          {estimatedTime && (
            <div
              className="
                mx-auto
                mt-10
                flex
                w-full
                max-w-sm
                items-center
                justify-between
                gap-4
                rounded-full
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                px-5
                py-4
                shadow-[0_16px_50px_rgba(0,0,0,0.08)]
              "
            >
              <span
                className="
                  min-w-0
                  font-mono
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[var(--color-text-subtle)]
                "
              >
                {
                  copy.summary
                    .estimatedLabel
                }
              </span>

              <span className="shrink-0 text-lg font-light">
                {
                  estimatedTime.min
                }
                –
                {
                  estimatedTime.max
                }
              </span>
            </div>
          )}

          <div
            className="
              mx-auto
              mt-12
              max-w-3xl
              rounded-[30px]
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]/85
              p-4
              shadow-[0_24px_80px_rgba(0,0,0,0.08)]
              backdrop-blur-xl
              sm:p-8
            "
          >
            <div
              className="
                divide-y
                divide-[var(--color-border)]
              "
            >
              {submittedOrder.items.map(
                (
                  item,
                ) => (
                  <div
                    key={
                      item.cartItemId
                    }
                    className="
                      grid
                      min-w-0
                      grid-cols-[52px_32px_minmax(0,1fr)_auto]
                      gap-2.5
                      py-5
                      min-[420px]:grid-cols-[56px_34px_minmax(0,1fr)_auto]
                      min-[420px]:gap-3
                      sm:grid-cols-[56px_36px_minmax(0,1fr)_auto]
                    "
                  >
                    <div
                      className="
                        relative
                        h-14
                        w-14
                        overflow-hidden
                        rounded-[15px]
                        border
                        border-[var(--color-border)]
                        bg-[var(--color-surface-elevated)]
                      "
                    >
                      {item.image ? (
                        <img
                          src={
                            item.image
                          }
                          alt=""
                          draggable={false}
                          className="
                            h-full
                            w-full
                            select-none
                            object-cover
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                            text-[var(--color-accent)]
                          "
                        >
                          <ShoppingBag
                            size={
                              16
                            }
                          />
                        </div>
                      )}
                    </div>

                    <div
                      className="
                        flex
                        h-14
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[var(--color-accent-soft)]
                        font-mono
                        text-[10px]
                        font-bold
                        text-[var(--color-accent)]
                      "
                    >
                      {
                        item.quantity
                      }
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          break-words
                          font-medium
                          text-[var(--color-text)]
                        "
                      >
                        {
                          item.name
                        }
                      </p>

                      {item.options?.map(
                        (
                          option,
                        ) => (
                          <p
                            key={`${option.groupId}-${option.itemId}`}
                            className="
                              mt-1
                              break-words
                              text-xs
                              text-[var(--color-text-muted)]
                            "
                          >
                            {
                              option.groupName
                            }
                            {" · "}
                            {
                              option.itemName
                            }
                          </p>
                        ),
                      )}

                      {item.notes && (
                        <p
                          className="
                            mt-2
                            break-words
                            text-[10px]
                            italic
                            text-[var(--color-text-subtle)]
                          "
                        >
                          {
                            item.notes
                          }
                        </p>
                      )}
                    </div>

                    <span
                      className="
                        max-w-[90px]
                        pt-1
                        text-right
                        font-mono
                        text-xs
                        font-semibold
                        tabular-nums
                        sm:text-sm
                      "
                    >
                      {formatMoney(
                        item.price *
                          item.quantity,
                      )}
                    </span>
                  </div>
                ),
              )}
            </div>

            <div
              className="
                mt-7
                flex
                min-w-0
                items-end
                justify-between
                gap-4
                rounded-[22px]
                bg-[var(--color-bg-elevated)]
                px-4
                py-5
                sm:px-5
              "
            >
              <span
                className="
                  min-w-0
                  font-mono
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[var(--color-text-subtle)]
                "
              >
                {
                  copy.summary
                    .total
                }
              </span>

              <span
                className="
                  shrink-0
                  text-[clamp(2rem,8vw,3rem)]
                  font-light
                  tracking-[-0.05em]
                "
              >
                {formatMoney(
                  submittedOrder.total,
                )}
              </span>
            </div>
          </div>

          <div
            className="
              mx-auto
              mt-8
              flex
              max-w-xl
              flex-col
              gap-3
              sm:flex-row
            "
          >
            {isWhatsApp && (
              <Button
                type="button"
                variant="accent"
                size="lg"
                onClick={() =>
                  reopenWhatsApp(
                    submittedOrder,
                  )
                }
                className="
                  min-h-12
                  min-w-0
                  flex-1
                  rounded-full
                  px-5
                  shadow-[0_12px_40px_var(--color-accent-soft)]
                "
                aria-label={
                  copy.aria.openWhatsApp
                }
              >
                <Send
                  size={15}
                  className="shrink-0"
                />

                <span className="truncate">
                  {
                    copy.actions
                      .openWhatsApp
                  }
                </span>
              </Button>
            )}

            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                resetOrder();

                toast(
                  copy.actions
                    .newOrder,
                );
              }}
              className="
                min-h-12
                min-w-0
                flex-1
                rounded-full
                px-5
              "
              aria-label={
                copy.aria.newOrder
              }
            >
              <span className="truncate">
                {
                  copy.actions
                    .newOrder
                }
              </span>

              <ArrowRight
                size={15}
                className="shrink-0"
              />
            </Button>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     EMPTY
  ======================================================= */

  if (!items.length) {
    return (
      <main
        className="
          min-h-screen
          bg-[var(--color-bg)]
          text-[var(--color-text)]
        "
      >
        <div
          className="
            mx-auto
            max-w-5xl
            px-4
            pb-16
            pt-3
            sm:px-6
          "
        >
          <Header
            isTableMode={
              isTableMode
            }
            tableNumber={
              tableNumber
            }
          />

          <section
            className="
              mx-auto
              flex
              min-h-[70vh]
              max-w-xl
              flex-col
              items-center
              justify-center
              px-4
              text-center
            "
          >
            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                border
                border-[var(--color-accent-border)]
                bg-[var(--color-accent-soft)]
                text-[var(--color-accent)]
              "
            >
              <ShoppingBag
                size={30}
                strokeWidth={1.5}
              />
            </div>

            <span
              className="
                mt-7
                font-mono
                text-[8px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[var(--color-accent)]
              "
            >
              Tu pedido
            </span>

            <h2
              className="
                mt-3
                text-[clamp(3rem,13vw,6rem)]
                font-light
                uppercase
                leading-[0.85]
                tracking-[-0.06em]
              "
            >
              {
                copy.empty
                  .title
              }
            </h2>

            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-7
                text-[var(--color-text-muted)]
              "
            >
              {
                copy.empty
                  .description
              }
            </p>

            <Link
              href={
                tableReference
                  ? `/?type=${encodeURIComponent(
                      niche,
                    )}&mesa=${encodeURIComponent(
                      tableReference,
                    )}#menu`
                  : `/?type=${encodeURIComponent(
                      niche,
                    )}#menu`
              }
              className={buttonVariants(
                {
                  variant:
                    "accent",
                  size: "lg",
                  className:
                    "group mt-8 min-h-12 rounded-full px-7 shadow-[0_12px_40px_var(--color-accent-soft)]",
                },
              )}
            >
              {
                copy.empty
                  .button
              }

              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </section>
        </div>
      </main>
    );
  }

  /* =======================================================
     MAIN CHECKOUT
  ======================================================= */

  return (
    <main
      className="
        min-h-screen
        min-w-0
        overflow-x-clip
        bg-[var(--color-bg)]
        text-[var(--color-text)]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          min-w-0
          px-4
          pb-32
          pt-3
          sm:px-6
          sm:pb-28
        "
      >
        <Header
          isTableMode={
            isTableMode
          }
          tableNumber={
            tableNumber
          }
        />

        {/* =================================================
            HERO
        ================================================= */}

        <section
          className="
            mx-auto
            w-full
            max-w-5xl
            min-w-0
            px-1
            pb-9
            pt-18
            sm:pb-10
            sm:pt-24
            md:pt-28
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                h-px
                w-8
                shrink-0
                bg-[var(--color-accent)]
                sm:w-12
              "
            />

            <span
              className="
                min-w-0
                truncate
                font-mono
                text-[8px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[var(--color-accent)]
              "
            >
              {isTableMode
                ? `${copy.header.tablePrefix} ${tableNumber}`
                : copy.hero
                    .onlineLabel}
            </span>
          </div>

          <TextAnimate
            text={
              copy.hero.title
            }
            type="fadeInUp"
            className="
              mt-4
              max-w-4xl
              break-words
              text-[clamp(3rem,12vw,8rem)]
              font-light
              uppercase
              leading-[0.82]
              tracking-[-0.07em]
            "
          />

          <p
            className="
              mt-6
              max-w-2xl
              text-sm
              font-light
              leading-7
              text-[var(--color-text-muted)]
              sm:text-base
            "
          >
            {
              copy.hero
                .description
            }
          </p>

          <div
            className="
              mt-7
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <span
              className="
                inline-flex
                min-w-0
                items-center
                gap-2
                rounded-full
                border
                border-[var(--color-border)]
                bg-[var(--color-control)]
                px-3.5
                py-2
                font-mono
                text-[8px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[var(--color-text-muted)]
              "
            >
              <ShoppingBag
                size={11}
                className="shrink-0 text-[var(--color-accent)]"
              />

              <span>
                {totalItems}{" "}
                {totalItems ===
                1
                  ? "unidad"
                  : "unidades"}
              </span>
            </span>

            {isTableMode && (
              <span
                className="
                  inline-flex
                  min-w-0
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[var(--color-accent-border)]
                  bg-[var(--color-accent-soft)]
                  px-3.5
                  py-2
                  font-mono
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[var(--color-accent)]
                "
              >
                <Sparkles
                  size={11}
                  className="shrink-0"
                />

                <span>
                  Mesa{" "}
                  {
                    tableNumber
                  }
                </span>
              </span>
            )}
          </div>
        </section>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div
          className="
            mx-auto
            grid
            w-full
            max-w-6xl
            min-w-0
            items-start
            gap-10
            lg:grid-cols-[minmax(0,1fr)_370px]
            lg:gap-14
            xl:grid-cols-[minmax(0,1fr)_390px]
          "
        >
          {/* ===============================================
              ORDER
          ================================================ */}

          <section className="min-w-0">
            <div
              className="
                flex
                min-w-0
                items-end
                justify-between
                gap-4
                border-b
                border-[var(--color-border)]
                px-1
                pb-4
              "
            >
              <div className="min-w-0">
                <span
                  className="
                    block
                    font-mono
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.24em]
                    text-[var(--color-accent)]
                  "
                >
                  01
                </span>

                <span
                  className="
                    mt-1
                    block
                    text-2xl
                    font-light
                    uppercase
                    leading-none
                    tracking-[-0.04em]
                    sm:text-3xl
                  "
                >
                  {
                    copy.selection
                      .label
                  }
                </span>
              </div>

              <span
                className="
                  shrink-0
                  font-mono
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-[var(--color-text-subtle)]
                "
              >
                {totalItems}{" "}
                {
                  copy.selection
                    .units
                }
              </span>
            </div>

            <div
              className="
                min-w-0
                divide-y
                divide-[var(--color-border)]
              "
            >
              {items.map(
                (
                  item,
                  index,
                ) => (
                  <ProductRow
                    key={
                      item.cartItemId
                    }
                    item={
                      item
                    }
                    index={
                      index
                    }
                    copy={
                      copy
                    }
                    onRemove={() =>
                      removeItem(
                        item.cartItemId,
                      )
                    }
                    onDecrease={() =>
                      updateQuantity(
                        item.cartItemId,
                        item.quantity -
                          1,
                      )
                    }
                    onIncrease={() =>
                      updateQuantity(
                        item.cartItemId,
                        item.quantity +
                          1,
                      )
                    }
                  />
                ),
              )}
            </div>

            <div
              className="
                mt-7
                flex
                min-w-0
                items-center
                justify-between
                gap-3
                rounded-[20px]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                px-3.5
                py-3.5
                sm:mt-8
                sm:px-4
                sm:py-4
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-2.5
                "
              >
                <span
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--color-accent-soft)]
                    text-[var(--color-accent)]
                  "
                >
                  <Sparkles
                    size={12}
                  />
                </span>

                <span
                  className="
                    truncate
                    font-mono
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.17em]
                    text-[var(--color-text-subtle)]
                  "
                >
                  {brand.name}
                </span>
              </div>

              <span
                className="
                  hidden
                  shrink-0
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.15em]
                  text-[var(--color-text-subtle)]
                  sm:block
                "
              >
                Revisá antes de confirmar
              </span>
            </div>
          </section>

          {/* ===============================================
              SIDEBAR
          ================================================ */}

          <aside
            className="
              min-w-0
              lg:sticky
              lg:top-24
            "
          >
            <div
              className="
                min-w-0
                overflow-hidden
                rounded-[30px]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]/85
                shadow-[0_24px_80px_rgba(0,0,0,0.10)]
                backdrop-blur-xl
              "
            >
              {/* SIDEBAR HEADER */}

              <div
                className="
                  border-b
                  border-[var(--color-border)]
                  px-5
                  py-5
                  sm:px-6
                "
              >
                <span
                  className="
                    block
                    font-mono
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.24em]
                    text-[var(--color-accent)]
                  "
                >
                  02 · Checkout
                </span>

                <h2
                  className="
                    mt-1
                    text-3xl
                    font-light
                    uppercase
                    leading-none
                    tracking-[-0.05em]
                  "
                >
                  Completar
                </h2>
              </div>

              <div
                className="
                  min-w-0
                  space-y-7
                  p-5
                  sm:p-6
                "
              >
                {/* FULFILLMENT */}

                {!isTableMode &&
                  (hasDelivery ||
                    hasPickup) && (
                    <div className="min-w-0">
                      <span
                        className="
                          mb-3
                          block
                          px-1
                          font-mono
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.2em]
                          text-[var(--color-text-subtle)]
                        "
                      >
                        {
                          copy.form
                            .fulfillmentLabel
                        }
                      </span>

                      <div
                        className="
                          grid
                          min-w-0
                          grid-cols-2
                          rounded-[18px]
                          border
                          border-[var(--color-border)]
                          bg-[var(--color-control)]
                          p-1
                        "
                      >
                        {hasDelivery && (
                          <button
                            type="button"
                            onClick={() =>
                              setFulfillmentMode(
                                "delivery",
                              )
                            }
                            className={[
                              "flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-[14px] px-2.5 font-mono text-[8px] font-bold uppercase tracking-[0.08em] transition-all duration-300 min-[390px]:gap-2 min-[390px]:px-3 min-[390px]:tracking-[0.12em]",
                              fulfillmentMode ===
                              "delivery"
                                ? "bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-[0_7px_22px_var(--color-accent-soft)]"
                                : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]",
                            ].join(
                              " ",
                            )}
                          >
                            <MapPin
                              size={
                                12
                              }
                              className="shrink-0"
                              strokeWidth={
                                1.8
                              }
                            />

                            <span className="truncate">
                              {
                                copy.form
                                  .delivery
                              }
                            </span>
                          </button>
                        )}

                        {hasPickup && (
                          <button
                            type="button"
                            onClick={() =>
                              setFulfillmentMode(
                                "pickup",
                              )
                            }
                            className={[
                              "flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-[14px] px-2.5 font-mono text-[8px] font-bold uppercase tracking-[0.08em] transition-all duration-300 min-[390px]:gap-2 min-[390px]:px-3 min-[390px]:tracking-[0.12em]",
                              fulfillmentMode ===
                              "pickup"
                                ? "bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-[0_7px_22px_var(--color-accent-soft)]"
                                : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]",
                            ].join(
                              " ",
                            )}
                          >
                            <ShoppingBag
                              size={
                                12
                              }
                              className="shrink-0"
                              strokeWidth={
                                1.8
                              }
                            />

                            <span className="truncate">
                              {pickupLabel}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                {/* CUSTOMER */}

                {!isTableMode && (
                  <>
                    <Field
                      icon={
                        <User
                          size={
                            14
                          }
                          strokeWidth={
                            1.8
                          }
                        />
                      }
                      label={
                        copy.form
                          .customerNameLabel
                      }
                    >
                      <input
                        value={
                          customerName
                        }
                        onChange={(
                          event,
                        ) =>
                          setCustomerName(
                            event.target
                              .value,
                          )
                        }
                        placeholder={
                          copy.form
                            .customerNamePlaceholder
                        }
                        className="
                          block
                          w-full
                          min-w-0
                          bg-transparent
                          text-sm
                          font-medium
                          outline-none
                          placeholder:text-[var(--color-text-subtle)]
                        "
                      />
                    </Field>

                    {fulfillmentMode ===
                      "delivery" && (
                      <Field
                        icon={
                          <MapPin
                            size={
                              14
                            }
                            strokeWidth={
                              1.8
                            }
                          />
                        }
                        label={
                          copy.form
                            .addressLabel
                        }
                      >
                        <input
                          value={
                            address
                          }
                          onChange={(
                            event,
                          ) =>
                            setAddress(
                              event
                                .target
                                .value,
                            )
                          }
                          placeholder={
                            copy.form
                              .addressPlaceholder
                          }
                          className="
                            block
                            w-full
                            min-w-0
                            bg-transparent
                            text-sm
                            font-medium
                            outline-none
                            placeholder:text-[var(--color-text-subtle)]
                          "
                        />
                      </Field>
                    )}
                  </>
                )}

                {/* PAYMENT */}

                <div className="min-w-0">
                  <span
                    className="
                      mb-3
                      block
                      px-1
                      font-mono
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[var(--color-text-subtle)]
                    "
                  >
                    {
                      copy.form
                        .paymentLabel
                    }
                  </span>

                  <div className="min-w-0 space-y-2">
                    {ordering.paymentMethods.map(
                      (
                        method,
                      ) => {
                        const selected =
                          paymentMethod ===
                          method.label;

                        return (
                          <button
                            key={
                              method.id
                            }
                            type="button"
                            onClick={() =>
                              setPaymentMethod(
                                method.label,
                              )
                            }
                            className={[
                              "group flex w-full min-w-0 items-center gap-2.5 rounded-[18px] border px-3 py-3 text-left transition-all duration-300 min-[400px]:gap-3 min-[400px]:px-3.5",
                              selected
                                ? "border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] shadow-[0_10px_30px_var(--color-accent-faint)]"
                                : "border-[var(--color-border)] bg-[var(--color-control)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface)]",
                            ].join(
                              " ",
                            )}
                          >
                            <span
                              className={[
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 min-[400px]:h-10 min-[400px]:w-10",
                                selected
                                  ? "border-[var(--color-accent-border)] bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-[0_7px_20px_var(--color-accent-soft)]"
                                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] group-hover:border-[var(--color-border-strong)] group-hover:text-[var(--color-text)]",
                              ].join(
                                " ",
                              )}
                            >
                              <PaymentIcon
                                id={
                                  method.id
                                }
                              />
                            </span>

                            <span
                              className="
                                min-w-0
                                flex-1
                              "
                            >
                              <span
                                className="
                                  block
                                  truncate
                                  text-sm
                                  font-medium
                                "
                              >
                                {
                                  method.label
                                }
                              </span>

                              {method.id ===
                                "cash" &&
                                discountPercent >
                                  0 && (
                                  <span
                                    className="
                                      mt-0.5
                                      block
                                      truncate
                                      font-mono
                                      text-[8px]
                                      font-bold
                                      uppercase
                                      tracking-[0.1em]
                                      text-[var(--color-success)]
                                    "
                                  >
                                    Ahorrás{" "}
                                    {
                                      discountPercent
                                    }
                                    %
                                  </span>
                                )}
                            </span>

                            <span
                              className={[
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                                selected
                                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-contrast)]"
                                  : "border-[var(--color-border-strong)] bg-transparent text-transparent",
                              ].join(
                                " ",
                              )}
                            >
                              <Check
                                size={11}
                                strokeWidth={
                                  2.6
                                }
                              />
                            </span>
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>

                {/* NOTES */}

                <div className="min-w-0">
                  <label
                    className="
                      mb-3
                      block
                      px-1
                      font-mono
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[var(--color-text-subtle)]
                    "
                  >
                    {
                      copy.form
                        .notesLabel
                    }
                  </label>

                  <textarea
                    value={
                      notes
                    }
                    onChange={(
                      event,
                    ) =>
                      setNotes(
                        event.target
                          .value,
                      )
                    }
                    rows={4}
                    placeholder={
                      isTableMode
                        ? copy.form
                            .notesTablePlaceholder
                        : copy.form
                            .notesDeliveryPlaceholder
                    }
                    className="
                      block
                      w-full
                      min-w-0
                      resize-none
                      rounded-[20px]
                      border
                      border-[var(--color-border)]
                      bg-[var(--color-control)]
                      px-4
                      py-3.5
                      text-sm
                      leading-relaxed
                      outline-none
                      transition-all
                      placeholder:text-[var(--color-text-subtle)]
                      hover:border-[var(--color-border-strong)]
                      focus:border-[var(--color-accent-border)]
                      focus:bg-[var(--color-accent-faint)]
                      focus:shadow-[0_0_0_3px_var(--color-accent-faint)]
                    "
                  />
                </div>

                {/* SUMMARY */}

                <OrderSummary
                  subtotal={
                    rawSubtotal
                  }
                  discount={
                    discountAmount
                  }
                  total={
                    total
                  }
                  discountPercent={
                    discountPercent
                  }
                />

                {/* CTA */}

                <Button
                  type="button"
                  variant="accent"
                  size="lg"
                  disabled={
                    isSubmitting
                  }
                  onClick={
                    createOrder
                  }
                  className="
                    group
                    min-h-14
                    w-full
                    min-w-0
                    rounded-full
                    px-4
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    shadow-[0_15px_50px_var(--color-accent-soft)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_18px_55px_var(--color-accent-soft)]
                    active:translate-y-0
                    active:scale-[0.99]
                    min-[420px]:tracking-[0.16em]
                  "
                >
                  <span className="min-w-0 flex-1 truncate">
                    {isSubmitting
                      ? copy.actions
                          .processing
                      : isTableMode
                        ? `${copy.actions.sendToKitchen} · ${copy.header.tablePrefix} ${tableNumber}`
                        : ordering
                            .whatsapp
                            .labelCheckout}
                  </span>

                  <ArrowRight
                    size={15}
                    className="
                      shrink-0
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                  />
                </Button>

                <p
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-2
                    text-center
                    text-[9px]
                    leading-relaxed
                    text-[var(--color-text-subtle)]
                  "
                >
                  <Sparkles
                    size={10}
                    className="shrink-0 text-[var(--color-accent)]"
                  />

                  <span className="min-w-0">
                    {isTableMode
                      ? copy.helper
                          .table
                      : copy.helper
                          .online}
                  </span>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ===================================================
          MOBILE STICKY CTA
      ==================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-x-0
          bottom-0
          z-40
          px-3
          pb-[calc(0.75rem+env(safe-area-inset-bottom))]
          lg:hidden
        "
      >
        <div
          className="
            pointer-events-auto
            mx-auto
            flex
            w-full
            max-w-xl
            items-center
            gap-3
            rounded-full
            border
            border-[var(--color-border-strong)]
            bg-[var(--color-surface)]/96
            p-2
            pl-4
            shadow-[0_20px_70px_rgba(0,0,0,0.20)]
            backdrop-blur-2xl
          "
        >
          <div
            className="
              min-w-0
              flex-1
            "
          >
            <span
              className="
                block
                font-mono
                text-[7px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[var(--color-text-subtle)]
              "
            >
              Total
            </span>

            <span
              className="
                block
                truncate
                font-mono
                text-sm
                font-bold
                leading-none
                tabular-nums
              "
            >
              {formatMoney(
                total,
              )}
            </span>
          </div>

          <button
            type="button"
            disabled={
              isSubmitting
            }
            onClick={
              createOrder
            }
            className="
              group
              flex
              h-11
              shrink-0
              items-center
              gap-2
              rounded-full
              bg-[var(--color-accent)]
              px-4
              font-mono
              text-[8px]
              font-bold
              uppercase
              tracking-[0.13em]
              text-[var(--color-accent-contrast)]
              shadow-[0_8px_28px_var(--color-accent-soft)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:brightness-110
              active:translate-y-0
              active:scale-[0.98]
              disabled:opacity-50
              min-[400px]:px-5
            "
          >
            {isSubmitting
              ? "Enviando"
              : isTableMode
                ? "Enviar"
                : "Pedir"}

            <ArrowRight
              size={14}
              className="
                shrink-0
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            />
          </button>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   SHELL
========================================================= */

function GastroCheckout() {
  return (
    <Suspense
      fallback={
        <main
          className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-[var(--color-bg)]
          "
        >
          <div
            className="
              h-9
              w-9
              animate-spin
              rounded-full
              border-2
              border-[var(--color-border)]
              border-t-[var(--color-accent)]
            "
          />
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

/* =========================================================
   PAGE
========================================================= */


export default function OrderPageClient({
  initialNiche,
}: {
  initialNiche: GastroNiche;
}) {
  return (
    <GastroProvider initialNiche={initialNiche}>
      <GastroCheckout />
    </GastroProvider>
  );
}