import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Nemuva website and purchasing Nemuva products.",
  alternates: { canonical: "/terms-conditions" },
};

export default function TermsPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Terms & Conditions", href: "/terms-conditions" }]} />
      <div className="container-nemuva max-w-3xl pb-20">
        <h1 className="text-3xl text-[var(--color-brown-900)] sm:text-4xl">Terms & Conditions</h1>
        <p className="mt-2 text-xs text-[var(--color-ink-soft)]">Last updated: PLACEHOLDER DATE</p>

        <div className="mt-6 card-surface border-dashed p-5 text-xs leading-relaxed text-[var(--color-ink-soft)]">
          <strong className="text-[var(--color-brown-900)]">Note to the business owner:</strong> this is a
          generic terms structure, not legal advice. Have it reviewed by a qualified professional before
          publishing.
        </div>

        <div className="prose-nemuva mt-8 space-y-6 text-sm leading-relaxed text-[var(--color-ink)]">
          <section>
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">1. About These Terms</h2>
            <p className="mt-2 text-[var(--color-ink-soft)]">
              These Terms & Conditions govern your use of the {siteConfig.brandName} website and any
              purchases made through it. By using this site, you agree to these terms.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">2. Products & Pricing</h2>
            <p className="mt-2 text-[var(--color-ink-soft)]">
              Product descriptions, images and prices are provided as accurately as possible but may change
              without prior notice. Bulk, wholesale and private-label pricing is confirmed individually
              through enquiry.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">3. Orders & Payment</h2>
            <p className="mt-2 text-[var(--color-ink-soft)]">
              Orders are subject to acceptance and availability. Payment processing will be handled by a
              third-party payment gateway once configured (see our Shipping & Returns page and the technical
              integration notes in this codebase).
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">4. Intellectual Property</h2>
            <p className="mt-2 text-[var(--color-ink-soft)]">
              All content on this site, including text, graphics and the {siteConfig.brandName} name and
              logo, is the property of {siteConfig.legalName} unless otherwise stated, and may not be
              reproduced without permission.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">5. Limitation of Liability</h2>
            <p className="mt-2 text-[var(--color-ink-soft)]">
              To the extent permitted by law, {siteConfig.legalName} is not liable for indirect or
              consequential losses arising from use of this website or its products.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">6. Governing Law</h2>
            <p className="mt-2 text-[var(--color-ink-soft)]">
              These terms are governed by the laws of India (PLACEHOLDER — confirm applicable jurisdiction).
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">7. Contact</h2>
            <p className="mt-2 text-[var(--color-ink-soft)]">
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="underline text-[var(--color-green-700)]">
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
