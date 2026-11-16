import { CircleCheck } from 'lucide-react';

/** Small confirmation message announced politely to screen readers. */
export default function Toast({ toast }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4"
    >
      {toast && (
        <div
          key={toast.id}
          className="flex max-w-full animate-toast-in items-center gap-3 rounded-full bg-navy py-3 pr-6 pl-4 text-sm font-medium text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
        >
          <CircleCheck size={20} className="shrink-0 text-brand" aria-hidden="true" />
          <span className="truncate">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
