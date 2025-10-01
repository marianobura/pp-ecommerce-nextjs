'use client';

import { Handbag, UserRound } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import { useCart } from '@/context/CartContext';
import BaseText from '@/components/base/BaseText';

export default function Navbar() {
  const { totalItems } = useCart();

  const handleCart = () => {
    alert('Cart opened');
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
    </nav>
  );
}
