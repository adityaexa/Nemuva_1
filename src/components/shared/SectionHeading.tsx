interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className="tag-pill mb-3 bg-[var(--color-green-50)] text-[var(--color-green-700)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl leading-tight text-[var(--color-brown-900)] sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-[var(--color-ink-soft)]">{description}</p>
      )}
    </div>
  );
}
