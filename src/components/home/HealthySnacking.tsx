import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";

const moments = [
  { title: "Everyday Snacking", description: "A light, crunchy option to keep within reach through the day." },
  { title: "Office Snacking", description: "Easy to portion and keep at your desk for a mid-day break." },
  { title: "Family Snacking", description: "A shared bowl that works for most ages and most evenings." },
  { title: "Travel", description: "Resealable packs that hold up well in a bag or backpack." },
  { title: "Roasting at Home", description: "Raw Makhana gives you full control over seasoning and style." },
  { title: "Recipes", description: "From kheer to chaat, Makhana adapts to both sweet and savoury dishes." },
];

export function HealthySnacking() {
  return (
    <section className="section-pad bg-[var(--color-cream-dark)]/40">
      <div className="container-nemuva grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl lg:order-1">
          <Image
            src="/images/family-snacking.jpg"
            alt="A family sharing a bowl of roasted Makhana at home"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 45vw, 90vw"
          />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow="Everyday Moments" title="Makhana for Every Part of Your Day" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {moments.map((moment) => (
              <div key={moment.title}>
                <h3 className="font-semibold text-[var(--color-brown-900)]">{moment.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-soft)]">{moment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
