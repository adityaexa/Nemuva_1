import { SectionHeading } from "@/components/shared/SectionHeading";

const qualities = [
  { title: "Freshness", description: "Packed to protect against moisture, so the crunch you expect is the crunch you get." },
  { title: "Purity", description: "No unnecessary additives — just Makhana, and clearly listed seasonings where used." },
  { title: "Texture", description: "Selected and processed with attention to the light, airy bite Makhana is known for." },
  { title: "Careful Handling", description: "Handled with care across sourcing, sorting and packing to minimise breakage." },
  { title: "Food-Safe Packaging", description: "Packed in materials chosen to keep your Makhana safe from farm to table." },
];

export function QualitySection() {
  return (
    <section className="section-pad">
      <div className="container-nemuva">
        <SectionHeading
          eyebrow="Our Promise"
          title="Quality You Can Feel in Every Crunch"
          description="Quality, to us, isn't a slogan — it's a set of checks we try to apply consistently, batch after batch."
          align="center"
          className="mx-auto"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {qualities.map((quality) => (
            <div key={quality.title} className="card-surface p-5 text-center">
              <h3 className="font-semibold text-[var(--color-brown-900)]">{quality.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{quality.description}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-[var(--color-ink-soft)]">
          Certifications and lab-tested claims will be published here once formally completed and verified —
          see our{" "}
          <a href="/quality" className="underline text-[var(--color-green-700)]">
            Quality page
          </a>{" "}
          for details.
        </p>
      </div>
    </section>
  );
}
