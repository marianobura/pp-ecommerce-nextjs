'use client';

import { Handbag, UserRound } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import { useCart } from '@/context/CartContext';

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
              <span className="bg-primary absolute top-2 right-2 size-2 rounded-4xl"></span>
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
