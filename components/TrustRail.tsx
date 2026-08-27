import { CalendarCheck, Clock, Home, Sparkles } from "lucide-react";
import Container from "./Container";
import Reveal from "./Reveal";
import Action from "./Action";
import Flourish from "./Flourish";
import IconBadge from "./IconBadge";
import SectionIntro from "./SectionIntro";

/**
 * The four-card feature row from the design direction, carrying the thing that
 * actually decides whether a first-time client books.
 *
 * The blocker for this business is not the work — it is the terms. Ashley runs a
 * private, home-based studio with a non-refundable deposit, a 24-hour
 * cancellation window, a 15-minute grace period and a 40% rule on refills. On
 * Acuity all of that arrives at the payment step, which is the worst possible
 * moment to discover it. So it is stated here instead, before a visitor has
 * invested anything.
 *
 * Every line is drawn from her own policy agreement, condensed but not altered.
 */
const facts = [
  {
    icon: CalendarCheck,
    label: "Deposit",
    value: "Secures your time",
    detail:
      "Non-refundable, and it comes off your service total — not on top of it.",
  },
  {
    icon: Clock,
    label: "Changes",
    value: "24 hours notice",
    detail:
      "Reschedule freely up to a day before. Inside that window it is 50% of the service.",
  },
  {
    icon: Home,
    label: "The studio",
    value: "Private, one client",
    detail:
      "Home-based in Wynwood, not a commercial salon. No extra guests during appointments.",
  },
  {
    icon: Sparkles,
    label: "Included",
    value: "Lash bath, every set",
    detail:
      "Complimentary with every full set. Refills keep the map even rather than starting over.",
  },
] as const;

export default function TrustRail() {
  return (
    <section
      className="bg-surface-sunken py-section"
      aria-labelledby="trust-heading"
    >
      <Container size="wide">
        <SectionIntro
          script="Before you book"
          title="No surprises at checkout"
          id="trust-heading"
        >
          The same terms you will agree to at the payment step, set out here so
          nothing arrives as a surprise once you are already booking.
        </SectionIntro>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, index) => (
            <Reveal as="li" key={fact.label} delay={index * 40} className="flex">
              <article className="flex w-full flex-col rounded-panel border border-line bg-surface-accent p-7 transition-[border-color] duration-base ease-out hover:border-accent/40">
                <IconBadge icon={fact.icon} />
                <p className="eyebrow mt-6 text-accent">{fact.label}</p>
                <h3 className="mt-3 text-title-sm leading-snug text-ink">
                  {fact.value}
                </h3>
                <p className="mt-3 text-body leading-[1.7] text-ink-muted">
                  {fact.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-col items-center gap-8">
          <Action href="/policies" tone="secondary">
            Read the full policies
          </Action>
          <Flourish size="sm" />
        </Reveal>
      </Container>
    </section>
  );
}
