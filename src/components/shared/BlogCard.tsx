import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="card-surface group overflow-hidden transition-shadow hover:shadow-lg hover:shadow-black/5">
      <Link href={`/journal/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
        <div className="p-5">
          <p className="tag-pill bg-[var(--color-green-50)] text-[var(--color-green-700)]">{post.category}</p>
          <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-[var(--color-brown-900)] group-hover:text-[var(--color-green-700)]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-ink-soft)]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="font-semibold text-[var(--color-green-700)]">Read More →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
