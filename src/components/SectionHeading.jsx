/**
 * Eyebrow + large title + optional description, used at the top of sections.
 * `tone="dark"` is for dark backgrounds, `tone="light"` for light ones.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  id,
  className = '',
}) {
  const centered = align === 'center';
  const dark = tone === 'dark';

  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">{eyebrow}</p>
      )}
      <h2
        id={id}
        className={`mt-3 text-4xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-[3.25rem] ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            dark ? 'text-white/70' : 'text-neutral-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
