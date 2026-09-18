import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/shared/ContactForm";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { siteConfig } from "@/config/siteConfig";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Nemuva for product questions, bulk orders, private-label enquiries or general support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <div>
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
      <div className="container-nemuva pb-20">
        <SectionHeading eyebrow="Get In Touch" title="Contact Nemuva" description="We'd love to hear from you — for orders, business enquiries, or just to say hello." />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="card-surface p-6">
              <h2 className="font-semibold text-[var(--color-brown-900)]">Phone</h2>
              <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{contact.phoneDisplay}</p>
              <p className="mt-1 text-xs text-[var(--color-ink-soft)]/70">(Placeholder — to be finalised)</p>
            </div>
            <div className="card-surface p-6">
              <h2 className="font-semibold text-[var(--color-brown-900)]">Email</h2>
              <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                <a href={`mailto:${contact.email}`} className="underline">{contact.email}</a>
              </p>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                Business: <a href={`mailto:${contact.b2bEmail}`} className="underline">{contact.b2bEmail}</a>
              </p>
            </div>
            <div className="card-surface p-6">
              <h2 className="font-semibold text-[var(--color-brown-900)]">WhatsApp</h2>
              <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                Chat with us directly for quick questions.
              </p>
              <WhatsAppButton variant="inline" className="mt-3" />
              {!siteConfig.contact.whatsappNumber && (
                <p className="mt-2 text-xs text-[var(--color-ink-soft)]/70">
                  (WhatsApp number not yet configured — see siteConfig.ts)
                </p>
              )}
            </div>
            <div className="card-surface p-6">
              <h2 className="font-semibold text-[var(--color-brown-900)]">Location & Hours</h2>
              <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                {contact.address.line1}, {contact.address.line2}
                <br />
                {contact.address.city}, {contact.address.state} — {contact.address.pincode}, {contact.address.country}
              </p>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{contact.businessHours}</p>
              <p className="mt-1 text-xs text-[var(--color-ink-soft)]/70">(Placeholder — to be finalised)</p>
            </div>
            <div className="card-surface p-6">
              <h2 className="font-semibold text-[var(--color-brown-900)]">Business Enquiries</h2>
              <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                For bulk/wholesale or private-label requirements, use our dedicated forms for faster routing:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href="/bulk-makhana#bulk-inquiry" className="btn-secondary !py-2 text-sm">
                  Bulk Enquiry
                </Link>
                <Link href="/private-label#private-label-inquiry" className="btn-secondary !py-2 text-sm">
                  Private Label Enquiry
                </Link>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
