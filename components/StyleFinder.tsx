"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Action from "./Action";
import Container from "./Container";
import Reveal from "./Reveal";
import { booking, findService, lashStyles } from "@/data/business";
import { easing, motionTokens } from "@/lib/motion";
import { formatDuration, formatPrice } from "@/lib/site";

/**
 * "Which set is mine?" is the question that stops people booking, and it is the
 * one thing an Acuity list of forty service names cannot answer. So this is the
 * centrepiece of the homepage: pick a finish, read Ashley's own description of
 * it, see both prices, and go straight into that appointment's calendar.
 *
 * Everything shown is real — the names, descriptors, durations and prices all
 * come from her scheduler, and both buttons are cold-load-safe deep links. It is
 * typographic on purpose: there is no verifiable photograph of each individual
 * style, and captioning one wrongly would misrepresent her work.
 */
export default function StyleFinder() {
  const [activeKey, setActiveKey] = useState(
    lashStyles.find((style) => style.featured)?.key ?? lashStyles[0].key,
  );
  const reduceMotion = useReducedMotion();

  const active = lashStyles.find((style) => style.key === activeKey) ?? lashStyles[0];
  const fullSet = findService(active.fullSetId);
  const refill = findService(active.refillId);
  const index = lashStyles.findIndex((style) => style.key === active.key) + 1;
  const ease = easing.out;

  return (
    <section
      className="relative overflow-hidden bg-surface-contrast text-ink-on-contrast"
      aria-labelledby="finder-heading"
    >
      <Container size="wide" className="py-section">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal variant="mask">
            <p className="eyebrow text-ink-on-contrast-muted">Find your set</p>
            <h2
              id="finder-heading"
              className="mt-6 text-heading uppercase leading-[1.06] tracking-[0.015em] sm:text-heading-lg"
            >
              What are you
              <br /> going for?
            </h2>
          </Reveal>

          <Reveal className="lg:max-w-xs lg:pb-3">
            <p className="text-body leading-[1.8] text-ink-on-contrast-muted">
              Seven finishes, same standard of work. Choose the one that sounds like
              you — the description is Ashley&apos;s own.
            </p>
          </Reveal>
        </div>

        <hr className="mt-12 h-px border-0 bg-surface/20" />

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-16">
          {/* ------------------------------------------------------------
              The choices. Real radio semantics, so arrow keys work.
          ------------------------------------------------------------ */}
          <div
            role="radiogroup"
            aria-labelledby="finder-heading"
            className="flex flex-wrap gap-2.5 lg:col-span-5 lg:flex-col lg:items-start lg:gap-0"
          >
            {lashStyles.map((style, styleIndex) => {
              const selected = style.key === active.key;
              return (
                <button
                  key={style.key}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setActiveKey(style.key)}
                  className={`group flex min-h-tap items-baseline gap-4 border px-4 py-2.5 transition-[background-color,color,border-color,transform] duration-fast ease-out active:scale-[0.985] lg:w-full lg:justify-between lg:border-x-0 lg:border-b-0 lg:border-t lg:px-0 lg:py-5 ${
                    selected
                      ? "border-ink-on-contrast bg-ink-on-contrast text-surface-contrast lg:bg-transparent lg:text-ink-on-contrast"
                      : "border-ink-on-contrast/45 text-ink-on-contrast-muted hover:border-ink-on-contrast/70 hover:text-ink-on-contrast lg:border-ink-on-contrast/25"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="eyebrow hidden text-ink-on-contrast-muted lg:inline">
                      {String(styleIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-body-lg leading-none lg:text-heading">
                      {style.name}
                    </span>
                  </span>

                  <span className="hidden items-center gap-4 lg:flex">
                    {style.featured && (
                      <span className="eyebrow text-ink-on-contrast-muted">Most booked</span>
                    )}
                    <span
                      aria-hidden="true"
                      className={`h-px transition-all duration-fast ease-editorial ${
                        selected ? "w-14 bg-surface" : "w-0 bg-surface/60 group-hover:w-8"
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {/* ------------------------------------------------------------
              The answer.
          ------------------------------------------------------------ */}
          <div className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            {/* Outlined folio. The stroke comes from the theme so it re-tints
                with the block in dim mode instead of staying paper-white. */}
            <p aria-hidden="true" className="folio folio-on-contrast text-display-xl">
              {String(index).padStart(2, "0")}
            </p>

            <div aria-live="polite" className="mt-2">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.key}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: reduceMotion ? 0.01 : motionTokens.base, ease }}
                >
                  <h3 className="text-heading uppercase leading-[1.04] tracking-[0.015em] sm:text-heading-lg">
                    {active.name}
                    <span className="text-accent-on-contrast"> Set</span>
                  </h3>

                  <p className="mt-6 max-w-md text-body-lg leading-[1.7] text-ink-on-contrast">
                    {active.vibe}.
                  </p>

                  <dl className="mt-11 grid gap-px sm:grid-cols-2">
                    {[
                      { term: "Full set", service: fullSet },
                      { term: "Two-week refill", service: refill },
                    ].map(({ term, service }) =>
                      service ? (
                        <div
                          key={term}
                          className="border-t border-ink-on-contrast/25 py-6 sm:pr-8"
                        >
                          <dt className="eyebrow text-ink-on-contrast-muted">{term}</dt>
                          <dd className="figures mt-4 flex items-baseline gap-4">
                            <span className="font-[family-name:var(--font-display)] text-heading leading-none">
                              {formatPrice(service.price)}
                            </span>
                            <span className="text-caption text-ink-on-contrast-muted">
                              {formatDuration(service.duration)}
                            </span>
                          </dd>
                        </div>
                      ) : null,
                    )}
                  </dl>

                  <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    {fullSet && (
                      <Action
                        href={booking.appointmentUrl(fullSet.id)}
                        tone="primaryOnContrast"
                      >
                        Book this full set
                      </Action>
                    )}
                    {refill && (
                      <Action
                        href={booking.appointmentUrl(refill.id)}
                        tone="onContrast"
                      >
                        Book the refill
                      </Action>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-10 text-body leading-[1.75] text-ink-on-contrast-muted">
              A complimentary lash bath is included with every full set. Refills are
              for existing clients and need at least 40% of your extensions
              remaining.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
