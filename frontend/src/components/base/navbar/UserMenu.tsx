'use client';

import { useEffect, useRef } from 'react';
import BaseText from '@/components/base/BaseText';
import clsx from 'clsx';
import { LogOut, User, UserCheck } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { menuItems } from '@/config/profile';

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
  const { isAuthenticated, user, logout } = useUser();
  const router = useRouter();
  const menu = menuItems();

  const handleLogout = () => {
    logout();
    setOpenUser(false);
    router.push('/');
  };

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
      {isAuthenticated ? (
        <>
          <div className="flex flex-col border-b border-neutral-200 p-3">
            <BaseText variant="text-semibold" className="line-clamp-1 break-all">
              {user?.fullName}
            </BaseText>
            <BaseText variant="small" className="text-foreground/60">
              {user?.email}
            </BaseText>
          </div>
          <div className="flex flex-col gap-1.5 p-3">
            {menu.map((item, index) => (
              <div
                className="text-foreground group flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl transition-all hover:gap-0 hover:bg-neutral-100"
                key={index}
                onClick={() => {
                  router.push(item.redirect);
                  setOpenUser(false);
                }}
              >
                <div className="rounded-xl bg-neutral-100 p-2.5">
                  <item.icon size={20} />
                </div>
                <BaseText variant="small" className="font-semibold">
                  {item.label}
                </BaseText>
              </div>
            ))}

            <div
              className="text-primary hover:bg-primary/10 group flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl transition-all hover:gap-0"
              onClick={handleLogout}
            >
              <div className="bg-primary/10 rounded-xl p-2.5 transition-colors group-hover:bg-transparent">
                <LogOut size={20} />
              </div>
              <BaseText variant="small" className="font-semibold">
                Logout
              </BaseText>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-1.5 p-3">
          <div
            className="text-foreground group flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl transition-all hover:gap-0 hover:bg-neutral-100"
            onClick={() => router.push('/auth/login')}
          >
            <div className="rounded-xl bg-neutral-100 p-2.5">
              <User size={20} />
            </div>
            <BaseText variant="small" className="font-semibold">
              Sign in
            </BaseText>
          </div>
          <div
            className="text-foreground group flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl transition-all hover:gap-0 hover:bg-neutral-100"
            onClick={() => router.push('/auth/register')}
          >
            <div className="rounded-xl bg-neutral-100 p-2.5">
              <UserCheck size={20} />
            </div>
            <BaseText variant="small" className="font-semibold">
              Create an account
            </BaseText>
          </div>
        </div>
      )}
    </div>
  );
}
