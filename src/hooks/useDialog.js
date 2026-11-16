import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Shared behaviour for modal surfaces (Modal, CartDrawer):
 * - Escape closes
 * - focus moves in on open, is trapped while open, and is restored on close
 * - page scrolling is locked while open (without layout shift)
 */
export function useDialog(open, onClose, containerRef) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return undefined;

    const container = containerRef.current;
    const previouslyFocused = document.activeElement;
    const root = document.documentElement;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;

    // Lock page scroll, and pad by the scrollbar width so nothing shifts
    // sideways when the scrollbar disappears. The fixed navbar reads the
    // same value through the --scrollbar-comp custom property.
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      root.style.setProperty('--scrollbar-comp', `${scrollbarWidth}px`);
    }

    const initialTarget = container?.querySelector('[data-autofocus]') ?? container;
    initialTarget?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current?.();
        return;
      }
      if (event.key !== 'Tab' || !container) return;

      const focusable = Array.from(container.querySelectorAll(FOCUSABLE)).filter(
        (element) => element.getClientRects().length > 0,
      );
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || current === container)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      } else if (!container.contains(current)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      root.style.removeProperty('--scrollbar-comp');
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [open, containerRef]);
}
