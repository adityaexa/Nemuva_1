import Image from "next/image";
import Link from "next/link";
import { CartLine } from "@/types";
import { formatPrice } from "@/lib/utils";
import { QuantitySelector } from "@/components/cart/QuantitySelector";
import { TrashIcon } from "@/components/shared/icons";
import { useCart } from "@/lib/cart-context";

export function CartItem({ line }: { line: CartLine }) {
  const { updateQuantity, removeLine } = useCart();

  return (
    <li className="flex gap-4 py-4">
      <Link href={`/products/${line.slug}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[var(--color-beige)]">
        <Image src={line.image} alt={line.name} fill className="object-cover" sizes="80px" />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/products/${line.slug}`} className="text-sm font-semibold text-[var(--color-brown-900)] hover:text-[var(--color-green-700)]">
              {line.name}
            </Link>
            <p className="text-xs text-[var(--color-ink-soft)]">{line.weight}</p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${line.name} from cart`}
            onClick={() => removeLine(line.sku)}
            className="rounded-full p-1.5 text-[var(--color-ink-soft)] hover:bg-[var(--color-beige)] hover:text-red-600"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <QuantitySelector size="sm" quantity={line.quantity} onChange={(q) => updateQuantity(line.sku, q)} />
          <p className="text-sm font-semibold text-[var(--color-brown-900)]">
            {formatPrice(line.price * line.quantity)}
          </p>
        </div>
      </div>
    </li>
  );
}
