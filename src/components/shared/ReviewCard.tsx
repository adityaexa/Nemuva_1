import { Testimonial } from "@/types";
import { StarIcon } from "@/components/shared/icons";

export function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <figure className="card-surface flex h-full flex-col justify-between p-6">
      <div>
        <div className="mb-3 flex gap-0.5 text-[var(--color-gold-500)]" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className={i < review.rating ? "opacity-100" : "opacity-25"} />
          ))}
        </div>
        <blockquote>
          <p className="text-[0.95rem] leading-relaxed text-[var(--color-ink)]">“{review.quote}”</p>
        </blockquote>
      </div>
      <figcaption className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--color-brown-900)]">{review.name}</p>
          <p className="text-xs text-[var(--color-ink-soft)]">{review.location}</p>
        </div>
        {review.isPlaceholder && (
          <span className="tag-pill bg-[var(--color-beige)] text-[var(--color-ink-soft)]">Sample</span>
        )}
      </figcaption>
    </figure>
  );
}
