import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";
import { getAllProducts } from "@/data/products";
import { getAllBlogPosts } from "@/data/blog";

const staticRoutes = [
  "",
  "/shop",
  "/cart",
  "/bulk-makhana",
  "/private-label",
  "/our-story",
  "/makhana-guide",
  "/journal",
  "/contact",
  "/quality",
  "/shipping-returns",
  "/faq",
  "/privacy-policy",
  "/terms-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: `${base}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${base}/journal/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...productEntries, ...blogEntries];
}
