'use client';

import BaseText from '@/components/base/BaseText';
import Navbar from '@/components/layout/Navbar';
import { useUser } from '@/context/UserContext';
import { useRouter, usePathname } from 'next/navigation';
import { PROFILE_MENU_ITEMS as menu, PROFILE_BUTTON_DATA as button } from '@/config/navigation';
import { LoaderCircle } from 'lucide-react';
import BaseButton from '@/components/base/BaseButton';
import { ProfileFormProvider, useProfileForm } from '@/context/ProfileFormContext';

function ProfileLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const { submit: submitForm, isSubmitting } = useProfileForm();
  const router = useRouter();
  const pathname = usePathname();
  const title = menu.find((item) => item.redirect === pathname)?.label || 'Profile';

  const currentButton = button.find((button) => pathname === button.path);
  const showButton = !!currentButton;
  const buttonLabel = currentButton?.label;

  return (
    <>
      <Navbar />
      <main className="container pt-3 pb-3 md:pt-8 lg:pt-16">
        <BaseText variant="h1">Profile</BaseText>
        <div className="mt-2 flex flex-col gap-8 md:mt-4 md:flex-row lg:mt-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <BaseText variant="text">Hello, nice to see you</BaseText>
              {loading ? (
                <div className="h-7 w-32 animate-pulse rounded-4xl bg-gray-200"></div>
              ) : (
                <BaseText variant="h3">{user?.firstName}!</BaseText>
              )}
            </div>
            <div className="flex gap-2 overflow-y-scroll md:flex-col">
              {menu.map((item, index) => (
                <div
                  className={`line-clamp-1 flex shrink-0 cursor-pointer items-center gap-2 rounded-4xl border p-4 transition-colors ${
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
              {showButton ? (
                <div className="xs:flex-row flex flex-col items-center justify-between gap-4">
                  <BaseText variant="h2" className="line-clamp-1 truncate break-all">
                    {title}
                  </BaseText>
                  <BaseButton
                    variant="primary"
                    className="line-clamp-1"
                    onClick={submitForm}
                    isLoading={isSubmitting}
                  >
                    {buttonLabel}
                  </BaseButton>
                </div>
              ) : (
                <BaseText variant="h2">{title}</BaseText>
              )}
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

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProfileFormProvider>
      <ProfileLayoutContent>{children}</ProfileLayoutContent>
    </ProfileFormProvider>
  );
}
