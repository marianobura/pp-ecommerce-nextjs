'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';
import { getDiscountedPrice, hasValidDiscount } from '@/utils/discount';

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: Product['id']) => void;
  isInCart: (id: Product['id']) => boolean;
  clearCart: () => void;
  totalItems: number;
  totalPrice: string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;

      const finalPrice = hasValidDiscount(product)
        ? parseFloat(getDiscountedPrice(product))
        : product.price;

      const productWithFinalPrice = { ...product, price: finalPrice };

      return [...prev, productWithFinalPrice];
    });
  };

  const removeFromCart = (id: Product['id']) => {
    setCart((prev) => prev.filter((product) => product.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (id: Product['id']) => {
    return cart.some((product) => product.id === id);
  };

  const totalItems = cart.length;

  const totalPrice = cart.reduce((total, product) => total + product.price, 0).toFixed(2);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, isInCart, clearCart, totalItems, totalPrice }}
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
