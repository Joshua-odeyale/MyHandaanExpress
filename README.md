# Handaan Express

A responsive Nigerian food-delivery landing page built with React, Vite, Tailwind CSS and Lucide icons.

## Run it

```bash
npm install
npm run dev
```

`npm run build` creates a production build in `dist/`, and `npm run preview` serves it.

## Project structure

```
src/
  App.jsx               Page layout and overlay/cart/auth wiring
  index.css             Tailwind import, brand theme tokens, animations
  data/
    menu.js             Menu items and delivery fee (edit this to add meals)
    site.js             Nav links, contact details, payment methods
  hooks/
    useCart.js          Cart state, persisted to localStorage
    useAuth.js          Front-end only accounts and sessions
    useDialog.js        Focus trap, Escape to close, scroll lock
    useActiveSection.js Highlights the current nav link
  lib/                  Formatting, validation and storage helpers
  components/
    Navbar, Hero, AboutStory, Menu, CelebrationCTA, Footer
    CartDrawer, LoginModal, RegisterModal, ForgotPasswordModal,
    AccountModal, OrderModal
    FoodCard, Button, SectionHeading, FeatureItem, Modal, CartItem,
    TextField, PasswordField, QuantityStepper, Reveal, Toast
```

## Adding a meal

1. Put the photo in `src/assets/images/`.
2. Import it at the top of `src/data/menu.js`.
3. Append an object with `id`, `name`, `description`, `price` (whole naira) and `image`.

The menu grid, cart and ordering flow pick it up automatically.

## What is not connected yet

There is no backend. Until one is added:

- **Accounts** are stored in the visitor's browser (`localStorage`), so an account created on one device does not exist on another. Swap the bodies of `signIn` and `register` in `src/hooks/useAuth.js` for real API calls.
- **Password reset** validates the email and shows the confirmation screen, but no email is sent. See the comment in `ForgotPasswordModal.jsx`.
- **Orders** are validated and saved to `localStorage` under `handaan:orders`, but are not sent anywhere and no payment is taken. See the comment in `OrderModal.jsx`.
