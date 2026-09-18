import { Newsletter } from "@/components/shared/Newsletter";

export function NewsletterSection() {
  return (
    <section className="section-pad">
      <div className="container-nemuva">
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-[var(--color-beige-dark)] bg-white px-6 py-12 text-center sm:px-12">
          <h2 className="font-display text-3xl text-[var(--color-brown-900)] sm:text-4xl">
            Stay Connected With Nemuva
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-[var(--color-ink-soft)]">
            Get new product updates, Makhana stories, recipes and special offers — straight to your inbox.
          </p>
          <Newsletter />
        </div>
      </div>
    </section>
  );
}
