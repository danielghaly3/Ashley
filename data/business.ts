/**
 * ---------------------------------------------------------------------------
 * BY ASHLEY CASS — single source of truth
 * ---------------------------------------------------------------------------
 * Everything a non-developer might want to change lives in this file.
 *
 * PROVENANCE OF THIS DATA
 *   Every price, duration, service name, policy line and contact detail below
 *   was taken from Ashley's own material:
 *     • the live Acuity booking page  (byashleycass.as.me/schedule/054822df)
 *     • the branded info cards she uploaded to that booking page
 *     • the Instagram bio for @byashleycass
 *   Nothing here is invented. Anything that still needs Ashley's sign-off is
 *   marked with a `NEEDS CLIENT INPUT` comment so it is easy to find.
 * ---------------------------------------------------------------------------
 */

/* ===========================================================================
 * IDENTITY
 * ========================================================================= */

export const business = {
  name: "By Ashley Cass",
  /** Rendered as two lines of letter-spaced type in the header/footer. */
  wordmark: { line1: "BY ASHLEY CASS", line2: "LASH ARTIST" },
  /** From the Instagram bio. */
  role: "Miami Lash Artist",
  tagline: "Luxury lashes, tailored to you",
  /** From the Instagram bio: "Custom • Wispy • Brown • Volume" */
  specialties: ["Custom", "Wispy", "Brown", "Volume"],
  neighborhood: "Wynwood, Miami",
  city: "Miami, FL",
  /** The artist name attached to the Acuity calendar. */
  artistName: "Ashley Sirias",
} as const;

/* ===========================================================================
 * CONTACT  — all values verified from Ashley's own contact card
 * ========================================================================= */

export const contact = {
  phone: "786 674 5855",
  phoneHref: "tel:+17866745855",
  email: "byashleycass@gmail.com",
  instagramHandle: "@byashleycass",
  instagramUrl: "https://www.instagram.com/byashleycass/",
  facebookName: "Byashleycass",
  /**
   * NEEDS CLIENT INPUT — her contact card lists the Facebook name "Byashleycass"
   * but not a URL, so this is derived from the handle and unverified. Confirm the
   * real profile URL with Ashley, or remove the Facebook row from the footer.
   */
  facebookUrl: "https://www.facebook.com/Byashleycass",
  address: "1545 NW 8th Ave, Miami, FL",
  mapsUrl: "https://maps.google.com/?q=1545+NW+8th+Ave,+Miami,+FL",
  hours: [{ days: "Monday — Saturday", time: "8am — 8pm" }],
  /**
   * Sundays are not part of standard hours. Acuity carries two separate
   * "Sunday Squeeze-in" categories at a higher rate, so they are presented
   * on the site as limited add-on availability rather than regular hours.
   */
  hoursNote: "Sunday squeeze-in appointments are released separately.",
} as const;

/* ===========================================================================
 * BOOKING  — Acuity Scheduling stays the booking engine. Nothing is rebuilt.
 * ========================================================================= */

const ACUITY_BASE = "https://byashleycass.as.me/schedule/054822df";

/** Ashley's only Acuity calendar. */
const ACUITY_CALENDAR_ID = 11183271;

/**
 * Acuity's `/category/<base64>` routes are *internal* — they work once the app
 * has booted, but pasted in as an entry URL they bounce straight back to the
 * category picker. The same is true of `?appointmentType=`. Verified against the
 * live scheduler, the only deep link that survives a cold load is the full path
 * below, so that is the only one used for a specific service.
 */
const acuityAppointment = (appointmentTypeId: number) =>
  `${ACUITY_BASE}/category/${encodeURIComponent(
    btoa("__all__"),
  )}/appointment/${appointmentTypeId}/calendar/${ACUITY_CALENDAR_ID}`;

export const booking = {
  /** The scheduler's front door — Acuity's own category picker. */
  url: ACUITY_BASE,
  provider: "Acuity Scheduling",
  /**
   * Deep link to one appointment type's calendar. Cold-load safe.
   * Category-level buttons intentionally fall back to `booking.url`.
   */
  appointmentUrl: acuityAppointment,
  depositNote: "A non-refundable deposit secures your appointment.",
} as const;

/* ===========================================================================
 * SERVICES  — names, durations and prices exactly as they appear in Acuity
 * ========================================================================= */

