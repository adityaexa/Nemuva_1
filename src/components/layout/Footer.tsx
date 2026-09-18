import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { Logo } from "@/components/shared/Logo";
import { Newsletter } from "@/components/shared/Newsletter";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[var(--color-brown-700)]">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-sm text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-green-700)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { socialLinks, contact } = siteConfig;
  const socials = [
    { name: "Instagram", href: socialLinks.instagram },
    { name: "Facebook", href: socialLinks.facebook },
    { name: "LinkedIn", href: socialLinks.linkedin },
    { name: "YouTube", href: socialLinks.youtube },
  ].filter((s) => Boolean(s.href));

  return (
    <footer style={{ backgroundColor: "var(--color-brown-900)" }} className="text-[var(--color-cream)]">
      <div className="container-nemuva py-14">
        <div className="mb-12 grid gap-10 rounded-2xl bg-[var(--color-green-900)]/40 p-6 md:grid-cols-[1.2fr_1fr] md:items-center md:p-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">Stay Connected With Nemuva</h2>
            <p className="mt-2 max-w-md text-sm text-[var(--color-cream-dark)]/80">
              Get new product updates, Makhana stories, recipes and special offers.
            </p>
          </div>
          <Newsletter variant="dark" />
        </div>

        <div className="grid grid-cols-2 gap-8 border-b border-white/10 pb-12 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-[var(--color-cream-dark)]/75">{siteConfig.description}</p>
          </div>
          <FooterColumn title="Shop" links={siteConfig.nav.footerShop} />
          <FooterColumn title="Business" links={siteConfig.nav.footerBusiness} />
          <FooterColumn title="Learn" links={siteConfig.nav.footerLearn} />
          <FooterColumn title="Support" links={siteConfig.nav.footerSupport} />
          <FooterColumn title="Legal" links={siteConfig.nav.footerLegal} />
        </div>

        <div className="flex flex-col gap-4 pt-8 text-sm text-[var(--color-cream-dark)]/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </p>
          <p className="text-xs">
            {contact.address.city}, {contact.address.state}, {contact.address.country} ·{" "}
            <a href={`mailto:${contact.email}`} className="underline decoration-white/30 underline-offset-2">
              {contact.email}
            </a>
          </p>
          {socials.length > 0 && (
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/30 underline-offset-2 hover:text-white"
                >
                  {s.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
