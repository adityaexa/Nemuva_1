import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyNemuva } from "@/components/home/WhyNemuva";
import { OriginStory } from "@/components/home/OriginStory";
import { FarmToPack } from "@/components/home/FarmToPack";
import { QualitySection } from "@/components/home/QualitySection";
import { SizeGuide } from "@/components/home/SizeGuide";
import { B2BSection } from "@/components/home/B2BSection";
import { PrivateLabelSection } from "@/components/home/PrivateLabelSection";
import { ExportSection } from "@/components/home/ExportSection";
import { HealthySnacking } from "@/components/home/HealthySnacking";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { JournalPreview } from "@/components/home/JournalPreview";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "Nemuva — Authentic Makhana from Bihar",
  description:
    "Shop authentic Makhana (fox nuts) from Bihar. Raw, roasted and flavoured Makhana for everyday snacking, plus bulk, wholesale, private-label and export support for businesses.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <WhyNemuva />
      <OriginStory />
      <FarmToPack />
      <QualitySection />
      <SizeGuide />
      <B2BSection />
      <PrivateLabelSection />
      <ExportSection />
      <HealthySnacking />
      <TestimonialsSection />
      <JournalPreview />
      <NewsletterSection />
    </>
  );
}
