import { booking } from "@/data/business";

export type NavItem = {
  label: string;
  /** In-page anchor. This is a single-page site; there are no other routes. */
  href: string;
  /** The element id the anchor targets, used for scroll-spy. */
  id: string;
};

/**
 * Primary navigation. Every destination is a section of the one page, in the
 * order it appears, so the scroll-spy indicator can simply track this list.
 */
export const navItems: NavItem[] = [
  { label: "Home", href: "#top", id: "top" },
  { label: "Services", href: "#services", id: "services" },
  { label: "About", href: "#about", id: "about" },
  { label: "Policies", href: "#policies", id: "policies" },
  { label: "FAQ", href: "#faq", id: "faq" },
];

export const bookNowItem: NavItem = {
  label: "Book Now",
  href: "#book",
  id: "book",
};

/** Attributes for any link that leaves the site (Acuity, Instagram, maps). */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export const isExternal = (href: string) => /^https?:\/\//.test(href);

/** `180` → `3 hr`, `45` → `45 min`, `210` → `3 hr 30 min` */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} min`;
  return rest ? `${hours} hr ${rest} min` : `${hours} hr`;
}

/** Prices in Acuity are whole dollars, so the cents are dropped on purpose. */
export function formatPrice(price: number): string {
  return `$${price}`;
}

export const acuityHost = new URL(booking.url).host;
