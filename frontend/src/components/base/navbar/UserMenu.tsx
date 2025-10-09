'use client';

import { useEffect, useRef } from 'react';
import BaseText from '@/components/base/BaseText';
import clsx from 'clsx';
import { LogOut, Settings, User } from 'lucide-react';

export default function UserMenu({
  openUser,
  setOpenUser,
  triggerRef,
}: {
  openUser: boolean;
  setOpenUser: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
}) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpenUser(false);
      }
    };

    if (openUser) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openUser, setOpenUser]);

  return (
    <div
      ref={menuRef}
      className={clsx(
        'absolute top-16 right-3 z-50 min-w-64 origin-top-right overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all',
        openUser
          ? 'pointer-events-auto scale-100 opacity-100'
          : 'pointer-events-none scale-95 opacity-0',
      )}
    >
      <div className="flex flex-col border-b border-neutral-200 p-3">
        <BaseText variant="text-semibold" className="line-clamp-1 break-all">
          Mariano Buranits
        </BaseText>
        <BaseText variant="small" className="text-foreground/60">
          marianoobura@gmail.com
        </BaseText>
      </div>
      <div className="flex flex-col gap-1.5 p-3">
        <div
          className="text-foreground group flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl transition-all hover:gap-0 hover:bg-neutral-100"
          onClick={() => console.log('Switching to profile view')}
        >
          <div className="rounded-xl bg-neutral-100 p-2.5">
            <User size={20} />
          </div>
          <BaseText variant="small" className="font-semibold">
            Profile
          </BaseText>
        </div>
        <div
          className="text-foreground group flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl transition-all hover:gap-0 hover:bg-neutral-100"
          onClick={() => console.log('Switching to settings view')}
        >
          <div className="rounded-xl bg-neutral-100 p-2.5">
            <Settings size={20} />
          </div>
          <BaseText variant="small" className="font-semibold">
            Settings
          </BaseText>
        </div>
        <div
          className="text-primary hover:bg-primary/10 group flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl transition-all hover:gap-0"
          onClick={() => console.log('Logging out')}
        >
          <div className="bg-primary/10 rounded-xl p-2.5 transition-colors group-hover:bg-transparent">
            <LogOut size={20} />
          </div>
          <BaseText variant="small" className="font-semibold">
            Logout
          </BaseText>
        </div>
      </div>
    </div>
  );
}
