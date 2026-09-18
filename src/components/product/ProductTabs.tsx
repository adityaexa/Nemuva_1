"use client";

import { useState } from "react";
import { Product } from "@/types";
import { siteConfig } from "@/config/siteConfig";

export function ProductTabs({ product }: { product: Product }) {
  const tabs = [
    { key: "description", label: "Description" },
    { key: "ingredients", label: "Ingredients" },
    { key: "nutrition", label: "Nutrition" },
    { key: "howto", label: "How to Use" },
    { key: "storage", label: "Storage" },
    { key: "shipping", label: "Shipping" },
  ] as const;

  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("description");

  return (
    <div>
      <div role="tablist" aria-label="Product information" className="flex flex-wrap gap-2 border-b border-[var(--color-beige-dark)]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            id={`tab-${tab.key}`}
            aria-selected={active === tab.key}
            aria-controls={`panel-${tab.key}`}
            onClick={() => setActive(tab.key)}
            className={`border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
              active === tab.key
                ? "border-[var(--color-green-700)] text-[var(--color-green-700)]"
                : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-6 text-sm leading-relaxed text-[var(--color-ink-soft)]">
        <div role="tabpanel" id="panel-description" aria-labelledby="tab-description" hidden={active !== "description"}>
          <p>{product.description}</p>
          <ul className="mt-4 space-y-1.5">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-2">
                <span aria-hidden="true">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div role="tabpanel" id="panel-ingredients" aria-labelledby="tab-ingredients" hidden={active !== "ingredients"}>
          <ul className="space-y-1.5">
            {product.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
        </div>

        <div role="tabpanel" id="panel-nutrition" aria-labelledby="tab-nutrition" hidden={active !== "nutrition"}>
          <table className="w-full max-w-sm border-collapse text-left">
            <caption className="mb-2 text-left text-xs text-[var(--color-ink-soft)]">
              Approximate values — may vary slightly by batch.
            </caption>
            <tbody>
              {product.nutrition.map((fact) => (
                <tr key={fact.label} className="border-b border-[var(--color-beige-dark)]">
                  <th scope="row" className="py-2 pr-4 font-medium text-[var(--color-ink)]">
                    {fact.label}
                  </th>
                  <td className="py-2">{fact.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div role="tabpanel" id="panel-howto" aria-labelledby="tab-howto" hidden={active !== "howto"}>
          <p>{product.howToUse}</p>
        </div>

        <div role="tabpanel" id="panel-storage" aria-labelledby="tab-storage" hidden={active !== "storage"}>
          <p>{product.storage}</p>
        </div>

        <div role="tabpanel" id="panel-shipping" aria-labelledby="tab-shipping" hidden={active !== "shipping"}>
          <p>
            Orders are typically dispatched within 1–2 business days. Estimated delivery:{" "}
            {siteConfig.shippingRules.estimatedDeliveryDays}. Free shipping on orders above{" "}
            {siteConfig.currency.symbol}
            {siteConfig.shippingRules.freeShippingThreshold}. See our{" "}
            <a href="/shipping-returns" className="underline text-[var(--color-green-700)]">
              Shipping &amp; Returns
            </a>{" "}
            page for full details.
          </p>
        </div>
      </div>
    </div>
  );
}
