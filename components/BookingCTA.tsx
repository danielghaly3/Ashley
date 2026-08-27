import Container from "./Container";
import Reveal from "./Reveal";
import Action from "./Action";
import Flourish from "./Flourish";
import SectionIntro from "./SectionIntro";
import { booking } from "@/data/business";

type BookingCTAProps = {
  script?: string;
  title?: string;
  body?: string;
  /** `direct` hands straight to Acuity; `page` routes via /book first. */
  destination?: "page" | "direct";
  /** `stage` is the dark closing block; `contrast` is the cream panel. */
  surface?: "stage" | "contrast";
};

/**
 * The closing block. Centred on the axis, one gold pill, a flourish above it —
 * the way the design direction ends a page.
 *
 * Booking always lands in Ashley's Acuity account. This either routes through
 * /book, where a visitor picks a style first, or straight to the scheduler.
 */
export default function BookingCTA({
  script = "Ready when you are",
  title = "Your next set starts here",
  body = "Choose your appointment through Ashley's secure online booking system.",
  destination = "page",
  surface = "stage",
}: BookingCTAProps) {
  const onContrast = surface === "contrast";

  return (
    <section
      className={
        onContrast
          ? "bg-surface-contrast py-section"
          : "relative overflow-hidden bg-surface-sunken py-section"
      }
      aria-labelledby="booking-cta-heading"
    >
      {/* A single soft gold bloom behind the centre, so the closing block has a
          focal point without resorting to a busy background. */}
      {!onContrast && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-pill opacity-[0.07] blur-3xl"
          style={{ background: "var(--color-accent)" }}
        />
      )}

      <Container size="wide" className="relative">
        <div className="flex flex-col items-center">
          <Reveal immediate={false} className="flex justify-center">
            <Flourish size="sm" className={onContrast ? "text-accent-on-contrast" : ""} />
          </Reveal>

          <SectionIntro
            script={script}
            title={title}
            id="booking-cta-heading"
            on={onContrast ? "contrast" : "surface"}
            className="mt-6"
          >
            {body}
          </SectionIntro>

          <Reveal className="mt-11 flex flex-col items-center">
            <Action
              href={destination === "page" ? "/book" : booking.url}
              tone={onContrast ? "primaryOnContrast" : "primary"}
            >
              Book an appointment
            </Action>

            <p
              className={`mt-8 max-w-md text-center text-body leading-[1.7] ${
                onContrast ? "text-ink-on-contrast-muted" : "text-ink-subtle"
              }`}
            >
              {booking.depositNote} Scheduling is handled by {booking.provider}.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
