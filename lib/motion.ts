/**
 * The motion tokens, in the units Framer Motion wants (seconds).
 *
 * The same values live in `app/globals.css` as `--duration-*` / `--ease-*` for
 * everything CSS drives. They are mirrored here rather than read from the
 * stylesheet so a component never ships a one-off timing: if the rhythm of the
 * site changes, it changes in two declared places, not thirty call sites.
 *
 * Exits run at roughly 65% of their enter, so dismissing always feels quicker
 * than opening.
 */
export const motionTokens = {
  fast: 0.18,
  base: 0.24,
  slow: 0.36,
  reveal: 0.48,
  exit: 0.16,
} as const;

export const easing = {
  out: [0.2, 0.8, 0.3, 1],
  in: [0.5, 0, 0.9, 0.4],
  editorial: [0.22, 0.61, 0.36, 1],
} as const;

/** Collapses to an instant crossfade when the visitor asks for less motion. */
export function timing(reduceMotion: boolean | null, duration: number) {
  return { duration: reduceMotion ? 0.01 : duration, ease: easing.out };
}
