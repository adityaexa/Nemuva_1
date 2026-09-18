import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/data/products";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductPurchasePanel } from "@/app/products/[slug]/ProductPurchasePanel";
import { JsonLd } from "@/components/shared/JsonLd";
import { productSchema } from "@/lib/schema";
import { getCategoryBySlug } from "@/data/categories";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const category = getCategoryBySlug(product.category);

  return (
    <div>
      <JsonLd data={productSchema(product)} />
      <Breadcrumbs
        items={[
          { name: "Shop", href: "/shop" },
          ...(category ? [{ name: category.name, href: `/shop?category=${category.slug}` }] : []),
          { name: product.name, href: `/products/${product.slug}` },
        ]}
      />

      <div className="container-nemuva grid gap-10 pb-16 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} productName={product.name} />
        <ProductPurchasePanel product={product} />
      </div>

      <div className="container-nemuva pb-16">
        <ProductTabs product={product} />
      </div>

      {related.length > 0 && (
        <div className="container-nemuva pb-20">
          <h2 className="mb-6 text-2xl text-[var(--color-brown-900)]">You May Also Like</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
