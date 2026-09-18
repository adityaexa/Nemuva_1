import { Category } from "@/types";

// Centralized category data. Add a new category here and it will
// automatically appear in the homepage category grid and shop filters.
export const categories: Category[] = [
  {
    slug: "raw-makhana",
    name: "Raw Makhana",
    description: "Unroasted, natural fox nuts ready for home roasting, curries or kheer.",
    image: "/images/category-raw-makhana.jpg",
  },
  {
    slug: "premium-makhana",
    name: "Premium Makhana",
    description: "Hand-selected, larger-grade Makhana for everyday indulgence.",
    image: "/images/category-premium-makhana.jpg",
  },
  {
    slug: "roasted-makhana",
    name: "Roasted Makhana",
    description: "Lightly roasted in small batches for a clean, crunchy bite.",
    image: "/images/category-roasted-makhana.jpg",
  },
  {
    slug: "flavoured-makhana",
    name: "Flavoured Makhana",
    description: "Roasted Makhana tossed in home-style Indian flavours.",
    image: "/images/category-flavoured-makhana.jpg",
  },
  {
    slug: "family-packs",
    name: "Family Packs",
    description: "Larger jars and pouches made for everyday family snacking.",
    image: "/images/category-family-pack.jpg",
  },
  {
    slug: "bulk-packs",
    name: "Bulk Packs",
    description: "Wholesale-friendly quantities for businesses and institutions.",
    image: "/images/category-bulk-pack.jpg",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
