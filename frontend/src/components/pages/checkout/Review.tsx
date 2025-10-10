'use client';

import BaseText from '@/components/base/BaseText';
import { useCart } from '@/context/CartContext';
import BaseButton from '@/components/base/BaseButton';
import CartItems from '@/components/ui/CartItems';

export default function CheckoutReviewPage() {
  const { cart, totalPrice, removeFromCart } = useCart();

  return (
    <>
      <BaseText variant="h3" className="mt-2 mb-2 h-8 md:mt-4 md:mb-4 lg:mt-8">
        Review your cart
      </BaseText>
      <div className="flex flex-col">
        <CartItems cart={cart} removeFromCart={removeFromCart} className="max-h-96 w-full pb-3" />
        <div className="mt-3 flex justify-between border-t border-neutral-200 pt-3 md:mt-0">
          <BaseText variant="text-semibold">Total:</BaseText>
          <BaseText variant="text-semibold">${totalPrice}</BaseText>
        </div>
        <BaseButton variant="primary" className="mt-4 w-full">
          Complete Purchase
        </BaseButton>
      </div>
    </>
  );
}
