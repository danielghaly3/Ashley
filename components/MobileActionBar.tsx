"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CalendarPlus, Menu } from "lucide-react";
import NavOverlay from "./NavOverlay";
import { bookNowItem, navItems } from "@/lib/site";
import { useActiveSection } from "@/lib/useActiveSection";

/**
 * The phone-sized navigation.
 *
 * Most of this site's traffic arrives from an Instagram link on a phone, so the
 * two things that matter — reaching the rest of the site, and booking — sit in
 * one persistent bar inside thumb reach. It replaces what used to be two
 * separate fixed elements (a hamburger in the header and a floating CTA that
 * appeared on scroll), which competed for the same corner and let the footer
 * slide underneath.
 *
 * Booking is the filled primary; navigation is subordinate. Both are well over
 * the 44px minimum, both carry an icon *and* a label, and the bar respects the
 * home-indicator safe area.
 */
export default function MobileActionBar() {
  const sectionIds = useMemo(
    () => [...navItems, bookNowItem].map((item) => item.id),
    [],
  );
  const activeId = useActiveSection(sectionIds);
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = useCallback(() => setNavOpen(false), []);
  const menuButton = useRef<HTMLButtonElement | null>(null);
  const atBooking = activeId === "book";

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-sticky border-t border-line bg-surface/95 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-stretch gap-3 px-4 py-3">
          <button
            ref={menuButton}
            type="button"
            onClick={() => setNavOpen(true)}
            aria-expanded={navOpen}
            aria-haspopup="dialog"
            className="flex min-h-tap flex-1 items-center justify-center gap-2.5
                       rounded-pill border border-line-ui eyebrow text-ink
                       transition-[background-color,color,border-color,scale] duration-fast
                       ease-out active:scale-[0.975] active:bg-surface-accent"
          >
            <Menu aria-hidden="true" strokeWidth={1.25} className="size-4" />
            Menu
          </button>

          {/* Once the booking section is the one being read, the label stops
              promising a jump and names what is already on screen. */}
          <Link
            href="#book"
            aria-current={atBooking ? "location" : undefined}
            className="flex min-h-tap flex-[1.35] items-center justify-center gap-2.5
                       rounded-pill bg-accent eyebrow text-surface
                       transition-[background-color,scale] duration-fast ease-out
                       active:scale-[0.975] active:bg-accent-lift"
          >
            <CalendarPlus aria-hidden="true" strokeWidth={1.25} className="size-4" />
            {atBooking ? "Choose a set" : "Book"}
          </Link>
        </div>
      </div>

      <NavOverlay
        open={navOpen}
        onClose={closeNav}
        activeId={activeId}
        returnFocusTo={menuButton}
      />
    </>
  );
}
