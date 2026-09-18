import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";

export function FeaturedProducts() {
  const products = getFeaturedProducts(8);

  return (
    <section className="section-pad bg-[var(--color-cream-dark)]/40">
      <div className="container-nemuva">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Best of Nemuva" title="Featured Makhana Products" />
          <Link href="/shop" className="btn-secondary">
            View All Products
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
