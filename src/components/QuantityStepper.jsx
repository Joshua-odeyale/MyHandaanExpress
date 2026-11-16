import { Minus, Plus } from 'lucide-react';

const buttonClasses =
  'grid size-8 place-items-center rounded-lg text-ink transition duration-200 hover:bg-brand hover:text-white';

export default function QuantityStepper({ quantity, onDecrease, onIncrease, itemName }) {
  return (
    <div
      role="group"
      aria-label={`Quantity of ${itemName}`}
      className="inline-flex items-center gap-1 rounded-xl border border-neutral-200 bg-white p-1"
    >
      <button
        type="button"
        onClick={onDecrease}
        aria-label={`Decrease quantity of ${itemName}`}
        className={buttonClasses}
      >
        <Minus size={15} strokeWidth={2.5} aria-hidden="true" />
      </button>
      <span aria-live="polite" className="min-w-7 text-center text-sm font-semibold tabular-nums">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        aria-label={`Increase quantity of ${itemName}`}
        className={buttonClasses}
      >
        <Plus size={15} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </div>
  );
}
