import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { externalLinkProps, isExternal } from "@/lib/site";

/**
 * Every call to action on the site, including the hand-offs to Acuity.
 *
 * Pill-shaped, per the design direction. The rules this encodes so no call site
 * has to remember them:
 *   · one filled `primary` per section — everything else is subordinate
 *   · 44px minimum interactive height, always
 *   · a pressed state, not just hover: the audience is on a phone, where hover
 *     does not exist and a tap otherwise gives no feedback at all
 *   · 180ms micro-interactions, from the shared motion tokens
 *   · outbound links announce themselves, visually and to a screen reader
 *
 * The `*OnContrast` tones are for cream panels, where gold drops to 1.69:1 and
 * bronze has to stand in.
 */
type Tone =
  | "primary"
  | "secondary"
  | "ghost"
  | "text"
  | "primaryOnContrast"
  | "onContrast"
  | "textOnContrast";

type ActionProps = {
  href: string;
  children: ReactNode;
  tone?: Tone;
  /** Fills the container. Used in the mobile-first stacked CTA groups. */
  block?: boolean;
  className?: string;
  /** Overrides the automatic outbound arrow. */
  showExternalIcon?: boolean;
  "aria-label"?: string;
};

/* `translate` and `scale` are named explicitly: Tailwind v4 emits those
   standalone properties rather than composing `transform`, so a transition list
   that says `transform` animates nothing. */
const shell =
  "group inline-flex min-h-tap items-center justify-center gap-2.5 rounded-pill eyebrow " +
  "transition-[background-color,color,border-color,box-shadow,scale] duration-fast ease-out " +
  "active:scale-[0.975]";

const tones: Record<Tone, string> = {
  primary: `${shell} bg-accent px-9 py-4 text-surface hover:bg-accent-lift hover:shadow-glow active:bg-accent-lift`,
  secondary: `${shell} border border-line-ui px-9 py-4 text-ink hover:border-accent hover:text-accent active:border-accent active:text-accent`,
  ghost: `${shell} border border-accent/45 bg-surface-accent px-9 py-4 text-ink hover:border-accent hover:text-accent active:border-accent`,
  primaryOnContrast: `${shell} bg-ink-on-contrast px-9 py-4 text-surface-contrast hover:bg-accent-on-contrast active:bg-accent-on-contrast`,
  onContrast: `${shell} border border-line-on-contrast-ui px-9 py-4 text-ink-on-contrast hover:bg-ink-on-contrast hover:text-surface-contrast active:bg-ink-on-contrast active:text-surface-contrast`,
  text:
    "group inline-flex min-h-tap items-center gap-2 eyebrow text-accent " +
    "transition-colors duration-fast ease-out hover:text-accent-lift active:text-accent-lift",
  textOnContrast:
    "group inline-flex min-h-tap items-center gap-2 eyebrow text-accent-on-contrast " +
    "transition-colors duration-fast ease-out hover:text-ink-on-contrast active:text-ink-on-contrast",
};

const underlined: Tone[] = ["text", "textOnContrast"];

export default function Action({
  href,
  children,
  tone = "primary",
  block = false,
  className = "",
  showExternalIcon,
  ...rest
}: ActionProps) {
  const external = isExternal(href);
  const withIcon = showExternalIcon ?? external;
  const isUnderlined = underlined.includes(tone);

  const body = (
    <>
      <span className={isUnderlined ? "relative" : undefined}>
        {children}
        {isUnderlined && (
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 left-0 h-px w-full origin-left bg-current
                       transition-transform duration-base ease-editorial
                       group-hover:scale-x-0"
          />
        )}
      </span>
      {withIcon && (
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.25}
          className="size-3.5 shrink-0 transition-transform duration-fast ease-out
                     group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  const classes = `${tones[tone]} ${block ? "w-full" : ""} ${className}`.trim();

  if (external) {
    return (
      <a href={href} className={classes} {...externalLinkProps} {...rest}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {body}
    </Link>
  );
}
