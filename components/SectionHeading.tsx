import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  /** Small script flourish set above the title. Use once or twice per page. */
  script?: string;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Renders as h1 on page heroes, h2 everywhere else. */
  level?: 1 | 2;
};

export default function SectionHeading({
  eyebrow,
  title,
  script,
  children,
  align = "left",
  className = "",
  level = 2,
}: SectionHeadingProps) {
  const Tag = level === 1 ? "h1" : "h2";
  const alignment = align === "center" ? "items-center text-center" : "items-start";

  return (
    <Reveal variant="mask" className={`flex flex-col ${alignment} ${className}`.trim()}>
      {eyebrow && <p className="eyebrow text-ink-subtle">{eyebrow}</p>}
      {script && (
        <p className="script -mb-2 mt-5 text-title text-accent sm:text-heading">{script}</p>
      )}
      <Tag
        className={`${eyebrow || script ? "mt-6" : ""} max-w-3xl text-heading uppercase leading-[1.08] tracking-[0.015em] sm:text-heading-lg`}
      >
        {title}
      </Tag>
      {children && (
        <div
          className={`mt-7 max-w-xl text-body leading-[1.85] text-ink-muted ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {children}
        </div>
      )}
    </Reveal>
  );
}
