import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Action from "@/components/Action";
import BookingCTA from "@/components/BookingCTA";
import { addOns, booking, serviceCategories } from "@/data/business";
import { formatDuration, formatPrice } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lash Services",
  description:
    "Full sets, two-week refills, additions and Sunday squeeze-in appointments. Every set is mapped to your eye shape and natural lashes.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        script="the menu"
        title={
          <>
            Lash services,
            <br /> mapped to you.
          </>
        }
        intro={
          <>
            <p>
              Each style below is a different finish, not a different standard of
              work. The right one depends on your eye shape, how much fullness you
              want to wear day to day, and how your natural lashes are doing.
            </p>
            <p>
              Durations and prices are live from Ashley&apos;s booking system.
              Choosing a service takes you straight to that appointment&apos;s
              availability.
            </p>
          </>
        }
      >
        <Reveal className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {serviceCategories.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              className="tap-safe eyebrow text-ink-subtle transition-colors duration-fast ease-out hover:text-ink active:text-ink"
            >
              {category.title}
            </a>
          ))}
        </Reveal>
      </PageHero>

      {serviceCategories.map((category, index) => {
        const imageLeft = index % 2 === 0;

        return (
          <section
            key={category.slug}
            id={category.slug}
            className={`scroll-mt-28 py-section ${
              index % 2 === 0 ? "bg-surface" : "bg-surface-sunken"
            }`}
            aria-labelledby={`${category.slug}-heading`}
          >
            <Container size="wide">
              {/* An oversized outlined page number, like a printed folio. */}
              <p
                aria-hidden="true"
                className={`folio -mb-4 text-display sm:text-display-xl ${
                  imageLeft ? "" : "lg:text-right"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </p>

              <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                {/* Photograph */}
                <div
                  className={`${
                    imageLeft ? "lg:col-span-5" : "lg:col-span-5 lg:col-start-8"
                  } lg:row-start-1`}
                >
                  <Reveal variant="image" className="block lg:sticky lg:top-28">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-panel sm:aspect-[3/2] lg:aspect-[4/5]">
                      <Image
                        src={category.image}
                        alt={category.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="eyebrow mt-6 text-ink-subtle">{category.eyebrow}</p>
                  </Reveal>
                </div>

                {/* The list */}
                <div
                  className={`mt-12 ${
                    imageLeft ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-6 lg:col-start-1"
                  } lg:row-start-1 lg:mt-0`}
                >
                  <Reveal variant="mask">
                    <h2
                      id={`${category.slug}-heading`}
                      className="text-heading leading-[1.1] sm:text-heading-lg"
                    >
                      {category.title}
                    </h2>
                    <p className="mt-6 max-w-xl text-body leading-[1.85] text-ink-muted">
                      {category.intro}
                    </p>
                  </Reveal>

                  <Reveal className="mt-10">
                    <p className="eyebrow text-ink-subtle">
                      Tap a style to see its availability
                    </p>
                  </Reveal>

                  <ul className="mt-6 border-t border-line">
                    {category.services.map((service) => (
                      <li key={service.id} className="border-b border-line">
                        <a
                          href={booking.appointmentUrl(service.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex min-h-tap flex-col gap-3 py-6 transition-colors duration-fast ease-out active:bg-surface-accent sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                        >
                          <span className="flex-1">
                            <span className="flex flex-wrap items-baseline gap-3">
                              <span className="font-[family-name:var(--font-display)] text-title-sm leading-snug text-ink transition-colors duration-fast group-hover:text-ink-subtle">
                                {service.name}
                              </span>
                              {service.featured && (
                                <span className="eyebrow text-ink-subtle">
                                  Most booked
                                </span>
                              )}
                            </span>
                            {service.note && (
                              <span className="mt-2 block max-w-md text-body leading-[1.7] text-ink-muted">
                                {service.note}
                              </span>
                            )}
                          </span>

                          <span className="flex shrink-0 items-baseline gap-5 sm:gap-7">
                            <span className="figures text-caption tracking-wide text-ink-subtle">
                              {formatDuration(service.duration)}
                            </span>
                            <span className="figures font-[family-name:var(--font-display)] text-title-sm text-ink">
                              {formatPrice(service.price)}
                            </span>
                          </span>
                          <span className="sr-only">
                            — book {service.name} (opens Acuity Scheduling in a new tab)
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  {category.footnote && (
                    <Reveal className="mt-8">
                      <p className="max-w-xl text-caption leading-[1.8] text-ink-subtle">
                        {category.footnote}
                      </p>
                    </Reveal>
                  )}

                  <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <Action href={booking.url} tone="primary">
                      Open the scheduler
                    </Action>
                    <Action href="/policies" tone="text" showExternalIcon={false}>
                      Read the policies first
                    </Action>
                  </Reveal>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Add-ons — the extras Acuity offers at checkout. */}
      <section className="bg-surface-accent py-section-sm" aria-labelledby="addons-heading">
        <Container size="wide">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-ink-subtle">At checkout</p>
              <h2
                id="addons-heading"
                className="mt-6 text-title leading-[1.15] sm:text-heading"
              >
                Add-ons you can
                <br /> attach to a booking.
              </h2>
            </Reveal>

            <div className="mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0">
              <ul className="border-t border-line">
                {addOns.map((addOn) => (
                  <Reveal
                    as="li"
                    key={addOn.name}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-5"
                  >
                    <span className="figures font-[family-name:var(--font-display)] text-title-sm text-ink">
                      {addOn.name}
                    </span>
                    <span className="flex shrink-0 items-baseline gap-5">
                      <span className="figures text-caption text-ink-subtle">
                        {formatDuration(addOn.duration)}
                      </span>
                      <span className="figures font-[family-name:var(--font-display)] text-title-sm text-ink">
                        {formatPrice(addOn.price)}
                      </span>
                    </span>
                  </Reveal>
                ))}
              </ul>
              <Reveal className="mt-7">
                <p className="text-caption leading-[1.8] text-ink-subtle">
                  A $20 foreign refill fee applies to a refill over another
                  artist&apos;s work. See the refill policies for the conditions.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <BookingCTA
        script="Ready when you are"
        title="Found your set?"
        body="Every service above links straight into Ashley's booking system, where you can see live availability and secure your time with a deposit."
      />
    </>
  );
}
