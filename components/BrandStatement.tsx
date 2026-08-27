import Container from "./Container";
import Reveal from "./Reveal";
import { business } from "@/data/business";

/**
 * Pure typography — no card, no border, no icon. The three words carry the
 * whole section and the surrounding whitespace does the rest.
 */
export default function BrandStatement() {
  return (
    <section className="py-section" aria-label="Brand statement">
      <Container>
        <Reveal variant="mask" className="flex flex-col items-center text-center">
          <p className="eyebrow text-ink-subtle">{business.specialties.join(" · ")}</p>

          <h2 className="mt-9 font-[family-name:var(--font-display)] text-[clamp(2.5rem,8.5vw,6.5rem)] font-light leading-[0.98] tracking-[-0.025em]">
            <span className="block">Soft. Wispy.</span>
            <span className="block text-accent">Intentional.</span>
          </h2>

          <p className="mt-10 max-w-lg text-body leading-[1.9] text-ink-muted">
            Every set is customized to enhance your natural features rather than
            overpower them.
          </p>

          <span aria-hidden="true" className="mt-12 h-16 w-px bg-line" />
        </Reveal>
      </Container>
    </section>
  );
}
