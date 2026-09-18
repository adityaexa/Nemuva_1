import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { getAllBlogPosts } from "@/data/blog";
import { BlogCard } from "@/components/shared/BlogCard";

export const metadata: Metadata = {
  title: "Journal — Makhana Stories & Education",
  description:
    "Read Nemuva's Journal for Makhana education, farming stories, storage tips, and simple recipes rooted in Bihar's Makhana tradition.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const posts = getAllBlogPosts();

  return (
    <div>
      <Breadcrumbs items={[{ name: "Journal", href: "/journal" }]} />
      <div className="container-nemuva pb-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl leading-tight text-[var(--color-brown-900)] sm:text-5xl">The Nemuva Journal</h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)] sm:text-base">
            Stories, education and simple ideas — from Bihar&apos;s ponds to your kitchen.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
