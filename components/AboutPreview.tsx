import EditorialSection from "./EditorialSection";
import Action from "./Action";
import { business } from "@/data/business";

/**
 * Intentionally short. It introduces Ashley and hands off to /about rather than
 * inventing a biography — the longer copy on the About page is written so it can
 * be replaced with her own words without touching layout.
 */
export default function AboutPreview() {
  return (
    <EditorialSection
      eyebrow="Meet your artist"
      title={
        <>
          The artist
          <br /> behind the sets.
        </>
      }
      script="by Ashley"
      imageSide="right"
      surface="base"
      image={{
        src: "/images/ashley-portrait.jpg",
        alt: `${business.artistName} in her lash studio in ${business.neighborhood}`,
        position: "object-[50%_18%]",
      }}
      footer={<Action href="/about" tone="secondary">Meet Ashley</Action>}
    >
      <p>
        Ashley focuses on creating polished, flattering lash looks tailored to each
        client while providing a comfortable one-on-one experience.
      </p>
      <p>
        Appointments are private and unhurried — one client at a time, in a
        home-based studio in {business.neighborhood}, with the styling decided
        together before a single extension is applied.
      </p>
    </EditorialSection>
  );
}
