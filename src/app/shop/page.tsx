import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ShopClient } from "@/app/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop Makhana Online",
  description:
    "Browse Nemuva's full range of raw, premium, roasted and flavoured Makhana from Bihar. Filter by category, price and weight.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Shop", href: "/shop" }]} />
      <div className="container-nemuva pb-16">
        <h1 className="text-3xl text-[var(--color-brown-900)] sm:text-4xl">Shop Makhana</h1>
        <p className="mt-2 max-w-xl text-sm text-[var(--color-ink-soft)]">
          Raw, premium, roasted and flavoured Makhana — sourced from Bihar, packed for freshness.
        </p>
        <Suspense fallback={null}>
          <ShopClient />
        </Suspense>
      </div>
    </div>
  );
}
