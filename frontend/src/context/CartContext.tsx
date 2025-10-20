'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';
import {
  getCart,
  addProductToCart,
  removeProductFromCart,
  clearCartService,
} from '@/services/cart';
import { useUser } from './UserContext';

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: Product['id']) => void;
  clearCart: () => void;
  isInCart: (id: Product['id']) => boolean;
  totalItems: number;
  totalPrice: string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, setUser } = useUser();
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    if (user) {
      setCart(getCart());
    } else {
      setCart([]);
    }
  }, [user]);

  const syncUserCart = (newCart: Product[]) => {
    if (!user) return;
    setUser({ ...user, cart: newCart });
  };

  const addToCart = (product: Product) => {
    if (!user) return;
    const updatedCart = addProductToCart(product);
    setCart(updatedCart);
    syncUserCart(updatedCart);
  };

  const removeFromCart = (id: Product['id']) => {
    if (!user) return;
    const updatedCart = removeProductFromCart(id);
    setCart(updatedCart);
    syncUserCart(updatedCart);
  };

  const clearCart = () => {
    if (!user) return;
    clearCartService();
    setCart([]);
    syncUserCart([]);
  };

  const isInCart = (id: Product['id']) => cart.some((p) => p.id === id);
  const totalItems = cart.length;
  const totalPrice = cart.reduce((acc, p) => acc + p.price, 0).toFixed(2);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, isInCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
