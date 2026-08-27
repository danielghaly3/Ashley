# By Ashley Cass — brand website

A branded marketing site for **By Ashley Cass**, lash artist, Wynwood, Miami.

Booking stays exactly where it already works: Ashley's existing **Acuity Scheduling**
account. Nothing here replaces, wraps, or re-implements her scheduler — the site's job
is to remove every uncertainty *before* the hand-off, then send the visitor into her
live calendar.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # all six routes prerender as static HTML
npm run start
```

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

---

## Where the content lives

Almost everything a non-developer would want to change is in one file:

**`data/business.ts`**

| Section | What it holds |
| --- | --- |
| `business` | Name, wordmark lines, role, tagline, specialties, neighborhood |
| `contact` | Phone, email, Instagram, Facebook, address, hours |
| `booking` | The Acuity URL and the deep-link builder |
| `serviceCategories` | Every service: Acuity ID, name, duration, price, note |
| `addOns` | The extras Acuity offers at checkout |
| `policies` | The eight policy sections, verbatim |
| `preparation` | The six preparation guidelines, verbatim |
| `modelCollab` | The separate MODEL COLLAB program |
| `lashStyles` | The seven styles, each pairing its full set with its refill |
| `marqueeWords` | The words in the scrolling band |
| `faqs` | Questions, answers and their groups |
| `testimonials` | **Placeholders** — see below |
| `instagramGallery` | The curated "Follow the work" tiles |
| `seo` | Title, description, site URL |

The only prose held outside that file is the long-form About copy, in
`app/about/page.tsx`, which is marked as placeholder in the page itself.

---

## Where the data came from

Every price, duration, service name, policy line and contact detail on this site was
taken from Ashley's own material — nothing was invented:

- **Services, durations, prices, appointment IDs** — her live Acuity scheduling page
  (`byashleycass.as.me/schedule/054822df`).
- **Policies and preparation guidelines** — verbatim from the *Client Consent & Policy
  Agreement* form attached to her Acuity appointments, and the branded policy cards she
  uploaded to that page.
- **Phone, email, Instagram, Facebook, address, hours** — the contact card on the same
  page (`786 674 5855` · `byashleycass@gmail.com` · `1545 NW 8th Ave, Miami, FL` ·
  Mon–Sat 8am–8pm).
- **Tagline and specialties** — the `@byashleycass` Instagram bio.
- **Photography** — her own Instagram posts and the images on her booking page.
- **Palette** — sampled from her own graphics: `#F9F8F4` paper, `#EEE9E0` cream,
  `#DDD3C4` beige, `#99897A` logo-script taupe.

### Deliberately *not* claimed anywhere

No star rating, review count, award, certification, training history, years of
experience or client statistic appears on this site, because none could be verified.
If Ashley wants any of it, it should come from her directly.

### Needs Ashley's input

- **Testimonials** — the three quotes in `data/business.ts` are labelled placeholders
  and render with a visible "Placeholder — awaiting client review" note. Replace the
  `quote` / `attribution` strings and delete `isPlaceholder` and the note disappears.
- **About copy** — `app/about/page.tsx`, marked in-page.
- **`seo.siteUrl`** — set once a domain is chosen.
- **Her real portrait** — `public/images/ashley-portrait.jpg` is her own studio photo
  from Instagram; swap it for whichever portrait she prefers.
- **The Facebook link** — her contact card lists the name "Byashleycass" but no URL, so
  `contact.facebookUrl` is derived from the handle and unverified. Confirm it or drop the
  Facebook row from the footer.

---

## The style finder

`components/StyleFinder.tsx` is the centrepiece of the homepage, and the one thing an
Acuity list of forty service names cannot do: answer *"which set is mine?"*.

Pick a finish, read Ashley's own description of it, see the full-set and refill prices
side by side, and go straight into that appointment's calendar. Everything shown is
real — names, descriptors, durations, prices and both deep links all come from
`lashStyles` in `data/business.ts`, which maps each style to its two Acuity IDs.

It is deliberately **typographic, with no photograph per style**. There is no way to
verify which of her posts shows which style, and captioning one wrongly would
misrepresent her work. If Ashley supplies a labelled photo per style, add an `image`
field to `LashStyle` and the layout has room for it.

The choices are real radio semantics (`role="radiogroup"` / `role="radio"` /
`aria-checked`), so arrow keys work, and the result panel is `aria-live="polite"`.

---

## How booking works

```
Instagram → site → understand the styles → read the policies → Acuity → deposit
```

Acuity's internal `/category/<base64>` routes and its `?appointmentType=` query
parameter both bounce back to the category picker when used as a cold entry URL — this
was verified against her live scheduler. The one deep link that survives a cold load is
the full path, so:

- **Per-service links** use `booking.appointmentUrl(id)`, which opens that exact
  appointment's calendar. Every price row on `/services` and `/book` is one of these.
- **Category-level buttons** fall back to `booking.url`, the scheduler's front door.

There is **no embedded iframe**. Acuity offers one, but it scrolls badly at 390px, nests
a scroll container around the payment step, and loads Stripe and reCAPTCHA inside a
third-party frame. Reliability over embedding: every booking link opens Acuity in a new
tab with the site still open behind it. The reasoning is recorded in a comment at the
top of `app/book/page.tsx`.

---

## Images

All imagery is local, in `public/images`, and referenced by path — so swapping in new
photography is a matter of replacing files, with no code change if the filenames stay
the same.