export type Service = {
  /** Acuity appointment type ID — used to deep link to that exact calendar. */
  id: number;
  name: string;
  /** Minutes, from Acuity. */
  duration: number;
  /** USD. Acuity stores these as strings; kept numeric here for formatting. */
  price: number;
  /** Ashley's own one-line style descriptor, where she wrote one. */
  note?: string;
  featured?: boolean;
};

export type ServiceCategory = {
  slug: string;
  /** Editorial name used on the website. */
  title: string;
  /** The exact Acuity category name — do not edit, it drives the deep link. */
  acuityCategory: string;
  eyebrow: string;
  intro: string;
  image: string;
  imageAlt: string;
  services: Service[];
  /** Shown under the list where Acuity or her policies add a condition. */
  footnote?: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "full-sets",
    title: "Full Sets",
    acuityCategory: "Lash Full Sets",
    eyebrow: "New sets · 3 hours",
    intro:
      "A full set is where your lash map is designed from scratch — curl, length and density chosen around your eye shape and your natural lashes. Every full set includes a complimentary lash bath.",
    image: "/images/client-portrait-03.jpg",
    imageAlt: "Client wearing a freshly applied wispy lash set",
    services: [
      { id: 97359882, name: "Classic Full Set", duration: 180, price: 100, note: "Natural & timeless" },
      { id: 97359908, name: "Wet Full Set", duration: 180, price: 115, note: "Dark, glossy, and textured for a mascara-like effect." },
      { id: 97359899, name: "Brown Lash Full Set", duration: 180, price: 125, note: "Soft & effortless" },
      { id: 97359924, name: "Wispy Volume Full Set", duration: 180, price: 130, note: "Fluffy & textured" },
      { id: 97359938, name: "Volume Full Set", duration: 180, price: 130, note: "Bold & glamorous" },
      {
        id: 97359918,
        name: "Signature Full Set",
        duration: 180,
        price: 135,
        note: "Most popular. My custom wispy lash style with textured spikes and soft fullness, tailored to each eye shape.",
        featured: true,
      },
      { id: 97359945, name: "Anime Full Set", duration: 180, price: 135, note: "Spiky & eye-catching" },
    ],
    footnote: "A complimentary lash bath is included with every full set.",
  },
  {
    slug: "refills",
    title: "Refills",
    acuityCategory: "Lash Refills (2-Week Refill)",
    eyebrow: "Maintenance · 2 hours",
    intro:
      "Refills rebalance your set — grown-out extensions are removed and replaced so the map stays even and seamless. Booked around the two-week mark, your lashes never have to start over.",
    image: "/images/client-portrait-02.jpg",
    imageAlt: "Client with a refreshed, balanced lash set",
    services: [
      { id: 97359981, name: "Classic Refill", duration: 120, price: 70 },
      { id: 97359995, name: "Wet Set Refill", duration: 120, price: 90 },
      { id: 97359989, name: "Brown Lash Refill", duration: 120, price: 90 },
      { id: 97360012, name: "Wispy Volume Refill", duration: 120, price: 95 },
      { id: 97360018, name: "Volume Refill", duration: 120, price: 95 },
      { id: 97360000, name: "Signature Refill", duration: 120, price: 100, featured: true },
      { id: 97360033, name: "Anime Refill", duration: 120, price: 100 },
    ],
    footnote:
      "Refills are for existing clients only, and at least 40% of your extensions must remain. Coming from another artist? A $20 foreign refill fee applies.",
  },
  {
    slug: "additions",
    title: "Additions & Consultations",
    acuityCategory: "Others",
    eyebrow: "Add-ons · 40 min — 1 hour",
    intro:
      "Shorter appointments that sit alongside a set — bottom lashes, a clean removal, or a patch test if you'd like to check for sensitivity before committing.",
    image: "/images/studio-interior.jpg",
    imageAlt: "White peonies on a warm neutral surface inside the studio",
    services: [
      { id: 93975690, name: "Bottom Lashes", duration: 60, price: 20 },
      { id: 80190070, name: "Lash Removal", duration: 40, price: 25 },
      {
        id: 93975834,
        name: "Patch Test / Consultation",
        duration: 45,
        price: 30,
        note: "If you have any concerns that you may have possible allergic reactions or sensitivity to the glue, a small patch test can be completed to ensure your safety.",
      },
    ],
    footnote: "A patch test must be booked at least one week before your actual appointment.",
  },
  {
    slug: "sunday-full-sets",
    title: "Sunday Full Sets",
    acuityCategory: "Sunday Appointments (Lash Full Sets)",
    eyebrow: "Squeeze-in · 3 hours",
    intro:
      "Sunday sits outside standard studio hours. When Ashley opens a Sunday, full sets are released as squeeze-in appointments at a Sunday rate.",
    image: "/images/studio-rest.jpg",
    imageAlt: "Client resting during a Sunday squeeze-in appointment",
    services: [
      { id: 97360580, name: "(Sunday Squeeze-in) Classic Full Set", duration: 180, price: 115, note: "Natural & timeless" },
      { id: 97360608, name: "(Sunday Squeeze-in) Wet Full Set", duration: 180, price: 130, note: "Dark, glossy, and textured for a mascara-like effect." },
      { id: 97360602, name: "(Sunday Squeeze-in) Brown Lash Full Set", duration: 180, price: 140, note: "Soft & effortless" },
      { id: 97360919, name: "(Sunday Squeeze-in) Wispy Volume Full Set", duration: 180, price: 145, note: "Fluffy & textured" },
      { id: 97360934, name: "(Sunday Squeeze-in) Volume Full Set", duration: 180, price: 145, note: "Bold & glamorous" },
      { id: 97360643, name: "(Sunday Squeeze-in) Signature Full Set", duration: 180, price: 150, note: "Most popular. My custom wispy lash style with textured spikes and soft fullness, tailored to each eye shape.", featured: true },
      { id: 97360943, name: "(Sunday Squeeze-in) Anime Full Set", duration: 180, price: 150, note: "Spiky & eye-catching" },
    ],
    footnote: "Sunday availability is limited and released at Ashley's discretion.",
  },
  {
    slug: "sunday-refills",
    title: "Sunday Refills",
    acuityCategory: "Sunday Appointments (Lash Refill 2 Week Fill-In)",
    eyebrow: "Squeeze-in · 2 hours",
    intro:
      "The same two-week refill, offered on a Sunday when availability opens up.",
    image: "/images/client-portrait-04.jpg",
    imageAlt: "Client resting during a Sunday refill appointment",
    services: [
      { id: 97361009, name: "(Sunday Squeeze-in) Classic Refill", duration: 120, price: 85 },
      { id: 97361019, name: "(Sunday Squeeze-in) Wet Refill", duration: 120, price: 105 },
      { id: 97361037, name: "(Sunday Squeeze-in) Brown Lash Refill", duration: 120, price: 105 },
      { id: 97361083, name: "(Sunday Squeeze-in) Wispy Volume Refill", duration: 180, price: 110 },
      { id: 97361105, name: "(Sunday Squeeze-in) Volume Refill", duration: 120, price: 110 },
      { id: 97361064, name: "(Sunday Squeeze-in) Signature Refill", duration: 120, price: 115, featured: true },
      { id: 97361124, name: "(Sunday Squeeze-in) Anime Refill", duration: 120, price: 115 },
    ],
    footnote: "Sunday availability is limited and released at Ashley's discretion.",
  },
];

