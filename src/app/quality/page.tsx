import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";

export const metadata: Metadata = {
  title: "Our Quality Promise",
  description: "How Nemuva approaches sourcing, selection, processing, storage, packaging and quality checks for its Makhana products.",
  alternates: { canonical: "/quality" },
};

const steps = [
  { number: "01", title: "Sourcing", description: "Working with Bihar's established Makhana-growing regions." },
  { number: "02", title: "Selection", description: "Choosing batches based on size, moisture and visual quality." },
  { number: "03", title: "Processing", description: "Cleaning, roasting/popping and, where applicable, seasoning." },
  { number: "04", title: "Storage", description: "Storing in conditions designed to protect freshness before packing." },
  { number: "05", title: "Packaging", description: "Sealing in food-safe materials suited to each product format." },
  { number: "06", title: "Quality Checks", description: "Checking batches at multiple stages before they reach you." },
];

export default function QualityPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Quality", href: "/quality" }]} />

      <section className="container-nemuva grid items-center gap-10 pb-14 lg:grid-cols-2">
        <div>
          <p className="tag-pill bg-[var(--color-green-50)] text-[var(--color-green-700)]">Quality Promise</p>
          <h1 className="mt-4 text-4xl leading-tight text-[var(--color-brown-900)] sm:text-5xl">
            Quality, Explained Honestly
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-[var(--color-ink-soft)] sm:text-base">
            We&apos;d rather explain what we actually do than make claims we can&apos;t back up. Here&apos;s a transparent
            look at how quality is approached across our process.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src="/images/makhana-grading.jpg" alt="Makhana being visually graded for size and quality" fill priority className="object-cover" sizes="(min-width: 1024px) 45vw, 90vw" />
        </div>
      </section>

      <section className="section-pad bg-[var(--color-cream-dark)]/40">
        <div className="container-nemuva">
          <SectionHeading eyebrow="Our Process" title="From Sourcing to Your Shelf" align="center" className="mx-auto" />
          <div className="mt-10">
            <ProcessTimeline steps={steps} />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-nemuva max-w-3xl">
          <SectionHeading eyebrow="Transparency" title="Certifications" />
          <div className="mt-6 card-surface border-dashed p-6">
            <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
              Nemuva does not currently list specific food safety or quality certifications on this page.
              This section is reserved for certification details (e.g. FSSAI licence number, or other
              applicable certifications) once they are formally obtained and can be verified. We chose not
              to display placeholder certification claims to avoid misrepresenting our current status.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
