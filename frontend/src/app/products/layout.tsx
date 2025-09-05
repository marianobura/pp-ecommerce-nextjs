import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
