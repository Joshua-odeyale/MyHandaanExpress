const BASE =
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition duration-200 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60';

const VARIANTS = {
  primary:
    'bg-brand text-white shadow-[0_10px_24px_-12px_rgba(255,75,11,0.9)] hover:-translate-y-0.5 hover:bg-brand-dark',
  gradient:
    'bg-linear-to-r from-brand to-brand-light text-white shadow-[0_12px_28px_-12px_rgba(255,75,11,0.9)] hover:-translate-y-0.5 hover:brightness-110',
  outline:
    'border-2 border-ink bg-transparent text-ink hover:-translate-y-0.5 hover:bg-ink hover:text-white',
  outlineLight:
    'border border-white/25 bg-white/5 text-white hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10',
  subtle: 'bg-neutral-100 text-ink hover:bg-neutral-200',
};

const SIZES = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
};

/**
 * Renders a <button> by default, or an <a> when `href` is provided.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  href,
  children,
  ...props
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
