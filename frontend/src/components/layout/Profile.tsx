import BaseText from '@/components/base/BaseText';
import React from 'react';

type ProfileSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <div className="h-full flex-1 rounded-4xl border border-neutral-200">
      <div className="border-b border-neutral-200 p-6">
        <BaseText variant="h2">{title}</BaseText>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
