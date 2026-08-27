import { business } from "@/data/business";

/**
 * Deliberately quiet: one line of small type, no icons, no close button. It
 * states availability and location before anything else loads.
 *
 * The copy shortens below `sm`. The type cannot shrink to fit — 12px is the
 * floor for the whole site — so the sentence gives way instead, and the bar
 * stays a single line at 390px.
 */
export default function AnnouncementBar() {
  return (
    <div className="bg-surface-accent">
      <p className="eyebrow flex items-center justify-center gap-2.5 whitespace-nowrap px-4 py-2.5 text-center text-ink-subtle sm:gap-3">
        <span className="sm:hidden">New clients</span>
        <span className="hidden sm:inline">Now accepting new lash clients</span>
        <span aria-hidden="true" className="text-accent">
          &bull;
        </span>
        <span>{business.neighborhood}</span>
      </p>
    </div>
  );
}
