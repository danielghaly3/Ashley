"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { bookNowItem, navItems } from "@/lib/site";
import { useActiveSection } from "@/lib/useActiveSection";
import { business } from "@/data/business";
import NavRail from "./NavRail";

/**
 * A masthead that compresses, rather than a bar that just sits there.
 *
 * Three behaviours, all driven from one rAF-throttled scroll listener so the
 * page never runs several competing handlers:
 *
 *   1. COMPRESS.   At the top it is a masthead: taller, the wordmark set in two
 *      lines, the nav row spaced out. Once the page moves it collapses to a
 *      single compact line on an opaque surface — opaque, not translucent, so
 *      body copy never shows through the wordmark.
 *
 *   2. RETRACT.    Scrolling down slides it away, scrolling up brings it
 *      straight back. These are long editorial pages and the oversized type
 *      deserves the whole viewport; the nav is one flick away at any point. It
 *      is pinned open whenever it holds focus, so a keyboard user is never
 *      chasing a moving target, and it never retracts near the top.
 *
 *   3. PROMOTE.    At the top, "Book" is deliberately subordinate — the hero
 *      owns the page's one filled call to action. Once the hero has scrolled
 *      past, that primary is gone from the viewport, so the header's CTA fills
 *      in and takes over the role. One primary on screen, always.
 *
 * On phones the masthead carries branding and, once compressed, the name of the
 * page you are on as a running head. Navigation and booking live in the bottom
 * action bar, in thumb reach.
 */
export default function SiteHeader() {
  const sectionIds = useMemo(
    () => [...navItems, bookNowItem].map((item) => item.id),
    [],
  );
  const activeId = useActiveSection(sectionIds);
  const [compressed, setCompressed] = useState(false);
  const [retracted, setRetracted] = useState(false);
  const [promoted, setPromoted] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const y = window.scrollY;
      const viewport = window.innerHeight;
      const scrollable = document.documentElement.scrollHeight - viewport;

      setCompressed(y > 24);
      setPromoted(y > viewport * 0.72);
      setProgress(scrollable > 0 ? Math.min(1, y / scrollable) : 0);

      // Retract only past a threshold, and only on a deliberate downward move.
      const delta = y - lastY.current;
      if (y < 140) setRetracted(false);
      else if (delta > 6) setRetracted(true);
      else if (delta < -6) setRetracted(false);
      lastY.current = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeItem = [...navItems, bookNowItem].find(
    (item) => item.id === activeId,
  );
  const runningHead =
    activeItem && activeItem.id !== "top" ? activeItem.label : null;

  return (
    <header
      data-compressed={compressed}
      className={`sticky top-0 z-header transition-[translate,background-color,border-color,backdrop-filter]
                  duration-base ease-out focus-within:translate-y-0! ${
                    compressed
                      ? "border-b border-line bg-surface/95 backdrop-blur-md"
                      : "border-b border-transparent bg-transparent"
                  } ${retracted ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div
        className={`mx-auto flex w-full max-w-[110rem] items-center justify-between gap-6
                    px-6 transition-[padding] duration-base ease-out sm:px-8 lg:px-12 ${
                      compressed ? "py-2.5 lg:py-3" : "py-4 lg:py-6"
                    }`}
      >
        {/* ---- Brand ------------------------------------------------------ */}
        <div className="flex min-w-0 items-center gap-5">
          <Link
            href="/"
            aria-label={`${business.name} — home`}
            className="tap-safe shrink-0"
          >
            <span className="flex flex-col leading-none">
              <span
                className={`wordmark text-accent transition-[font-size] duration-base ease-out ${
                  compressed ? "text-caption" : "text-caption lg:text-body"
                }`}
              >
                {business.wordmark.line1}
              </span>
              {/* The second line is part of the masthead. It leaves on compress,
                  which is what makes the collapse legible rather than just
                  smaller. */}
              <span
                aria-hidden={compressed}
                className={`wordmark overflow-hidden text-label text-ink-subtle
                            transition-[max-height,opacity,margin] duration-base ease-out ${
                              compressed
                                ? "mt-0 max-h-0 opacity-0"
                                : "mt-2 max-h-4 opacity-100"
                            }`}
                style={{ letterSpacing: "0.42em" }}
              >
                {business.wordmark.line2}
              </span>
            </span>
          </Link>

          {/* A rule that draws itself out of the wordmark on the masthead and
              retracts on compress. */}
          <span
            aria-hidden="true"
            className={`hidden h-px origin-left bg-accent/45 transition-[width,opacity]
                        duration-base ease-out lg:block ${
                          compressed ? "w-0 opacity-0" : "w-16 opacity-100"
                        }`}
          />

          {/* Running head, phones only, once the masthead has collapsed. */}
          {runningHead && (
            <span
              className={`eyebrow truncate text-ink-subtle transition-opacity
                          duration-base ease-out lg:hidden ${
                            compressed ? "opacity-100" : "opacity-0"
                          }`}
            >
              {runningHead}
            </span>
          )}
        </div>

        {/* ---- Navigation ------------------------------------------------- */}
        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="hidden lg:block">
            <NavRail items={navItems} activeId={activeId} compact={compressed} />
          </nav>

          <Link
            href={bookNowItem.href}
            aria-current={activeId === bookNowItem.id ? "location" : undefined}
            className={`hidden min-h-tap items-center eyebrow
                        rounded-pill transition-[background-color,color,border-color,padding,box-shadow,scale]
                        duration-fast ease-out active:scale-[0.975] lg:inline-flex ${
                          promoted
                            ? "border border-accent bg-accent px-7 text-surface hover:bg-accent-lift hover:border-accent-lift hover:shadow-glow"
                            : "border border-accent/50 px-7 text-accent hover:border-accent hover:bg-accent hover:text-surface"
                        } ${compressed ? "ml-4" : "ml-6"}`}
          >
            {bookNowItem.label}
          </Link>
        </div>
      </div>

      {/* Reading indicator, on the header's own bottom edge. Transform-only. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden
                    transition-opacity duration-base ease-out ${
                      compressed ? "opacity-100" : "opacity-0"
                    }`}
      >
        <div
          className="h-full origin-left bg-accent"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </header>
  );
}
