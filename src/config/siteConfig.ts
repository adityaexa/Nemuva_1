// ============================================================================
// NEMUVA — CENTRAL SITE CONFIGURATION
// ----------------------------------------------------------------------------
// This is the single source of truth for brand-level, contact, business and
// integration settings. Update the values below rather than hunting through
// components. Anything marked "PLACEHOLDER" must be replaced by the business
// owner before launch — nothing here is a real, verified business detail.
// ============================================================================

export const siteConfig = {
  brandName: "Nemuva",
  legalName: "Nemuva Foods (PLACEHOLDER LEGAL ENTITY NAME)",
  tagline: "बिहार के माटी से उपजल, दिल में बसल",
  taglineEnglish: "Authentic Makhana from Bihar, made for every generation.",
  description:
    "Nemuva brings authentic, farm-sourced Makhana (fox nuts) from Bihar to homes and businesses across India — with premium retail packs, bulk wholesale supply, private-label manufacturing and export sourcing support.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.nemuva.example.com",
  ogImage: "/images/hero-makhana.jpg",

  // ---- Contact placeholders — replace with verified business details ----
  contact: {
    phoneDisplay: "+91 00000 00000", // PLACEHOLDER
    phoneHref: "tel:+9100000000000", // PLACEHOLDER
    email: "hello@nemuva.example.com", // PLACEHOLDER
    b2bEmail: "business@nemuva.example.com", // PLACEHOLDER
    // Leave whatsappNumber empty ("") to automatically hide the floating
    // WhatsApp button and any WhatsApp CTAs across the site.
    whatsappNumber: "", // PLACEHOLDER e.g. "919000000000" (country code, no +/spaces)
    address: {
      line1: "PLACEHOLDER — Registered Office Address Line 1",
      line2: "PLACEHOLDER — Area, District",
      city: "Katihar / Darbhanga (PLACEHOLDER)",
      state: "Bihar",
      pincode: "000000",
      country: "India",
    },
    businessHours: "Mon–Sat, 10:00 AM – 6:30 PM IST (PLACEHOLDER)",
  },

  whatsappMessages: {
    general: "Hello Nemuva, I would like to know more about your Makhana products.",
    bulk: "Hello Nemuva, I am interested in buying Makhana in bulk.",
    privateLabel: "Hello Nemuva, I am interested in private-label Makhana.",
    export: "Hello Nemuva, I would like to discuss export/international sourcing of Makhana.",
  },

  socialLinks: {
    instagram: "https://instagram.com/nemuva.foods", // PLACEHOLDER
    facebook: "https://facebook.com/nemuva.foods", // PLACEHOLDER
    linkedin: "https://linkedin.com/company/nemuva-foods", // PLACEHOLDER
    youtube: "https://youtube.com/@nemuva.foods", // PLACEHOLDER
  },

  currency: {
    code: "INR",
    symbol: "₹",
  },

  shippingRules: {
    freeShippingThreshold: 999, // PLACEHOLDER — in INR
    standardShippingFee: 79, // PLACEHOLDER — in INR
    estimatedDeliveryDays: "4–8 business days (PLACEHOLDER — varies by pin code)",
    codAvailable: false, // PLACEHOLDER — enable once COD is genuinely supported
  },

  // ---- Analytics / integration IDs — read from env, never hardcoded ----
  analyticsIds: {
    ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_ID || "",
    gtmContainerId: process.env.NEXT_PUBLIC_GTM_ID || "",
  },

  // ---- Payment integration placeholders (see src/lib/payment.ts) ----
  payment: {
    razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  },

  nav: {
    primary: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Bulk & Wholesale", href: "/bulk-makhana" },
      { label: "Private Label", href: "/private-label" },
      { label: "Our Story", href: "/our-story" },
      { label: "Makhana Guide", href: "/makhana-guide" },
      { label: "Journal", href: "/journal" },
      { label: "Contact", href: "/contact" },
    ],
    footerShop: [
      { label: "Shop All", href: "/shop" },
      { label: "Raw Makhana", href: "/shop?category=raw-makhana" },
      { label: "Roasted Makhana", href: "/shop?category=roasted-makhana" },
      { label: "Flavoured Makhana", href: "/shop?category=flavoured-makhana" },
      { label: "Family Packs", href: "/shop?category=family-packs" },
    ],
    footerBusiness: [
      { label: "Bulk & Wholesale", href: "/bulk-makhana" },
      { label: "Private Label", href: "/private-label" },
      { label: "Quality Promise", href: "/quality" },
    ],
    footerLearn: [
      { label: "Our Story", href: "/our-story" },
      { label: "Makhana Guide", href: "/makhana-guide" },
      { label: "Journal", href: "/journal" },
      { label: "FAQ", href: "/faq" },
    ],
    footerSupport: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "FAQ", href: "/faq" },
    ],
    footerLegal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
    ],
  },

  announcementBar: "Authentic Makhana from Bihar · Quality Checked, Batch by Batch · Pan-India Delivery",
} as const;

export type SiteConfig = typeof siteConfig;
