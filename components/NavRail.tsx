"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { NavItem } from "@/lib/site";

type NavRailProps = {
  items: NavItem[];
  /** The id of the section currently being read. */
  activeId: string;
  /** Tightens the row once the header has compressed. */
  compact: boolean;
};

type Marker = { x: number; w: number } | null;

/**
 * The desktop navigation, with one drawn rule that travels between items.
 *
 * A single hairline sits under the current page and slides to whatever is
 * hovered or focused, returning when you leave the row. It reads as a pen line
 * moving across a masthead rather than six separate underlines lighting up, and
 * it makes the row feel like one object.
 *
 * The rule is animated with `transform` only — a 1px element scaled on X — so it
 * never triggers layout. Positions are re-measured on resize and, importantly,
 * once the webfonts have loaded: the display face changes every label's width,
 * and measuring before that lands leaves the rule permanently misaligned.
 */
export default function NavRail({ items, activeId, compact }: NavRailProps) {
  const list = useRef<HTMLUListElement | null>(null);
  const links = useRef<Array<HTMLAnchorElement | null>>([]);
  const [marker, setMarker] = useState<Marker>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const activeIndex = items.findIndex((item) => item.id === activeId);

  const measure = useCallback(
    (index: number) => {
      const listRect = list.current?.getBoundingClientRect();
      const linkRect = links.current[index]?.getBoundingClientRect();
      if (!listRect || !linkRect) return null;
      return { x: linkRect.left - listRect.left, w: linkRect.width };
    },
    [],
  );

  const settle = useCallback(() => {
    const index = hovered ?? activeIndex;
    setMarker(index >= 0 ? measure(index) : null);
  }, [hovered, activeIndex, measure]);

  useEffect(() => {
    settle();
  }, [settle, compact, activeId]);

  useEffect(() => {
    const node = list.current;
    if (!node) return;

    const observer = new ResizeObserver(() => settle());
    observer.observe(node);

    // Webfont swap changes every label width. Re-measure once it lands.
    document.fonts?.ready.then(() => settle()).catch(() => {});

    return () => observer.disconnect();
  }, [settle]);

  return (
    <ul
      ref={list}
      className="relative flex items-center"
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((item, index) => {
        const active = index === activeIndex;
        return (
          <li key={item.href}>
            <Link
              ref={(node) => {
                links.current[index] = node;
              }}
              href={item.href}
              aria-current={active ? "location" : undefined}
              onMouseEnter={() => setHovered(index)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              className={`flex min-h-tap items-center eyebrow transition-[color,padding] duration-base ease-out ${
                active ? "text-accent" : "text-ink-muted hover:text-accent"
              } ${compact ? "px-3.5" : "px-4"}`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}

      {/* The travelling rule. Decorative — `aria-current="location"` already
          states where you are for assistive tech. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-1.5 left-0 h-px w-px origin-left bg-accent ${
          reduceMotion
            ? ""
            : "transition-[transform,opacity] duration-base ease-editorial"
        }`}
        style={{
          opacity: marker ? 1 : 0,
          transform: marker
            ? `translate3d(${marker.x}px, 0, 0) scaleX(${marker.w})`
            : "translate3d(0, 0, 0) scaleX(0)",
        }}
      />
    </ul>
  );
}
