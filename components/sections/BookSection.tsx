import Image from "next/image";
import { ArrowUpRight, CalendarCheck, Clock, CreditCard, MapPin } from "lucide-react";
import Container from "@/components/Container";
import SectionIntro from "@/components/SectionIntro";
import Reveal from "@/components/Reveal";
import Action from "@/components/Action";
import { formatDuration, formatPrice } from "@/lib/site";
import {
  booking,
  business,
  contact,
  preparation,
  serviceCategories,
} from "@/data/business";

/* ---------------------------------------------------------------------------
   WHY THERE IS NO EMBEDDED SCHEDULER HERE
   ---------------------------------------------------------------------------
   Acuity does offer an iframe embed, but it brings real costs: a fixed-height
   frame that scrolls awkwardly on a 390px screen, a nested scroll container
   around the payment step, and a third-party frame that Stripe and reCAPTCHA
   both have to load inside. Ashley's booking flow already works and already
   takes deposits.

   So this page does the one job an Acuity link cannot do: it removes the
   uncertainty *before* the hand-off — which set to pick, what a deposit
   commits you to, how to prepare — and then sends the visitor into her live
   scheduler in a new tab, with the site still open behind it. Reliability over
   embedding, exactly as intended.
--------------------------------------------------------------------------- */

const paths = [
  {
    slug: "full-sets",
    label: "Book a full set",
    heading: "New to Ashley, or starting fresh",
    body: "Your first set, or a rebuild after four or more weeks. Three hours, mapped from scratch, with a complimentary lash bath included.",
    image: "/images/client-portrait-03.jpg",
    imageAlt: "Client wearing a freshly applied wispy full set",
  },
  {
    slug: "refills",
    label: "Book a refill",
    heading: "Already wearing a set",
    body: "Two hours to rebalance what's grown out. Best booked around the two-week mark, with at least 40% of your extensions remaining.",
    image: "/images/client-portrait-02.jpg",
    imageAlt: "Client with a refreshed and rebalanced lash set",
  },
] as const;

const goodToKnow = [
  {
    icon: CalendarCheck,
    title: "A deposit holds your time",
    body: "A non-refundable deposit is required to secure your appointment, and it goes toward your service total.",
  },
  {
    icon: Clock,
    title: "24 hours to change plans",
    body: "Cancel or reschedule with at least 24 hours notice. Less than that — or a no-show — is charged at 50% of the scheduled service.",
  },
  {
    icon: CreditCard,
    title: "Balance due at the studio",
    body: "Cash, debit/credit and Apple Pay are accepted. Card payments carry a 15% extra fee, and the balance is due in full at the time of service.",
  },
  {
    icon: MapPin,
    title: "Details follow by email",
    body: `The studio is in ${business.neighborhood}. Additional location details are provided after booking.`,
  },
] as const;

