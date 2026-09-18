import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-2xl"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      <div className="relative p-4 text-white">
        <h3 className="font-semibold">{category.name}</h3>
        <span className="text-xs text-white/80">Shop now →</span>
      </div>
    </Link>
  );
}
