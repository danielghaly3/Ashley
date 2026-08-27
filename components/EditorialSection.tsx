import Image from "next/image";
import type { ReactNode } from "react";
import Container from "./Container";
import Reveal from "./Reveal";

type EditorialSectionProps = {
  eyebrow?: string;
  title: ReactNode;
  children: ReactNode;
  image: { src: string; alt: string; position?: string };
  /** Which side the photograph sits on at desktop widths. */
  imageSide?: "left" | "right";
  /** A small script word set against the image edge. */
  script?: string;
  footer?: ReactNode;
  surface?: "base" | "sunken" | "accent";
  className?: string;
  id?: string;
};

const surfaces = {
  base: "bg-surface",
  sunken: "bg-surface-sunken",
  accent: "bg-surface-accent",
} as const;

/**
 * The reusable two-column editorial block: one photograph, one column of type,
 * generous whitespace, no container chrome. Used for the About preview and for
 * the service categories on /services.
 */
export default function EditorialSection({
  eyebrow,
  title,
  children,
  image,
  imageSide = "left",
  script,
  footer,
  surface = "base",
  className = "",
  id,
}: EditorialSectionProps) {
  const imageFirst = imageSide === "left";

  return (
    <section
      id={id}
      className={`${surfaces[surface]} py-section ${className}`.trim()}
      aria-label={typeof title === "string" ? title : undefined}
    >
      <Container size="wide">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-16">
          <div
            className={`relative ${
              imageFirst
                ? "lg:col-span-6 lg:col-start-1"
                : "lg:col-span-6 lg:col-start-7"
            } lg:row-start-1`}
          >
            <Reveal variant="image" className="block">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-panel sm:aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className={`object-cover ${image.position ?? ""}`}
                />
              </div>
            </Reveal>

            {script && (
              <p
                aria-hidden="true"
                className={`script absolute -bottom-11 text-title text-accent sm:text-heading ${
                  imageFirst ? "right-2 lg:-right-8" : "left-2 lg:-left-8"
                }`}
              >
                {script}
              </p>
            )}
          </div>

          <div
            className={`mt-14 ${
              imageFirst
                ? "lg:col-span-5 lg:col-start-8"
                : "lg:col-span-5 lg:col-start-1"
            } lg:row-start-1 lg:mt-0`}
          >
            <Reveal>
              {eyebrow && <p className="eyebrow text-ink-subtle">{eyebrow}</p>}
              <h2 className="mt-6 text-heading leading-[1.1] sm:text-heading-lg lg:text-display">
                {title}
              </h2>
              <div className="mt-8 space-y-5 text-body leading-[1.85] text-ink-muted">
                {children}
              </div>
              {footer && <div className="mt-10">{footer}</div>}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
