import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { formatNaira } from '../lib/format';
import Button from './Button';

export default function FoodCard({ item, onOrder }) {
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleOrder = () => {
    onOrder(item);
    setJustAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_28px_-12px_rgba(17,17,20,0.22)] ring-1 ring-black/5 transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(17,17,20,0.35)]">
      <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold text-ink sm:text-xl">{item.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.description}</p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <p className="text-xl font-bold text-ink tabular-nums">
            <span className="sr-only">Price: </span>
            {formatNaira(item.price)}
          </p>
          <Button
            size="sm"
            onClick={handleOrder}
            className="min-w-24"
            aria-label={`Order ${item.name}, add to cart`}
          >
            {justAdded ? (
              <>
                <Check size={16} strokeWidth={3} aria-hidden="true" />
                Added
              </>
            ) : (
              'Order'
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
