import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MakhanaGradeCard } from "@/components/shared/MakhanaGradeCard";

const grades = [
  {
    grade: "4 Suta",
    title: "Everyday Grade",
    description: "A smaller, everyday-friendly size well suited to home cooking and daily roasting.",
    image: "/images/grade-4-suta.jpg",
  },
  {
    grade: "5 Suta",
    title: "Mid Grade",
    description: "A balanced mid-size grade, commonly used across both retail and food-service needs.",
    image: "/images/grade-5-suta.jpg",
  },
  {
    grade: "6 Suta",
    title: "Premium Grade",
    description: "A larger, more visually consistent grade often preferred for gifting and premium packs.",
    image: "/images/grade-6-suta.jpg",
  },
];

export function SizeGuide() {
  return (
    <section className="section-pad bg-[var(--color-cream-dark)]/40">
      <div className="container-nemuva">
        <SectionHeading
          eyebrow="Makhana Education"
          title="Understanding Makhana Sizing"
          description="Suta is a traditional trade term for Makhana size. Grading conventions can vary by supplier — here's a general sense of what the terms mean."
          align="center"
          className="mx-auto"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {grades.map((grade) => (
            <MakhanaGradeCard key={grade.grade} {...grade} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/makhana-guide" className="btn-secondary">
            Explore the Makhana Guide
          </Link>
        </div>
      </div>
    </section>
  );
}
