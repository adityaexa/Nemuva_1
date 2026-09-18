import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogPosts, getBlogPostBySlug } from "@/data/blog";
import { getProductBySlug } from "@/data/products";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { formatDate } from "@/lib/utils";
import { JsonLd } from "@/components/shared/JsonLd";
import { articleSchema } from "@/lib/schema";
import { ProductGrid } from "@/components/product/ProductGrid";

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedProducts = (post.relatedProductSlugs ?? [])
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <article>
      <JsonLd data={articleSchema(post)} />
      <Breadcrumbs items={[{ name: "Journal", href: "/journal" }, { name: post.title, href: `/journal/${post.slug}` }]} />

      <div className="container-nemuva max-w-3xl pb-20">
        <p className="tag-pill bg-[var(--color-green-50)] text-[var(--color-green-700)]">{post.category}</p>
        <h1 className="mt-4 text-3xl leading-tight text-[var(--color-brown-900)] sm:text-4xl">{post.title}</h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-[var(--color-ink-soft)]">
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image src={post.image} alt={post.title} fill priority className="object-cover" sizes="(min-width: 1024px) 768px, 100vw" />
        </div>

        <div className="prose-nemuva mt-8 space-y-5 text-[0.98rem] leading-relaxed text-[var(--color-ink)]">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/journal" className="btn-secondary">
            ← Back to Journal
          </Link>
          <Link href="/makhana-guide" className="btn-secondary">
            Explore the Makhana Guide
          </Link>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="container-nemuva pb-20">
          <h2 className="mb-6 text-2xl text-[var(--color-brown-900)]">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </article>
  );
}
