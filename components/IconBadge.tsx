import type { LucideIcon } from "lucide-react";

/**
 * A gold ring holding one icon — the marker used on the feature cards.
 *
 * Purely decorative: the icon repeats what the heading beside it already says,
 * so it is hidden from assistive tech rather than given a label nobody needs to
 * hear twice.
 */
type IconBadgeProps = {
  icon: LucideIcon;
  /** `contrast` switches to bronze, for use on a cream panel. */
  on?: "surface" | "contrast";
  className?: string;
};

export default function IconBadge({
  icon: Icon,
  on = "surface",
  className = "",
}: IconBadgeProps) {
  const colour =
    on === "contrast"
      ? "border-accent-on-contrast/45 text-accent-on-contrast"
      : "border-accent/40 text-accent";

  return (
    <span
      aria-hidden="true"
      className={`flex size-12 shrink-0 items-center justify-center rounded-pill border ${colour} ${className}`.trim()}
    >
      <Icon strokeWidth={1.25} className="size-5" />
    </span>
  );
}