/** Optional extras Acuity offers at checkout. */
export const addOns = [
  { name: "Bottom Lashes", duration: 60, price: 20 },
  { name: "Foreign Refill", duration: 30, price: 20 },
  { name: "Lash Removal", duration: 40, price: 25 },
] as const;

/* ===========================================================================
 * LASH STYLES
 * ---------------------------------------------------------------------------
 * The seven styles, each pairing its full set with its matching refill so the
 * style finder on the homepage can quote both prices and link to both
 * calendars. `vibe` is Ashley's own descriptor from Acuity, word for word.
 *
 * Deliberately no photograph per style: there is no way to verify which of her
 * posts shows which style, and labelling one wrongly would misrepresent her
 * work. The finder is typographic for that reason.
 * ========================================================================= */

export type LashStyle = {
  key: string;
  /** Short name used in the finder. The Acuity service names stay untouched. */
  name: string;
  /** Ashley's own words. Do not paraphrase. */
  vibe: string;
  fullSetId: number;
  refillId: number;
  featured?: boolean;
};

export const lashStyles: LashStyle[] = [
  { key: "classic", name: "Classic", vibe: "Natural & timeless", fullSetId: 97359882, refillId: 97359981 },
  { key: "wet", name: "Wet", vibe: "Dark, glossy, and textured for a mascara-like effect", fullSetId: 97359908, refillId: 97359995 },
  { key: "brown", name: "Brown", vibe: "Soft & effortless", fullSetId: 97359899, refillId: 97359989 },
  { key: "wispy-volume", name: "Wispy Volume", vibe: "Fluffy & textured", fullSetId: 97359924, refillId: 97360012 },
  { key: "volume", name: "Volume", vibe: "Bold & glamorous", fullSetId: 97359938, refillId: 97360018 },
  {
    key: "signature",
    name: "Signature",
    vibe: "My custom wispy lash style with textured spikes and soft fullness, tailored to each eye shape",
    fullSetId: 97359918,
    refillId: 97360000,
    featured: true,
  },
  { key: "anime", name: "Anime", vibe: "Spiky & eye-catching", fullSetId: 97359945, refillId: 97360033 },
];

