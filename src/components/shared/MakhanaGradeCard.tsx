import Image from "next/image";

export function MakhanaGradeCard({
  grade,
  title,
  description,
  image,
}: {
  grade: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="card-surface overflow-hidden">
      <div className="relative aspect-[4/3] w-full">
        <Image src={image} alt={`${title} — visual size comparison`} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
        <span className="tag-pill absolute left-3 top-3 bg-white/90 text-[var(--color-brown-700)]">
          {grade}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-[var(--color-brown-900)]">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-soft)]">{description}</p>
      </div>
    </div>
  );
}
