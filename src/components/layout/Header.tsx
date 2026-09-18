"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/siteConfig";
import { Logo } from "@/components/shared/Logo";
import { SearchIcon, UserIcon, BagIcon, MenuIcon, CloseIcon } from "@/components/shared/icons";
import { useCart } from "@/lib/cart-context";
import { track } from "@/lib/analytics";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { itemCount, openCart } = useCart();
  const router = useRouter();

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    track("search", { query });
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-beige-dark)] bg-[var(--color-cream)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-cream)]/85">
      <div className="container-nemuva flex h-[4.5rem] items-center justify-between gap-4 py-3">
        <button
          className="inline-flex items-center justify-center rounded-full p-2 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <Logo />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.93rem] font-medium text-[var(--color-ink-soft)]">
            {siteConfig.nav.primary.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-[var(--color-green-700)]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="hidden rounded-full p-2 hover:bg-[var(--color-beige)] sm:inline-flex"
          >
            <SearchIcon />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden rounded-full p-2 hover:bg-[var(--color-beige)] sm:inline-flex"
          >
            <UserIcon />
          </Link>
          <button
            aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            onClick={openCart}
            className="relative rounded-full p-2 hover:bg-[var(--color-beige)]"
          >
            <BagIcon />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-[var(--color-green-700)] px-1 text-[0.65rem] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
          <Link href="/shop" className="btn-primary ml-1 hidden lg:inline-flex">
            Buy Makhana
          </Link>
          <Link href="/bulk-makhana" className="btn-secondary hidden lg:inline-flex">
            Get Bulk Pricing
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-[var(--color-beige-dark)] bg-[var(--color-cream)]">
          <form onSubmit={handleSearchSubmit} className="container-nemuva flex items-center gap-3 py-3">
            <SearchIcon className="text-[var(--color-ink-soft)]" />
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Makhana, flavours, packs…"
              className="w-full bg-transparent py-1 text-sm outline-none placeholder:text-[var(--color-ink-soft)]"
              autoFocus
            />
            <button type="submit" className="btn-secondary !py-1.5 !px-4 text-sm">
              Search
            </button>
          </form>
        </div>
      )}

      {mobileOpen && (
        <div className="border-t border-[var(--color-beige-dark)] bg-[var(--color-cream)] md:hidden">
          <nav aria-label="Mobile" className="container-nemuva flex flex-col py-2">
            {siteConfig.nav.primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-[var(--color-beige)] py-3 text-[0.98rem] font-medium text-[var(--color-ink)] last:border-none"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 py-4">
              <Link href="/shop" className="btn-primary flex-1" onClick={() => setMobileOpen(false)}>
                Buy Makhana
              </Link>
              <Link href="/bulk-makhana" className="btn-secondary flex-1" onClick={() => setMobileOpen(false)}>
                Bulk Pricing
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
