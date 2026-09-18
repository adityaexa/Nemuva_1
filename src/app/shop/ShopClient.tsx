"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products as allProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getLowestPrice } from "@/data/products";

type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

export function ShopClient() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [weight, setWeight] = useState("all");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sort, setSort] = useState<SortOption>("featured");

  const allWeights = useMemo(() => {
    const weights = new Set<string>();
    allProducts.forEach((p) => p.variants.forEach((v) => weights.add(v.weight)));
    return Array.from(weights);
  }, []);

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesQuery =
        !query.trim() ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase());
      const matchesWeight = weight === "all" || p.variants.some((v) => v.weight === weight);
      const matchesPrice = getLowestPrice(p) <= maxPrice;
      return matchesCategory && matchesQuery && matchesWeight && matchesPrice;
    });

    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
    if (sort === "price-desc") list.sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
    if (sort === "newest") list.sort((a, b) => (a.badge === "New" ? -1 : b.badge === "New" ? 1 : 0));

    return list;
  }, [category, query, weight, maxPrice, sort]);

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside aria-label="Filters" className="space-y-8">
        <div>
          <label htmlFor="shop-search" className="mb-2 block text-sm font-semibold text-[var(--color-brown-900)]">
            Search
          </label>
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-xl border border-[var(--color-beige-dark)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-green-700)]"
          />
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-[var(--color-brown-900)]">Category</legend>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
              <input type="radio" name="category" checked={category === "all"} onChange={() => setCategory("all")} />
              All Categories
            </label>
            {categories.map((c) => (
              <label key={c.slug} className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
                <input
                  type="radio"
                  name="category"
                  checked={category === c.slug}
                  onChange={() => setCategory(c.slug)}
                />
                {c.name}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-[var(--color-brown-900)]">Weight</legend>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
              <input type="radio" name="weight" checked={weight === "all"} onChange={() => setWeight("all")} />
              All Weights
            </label>
            {allWeights.map((w) => (
              <label key={w} className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
                <input type="radio" name="weight" checked={weight === w} onChange={() => setWeight(w)} />
                {w}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="price-range" className="mb-2 block text-sm font-semibold text-[var(--color-brown-900)]">
            Max price: ₹{maxPrice.toLocaleString("en-IN")}
          </label>
          <input
            id="price-range"
            type="range"
            min={100}
            max={10000}
            step={100}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[var(--color-green-700)]"
          />
        </div>
      </aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[var(--color-ink-soft)]">{filtered.length} products</p>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-[var(--color-ink-soft)]">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-xl border border-[var(--color-beige-dark)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-green-700)]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </label>
        </div>
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
