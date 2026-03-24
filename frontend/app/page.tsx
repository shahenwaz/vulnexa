import { FeatureGrid } from "@/components/marketing/feature-grid";
import { HeroSection } from "@/components/marketing/hero-section";
import { SecurityOverview } from "@/components/marketing/security-overview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureGrid />
      <SecurityOverview />
    </>
  );
}
