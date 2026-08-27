"use client";

import { useEffect, useState } from "react";

/**
 * Which section of the page is currently being read.
 *
 * Deliberately not an IntersectionObserver threshold race: with sections of
 * wildly different heights (a four-card row versus the full price menu) several
 * are on screen at once, and "most visible" flickers as you scroll. Instead it
 * picks the last section whose top has passed a reading line just below the
 * header — which is how a person would answer the question — and pins the final
 * section once the page is scrolled to the bottom, so the last item can actually
 * become active on a short closing section.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const line = window.scrollY + 140;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 96;

      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }

      let current = ids[0] ?? "";
      for (const id of ids) {
        const node = document.getElementById(id);
        if (!node) continue;
        if (node.getBoundingClientRect().top + window.scrollY <= line) {
          current = id;
        }
      }
      setActive(current);
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
  }, [ids]);

  return active;
}
