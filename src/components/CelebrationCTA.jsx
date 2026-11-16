import Button from './Button';
import Reveal from './Reveal';

export default function CelebrationCTA({ onOrderNow }) {
  return (
    <section id="order" aria-labelledby="order-heading" className="bg-white px-5 pt-10 pb-20 sm:px-8 md:pt-12 md:pb-24 lg:pt-14 lg:pb-28">
      <Reveal className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-navy px-6 py-16 text-center shadow-[0_32px_64px_-32px_rgba(10,15,31,0.7)] sm:px-12 sm:py-20 lg:rounded-[2.5rem] lg:py-28">
        {/* Soft warm glow behind the heading */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 h-72 w-[42rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl"
        />

        <p className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-brand-light">
          Ready to Celebrate?
        </p>

        <h2
          id="order-heading"
          className="mx-auto mt-7 max-w-5xl text-4xl leading-[1.1] font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
        >
          Make Your Next Celebration <br className="hidden lg:block" />
          <span className="text-brand">Unforgettable</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          Order now and let us handle the food preparation while you enjoy the celebration with
          your loved ones.
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <Button size="lg" onClick={onOrderNow} className="sm:min-w-44">
            Order Now
          </Button>
          <Button variant="outlineLight" size="lg" href="#menu" className="sm:min-w-44">
            Explore Menu
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
