import { formatPrice, computeDiscountPercent } from "@/lib/utils";

export function PriceDisplay({
  price,
  comparePrice,
  size = "base",
}: {
  price: number;
  comparePrice?: number;
  size?: "sm" | "base" | "lg";
}) {
  const discount = computeDiscountPercent(price, comparePrice);
  const priceClass = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg";

  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className={`font-semibold text-[var(--color-brown-900)] ${priceClass}`}>
        {formatPrice(price)}
      </span>
      {comparePrice && comparePrice > price && (
        <span className="text-sm text-[var(--color-ink-soft)] line-through">
          {formatPrice(comparePrice)}
        </span>
      )}
      {discount && (
        <span className="tag-pill bg-[var(--color-gold-300)]/40 text-[var(--color-brown-700)]">
          {discount}% off
        </span>
      )}
    </div>
  );
}
