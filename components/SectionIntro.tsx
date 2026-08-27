import type { ReactNode } from "react";
import Reveal from "./Reveal";
import Prose from "./Prose";

/**
 * The centred section opening the direction repeats: a small script line, a
 * serif heading, then one paragraph — all on the centre axis.
 *
 * `on="contrast"` swaps the script to bronze, because gold on a cream panel
 * measures 1.69:1 and disappears.
 */
type SectionIntroProps = {
  script: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  on?: "surface" | "contrast";
  className?: string;
};

export default function SectionIntro({
  script,
  title,
  children,
  id,
  on = "surface",
  className = "",
}: SectionIntroProps) {
  const scriptColour = on === "contrast" ? "text-accent-on-contrast" : "text-accent";
  const titleColour = on === "contrast" ? "text-ink-on-contrast" : "text-ink";
  const bodyColour = on === "contrast" ? "text-ink-on-contrast-muted" : "text-ink-muted";

  return (
    <Reveal
      variant="mask"
      className={`flex flex-col items-center text-center ${className}`.trim()}
    >
      <p className={`script text-title ${scriptColour}`}>{script}</p>
      <h2
        id={id}
        className={`mt-2 text-heading uppercase tracking-[0.02em] sm:text-heading-lg ${titleColour}`}
      >
        {title}
      </h2>
      {children && (
        <Prose className={`mt-6 text-center ${bodyColour}`}>{children}</Prose>
      )}
    </Reveal>
  );
}
