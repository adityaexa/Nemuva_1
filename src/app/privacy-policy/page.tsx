import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Nemuva's privacy policy covering how we collect, use and protect your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />
      <div className="container-nemuva max-w-3xl pb-20">
        <h1 className="text-3xl text-[var(--color-brown-900)] sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-xs text-[var(--color-ink-soft)]">Last updated: PLACEHOLDER DATE</p>

        <div className="mt-6 card-surface border-dashed p-5 text-xs leading-relaxed text-[var(--color-ink-soft)]">
          <strong className="text-[var(--color-brown-900)]">Note to the business owner:</strong> this is a
          generic policy structure, not legal advice. Please have it reviewed by a qualified professional
          and adapted to {siteConfig.legalName}&apos;s actual data practices and applicable law (e.g. India&apos;s DPDP
          Act) before publishing.
        </div>

        <div className="prose-nemuva mt-8 space-y-6 text-sm leading-relaxed text-[var(--color-ink)]">
          <section>
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">1. Information We Collect</h2>
            <p className="mt-2 text-[var(--color-ink-soft)]">
              We may collect information you provide directly (such as your name, email, phone number and
              address when placing an order, submitting an enquiry, or subscribing to our newsletter), and
              limited technical information (such as browser type and usage data) to help operate this
              website.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">2. How We Use Information</h2>
            <p className="mt-2 text-[var(--color-ink-soft)]">
              Information is used to process orders and enquiries, respond to your messages, improve our
              products and website, and — where you&apos;ve opted in — send marketing communications such as our
              newsletter.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">3. Cookies & Analytics</h2>
            <p className="mt-2 text-[var(--color-ink-soft)]">
              This site may use cookies and analytics tools (such as Google Analytics) once configured, to
              understand how visitors use the site. You can control cookies through your browser settings.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">4. Sharing of Information</h2>
            <p className="mt-2 text-[var(--color-ink-soft)]">
              We do not sell your personal information. We may share information with service providers
              (such as payment processors, shipping partners or email providers) strictly to operate our
              business, once such integrations are live.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">5. Your Choices</h2>
            <p className="mt-2 text-[var(--color-ink-soft)]">
              You may request access to, correction of, or deletion of your personal information by
              contacting us via our{" "}
              <a href="/contact" className="underline text-[var(--color-green-700)]">Contact page</a>.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-[var(--color-brown-900)]">6. Contact</h2>
            <p className="mt-2 text-[var(--color-ink-soft)]">
              For privacy-related questions, email us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="underline text-[var(--color-green-700)]">
                {siteConfig.contact.email}
              </a>{" "}
              (placeholder — update with your verified contact).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
