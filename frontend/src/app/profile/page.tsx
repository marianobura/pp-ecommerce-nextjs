'use client';

import BaseText from '@/components/base/BaseText';
import { useUser } from '@/context/UserContext';
import { Address } from '@/types/user';

export default function ProfilePage() {
  const { user } = useUser();

  const formatAddress = (address: Address): string => {
    return `${address.street}, ${address.city}, ${address.country}`;
  };

  const renderAddressContent = (): string => {
    if (!user?.address) {
      return 'Not provided yet';
    }
    if (Array.isArray(user.address)) {
      if (user.address.length === 0) {
        return 'Not provided yet';
      }
      return formatAddress(user.address[0]);
    }
    return formatAddress(user.address);
  };

  return (
    <div className="flex gap-8">
      <div className="flex flex-1 flex-col gap-4 rounded-3xl bg-neutral-100 p-6">
        <div className="flex flex-col">
          <BaseText variant="small">First name</BaseText>
          <BaseText variant="text-semibold">{user?.firstName}</BaseText>
        </div>
        <div className="flex flex-col">
          <BaseText variant="small">Last name</BaseText>
          <BaseText variant="text-semibold">{user?.lastName}</BaseText>
        </div>
        <div className="flex flex-col">
          <BaseText variant="small">Email</BaseText>
          <BaseText variant="text-semibold">{user?.email}</BaseText>
        </div>
        <div className="flex flex-col">
          <BaseText variant="small">Phone</BaseText>
          <BaseText variant="text-semibold">
            {user?.phone ? user?.phone : 'Not provided yet'}
          </BaseText>
        </div>
        <div className="flex flex-col">
          <BaseText variant="small">Address</BaseText>
          <BaseText variant="text-semibold">{renderAddressContent()}</BaseText>
        </div>
      </div>
      <form className="flex flex-1 flex-col gap-4 py-6"></form>
    </div>
  );
}
