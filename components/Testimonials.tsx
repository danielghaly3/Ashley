import Container from "./Container";
import Reveal from "./Reveal";
import { testimonials } from "@/data/business";

/**
 * Three quotes set as large serif type on cream, separated by hairlines rather
 * than boxed into cards.
 *
 * No rating, no review count and no platform badge appears anywhere here — none
 * was available to verify, so none is implied. Replace the placeholder strings
 * in data/business.ts and the `isPlaceholder` marker disappears with them.
 */
export default function Testimonials() {
  const anyPlaceholder = testimonials.some((testimonial) => testimonial.isPlaceholder);

  return (
    <section className="bg-surface-sunken py-section-lg" aria-labelledby="testimonials-heading">
      <Container size="wide">
        <Reveal className="flex flex-col items-center text-center">
          <p className="eyebrow text-ink-subtle">In their words</p>
          <h2
            id="testimonials-heading"
            className="mt-7 text-heading leading-[1.1] sm:text-heading-lg"
          >
            Clients who come back.
          </h2>
        </Reveal>

        <ul className="mt-16 grid gap-px sm:mt-20 lg:grid-cols-3 lg:bg-line">
          {testimonials.map((testimonial, index) => (
            <Reveal
              as="li"
              key={index}
              delay={index * 90}
              className="border-t border-line pt-10 lg:border-t-0 lg:bg-surface-sunken lg:px-8 lg:pt-0 first:border-t-0 first:pt-0 lg:first:pl-0 lg:last:pr-0"
            >
              <figure className="flex h-full flex-col">
                <blockquote className="flex-1">
                  <p className="font-[family-name:var(--font-display)] text-title-sm leading-[1.45] text-ink sm:text-title-sm">
                    <span aria-hidden="true" className="text-accent">&ldquo;</span>
                    {testimonial.quote}
                    <span aria-hidden="true" className="text-accent">&rdquo;</span>
                  </p>
                </blockquote>
                <figcaption className="mt-8">
                  <p className="eyebrow text-ink">{testimonial.attribution}</p>
                  {testimonial.detail && (
                    <p className="mt-2.5 text-caption leading-relaxed text-ink-subtle">
                      {testimonial.detail}
                    </p>
                  )}
                  {testimonial.isPlaceholder && (
                    <p className="mt-4 text-label uppercase tracking-[0.18em] text-ink-subtle">
                      Placeholder — awaiting client review
                    </p>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        {anyPlaceholder && (
          <Reveal className="mt-14 flex justify-center">
            <p className="max-w-lg text-center text-caption leading-relaxed text-ink-subtle">
              These are sample layouts. Real client reviews can be dropped straight into{" "}
              <code className="font-[family-name:var(--font-sans)] text-ink">
                data/business.ts
              </code>
              .
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
