'use client';

import Navbar from '@/components/layout/Navbar';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function ProductsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className={`min-h-dvh ${pathname !== '/products' ? 'grid grid-rows-[auto_1fr_auto]' : ''}`}
    >
      <Navbar />
      {children}
    </div>
  );
}
