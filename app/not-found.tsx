import Container from "@/components/Container";
import Action from "@/components/Action";
import { business } from "@/data/business";

export default function NotFound() {
  return (
    <section className="py-32 sm:py-40 lg:py-48">
      <Container size="narrow">
        <div className="flex flex-col items-center text-center">
          <p className="eyebrow text-ink-subtle">404</p>
          <p className="script mt-8 text-heading text-accent">not quite</p>
          <h1 className="mt-4 text-heading leading-[1.1] sm:text-display">
            This page has grown out.
          </h1>
          <p className="mt-8 max-w-md text-body leading-[1.85] text-ink-muted">
            The link you followed doesn&apos;t exist on {business.name}. The services,
            policies and booking are all a tap away.
          </p>
          <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Action href="/book" tone="primary">
              Book an appointment
            </Action>
            <Action href="/" tone="secondary">
              Back to home
            </Action>
          </div>
        </div>
      </Container>
    </section>
  );
}
