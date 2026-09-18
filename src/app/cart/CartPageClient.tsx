"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { QuantitySelector } from "@/components/cart/QuantitySelector";
import { TrashIcon, BagIcon } from "@/components/shared/icons";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/config/siteConfig";

export function CartPageClient() {
  const { lines, updateQuantity, removeLine, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  function handlePromoSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!promoCode.trim()) return;
    // NOTE: Promo codes are not yet connected to a real discount engine.
    // Wire this up to your backend/coupon system when ready.
    setPromoMessage("Promo codes will be validated once connected to a discount engine.");
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-[var(--color-beige-dark)] py-20 text-center">
        <BagIcon className="h-10 w-10 text-[var(--color-ink-soft)]" />
        <p className="text-[var(--color-ink-soft)]">Your cart is currently empty.</p>
        <Link href="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= siteConfig.shippingRules.freeShippingThreshold ? 0 : siteConfig.shippingRules.standardShippingFee;
  const total = subtotal + shipping;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <ul className="divide-y divide-[var(--color-beige-dark)] rounded-2xl border border-[var(--color-beige-dark)] bg-white">
        {lines.map((line) => (
          <li key={line.sku} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <Link href={`/products/${line.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--color-beige)]">
              <Image src={line.image} alt={line.name} fill className="object-cover" sizes="96px" />
            </Link>
            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link href={`/products/${line.slug}`} className="font-semibold text-[var(--color-brown-900)] hover:text-[var(--color-green-700)]">
                  {line.name}
                </Link>
                <p className="text-sm text-[var(--color-ink-soft)]">{line.weight}</p>
                <p className="mt-1 text-sm font-medium text-[var(--color-brown-900)] sm:hidden">
                  {formatPrice(line.price * line.quantity)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <QuantitySelector quantity={line.quantity} onChange={(q) => updateQuantity(line.sku, q)} />
                <p className="hidden w-24 text-right font-semibold text-[var(--color-brown-900)] sm:block">
                  {formatPrice(line.price * line.quantity)}
                </p>
                <button
                  aria-label={`Remove ${line.name}`}
                  onClick={() => removeLine(line.sku)}
                  className="rounded-full p-2 text-[var(--color-ink-soft)] hover:bg-[var(--color-beige)] hover:text-red-600"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="h-fit rounded-2xl border border-[var(--color-beige-dark)] bg-white p-6">
        <h2 className="font-display text-xl text-[var(--color-brown-900)]">Order Summary</h2>
        <form onSubmit={handlePromoSubmit} className="mt-4 flex gap-2">
          <label htmlFor="promo" className="sr-only">
            Promo code
          </label>
          <input
            id="promo"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Promo code"
            className="w-full rounded-xl border border-[var(--color-beige-dark)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-green-700)]"
          />
          <button type="submit" className="btn-secondary shrink-0 !py-2 text-sm">
            Apply
          </button>
        </form>
        {promoMessage && <p className="mt-2 text-xs text-[var(--color-ink-soft)]">{promoMessage}</p>}

        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-[var(--color-ink-soft)]">Subtotal</dt>
            <dd className="font-medium text-[var(--color-brown-900)]">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--color-ink-soft)]">Shipping</dt>
            <dd className="font-medium text-[var(--color-brown-900)]">
              {shipping === 0 ? "Free" : formatPrice(shipping)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-[var(--color-beige-dark)] pt-3 text-base">
            <dt className="font-semibold text-[var(--color-brown-900)]">Estimated Total</dt>
            <dd className="font-semibold text-[var(--color-brown-900)]">{formatPrice(total)}</dd>
          </div>
        </dl>

        <Link href="/checkout" className="btn-primary mt-6 w-full">
          Proceed to Checkout
        </Link>
        <Link href="/shop" className="mt-3 block text-center text-sm text-[var(--color-ink-soft)] underline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
