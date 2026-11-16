import { Bike, Leaf, LogOut, ShieldCheck, Utensils } from 'lucide-react';
import heroImage from '../assets/images/hero.jpg';
import { firstName } from '../lib/format';
import Button from './Button';
import FeatureItem from './FeatureItem';
import LoginForm from './LoginForm';

const FEATURES = [
  { icon: Bike, label: 'Fast Delivery' },
  { icon: ShieldCheck, label: 'Secure Payments' },
  { icon: Leaf, label: 'Best Quality Ingredients' },
];

function AccountCard({ user, onSignIn, onRegister, onForgotPassword, onOrderNow, onSignOut }) {
  return (
    <div
      className="w-full max-w-md animate-rise justify-self-center rounded-3xl border border-white/10 bg-panel p-7 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.95)] sm:p-9 lg:justify-self-end"
      style={{ animationDelay: '250ms' }}
    >
      {user ? (
        <>
          <span
            aria-hidden="true"
            className="grid size-14 place-items-center rounded-full bg-brand text-xl font-bold text-white"
          >
            {user.name.charAt(0).toUpperCase()}
          </span>
          <h2 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome back, {firstName(user.name)}!
          </h2>
          <p className="mt-2 text-sm leading-relaxed break-words text-white/60">
            You&rsquo;re signed in as {user.email}. What are you craving today?
          </p>
          <div className="mt-7 space-y-3">
            <Button variant="gradient" size="lg" fullWidth onClick={onOrderNow}>
              Order now
            </Button>
            <Button variant="outlineLight" size="lg" fullWidth onClick={onSignOut}>
              <LogOut size={18} aria-hidden="true" />
              Sign out
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome back!
          </h2>
          <p className="mt-2 text-sm text-white/60">Sign in to your Handaan Express account</p>
          <div className="mt-7">
            <LoginForm
              onSignIn={onSignIn}
              onRegister={onRegister}
              onForgotPassword={onForgotPassword}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default function Hero(props) {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-black pt-16 lg:pt-18"
    >
      <img
        src={heroImage}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      {/* Dark overlays keep the copy readable over the photograph */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-black/90 via-black/70 to-black/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-linear-to-t from-black/70 to-transparent"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16 lg:py-20">
        <div className="animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(255,75,11,0.8)]">
            <Utensils size={16} aria-hidden="true" />
            Handaan Express
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-[2.75rem] leading-[1.04] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            Great food,
            <br />
            delivered fast.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            Your favorite meals, hot and fresh, delivered to your doorstep.
          </p>

          <ul className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8 lg:mt-14">
            {FEATURES.map((feature) => (
              <FeatureItem key={feature.label} {...feature} />
            ))}
          </ul>
        </div>

        <AccountCard {...props} />
      </div>
    </section>
  );
}
