import storyImage from '../assets/images/story-shawarma.jpg';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function AboutStory() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-cocoa">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border border-brand/50 sm:translate-x-5 sm:translate-y-5"
          />
          <img
            src={storyImage}
            alt="Chicken shawarma wrap sliced in half, filled with grilled chicken and fresh vegetables"
            loading="lazy"
            decoding="async"
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[0_32px_64px_-24px_rgba(0,0,0,0.8)] lg:aspect-[5/6]"
          />
        </Reveal>

        <Reveal delay={120}>
          <SectionHeading
            id="about-heading"
            tone="dark"
            eyebrow="Our Story"
            title={
              <>
                Born in The Heart Of <br className="hidden xl:block" />
                <span className="text-brand">Nigeria</span>
              </>
            }
          />
          <div className="mt-7 space-y-5 text-base leading-[1.85] text-white/75 sm:text-[17px]">
            <p>
              Handaan Express began with a simple belief: the food we grew up on deserves to be
              celebrated. From one small kitchen we started cooking the dishes that bring
              Nigerians together, smoky party jollof, peppery suya and golden fried plantain, and
              sharing them with our neighbours.
            </p>
            <p>
              Every order is still prepared the same way. We buy fresh from local markets, grind
              our spice blends in-house and follow recipes passed down through generations.
              Nothing here is rushed except the delivery.
            </p>
            <p>
              Whether it&rsquo;s a quick lunch, a family dinner or a full celebration, we bring the
              warmth of a Nigerian kitchen straight to your doorstep, hot, fresh and right on
              time.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