/** Look up any service by its Acuity appointment type ID. */
export function findService(id: number): Service | undefined {
  for (const category of serviceCategories) {
    const match = category.services.find((service) => service.id === id);
    if (match) return match;
  }
  return undefined;
}

/** The marquee band between sections. Her own words, from Instagram and Acuity. */
export const marqueeWords = [
  "Soft",
  "Wispy",
  "Intentional",
  "Custom",
  "Brown",
  "Volume",
  "Wynwood, Miami",
] as const;

/* ===========================================================================
 * HOMEPAGE SERVICE PREVIEW — the three categories worth leading with
 * ========================================================================= */

export const featuredCategories = ["full-sets", "refills", "additions"] as const;

/* ===========================================================================
 * POLICIES  — reproduced verbatim from Ashley's Client Consent & Policy
 * Agreement in Acuity. Wording is unchanged; only the presentation differs.
 * ========================================================================= */

export type Policy = { id: string; number: string; title: string; points: string[] };

export const policies: Policy[] = [
  {
    id: "deposits",
    number: "01",
    title: "Deposits & Cancellations",
    points: [
      "A non-refundable deposit is required to secure your appointment. The deposit will go toward your service total.",
      "Please provide at least 24 hours notice if you need to cancel or reschedule your appointment.",
      "Appointments canceled with less than 24 hours notice, as well as no-call/no-show appointments, will result in a charge of 50% of the scheduled service.",
      "Thank you for respecting my time and appointment availability.",
    ],
  },
  {
    id: "late-arrival",
    number: "02",
    title: "Late Arrival",
    points: [
      "Please arrive on time to your appointment. A 15-minute grace period is allowed.",
      "Clients arriving more than 15 minutes late will receive a $15 late fee added to their service total.",
      "If the delay affects the schedule for the remainder of the day, the appointment may need to be rescheduled.",
    ],
  },
  {
    id: "refills",
    number: "03",
    title: "Refills",
    points: [
      "Refills are for existing clients only.",
      "2-3 weeks: Regular refill price.",
      "Over 3 weeks: Additional fee may apply.",
      "Over 4 weeks: A new full set is required.",
      "At least 40% of lash extensions must remain to qualify for a refill.",
    ],
  },
  {
    id: "foreign-refills",
    number: "04",
    title: "Foreign Refills",
    points: [
      "A refill on lash extensions applied by another lash artist. A $20 foreign refill fee will be added to the regular refill price due to the extra time and corrective work that may be required.",
      "Please note: Foreign refills must have at least 40% of the lash extensions remaining. If there are fewer than 40% remaining, excessive outgrown lashes, or the previous work cannot be safely filled, the appointment will be converted to a full set, and full set pricing will apply.",
    ],
  },
  {
    id: "payment",
    number: "05",
    title: "Payment",
    points: [
      "We accept cash, debit/credit cards, and Apple Pay.",
      "Payment with card will be charged a 15% extra fee.",
      "Payment is due in full at the time of service.",
    ],
  },
  {
    id: "parking",
    number: "06",
    title: "Parking & Location",
    points: [
      "The studio is located in Wynwood, Miami.",
      "Parking is available in the front of the building or on the side using PayByPhone. Please park within the lines and avoid parking in reserved spots.",
      "Additional location details will be provided after booking.",
    ],
  },
  {
    id: "guests",
    number: "07",
    title: "No Extra Guests",
    points: [
      "For safety and space reasons, no extra guests or children are allowed during appointments.",
    ],
  },
  {
    id: "good-to-know",
    number: "08",
    title: "Good To Know",
    points: [
      "A complimentary lash bath is included with every full set.",
      "Please note: this is a home-based business, not a commercial studio.",
    ],
  },
];

