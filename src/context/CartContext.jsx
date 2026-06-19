import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("brewnestCart") || "[]"));
  const persist = (items) => { setCart(items); localStorage.setItem("brewnestCart", JSON.stringify(items)); };
  const addToCart = (product, quantity = 1) => {
    const key = product.cartKey || product.id || product._id || product.name;
    const exists = cart.find((item) => item.cartKey === key);
    persist(exists ? cart.map((item) => item.cartKey === key ? { ...item, quantity: item.quantity + quantity } : item) : [...cart, { ...product, cartKey: key, quantity }]);
  };
  const updateQty = (key, quantity) => persist(cart.map((item) => item.cartKey === key ? { ...item, quantity: Math.max(1, quantity) } : item));
  const removeFromCart = (key) => persist(cart.filter((item) => item.cartKey !== key));
  const clearCart = () => persist([]);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const value = useMemo(() => ({ cart, addToCart, updateQty, removeFromCart, clearCart, total, count }), [cart, total, count]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
