import { SectionHeading } from "@/components/shared/SectionHeading";

const reasons = [
  {
    title: "Farm-Rooted Sourcing",
    description: "We work with Bihar's traditional Makhana-growing ecosystem rather than around it.",
  },
  {
    title: "Carefully Selected",
    description: "Every batch is sorted and checked before it makes its way into a Nemuva pack.",
  },
  {
    title: "Freshness Focused",
    description: "Packed with attention to moisture and sealing, so crunch holds up on your shelf.",
  },
  {
    title: "Quality Checked",
    description: "Batch-level checks at each stage — from raw sourcing to final packing.",
  },
  {
    title: "Honest Pricing",
    description: "Straightforward pricing across retail and bulk, without inflated MRPs.",
  },
  {
    title: "Made for Everyday Snacking",
    description: "Designed to fit real routines — office desks, family shelves and travel bags alike.",
  },
];

export function WhyNemuva() {
  return (
    <section className="section-pad">
      <div className="container-nemuva">
        <SectionHeading eyebrow="Why Nemuva" title="Why Choose Nemuva?" align="center" className="mx-auto" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div key={reason.title} className="card-surface p-6">
              <span className="font-accent text-2xl text-[var(--color-gold-500)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-[var(--color-brown-900)]">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
