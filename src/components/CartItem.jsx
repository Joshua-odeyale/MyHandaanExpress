import { Trash2 } from 'lucide-react';
import { formatNaira } from '../lib/format';
import QuantityStepper from './QuantityStepper';

export default function CartItem({ line, onIncrease, onDecrease, onRemove }) {
  return (
    <li className="flex gap-4 py-5">
      <img
        src={line.image}
        alt=""
        className="size-20 shrink-0 rounded-xl object-cover"
        loading="lazy"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-ink">{line.name}</h3>
            <p className="mt-0.5 text-xs text-neutral-500">{formatNaira(line.price)} each</p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${line.name} from cart`}
            className="-mt-1 -mr-1 grid size-8 shrink-0 place-items-center rounded-lg text-neutral-400 transition duration-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantityStepper
            quantity={line.quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            itemName={line.name}
          />
          <p className="text-[15px] font-bold text-ink tabular-nums">
            {formatNaira(line.lineTotal)}
          </p>
        </div>
      </div>
    </li>
  );
}
