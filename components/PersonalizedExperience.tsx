import Image from "next/image";
import Container from "./Container";
import Reveal from "./Reveal";

/**
 * The three words are set as an editorial index down the left of the block —
 * numbered, hairline-separated, and paired with what actually gets considered.
 * Not a card row and not an icon-and-arrow process diagram.
 */
const stages = [
  {
    label: "Consult",
    body: "We start with your eyes — shape, spacing, the direction your lashes grow, and how much fullness you actually want to wear day to day.",
  },
  {
    label: "Customize",
    body: "Curl, length and density are mapped section by section, and adjusted for the health of your natural lashes rather than a template.",
  },
  {
    label: "Create",
    body: "Three quiet hours, applied one lash at a time, with a finish built to grow out evenly so your refill is a refresh and not a restart.",
  },
];

const considerations = [
  "Eye shape",
  "Natural lash health",
  "Desired fullness",
  "Lifestyle",
  "Maintenance preferences",
  "Personal aesthetic",
];

export default function PersonalizedExperience() {
  return (
    <section
      className="bg-surface-accent py-section"
      aria-labelledby="personalized-heading"
    >
      <Container size="wide">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-ink-subtle">Personalized styling</p>
              <h2
                id="personalized-heading"
                className="mt-7 text-heading leading-[1.08] sm:text-display lg:text-display"
              >
                No two sets
                <br /> should look
                <br /> exactly the same.
              </h2>
            </Reveal>

            <Reveal variant="image" className="mt-12 block lg:mt-16">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-panel">
                <Image
                  src="/images/lash-macro.jpg"
                  alt="Individual lash extensions fanned along the lash line"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal className="mt-10">
              <p className="eyebrow text-ink-subtle">Designed around</p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
                {considerations.map((item) => (
                  <li
                    key={item}
                    className="text-body leading-relaxed text-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="mt-16 lg:col-span-6 lg:col-start-7 lg:mt-2">
            <ol className="flex flex-col">
              {stages.map((stage, index) => (
                <Reveal
                  as="li"
                  key={stage.label}
                  className="border-t border-line py-9 first:border-t-0 first:pt-0 sm:py-11"
                >
                  <div className="flex items-baseline gap-5 sm:gap-8">
                    <span className="eyebrow shrink-0 text-ink-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="eyebrow text-ink">
                        {stage.label}
                      </h3>
                      <p className="mt-5 max-w-md text-body leading-[1.85] text-ink-muted">
                        {stage.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