export default function BookSection() {
  const additions =
    serviceCategories.find((category) => category.slug === "additions")?.services ?? [];

  /** One representative Sunday option per category, so the list stays short. */
  const sundayServices = serviceCategories
    .filter((category) => category.slug.startsWith("sunday"))
    .flatMap((category) =>
      category.services.filter((service) => service.featured),
    );

  return (
    <section id="book" aria-labelledby="book-heading" className="scroll-mt-28">
      <SectionIntro
        script="See you soon"
        title="Ready for your appointment?"
        id="book-heading"
      />

      {/* The two primary paths, each with its styles listed inline so a single
          tap lands on that appointment's live calendar. */}
      <section className="py-section-sm" aria-label="Choose an appointment">
        <Container size="wide">
          <ul className="grid gap-16 lg:grid-cols-2 lg:gap-12">
            {paths.map((path, index) => {
              const category = serviceCategories.find((entry) => entry.slug === path.slug);
              if (!category) return null;
              const from = Math.min(...category.services.map((service) => service.price));

              return (
                <li key={path.slug} className={index === 1 ? "lg:mt-16" : ""}>
                  <Reveal variant="image" className="block">
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-panel sm:aspect-[16/9] lg:aspect-[4/3]">
                      <Image
                        src={path.image}
                        alt={path.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 46vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>

                  <Reveal className="mt-8">
                    <p className="eyebrow text-ink-subtle">{path.heading}</p>
                    <h3 className="mt-5 text-title leading-tight sm:text-heading">
                      {path.label}
                    </h3>
                    <p className="mt-5 max-w-md text-body leading-[1.85] text-ink-muted">
                      {path.body}
                    </p>
                    <p className="figures eyebrow mt-6 text-ink-subtle">
                      From ${from} &middot; {category.eyebrow}
                    </p>
                  </Reveal>

                  <ul className="mt-9 border-t border-line">
                    {category.services.map((service) => (
                      <li key={service.id} className="border-b border-line">
                        <a
                          href={booking.appointmentUrl(service.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex min-h-tap items-center justify-between gap-5 py-4 transition-colors duration-fast ease-out active:bg-surface-accent"
                        >
                          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="font-[family-name:var(--font-display)] text-body-lg leading-snug text-ink transition-colors duration-fast group-hover:text-ink-subtle">
                              {service.name}
                            </span>
                            {service.featured && (
                              <span className="eyebrow text-ink-subtle">Most booked</span>
                            )}
                          </span>
                          <span className="flex shrink-0 items-center gap-4">
                            <span className="figures font-[family-name:var(--font-display)] text-body-lg text-ink">
                              {formatPrice(service.price)}
                            </span>
                            <ArrowUpRight
                              aria-hidden="true"
                              strokeWidth={1.25}
                              className="size-4 text-accent transition-transform duration-fast ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </span>
                          <span className="sr-only">
                            &mdash; book {service.name}, {formatDuration(service.duration)}
                            , {formatPrice(service.price)} (opens Acuity Scheduling in a
                            new tab)
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <Reveal className="mt-7">
                    <Action
                      href={`#svc-${category.slug}`}
                      tone="text"
                      showExternalIcon={false}
                    >
                      Compare the styles first
                    </Action>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          {/* Everything else */}
          <Reveal className="mt-20 border-t border-line pt-12 sm:mt-24">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-5">
                <p className="eyebrow text-ink-subtle">Something else</p>
                <h3 className="mt-5 text-title leading-[1.15] sm:text-heading">
                  Additions, patch tests
                  <br /> and Sundays.
                </h3>
              </div>

              <div className="mt-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
                <p className="max-w-md text-body leading-[1.85] text-ink-muted">
                  Bottom lashes, a lash removal or a patch test are shorter
                  appointments booked on their own. Sundays sit outside standard
                  hours and are released as squeeze-ins at a Sunday rate.
                </p>

                <ul className="mt-8 border-t border-line">
                  {[...additions, ...sundayServices].map((service) => (
                    <li key={service.id} className="border-b border-line">
                      <a
                        href={booking.appointmentUrl(service.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-h-tap items-center justify-between gap-5 py-4 transition-colors duration-fast ease-out active:bg-surface-accent"
                      >
                        <span className="font-[family-name:var(--font-display)] text-body-lg leading-snug text-ink transition-colors duration-fast group-hover:text-ink-subtle">
                          {service.name}
                        </span>
                        <span className="flex shrink-0 items-center gap-4">
                          <span className="figures text-caption text-ink-subtle">
                            {formatDuration(service.duration)}
                          </span>
                          <span className="figures font-[family-name:var(--font-display)] text-body-lg text-ink">
                            {formatPrice(service.price)}
                          </span>
                        </span>
                        <span className="sr-only">
                          &mdash; book {service.name} (opens Acuity Scheduling in a new
                          tab)
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Action href={booking.url} tone="secondary">
                    View all appointments
                  </Action>
                  <Action href="#services" tone="text" showExternalIcon={false}>
                    See the full menu
                  </Action>
                </div>
                <p className="mt-6 max-w-md text-body leading-[1.75] text-ink-subtle">
                  Sunday squeeze-ins carry a Sunday rate. Full Sunday pricing is listed
                  on the services page.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Good to know before the hand-off */}
      <section className="bg-surface-accent py-section" aria-labelledby="know-heading">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow text-ink-subtle">Before you book</p>
            <h3
              id="know-heading"
              className="mt-6 max-w-xl text-title leading-[1.12] sm:text-heading-lg"
            >
              Four things worth knowing.
            </h3>
          </Reveal>

          <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {goodToKnow.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 70}>
                <item.icon
                  aria-hidden="true"
                  strokeWidth={1}
                  className="size-6 text-ink-subtle"
                />
                <h4 className="mt-6 text-title-sm leading-snug">{item.title}</h4>
                <p className="mt-4 text-body leading-[1.75] text-ink-muted">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-14">
            <Action href="#policies" tone="text" showExternalIcon={false}>
              Read all policies
            </Action>
          </Reveal>
        </Container>
      </section>

      {/* Preparation, so it is in front of people at the moment of booking */}
      <section className="py-section-sm" aria-labelledby="prep-heading">
        <Container size="wide">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-ink-subtle">On the day</p>
              <h3
                id="prep-heading"
                className="mt-6 text-title leading-[1.15] sm:text-heading"
              >
                How to arrive.
              </h3>
            </Reveal>

            <div className="mt-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {preparation.map((item, index) => (
                  <Reveal
                    as="li"
                    key={item}
                    delay={index * 40}
                    className="flex items-baseline gap-4 border-t border-line py-5"
                  >
                    <span className="eyebrow shrink-0 text-ink-subtle" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body leading-[1.7] text-ink">
                      {item}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Final hand-off, straight to the scheduler */}
      <section className="bg-surface-contrast text-ink-on-contrast" aria-labelledby="final-heading">
        <Container size="wide" className="py-section">
          <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-16">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow text-ink-on-contrast-muted">Open the scheduler</p>
              <h3
                id="final-heading"
                className="mt-6 text-heading leading-[1.08] sm:text-heading-lg"
              >
                Live availability,
                <br /> straight from Ashley.
              </h3>
              <p className="mt-7 max-w-md text-body leading-[1.85] text-ink-on-contrast">
                {booking.provider} shows her real calendar, takes your deposit, and
                emails your confirmation with the studio details.
              </p>
              <div className="mt-10">
                <Action href={booking.url} tone="onContrast" className="px-10">
                  View all appointments
                </Action>
              </div>
            </Reveal>

            <Reveal className="mt-14 lg:col-span-5 lg:col-start-8 lg:mt-0">
              <dl className="divide-y divide-ink-on-contrast/25 border-y border-ink-on-contrast/25">
                <div className="flex flex-wrap items-baseline justify-between gap-4 py-5">
                  <dt className="eyebrow text-ink-on-contrast-muted">Studio</dt>
                  <dd className="text-body text-ink-on-contrast">
                    <a
                      href={contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-safe transition-colors duration-fast ease-out hover:text-ink-on-contrast"
                    >
                      {contact.address}
                    </a>
                  </dd>
                </div>
                {contact.hours.map((entry) => (
                  <div
                    key={entry.days}
                    className="flex flex-wrap items-baseline justify-between gap-4 py-5"
                  >
                    <dt className="eyebrow text-ink-on-contrast-muted">Hours</dt>
                    <dd className="text-body text-ink-on-contrast">
                      {entry.days} · {entry.time}
                    </dd>
                  </div>
                ))}
                <div className="flex flex-wrap items-baseline justify-between gap-4 py-5">
                  <dt className="eyebrow text-ink-on-contrast-muted">Questions</dt>
                  <dd className="text-body text-ink-on-contrast">
                    <a
                      href={contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-safe transition-colors duration-fast ease-out hover:text-ink-on-contrast"
                    >
                      {contact.instagramHandle}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-4 py-5">
                  <dt className="eyebrow text-ink-on-contrast-muted">Call or text</dt>
                  <dd className="text-body text-ink-on-contrast">
                    <a
                      href={contact.phoneHref}
                      className="tap-safe transition-colors duration-fast ease-out hover:text-ink-on-contrast"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>
    </section>
  );
}
