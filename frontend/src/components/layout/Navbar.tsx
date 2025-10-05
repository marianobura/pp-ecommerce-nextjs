'use client';

import { Handbag, UserRound } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import { useCart } from '@/context/CartContext';
import BaseText from '@/components/base/BaseText';
import { useState } from 'react';
import Sheet from '@/components/ui/Sheet';
import BaseButton from '@/components/base/BaseButton';

export default function Navbar() {
  const { cart, totalItems, removeFromCart, totalPrice } = useCart();
  const [openCart, setOpenCart] = useState(false);

  const handleCart = () => {
    setOpenCart(true);
  };

  const handleUser = () => {
    alert('User opened');
  };

  return (
    <nav className="w-full border-b border-neutral-200 bg-white">
      <div className="container flex items-center justify-between py-3">
        <Link href="/">
          <Logo className="h-8 md:h-12" />
        </Link>
        <div className="flex">
          <div
            className="relative flex size-12 cursor-pointer items-center justify-center rounded-4xl transition-colors hover:bg-neutral-100"
            onClick={handleCart}
          >
            <Handbag size={24} />
            {totalItems > 0 && (
              <BaseText
                variant="caption"
                className="bg-primary absolute top-0 right-0 flex min-h-5 min-w-5 items-center justify-center rounded-4xl border-2 border-white px-1 text-white"
              >
                {totalItems}
              </BaseText>
            )}
          </div>
          <div
            className="flex size-12 cursor-pointer items-center justify-center rounded-4xl transition-colors hover:bg-neutral-100"
            onClick={handleUser}
          >
            <UserRound size={24} />
          </div>
        </div>
      </div>

      <Sheet open={openCart} onClose={() => setOpenCart(false)} title={`Your cart (${totalItems})`}>
        {totalItems === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-3">
            <div className="flex items-center gap-2">
              <Handbag size={24} />
              <BaseText variant="text-semibold" className="text-foreground">
                Your cart is empty
              </BaseText>
            </div>
            <BaseText variant="small" className="text-foreground text-center text-balance">
              Explore our{' '}
              <Link href="/products" className="text-primary border-primary border-b">
                products
              </Link>{' '}
              and discover great deals!
            </BaseText>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col gap-2 overflow-y-auto p-3">
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
            <div className="border-t border-neutral-200">
              <div className="flex flex-col gap-3 p-3">
                <div className="flex items-center justify-between">
                  <BaseText variant="text">Total</BaseText>
                  <BaseText variant="text-semibold">$ {totalPrice}</BaseText>
                </div>
                <div className="flex gap-3">
                  <Link href="/checkout" className="grow">
                    <BaseButton variant="primary" className="w-full">
                      Checkout
                    </BaseButton>
                  </Link>
                  <BaseButton variant="neutral" onClick={() => setOpenCart(false)}>
                    Continue Shopping
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </Sheet>
    </nav>
  );
}
