import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock, MapPin, Phone, User } from 'lucide-react';
import { menuItems } from '../data/menu';
import { PAYMENT_METHODS } from '../data/site';
import { formatNaira } from '../lib/format';
import { readStorage, writeStorage } from '../lib/storage';
import {
  isValid,
  validateAddress,
  validateName,
  validatePhone,
} from '../lib/validation';
import Button from './Button';
import Modal from './Modal';
import QuantityStepper from './QuantityStepper';
import TextField from './TextField';

const ORDERS_KEY = 'handaan:orders';

const STEP_COPY = {
  meals: {
    eyebrow: 'Step 1 of 2',
    title: 'Choose your meals',
    description: 'Add everything you would like delivered, then continue to delivery details.',
  },
  details: {
    eyebrow: 'Step 2 of 2',
    title: 'Delivery details',
    description: 'Tell us where to bring your food and how you would like to pay.',
  },
  done: {
    eyebrow: 'Order confirmed',
    title: 'Thank you for your order!',
    description: 'Your food is being prepared and will be on its way shortly.',
  },
};

function Totals({ subtotal, deliveryFee, total }) {
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between text-neutral-600">
        <dt>Subtotal</dt>
        <dd className="font-medium text-ink tabular-nums">{formatNaira(subtotal)}</dd>
      </div>
      <div className="flex justify-between text-neutral-600">
        <dt>Delivery fee</dt>
        <dd className="font-medium text-ink tabular-nums">{formatNaira(deliveryFee)}</dd>
      </div>
      <div className="flex items-baseline justify-between border-t border-neutral-200 pt-3 text-base font-bold text-ink">
        <dt>Total</dt>
        <dd className="text-xl tabular-nums">{formatNaira(total)}</dd>
      </div>
    </dl>
  );
}

