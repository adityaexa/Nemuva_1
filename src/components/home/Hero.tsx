import Image from "next/image";
import Link from "next/link";
import { TrustBadge } from "@/components/shared/TrustBadge";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-cream)]">
      <div className="container-nemuva grid items-center gap-10 pb-14 pt-10 md:grid-cols-2 md:gap-12 md:pb-20 md:pt-16">
        <div className="animate-fade-up">
          <p className="tag-pill bg-[var(--color-green-50)] text-[var(--color-green-700)]">
            Straight from Bihar&apos;s Makhana belt
          </p>
          <h1 className="mt-4 text-4xl leading-[1.1] text-[var(--color-brown-900)] sm:text-5xl lg:text-[3.4rem]">
            From Bihar&apos;s Waters to Your Table
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--color-ink-soft)] sm:text-lg">
            Discover naturally sourced Makhana from Bihar, carefully selected for freshness, crunch and
            everyday goodness — for your kitchen, and for your business.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn-primary">
              Shop Makhana
            </Link>
            <Link href="/bulk-makhana" className="btn-secondary">
              Buy in Bulk
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            <TrustBadge
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 3 3 8l9 5 9-5-9-5Z" strokeLinejoin="round" />
                  <path d="M3 16l9 5 9-5M3 12l9 5 9-5" strokeLinejoin="round" />
                </svg>
              }
              label="Farm sourced"
            />
            <TrustBadge
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              label="Quality checked"
            />
            <TrustBadge
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" strokeLinejoin="round" />
                  <circle cx="7.5" cy="18.5" r="1.5" />
                  <circle cx="17.5" cy="18.5" r="1.5" />
                </svg>
              }
              label="Pan-India delivery"
            />
          </div>
        </div>
        <div className="relative animate-fade-in">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-[var(--color-brown-900)]/10 sm:aspect-[5/4] md:aspect-[4/5]">
            <Image
              src="/images/hero-makhana.jpg"
              alt="A ceramic bowl of freshly roasted Makhana set on a warm wooden table"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden w-44 rounded-2xl border border-[var(--color-beige-dark)] bg-white p-4 shadow-xl sm:block">
            <p className="font-accent text-3xl text-[var(--color-green-700)]">100%</p>
            <p className="text-xs text-[var(--color-ink-soft)]">Naturally sourced from Bihar, batch checked before packing</p>
          </div>
        </div>
      </div>
    </section>
  );
}
