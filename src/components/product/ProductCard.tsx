"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { StarIcon } from "@/components/shared/icons";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";

const badgeStyles: Record<string, string> = {
  "Best Seller": "bg-[var(--color-gold-500)] text-[var(--color-brown-900)]",
  New: "bg-[var(--color-green-700)] text-white",
  Premium: "bg-[var(--color-brown-700)] text-white",
  "Value Pack": "bg-[var(--color-beige-dark)] text-[var(--color-brown-900)]",
};

export function ProductCard({ product }: { product: Product }) {
  const { addLine } = useCart();
  const router = useRouter();
  const defaultVariant = product.variants[0];
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const variantForLowest = product.variants.find((v) => v.price === lowestPrice) ?? defaultVariant;

  function handleAddToCart() {
    addLine({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      weight: variantForLowest.weight,
      price: variantForLowest.price,
      comparePrice: variantForLowest.comparePrice,
      quantity: 1,
      sku: variantForLowest.sku,
    });
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push("/checkout");
  }

  return (
    <div className="card-surface group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg hover:shadow-black/5">
      <Link
        href={`/products/${product.slug}`}
        onClick={() => track("view_item", { slug: product.slug, name: product.name })}
        className="relative block aspect-square w-full overflow-hidden bg-[var(--color-beige)]"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
        {product.badge && (
          <span className={`tag-pill absolute left-3 top-3 ${badgeStyles[product.badge]}`}>{product.badge}</span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link href={`/products/${product.slug}`} className="font-semibold text-[var(--color-brown-900)] hover:text-[var(--color-green-700)]">
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-[var(--color-ink-soft)]">{product.shortDescription}</p>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)]">
          <span className="flex text-[var(--color-gold-500)]" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className={i < Math.round(product.rating) ? "opacity-100" : "opacity-25"} />
            ))}
          </span>
          <span>({product.reviews})</span>
          <span aria-hidden="true">·</span>
          <span>{variantForLowest.weight}</span>
        </div>
        <div className="mt-3">
          <PriceDisplay price={variantForLowest.price} comparePrice={variantForLowest.comparePrice} />
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={handleAddToCart} className="btn-secondary flex-1 !py-2 text-sm">
            Add to Cart
          </button>
          <button onClick={handleBuyNow} className="btn-primary flex-1 !py-2 text-sm">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
