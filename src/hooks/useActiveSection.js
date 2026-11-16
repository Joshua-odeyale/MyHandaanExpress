import { useEffect, useState } from 'react';

/**
 * Tracks which page section is currently in view (for nav highlighting) and
 * whether the page has been scrolled at all (for the navbar shadow).
 * `ids` must be a stable array reference.
 */
export function useActiveSection(ids) {
  const [state, setState] = useState({ active: ids[0], scrolled: false });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const marker = window.innerHeight * 0.4;
      let active = ids[0];
      for (const id of ids) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) active = id;
      }
      const scrolled = window.scrollY > 8;
      setState((current) =>
        current.active === active && current.scrolled === scrolled
          ? current
          : { active, scrolled },
      );
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ids]);

  return state;
}
