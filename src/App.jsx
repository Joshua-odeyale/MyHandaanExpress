import { useCallback, useEffect, useState } from 'react';
import AboutStory from './components/AboutStory';
import AccountModal from './components/AccountModal';
import CartDrawer from './components/CartDrawer';
import CelebrationCTA from './components/CelebrationCTA';
import Footer from './components/Footer';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import OrderModal from './components/OrderModal';
import RegisterModal from './components/RegisterModal';
import Toast from './components/Toast';
import { menuItems } from './data/menu';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import { firstName } from './lib/format';

const TOAST_DURATION = 2600;

export default function App() {
  const cart = useCart();
  const auth = useAuth();

  // Only one overlay is open at a time:
  // 'cart' | 'login' | 'register' | 'forgot' | 'account' | 'order' | null
  const [overlay, setOverlay] = useState(null);
  const [orderStep, setOrderStep] = useState('meals');
  const [toast, setToast] = useState(null);

  const closeOverlay = useCallback(() => setOverlay(null), []);
  const showToast = useCallback((message) => setToast({ id: Date.now(), message }), []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [toast]);

  // A toast would sit on top of an overlay's controls, so drop it when one opens.
  useEffect(() => {
    if (overlay) setToast(null);
  }, [overlay]);

  const openOrder = useCallback((step = 'meals') => {
    setOrderStep(step);
    setOverlay('order');
  }, []);

  const browseMenu = useCallback(() => {
    setOverlay(null);
    // Wait for the overlay to release its scroll lock before scrolling.
    setTimeout(() => document.getElementById('menu')?.scrollIntoView(), 60);
  }, []);

  const handleAddToCart = useCallback(
    (item) => {
      cart.add(item.id);
      showToast(`${item.name} added to your cart`);
    },
    [cart, showToast],
  );

  const handleSignIn = useCallback(
    async (credentials) => {
      const result = await auth.signIn(credentials);
      if (result.ok) {
        setOverlay((current) => (current === 'login' ? null : current));
        showToast(`Welcome back, ${firstName(result.user.name)}!`);
      }
      return result;
    },
    [auth, showToast],
  );

  const handleRegister = useCallback(
    async (details) => {
      const result = await auth.register(details);
      if (result.ok) {
        setOverlay(null);
        showToast(`Account created. Welcome, ${firstName(result.user.name)}!`);
      }
      return result;
    },
    [auth, showToast],
  );

  const handleSignOut = useCallback(() => {
    auth.signOut();
    setOverlay(null);
    showToast('You have been signed out');
  }, [auth, showToast]);

  return (
    <>
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
      >
        Skip to menu
      </a>

      <Navbar
        cartCount={cart.count}
        user={auth.user}
        onCartOpen={() => setOverlay('cart')}
        onAccountOpen={() => setOverlay(auth.user ? 'account' : 'login')}
      />

      <main>
        <Hero
          user={auth.user}
          onSignIn={handleSignIn}
          onRegister={() => setOverlay('register')}
          onForgotPassword={() => setOverlay('forgot')}
          onOrderNow={() => openOrder('meals')}
          onSignOut={handleSignOut}
        />
        <AboutStory />
        <Menu items={menuItems} onOrder={handleAddToCart} />
        <CelebrationCTA onOrderNow={() => openOrder('meals')} />
      </main>

      <Footer />

      <CartDrawer
        open={overlay === 'cart'}
        onClose={closeOverlay}
        cart={cart}
        onCheckout={() => openOrder('details')}
        onBrowseMenu={browseMenu}
      />
      <LoginModal
        open={overlay === 'login'}
        onClose={closeOverlay}
        onSignIn={handleSignIn}
        onRegister={() => setOverlay('register')}
        onForgotPassword={() => setOverlay('forgot')}
      />
      <RegisterModal
        open={overlay === 'register'}
        onClose={closeOverlay}
        onRegister={handleRegister}
        onSignInInstead={() => setOverlay('login')}
      />
      <ForgotPasswordModal
        open={overlay === 'forgot'}
        onClose={closeOverlay}
        onBackToSignIn={() => setOverlay('login')}
      />
      <AccountModal
        open={overlay === 'account'}
        onClose={closeOverlay}
        user={auth.user}
        cartCount={cart.count}
        onViewCart={() => setOverlay('cart')}
        onOrder={() => openOrder('meals')}
        onSignOut={handleSignOut}
      />
      <OrderModal
        open={overlay === 'order'}
        onClose={closeOverlay}
        initialStep={orderStep}
        cart={cart}
        user={auth.user}
      />

      <Toast toast={toast} />
    </>
  );
}
