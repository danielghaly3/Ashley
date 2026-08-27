import { business } from "@/data/business";

type WordmarkProps = {
  /** `sm` for the sticky header, `lg` for the footer. */
  size?: "sm" | "lg";
  className?: string;
  /** Hides the "LASH ARTIST" line — used in the very compact mobile header. */
  compact?: boolean;
};

/**
 * The text lockup. Ashley's real logo is a script signature; it is kept in
 * /public/brand for print, but the site sets the name in live type so it stays
 * crisp at every size and remains selectable and searchable.
 */
export default function Wordmark({
  size = "sm",
  className = "",
  compact = false,
}: WordmarkProps) {
  const nameSize = size === "lg" ? "text-body" : "text-caption";

  return (
    <span className={`flex flex-col leading-none ${className}`.trim()}>
      <span className={`wordmark ${nameSize} text-ink`}>
        {business.wordmark.line1}
      </span>
      {!compact && (
        <span
          className="wordmark mt-1.5 text-label text-ink-subtle"
          style={{ letterSpacing: "0.42em" }}
        >
          {business.wordmark.line2}
        </span>
      )}
    </span>
  );
}
