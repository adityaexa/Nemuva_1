import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { BulkInquiryForm } from "@/components/shared/BulkInquiryForm";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { MakhanaGradeCard } from "@/components/shared/MakhanaGradeCard";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { siteConfig } from "@/config/siteConfig";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Bulk Makhana Supplier — Wholesale & B2B",
  description:
    "Source Makhana in bulk from Nemuva. Wholesale quantities, consistent grading, packaging options and business support for retailers, distributors, hotels and food brands.",
  alternates: { canonical: "/bulk-makhana" },
};

const grades = [
  { grade: "4 Suta", title: "Everyday Grade", description: "Cost-efficient for food-service and everyday retail use.", image: "/images/grade-4-suta.jpg" },
  { grade: "5 Suta", title: "Mid Grade", description: "A balanced size widely used across retail and HORECA.", image: "/images/grade-5-suta.jpg" },
  { grade: "6 Suta", title: "Premium Grade", description: "Larger, more uniform pieces for premium retail lines.", image: "/images/grade-6-suta.jpg" },
];

const advantages = [
  "Consistent grading across orders",
  "Flexible order quantities",
  "Standard or custom packaging",
  "Business-friendly communication and support",
  "Ability to discuss recurring/contract supply",
];

const bulkFaqs = faqs.filter((f) => f.category === "b2b" || f.category === "shipping");

export default function BulkMakhanaPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Bulk & Wholesale", href: "/bulk-makhana" }]} />

      <section className="container-nemuva grid items-center gap-10 pb-14 lg:grid-cols-2">
        <div>
          <p className="tag-pill bg-[var(--color-green-50)] text-[var(--color-green-700)]">B2B / Wholesale</p>
          <h1 className="mt-4 text-4xl leading-tight text-[var(--color-brown-900)] sm:text-5xl">
            Bulk Makhana, Sourced From Bihar
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-[var(--color-ink-soft)] sm:text-base">
            Nemuva supports wholesalers, retailers, distributors, restaurants, hotels, food brands and
            corporate buyers with bulk Makhana supply — with room to discuss grading, packaging and
            recurring orders.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#bulk-inquiry" className="btn-primary">
              Get Bulk Pricing
            </a>
            <WhatsAppButton variant="inline" message={siteConfig.whatsappMessages.bulk} label="Talk to Nemuva" />
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/bulk-makhana-crates.jpg"
            alt="Crates of bulk Makhana prepared for business dispatch"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 45vw, 90vw"
          />
        </div>
      </section>

      <section className="section-pad bg-[var(--color-cream-dark)]/40">
        <div className="container-nemuva">
          <SectionHeading eyebrow="Why Buy Bulk From Nemuva" title="Built for Business Buyers" align="center" className="mx-auto" />
          <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
            {advantages.map((advantage) => (
              <li key={advantage} className="flex gap-2 rounded-xl bg-white p-4 text-sm text-[var(--color-ink-soft)] shadow-sm">
                <span className="text-[var(--color-green-700)]" aria-hidden="true">✓</span>
                {advantage}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-nemuva">
          <SectionHeading eyebrow="Product Grades" title="Choose the Right Grade for Your Business" align="center" className="mx-auto" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {grades.map((grade) => (
              <MakhanaGradeCard key={grade.grade} {...grade} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--color-cream-dark)]/40">
        <div className="container-nemuva grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Quantity & Packaging" title="Flexible to Your Business Needs" />
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              Whether you need a single bulk pack or a recurring monthly supply, share your requirement
              through the form and our team will confirm available quantities, grading and packaging
              options — including standard bulk bags or custom/branded packaging where feasible.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              Business buyers can also request samples as part of their enquiry — simply mention it in the
              message field.
            </p>
          </div>
          <div id="bulk-inquiry">
            <BulkInquiryForm />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-nemuva max-w-3xl">
          <SectionHeading eyebrow="Common Questions" title="Bulk & Wholesale FAQ" />
          <div className="mt-8">
            <FAQAccordion items={bulkFaqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
