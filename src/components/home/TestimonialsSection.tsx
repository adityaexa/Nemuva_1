import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ReviewCard } from "@/components/shared/ReviewCard";

export function TestimonialsSection() {
  return (
    <section className="section-pad">
      <div className="container-nemuva">
        <SectionHeading eyebrow="Customer Voices" title="What People Are Saying" align="center" className="mx-auto" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
