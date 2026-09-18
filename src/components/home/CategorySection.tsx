import { categories } from "@/data/categories";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CategoryCard } from "@/components/home/CategoryCard";

export function CategorySection() {
  return (
    <section className="section-pad">
      <div className="container-nemuva">
        <SectionHeading eyebrow="Our Range" title="Explore Nemuva Makhana" align="center" className="mx-auto" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
