'use client';

import { X } from 'lucide-react';
import { ReactNode } from 'react';
import BaseText from '@/components/base/BaseText';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Sheet({ open, onClose, children, title }: SheetProps) {
  if (typeof window !== 'undefined') {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-10 bg-black/50 transition-opacity ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 z-20 h-dvh w-96 max-w-full transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col bg-white md:rounded-l-4xl">
          <div className="flex items-center justify-between border-b border-neutral-200 p-3">
            <BaseText variant="h3">{title}</BaseText>
            <button
              className="flex size-12 cursor-pointer items-center justify-center rounded-4xl transition-colors hover:bg-neutral-100"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </>
  );
}
