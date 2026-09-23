"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Bell,
  CreditCard,
  Check,
  Banknote,
  QrCode,
} from "lucide-react";

import { useGastro } from "@/context/gastro-context";

interface CallWaiterModalProps {
  mesa: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CallWaiterModal({
  mesa,
  isOpen,
  onClose,
}: CallWaiterModalProps) {
  const { config, preset } = useGastro();

  const {
    content,
    ordering,
  } = config;

  const labels =
    content.waiterModal;

  const tableUi =
    content.tableUi;

  const canCallWaiter =
    preset.capabilities.waiterCall;

  const canRequestBill =
    preset.capabilities.tableOrders;

  const [
    selectedAction,
    setSelectedAction,
  ] = useState<"cuenta" | null>(
    null
  );

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState<string | null>(
    null
  );

  const [
    sentStatus,
    setSentStatus,
  ] = useState<string | null>(
    null
  );

  const [loading, setLoading] =
    useState(false);

  const [
    errorFeedback,
    setErrorFeedback,
  ] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;

    setSelectedAction(null);
    setPaymentMethod(null);
    setSentStatus(null);
    setErrorFeedback(null);
    setLoading(false);
  }, [isOpen]);

  const handleSend = async (
    actionType:
      | "call_waiter"
      | "request_bill",
    details: string
  ) => {
    if (loading) return;

    setLoading(true);
    setErrorFeedback(null);

    try {
      const response =
        await fetch(
          "/api/pedidos",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              type: actionType,
              tableNumber: mesa,
              message: details,
              paymentMethod:
                actionType ===
                "request_bill"
                  ? paymentMethod
                  : null,
              timestamp: Date.now(),
            }),
          }
        );

      if (!response.ok) {
        throw new Error(
          `HTTP_${response.status}`
        );
      }

      setSentStatus(details);

      window.setTimeout(
        () => {
          setSentStatus(null);
          setSelectedAction(null);
          setPaymentMethod(null);
          onClose();
        },
        2000
      );
    } catch {
      setErrorFeedback(
        labels.errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  if (
    !isOpen ||
    (!canCallWaiter &&
      !canRequestBill)
  ) {
    return null;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] flex items-end justify-center p-0 sm:items-center sm:p-4">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={onClose}
          className="absolute inset-0 bg-[var(--color-overlay)] backdrop-blur-sm"
        />

        <motion.div
          initial={{
            y: "100%",
          }}
          animate={{
            y: 0,
          }}
          exit={{
            y: "100%",
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 350,
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="waiter-modal-title"
          className="relative w-full max-w-lg space-y-5 overflow-hidden rounded-t-[2.5rem] border-t border-[var(--color-border)] bg-[var(--color-surface)] p-5 pb-8 text-[var(--color-text)] shadow-2xl sm:rounded-3xl sm:border sm:p-6 sm:pb-6"
        >
          <div className="flex justify-center pb-1 sm:hidden">
            <div className="h-1 w-12 rounded-full bg-[var(--color-border-strong)]" />
          </div>

          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3.5">
            <div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--color-accent)]">
                {labels.eyebrow}
              </span>

              <h3
                id="waiter-modal-title"
                className="text-xl font-bold tracking-tight text-[var(--color-text)]"
              >
                {tableUi.tablePrefix}{" "}
                {mesa}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-control)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent-border)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)] active:scale-95"
              aria-label="Cerrar"
            >
              <X size={17} />
            </button>
          </div>

          {errorFeedback && (
            <div
              role="alert"
              className="rounded-xl border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 p-3 font-mono text-xs text-[var(--color-danger)]"
            >
              {errorFeedback}
            </div>
          )}

          {sentStatus ? (
            <div className="space-y-2.5 py-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)]">
                <Check
                  size={28}
                  strokeWidth={2.5}
                />
              </div>

              <h4 className="text-lg font-bold text-[var(--color-text)]">
                {labels.sentTitle}
              </h4>

              <p className="mx-auto max-w-xs text-xs text-[var(--color-text-muted)]">
                {labels.sentSubtitle}{" "}
                <span className="font-medium text-[var(--color-text)]">
                  {sentStatus}
                </span>
                .
              </p>
            </div>
          ) : selectedAction ===
            "cuenta" ? (
            <div className="space-y-4">
              <span className="block font-mono text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                {labels.paymentPrompt}
              </span>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {ordering.paymentMethods.map(
                  (method) => {
                    const isSelected =
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
                            method.label
                          )
                        }
                        className={[
                          "flex min-h-[84px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border p-3 transition-all active:scale-95",
                          isSelected
                            ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] font-bold text-[var(--color-accent)] shadow-md"
                            : "border-[var(--color-border)] bg-[var(--color-control)] text-[var(--color-text-muted)] hover:border-[var(--color-accent-border)] hover:bg-[var(--color-accent-faint)]",
                        ].join(" ")}
                      >
                        {method.id ===
                          "cash" && (
                          <Banknote
                            size={22}
                          />
                        )}

                        {method.id ===
                          "card" && (
                          <CreditCard
                            size={22}
                          />
                        )}

                        {method.id ===
                          "transfer" && (
                          <QrCode
                            size={22}
                          />
                        )}

                        <span className="text-center font-mono text-[10px] uppercase leading-tight">
                          {
                            method.label
                          }
                        </span>
                      </button>
                    );
                  }
                )}
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAction(
                      null
                    );
                    setPaymentMethod(
                      null
                    );
                    setErrorFeedback(
                      null
                    );
                  }}
                  className="min-h-[46px] flex-1 rounded-full border border-[var(--color-border)] py-2 font-mono text-xs uppercase text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent-border)] hover:text-[var(--color-accent)]"
                >
                  {labels.backButton}
                </button>

                <button
                  type="button"
                  disabled={
                    !paymentMethod ||
                    loading
                  }
                  onClick={() =>
                    handleSend(
                      "request_bill",
                      `Pedir la cuenta (${paymentMethod})`
                    )
                  }
                  className="min-h-[46px] flex-1 cursor-pointer rounded-full bg-[var(--color-accent)] py-2 font-mono text-xs font-bold uppercase text-[var(--color-accent-contrast)] shadow-lg transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading
                    ? "Enviando..."
                    : labels.confirmButton}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-3">
              {canCallWaiter && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    handleSend(
                      "call_waiter",
                      labels.callMessage
                    )
                  }
                  className="flex min-h-[70px] items-center gap-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-control)] p-4 text-left transition-all hover:border-[var(--color-accent-border)] hover:bg-[var(--color-accent-faint)] disabled:opacity-50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <Bell size={20} />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text)]">
                      {labels.callTitle}
                    </h4>

                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                      {
                        labels.callSubtitle
                      }
                    </p>
                  </div>
                </button>
              )}

              {canRequestBill && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    setSelectedAction(
                      "cuenta"
                    )
                  }
                  className="flex min-h-[70px] items-center gap-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-control)] p-4 text-left transition-all hover:border-[var(--color-success)]/40 hover:bg-[var(--color-success)]/5 disabled:opacity-50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 text-[var(--color-success)]">
                    <CreditCard size={20} />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text)]">
                      {labels.billTitle}
                    </h4>

                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                      {
                        labels.billSubtitle
                      }
                    </p>
                  </div>
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}