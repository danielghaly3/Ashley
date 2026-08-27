import Container from "./Container";
import Reveal from "./Reveal";
import Action from "./Action";
import SectionIntro from "./SectionIntro";
import { serviceCategories } from "@/data/business";
import { formatDuration } from "@/lib/site";

/**
 * Three cream panels on the dark ground — the pillar row from the design
 * direction, carrying the three things a visitor actually chooses between.
 *
 * The bullets are her real style names, straight from Acuity, so the row doubles
 * as the menu at a glance: it answers "what can I book" without a page change.
 * Prices are the true minimum per category, not a marketing figure.
 */
const pillars = ["full-sets", "refills", "additions"] as const;

export default function PillarCards() {
  const cards = pillars
    .map((slug) => serviceCategories.find((c) => c.slug === slug))
    .filter((c): c is (typeof serviceCategories)[number] => Boolean(c));

  return (
    <section className="py-section" aria-labelledby="pillars-heading">
      <Container size="wide">
        <SectionIntro script="What I do" title="Three ways to wear them" id="pillars-heading">
          Full sets build your look from the beginning. Refills keep it seamless.
          Additions are the shorter appointments in between.
        </SectionIntro>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-7">
          {cards.map((card, index) => {
            const from = Math.min(...card.services.map((s) => s.price));
            const durations = card.services.map((s) => s.duration);
            const shortest = formatDuration(Math.min(...durations));
            const longest = formatDuration(Math.max(...durations));

            return (
              <Reveal as="li" key={card.slug} delay={index * 40} className="flex">
                <article className="flex w-full flex-col rounded-panel bg-surface-contrast p-8 shadow-floating sm:p-9">
                  <p className="eyebrow text-accent-on-contrast">
                    {String(index + 1).padStart(2, "0")} &middot; {card.eyebrow}
                  </p>

                  <h3 className="mt-4 text-title uppercase tracking-[0.02em] text-ink-on-contrast">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-body leading-[1.75] text-ink-on-contrast-muted">
                    {card.intro}
                  </p>

                  <ul className="mt-7 flex flex-col gap-2.5 border-t border-line-on-contrast pt-6">
                    {card.services.slice(0, 4).map((service) => (
                      <li
                        key={service.id}
                        className="flex items-baseline justify-between gap-4"
                      >
                        <span className="text-body text-ink-on-contrast">
                          {service.name}
                        </span>
                        <span className="figures text-body text-ink-on-contrast-muted">
                          ${service.price}
                        </span>
                      </li>
                    ))}
                    {card.services.length > 4 && (
                      <li className="text-caption text-ink-on-contrast-muted">
                        + {card.services.length - 4} more
                      </li>
                    )}
                  </ul>

                  <p className="figures eyebrow mt-7 text-accent-on-contrast">
                    From ${from}
                    <span aria-hidden="true" className="px-2">
                      &middot;
                    </span>
                    {shortest === longest ? shortest : `${shortest} – ${longest}`}
                  </p>

                  <div className="mt-auto pt-7">
                    <Action
                      href={`#svc-${card.slug}`}
                      tone="textOnContrast"
                      showExternalIcon={false}
                      aria-label={`View ${card.title} services`}
                    >
                      View services
                    </Action>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
