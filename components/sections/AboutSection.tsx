import Image from "next/image";
import Container from "@/components/Container";
import SectionIntro from "@/components/SectionIntro";
import Reveal from "@/components/Reveal";
import Action from "@/components/Action";
import { business, contact } from "@/data/business";

/**
 * The philosophy points are written from what is verifiable: her own bio wording,
 * her policies, and the structure of her services. No credentials, training
 * history, years of experience or client numbers are claimed anywhere, because
 * none was available. Each paragraph is short on purpose so Ashley can swap in
 * her own words a line at a time.
 */
const principles = [
  {
    title: "Designed, not applied",
    body: "The map comes before the lashes. Curl, length and density are chosen section by section for your eye shape — which is why two clients booking the same set never leave with the same one.",
  },
  {
    title: "Health first",
    body: "Weight and length are matched to what your natural lashes can carry. A set that grows out cleanly is worth more than a set that looks fuller for a week.",
  },
  {
    title: "One client at a time",
    body: "Appointments are private and unhurried. No overlapping bookings, no extra guests, no rushing to a finish — three hours for a full set, two for a refill.",
  },
  {
    title: "Built to be maintained",
    body: "Every full set includes a complimentary lash bath, and refills are scheduled so your lashes are refreshed rather than restarted.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-28">
      <SectionIntro
        script="by Ashley"
        title="Beauty should still feel like you"
        id="about-heading"
      />

      {/* Introduction. The portrait sits in a column rather than a full-width
          band: the source photography is phone-resolution, and a column keeps it
          crisp. Swap in a wider crop here once higher-resolution files exist. */}
      <section className="py-section" aria-labelledby="intro-heading">
        <Container size="wide">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-5">
              <Reveal variant="image" className="block">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-panel">
                  <Image
                    src="/images/ashley-portrait.jpg"
                    alt={`${business.artistName} in her lash studio in ${business.neighborhood}`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-[50%_20%]"
                  />
                </div>
              </Reveal>

              <Reveal className="mt-8">
                <p className="eyebrow text-ink-subtle">The artist</p>
                <h3
                  id="intro-heading"
                  className="mt-5 text-heading leading-[1.1] sm:text-heading-lg"
                >
                  Hi, I&apos;m Ashley.
                </h3>
                <p className="script mt-6 text-title text-accent sm:text-heading">
                  {business.tagline}
                </p>
              </Reveal>
            </div>

            <div className="mt-12 space-y-6 text-body leading-[1.9] text-ink-muted lg:col-span-6 lg:col-start-7 lg:mt-0 lg:self-center">
              <Reveal>
                <p className="text-body-lg leading-[1.75] text-ink">
                  I create polished, flattering lash looks tailored to each client,
                  in a comfortable one-on-one setting.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p>
                  Most of my clients come to me because they&apos;ve had a set that
                  didn&apos;t suit them — too heavy, too uniform, or grown out
                  unevenly within a week. So I start with your eyes rather than a
                  style name: how they&apos;re shaped, how your lashes grow, how much
                  you want to think about them once you leave.
                </p>
                <p className="mt-5">
                  My Signature set is the one most people book — my custom wispy style
                  with textured spikes and soft fullness, tailored to each eye shape.
                  But the styles are just starting points. What matters is that the
                  set still looks like you in the mirror at 7am.
                </p>
                <p className="mt-8 text-caption leading-relaxed text-ink-subtle">
                  Placeholder copy — written to be replaced with Ashley&apos;s own
                  words. Editable in{" "}
                  <code className="text-ink">app/about/page.tsx</code>.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="bg-surface-sunken py-section" aria-labelledby="approach-heading">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow text-ink-subtle">The approach</p>
            <h3
              id="approach-heading"
              className="mt-6 max-w-2xl text-heading leading-[1.1] sm:text-heading-lg"
            >
              How an appointment actually goes.
            </h3>
          </Reveal>

          <div className="mt-14 lg:grid lg:grid-cols-12 lg:gap-x-16">
            <ol className="lg:col-span-7">
              {principles.map((principle, index) => (
                <Reveal
                  as="li"
                  key={principle.title}
                  className="border-t border-line py-8 first:border-t-0 first:pt-0 sm:py-10"
                >
                  <div className="flex items-baseline gap-5 sm:gap-8">
                    <span className="eyebrow shrink-0 text-ink-subtle" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="text-title-sm leading-snug sm:text-title-sm">
                        {principle.title}
                      </h4>
                      <p className="mt-4 max-w-lg text-body leading-[1.85] text-ink-muted">
                        {principle.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <div className="mt-12 lg:col-span-4 lg:col-start-9 lg:mt-0">
              <Reveal variant="image" className="block">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-panel">
                  <Image
                    src="/images/lash-detail.jpg"
                    alt="Close view of a finished lash line on a client"
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal className="mt-6">
                <p className="text-body leading-[1.75] text-ink-subtle">
                  A complimentary lash bath is included with every full set. Please
                  note that this is a home-based business, not a commercial studio.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Studio & contact */}
      <section className="py-section" aria-labelledby="studio-heading">
        <Container size="wide">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
            <Reveal variant="image" className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-panel">
                <Image
                  src="/images/studio-interior.jpg"
                  alt="White peonies in a glass vase against a warm neutral wall in the studio"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:self-center">
              <Reveal>
                <p className="eyebrow text-ink-subtle">The studio</p>
                <h3
                  id="studio-heading"
                  className="mt-6 text-heading leading-[1.1] sm:text-heading-lg"
                >
                  {business.neighborhood}.
                </h3>
              </Reveal>

              <Reveal className="mt-10">
                <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  <div>
                    <dt className="eyebrow text-ink-subtle">Location</dt>
                    <dd className="mt-3 text-body leading-[1.8] text-ink">
                      <a
                        href={contact.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tap-safe transition-colors duration-fast ease-out hover:text-ink-subtle active:text-ink-subtle"
                      >
                        {contact.address}
                      </a>
                      <span className="mt-2 block text-caption text-ink-subtle">
                        Additional location details are provided after booking.
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-ink-subtle">Hours</dt>
                    <dd className="mt-3 text-body leading-[1.8] text-ink">
                      {contact.hours.map((entry) => (
                        <span key={entry.days} className="block">
                          {entry.days} · {entry.time}
                        </span>
                      ))}
                      <span className="mt-2 block text-caption text-ink-subtle">
                        {contact.hoursNote}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-ink-subtle">Contact</dt>
                    <dd className="mt-3 flex flex-col gap-2 text-body text-ink">
                      <a
                        href={contact.phoneHref}
                        className="tap-safe transition-colors duration-fast ease-out hover:text-ink-subtle active:text-ink-subtle"
                      >
                        {contact.phone}
                      </a>
                      <a
                        href={`mailto:${contact.email}`}
                        className="tap-safe break-all transition-colors duration-fast ease-out hover:text-ink-subtle active:text-ink-subtle"
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-ink-subtle">Follow</dt>
                    <dd className="mt-3 text-body text-ink">
                      <a
                        href={contact.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tap-safe transition-colors duration-fast ease-out hover:text-ink-subtle active:text-ink-subtle"
                      >
                        {contact.instagramHandle}
                      </a>
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Action href="#book" tone="primary">
                  Book an appointment
                </Action>
                <Action href="#policies" tone="secondary">
                  Read the policies
                </Action>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

    </section>
  );
}
