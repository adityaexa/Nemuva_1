// ============================================================================
// ANALYTICS ABSTRACTION
// ----------------------------------------------------------------------------
// A single place to route analytics events. Today this pushes to the GA4/GTM
// dataLayer when NEXT_PUBLIC_GA4_ID / NEXT_PUBLIC_GTM_ID are configured (see
// src/config/siteConfig.ts + src/components/shared/AnalyticsScripts.tsx).
// Swap the internals of `track()` to also forward to another provider
// (Segment, PostHog, a custom backend, etc.) without touching call sites.
// ============================================================================

export type AnalyticsEvent =
  | "page_view"
  | "view_item"
  | "add_to_cart"
  | "remove_from_cart"
  | "begin_checkout"
  | "purchase"
  | "search"
  | "bulk_inquiry"
  | "private_label_inquiry"
  | "contact_form"
  | "whatsapp_click"
  | "newsletter_signup";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, payload);
  }
}
