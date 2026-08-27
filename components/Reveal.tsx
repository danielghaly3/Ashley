"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /**
   * `stagger` fades direct children in sequence.
   * `mask` uncovers them from the baseline up — for headlines.
   * `image` settles a photograph out of a slow scale.
   */
  variant?: "stagger" | "mask" | "image";
  as?: ElementType;
  className?: string;
  /** Delay before the reveal starts, in ms. Use sparingly. */
  delay?: number;
  /** How much of the element must be on screen before it plays. */
  threshold?: number;
  /**
   * Plays as soon as the component mounts rather than waiting for a scroll.
   * Used for above-the-fold content, which must never sit invisible.
   */
  immediate?: boolean;
};

/**
 * Plays a one-shot entrance the first time an element scrolls into view.
 *
 * The animation itself lives in globals.css so it can be switched off wholesale
 * under `prefers-reduced-motion` without any JS branching. This component only
 * decides *when* to add the class.
 */
export default function Reveal({
  children,
  variant = "stagger",
  as: Tag = "div",
  className = "",
  delay = 0,
  threshold = 0.15,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (immediate) {
      const timer = window.setTimeout(() => setVisible(true), delay || 40);
      return () => window.clearTimeout(timer);
    }

    const node = ref.current;
    if (!node) return;

    // No IntersectionObserver (or a very old browser): show the content.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (delay) {
          window.setTimeout(() => setVisible(true), delay);
        } else {
          setVisible(true);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, threshold, immediate]);

  const base =
    variant === "image"
      ? "image-reveal"
      : variant === "mask"
        ? "reveal-mask"
        : "reveal";

  return (
    <Tag
      ref={ref}
      className={`${base} ${visible ? "is-visible" : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
