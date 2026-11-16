import { useId, useRef } from 'react';
import { ArrowRight, ShoppingBag, X } from 'lucide-react';
import { formatNaira } from '../lib/format';
import { useDialog } from '../hooks/useDialog';
import Button from './Button';
import CartItem from './CartItem';

export default function CartDrawer({ open, onClose, cart, onCheckout, onBrowseMenu }) {
  const panelRef = useRef(null);
  const titleId = useId();
  useDialog(open, onClose, panelRef);

  const isEmpty = cart.count === 0;

  return (
    // Stays mounted so it can slide in and out; `inert` removes it from the
    // tab order and the accessibility tree while closed.
    <div
      inert={!open}
      className={`fixed inset-0 z-50 overflow-hidden ${open ? '' : 'pointer-events-none'}`}
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl outline-none transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 sm:px-6">
          <h2 id={titleId} className="text-xl font-bold text-ink">
            Your Cart
            {!isEmpty && (
              <span className="ml-2 text-sm font-medium text-neutral-500">
                ({cart.count} {cart.count === 1 ? 'item' : 'items'})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="grid size-10 place-items-center rounded-full text-neutral-500 transition duration-200 hover:bg-neutral-100 hover:text-ink"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid size-20 place-items-center rounded-full bg-brand-soft text-brand">
              <ShoppingBag size={32} aria-hidden="true" />
            </span>
            <p className="mt-6 text-lg font-bold text-ink">Your cart is empty</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Add a few of your favourite meals and they&rsquo;ll show up here.
            </p>
            <Button className="mt-7" onClick={onBrowseMenu}>
              Browse the menu
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-neutral-200 overflow-y-auto overscroll-contain px-5 sm:px-6">
              {cart.lines.map((line) => (
                <CartItem
                  key={line.id}
                  line={line}
                  onIncrease={() => cart.add(line.id)}
                  onDecrease={() => cart.decrease(line.id)}
                  onRemove={() => cart.remove(line.id)}
                />
              ))}
            </ul>

            <footer className="border-t border-neutral-200 bg-neutral-50 px-5 py-5 sm:px-6">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-ink tabular-nums">
                    {formatNaira(cart.subtotal)}
                  </dd>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <dt>Delivery fee</dt>
                  <dd className="font-medium text-ink tabular-nums">
                    {formatNaira(cart.deliveryFee)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-neutral-200 pt-3 text-base font-bold text-ink">
                  <dt>Total</dt>
                  <dd className="text-xl tabular-nums">{formatNaira(cart.total)}</dd>
                </div>
              </dl>
              <Button size="lg" fullWidth className="mt-5" onClick={onCheckout}>
                Checkout
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <button
                type="button"
                onClick={cart.clear}
                className="mx-auto mt-3 block rounded px-3 py-1.5 text-sm font-medium text-neutral-500 transition duration-200 hover:text-red-600"
              >
                Clear cart
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
