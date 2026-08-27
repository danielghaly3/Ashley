import Image from "next/image";
import Action from "./Action";
import Prose from "./Prose";
import Reveal from "./Reveal";
import Flourish from "./Flourish";
import { business, contact, serviceCategories } from "@/data/business";

/**
 * The hero, built to the reference: a dark stage, type held to the left, the
 * photograph filling the right, and a gold flourish drawn across the seam where
 * the hero meets the page.
 *
 * There is exactly one filled button. "Explore services" is subordinate, because
 * a hero with two equal buttons has no primary action at all.
 *
 * On a phone it inverts to type-first with the photograph beneath — the layout an
 * Instagram visitor actually lands in — and the persistent bottom bar keeps
 * booking in thumb reach the whole way down.
 */
export default function Hero() {
  const fullSets = serviceCategories.find((c) => c.slug === "full-sets");
  const startingPrice = fullSets
    ? Math.min(...fullSets.services.map((s) => s.price))
    : null;

  return (
    <section className="relative overflow-hidden" aria-label="Introduction">
      <div className="mx-auto w-full max-w-[110rem] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
        <div className="relative overflow-hidden rounded-frame bg-surface-sunken">
          <div className="lg:grid lg:min-h-[30rem] lg:grid-cols-2 lg:items-center">
            {/* ---- Type ------------------------------------------------- */}
            <Reveal
              immediate
              className="relative z-raised px-6 pb-12 pt-12 sm:px-10 sm:pb-14 sm:pt-16 lg:px-14 lg:py-20"
            >
              <p className="script text-title text-accent">{business.role}</p>

              {/* Set uppercase at the heading step rather than display: the
                  direction's headline is two tight lines, and the display step
                  pushes this copy to four in a half-width column. */}
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-heading font-light uppercase leading-[1.02] tracking-[0.015em] text-ink sm:text-heading-lg">
                Lashes designed
                <br />
                <span className="text-accent-veil">to look like you</span>
              </h1>

              <Prose size="lead" measure="narrow" className="mt-7 text-ink-muted">
                Custom lash sets thoughtfully designed around your eye shape,
                natural lashes, lifestyle and personal aesthetic.
              </Prose>

              {/* Price transparency up front. A first-time visitor's second
                  question, after "does her work look good", is "what does it
                  cost" — and burying it costs bookings. */}
              {startingPrice !== null && (
                <p className="figures eyebrow mt-7 flex flex-wrap gap-x-1 text-ink-subtle">
                  <span className="whitespace-nowrap">
                    Full sets from ${startingPrice}
                  </span>
                  <span aria-hidden="true" className="px-1 text-accent">
                    &middot;
                  </span>
                  <span className="whitespace-nowrap">3 hours</span>
                  <span aria-hidden="true" className="px-1 text-accent">
                    &middot;
                  </span>
                  <span className="whitespace-nowrap">Deposit to book</span>
                </p>
              )}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <Action href="#book" tone="primary">
                  Book your set
                </Action>
                <Action href="#services" tone="text" showExternalIcon={false}>
                  Explore services
                </Action>
              </div>
            </Reveal>

            {/* ---- Photograph ------------------------------------------- */}
            <Reveal
              variant="image"
              immediate
              delay={120}
              className="relative block lg:h-full"
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:h-full lg:min-h-[30rem] lg:aspect-auto">
                <Image
                  src="/images/hero-portrait.jpg"
                  alt="Client resting on a cream throw wearing a custom wispy lash set"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[46%_28%]"
                />
                {/* Feathers the photograph into the panel on the left so the
                    two halves read as one stage, not a pasted-in image. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 hidden bg-gradient-to-r from-surface-sunken via-transparent to-transparent lg:block"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* The flourish sits on the seam between the hero and the page. */}
      <Reveal immediate delay={260} className="flex justify-center py-8 sm:py-10">
        <Flourish />
      </Reveal>

      <p className="sr-only">
        {business.name} — {business.tagline}. {contact.instagramHandle}.
      </p>
    </section>
  );
}
