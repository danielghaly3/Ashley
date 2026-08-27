import Container from "@/components/Container";
import SectionIntro from "@/components/SectionIntro";
import Reveal from "@/components/Reveal";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import Action from "@/components/Action";
import { contact, faqs } from "@/data/business";

/** Groups preserve the order in which they first appear in data/business.ts. */
function groupFaqs() {
  const groups = new Map<string, typeof faqs>();
  for (const faq of faqs) {
    const existing = groups.get(faq.group);
    if (existing) existing.push(faq);
    else groups.set(faq.group, [faq]);
  }
  return [...groups.entries()];
}

/** Every answer here is derived from the policies — nothing contradicts Acuity. */
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqSection() {
  const groups = groupFaqs();

  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-28">
      <SectionIntro
        script="Questions"
        title="Answered before you have to ask"
        id="faq-heading"
      />

      <section className="py-section-sm" aria-label="Frequently asked questions">
        <Container size="wide">
          {groups.map(([group, items], groupIndex) => {
            const accordionItems: AccordionItem[] = items.map((faq) => ({
              id: faq.question
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
              title: faq.question,
              content: <p>{faq.answer}</p>,
            }));

            return (
              <div
                key={group}
                className={groupIndex === 0 ? "" : "mt-20 sm:mt-24"}
              >
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                  <Reveal className="lg:col-span-4">
                    <p className="eyebrow text-ink-subtle" aria-hidden="true">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-5 text-title leading-[1.15] sm:text-heading lg:sticky lg:top-32">
                      {group}
                    </h3>
                  </Reveal>

                  <div className="mt-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
                    <Accordion items={accordionItems} closeRule={false} headingLevel={4} />
                  </div>
                </div>
              </div>
            );
          })}

          <Reveal className="mt-20 flex flex-col items-start gap-6 border-t border-line pt-12 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-body leading-[1.85] text-ink-muted">
              The full agreement — deposits, cancellations, refill windows and the
              foreign refill conditions — is set out on the policies page.
            </p>
            <Action href="#policies" tone="secondary">
              Read the policies
            </Action>
          </Reveal>
        </Container>
      </section>


      <script
        type="application/ld+json"
        // Static, author-controlled JSON built from the FAQ data above.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </section>
  );
}
