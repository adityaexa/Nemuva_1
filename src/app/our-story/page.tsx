import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about Nemuva's roots in Bihar, our approach to sourcing Makhana, our quality philosophy, and our vision for the future.",
  alternates: { canonical: "/our-story" },
};

const futureCategories = ["Rice", "Aloe Vera", "Tulsi", "Sahjan (Moringa)"];

export default function OurStoryPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Our Story", href: "/our-story" }]} />

      <section className="container-nemuva grid items-center gap-10 pb-14 lg:grid-cols-2">
        <div>
          <p className="tag-pill bg-[var(--color-green-50)] text-[var(--color-green-700)]">Our Story</p>
          <h1 className="mt-4 text-4xl leading-tight text-[var(--color-brown-900)] sm:text-5xl">
            A Bihar Story, Told Through Makhana
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-[var(--color-ink-soft)] sm:text-base">
            Nemuva began with a simple observation: Makhana, a food deeply tied to Bihar&apos;s ponds, farmers
            and traditions, deserved a brand that treated it with the same care it takes to grow.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/bihar-landscape.jpg"
            alt="A Bihar wetland landscape where Makhana is traditionally cultivated"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 45vw, 90vw"
          />
        </div>
      </section>

      <section className="section-pad bg-[var(--color-cream-dark)]/40">
        <div className="container-nemuva grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative order-2 aspect-square overflow-hidden rounded-2xl lg:order-1">
            <Image src="/images/makhana-pond.jpg" alt="A traditional Makhana cultivation pond" fill className="object-cover" sizes="(min-width: 1024px) 45vw, 90vw" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="Why Bihar" title="Why We Start With Bihar" />
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              Bihar, and the Mithila region in particular, is home to one of India&apos;s most significant
              Makhana-growing traditions. Its network of ponds and wetlands, paired with generations of
              specialised farming knowledge, makes it a natural starting point for a Makhana brand that
              wants to stay close to its source.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              Rather than treating this as a supply chain to optimise from a distance, we try to stay close
              to how Makhana is actually grown, harvested and processed in the region.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-nemuva grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Heritage" title="Makhana's Place in Mithila Heritage" />
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              Makhana is more than an ingredient in Bihar — it&apos;s woven into festivals, family kitchens and
              local livelihoods across the Mithila region. Farming families have passed down cultivation and
              processing knowledge across generations, adapting it carefully over time.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              We see our role as building a bridge between this heritage and a wider audience — in a way
              that respects where the food comes from.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/images/farmer-harvest.jpg" alt="Traditional Makhana harvesting in progress" fill className="object-cover" sizes="(min-width: 1024px) 45vw, 90vw" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--color-green-900)] text-[var(--color-cream)]">
        <div className="container-nemuva grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="tag-pill bg-white/10 text-[var(--color-gold-300)]">Farmer Ecosystem</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">Working With, Not Around</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-cream-dark)]/85">
              Nemuva sources through the existing farming and processing ecosystem of Bihar&apos;s Makhana belt,
              aiming to build fair, long-term relationships rather than one-off transactions. As we grow,
              we intend to be transparent about how this ecosystem shapes our sourcing.
            </p>
          </div>
          <div>
            <p className="tag-pill bg-white/10 text-[var(--color-gold-300)]">Quality Philosophy</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">Quality as a Habit</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-cream-dark)]/85">
              Our quality philosophy is simple: check consistently, describe honestly, and avoid claims we
              can&apos;t yet back up with certification. See our{" "}
              <Link href="/quality" className="underline text-[var(--color-gold-300)]">
                Quality page
              </Link>{" "}
              for more detail.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-nemuva max-w-3xl text-center">
          <SectionHeading eyebrow="Looking Ahead" title="Our Vision" align="center" className="mx-auto" />
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-soft)]">
            Makhana is, and will remain, Nemuva&apos;s primary focus today. Looking further ahead, we see room to
            bring the same sourcing-first approach to other traditional, Bihar-linked foods — while making
            sure Makhana continues to get our full attention as our core product.
          </p>
          <div className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-2">
            {futureCategories.map((cat) => (
              <span key={cat} className="tag-pill bg-[var(--color-beige)] text-[var(--color-brown-700)]">
                Future: {cat}
              </span>
            ))}
          </div>
          <Link href="/shop" className="btn-primary mt-8 inline-flex">
            Shop Makhana Today
          </Link>
        </div>
      </section>
    </div>
  );
}
