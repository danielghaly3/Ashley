"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { easing, motionTokens } from "@/lib/motion";

export type AccordionItem = {
  id: string;
  title: string;
  /** Small label set before the title — a policy number, for instance. */
  index?: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  /** Ids open on first render. Policies open the first one, the FAQ opens none. */
  defaultOpen?: string[];
  /** Allow several panels open at once. */
  multiple?: boolean;
  /**
   * Draws a rule under the last item. On, the list reads as a closed block —
   * right for the single policies list. Off, it ends open, which stops stacked
   * groups (the FAQ) from showing a double rule across the gap between them.
   */
  closeRule?: boolean;
};

/**
 * One accordion serves both the policies and the FAQ. It is a list of real
 * buttons with `aria-expanded` and `aria-controls`, so it is fully operable from
 * the keyboard, and the height animation is skipped for reduced-motion users.
 */
export default function Accordion({
  items,
  defaultOpen = [],
  multiple = true,
  closeRule = true,
}: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const reduceMotion = useReducedMotion();
  const uid = useId();

  const toggle = (id: string) => {
    setOpen((current) => {
      if (current.includes(id)) return current.filter((value) => value !== id);
      return multiple ? [...current, id] : [id];
    });
  };

  return (
    <ul className="border-t border-line">
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const panelId = `${uid}-${item.id}-panel`;
        const buttonId = `${uid}-${item.id}-button`;

        return (
          <li
            key={item.id}
            id={item.id}
            className={`scroll-mt-32 border-b border-line ${
              closeRule ? "" : "last:border-b-0"
            }`}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group flex min-h-tap w-full items-start gap-5 py-7 text-left transition-colors duration-fast ease-out active:bg-surface-accent sm:gap-8 sm:py-8"
              >
                {item.index && (
                  <span className="eyebrow mt-1.5 shrink-0 text-ink-subtle" aria-hidden="true">
                    {item.index}
                  </span>
                )}

                <span className="flex-1 font-[family-name:var(--font-display)] text-title-sm leading-snug text-ink transition-colors duration-fast group-hover:text-ink-subtle sm:text-title-sm">
                  {item.title}
                </span>

                <span
                  aria-hidden="true"
                  className="mt-1 flex size-6 shrink-0 items-center justify-center"
                >
                  <Plus
                    strokeWidth={1}
                    className={`size-5 text-ink-subtle transition-transform duration-fast ease-editorial ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="panel"
                  initial={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={
                    reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }
                  }
                  exit={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  /* Opening reveals content, so it takes the editorial curve.
                      Closing is an acknowledgement, so it runs shorter. */
                  transition={{
                    duration: reduceMotion
                      ? 0.01
                      : isOpen
                        ? motionTokens.base
                        : motionTokens.exit,
                    ease: easing.editorial,
                  }}
                  className="overflow-hidden"
                >
                  <div
                    className={`pb-9 text-body leading-[1.9] text-ink-muted ${
                      item.index ? "sm:pl-[3.5rem]" : ""
                    }`}
                  >
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
