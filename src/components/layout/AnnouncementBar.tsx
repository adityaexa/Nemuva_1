import { siteConfig } from "@/config/siteConfig";

export function AnnouncementBar() {
  return (
    <div
      className="w-full py-2 text-center text-xs font-medium tracking-wide sm:text-sm"
      style={{ backgroundColor: "var(--color-green-900)", color: "var(--color-cream)" }}
    >
      <p className="container-nemuva truncate">{siteConfig.announcementBar}</p>
    </div>
  );
}
