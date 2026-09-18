# Nemuva — Authentic Makhana from Bihar

A production-ready, full-stack Next.js website for **Nemuva**, a Makhana (fox nut) D2C + B2B food brand.
Built with Next.js (App Router), React, TypeScript and Tailwind CSS.

Nemuva's business model mirrors a typical Bihar-Makhana D2C/B2B brand — retail shopping, bulk/wholesale
enquiries, private-label/contract manufacturing, export sourcing, Makhana education content, and a blog —
but every piece of branding, copy, imagery and visual design here is original to Nemuva.

---

## 1. Tech Stack

- **Next.js 16** (App Router, Turbopack, React 19, TypeScript)
- **Tailwind CSS v4** (CSS-first theme, see `src/app/globals.css`)
- Self-hosted local fonts via `next/font/local` (no external font requests)
- Static/data-driven content (`src/data/*.ts`) — swap for a real backend later without touching UI code
- Cart persisted with `localStorage` via React Context (`src/lib/cart-context.tsx`)
- API routes for lead-capture forms (`src/app/api/*`) with clearly documented integration points
- SEO: sitemap, robots.txt, Open Graph/Twitter metadata, JSON-LD (Organization, WebSite, Product,
  BreadcrumbList, Article, FAQPage)

---

## 2. Getting Started (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables and fill in what you have (all optional for local dev)
cp .env.example .env.local

# 3. Run the dev server
npm run dev
```

Visit http://localhost:3000.

## 3. Production Build

```bash
npm run build   # builds the production bundle (Turbopack)
npm run start   # serves the production build locally, e.g. on http://localhost:3000
```

This project has been verified to build cleanly with **zero TypeScript errors and zero ESLint warnings**
(`npx eslint .`), and every route has been smoke-tested in a production build (`npm run build && npm run
start`), including the dynamic product/journal routes, the API routes, `sitemap.xml` and `robots.txt`.

---

## 4. Project Structure

```
src/
  app/                     Routes (App Router)
    page.tsx               Homepage
    shop/                  Product listing + filters
    products/[slug]/       Product detail pages
    cart/, checkout/       Cart + demo checkout
    bulk-makhana/          B2B / wholesale page
    private-label/         Private label / contract manufacturing
    our-story/             Brand story
    makhana-guide/         Makhana education hub
    journal/, journal/[slug]/   Blog
    contact/, quality/, shipping-returns/, faq/,
    privacy-policy/, terms-conditions/
    api/                   Route handlers for forms (contact, bulk-inquiry, private-label, newsletter)
    sitemap.ts, robots.ts
  components/
    layout/                Header, Footer, AnnouncementBar
    home/                  Homepage sections
    product/                Product grid/card/gallery/tabs
    cart/                  Cart drawer, cart item, quantity selector
    shared/                Reusable UI: forms, FAQ accordion, breadcrumbs, WhatsApp button, etc.
  data/                    products.ts, categories.ts, blog.ts, faqs.ts, testimonials.ts
  config/siteConfig.ts     Single source of truth for brand/contact/business config
  lib/                     cart-context, analytics, payment (stub), schema (JSON-LD), utils, fonts
  types/                   Shared TypeScript types
  fonts/                   Self-hosted OFL-licensed font files
scripts/
  generate-placeholder-images.py   Regenerates the placeholder artwork in public/images
