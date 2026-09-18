import { MinusIcon, PlusIcon } from "@/components/shared/icons";

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 20,
  size = "base",
}: {
  quantity: number;
  onChange: (q: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "base";
}) {
  const isSmall = size === "sm";
  return (
    <div
      className={`inline-flex items-center rounded-full border border-[var(--color-beige-dark)] ${
        isSmall ? "h-9" : "h-11"
      }`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="flex h-full w-9 items-center justify-center rounded-l-full text-[var(--color-brown-700)] disabled:opacity-30"
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="flex h-full w-9 items-center justify-center rounded-r-full text-[var(--color-brown-700)] disabled:opacity-30"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
