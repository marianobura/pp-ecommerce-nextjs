'use client';

import { Product } from '@/types/product';
import BaseButton from '@/components/BaseButton';
import { useCart } from '@/context/CartContext';

export function ProductButton({ product }: { product: Product }) {
  const { addToCart, removeFromCart, isInCart } = useCart();

  const inCart = isInCart(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product.id);
    }
  };

  return (
    <BaseButton variant={inCart ? 'primary' : 'neutral'} className="w-full" onClick={handleClick}>
      {inCart ? 'Remove from Cart' : 'Add to Cart'}
    </BaseButton>
  );
}