public/images/             All site imagery (see "Replacing Images" below)
```

---

## 5. Replacing Placeholder Images

**Every image in `/public/images` is 100% original, procedurally generated placeholder artwork** — soft
gradients, organic seed-like shapes and pond/field motifs in Nemuva's brand palette. Nothing is a
photograph, stock image, or derived from any reference/competitor site.

To swap in real photography: save a new file **using the exact same filename** into `/public/images/` —
no code changes are needed, since every component reads image paths from `src/data/*.ts` or inline
`<Image src="/images/...">` calls. Recommended replacement shots (from the original brief):

- `hero-makhana.jpg` — hero bowl of Makhana
- `category-*.jpg` (6 files) — one per shop category
- `product-*-1.jpg` / `product-*-2.jpg` (16 files) — two images per catalogue product
- `blog-*.jpg` (8 files) — one per journal article
- `bihar-landscape.jpg`, `makhana-pond.jpg`, `farmer-harvest.jpg` — origin story imagery
- `private-label-packaging.jpg`, `export-packaging.jpg` — B2B imagery
- `family-snacking.jpg` — lifestyle imagery
- `grade-4-suta.jpg`, `grade-5-suta.jpg`, `grade-6-suta.jpg` — size-grade comparison cards
- `bulk-makhana-crates.jpg`, `raw-makhana-closeup.jpg`, `makhana-processing.jpg`, `makhana-grading.jpg`
- `nemuva-logo.png` — used only as the Organization schema logo reference

To regenerate the placeholder set (e.g. after editing the palette), run:

```bash
pip install Pillow --break-system-packages   # if not already installed
python3 scripts/generate-placeholder-images.py
```

---

## 6. Adding / Editing Products

Edit `src/data/products.ts`. Each product is a plain object:

```ts
{
  id: "p9",
  slug: "your-product-slug",
  name: "Product Name",
  shortDescription: "...",
  description: "...",
  category: "raw-makhana", // must match a slug in src/data/categories.ts
  images: ["/images/your-image-1.jpg", "/images/your-image-2.jpg"],
  variants: [{ weight: "100g", price: 149, comparePrice: 179, stock: 100, sku: "NMV-XXX-100" }],
  badge: "New", // or "Best Seller" | "Premium" | "Value Pack" | null
  rating: 4.5,
  reviews: 0,
  features: ["..."],
  ingredients: ["..."],
  nutrition: [{ label: "Energy", value: "..." }],
  storage: "...",
  howToUse: "...",
  seoTitle: "...",
  seoDescription: "...",
}
```

The product automatically appears in `/shop`, the homepage featured grid, the sitemap, and gets its own
`/products/[slug]` page with Product schema — no other code changes required.

**Note on backend readiness:** this file is the single place a future backend/CMS/inventory system should
replace. The intended integration point is to swap `src/data/products.ts`'s exports for `fetch()` calls to
your API — every component already reads products only through the helper functions exported from that
file (`getAllProducts`, `getProductBySlug`, etc.), so no UI code needs to change.

## 7. Adding Blog / Journal Articles

Edit `src/data/blog.ts` — add an object to the `blogPosts` array with a unique `slug`. It will
automatically appear on `/journal`, get its own `/journal/[slug]` page with Article schema, and be
included in the sitemap.

---

## 8. Configuring Contact Details, WhatsApp & Business Info

All business-specific values live in **`src/config/siteConfig.ts`** — a single file, so nothing is
duplicated across components. Update:

- `contact.phoneDisplay` / `contact.phoneHref` / `contact.email` / `contact.b2bEmail` / `contact.address`
  / `contact.businessHours` — currently clearly marked `PLACEHOLDER` values.
- `contact.whatsappNumber` — **leave empty (`""`) to hide the floating WhatsApp button and all WhatsApp
  CTAs.** Set it to a full international number with no `+`/spaces (e.g. `"919876543210"`) to enable them.
- `socialLinks` — Instagram/Facebook/LinkedIn/YouTube URLs (placeholders until real profiles exist).
- `shippingRules` — free shipping threshold, standard shipping fee, delivery estimate, COD availability.
- `announcementBar` — the slim top bar copy.

## 9. Configuring Analytics (GA4 / GTM)

No analytics script loads until you set an environment variable:

```bash
# .env.local
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

See `src/components/shared/AnalyticsScripts.tsx` (script loading) and `src/lib/analytics.ts` (a `track()`
helper already called throughout the app for `page_view`, `view_item`, `add_to_cart`, `remove_from_cart`,
`begin_checkout`, `purchase`, `search`, `bulk_inquiry`, `private_label_inquiry`, `contact_form`,
`whatsapp_click`, and `newsletter_signup`).

## 10. Configuring a Payment Gateway (Razorpay)

**No payment gateway is connected in this codebase.** The checkout UI (`src/app/checkout/`) is fully
built and functional as a UI/UX flow, but it intentionally stops at a clearly-labelled "demo order" step —
no money can be moved. The single, documented integration point is **`src/lib/payment.ts`**, which
contains step-by-step instructions for wiring up Razorpay (or Stripe / a custom backend). In short:

1. Add a server-side API route that creates a Razorpay order using your **secret** key (server env var,
   never `NEXT_PUBLIC_`).
2. Add your public key as `NEXT_PUBLIC_RAZORPAY_KEY_ID` in `.env.local`.
3. Update `startCheckout()` in `src/lib/payment.ts` to call that route and open Razorpay's checkout modal.
4. Verify payment signatures server-side before marking an order paid.

## 11. Deploying to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Import the repository in the [Vercel dashboard](https://vercel.com/new).
3. Add the environment variables from `.env.example` under Project Settings → Environment Variables.
4. Deploy — Vercel auto-detects Next.js and runs `next build`.

## 12. Deploying to Traditional / Node.js Hosting (e.g. Hostinger)

```bash
npm install
npm run build
npm run start   # starts a Node server on port 3000 by default (use `PORT=xxxx npm run start` to change)
```

Point your hosting provider's Node.js app (or a process manager like PM2) at `npm run start`, set the same
environment variables from `.env.example` in the hosting control panel, and put a reverse proxy (Nginx,
or the host's built-in one) in front of it for your domain and TLS. This project has no dependency on any
Vercel-specific feature — it runs on any standard Node.js 20.9+ host.

For a static-export-only host (no Node.js runtime), you would need to remove the API routes
(`src/app/api/*`) and cart/checkout server dependency and adapt forms to a third-party form endpoint —
this is not the default setup here, since the brief calls for working API routes.

---

## 13. What You Still Need to Do Before Launch

This is a fully functional, production-quality **frontend and demo-integration** codebase. Before taking
it live as a real store, you will need to:

- Replace all placeholder images (see §5) with real Nemuva photography.
- Replace every `PLACEHOLDER` value in `src/config/siteConfig.ts` (phone, email, address, business hours,
  social links, legal entity name) with verified real information.
- Connect a real payment gateway (§10).
- Connect the four API routes under `src/app/api/` to a real email/CRM/database (each file has inline
  `TODO` comments explaining exactly where).
- Replace the placeholder testimonials in `src/data/testimonials.ts` with real, consented customer reviews.
- Review `src/app/privacy-policy/page.tsx`, `src/app/terms-conditions/page.tsx` and
  `src/app/shipping-returns/page.tsx` with a qualified legal professional — these are generic starting
  structures, not legal advice.
- Obtain and list any real certifications (e.g. FSSAI) on `/quality` — none are claimed today.
- Set `NEXT_PUBLIC_SITE_URL` to your real production domain (used in canonical URLs, sitemap and Open
  Graph tags).

---

## Original Design Statement

This project was built by studying the *business model and information architecture* of an existing
Bihar-Makhana D2C/B2B website (shopping + bulk/wholesale + private label + export + education/blog +
policy pages) to understand what functionality a brand like Nemuva needs — **not** by copying its code,
copy, imagery, testimonials, logo, or visual design. Nemuva's brand name, tagline, color palette,
typography, copywriting, product line, and every image are original work created for this project.
