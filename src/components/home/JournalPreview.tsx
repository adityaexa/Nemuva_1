import Link from "next/link";
import { getAllBlogPosts } from "@/data/blog";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { BlogCard } from "@/components/shared/BlogCard";

export function JournalPreview() {
  const posts = getAllBlogPosts().slice(0, 4);

  return (
    <section className="section-pad bg-[var(--color-cream-dark)]/40">
      <div className="container-nemuva">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Nemuva Journal" title="Makhana Education & Stories" />
          <Link href="/journal" className="btn-secondary">
            Visit the Journal
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
