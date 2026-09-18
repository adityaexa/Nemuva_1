"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/config/siteConfig";
import { FormField } from "@/components/shared/FormField";
import { startCheckout } from "@/lib/payment";
import { track } from "@/lib/analytics";

interface CustomerForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

const initialForm: CustomerForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
};

export function CheckoutClient() {
  const { lines, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<CustomerForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(false);

  const shipping = subtotal >= siteConfig.shippingRules.freeShippingThreshold ? 0 : siteConfig.shippingRules.standardShippingFee;
  const total = subtotal + shipping;

  function validate(): boolean {
    const next: Partial<Record<keyof CustomerForm, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.phone.trim()) next.phone = "Please enter a phone number.";
    if (!form.address.trim()) next.address = "Please enter your address.";
    if (!form.city.trim()) next.city = "Please enter your city.";
    if (!form.state.trim()) next.state = "Please enter your state.";
    if (!/^\d{6}$/.test(form.pincode)) next.pincode = "Please enter a valid 6-digit PIN code.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate() || lines.length === 0) return;
    setSubmitting(true);
    track("begin_checkout", { itemCount: lines.length, subtotal });

    // See src/lib/payment.ts for the documented, isolated integration point
    // for a real payment gateway (Razorpay etc). This demo flow does not
    // move any real money.
    const result = await startCheckout(lines, form as unknown as Record<string, string>);
    setSubmitting(false);

    if (result.status === "not_configured") {
      setPlacedOrder(true);
      track("purchase", { itemCount: lines.length, total, demo: true });
      clearCart();
    }
  }

  if (placedOrder) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-[var(--color-beige-dark)] bg-white p-8 text-center">
        <h2 className="font-display text-2xl text-[var(--color-green-700)]">Demo Order Received</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
          This is a demo checkout — no payment has actually been processed and no real order has been
          placed. Once a payment gateway (e.g. Razorpay) is connected in{" "}
          <code className="rounded bg-[var(--color-beige)] px-1.5 py-0.5">src/lib/payment.ts</code>, this
          step will complete a real order.
        </p>
        <Link href="/shop" className="btn-primary mt-6 inline-flex">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-beige-dark)] py-16 text-center">
        <p className="text-[var(--color-ink-soft)]">Your cart is empty — add a product before checking out.</p>
        <Link href="/shop" className="btn-primary mt-4 inline-flex">
          Shop Makhana
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="space-y-8">
        <section className="rounded-2xl border border-[var(--color-beige-dark)] bg-white p-6">
          <h2 className="font-display text-xl text-[var(--color-brown-900)]">Customer Information</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <FormField label="Full Name" name="fullName" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} error={errors.fullName} required />
            <FormField label="Email" name="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors.email} required />
            <FormField label="Phone" name="phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} error={errors.phone} required />
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--color-beige-dark)] bg-white p-6">
          <h2 className="font-display text-xl text-[var(--color-brown-900)]">Shipping Address</h2>
          <div className="mt-4 grid gap-4">
            <FormField label="Address" name="address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} error={errors.address} required />
            <div className="grid gap-4 sm:grid-cols-3">
              <FormField label="City" name="city" value={form.city} onChange={(v) => setForm({ ...form, city: v })} error={errors.city} required />
              <FormField label="State" name="state" value={form.state} onChange={(v) => setForm({ ...form, state: v })} error={errors.state} required />
              <FormField label="PIN Code" name="pincode" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} error={errors.pincode} required />
            </div>
            <FormField label="Country" name="country" value={form.country} onChange={(v) => setForm({ ...form, country: v })} required />
          </div>
        </section>

        <section className="rounded-2xl border border-dashed border-[var(--color-beige-dark)] bg-[var(--color-beige)]/40 p-6">
          <h2 className="font-display text-xl text-[var(--color-brown-900)]">Payment</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
            This is a demo checkout step — no payment gateway is connected yet, so no real payment will be
            taken. The integration point for Razorpay (or another provider) is clearly isolated in{" "}
            <code className="rounded bg-white px-1.5 py-0.5">src/lib/payment.ts</code> for a developer to
            wire up.
          </p>
        </section>
      </div>

      <div className="h-fit rounded-2xl border border-[var(--color-beige-dark)] bg-white p-6">
        <h2 className="font-display text-xl text-[var(--color-brown-900)]">Order Summary</h2>
        <ul className="mt-4 space-y-3">
          {lines.map((line) => (
            <li key={line.sku} className="flex items-center gap-3 text-sm">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[var(--color-beige)]">
                <Image src={line.image} alt={line.name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[var(--color-brown-900)]">{line.name}</p>
                <p className="text-xs text-[var(--color-ink-soft)]">
                  {line.weight} × {line.quantity}
                </p>
              </div>
              <p className="font-medium text-[var(--color-brown-900)]">{formatPrice(line.price * line.quantity)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-5 space-y-2 border-t border-[var(--color-beige-dark)] pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-[var(--color-ink-soft)]">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--color-ink-soft)]">Shipping</dt>
            <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between text-base font-semibold text-[var(--color-brown-900)]">
            <dt>Total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>
        <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full disabled:opacity-60">
          {submitting ? "Processing…" : "Place Demo Order"}
        </button>
        <button type="button" onClick={() => router.push("/cart")} className="mt-3 w-full text-center text-sm text-[var(--color-ink-soft)] underline">
          Back to Cart
        </button>
      </div>
    </form>
  );
}
