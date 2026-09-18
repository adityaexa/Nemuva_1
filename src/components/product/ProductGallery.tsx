"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[var(--color-beige)]">
        <Image
          src={images[active]}
          alt={`${productName} — image ${active + 1} of ${images.length}`}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((img, index) => (
            <button
              key={img}
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={active === index}
              className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 ${
                active === index ? "border-[var(--color-green-700)]" : "border-transparent"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
