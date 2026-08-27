import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Container from "./Container";
import Flourish from "./Flourish";
import { booking, business, contact } from "@/data/business";
import { externalLinkProps, navItems } from "@/lib/site";

const year = new Date().getFullYear();

/**
 * The footer closes the page the way the design direction does: a flourish, the
 * wordmark on the centre axis, then a single hairline with the practical rows
 * beneath it.
 *
 * The social row is icon-only, so every icon carries a visible label for sighted
 * users at wide sizes and an accessible name at every size — and each sits in a
 * 44px ring rather than being a bare 16px glyph.
 */
const socials = [
  { icon: Instagram, label: contact.instagramHandle, href: contact.instagramUrl, name: "Instagram" },
  { icon: Facebook, label: contact.facebookName, href: contact.facebookUrl, name: "Facebook" },
  { icon: Mail, label: contact.email, href: `mailto:${contact.email}`, name: "Email" },
  { icon: Phone, label: contact.phone, href: contact.phoneHref, name: "Phone" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-surface" aria-label="Site footer">
      <Container size="wide" className="pb-12 pt-section-sm">
        {/* ---- Brand, centred ---------------------------------------------- */}
        <div className="flex flex-col items-center text-center">
          <Flourish size="sm" />

          <p className="mt-7 wordmark text-body text-accent sm:text-body-lg">
            {business.wordmark.line1}
          </p>
          <p
            className="mt-3 wordmark text-label text-ink-subtle"
            style={{ letterSpacing: "0.42em" }}
          >
            {business.wordmark.line2}
          </p>

          <p className="script mt-7 text-title text-accent sm:text-heading">
            Lashes tailored to you.
          </p>
        </div>

        <hr className="rule-fade mt-12" />

        {/* ---- Practical rows --------------------------------------------- */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <nav className="lg:col-span-4" aria-label="Footer">
            <h2 className="eyebrow text-accent">Explore</h2>
            <ul className="mt-4 flex flex-col">
              {[...navItems, { label: "Book an appointment", href: "/book" }].map(
                (item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="tap-safe text-body text-ink-muted transition-colors duration-fast ease-out hover:text-accent active:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="eyebrow text-accent">Studio</h2>
            <ul className="mt-4 flex flex-col gap-1">
              <li className="flex items-start gap-3">
                <MapPin
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="mt-3.5 size-4 shrink-0 text-accent"
                />
                <a
                  href={contact.mapsUrl}
                  className="tap-safe text-body text-ink-muted transition-colors duration-fast ease-out hover:text-accent"
                  {...externalLinkProps}
                >
                  {contact.address}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>

            <h2 className="eyebrow mt-8 text-accent">Hours</h2>
            <ul className="mt-4 flex flex-col">
              {contact.hours.map((entry) => (
                <li
                  key={entry.days}
                  className="flex min-h-tap flex-wrap items-center gap-x-3 text-body text-ink-muted"
                >
                  <span>{entry.days}</span>
                  <span className="text-accent" aria-hidden="true">
                    &middot;
                  </span>
                  <span>{entry.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-caption leading-relaxed text-ink-subtle">
              {contact.hoursNote}
            </p>
          </div>

          <div className="lg:col-span-4">
            <h2 className="eyebrow text-accent">Reach her</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {socials.map((social) => {
                const external = social.href.startsWith("http");
                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      aria-label={`${social.name} — ${social.label}`}
                      className="flex size-tap items-center justify-center rounded-pill border border-line text-ink-muted transition-[color,border-color,scale] duration-fast ease-out hover:border-accent hover:text-accent active:scale-[0.94]"
                      {...(external ? externalLinkProps : {})}
                    >
                      <social.icon
                        aria-hidden="true"
                        strokeWidth={1.25}
                        className="size-4"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-body leading-[1.7] text-ink-muted">
              {contact.instagramHandle}
              <br />
              {contact.phone}
            </p>
          </div>
        </div>

        <hr className="rule-fade mt-14" />

        <div className="mt-8 flex flex-col items-center gap-3 text-caption text-ink-subtle sm:flex-row sm:justify-between">
          <p>
            &copy; {year} {business.name}. All rights reserved.
          </p>
          <p>
            Booking powered by{" "}
            <a
              href={booking.url}
              className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
              {...externalLinkProps}
            >
              {booking.provider}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
