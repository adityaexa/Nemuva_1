import Link from "next/link";

// An original, code-drawn wordmark — no external logo asset. Swap this for
// an <Image> pointing at /public/images/nemuva-logo.svg once professional
// brand artwork is ready; keep the same href/aria-label contract.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Nemuva — home"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="20" cy="20" r="19" stroke="var(--color-green-700)" strokeWidth="1.5" />
        <path
          d="M12 27V13.5L20 24.5L28 13.5V27"
          stroke="var(--color-green-700)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="20" cy="12" r="2.1" fill="var(--color-gold-500)" />
      </svg>
      <span className="font-display text-2xl leading-none tracking-tight text-brown-900" style={{ color: "var(--color-brown-900)" }}>
        Nemuva
      </span>
    </Link>
  );
}