/** From Ashley's "PREPARATION" card, verbatim. */
export const preparation = [
  "Arrive with clean lashes (no makeup).",
  "Remove contact lenses if needed.",
  "Avoid caffeine before your appointment.",
  "Dress comfortably.",
  "Come with a freshly washed face.",
  "Use the restroom before your session.",
] as const;

/**
 * Ashley also runs a MODEL COLLAB program in Acuity. It is summarised here and
 * linked from the policies page so nothing on the booking page is a surprise.
 */
export const modelCollab = {
  title: "Model Collab",
  summary:
    "A separate category for clients who want to receive services for content and portfolio at 50% off.",
  points: [
    "Available for new or existing clients interested in modeling services.",
    "MODEL appointments must be booked through the MODEL category only.",
    "A 24-hour cancellation/reschedule notice is required. No-shows or late cancellations may result in loss of the discounted rate.",
    "MODEL services may take longer than regular appointments.",
    "By booking a MODEL appointment, you consent to the possibility of your lashes being used for social media, portfolio, or promotional purposes.",
    "MODEL appointments are subject to availability and cannot be combined with other promotions, discounts, or packages.",
  ],
} as const;

/* ===========================================================================
 * FAQ  — answers drawn only from the policies above and the Acuity listing
 * ========================================================================= */

export type Faq = { question: string; answer: string; group: string };

export const faqs: Faq[] = [
  {
    group: "Choosing your set",
    question: "How do I know which lash set to book?",
    answer:
      "If you have never had lashes with Ashley before, book a Full Set. Each style is a different finish rather than a different quality: Classic is natural and timeless, Wet is dark and glossy for a mascara-like effect, Brown is soft and effortless, Volume is bold and glamorous, Wispy Volume is fluffy and textured, and Anime is spiky and eye-catching. The Signature Full Set is the most popular — Ashley's custom wispy style with textured spikes and soft fullness, tailored to each eye shape. If you are still unsure, message @byashleycass before booking.",
  },
  {
    group: "Choosing your set",
    question: "What if I'm worried about sensitivity to the glue?",
    answer:
      "Book a Patch Test / Consultation. If you have any concerns that you may have possible allergic reactions or sensitivity to the glue, a small patch test can be completed to ensure your safety. It must be booked at least one week before your actual appointment.",
  },
  {
    group: "Refills",
    question: "How often should I schedule a refill?",
    answer:
      "Around every two to three weeks, which is charged at the regular refill price. Over three weeks an additional fee may apply, and over four weeks a new full set is required. At least 40% of your lash extensions must remain to qualify for a refill.",
  },
  {
    group: "Refills",
    question: "Can I get a refill over another artist's work?",
    answer:
      "Yes — that is a foreign refill. A $20 foreign refill fee is added to the regular refill price because of the extra time and corrective work that may be required. Foreign refills must have at least 40% of the lash extensions remaining. If there are fewer than 40% remaining, excessive outgrown lashes, or the previous work cannot be safely filled, the appointment will be converted to a full set and full set pricing will apply.",
  },
  {
    group: "Refills",
    question: "Are refills open to new clients?",
    answer:
      "Refills are for existing clients only. If Ashley has not done your set, book a full set — or a refill knowing the foreign refill fee and the 40% condition above apply.",
  },
  {
    group: "Your appointment",
    question: "What should I do before my appointment?",
    answer:
      "Arrive with clean lashes and no makeup, and come with a freshly washed face. Remove contact lenses if needed, avoid caffeine before your appointment, dress comfortably, and use the restroom before your session.",
  },
  {
    group: "Your appointment",
    question: "What happens if I'm late?",
    answer:
      "There is a 15-minute grace period. Arriving more than 15 minutes late adds a $15 late fee to your service total, and if the delay affects the schedule for the remainder of the day the appointment may need to be rescheduled.",
  },
  {
    group: "Your appointment",
    question: "Can I bring someone with me?",
    answer:
      "For safety and space reasons, no extra guests or children are allowed during appointments.",
  },
  {
    group: "Your appointment",
    question: "How long will I be there?",
    answer:
      "Full sets are booked for three hours and refills for two. Bottom lashes are one hour, a lash removal is 40 minutes, and a patch test is 45 minutes.",
  },
  {
    group: "Booking & payment",
    question: "How do I reschedule or cancel?",
    answer:
      "Use the link in your Acuity confirmation email, and give at least 24 hours notice. Appointments canceled with less than 24 hours notice, as well as no-call/no-show appointments, will result in a charge of 50% of the scheduled service.",
  },
  {
    group: "Booking & payment",
    question: "Why is a deposit required?",
    answer:
      "A non-refundable deposit is required to secure your appointment, and it goes toward your service total.",
  },
  {
    group: "Booking & payment",
    question: "How do I pay the balance?",
    answer:
      "Cash, debit/credit cards, and Apple Pay are accepted, and payment is due in full at the time of service. Payment with card will be charged a 15% extra fee.",
  },
  {
    group: "Booking & payment",
    question: "Do you book Sundays?",
    answer:
      "Standard hours are Monday to Saturday, 8am to 8pm. Sunday appointments are released separately as squeeze-ins at a Sunday rate, when availability allows.",
  },
  {
    group: "Finding the studio",
    question: "Where are you located?",
    answer:
      "The studio is in Wynwood, Miami. Parking is available in the front of the building or on the side using PayByPhone — please park within the lines and avoid reserved spots. Additional location details will be provided after booking. Please note that this is a home-based business, not a commercial studio.",
  },
];

