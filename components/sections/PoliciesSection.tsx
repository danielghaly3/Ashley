import Container from "@/components/Container";
import SectionIntro from "@/components/SectionIntro";
import Reveal from "@/components/Reveal";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import Action from "@/components/Action";
import { modelCollab, policies, preparation } from "@/data/business";

/**
 * IMPORTANT
 * The policy text rendered here comes verbatim from data/business.ts, which
 * mirrors Ashley's Client Consent & Policy Agreement in Acuity word for word.
 * Presentation is the only thing this page changes. If a policy needs updating,
 * update it in Acuity and in data/business.ts together so the two never drift.
 */
export default function PoliciesSection() {
  const items: AccordionItem[] = policies.map((policy) => ({
    id: policy.id,
    index: policy.number,
    title: policy.title,
    content: (
      <ul className="space-y-4">
        {policy.points.map((point, index) => (
          <li key={index} className="flex gap-4">
            <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    ),
  }));

  return (
    <section id="policies" aria-labelledby="policies-heading" className="scroll-mt-28">
      <SectionIntro
        script="Good to know"
        title="Everything worth knowing first"
        id="policies-heading"
      >
          These are the same policies you'll agree to at checkout — set out here so nothing arrives as a surprise once you're already booking. Wording is unchanged from Ashley's booking agreement.
        </SectionIntro>

      {/* The reminder — noticeable, but a hairline band rather than an alert box. */}
      <section className="pt-14 sm:pt-16" aria-label="Notice">
        <Container size="wide">
          <Reveal>
            <div className="border-y border-line-strong bg-surface-accent px-6 py-6 sm:px-10 sm:py-7">
              <p className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-5">
                <span className="eyebrow shrink-0 text-ink-subtle">Please note</span>
                <span className="font-[family-name:var(--font-display)] text-title-sm leading-snug text-ink sm:text-title-sm">
                  Please review all policies before booking your appointment.
                </span>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* The policies */}
      <section className="py-section-sm" aria-labelledby="policy-list-heading">
        <Container size="wide">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
            <Reveal className="lg:col-span-4">
              <h3
                id="policy-list-heading"
                className="text-title leading-[1.15] sm:text-heading lg:sticky lg:top-32"
              >
                <span className="block">The agreement,</span>
                <span className="block text-accent">in eight parts.</span>
              </h3>
            </Reveal>

            <div className="mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0">
              <Accordion items={items} defaultOpen={[policies[0].id]} headingLevel={4} />
            </div>
          </div>
        </Container>
      </section>

      {/* Preparation */}
      <section
        className="bg-surface-sunken py-section"
        aria-labelledby="preparation-heading"
      >
        <Container size="wide">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-ink-subtle">Preparation</p>
              <h3
                id="preparation-heading"
                className="mt-6 text-title leading-[1.15] sm:text-heading"
              >
                Before you
                <br /> come in.
              </h3>
              <p className="mt-7 max-w-sm text-body leading-[1.85] text-ink-muted">
                Six small things that make the difference between a good set and a set
                that lasts.
              </p>
            </Reveal>

            <div className="mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0">
              <ol className="grid gap-px sm:grid-cols-2">
                {preparation.map((item, index) => (
                  <Reveal
                    as="li"
                    key={item}
                    delay={index * 50}
                    className="flex items-baseline gap-5 border-t border-line py-6 sm:py-7"
                  >
                    <span className="eyebrow shrink-0 text-ink-subtle" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body leading-[1.75] text-ink">
                      {item}
                    </span>
                  </Reveal>
                ))}
              </ol>
              <Reveal className="mt-8">
                <p className="text-body leading-[1.75] text-ink-subtle">
                  Taken from Ashley&apos;s own preparation guidelines. If you have any
                  concerns about sensitivity to the glue, book a patch test at least
                  one week before your appointment.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Model collab — separate from the main agreement, as it is in Acuity. */}
      <section className="py-section-sm" aria-labelledby="model-heading">
        <Container size="wide">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-ink-subtle">Separate program</p>
              <h3
                id="model-heading"
                className="mt-6 text-title leading-[1.15] sm:text-heading"
              >
                {modelCollab.title}
              </h3>
              <p className="mt-7 max-w-sm text-body leading-[1.85] text-ink-muted">
                {modelCollab.summary}
              </p>
            </Reveal>

            <div className="mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0">
              <ul className="space-y-5 border-t border-line pt-8">
                {modelCollab.points.map((point) => (
                  <Reveal as="li" key={point} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-4 shrink-0 bg-accent"
                    />
                    <span className="text-body leading-[1.85] text-ink-muted">
                      {point}
                    </span>
                  </Reveal>
                ))}
              </ul>
              <Reveal className="mt-9">
                <Action href="#faq" tone="text" showExternalIcon={false}>
                  Still have a question?
                </Action>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

    </section>
  );
}