function MealsStep({ cart, onContinue }) {
  return (
    <>
      <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
        {menuItems.map((item) => {
          const quantity = cart.quantities[item.id] ?? 0;
          return (
            <li key={item.id} className="flex items-center gap-4 py-3.5">
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="size-14 shrink-0 rounded-xl object-cover sm:size-16"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] leading-snug font-semibold text-ink">{item.name}</h3>
                <p className="mt-0.5 text-sm font-medium text-neutral-600 tabular-nums">
                  {formatNaira(item.price)}
                </p>
              </div>
              {quantity > 0 ? (
                <QuantityStepper
                  quantity={quantity}
                  onDecrease={() => cart.decrease(item.id)}
                  onIncrease={() => cart.add(item.id)}
                  itemName={item.name}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => cart.add(item.id)}
                  aria-label={`Add ${item.name} to order`}
                  className="h-10 rounded-xl border border-brand px-5 text-sm font-semibold text-brand transition duration-200 hover:bg-brand hover:text-white"
                >
                  Add
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {/* Negative bottom offsets cancel the dialog padding so the bar sits flush with its edge */}
      <div className="sticky -bottom-6 -mx-6 -mb-6 flex items-center justify-between gap-4 border-t border-neutral-200 bg-white px-6 py-4 sm:-bottom-9 sm:-mx-9 sm:-mb-9 sm:px-9 sm:py-5">
        <p className="text-sm text-neutral-600" aria-live="polite">
          {cart.count === 0 ? (
            'No meals selected yet'
          ) : (
            <>
              {cart.count} {cart.count === 1 ? 'item' : 'items'} ·{' '}
              <span className="text-base font-bold text-ink tabular-nums">
                {formatNaira(cart.subtotal)}
              </span>
            </>
          )}
        </p>
        <Button onClick={onContinue} disabled={cart.count === 0}>
          Continue
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
      </div>
    </>
  );
}

function DetailsStep({ cart, user, onBack, onPlaced }) {
  const [values, setValues] = useState({
    name: user?.name ?? '',
    phone: '',
    address: '',
    paymentMethod: PAYMENT_METHODS[0].id,
  });
  const [errors, setErrors] = useState({});

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {
      name: validateName(values.name),
      phone: validatePhone(values.phone),
      address: validateAddress(values.address),
    };
    setErrors(nextErrors);
    if (!isValid(nextErrors)) {
      // Move focus to the first field that needs attention.
      const firstInvalid = Object.keys(nextErrors).find((field) => nextErrors[field]);
      event.currentTarget.elements[firstInvalid]?.focus();
      return;
    }

    const order = {
      reference: `HE-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      placedAt: new Date().toISOString(),
      items: cart.lines.map(({ id, name, price, quantity, lineTotal }) => ({
        id,
        name,
        price,
        quantity,
        lineTotal,
      })),
      subtotal: cart.subtotal,
      deliveryFee: cart.deliveryFee,
      total: cart.total,
      customer: {
        name: values.name.trim(),
        phone: values.phone.trim(),
        address: values.address.trim(),
        email: user?.email ?? null,
      },
      paymentMethod: values.paymentMethod,
    };

    // No backend is connected yet: orders are kept in this browser only.
    // Replace this with a POST to your orders API.
    writeStorage(ORDERS_KEY, [order, ...readStorage(ORDERS_KEY, [])].slice(0, 20));
    cart.clear();
    onPlaced(order);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          tone="light"
          label="Full name"
          icon={User}
          name="name"
          autoComplete="name"
          placeholder="Ada Okafor"
          value={values.name}
          onChange={update('name')}
          error={errors.name}
        />
        <TextField
          tone="light"
          label="Phone number"
          icon={Phone}
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          placeholder="0803 123 4567"
          value={values.phone}
          onChange={update('phone')}
          error={errors.phone}
        />
        <TextField
          tone="light"
          as="textarea"
          rows={3}
          label="Delivery address"
          name="address"
          autoComplete="street-address"
          placeholder="House number, street, area and nearest landmark"
          value={values.address}
          onChange={update('address')}
          error={errors.address}
          className="sm:col-span-2"
        />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-neutral-700">Payment method</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {PAYMENT_METHODS.map((method) => {
            const selected = values.paymentMethod === method.id;
            return (
              <label
                key={method.id}
                className={`cursor-pointer rounded-xl border p-4 transition duration-200 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand ${
                  selected
                    ? 'border-brand bg-brand-soft ring-1 ring-brand'
                    : 'border-neutral-300 hover:border-neutral-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selected}
                  onChange={update('paymentMethod')}
                  className="sr-only"
                />
                <span className="flex items-center justify-between gap-2 text-sm font-semibold text-ink">
                  {method.label}
                  <span
                    aria-hidden="true"
                    className={`grid size-5 shrink-0 place-items-center rounded-full border transition duration-200 ${
                      selected ? 'border-brand bg-brand text-white' : 'border-neutral-300'
                    }`}
                  >
                    {selected && <Check size={12} strokeWidth={3.5} />}
                  </span>
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-neutral-600">
                  {method.hint}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <section aria-label="Order summary" className="rounded-2xl bg-neutral-50 p-5">
        <h3 className="text-sm font-semibold text-ink">Order summary</h3>
        <ul className="mt-3 mb-4 space-y-2 text-sm text-neutral-600">
          {cart.lines.map((line) => (
            <li key={line.id} className="flex justify-between gap-4">
              <span className="min-w-0 truncate">
                {line.quantity} × {line.name}
              </span>
              <span className="tabular-nums">{formatNaira(line.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-neutral-200 pt-3">
          <Totals subtotal={cart.subtotal} deliveryFee={cart.deliveryFee} total={cart.total} />
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="subtle" onClick={onBack}>
          <ArrowLeft size={18} aria-hidden="true" />
          Edit meals
        </Button>
        <Button type="submit">Place order · {formatNaira(cart.total)}</Button>
      </div>
    </form>
  );
}

function Confirmation({ order, onClose }) {
  const payment = PAYMENT_METHODS.find((method) => method.id === order.paymentMethod);

  return (
    <div>
      <div className="flex items-center gap-4 rounded-2xl bg-brand-soft p-5">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-white">
          <Check size={24} strokeWidth={3} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm text-neutral-600">Order reference</p>
          <p className="text-xl font-bold tracking-wide text-ink">{order.reference}</p>
        </div>
      </div>

      <ul className="mt-6 space-y-4 text-sm text-neutral-700">
        <li className="flex gap-3">
          <Clock size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
          <span>
            Estimated delivery in <strong className="text-ink">35 to 45 minutes</strong>
          </span>
        </li>
        <li className="flex gap-3">
          <MapPin size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
          <span className="min-w-0 break-words">
            Delivering to <strong className="text-ink">{order.customer.name}</strong>,{' '}
            {order.customer.address}
          </span>
        </li>
        <li className="flex gap-3">
          <Phone size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
          <span>Our rider will call {order.customer.phone} on arrival</span>
        </li>
      </ul>

      <section aria-label="Order summary" className="mt-6 rounded-2xl bg-neutral-50 p-5">
        <ul className="mb-4 space-y-2 text-sm text-neutral-600">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4">
              <span className="min-w-0 truncate">
                {item.quantity} × {item.name}
              </span>
              <span className="tabular-nums">{formatNaira(item.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-neutral-200 pt-3">
          <Totals subtotal={order.subtotal} deliveryFee={order.deliveryFee} total={order.total} />
        </div>
        <p className="mt-3 text-xs text-neutral-600">Payment: {payment?.label}</p>
      </section>

      <Button size="lg" fullWidth className="mt-7" onClick={onClose} data-autofocus="">
        Done
      </Button>
    </div>
  );
}

function OrderFlow({ onClose, initialStep, cart, user, onOrderPlaced }) {
  // Checkout needs something in the cart; otherwise start by picking meals.
  const [step, setStep] = useState(cart.count > 0 ? initialStep : 'meals');
  const [order, setOrder] = useState(null);
  const contentRef = useRef(null);
  const copy = STEP_COPY[step];

  // Each step starts at the top of the (scrollable) dialog.
  useEffect(() => {
    contentRef.current?.closest('[role="dialog"]')?.scrollTo({ top: 0 });
  }, [step]);

  return (
    <Modal
      open
      onClose={onClose}
      tone="light"
      size="lg"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <div ref={contentRef}>
        {step === 'meals' && <MealsStep cart={cart} onContinue={() => setStep('details')} />}
        {step === 'details' && (
          <DetailsStep
            cart={cart}
            user={user}
            onBack={() => setStep('meals')}
            onPlaced={(placedOrder) => {
              setOrder(placedOrder);
              setStep('done');
              onOrderPlaced?.(placedOrder);
            }}
          />
        )}
        {step === 'done' && order && <Confirmation order={order} onClose={onClose} />}
      </div>
    </Modal>
  );
}

/**
 * Ordering flow: choose meals -> delivery details -> confirmation.
 * The inner flow is only mounted while open so it always starts fresh.
 */
export default function OrderModal({ open, initialStep = 'meals', ...props }) {
  return open ? <OrderFlow initialStep={initialStep} {...props} /> : null;
}
