// ============================================================================
// PAYMENT INTEGRATION POINT (currently a documented placeholder)
// ----------------------------------------------------------------------------
// Nemuva's checkout UI (src/app/checkout/page.tsx) is fully built, but no
// live payment gateway is wired up in this codebase — no payment can be
// genuinely completed here. This file is the single, clearly-isolated place
// where a real integration should be added.
//
// TO ADD RAZORPAY:
//   1. `npm install razorpay` (server SDK) and add the Razorpay checkout.js
//      script (client-side) where needed.
//   2. Add RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET to your server environment
//      (never expose the secret to the client) and NEXT_PUBLIC_RAZORPAY_KEY_ID
//      for the public key used by the client checkout widget.
//   3. Create a server route (e.g. src/app/api/create-order/route.ts) that
//      calls the Razorpay Orders API using the secret key, and return the
//      order id to the client.
//   4. In `startCheckout` below, call that API route, then open Razorpay's
//      checkout modal with the returned order id.
//   5. Verify the payment signature server-side in a webhook or a
//      `src/app/api/verify-payment/route.ts` route before marking an order
//      as paid.
//
// The same pattern applies for Stripe, a Shopify Storefront/Admin API, or a
// custom backend — replace the body of `startCheckout` accordingly.
// ============================================================================

import { CartLine } from "@/types";

export interface CheckoutResult {
  status: "not_configured" | "success" | "error";
  message: string;
}

export async function startCheckout(
  lines: CartLine[],
  customer: Record<string, string>
): Promise<CheckoutResult> {
  // NOTE: This is intentionally a stub. Do not present this as a live
  // payment flow to end users — the checkout UI clearly labels this as a
  // demo step until a real gateway is connected here.
  if (process.env.NODE_ENV === "development") {
    console.debug("[payment] startCheckout called with (not yet processed):", { lines, customer });
  }
  return {
    status: "not_configured",
    message:
      "Payment gateway is not yet connected. Wire up Razorpay (or another provider) in src/lib/payment.ts.",
  };
}
