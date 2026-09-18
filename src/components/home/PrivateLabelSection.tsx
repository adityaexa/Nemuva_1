import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";

const services = [
  "Product sourcing",
  "Flavour options",
  "Packaging support",
  "Labelling support",
  "Bulk supply",
  "Brand-ready solutions",
];

export function PrivateLabelSection() {
  return (
    <section className="section-pad bg-[var(--color-green-50)]">
      <div className="container-nemuva grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl lg:order-1">
          <Image
            src="/images/private-label-packaging.jpg"
            alt="Neutral Makhana packaging ready for private-label branding"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 45vw, 90vw"
          />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow="Private Label" title="Build Your Own Makhana Brand" />
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
            Nemuva can potentially support private-label requirements for brands and businesses looking to
            add Makhana to their own product line — from sourcing through to packaging support, depending
            on your requirements and volume.
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-2.5">
            {services.map((service) => (
              <li key={service} className="flex gap-2 text-sm text-[var(--color-ink-soft)]">
                <span className="text-[var(--color-green-700)]" aria-hidden="true">✓</span>
                {service}
              </li>
            ))}
          </ul>
          <Link href="/private-label" className="btn-primary mt-7 inline-flex">
            Discuss Private Label
          </Link>
        </div>
      </div>
    </section>
  );
}
