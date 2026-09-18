import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { BulkInquiryForm } from "@/components/shared/BulkInquiryForm";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { siteConfig } from "@/config/siteConfig";

const buyers = ["Wholesalers", "Retailers", "Distributors", "Restaurants", "Hotels", "Food Businesses", "Snack Brands", "Corporate Buyers"];
const benefits = [
  "Bulk quantities across grades",
  "Support for custom requirements",
  "Consistent, repeatable supply",
  "Flexible packaging options",
  "Dedicated business support",
];

export function B2BSection() {
  return (
    <section id="bulk" className="section-pad">
      <div className="container-nemuva grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading eyebrow="For Businesses" title="Buying Makhana in Bulk?" />
          <p className="mt-4 text-sm font-medium text-[var(--color-ink-soft)]">We work with:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {buyers.map((buyer) => (
              <span key={buyer} className="tag-pill bg-[var(--color-beige)] text-[var(--color-brown-700)]">
                {buyer}
              </span>
            ))}
          </div>
          <ul className="mt-6 space-y-2.5">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex gap-2 text-sm text-[var(--color-ink-soft)]">
                <span className="text-[var(--color-green-700)]" aria-hidden="true">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#bulk-inquiry-form" className="btn-primary">
              Get Bulk Pricing
            </a>
            <WhatsAppButton variant="inline" message={siteConfig.whatsappMessages.bulk} label="Talk to Nemuva" />
            <Link href="/bulk-makhana" className="text-sm font-semibold text-[var(--color-green-700)] underline self-center">
              View full Bulk &amp; Wholesale page →
            </Link>
          </div>
        </div>
        <BulkInquiryForm />
      </div>
    </section>
  );
}
