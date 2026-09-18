import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";

const audiences = ["Importers", "Distributors", "Retailers", "International Food Businesses"];

export function ExportSection() {
  return (
    <section className="section-pad">
      <div className="container-nemuva grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading eyebrow="Global Sourcing" title="From Bihar to Global Tables" />
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
            We&apos;re building Nemuva to explore sourcing opportunities for international markets, working with
            the same Bihar-rooted supply chain that underpins our domestic business.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
            If you&apos;re an importer, distributor or retailer interested in Makhana from Bihar, we&apos;d welcome a
            conversation about your market&apos;s requirements.
          </p>
          <p className="mt-3 text-sm font-medium text-[var(--color-ink-soft)]">We&apos;re keen to hear from:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {audiences.map((a) => (
              <span key={a} className="tag-pill bg-[var(--color-beige)] text-[var(--color-brown-700)]">
                {a}
              </span>
            ))}
          </div>
          <Link href="/contact?type=export" className="btn-primary mt-7 inline-flex">
            Export Inquiry
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/export-packaging.jpg"
            alt="Export-ready cartons of packaged Makhana staged for shipping"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 45vw, 90vw"
          />
        </div>
      </div>
    </section>
  );
}
