import { BRAND, CONTACT } from '../data/site';

const linkClasses =
  'rounded font-medium text-white transition duration-200 hover:text-brand';

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-7 py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <a
            href="#home"
            className="self-start rounded text-2xl font-bold tracking-tight text-brand transition duration-200 hover:text-brand-light"
          >
            {BRAND}
          </a>

          <ul className="flex flex-col gap-3 text-sm text-white/60 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-3">
            <li>
              Social Media: <span className="font-medium text-white">{CONTACT.social}</span>
            </li>
            <li>
              Contact:{' '}
              <a href={CONTACT.phoneHref} className={linkClasses}>
                {CONTACT.phone}
              </a>
            </li>
            <li>
              Email:{' '}
              <a href={`mailto:${CONTACT.email}`} className={`${linkClasses} break-all`}>
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>

        <p className="border-t border-white/10 py-6 text-xs text-white/50">
          © {new Date().getFullYear()} {BRAND}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
