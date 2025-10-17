'use client';

import BaseText from '@/components/base/BaseText';
import { useCart } from '@/context/CartContext';
import BaseButton from '@/components/base/BaseButton';
import CartItems from '@/components/layout/CartItems';

export default function CheckoutReviewPage() {
  const { cart, totalPrice, removeFromCart } = useCart();

  return (
    <div className="flex h-full flex-col md:max-h-full">
      <BaseText variant="h3" className="mb-2 md:mb-4">
        Review your cart
      </BaseText>
      <div className="flex flex-col md:flex-1 md:overflow-hidden">
        <div className="flex-1 pb-3 md:overflow-y-auto md:pr-3">
          <CartItems cart={cart} removeFromCart={removeFromCart} />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between border-t border-neutral-200 pt-3">
          <BaseText variant="text">Total</BaseText>
          <BaseText variant="text-semibold">$ {totalPrice}</BaseText>
        </div>
        <BaseButton variant="primary" className="mt-2 w-full md:mt-4">
          Complete Purchase
        </BaseButton>
      </div>
    </div>
  );
}
