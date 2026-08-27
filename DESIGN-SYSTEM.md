# Design system — By Ashley Cass

Built against the **UI/UX Pro Max** ruleset (208 rules, priority 1–10). The
skill's searchable database was unavailable (its `data/` and `scripts/` symlinks
point at a directory that does not exist on this machine), so the palette, font
pairing and layout system here were derived from Ashley's own brand material and
then held to the ruleset in `SKILL.md`, which loaded in full.

Everything below is verified by a harness, not by eye — see **Verification**.

---

## Direction — dark luxury spa

Built to a supplied reference: deep warm charcoal ground, champagne-gold accent,
cream panels, pill controls, script accents above uppercase serif headings, a
drawn gold flourish in place of hard rules, and a centred composition.

This is a deliberate departure from the original brief's light warm-neutral
palette. It reads as premium in the field and is fully systematised — but it is a
different brand voice from Ashley's Instagram feed, which is light and airy.
Worth a conversation with her before it ships; the semantic token layer means
reverting to the light palette is one `:root` block, not a rebuild.

The palette is **committed dark**, so `color-scheme: dark` is declared rather
than a second theme being half-built.

### Palette

| Role | Value | Use |
|---|---|---|
| `surface` | `#2A2320` | page ground |
| `surface-sunken` | `#332B27` | hero panel, alternating bands |
| `surface-accent` | `#3C332D` | dark cards, pressed states |
| `surface-contrast` | `#F5E7D0` | cream panels |
| `ink` / `ink-muted` / `ink-subtle` | `#F3EADC` / `#CFC2B1` / `#A99B8A` | type on dark |
| `ink-on-contrast` / `-muted` | `#33291F` / `#5A4B3C` | type on cream |
| `accent` | `#D9AE68` | gold — 7.5:1 on the ground |
| `accent-on-contrast` | `#7E591F` | **bronze** — see below |
| `line` / `line-ui` | `#463C35` / `#92826D` | hairline / control borders (3:1) |

**The one finding that shaped the whole palette:** gold measures **7.5:1** on the
dark ground but only **1.69:1** on cream — it fails even the 3:1 non-text
minimum there. So every gold element sitting on a cream panel switches to
`accent-on-contrast` (bronze, 5.16:1): the script accents, the folio numerals,
the icon rings, the control borders. Without that substitution the cream panels
would look right and be unreadable.

### Reference-specific components

`Flourish` (the gold ornament, `currentColor` so cream panels render it bronze),
`IconBadge` (gold ring + icon, `on="contrast"` for bronze), `SectionIntro` (the
centred script → uppercase heading → paragraph unit), `PillarCards` (three cream
panels carrying her real style names and prices), and `TrustRail` rebuilt as the
four-card gold-icon row.

---

## 1. Token architecture

Three layers, in `app/globals.css`. **Components never reference a primitive.**

```
PRIMITIVES   --paper --cream --taupe --espresso …     raw, sampled from her brand
     ↓
SEMANTIC     --s-surface --s-ink --s-line-ui …        roles, re-assigned per mode
     ↓
COMPONENT    @theme inline → bg-surface, text-ink …   the utilities components use
```

That indirection is what makes the warm dim mode one media query instead of a
rewrite.

> **Gotcha, learned the hard way:** `@theme` cannot be nested inside
> `@media (prefers-color-scheme: dark)`. Tailwind v4 hoists `@theme` at build
> time, so a nested block wins *everywhere* — the whole site silently rendered in
> dim mode and the audit harness caught it as six contrast failures. Values now
> live in `:root`, the mapping lives in one top-level `@theme inline`.

### Colour roles

### Radii

Three steps, nothing improvised: `pill` for every control, `panel` (16px) for
cards and photography, `frame` (20px) for the hero stage.

### Type scale

Eight fixed steps plus two fluid display steps. **Nothing on the site sets a size
outside this list** — the previous build had improvised 30 distinct sizes.

`label 12 · caption 14 · body 16 · body-lg 18 · title-sm 22 · title 28 ·
heading 36 · heading-lg 46 · display clamp(40→72) · display-xl clamp(44→96)`

16px is the floor for anything a visitor has to read (§5 `readable-font-size`).
`caption` is reserved for short fine print — never for a sentence carrying
information needed to make a decision.

Tailwind's own scale is cleared (`--text-*: initial`), so `text-xl` and friends
do not exist: an off-scale size fails the build rather than quietly shipping.

Section and page headings are uppercase with positive tracking, per the
reference. Card and row titles stay sentence case — uppercase at small sizes
slows reading.

### Motion

One vocabulary: `fast 180ms · base 240ms · slow 360ms · reveal 480ms · exit
160ms`, with `ease-out / ease-in / ease-editorial`. Micro-interactions sit inside
the §7 150–300ms window; exits run ~65% of their enter. Framer Motion reads the
same numbers from `lib/motion.ts` so no component ships a one-off timing.
Scroll-reveal stagger is 40ms per item, per §7 `stagger-sequence` (30–50ms).

Also tokenised: `--spacing-section*` rhythm, `--spacing-tap` (44px), a named
`--z-*` scale, and two elevation steps.

---

## 2. What the redesign fixed

Each item was measured before and after, not assumed.

