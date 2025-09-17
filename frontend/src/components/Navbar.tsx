'use client';

import { Handbag, UserRound } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-neutral-200 bg-white">
      <div className="container flex items-center justify-between py-3">
        <Link href="/">
          <Logo className="h-8 md:h-12" />
        </Link>
        <div className="flex">
          <div className="flex size-12 cursor-pointer items-center justify-center rounded-4xl transition-colors hover:bg-neutral-100">
            <Handbag size={24} />
          </div>
          <div className="flex size-12 cursor-pointer items-center justify-center rounded-4xl transition-colors hover:bg-neutral-100">
            <UserRound size={24} />
          </div>
        </div>
      </div>
    </nav>
  );
}
