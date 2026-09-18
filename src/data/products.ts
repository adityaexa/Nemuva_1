import { Product } from "@/types";

// ============================================================================
// PRODUCT CATALOGUE
// ----------------------------------------------------------------------------
// This is a static data file so the site works fully out of the box. When a
// real backend/CMS/inventory system is ready, replace the contents of this
// file with a fetch() to that API — every component reads products through
// the helper functions below, so no component code needs to change.
// ============================================================================

export const products: Product[] = [
  {
    id: "p1",
    slug: "raw-makhana-classic",
    name: "Classic Raw Makhana",
    shortDescription: "Natural, unroasted fox nuts sourced from Bihar's ponds.",
    description:
      "Our Classic Raw Makhana is sourced from Bihar's traditional Makhana-growing belt and carefully cleaned and sorted before packing. It arrives unroasted so you can roast, fry or simmer it exactly the way your kitchen needs — in kheer, curries, or a home-roasted snack with your own seasoning.",
    category: "raw-makhana",
    images: ["/images/product-raw-makhana-1.jpg", "/images/product-raw-makhana-2.jpg"],
    variants: [
      { weight: "100g", price: 149, comparePrice: 179, stock: 120, sku: "NMV-RAW-100" },
      { weight: "250g", price: 329, comparePrice: 389, stock: 80, sku: "NMV-RAW-250" },
      { weight: "500g", price: 599, comparePrice: 699, stock: 45, sku: "NMV-RAW-500" },
    ],
    badge: "Best Seller",
    rating: 4.6,
    reviews: 128,
    features: [
      "Naturally sourced from Bihar",
      "Sorted for uniform size",
      "No added oil or preservatives",
      "Resealable, food-safe pack",
    ],
    ingredients: ["100% Makhana (Fox Nuts / Euryale Ferox)"],
    nutrition: [
      { label: "Energy", value: "~347 kcal / 100g" },
      { label: "Protein", value: "~9.7 g / 100g" },
      { label: "Carbohydrates", value: "~76.9 g / 100g" },
      { label: "Fat", value: "~0.1 g / 100g" },
    ],
    storage: "Store in a cool, dry place in an airtight container, away from direct sunlight and moisture.",
    howToUse: "Dry roast on low flame for 4–5 minutes until crisp, or use directly in kheer, curries and soups.",
    seoTitle: "Buy Raw Makhana Online from Bihar | Nemuva",
    seoDescription:
      "Shop natural, unroasted raw Makhana (fox nuts) sourced from Bihar. Sorted, cleaned and packed for everyday cooking and home roasting.",
  },
  {
    id: "p2",
    slug: "premium-makhana-6-suta",
    name: "Premium 6 Suta Makhana",
    shortDescription: "Larger-grade, hand-selected Makhana for a richer bite.",
    description:
      "Graded to the larger '6 Suta' size, this premium selection is chosen for size consistency and a satisfying, fuller bite. It's the grade most preferred for gifting and special-occasion cooking, while working just as well for daily snacking.",
    category: "premium-makhana",
    images: ["/images/product-premium-makhana-1.jpg", "/images/product-premium-makhana-2.jpg"],
    variants: [
      { weight: "100g", price: 219, comparePrice: 259, stock: 60, sku: "NMV-PREM-100" },
      { weight: "250g", price: 479, comparePrice: 549, stock: 40, sku: "NMV-PREM-250" },
      { weight: "500g", price: 899, comparePrice: 999, stock: 25, sku: "NMV-PREM-500" },
    ],
    badge: "Premium",
    rating: 4.8,
    reviews: 94,
    features: [
      "Larger 6 Suta grade",
      "Hand-selected for uniform size",
      "Ideal for gifting",
      "Low moisture, extended freshness",
    ],
    ingredients: ["100% Makhana (Fox Nuts / Euryale Ferox)"],
    nutrition: [
      { label: "Energy", value: "~347 kcal / 100g" },
      { label: "Protein", value: "~9.7 g / 100g" },
      { label: "Carbohydrates", value: "~76.9 g / 100g" },
      { label: "Fat", value: "~0.1 g / 100g" },
    ],
    storage: "Store in a cool, dry place in an airtight container, away from direct sunlight and moisture.",
    howToUse: "Best roasted lightly with a few drops of ghee or oil and a pinch of your favourite seasoning.",
    seoTitle: "Premium 6 Suta Makhana Online | Nemuva Bihar Makhana",
    seoDescription:
      "Shop premium, hand-selected 6 Suta grade Makhana from Bihar. Larger size, consistent grading — ideal for gifting and daily snacking.",
  },
  {
    id: "p3",
    slug: "roasted-makhana-himalayan-salt",
    name: "Roasted Makhana — Himalayan Salt",
    shortDescription: "Lightly roasted and seasoned with pink Himalayan salt.",
    description:
      "Roasted in small batches and finished with a light hand of Himalayan pink salt, this is Nemuva's take on a clean, ready-to-eat snack — crunchy, light and easy to keep at your desk, in the car, or in your bag.",
    category: "roasted-makhana",
    images: ["/images/product-roasted-salt-1.jpg", "/images/product-roasted-salt-2.jpg"],
    variants: [
      { weight: "60g", price: 129, comparePrice: 149, stock: 150, sku: "NMV-RST-SALT-60" },
      { weight: "150g", price: 269, comparePrice: 309, stock: 90, sku: "NMV-RST-SALT-150" },
    ],
    badge: "Best Seller",
    rating: 4.5,
    reviews: 176,
    features: [
      "Small-batch roasted",
      "Seasoned with Himalayan pink salt",
      "Ready to eat, no prep needed",
      "Light, low-oil roasting",
    ],
    ingredients: ["Makhana (Fox Nuts)", "Edible Oil", "Himalayan Pink Salt"],
    nutrition: [
      { label: "Energy", value: "~365 kcal / 100g" },
      { label: "Protein", value: "~9.2 g / 100g" },
      { label: "Carbohydrates", value: "~73 g / 100g" },
      { label: "Fat", value: "~3.8 g / 100g" },
    ],
    storage: "Store in a cool, dry place. Reseal the pack tightly after opening to retain crunch.",
    howToUse: "Ready to eat straight from the pack.",
    seoTitle: "Roasted Makhana with Himalayan Salt | Nemuva",
    seoDescription:
      "Crunchy roasted Makhana seasoned with Himalayan pink salt. Small-batch roasted, ready to eat, from Nemuva's Bihar sourcing.",
  },
  {
    id: "p4",
    slug: "roasted-makhana-peri-peri",
    name: "Roasted Makhana — Peri Peri",
    shortDescription: "Roasted Makhana tossed in a tangy peri peri seasoning.",
    description:
      "For a spicier snacking moment, our Peri Peri Makhana pairs a light roast with a tangy, mildly fiery seasoning blend — a favourite for movie nights and evening chai.",
    category: "flavoured-makhana",
    images: ["/images/product-peri-peri-1.jpg", "/images/product-peri-peri-2.jpg"],
    variants: [
      { weight: "60g", price: 139, comparePrice: 159, stock: 100, sku: "NMV-PP-60" },
      { weight: "150g", price: 289, comparePrice: 329, stock: 70, sku: "NMV-PP-150" },
    ],
    badge: "New",
    rating: 4.4,
    reviews: 52,
    features: [
      "Tangy peri peri seasoning",
      "Light roast, low oil",
      "No artificial colours",
      "Resealable pack",
    ],
    ingredients: ["Makhana (Fox Nuts)", "Edible Oil", "Peri Peri Seasoning (Spices, Salt, Citric Acid)"],
    nutrition: [
      { label: "Energy", value: "~370 kcal / 100g" },
      { label: "Protein", value: "~9.0 g / 100g" },
      { label: "Carbohydrates", value: "~72 g / 100g" },
      { label: "Fat", value: "~4.2 g / 100g" },
    ],
    storage: "Store in a cool, dry place. Reseal the pack tightly after opening to retain crunch.",
    howToUse: "Ready to eat straight from the pack.",
    seoTitle: "Peri Peri Flavoured Makhana | Nemuva Bihar Makhana",
    seoDescription:
      "Tangy peri peri roasted Makhana snack from Nemuva. Light roast, bold flavour, no artificial colours.",
  },
  {
    id: "p5",
    slug: "roasted-makhana-tangy-masala",
    name: "Roasted Makhana — Tangy Masala",
    shortDescription: "A classic Indian masala twist on roasted Makhana.",
    description:
      "A comforting, home-style masala blend of roasted spices tossed over lightly roasted Makhana — familiar, moreish and perfect with evening tea.",
    category: "flavoured-makhana",
    images: ["/images/product-tangy-masala-1.jpg", "/images/product-tangy-masala-2.jpg"],
    variants: [
      { weight: "60g", price: 135, comparePrice: 155, stock: 110, sku: "NMV-TM-60" },
      { weight: "150g", price: 279, comparePrice: 319, stock: 65, sku: "NMV-TM-150" },
    ],
    badge: null,
    rating: 4.5,
    reviews: 61,
    features: [
      "Home-style masala blend",
      "Light roast, low oil",
      "Everyday snacking favourite",
      "Resealable pack",
    ],
    ingredients: ["Makhana (Fox Nuts)", "Edible Oil", "Masala Seasoning (Spices, Salt, Amchur)"],
    nutrition: [
      { label: "Energy", value: "~368 kcal / 100g" },
      { label: "Protein", value: "~9.1 g / 100g" },
      { label: "Carbohydrates", value: "~72.5 g / 100g" },
      { label: "Fat", value: "~4.0 g / 100g" },
    ],
    storage: "Store in a cool, dry place. Reseal the pack tightly after opening to retain crunch.",
    howToUse: "Ready to eat straight from the pack.",
    seoTitle: "Tangy Masala Roasted Makhana | Nemuva",
    seoDescription:
      "Home-style tangy masala roasted Makhana snack from Nemuva — a comforting everyday tea-time favourite.",
  },
  {
    id: "p6",
    slug: "family-pack-assorted-jar",
    name: "Family Assorted Jar",
    shortDescription: "A large jar mixing our most-loved roasted flavours.",
    description:
      "Built for the family snack shelf, this jar combines our most-loved roasted flavours in one larger format — convenient, shareable and designed to stay fresh through daily use with its resealable lid.",
    category: "family-packs",
    images: ["/images/product-family-jar-1.jpg", "/images/product-family-jar-2.jpg"],
    variants: [
      { weight: "300g", price: 549, comparePrice: 629, stock: 55, sku: "NMV-FAM-300" },
      { weight: "600g", price: 999, comparePrice: 1149, stock: 30, sku: "NMV-FAM-600" },
    ],
    badge: "Value Pack",
    rating: 4.7,
    reviews: 39,
    features: [
      "Family-sized resealable jar",
      "Mix of roasted flavours",
      "Great for daily snacking",
      "Designed to retain freshness",
    ],
    ingredients: ["Makhana (Fox Nuts)", "Edible Oil", "Assorted Seasonings"],
    nutrition: [
      { label: "Energy", value: "~365 kcal / 100g" },
      { label: "Protein", value: "~9.2 g / 100g" },
      { label: "Carbohydrates", value: "~73 g / 100g" },
      { label: "Fat", value: "~3.9 g / 100g" },
    ],
    storage: "Keep the jar lid tightly closed after each use, in a cool, dry place.",
    howToUse: "Ready to eat straight from the jar.",
    seoTitle: "Family Assorted Makhana Jar | Nemuva",
    seoDescription:
      "A shareable family jar of assorted roasted Makhana flavours from Nemuva — convenient, resealable, and ready to snack.",
  },
  {
    id: "p7",
    slug: "raw-makhana-4-suta",
    name: "Everyday Raw Makhana — 4 Suta",
    shortDescription: "Everyday grade raw Makhana, ideal for home roasting.",
    description:
      "A value-friendly, everyday grade of raw Makhana suited to home roasting, curries and daily cooking — the same careful sourcing and cleaning process, in a smaller, more economical grade.",
    category: "raw-makhana",
    images: ["/images/product-raw-4suta-1.jpg", "/images/product-raw-4suta-2.jpg"],
    variants: [
      { weight: "250g", price: 249, comparePrice: 289, stock: 95, sku: "NMV-RAW4-250" },
      { weight: "500g", price: 449, comparePrice: 519, stock: 60, sku: "NMV-RAW4-500" },
      { weight: "1kg", price: 849, comparePrice: 969, stock: 35, sku: "NMV-RAW4-1000" },
    ],
    badge: null,
    rating: 4.3,
    reviews: 44,
    features: [
      "Everyday 4 Suta grade",
      "Cleaned and sorted",
      "Great value for daily cooking",
      "Food-safe resealable pack",
    ],
    ingredients: ["100% Makhana (Fox Nuts / Euryale Ferox)"],
    nutrition: [
      { label: "Energy", value: "~347 kcal / 100g" },
      { label: "Protein", value: "~9.7 g / 100g" },
      { label: "Carbohydrates", value: "~76.9 g / 100g" },
      { label: "Fat", value: "~0.1 g / 100g" },
    ],
    storage: "Store in a cool, dry place in an airtight container, away from direct sunlight and moisture.",
    howToUse: "Dry roast on low flame for 4–5 minutes until crisp, or use directly in kheer, curries and soups.",
    seoTitle: "4 Suta Raw Makhana Online | Nemuva Bihar Makhana",
    seoDescription:
      "Buy everyday-grade 4 Suta raw Makhana from Bihar. Cleaned, sorted and packed for daily cooking and home roasting.",
  },
  {
    id: "p8",
    slug: "bulk-pack-raw-makhana-5kg",
    name: "Bulk Raw Makhana — 5kg",
    shortDescription: "Wholesale-friendly bulk pack for businesses and institutions.",
    description:
      "Designed for wholesalers, retailers, hotels, restaurants and institutional kitchens, this bulk pack delivers consistent quality raw Makhana in a business-friendly quantity. For larger volumes, custom grading or recurring supply, use our Bulk & Wholesale enquiry form.",
    category: "bulk-packs",
    images: ["/images/product-bulk-5kg-1.jpg", "/images/product-bulk-5kg-2.jpg"],
    variants: [
      { weight: "5kg", price: 7499, comparePrice: 8299, stock: 20, sku: "NMV-BULK-5000" },
    ],
    badge: "Value Pack",
    rating: 4.6,
    reviews: 18,
    features: [
      "Business/institutional quantity",
      "Consistent grading",
      "Custom packaging available on request",
      "Ideal for restaurants, hotels and retailers",
    ],
    ingredients: ["100% Makhana (Fox Nuts / Euryale Ferox)"],
    nutrition: [
      { label: "Energy", value: "~347 kcal / 100g" },
      { label: "Protein", value: "~9.7 g / 100g" },
      { label: "Carbohydrates", value: "~76.9 g / 100g" },
      { label: "Fat", value: "~0.1 g / 100g" },
    ],
    storage: "Store in a cool, dry warehouse environment away from moisture.",
    howToUse: "Suited for further processing, roasting, or direct culinary use.",
    seoTitle: "Bulk Raw Makhana Supplier — 5kg Wholesale Pack | Nemuva",
    seoDescription:
      "Wholesale 5kg raw Makhana pack from Nemuva for restaurants, retailers and distributors. Contact us for custom bulk quantities.",
  },
];

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 8) {
  return products.slice(0, limit);
}

export function getLowestPrice(product: Product) {
  return Math.min(...product.variants.map((v) => v.price));
}
