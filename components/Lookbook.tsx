"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Action from "./Action";
import Reveal from "./Reveal";
import { contact, instagramGallery } from "@/data/business";

/**
 * The Instagram section as a horizontal lookbook rather than a grid.
 *
 * On a phone this is exactly the gesture people already use on her feed — swipe,
 * with CSS scroll-snap doing the work and no JavaScript involved. On desktop the
 * arrows drive the same native scroll, so keyboard and mouse users get the same
 * behaviour, and the strip itself is a focusable labelled region that arrow keys
 * scroll.
 *
 * Still a curated static gallery: no API, no pretence of a live feed. The tiles
 * are files listed in data/business.ts and every one links to the real profile.
 */
export default function Lookbook() {
  const strip = useRef<HTMLUListElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const node = strip.current;
    if (!node) return;
    setAtStart(node.scrollLeft < 8);
    setAtEnd(node.scrollLeft + node.clientWidth >= node.scrollWidth - 8);
  }, []);

  useEffect(() => {
    syncEdges();
    const node = strip.current;
    if (!node) return;
    node.addEventListener("scroll", syncEdges, { passive: true });
    window.addEventListener("resize", syncEdges);
    return () => {
      node.removeEventListener("scroll", syncEdges);
      window.removeEventListener("resize", syncEdges);
    };
  }, [syncEdges]);

  const nudge = (direction: 1 | -1) => {
    const node = strip.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.72, behavior: "smooth" });
  };

  /** Alternating tile widths, so the strip reads as a spread and not a carousel. */
  const widths = [
    "w-[76vw] sm:w-[42vw] lg:w-[26vw]",
    "w-[62vw] sm:w-[32vw] lg:w-[19vw]",
  ];

  return (
    <section className="overflow-hidden py-section" aria-labelledby="lookbook-heading">
      <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <Reveal variant="mask">
            <p className="eyebrow text-ink-subtle">Follow the work</p>
            <h2
              id="lookbook-heading"
              className="mt-6 text-heading leading-[1.05] sm:text-display lg:text-display"
            >
              {contact.instagramHandle}
            </h2>
          </Reveal>

          <Reveal className="flex items-center gap-6 sm:pb-3">
            <Action href={contact.instagramUrl} tone="text">
              Follow on Instagram
            </Action>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => nudge(-1)}
                disabled={atStart}
                aria-label="Scroll the lookbook back"
                className="flex size-tap items-center justify-center border border-line-ui text-ink transition-colors duration-fast ease-out hover:border-ink hover:bg-ink hover:text-surface active:bg-ink active:text-surface disabled:pointer-events-none disabled:opacity-40"
              >
                <ArrowLeft aria-hidden="true" strokeWidth={1.25} className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                disabled={atEnd}
                aria-label="Scroll the lookbook forward"
                className="flex size-tap items-center justify-center border border-line-ui text-ink transition-colors duration-fast ease-out hover:border-ink hover:bg-ink hover:text-surface active:bg-ink active:text-surface disabled:pointer-events-none disabled:opacity-40"
              >
                <ArrowRight aria-hidden="true" strokeWidth={1.25} className="size-4" />
              </button>
            </div>
          </Reveal>
        </div>

        <hr className="rule mt-10" />
      </div>

      {/* The strip bleeds off both edges of the page. */}
      <ul
        ref={strip}
        tabIndex={0}
        role="region"
        aria-label={`Recent work from ${contact.instagramHandle}`}
        className="filmstrip mt-10 flex snap-x gap-4 overflow-x-auto px-6 pb-2 sm:gap-6 sm:px-8 lg:px-12"
      >
        {instagramGallery.map((item, index) => (
          <li
            key={item.src}
            className={`shrink-0 ${widths[index % widths.length]} ${
              index % 2 === 1 ? "lg:mt-14" : ""
            }`}
          >
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div
                className={`relative w-full overflow-hidden rounded-panel ${
                  index % 2 === 1 ? "aspect-square" : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 26vw, (min-width: 640px) 42vw, 76vw"
                  className="object-cover transition-transform duration-slow ease-editorial group-hover:scale-[1.02]"
                />
              </div>
              <p className="eyebrow mt-4 text-ink-subtle">
                {String(index + 1).padStart(2, "0")}
                <span className="sr-only">
                  {" "}
                  — view {contact.instagramHandle} on Instagram
                </span>
              </p>
            </a>
          </li>
        ))}

        {/* A trailing hand-off tile, so the strip ends somewhere rather than stopping. */}
        <li className="flex w-[62vw] shrink-0 items-center sm:w-[32vw] lg:w-[19vw]">
          <div>
            <p className="script text-title text-accent sm:text-heading">more on</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-title-sm leading-tight">
              Instagram
            </p>
            <div className="mt-6">
              <Action href={contact.instagramUrl} tone="ghost">
                Open profile
              </Action>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}
