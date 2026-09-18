import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MakhanaGradeCard } from "@/components/shared/MakhanaGradeCard";
import { FAQAccordion } from "@/components/shared/FAQAccordion";

export const metadata: Metadata = {
  title: "Makhana Guide — What Is Makhana & How It's Grown",
  description:
    "A complete guide to Makhana: what it is, how it grows in Bihar, how it's harvested and processed, Suta grading, storage tips and snacking ideas.",
  alternates: { canonical: "/makhana-guide" },
};

const grades = [
  { grade: "4 Suta", title: "Everyday Grade", description: "A smaller, everyday-friendly size well suited to home cooking.", image: "/images/grade-4-suta.jpg" },
  { grade: "5 Suta", title: "Mid Grade", description: "A balanced mid-size grade used across retail and food-service.", image: "/images/grade-5-suta.jpg" },
  { grade: "6 Suta", title: "Premium Grade", description: "A larger, more visually consistent grade often used for gifting.", image: "/images/grade-6-suta.jpg" },
];

const guideFaqs = [
  { question: "What is Makhana made from?", answer: "Makhana is made from the seed of the Euryale ferox plant, an aquatic crop grown in ponds and wetlands, which is harvested and then popped/roasted." },
  { question: "Is Makhana the same as lotus seed?", answer: "Makhana is commonly referred to as 'fox nut' or 'lotus seed' in English, though it comes from the Euryale ferox plant rather than the true lotus (Nelumbo)." },
  { question: "How long does Makhana last?", answer: "When stored correctly in an airtight container in a cool, dry place, Makhana can stay fresh for several months — check individual product packaging for specific guidance." },
  { question: "Can Makhana be roasted at home?", answer: "Yes — raw Makhana can be dry roasted on low flame for a few minutes until crisp, then seasoned to taste." },
];

export default function MakhanaGuidePage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Makhana Guide", href: "/makhana-guide" }]} />

      <section className="container-nemuva pb-14">
        <div className="max-w-2xl">
          <p className="tag-pill bg-[var(--color-green-50)] text-[var(--color-green-700)]">Makhana Education</p>
          <h1 className="mt-4 text-4xl leading-tight text-[var(--color-brown-900)] sm:text-5xl">The Complete Makhana Guide</h1>
          <p className="mt-5 text-sm leading-relaxed text-[var(--color-ink-soft)] sm:text-base">
            Everything you need to know about Makhana — what it is, where it comes from, how it&apos;s graded,
            and how to store and enjoy it.
          </p>
        </div>
      </section>

      <section className="section-pad bg-[var(--color-cream-dark)]/40">
        <div className="container-nemuva grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="01 — Basics" title="What Is Makhana?" />
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              Makhana — also called fox nuts or lotus seeds — is the popped, dried seed of the Euryale ferox
              plant. It&apos;s a traditional ingredient in Indian cooking, prized for its light, crunchy texture
              and versatility across sweet and savoury dishes.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/images/raw-makhana-closeup.jpg" alt="Close-up of raw, unroasted Makhana seeds" fill className="object-cover" sizes="(min-width: 1024px) 45vw, 90vw" />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-nemuva grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl lg:order-1">
            <Image src="/images/makhana-pond.jpg" alt="Makhana growing in a traditional pond in Bihar" fill className="object-cover" sizes="(min-width: 1024px) 45vw, 90vw" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="02 — Origins" title="Where It Comes From & How It Grows" />
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              Makhana is cultivated in shallow ponds and wetlands, with Bihar&apos;s Mithila region being one of
              India&apos;s most significant growing areas. The plant follows a seasonal cycle tied to the
              region&apos;s monsoon and pond conditions.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--color-cream-dark)]/40">
        <div className="container-nemuva grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="03 — Harvest & Process" title="How It's Harvested and Processed" />
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              Harvesting is physically demanding, often done by hand in pond conditions to collect mature
              seeds. The seeds are then cleaned, roasted and popped using traditional methods that transform
              the hard seed into the light, popped Makhana we recognise, before being sorted and packed.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/images/makhana-processing.jpg" alt="Makhana being processed and sorted" fill className="object-cover" sizes="(min-width: 1024px) 45vw, 90vw" />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-nemuva">
          <SectionHeading eyebrow="04 — Grading" title="Understanding Suta Grading" align="center" className="mx-auto" />
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-[var(--color-ink-soft)]">
            &apos;Suta&apos; is a traditional trade term describing the size of popped Makhana. Grading conventions can
            vary by supplier, so always check the specific grade listed for a product.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {grades.map((grade) => (
              <MakhanaGradeCard key={grade.grade} {...grade} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--color-cream-dark)]/40">
        <div className="container-nemuva grid gap-8 lg:grid-cols-2">
          <div className="card-surface p-6">
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">05 — How to Select Quality Makhana</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              <li>• Look for consistent size and colour, with minimal broken pieces.</li>
              <li>• Good Makhana should feel light and dry, not damp or chewy.</li>
              <li>• Check for a clear pack date and storage guidance on the packaging.</li>
              <li>• Ask about the Suta grade if you need a specific size for your recipe.</li>
            </ul>
          </div>
          <div className="card-surface p-6">
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">06 — Storage Tips</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              <li>• Store in an airtight container in a cool, dry place.</li>
              <li>• Keep away from direct sunlight and humidity.</li>
              <li>• Reseal opened packs tightly after each use.</li>
              <li>• If raw Makhana softens over time, a quick dry roast restores crunch.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-nemuva">
          <SectionHeading eyebrow="07 — Cooking & Snacking" title="Simple Ways to Enjoy Makhana" align="center" className="mx-auto" />
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 text-sm text-[var(--color-ink-soft)] sm:grid-cols-2">
            <p className="rounded-xl bg-white p-4 shadow-sm">Dry roast with a little ghee and a pinch of salt for a simple snack.</p>
            <p className="rounded-xl bg-white p-4 shadow-sm">Simmer raw Makhana in milk with cardamom for a traditional kheer.</p>
            <p className="rounded-xl bg-white p-4 shadow-sm">Toss roasted Makhana with chaat masala for a quick evening bite.</p>
            <p className="rounded-xl bg-white p-4 shadow-sm">Combine with roasted nuts and seeds for an everyday trail mix.</p>
          </div>
          <div className="mt-8 text-center">
            <Link href="/journal/easy-makhana-snack-recipes" className="btn-secondary">
              See More Recipes on the Journal
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--color-cream-dark)]/40">
        <div className="container-nemuva max-w-3xl">
          <SectionHeading eyebrow="Common Questions" title="Makhana Guide FAQ" />
          <div className="mt-8">
            <FAQAccordion items={guideFaqs} />
          </div>
        </div>
      </section>

      <section className="section-pad text-center">
        <div className="container-nemuva">
          <h2 className="font-display text-2xl text-[var(--color-brown-900)] sm:text-3xl">Ready to try it for yourself?</h2>
          <Link href="/shop" className="btn-primary mt-6 inline-flex">
            Shop Nemuva Makhana
          </Link>
        </div>
      </section>
    </div>
  );
}
