import { booking } from "@/data/business";

export type NavItem = { label: string; href: string };

/** Primary navigation. `Book Now` is treated separately in the header. */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Policies", href: "/policies" },
  { label: "FAQ", href: "/faq" },
];

export const bookNowItem: NavItem = { label: "Book Now", href: "/book" };

/** Attributes for any link that leaves the site (Acuity, Instagram, maps). */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export const isExternal = (href: string) => /^https?:\/\//.test(href);

/**
 * The label for the route currently being viewed. Used as a running head in the
 * compressed header on phones, where there is no room for the full nav.
 * Longest-match first, so `/services` does not lose to `/`.
 */
export function currentNavLabel(pathname: string): string | null {
  if (pathname === "/") return null;
  const match = [...navItems, bookNowItem]
    .filter((item) => item.href !== "/" && pathname.startsWith(item.href))
    .sort((a, b) => b.href.length - a.href.length)[0];
  return match?.label ?? null;
}

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
