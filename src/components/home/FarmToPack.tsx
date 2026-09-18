import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";

const steps = [
  { number: "01", title: "Sourcing", description: "Working with Bihar's Makhana-growing regions and their traditional pond ecosystem." },
  { number: "02", title: "Selection", description: "Seeds and popped Makhana are selected with size and quality in mind." },
  { number: "03", title: "Cleaning", description: "Cleaned to remove husk, dust and impurities before further processing." },
  { number: "04", title: "Grading", description: "Sorted into size grades so each product listing is consistent." },
  { number: "05", title: "Roasting / Processing", description: "Roasted or seasoned in small batches, depending on the product." },
  { number: "06", title: "Packaging", description: "Sealed in food-safe packaging designed to protect freshness." },
  { number: "07", title: "Delivery", description: "Dispatched to your doorstep or your business, pan-India." },
];

export function FarmToPack() {
  return (
    <section className="section-pad bg-[var(--color-cream-dark)]/40">
      <div className="container-nemuva">
        <SectionHeading eyebrow="From Farm to Pack" title="How Your Makhana Reaches You" align="center" className="mx-auto" />
        <div className="mt-10">
          <ProcessTimeline steps={steps} />
        </div>
      </div>
    </section>
  );
}
