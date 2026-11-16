import { useCallback, useEffect, useMemo, useState } from 'react';
import { DELIVERY_FEE, menuItems } from '../data/menu';
import { readStorage, writeStorage } from '../lib/storage';

const CART_KEY = 'handaan:cart';

function loadQuantities() {
  const saved = readStorage(CART_KEY, {});
  // Drop anything that is no longer on the menu or has a bad quantity.
  const clean = {};
  for (const item of menuItems) {
    const quantity = Number(saved?.[item.id]);
    if (Number.isInteger(quantity) && quantity > 0) clean[item.id] = quantity;
  }
  return clean;
}

/**
 * Cart state, persisted to localStorage.
 * Quantities are stored as { [menuItemId]: quantity } and joined with the
 * menu data to build the lines shown in the UI.
 */
export function useCart() {
  const [quantities, setQuantities] = useState(loadQuantities);

  useEffect(() => {
    writeStorage(CART_KEY, quantities);
  }, [quantities]);

  const setQuantity = useCallback((id, quantity) => {
    setQuantities((current) => {
      const next = { ...current };
      if (quantity > 0) next[id] = Math.min(quantity, 99);
      else delete next[id];
      return next;
    });
  }, []);

  const add = useCallback((id) => {
    setQuantities((current) => ({
      ...current,
      [id]: Math.min((current[id] ?? 0) + 1, 99),
    }));
  }, []);

  const decrease = useCallback((id) => {
    setQuantities((current) => {
      const next = { ...current };
      const quantity = (current[id] ?? 0) - 1;
      if (quantity > 0) next[id] = quantity;
      else delete next[id];
      return next;
    });
  }, []);

  const remove = useCallback((id) => setQuantity(id, 0), [setQuantity]);
  const clear = useCallback(() => setQuantities({}), []);

  return useMemo(() => {
    const lines = menuItems
      .filter((item) => quantities[item.id] > 0)
      .map((item) => ({
        ...item,
        quantity: quantities[item.id],
        lineTotal: item.price * quantities[item.id],
      }));
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const deliveryFee = count > 0 ? DELIVERY_FEE : 0;

    return {
      lines,
      quantities,
      count,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      add,
      decrease,
      remove,
      setQuantity,
      clear,
    };
  }, [quantities, add, decrease, remove, setQuantity, clear]);
}
