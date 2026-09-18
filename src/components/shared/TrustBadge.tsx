import { ReactNode } from "react";

export function TrustBadge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-ink-soft)]">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full"
        style={{ backgroundColor: "var(--color-green-50)", color: "var(--color-green-700)" }}
        aria-hidden="true"
      >
        {icon}
      </span>
      {label}
    </div>
  );
}
