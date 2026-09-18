// Central type definitions for the Nemuva storefront.
// Keeping types here (rather than scattered per-component) makes it easy
// to later swap the static /data files for a real backend/CMS/DB without
// touching component code.

export type ProductBadge = "Best Seller" | "New" | "Premium" | "Value Pack" | null;

export interface ProductVariant {
  weight: string; // e.g. "100g", "250g", "500g", "1kg"
  price: number; // INR
  comparePrice?: number; // optional strike-through price
  stock: number; // available units, 0 = out of stock
  sku: string;
}

export interface NutritionFact {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ProductCategorySlug;
  images: string[]; // paths under /public/images
  variants: ProductVariant[];
  badge: ProductBadge;
  rating: number; // 0-5
  reviews: number; // count
  features: string[];
  ingredients: string[];
  nutrition: NutritionFact[];
  storage: string;
  howToUse: string;
  seoTitle: string;
  seoDescription: string;
}

export type ProductCategorySlug =
  | "raw-makhana"
  | "premium-makhana"
  | "roasted-makhana"
  | "flavoured-makhana"
  | "family-packs"
  | "bulk-packs";

export interface Category {
  slug: ProductCategorySlug;
  name: string;
  description: string;
  image: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[]; // paragraphs / simple markdown-ish blocks
  category: string;
  image: string;
  date: string; // ISO date
  author: string;
  readingTime: string;
  relatedProductSlugs?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: "general" | "product" | "b2b" | "shipping" | "company";
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  isPlaceholder: boolean;
}

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  image: string;
  weight: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  sku: string;
}
