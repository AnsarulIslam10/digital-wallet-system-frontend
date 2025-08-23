import { HeroSection } from "@/components/modules/HomePage/HeroSection";
import FeaturesPage from "./FeaturesPage";
import { PricingPage } from "./PricingPage";


export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesPage />
      <PricingPage />
    </div>
  );
}