"use client";

import React, { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: "md" | "xl";
  children: React.ReactNode;
}

interface ModalFieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}

interface ModalToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SIZES = {
  md: "max-w-lg",
  xl: "max-w-4xl",
} as const;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const MODAL_INPUT =
  "w-full rounded-xl border border-white/10 bg-[#121110] px-3.5 py-3 text-base text-white transition-colors placeholder:text-white/30 focus:border-[#E8C48E] focus:outline-none sm:py-2.5 sm:text-sm";

export const MODAL_PRIMARY_BUTTON =
  "flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#E8C48E] px-6 py-3.5 text-sm font-semibold text-[#121110] shadow-lg shadow-black/20 transition-all hover:bg-[#f3d7ad] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C48E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#181614] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

export function ModalField({
  label,
  htmlFor,
  hint,
  children,
}: ModalFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-white"
      >
        {label}
        {hint && (
          <span className="ml-1.5 font-normal text-[#EDE8E3]/50">{hint}</span>
        )}
      </label>
      {children}
    </div>
  );
}

export function ModalToggle({ label, checked, onChange }: ModalToggleProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#121110] px-3.5 py-3 text-sm text-white transition-colors hover:border-white/20 has-focus-visible:border-[#E8C48E]">
      <span className="flex-1">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 cursor-pointer accent-[#E8C48E]"
      />
    </label>
  );
}

export function ModalShell({
  isOpen,
  onClose,
  title,
  description,
  size = "md",
  children,
}: ModalShellProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previous?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (e.key !== "Tab" || !panel) return;
    const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (nodes.length === 0) {
      e.preventDefault();
      return;
    }
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === panel)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            data-lenis-prevent
            onKeyDown={handleKeyDown}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative max-h-[calc(100dvh-2rem)] w-full overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[#181614] p-5 text-[#EDE8E3] shadow-2xl outline-none sm:max-h-[calc(100dvh-3rem)] sm:p-7 ${SIZES[size]}`}
          >
            <header className="mb-5 flex items-start justify-between gap-4 sm:mb-6">
              <div className="min-w-0">
                <h2
                  id={titleId}
                  className="text-2xl font-light text-white sm:text-3xl"
                >
                  {title}
                </h2>
                {description && (
                  <p
                    id={descriptionId}
                    className="mt-2 text-sm font-light leading-relaxed text-[#EDE8E3]/70"
                  >
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C48E]"
              >
                <X className="h-5 w-5" />
              </button>
            </header>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
