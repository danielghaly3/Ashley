"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { easing, motionTokens } from "@/lib/motion";
import { bookNowItem, navItems } from "@/lib/site";
import { business, contact } from "@/data/business";
import Wordmark from "./Wordmark";

type NavOverlayProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
  /**
   * Where focus goes when the panel closes.
   *
   * Passed explicitly rather than inferred from `document.activeElement` at
   * open time: a tap does not reliably focus a button (iOS Safari often leaves
   * focus on the body), so inferring it would silently drop focus to the top of
   * the document on exactly the platform most of this traffic uses.
   */
  returnFocusTo?: React.RefObject<HTMLElement | null>;
};

/**
 * The mobile navigation sheet.
 *
 * It behaves like a modal because it is one: focus moves into it on open and
 * returns to the trigger on close, Tab is trapped inside it, Escape dismisses
 * it, the page behind is locked, and the close control is always the first
 * thing a screen reader reaches. It enters from below and exits faster than it
 * enters, so dismissing feels immediate.
 */
export default function NavOverlay({
  open,
  onClose,
  pathname,
  returnFocusTo,
}: NavOverlayProps) {
  const reduceMotion = useReducedMotion();
  const panel = useRef<HTMLDivElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  /* Open: remember where focus came from, lock the page, move focus in, and
     trap Tab inside the panel. */
  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;

      const focusable = panel.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
    /* `onClose` is read through a ref so an unstable callback identity from the
       parent cannot tear this effect down and rebuild it mid-interaction. */
  }, [open]);

  /* Close: hand focus back to whatever opened the panel, on the next frame —
     after the exiting element has been removed, or the browser drops focus to
     the body instead. */
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      return;
    }
    if (!wasOpen.current) return;
    wasOpen.current = false;
    const frame = requestAnimationFrame(() => {
      const target =
        returnFocusTo?.current ??
        (restoreTo.current && restoreTo.current !== document.body
          ? restoreTo.current
          : null);
      target?.focus?.();
    });
    return () => cancelAnimationFrame(frame);
  }, [open, returnFocusTo]);

  const ease = easing.out;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-modal bg-surface lg:hidden"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: reduceMotion ? 0.01 : motionTokens.slow, ease }}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <Link
                href="/"
                onClick={onClose}
                aria-label={`${business.name} — home`}
                className="tap-safe"
              >
                <Wordmark />
              </Link>
              <button
                ref={closeButton}
                type="button"
                onClick={onClose}
                className="-mr-2 flex size-tap items-center justify-center text-ink
                           transition-colors duration-fast ease-out active:text-ink-subtle"
                aria-label="Close navigation"
              >
                <X strokeWidth={1.25} className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex-1 overflow-y-auto px-6 pb-10 pt-8"
            >
              <ul className="flex flex-col">
                {navItems.map((item, index) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href} className="border-b border-line">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className="flex min-h-tap items-baseline justify-between py-5
                                   transition-colors duration-fast ease-out"
                      >
                        <span
                          className={`font-[family-name:var(--font-display)] text-title leading-none ${
                            active ? "text-accent" : "text-ink"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="eyebrow text-ink-subtle" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-9">
                <Link
                  href={bookNowItem.href}
                  onClick={onClose}
                  className="eyebrow flex min-h-tap w-full items-center justify-center
                             rounded-pill bg-accent px-8 py-5 text-surface
                             transition-[background-color,scale] duration-fast ease-out
                             active:scale-[0.985] active:bg-accent-lift"
                >
                  Book an appointment
                </Link>

                <p className="script mt-9 text-center text-heading text-accent">
                  {business.tagline}
                </p>

                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-safe eyebrow mx-auto mt-6 justify-center text-ink-subtle"
                >
                  {contact.instagramHandle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
