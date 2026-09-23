import * as React from "react";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

function Sheet({
  ...props
}: SheetPrimitive.Root.Props) {
  return (
    <SheetPrimitive.Root
      data-slot="sheet"
      {...props}
    />
  );
}

function SheetTrigger({
  ...props
}: SheetPrimitive.Trigger.Props) {
  return (
    <SheetPrimitive.Trigger
      data-slot="sheet-trigger"
      {...props}
    />
  );
}

function SheetClose({
  ...props
}: SheetPrimitive.Close.Props) {
  return (
    <SheetPrimitive.Close
      data-slot="sheet-close"
      {...props}
    />
  );
}

function SheetPortal({
  ...props
}: SheetPrimitive.Portal.Props) {
  return (
    <SheetPrimitive.Portal
      data-slot="sheet-portal"
      {...props}
    />
  );
}

function SheetOverlay({
  className,
  ...props
}: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-[var(--color-overlay)] backdrop-blur-sm",
        "transition-opacity duration-200",
        "data-ending-style:opacity-0",
        "data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) {
  const sideClasses = {
    right:
      "inset-y-0 right-0 h-full w-[calc(100%-2rem)] sm:max-w-md border-l data-ending-style:translate-x-full data-starting-style:translate-x-full",
    left:
      "inset-y-0 left-0 h-full w-[calc(100%-2rem)] sm:max-w-md border-r data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
    top:
      "inset-x-0 top-0 h-auto border-b data-ending-style:-translate-y-full data-starting-style:-translate-y-full",
    bottom:
      "inset-x-0 bottom-0 h-auto border-t data-ending-style:translate-y-full data-starting-style:translate-y-full",
  };

  return (
    <SheetPortal>
      <SheetOverlay />

      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          [
            "fixed z-50 flex flex-col gap-4",
            "border-[var(--color-border)]",
            "bg-[var(--color-surface)]",
            "bg-clip-padding",
            "text-sm text-[var(--color-text)]",
            "shadow-2xl",
            "transition-all duration-200 ease-out",
            sideClasses[side],
          ].join(" "),
          className
        )}
        {...props}
      >
        {children}

        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute right-3 top-3 rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Cerrar</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-1 p-5",
        className
      )}
      {...props}
    />
  );
}

function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex flex-col gap-2 border-t border-[var(--color-border)] p-5",
        className
      )}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "text-base font-medium text-[var(--color-text)]",
        className
      )}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn(
        "text-sm text-[var(--color-text-muted)]",
        className
      )}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};