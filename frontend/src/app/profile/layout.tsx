'use client';

import BaseText from '@/components/base/BaseText';
import Navbar from '@/components/layout/Navbar';
import { useUser } from '@/context/UserContext';
import { useRouter, usePathname } from 'next/navigation';
import { PROFILE_MENU_ITEMS as menu } from '@/config/navigation';
import { LoaderCircle } from 'lucide-react';
import BaseButton from '@/components/base/BaseButton';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const title = menu.find((item) => item.redirect === pathname)?.label || 'Profile';

  return (
    <>
      <Navbar />
      <main className="container pt-3 pb-3 md:pt-8 lg:pt-16">
        <BaseText variant="h1">Profile</BaseText>
        <div className="mt-2 flex gap-8 md:mt-4 lg:mt-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <BaseText variant="text">Hello, nice to see you</BaseText>
              {loading ? (
                <div className="h-7 w-32 animate-pulse rounded-4xl bg-gray-200"></div>
              ) : (
                <BaseText variant="h3">{user?.firstName}!</BaseText>
              )}
            </div>
            <div className="divide-muted flex flex-col gap-2">
              {menu.map((item, index) => (
                <div
                  className={`flex cursor-pointer items-center gap-2 rounded-4xl border p-4 transition-colors ${
                    pathname === item.redirect
                      ? 'bg-primary/10 text-primary border-transparent'
                      : 'border-neutral-200 hover:bg-neutral-100'
                  }`}
                  key={index}
                  onClick={() => router.push(item.redirect)}
                >
                  <item.icon size={20} />
                  <BaseText variant="button">{item.label}</BaseText>
                </div>
              ))}
            </div>
          </div>
          <div className="h-full flex-1 rounded-4xl border border-neutral-200">
            <div className="border-b border-neutral-200 p-6">
              <div className="flex items-center justify-between gap-4">
                <BaseText variant="h2">{title}</BaseText>
                <BaseButton variant="primary" onClick={() => alert('User information updated')}>
                  Update
                </BaseButton>
              </div>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex min-h-72 w-full items-center justify-center">
                  <LoaderCircle size={32} className="text-primary animate-spin" />
                </div>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
