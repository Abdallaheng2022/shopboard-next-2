// modal.tsx: ours. A dialog on the native <dialog> element (DESIGN.md "Dialog"):
// - showModal() makes the rest of the page inert, so focus stays inside.
// - Esc closes it (the browser's "cancel"), and so do a click on the backdrop and the × button.
// - When it closes, the browser moves focus back to the element that opened it.
// The parent owns `open`; every way of closing calls onClose. The content is rendered only
// while open, so a form inside starts empty each time.
// Built like button.tsx: cva for the size (DESIGN.md "Dialog": sm 360px, md 480px, lg 640px),
// cn() for className, typed props. <Modal size="lg" …>; a wrong size is a type error.
"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { headingVariants } from "./heading";

const modalVariants = cva(
  "m-auto rounded-lg border-0 bg-card p-0 text-foreground shadow-dialog backdrop:bg-backdrop/55 backdrop:backdrop-blur-backdrop motion-safe:open:animate-pop",
  {
    variants: {
      size: {
        sm: "w-dialog-sm",
        md: "w-dialog-md",
        lg: "w-dialog-lg",
      },
    },
    defaultVariants: { size: "md" },
  },
);

interface ModalProps extends VariantProps<typeof modalVariants> {
  open: boolean;
  onClose: () => void;
  title: string;
  // The id of the title, for aria-labelledby.
  titleId: string;
  children: ReactNode;
  className?: string;
}

function Modal({ open, onClose, title, titleId, size, className, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // showModal() and close() are DOM methods outside React, so keeping the dialog in step
  // with `open` is an effect.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog === null) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // A click on the backdrop lands on the <dialog> itself; a click inside lands on its content.
  function handleClick(event: MouseEvent<HTMLDialogElement>): void {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleClick}
      className={cn(modalVariants({ size }), className)}
    >
      {open && (
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 id={titleId} className={headingVariants({ level: 2 })}>
              {title}
            </h2>
            <Button variant="secondary" aria-label="Close" onClick={onClose}>
              ×
            </Button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}

export { Modal };
