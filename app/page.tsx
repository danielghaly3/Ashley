import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import PillarCards from "@/components/PillarCards";
import BrandStatement from "@/components/BrandStatement";
import ImageCollage from "@/components/ImageCollage";
import TrustRail from "@/components/TrustRail";
import StyleFinder from "@/components/StyleFinder";
import PersonalizedExperience from "@/components/PersonalizedExperience";
import AboutPreview from "@/components/AboutPreview";
import Testimonials from "@/components/Testimonials";
import Lookbook from "@/components/Lookbook";
import BookingCTA from "@/components/BookingCTA";
import { marqueeWords } from "@/data/business";

/**
 * Sequenced as the journey off Instagram:
 *
 *   see the aesthetic   → Hero, Marquee
 *   see what's on offer → PillarCards
 *   feel the brand      → BrandStatement, ImageCollage
 *   trust the terms     → TrustRail        (the actual conversion blocker)
 *   find your set       → StyleFinder      (the actual decision)
 *   trust the artist    → PersonalizedExperience, AboutPreview, Testimonials
 *   keep looking        → Lookbook
 *   book                → BookingCTA
 *
 * The terms come before the decision on purpose. A non-refundable deposit and a
 * 24-hour cancellation window are fine when you read them early, and a reason to
 * abandon when they surface at the payment step.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee
        items={marqueeWords}
        label="Soft. Wispy. Intentional. Custom, brown and volume lash sets in Wynwood, Miami."
      />
      <PillarCards />
      <BrandStatement />
      <ImageCollage />
      <TrustRail />
      <StyleFinder />
      <PersonalizedExperience />
      <AboutPreview />
      <Testimonials />
      <Lookbook />
      <BookingCTA />
    </>
  );
}
