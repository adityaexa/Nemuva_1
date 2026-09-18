import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductGrid({ products, emptyMessage = "No products match your filters yet." }: { products: Product[]; emptyMessage?: string }) {
  if (products.length === 0) {
    return (
      <p className="col-span-full py-16 text-center text-[var(--color-ink-soft)]">{emptyMessage}</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
