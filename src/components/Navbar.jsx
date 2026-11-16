import { useEffect, useState } from 'react';
import { Menu as MenuIcon, ShoppingCart, User, X } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../data/site';
import { useActiveSection } from '../hooks/useActiveSection';

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

const iconButton =
  'relative grid size-10 shrink-0 place-items-center rounded-full text-ink transition duration-200 hover:bg-brand-soft hover:text-brand sm:size-11';

export default function Navbar({ cartCount, user, onCartOpen, onAccountOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { active, scrolled } = useActiveSection(SECTION_IDS);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 bg-white pr-(--scrollbar-comp) transition-shadow duration-300 ${
        scrolled || menuOpen ? 'shadow-[0_4px_24px_-6px_rgba(17,17,20,0.18)]' : ''
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-8 lg:h-18"
      >
        <div className="flex min-w-0 flex-1">
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="rounded text-lg font-bold tracking-tight whitespace-nowrap text-logo transition duration-200 hover:text-brand min-[380px]:text-xl lg:text-2xl"
          >
            {BRAND}
          </a>
        </div>

        <ul className="hidden items-center gap-8 md:flex lg:gap-14">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative block py-2 text-sm font-medium tracking-[0.08em] uppercase transition duration-200 hover:text-brand ${
                    isActive ? 'text-brand' : 'text-ink'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300 group-hover:scale-x-100 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-end gap-0.5 sm:gap-2 md:flex-1">
          <button
            type="button"
            onClick={onCartOpen}
            aria-label={
              cartCount > 0
                ? `Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`
                : 'Open cart'
            }
            className={iconButton}
          >
            <ShoppingCart size={22} aria-hidden="true" />
            {cartCount > 0 && (
              <span
                key={cartCount}
                aria-hidden="true"
                className="absolute top-0.5 right-0.5 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-brand px-1 text-[11px] leading-none font-bold text-white"
              >
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onAccountOpen}
            aria-label={user ? `Open account for ${user.name}` : 'Sign in to your account'}
            className={iconButton}
          >
            {user ? (
              <span
                aria-hidden="true"
                className="grid size-8 place-items-center rounded-full bg-brand text-sm font-bold text-white"
              >
                {user.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <User size={22} aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`${iconButton} md:hidden`}
          >
            {menuOpen ? <X size={24} aria-hidden="true" /> : <MenuIcon size={24} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu: animates open by growing its grid row from 0fr to 1fr */}
      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="border-t border-neutral-200 px-4 py-3 sm:px-8">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`flex h-12 items-center rounded-lg px-3 text-sm font-medium tracking-[0.08em] uppercase transition duration-200 hover:bg-brand-soft hover:text-brand ${
                    active === link.id ? 'text-brand' : 'text-ink'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
