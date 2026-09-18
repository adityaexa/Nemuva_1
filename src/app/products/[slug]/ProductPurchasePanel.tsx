"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { QuantitySelector } from "@/components/cart/QuantitySelector";
import { StarIcon } from "@/components/shared/icons";
import { useCart } from "@/lib/cart-context";
import { track } from "@/lib/analytics";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addLine } = useCart();
  const router = useRouter();
  const variant = product.variants[variantIndex];
  const inStock = variant.stock > 0;

  function buildLine() {
    return {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      weight: variant.weight,
      price: variant.price,
      comparePrice: variant.comparePrice,
      quantity,
      sku: variant.sku,
    };
  }

  function handleAddToCart() {
    addLine(buildLine());
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push("/checkout");
  }

  return (
    <div>
      {product.badge && (
        <span className="tag-pill mb-3 inline-block bg-[var(--color-gold-500)] text-[var(--color-brown-900)]">
          {product.badge}
        </span>
      )}
      <h1 className="text-3xl text-[var(--color-brown-900)] sm:text-4xl">{product.name}</h1>
      <div className="mt-3 flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
        <span className="flex text-[var(--color-gold-500)]" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className={i < Math.round(product.rating) ? "opacity-100" : "opacity-25"} />
          ))}
        </span>
        <span>
          {product.rating.toFixed(1)} · {product.reviews} reviews
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">{product.shortDescription}</p>

      <div className="mt-5">
        <PriceDisplay price={variant.price} comparePrice={variant.comparePrice} size="lg" />
      </div>

      <fieldset className="mt-6">
        <legend className="mb-2 text-sm font-semibold text-[var(--color-brown-900)]">Weight</legend>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((v, index) => (
            <button
              key={v.sku}
              type="button"
              onClick={() => setVariantIndex(index)}
              aria-pressed={variantIndex === index}
              disabled={v.stock === 0}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                variantIndex === index
                  ? "border-[var(--color-green-700)] bg-[var(--color-green-700)] text-white"
                  : "border-[var(--color-beige-dark)] text-[var(--color-ink)]"
              }`}
            >
              {v.weight}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center gap-4">
        <span className="text-sm font-semibold text-[var(--color-brown-900)]">Quantity</span>
        <QuantitySelector quantity={quantity} onChange={setQuantity} />
      </div>

      <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
        {inStock ? `${variant.stock} units available` : "Currently out of stock"}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="btn-secondary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          disabled={!inStock}
          className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
          onMouseDown={() => track("begin_checkout", { slug: product.slug })}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
