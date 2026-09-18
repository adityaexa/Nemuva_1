import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Nemuva's shipping timelines, charges and return/refund policy structure.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  const { shippingRules, currency } = siteConfig;

  return (
    <div>
      <Breadcrumbs items={[{ name: "Shipping & Returns", href: "/shipping-returns" }]} />
      <div className="container-nemuva max-w-3xl pb-20">
        <SectionHeading eyebrow="Policies" title="Shipping & Returns" />

        <div className="mt-8 card-surface border-dashed p-5 text-xs leading-relaxed text-[var(--color-ink-soft)]">
          <strong className="text-[var(--color-brown-900)]">Note to the business owner:</strong> the values
          below are editable placeholders sourced from <code>siteConfig.ts</code>. Review and finalise every
          figure and commitment before publishing this page live — nothing here should be treated as a
          confirmed legal or operational commitment until verified.
        </div>

        <section className="mt-8">
          <h2 className="font-display text-2xl text-[var(--color-brown-900)]">Shipping</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
            <li>
              <strong className="text-[var(--color-ink)]">Delivery estimate:</strong> {shippingRules.estimatedDeliveryDays}
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Standard shipping fee:</strong> {currency.symbol}
              {shippingRules.standardShippingFee} (PLACEHOLDER)
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Free shipping threshold:</strong> Orders above{" "}
              {currency.symbol}
              {shippingRules.freeShippingThreshold} (PLACEHOLDER)
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Cash on Delivery:</strong>{" "}
              {shippingRules.codAvailable ? "Available in select pin codes." : "Not currently available (PLACEHOLDER)."}
            </li>
            <li>
              <strong className="text-[var(--color-ink)]">Serviceable areas:</strong> We aim to deliver
              across India; exact serviceability depends on courier partner coverage for your pin code.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-[var(--color-brown-900)]">Returns & Refunds</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
            <li>
              As a food product, Makhana is generally non-returnable once opened, for hygiene reasons — this
              is a PLACEHOLDER policy and should be reviewed against applicable consumer protection
              regulations.
            </li>
            <li>
              If you receive a damaged, incorrect or defective order, contact us within a reasonable window
              (e.g. 48 hours of delivery — PLACEHOLDER) with photos of the issue via our{" "}
              <a href="/contact" className="underline text-[var(--color-green-700)]">Contact page</a>.
            </li>
            <li>Approved refunds/replacements will be processed within a defined timeline (PLACEHOLDER) once verified.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-[var(--color-brown-900)]">Order Tracking</h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
            Once a real order-management/shipping integration is connected, tracking details will be shared
            via email/SMS. This flow is not yet live in this codebase — see the checkout integration notes
            in <code>src/lib/payment.ts</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
