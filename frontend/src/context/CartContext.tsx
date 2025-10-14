'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Product } from '@/types/product';
import { getDiscountedPrice, hasValidDiscount } from '@/utils/discount';
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

  const cart = user?.cart || [];

  const updateCart = (newCart: Product[]) => {
    if (!user) return;

    const updatedUser = { ...user, cart: newCart };
    setUser(updatedUser);

    const storedAuthRaw = localStorage.getItem('auth');
    if (storedAuthRaw) {
      const storedAuth = JSON.parse(storedAuthRaw);
      storedAuth.user.cart = newCart;
      localStorage.setItem('auth', JSON.stringify(storedAuth));
    }
  };

  const addToCart = (product: Product) => {
    if (!user) return;

    if (cart.find((p) => p.id === product.id)) return;

    const finalPrice = hasValidDiscount(product)
      ? parseFloat(getDiscountedPrice(product))
      : product.price;

    const productWithFinalPrice = { ...product, price: finalPrice };

    updateCart([...cart, productWithFinalPrice]);
  };

  const removeFromCart = (id: Product['id']) => {
    updateCart(cart.filter((p) => p.id !== id));
  };

  const clearCart = () => updateCart([]);

  const isInCart = (id: Product['id']) => cart.some((p) => p.id === id);

  const totalItems = cart.length;
  const totalPrice = cart.reduce((total, p) => total + p.price, 0).toFixed(2);

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
