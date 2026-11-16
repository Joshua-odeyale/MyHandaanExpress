import { useState } from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';
import Button from './Button';
import FoodCard from './FoodCard';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

/** Cards shown before "View Full Menu" is pressed (one desktop row). */
const FEATURED_COUNT = 3;

/**
 * Centres an incomplete last row on desktop, where each card spans 2 of 6
 * grid columns.
 */
function lastRowOffset(index, total) {
  const remainder = total % 3;
  const firstOfLastRow = total - remainder;
  if (remainder === 0 || index !== firstOfLastRow) return '';
  return remainder === 1 ? 'lg:col-start-3' : 'lg:col-start-2';
}

export default function Menu({ items, onOrder }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > FEATURED_COUNT;

  // While collapsed, a 4th card is rendered only to complete the 2-column
  // tablet row; it is hidden on mobile and desktop.
  const visibleItems = expanded ? items : items.slice(0, FEATURED_COUNT + 1);

  const toggle = () => {
    setExpanded((current) => !current);
    if (expanded) document.getElementById('menu')?.scrollIntoView();
  };

  return (
    <section id="menu" aria-labelledby="menu-heading" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8 md:pt-24 md:pb-12 lg:pt-28 lg:pb-14">
        <Reveal>
          <SectionHeading
            id="menu-heading"
            align="center"
            eyebrow="Our Menu"
            title="Fresh from our kitchen"
            description="Nigerian favourites cooked to order and delivered while they're still hot."
          />
        </Reveal>

        <ul
          id="menu-grid"
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6 lg:gap-8"
        >
          {visibleItems.map((item, index) => {
            const tabletOnly = !expanded && index >= FEATURED_COUNT;
            return (
              <li
                key={item.id}
                className={`lg:col-span-2 ${tabletOnly ? 'hidden sm:block lg:hidden' : ''} ${
                  expanded ? lastRowOffset(index, items.length) : ''
                }`}
              >
                <Reveal delay={(index % 3) * 90} className="h-full">
                  <FoodCard item={item} onOrder={onOrder} />
                </Reveal>
              </li>
            );
          })}
        </ul>

        {hasMore && (
          <Reveal className="mt-12 flex justify-center lg:mt-14">
            <Button
              variant="outline"
              size="lg"
              onClick={toggle}
              aria-expanded={expanded}
              aria-controls="menu-grid"
              className="group"
            >
              {expanded ? 'Show Less' : 'View Full Menu'}
              {expanded ? (
                <ArrowUp
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:-translate-y-0.5"
                />
              ) : (
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              )}
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
