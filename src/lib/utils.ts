import { siteConfig } from "@/config/siteConfig";

export function formatPrice(amount: number): string {
  return `${siteConfig.currency.symbol}${amount.toLocaleString("en-IN")}`;
}

export function computeDiscountPercent(price: number, comparePrice?: number): number | null {
  if (!comparePrice || comparePrice <= price) return null;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function buildWhatsAppLink(message: string): string | null {
  const number = siteConfig.contact.whatsappNumber?.trim();
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
