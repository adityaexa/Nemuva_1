import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CartPageClient } from "@/app/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the items in your Nemuva Makhana cart before checkout.",
  alternates: { canonical: "/cart" },
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Cart", href: "/cart" }]} />
      <div className="container-nemuva pb-20">
        <h1 className="mb-8 text-3xl text-[var(--color-brown-900)] sm:text-4xl">Your Cart</h1>
        <CartPageClient />
      </div>
    </div>
  );
}