/* ===========================================================================
 * TESTIMONIALS
 * ---------------------------------------------------------------------------
 * NEEDS CLIENT INPUT — these are clearly-labelled placeholders written to
 * show the layout at a realistic length. No public reviews, ratings or
 * statistics were available to quote, so none are claimed anywhere on the
 * site. Replace `quote` and `attribution` with real client words; delete
 * `isPlaceholder` once a testimonial is real and approved for publication.
 * ========================================================================= */

export type Testimonial = {
  quote: string;
  attribution: string;
  detail?: string;
  isPlaceholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Replace this with a real client's words about how their set was designed around their eyes.",
    attribution: "Client name",
    detail: "Signature Full Set",
    isPlaceholder: true,
  },
  {
    quote:
      "Replace this with a review that speaks to how the appointment itself felt — the space, the pace, the care.",
    attribution: "Client name",
    detail: "Wispy Volume Full Set",
    isPlaceholder: true,
  },
  {
    quote:
      "Replace this with a longer-term client talking about retention and coming back for refills.",
    attribution: "Client name",
    detail: "Signature Refill",
    isPlaceholder: true,
  },
];

/* ===========================================================================
 * INSTAGRAM  — a curated static gallery, no API and no fake live feed.
 * Swap the files in /public/images to update. The tiles link to the profile.
 * ========================================================================= */

export const instagramGallery = [
  { src: "/images/client-portrait-03.jpg", alt: "Client wearing a custom wispy lash set" },
  { src: "/images/lash-detail.jpg", alt: "Close view of a finished lash line" },
  { src: "/images/client-portrait-06.jpg", alt: "Close view of a signature wispy set" },
  { src: "/images/studio-process.jpg", alt: "Ashley applying lash extensions in the studio" },
  { src: "/images/client-portrait-04.jpg", alt: "Client after a lash appointment" },
  { src: "/images/studio-interior.jpg", alt: "White peonies in the studio's neutral interior" },
];

/* ===========================================================================
 * SEO
 * ========================================================================= */

export const seo = {
  title: "By Ashley Cass | Lash Artist",
  description:
    "Custom lash extensions and personalized lash styling by Ashley Cass in Wynwood, Miami. Explore services, policies and book your next appointment online.",
  /** NEEDS CLIENT INPUT — set once a domain is chosen. */
  siteUrl: "https://byashleycass.com",
} as const;
