'use client';
import { useState } from 'react';
import { Product } from '@/types/product';
import BaseButton from '@/components/BaseButton';

export function ProductButton({}: { product: Product }) {
  const [inCart, setInCart] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setInCart(!inCart);
  };

  return (
    <BaseButton variant={inCart ? 'primary' : 'neutral'} className="w-full" onClick={handleClick}>
      {inCart ? 'Remove from Cart' : 'Add to Cart'}
    </BaseButton>
  );
}
