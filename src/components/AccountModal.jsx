import { LogOut, ShoppingCart, UtensilsCrossed } from 'lucide-react';
import { firstName } from '../lib/format';
import Button from './Button';
import Modal from './Modal';

export default function AccountModal({ open, onClose, user, cartCount, onViewCart, onOrder, onSignOut }) {
  if (!user) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow="Your account"
      title={`Hi, ${firstName(user.name)}!`}
      description="You're signed in to Handaan Express."
    >
      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-lg font-bold text-white"
        >
          {user.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-white">{user.name}</p>
          <p className="truncate text-sm text-white/60">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button variant="gradient" size="lg" fullWidth onClick={onOrder} data-autofocus="">
          <UtensilsCrossed size={18} aria-hidden="true" />
          Start an order
        </Button>
        <Button variant="outlineLight" size="lg" fullWidth onClick={onViewCart}>
          <ShoppingCart size={18} aria-hidden="true" />
          View cart{cartCount > 0 ? ` (${cartCount})` : ''}
        </Button>
        <button
          type="button"
          onClick={onSignOut}
          className="mx-auto flex h-11 items-center gap-2 rounded-lg px-4 text-sm font-medium text-white/65 transition duration-200 hover:text-white"
        >
          <LogOut size={16} aria-hidden="true" />
          Sign out
        </button>
      </div>
    </Modal>
  );
}
