import type { ElementType, ReactNode } from "react";

/**
 * Body copy. Exists so the 16px floor and the 60–75 character measure are set
 * in one place rather than re-guessed per section.
 */
type ProseProps = {
  children: ReactNode;
  /**
   * `lead` (18px) opens a section. `body` (16px) is the floor for anything a
   * visitor has to actually read. `caption` (14px) is reserved for short fine
   * print — attribution, a note under a figure — never for a sentence that
   * carries information needed to make a decision.
   */
  size?: "body" | "lead" | "caption";
  as?: ElementType;
  /** Caps the measure. `none` opts out where a parent already constrains it. */
  measure?: "narrow" | "default" | "none";
  className?: string;
};

const sizes = {
  caption: "text-caption leading-[1.7] text-ink-subtle",
  body: "text-body leading-[1.75] text-ink-muted",
  lead: "text-body-lg leading-[1.65] text-ink",
} as const;

const measures = {
  narrow: "max-w-[34ch]",
  default: "max-w-[62ch]",
  none: "",
} as const;

export default function Prose({
  children,
  size = "body",
  as: Tag = "p",
  measure = "default",
  className = "",
}: ProseProps) {
  return (
    <Tag className={`${sizes[size]} ${measures[measure]} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
