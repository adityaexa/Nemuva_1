import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CheckoutClient } from "@/app/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Nemuva Makhana order.",
  alternates: { canonical: "/checkout" },
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Checkout", href: "/checkout" }]} />
      <div className="container-nemuva pb-20">
        <h1 className="mb-8 text-3xl text-[var(--color-brown-900)] sm:text-4xl">Checkout</h1>
        <CheckoutClient />
      </div>
    </div>
  );
}
