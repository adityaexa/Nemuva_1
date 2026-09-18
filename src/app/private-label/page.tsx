import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PrivateLabelForm } from "@/components/shared/PrivateLabelForm";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import { FAQAccordion } from "@/components/shared/FAQAccordion";

export const metadata: Metadata = {
  title: "Private Label Makhana Manufacturing",
  description:
    "Explore private-label and contract manufacturing support for Makhana with Nemuva — sourcing, flavour options, packaging and labelling support for your own brand.",
  alternates: { canonical: "/private-label" },
};

const offerings = [
  { title: "Product Sourcing", description: "Access to Bihar-sourced Makhana across available grades." },
  { title: "Flavour Options", description: "Discuss existing flavour profiles or explore custom development." },
  { title: "Packaging Support", description: "Guidance on suitable packaging formats for your product." },
  { title: "Label Support", description: "Support in adapting packaging for your brand's labelling needs." },
  { title: "Bulk Production", description: "Production planned around your order volume and timelines." },
  { title: "Brand-Ready Solutions", description: "A path from raw sourcing to a shelf-ready private-label product." },
];

const steps = [
  { number: "01", title: "Enquiry", description: "Share your brand, product idea and estimated volume with us." },
  { number: "02", title: "Consultation", description: "We discuss grading, flavour and packaging options that fit your goals." },
  { number: "03", title: "Sampling", description: "Where feasible, samples are arranged so you can evaluate quality." },
  { number: "04", title: "Production & Delivery", description: "Once confirmed, production and dispatch are planned around your timeline." },
];

const privateLabelFaqs = [
  {
    question: "Is there a minimum order quantity for private label?",
    answer:
      "Minimum quantities depend on the product, flavour and packaging you choose. Share your estimated volume in the enquiry form and our team will confirm what's feasible.",
  },
  {
    question: "Can I request a custom flavour?",
    answer:
      "We can discuss custom flavour development depending on feasibility and order volume. Let us know your requirement in the form.",
  },
  {
    question: "Do you provide packaging design?",
    answer:
      "We can support packaging and labelling adaptation for your brand. Full design services may depend on scope — this will be discussed during consultation.",
  },
  {
    question: "How long does private-label production take?",
    answer:
      "Timelines vary by order size, flavour and packaging complexity. Our team will share an estimated timeline once your requirement is confirmed.",
  },
];

export default function PrivateLabelPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Private Label", href: "/private-label" }]} />

      <section className="container-nemuva grid items-center gap-10 pb-14 lg:grid-cols-2">
        <div>
          <p className="tag-pill bg-[var(--color-green-50)] text-[var(--color-green-700)]">Private Label</p>
          <h1 className="mt-4 text-4xl leading-tight text-[var(--color-brown-900)] sm:text-5xl">
            Build Your Own Makhana Brand
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-[var(--color-ink-soft)] sm:text-base">
            Nemuva can potentially support private-label and contract manufacturing requirements for brands
            looking to bring Makhana into their own product line — depending on your specific requirements
            and order volume.
          </p>
          <a href="#private-label-inquiry" className="btn-primary mt-7 inline-flex">
            Discuss Private Label
          </a>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/private-label-packaging.jpg"
            alt="Neutral Makhana pouches ready for private-label branding"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 45vw, 90vw"
          />
        </div>
      </section>

      <section className="section-pad bg-[var(--color-cream-dark)]/40">
        <div className="container-nemuva">
          <SectionHeading eyebrow="What We Offer" title="Support Across Your Product Journey" align="center" className="mx-auto" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((offer) => (
              <div key={offer.title} className="card-surface p-6">
                <h3 className="font-semibold text-[var(--color-brown-900)]">{offer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-nemuva">
          <SectionHeading eyebrow="Process" title="How Private Label Works With Nemuva" align="center" className="mx-auto" />
          <div className="mt-10">
            <ProcessTimeline steps={steps} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--color-cream-dark)]/40">
        <div className="container-nemuva max-w-2xl" id="private-label-inquiry">
          <SectionHeading eyebrow="Start a Conversation" title="Tell Us About Your Brand" align="center" className="mx-auto" />
          <div className="mt-8">
            <PrivateLabelForm />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-nemuva max-w-3xl">
          <SectionHeading eyebrow="Common Questions" title="Private Label FAQ" />
          <div className="mt-8">
            <FAQAccordion items={privateLabelFaqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
