'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CartContextType = {
  cart: number[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  isInCart: (id: number) => boolean;
  clearCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<number[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id: number) => {
    setCart((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (id: number) => cart.includes(id);

  const totalItems = cart.length;

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, isInCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
