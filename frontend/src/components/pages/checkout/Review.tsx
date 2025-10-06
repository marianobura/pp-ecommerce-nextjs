'use client';

import BaseText from '@/components/base/BaseText';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import BaseButton from '@/components/base/BaseButton';

export default function CheckoutReviewPage() {
  const { cart, totalPrice, removeFromCart } = useCart();

  return (
    <>
      <BaseText variant="h3" className="mt-2 mb-2 h-8 md:mt-4 md:mb-4 lg:mt-8">
        Review your cart
      </BaseText>
      <div className="flex flex-col">
        <div className="flex max-h-96 w-full flex-col gap-2 overflow-y-auto pb-3">
          {cart.map((product) => (
            <div
              key={product.id}
              className="group flex items-center gap-4 rounded-2xl transition-colors hover:bg-neutral-100"
            >
              <Link
                href={`/products/${product?.id}`}
                className="shrink-0 rounded-2xl bg-neutral-100 p-2"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="size-16 rounded-2xl object-cover transition-transform group-hover:scale-110 md:size-20"
                />
              </Link>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <BaseText variant="text-semibold" className="line-clamp-1 break-all">
                    {product.title}
                  </BaseText>
                  <BaseText variant="small" className="text-neutral">
                    ${product.price}
                  </BaseText>
                </div>
                <BaseText
                  variant="small"
                  className="text-primary w-fit cursor-pointer"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove from cart
                </BaseText>
              </div>
            </div>
          ))}
        </div>
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
