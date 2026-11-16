import { useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useDialog } from '../hooks/useDialog';

const SIZES = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

const TONES = {
  dark: {
    panel: 'bg-panel text-white border border-white/10',
    description: 'text-white/60',
    close: 'text-white/60 hover:bg-white/10 hover:text-white',
  },
  light: {
    panel: 'bg-white text-ink',
    description: 'text-neutral-600',
    close: 'text-neutral-500 hover:bg-neutral-100 hover:text-ink',
  },
};

/**
 * Accessible modal dialog rendered in a portal.
 * Children are unmounted while closed, so any form state inside resets
 * every time the modal is reopened.
 */
export default function Modal({
  open,
  onClose,
  title,
  description,
  eyebrow,
  tone = 'dark',
  size = 'sm',
  children,
}) {
  const panelRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  useDialog(open, onClose, panelRef);

  if (!open) return null;
  const styles = TONES[tone];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 animate-fade-in bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={`relative max-h-[calc(100dvh-2rem)] w-full animate-modal-in overflow-y-auto overscroll-contain rounded-3xl p-6 shadow-2xl outline-none sm:p-9 ${SIZES[size]} ${styles.panel}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className={`absolute top-4 right-4 grid size-10 place-items-center rounded-full transition duration-200 ${styles.close}`}
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="pr-10">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              {eyebrow}
            </p>
          )}
          <h2 id={titleId} className="text-2xl font-bold tracking-tight sm:text-[1.75rem]">
            {title}
          </h2>
          {description && (
            <p id={descriptionId} className={`mt-2 text-sm leading-relaxed ${styles.description}`}>
              {description}
            </p>
          )}
        </div>

        <div className="mt-7">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
