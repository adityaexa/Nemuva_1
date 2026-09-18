"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { CartItem } from "@/components/cart/CartItem";
import { CloseIcon, BagIcon } from "@/components/shared/icons";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/config/siteConfig";

export function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const freeShippingLeft = Math.max(0, siteConfig.shippingRules.freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-black/40"
        tabIndex={-1}
      />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[var(--color-cream)] shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-[var(--color-beige-dark)] px-5 py-4">
          <h2 className="font-display text-xl text-[var(--color-brown-900)]">Your Cart</h2>
          <button
            ref={closeButtonRef}
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full p-2 hover:bg-[var(--color-beige)]"
          >
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <BagIcon className="h-10 w-10 text-[var(--color-ink-soft)]" />
            <p className="text-[var(--color-ink-soft)]">Your cart is empty.</p>
            <Link href="/shop" onClick={closeCart} className="btn-primary">
              Shop Makhana
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              {freeShippingLeft > 0 ? (
                <p className="mt-4 rounded-xl bg-[var(--color-green-50)] px-3 py-2 text-xs text-[var(--color-green-700)]">
                  Add {formatPrice(freeShippingLeft)} more for free shipping.
                </p>
              ) : (
                <p className="mt-4 rounded-xl bg-[var(--color-green-50)] px-3 py-2 text-xs text-[var(--color-green-700)]">
                  You&apos;ve unlocked free shipping!
                </p>
              )}
              <ul className="divide-y divide-[var(--color-beige-dark)]">
                {lines.map((line) => (
                  <CartItem key={line.sku} line={line} />
                ))}
              </ul>
            </div>
            <div className="border-t border-[var(--color-beige-dark)] px-5 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-[var(--color-ink-soft)]">Subtotal</span>
                <span className="font-semibold text-[var(--color-brown-900)]">{formatPrice(subtotal)}</span>
              </div>
              <p className="mb-4 text-xs text-[var(--color-ink-soft)]">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/checkout" onClick={closeCart} className="btn-primary w-full">
                  Proceed to Checkout
                </Link>
                <Link href="/cart" onClick={closeCart} className="btn-secondary w-full">
                  View Cart
                </Link>
                <button onClick={closeCart} className="mt-1 text-center text-sm text-[var(--color-ink-soft)] underline">
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
