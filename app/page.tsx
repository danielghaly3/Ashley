import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import PillarCards from "@/components/PillarCards";
import BrandStatement from "@/components/BrandStatement";
import ImageCollage from "@/components/ImageCollage";
import TrustRail from "@/components/TrustRail";
import StyleFinder from "@/components/StyleFinder";
import ServicesSection from "@/components/sections/ServicesSection";
import PersonalizedExperience from "@/components/PersonalizedExperience";
import AboutSection from "@/components/sections/AboutSection";
import Testimonials from "@/components/Testimonials";
import Lookbook from "@/components/Lookbook";
import PoliciesSection from "@/components/sections/PoliciesSection";
import FaqSection from "@/components/sections/FaqSection";
import BookSection from "@/components/sections/BookSection";
import { marqueeWords } from "@/data/business";

/**
 * The whole site, on one page.
 *
 * Sequenced as the journey off Instagram — the order is the argument:
 *
 *   see the aesthetic    Hero, Marquee
 *   see what's on offer  PillarCards
 *   feel the brand       BrandStatement, ImageCollage
 *   trust the terms      TrustRail        ← the actual conversion blocker
 *   find your set        StyleFinder      ← the actual decision
 *   read the menu        ServicesSection
 *   trust the artist     PersonalizedExperience, AboutSection, Testimonials
 *   keep looking         Lookbook
 *   check the details    PoliciesSection, FaqSection
 *   book                 BookSection
 *
 * The terms come before the decision on purpose. A non-refundable deposit and a
 * 24-hour cancellation window are fine when you read them early, and a reason to
 * abandon when they surface at the payment step.
 *
 * Only the hero carries an `h1`; every section below opens at `h2` and nests
 * from there, so the page reads as one document rather than six stapled together.
 */
export default function HomePage() {
  return (
    <>
      <span id="top" aria-hidden="true" />

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
      <ServicesSection />
      <PersonalizedExperience />
      <AboutSection />
      <Testimonials />
      <Lookbook />
      <PoliciesSection />
      <FaqSection />
      <BookSection />
    </>
  );
}
