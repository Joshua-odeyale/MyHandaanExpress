import { useId } from 'react';

const TONES = {
  dark: {
    label: 'text-white/80',
    field:
      'bg-white/[0.06] text-white placeholder:text-white/35 focus:bg-white/[0.09]',
    border: 'border-white/10',
    icon: 'text-white/45',
    error: 'text-red-400',
  },
  light: {
    label: 'text-neutral-700',
    field: 'bg-white text-ink placeholder:text-neutral-400',
    border: 'border-neutral-300',
    icon: 'text-neutral-400',
    error: 'text-red-600',
  },
};

/**
 * Labelled input (or textarea via `as="textarea"`) with optional leading
 * icon, trailing control and inline error message.
 */
export default function TextField({
  label,
  icon: Icon,
  error,
  trailing,
  tone = 'dark',
  as: Tag = 'input',
  id,
  className = '',
  ...props
}) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;
  const styles = TONES[tone];

  return (
    <div className={className}>
      <label htmlFor={fieldId} className={`mb-2 block text-sm font-medium ${styles.label}`}>
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            aria-hidden="true"
            className={`pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 ${styles.icon}`}
          />
        )}
        <Tag
          id={fieldId}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`block w-full rounded-xl border px-4 py-3 text-sm outline-none transition duration-200 focus:border-brand focus:ring-2 focus:ring-brand/30 ${
            Icon ? 'pl-11' : ''
          } ${trailing ? 'pr-12' : ''} ${error ? 'border-red-500' : styles.border} ${styles.field}`}
          {...props}
        />
        {trailing && <div className="absolute top-1/2 right-1.5 -translate-y-1/2">{trailing}</div>}
      </div>
      {error && (
        <p id={errorId} role="alert" className={`mt-1.5 text-xs ${styles.error}`}>
          {error}
        </p>
      )}
    </div>
  );
}
