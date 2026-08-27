import Image from "next/image";
import Container from "./Container";
import Reveal from "./Reveal";
import { business } from "@/data/business";

type Frame = {
  src: string;
  alt: string;
  /** Tailwind aspect utility — the frames are deliberately different shapes. */
  aspect: string;
  position?: string;
  delay?: number;
};

/** Column one carries the anchor portrait; the others are offset downward. */
const columnOne: Frame[] = [
  {
    src: "/images/client-portrait-05.jpg",
    alt: "Client wearing a custom volume set, photographed in the studio",
    aspect: "aspect-[3/4]",
    position: "object-[50%_20%]",
  },
];

const columnTwo: Frame[] = [
  {
    src: "/images/studio-rest.jpg",
    alt: "Client with eyes closed and finished lashes during an appointment",
    aspect: "aspect-[4/3]",
    position: "object-[50%_42%]",
    delay: 80,
  },
  {
    src: "/images/lash-detail.jpg",
    alt: "Close view of a finished lash line, lashes fanned and separated",
    aspect: "aspect-square",
    position: "object-[44%_36%]",
    delay: 160,
  },
];

const columnThree: Frame[] = [
  {
    src: "/images/studio-interior.jpg",
    alt: "White peonies in a glass vase against a warm neutral wall",
    aspect: "aspect-[3/4]",
    delay: 120,
  },
  {
    src: "/images/client-portrait-04.jpg",
    alt: "Client immediately after a two-week refill appointment",
    aspect: "aspect-square",
    position: "object-top",
    delay: 200,
  },
];

function CollageFrame({ frame, sizes }: { frame: Frame; sizes: string }) {
  return (
    <Reveal variant="image" delay={frame.delay} className="block">
      <div className={`relative w-full overflow-hidden rounded-panel ${frame.aspect}`}>
        <Image
          src={frame.src}
          alt={frame.alt}
          fill
          sizes={sizes}
          className={`object-cover ${frame.position ?? ""}`}
        />
      </div>
    </Reveal>
  );
}

/**
 * A magazine spread rather than an Instagram grid. Three columns of unequal
 * width, each starting at a different height, with frames in three different
 * shapes — so the eye travels down the page instead of scanning a matrix.
 */
export default function ImageCollage() {
  return (
    <section className="overflow-hidden py-section" aria-label="Gallery">
      <Container size="wide">
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-start lg:gap-8">
          {/* Anchor column */}
          <div className="lg:w-[42%]">
            {columnOne.map((frame) => (
              <CollageFrame
                key={frame.src}
                frame={frame}
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            ))}

            <Reveal className="mt-8 lg:mt-10 lg:max-w-sm">
              <p className="eyebrow text-ink-subtle">The work</p>
              <p className="mt-5 font-[family-name:var(--font-display)] text-title-sm leading-[1.3] sm:text-title">
                Close-up, in the light, on real clients — the way you&apos;ll actually
                see them.
              </p>
              <p className="mt-5 text-body leading-[1.85] text-ink-muted">
                A private, home-based studio in {business.neighborhood}. Three quiet
                hours, one set at a time.
              </p>
            </Reveal>
          </div>

          {/* Offset columns. On mobile they collapse into a two-up grid. */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:flex lg:w-[33%] lg:flex-col lg:gap-8 lg:pt-20">
            {columnTwo.map((frame) => (
              <CollageFrame
                key={frame.src}
                frame={frame}
                sizes="(min-width: 1024px) 32vw, 50vw"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:flex lg:w-[25%] lg:flex-col lg:gap-8 lg:pt-44">
            {columnThree.map((frame) => (
              <CollageFrame
                key={frame.src}
                frame={frame}
                sizes="(min-width: 1024px) 24vw, 50vw"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
