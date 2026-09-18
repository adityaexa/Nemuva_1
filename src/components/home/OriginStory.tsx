import Image from "next/image";
import Link from "next/link";

export function OriginStory() {
  return (
    <section className="section-pad overflow-hidden bg-[var(--color-brown-900)] text-[var(--color-cream)]">
      <div className="container-nemuva grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="tag-pill bg-white/10 text-[var(--color-gold-300)]">Our Roots</p>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">Born in Bihar. Made for the World.</h2>
          <p className="mt-5 leading-relaxed text-[var(--color-cream-dark)]/85">
            Makhana carries deep roots in Bihar — grown in the region&apos;s ponds and wetlands, and shaped by
            generations of farming and processing knowledge passed down through families in the Mithila
            belt.
          </p>
          <p className="mt-4 leading-relaxed text-[var(--color-cream-dark)]/85">
            Nemuva&apos;s work is to bring this traditional food into modern kitchens — respecting where it
            comes from, the people who grow it, and the craft involved — while making it easy to buy,
            whether you need one pack or a business-scale supply.
          </p>
          <Link href="/our-story" className="btn-gold mt-7 inline-flex">
            Discover Our Story
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl">
            <Image
              src="/images/bihar-landscape.jpg"
              alt="A wide view of a Bihar wetland landscape used for Makhana cultivation"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/makhana-pond.jpg"
              alt="A traditional Makhana pond with floating leaves"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 22vw, 45vw"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/farmer-harvest.jpg"
              alt="A farmer engaged in traditional Makhana harvesting"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 22vw, 45vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
