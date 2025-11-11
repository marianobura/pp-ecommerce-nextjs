'use client';

import BaseInput from '@/components/base/BaseInput';
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
      return 'Add address';
    }
    if (Array.isArray(user.address)) {
      if (user.address.length === 0) {
        return 'Add address';
      }
      return formatAddress(user.address[0]);
    }
    return formatAddress(user.address);
  };

  const userData = [
    { label: 'Name', values: [user?.firstName, user?.lastName], editable: true },
    { label: 'Email Address', values: [user?.email], editable: false },
    { label: 'Phone Number', values: [user?.phone || 'Add phone number'], editable: true },
    { label: 'Address', values: [renderAddressContent()], editable: true },
  ];

  return (
    <div className="flex flex-col divide-y divide-neutral-200">
      {userData.map((data, index) => (
        <div className="flex gap-3 py-6 first-of-type:pt-0 last-of-type:pb-0" key={index}>
          <BaseText variant="text-semibold" className="flex-1">
            {data.label}
          </BaseText>
          <div className="flex flex-3 gap-3">
            {data.values.map((value, idx) => (
              <div className="flex-1">
                <BaseInput
                  key={idx}
                  value={value || ''}
                  readOnly={!data.editable}
                  placeholder="Not provided yet"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
