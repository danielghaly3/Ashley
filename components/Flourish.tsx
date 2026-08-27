/**
 * The gold flourish that separates sections.
 *
 * A single drawn line that swells and tapers, with a small diamond at its
 * centre — the ornament the design direction uses in place of a hard rule. It is
 * decorative, so it is hidden from assistive tech, and it inherits `currentColor`
 * so a cream panel can render it in bronze without a second component.
 */
type FlourishProps = {
  className?: string;
  /** `sm` for inside a section, `lg` for a full-width divider between them. */
  size?: "sm" | "lg";
};

export default function Flourish({ className = "", size = "lg" }: FlourishProps) {
  const width = size === "lg" ? "w-full max-w-[42rem]" : "w-40";

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 640 40"
      fill="none"
      preserveAspectRatio="none"
      className={`${width} h-6 text-accent ${className}`.trim()}
    >
      {/* Two mirrored sweeps meeting at the centre. */}
      <path
        d="M0 26C86 26 150 6 236 6c46 0 68 10 84 14"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M640 26c-86 0-150-20-236-20-46 0-68 10-84 14"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Softer echo beneath, so the ornament has depth rather than weight. */}
      <path
        d="M40 32C120 32 176 16 250 16c40 0 60 8 70 11"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M600 32c-80 0-136-16-210-16-40 0-60 8-70 11"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path d="M320 15l5 5-5 5-5-5z" fill="currentColor" />
    </svg>
  );
}
