type MarqueeProps = {
  /** The words to cycle. Kept short — this is a texture, not a sentence. */
  items: readonly string[];
  /** `gold` is the dark band with gold type; `cream` is the inverted panel. */
  tone?: "gold" | "cream";
  /** Accessible name for the band, since the moving type itself is hidden. */
  label: string;
};

/**
 * A slow horizontal band of oversized type between sections — the screen
 * equivalent of a running head across a spread.
 *
 * The track is duplicated and translated by exactly half its own width, so the
 * loop is seamless at any viewport without measuring anything in JavaScript.
 * The moving copy is hidden from assistive tech and replaced with one static
 * sentence, and the animation pauses on hover or keyboard focus and is switched
 * off entirely under `prefers-reduced-motion`.
 */
export default function Marquee({
  items,
  tone = "gold",
  label,
}: MarqueeProps) {
  const dark = tone === "gold";
  const track = [...items, ...items];

  return (
    <section
      className={`marquee overflow-hidden border-y ${
        dark
          ? "border-line bg-surface text-accent"
          : "border-line-on-contrast bg-surface-contrast text-ink-on-contrast"
      }`}
      aria-label={label}
    >
      <p className="sr-only">{label}</p>

      <div
        aria-hidden="true"
        className="marquee-track flex w-max items-center py-6 sm:py-8"
      >
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center">
            <span className="whitespace-nowrap px-6 font-[family-name:var(--font-display)] text-title font-light leading-none tracking-[-0.01em] sm:px-9 sm:text-heading-lg lg:text-display">
              {item}
            </span>
            <span
              className={`h-1.5 w-1.5 shrink-0 rotate-45 ${
                dark ? "bg-accent" : "bg-accent-on-contrast"
              }`}
            />
          </span>
        ))}
      </div>
    </section>
  );
}