| File | Used for |
| --- | --- |
| `hero-portrait.jpg` | Homepage hero |
| `lash-macro.jpg` | Hero overlay, "No two sets" |
| `lash-detail.jpg` | Collage, About |
| `client-portrait-02.jpg` | Refills |
| `client-portrait-03.jpg` | Full sets |
| `client-portrait-04.jpg` | Collage, Sunday refills |
| `client-portrait-05.jpg` | Collage anchor |
| `client-portrait-06.jpg` | Instagram tile |
| `studio-rest.jpg` | Collage, Sunday full sets |
| `studio-process.jpg` | Instagram tile |
| `studio-interior.jpg` | Additions, About studio |
| `ashley-portrait.jpg` | Meet Ashley, About |

`public/brand/by-ashley-cass-logo.jpg` is her real script logo, kept for print and
social. The site sets the wordmark in live type instead so it stays crisp at every size
and remains selectable and searchable.

**One caveat worth knowing:** the source photography is phone-resolution (Instagram caps
public images at 640px). Every frame on the site is therefore sized to display at or
below roughly 700px wide, which is why there are no full-bleed image bands. Once Ashley
supplies higher-resolution originals, `PageHero` already accepts an `image` prop for a
wide editorial band.

---

## Design notes

The full token architecture, the audit that drove this build, and the
verification harness results are in **[DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)**.
Short version:

**Type.** Cormorant Garamond for headlines, Jost for navigation, buttons, labels and
body copy, Sacramento for short script accents only. All three are self-hosted through
`next/font` with `display: swap`. An eight-step scale plus two fluid display steps —
nothing sets a size outside it, and 16px is the floor for anything a visitor has to
read. Prices and durations use the `figures` utility (lining, tabular numerals) so they
stay scannable in serif.

**Colour.** Dark luxury spa, built to a supplied reference: deep warm charcoal ground,
champagne-gold accent, cream panels. Three token layers in `app/globals.css` —
primitives, semantic roles, then the utilities components use. Components never touch a
primitive, which is why the palette is swappable in one `:root` block. Every text pair
clears WCAG AA; most clear AAA.

Gold reaches 7.5:1 on the dark ground but only **1.69:1 on cream**, so anything gold
sitting on a cream panel uses `accent-on-contrast` (bronze, 5.16:1) instead. That single
substitution is what makes the palette pass.

Note this is a different voice from Ashley's Instagram feed, which is light and airy —
worth confirming with her. Reverting to the light warm-neutral palette is one `:root`
block, not a rebuild.

**Mobile navigation.** One persistent bottom action bar — `Menu` and `Book` — instead of
a hamburger in the header plus a scroll-triggered floating CTA. Most traffic is an
Instagram tap on a phone, so the two things that matter stay in thumb reach, and the
page reserves the bar's height so the footer never slides underneath it.

**Texture.** Her logo sits on a printed paper card, so a single tiling noise sprite
(`public/brand/grain.png`, 10KB) sits fixed over the whole page — dark specks give the
ivory sections tooth, light specks do the same on espresso. It stays still while the
page moves, exactly like printing on stock.

**Composition.** The homepage is built as a magazine rather than a landing page: a
cover-scale headline that breaks the full width ahead of any photograph, a slow marquee
band as a running head, outlined folio numerals down the services page, a vertical spine
label bound to the left edge on wide screens, and a horizontal lookbook that bleeds off
both edges. The one non-obvious detail: `.filmstrip` carries `contain: paint` because a
flex scroll container nested inside the flex page shell leaks its scrollable width to
the document root in Chrome — without it the entire page scrolled sideways, even though
every ancestor reported the correct width. It also carries `scroll-padding-inline-start`
matching its own padding, or snap alignment cancels the page gutter and pulls the first
tile flush against the viewport edge.

**Motion.** Scroll reveals are pure CSS (`.reveal`, `.image-reveal` in `globals.css`);
the `Reveal` component only decides *when* to add the class. Framer Motion handles the
two things CSS does badly: the mobile menu transition and the accordion height. All of
it is switched off under `prefers-reduced-motion`, and a `<noscript>` block forces
revealed content visible if JavaScript never runs.

**Accessibility.** Semantic sectioning with labelled landmarks, a skip link, one
consistent `:focus-visible` ring, `aria-expanded` / `aria-controls` on the accordion and
the mobile menu, Escape to close, alt text on every image, and "(opens in a new tab)"
announced on every outbound link. On one page the heading hierarchy matters more, not
less: a single `h1` in the hero, `h2` per section, and the accordions render at `h4`
because they now sit two levels deep — verified as 1 / 16 / 34 / 30 with zero skipped
levels. Navigation uses `aria-current="location"` (not `"page"`), which is what the
attribute means when the target is a fragment of the current document.

---

## Structure

**This is a single-page site.** Everything lives at `/` as anchored sections;
navigation scrolls rather than routes. The paths the multi-page version exposed
(`/services`, `/about`, `/policies`, `/faq`, `/book`) are kept as permanent
redirects in `next.config.ts` so anything already shared lands on the right
section instead of a 404.

```
app/
  layout.tsx          shell, fonts, metadata, LocalBusiness JSON-LD
  page.tsx            the whole site, in order
  not-found.tsx  sitemap.ts  robots.ts  globals.css
components/sections/  ServicesSection, AboutSection, PoliciesSection,
                      FaqSection, BookSection
components/           Navbar, MobileMenu, ScrollProgress, Hero, Marquee, StyleFinder,
                      EditorialSection, ServicePreview, ImageCollage, Lookbook,
                      PersonalizedExperience, AboutPreview, Testimonials, Accordion,
                      BookingCTA, Footer, MobileBookingBar, Reveal, …
data/business.ts      single source of truth
lib/site.ts           navigation, formatters, external-link helpers
public/images         photography · public/brand  logo
```

---

## If a policy changes

Update it in **both** Acuity and `data/business.ts`. The site reproduces her booking
agreement word for word so the two must never drift — the policies page changes only
the presentation, never the meaning.
