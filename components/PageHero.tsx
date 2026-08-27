import Image from "next/image";
import type { ReactNode } from "react";
import Container from "./Container";
import Reveal from "./Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  script?: string;
  /** Omit for text-only heroes such as Policies and the FAQ. */
  image?: { src: string; alt: string; position?: string };
  children?: ReactNode;
};

/**
 * The shared inner-page opening: eyebrow, oversized serif headline, a short
 * intro, and optionally one wide photograph beneath. Consistent enough that the
 * pages feel like one publication, loose enough that each can breathe.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  script,
  image,
  children,
}: PageHeroProps) {
  return (
    <section className="pt-section-sm" aria-label="Page introduction">
      <Container size="wide">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
          <Reveal immediate variant="mask" className="lg:col-span-7">
            <p className="eyebrow text-ink-subtle">{eyebrow}</p>
            {script && (
              <p className="script mt-6 text-title text-accent sm:text-heading">{script}</p>
            )}
            <h1
              className={`${script ? "mt-3" : "mt-7"} text-heading uppercase leading-[1.06] tracking-[0.015em] sm:text-heading-lg lg:text-display`}
            >
              {title}
            </h1>
          </Reveal>

          {intro && (
            <Reveal className="mt-10 lg:col-span-4 lg:col-start-9 lg:mt-4 lg:self-end">
              <div className="max-w-md space-y-5 text-body leading-[1.85] text-ink-muted">
                {intro}
              </div>
            </Reveal>
          )}
        </div>

        {children && <div className="mt-12">{children}</div>}

        {image && (
          <Reveal variant="image" immediate delay={160} className="mt-14 block sm:mt-16 lg:mt-20">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-panel sm:aspect-[16/9] lg:aspect-[21/9]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="100vw"
                className={`object-cover ${image.position ?? ""}`}
              />
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
