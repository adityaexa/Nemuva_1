import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about Nemuva Makhana, sourcing, Suta grading, storage, bulk orders, private label and shipping.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "FAQ", href: "/faq" }]} />
      <div className="container-nemuva max-w-3xl pb-20">
        <SectionHeading eyebrow="Support" title="Frequently Asked Questions" />
        <div className="mt-8">
          <FAQAccordion items={faqs} />
        </div>
      </div>
    </div>
  );
}
