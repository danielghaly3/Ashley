import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Action from "./Action";
import { featuredCategories, serviceCategories } from "@/data/business";
import { formatDuration } from "@/lib/site";

/**
 * Three categories, presented as a staggered editorial row: each column sits at
 * a slightly different vertical offset so the group reads as a composition
 * rather than three cards in a grid. No boxes, no shadows — only the images,
 * a hairline, and type.
 */
export default function ServicePreview() {
  const featured = featuredCategories
    .map((slug) => serviceCategories.find((category) => category.slug === slug))
    .filter((category): category is (typeof serviceCategories)[number] => Boolean(category));

  /** Vertical offsets, applied only where there is room for them. */
  const offsets = ["lg:mt-0", "lg:mt-16", "lg:mt-6"];

  return (
    <section id="services" className="bg-surface-sunken py-section-lg" aria-labelledby="services-heading">
      <Container size="wide">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Services"
            title={
              <span id="services-heading">
                Three ways to
                <br className="hidden sm:block" /> wear your lashes.
              </span>
            }
          />
          <Reveal className="lg:pb-4">
            <p className="max-w-sm text-body leading-[1.85] text-ink-muted">
              Full sets build your look from the beginning. Refills keep it seamless.
              Additions are the smaller appointments in between.
            </p>
          </Reveal>
        </div>

        <hr className="rule mt-14" />

        <ul className="mt-14 grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {featured.map((category, index) => {
            const durations = category.services.map((service) => service.duration);
            const shortest = formatDuration(Math.min(...durations));
            const longest = formatDuration(Math.max(...durations));
            const from = Math.min(...category.services.map((service) => service.price));

            return (
              <li key={category.slug} className={offsets[index] ?? ""}>
                <Reveal variant="image" className="block">
                  <Link
                    href={`/services#${category.slug}`}
                    className="group block"
                    aria-label={`View ${category.title} services`}
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-panel">
                      <Image
                        src={category.image}
                        alt={category.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-slow ease-editorial group-hover:scale-[1.02]"
                      />
                    </div>
                  </Link>
                </Reveal>

                <Reveal className="mt-7">
                  <p className="eyebrow text-ink-subtle">
                    {String(index + 1).padStart(2, "0")} · {category.eyebrow}
                  </p>
                  <h3 className="mt-4 text-title leading-tight sm:text-title">
                    {category.title}
                  </h3>
                  <p className="mt-4 text-body leading-[1.8] text-ink-muted">
                    {category.intro}
                  </p>
                  <p className="figures eyebrow mt-6 text-ink-subtle">
                    From ${from} · {shortest === longest ? shortest : `${shortest} \u2013 ${longest}`}
                  </p>
                  <div className="mt-6">
                    <Action
                      href={`/services#${category.slug}`}
                      tone="text"
                      showExternalIcon={false}
                      aria-label={`View ${category.title} services`}
                    >
                      View services
                    </Action>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