| Rule | Before | After |
|---|---|---|
§5 `readable-font-size` | 36 uses of 15px body, 20 of 13px | 16px floor everywhere |
§6 `font-scale` | 30 improvised sizes | 10 scale steps |
§7 `duration-timing` | 10 × 500ms, 2 × 1200ms | 42 × 180ms, nothing over 480ms |
§2 `press-feedback` | **zero** `active:` states site-wide | every control has one |
§2 `touch-target-size` | footer / nav / underline links 16–28px tall | 0 failures across 300+ targets |
§4 `primary-action` | several filled CTAs competing per view | exactly one per section |
§5 `viewport-units` | `min-h-screen` (100vh) | `min-h-dvh` |
§5 `fixed-element-offset` | footer slid under the floating CTA | page reserves the bar's height |
§6 `color-semantic` | 72 raw `text-espresso` etc. | semantic roles only |
§4 `dark-mode-pairing` | no dark mode possible | warm dim mode, verified |
§7 `motion-consistency` | durations hardcoded per component | shared tokens, CSS + JS |
§1 `focus-management` | focus never returned from the nav sheet | deterministic, both close paths |
§7 `state-transition` | hand-written transition lists named `transform`, which Tailwind v4 does not emit — the header retraction and every pressed state animated **nothing** | lists name `translate` / `scale`; verified via computed `transitionProperty` |

---

## 3. Structural changes

**Mobile navigation consolidated.** A hamburger in the header plus a
scroll-triggered floating CTA were two fixed elements competing for the same
corner. They are now one persistent bottom action bar: `Menu` (secondary) and
`Book` (primary), both icon + label, both ≥44px, safe-area aware. Most of this
site's traffic is an Instagram tap on a phone, so the two things that matter live
in thumb reach.

**The nav sheet is a real modal.** `role="dialog"`, `aria-modal`, focus moved in
on open, Tab trapped, Escape to dismiss, page locked, and focus returned to the
trigger on close. The return target is passed as a ref rather than inferred from
`document.activeElement`, because a tap does not reliably focus a button — iOS
Safari often leaves focus on the body, so inferring it would drop focus to the top
of the document on exactly the platform that matters most here.

**A trust rail, high on the page.** The conversion blocker for this business is
not the work, it is the terms: a non-refundable deposit, a 24-hour window, a 15
minute grace period, a home studio, no guests. On Acuity all of that arrives at
the payment step. It now appears before the visitor has invested anything, in
four scannable facts drawn from her own agreement.

**Homepage resequenced** around the funnel: see the aesthetic → *trust the terms*
→ find your set → read the menu → trust the artist → book. The terms come before
the decision on purpose.

**Price transparency in the hero.** "Full sets from $100 · 3 hours · Deposit to
book" — a first-time visitor's second question, after whether the work looks good.

---

## The header

Three behaviours, one rAF-throttled scroll listener:

- **Compress** — a masthead at the top (two-line wordmark, spaced nav) collapsing
  to a compact bar on an opaque surface once the page moves.
- **Retract** — slides away on a deliberate downward scroll, returns on any
  upward one. Pinned open whenever it holds focus, so a keyboard user is never
  chasing a moving target, and never retracts near the top.
- **Promote** — "Book Now" is a subordinate gold outline at the top, because the
  hero owns the page's one filled CTA. Past the hero that primary has left the
  viewport, so the header's CTA fills in and takes the role. One primary on
  screen, always.

The desktop nav carries a single gold hairline that travels between items —
parked under the current page, sliding to whatever is hovered or focused,
returning on leave. Animated with `transform` only, and re-measured on resize and
once `document.fonts.ready` resolves: the display face changes every label's
width, and measuring before that lands leaves the rule permanently misaligned.

## Single page

Six routes merged into one document. Navigation is anchor-based with a scroll-spy
indicator; the old paths redirect permanently to their sections.

The spy deliberately does **not** use an IntersectionObserver threshold. With
sections of wildly different heights — a four-card row against the full 41-service
price menu — several are on screen at once and "most visible" flickers as you
scroll. It picks the last section whose top has passed a reading line just below
the header, which is how a person would answer the question, and pins the final
section at the bottom of the page so a short closing section can still become
active.

Two things the merge broke, both caught by measurement rather than by eye:

- **Heading levels.** Five former page `h1`s would have become five `h1`s on one
  document. Every section body was demoted a level and `Accordion` gained a
  `headingLevel` prop so policy and FAQ rows render at `h4`. Now 1 / 16 / 34 / 30
  with zero skips.
- **A stale `priority`.** `ashley-portrait` was the About *page's* hero image, so
  it was preloaded. As a *section* it sits 14,000px down the page and was
  competing with the real LCP image for bandwidth. One preload now, one eager
  image.

Weight: 453KB of HTML, **50KB gzipped** over the wire.

## Verification

`/tmp` harness, run against the production build over CDP:

- **3/3 pass** — the single page at 375 / 768 / 1440, committed dark palette
  (529–541 text nodes and 136–141 interactive elements checked per run)
- Per run it checks: computed contrast of every rendered text node against its
  real resolved background (AA, with the large-text exception), body-size floor,
  every interactive element's box (with the WCAG 2.5.8 inline-link exemption),
  horizontal overflow, single `h1`, no heading-level skips, missing `alt`
- Reduced motion: all 66 revealed elements visible, marquee static, smooth
  scroll off, scroll-snap off
- Header: nav rule parks under the active item, follows a real hover to the
  pixel, returns on leave; retraction confirmed via computed `translate`; CTA
  promotes to a filled gold pill past the hero; focus pins the header open
- Interaction: style finder resolves the correct Acuity IDs per style, lookbook
  arrows drive native scroll, modal focus lifecycle correct on both close paths
- All 19 per-service Acuity deep links intact; all six routes still prerender static

## Not verified by machine

Real iOS/Android Safari behaviour, VoiceOver announcement order, and print. The
harness runs headless Chrome only.
