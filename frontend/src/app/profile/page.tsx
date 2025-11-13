'use client';

import BaseInput from '@/components/base/BaseInput';
import BaseText from '@/components/base/BaseText';
import { useUser } from '@/context/UserContext';
import { updateUserProfile } from '@/services/user';
import { useState, useEffect, useCallback } from 'react';
import { useProfileForm } from '@/context/ProfileFormContext';
import { getInitialAddress, getProfileFormConfig } from '@/utils/profile';

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const { setSubmit, setIsSubmitting } = useProfileForm();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: getInitialAddress(null),
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        address: getInitialAddress(user.address),
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (['street', 'city', 'state', 'postalCode', 'country'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!user) return;

      setIsSubmitting(true);
      try {
        const updatedUser = await updateUserProfile(user.id, formData);
        setUser(updatedUser);
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [user, formData, setUser, setIsSubmitting],
  );

  useEffect(() => {
    setSubmit(handleSubmit);
  }, [handleSubmit, setSubmit]);

  const profileFormConfig = getProfileFormConfig(user);

  return (
    <form className="flex flex-col divide-y divide-neutral-200" onSubmit={handleSubmit}>
      {profileFormConfig.map((item, index) => (
        <div className="flex gap-3 py-6 first-of-type:pt-0" key={index}>
          <BaseText variant="text-semibold" className="flex-1">
            {item.label}
          </BaseText>
          <div className="flex flex-3 gap-3">
            {item.fields.map((field) => (
              <div className="flex-1" key={field.name}>
                <BaseInput
                  name={field.name}
                  readOnly={!item.editable}
                  placeholder={field.placeholder}
                  value={
                    item.editable
                      ? formData[field.name as keyof typeof formData]
                      : 'value' in field
                        ? field.value
                        : ''
                  }
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-3 py-6">
        <BaseText variant="text-semibold" className="flex-1">
          Address
        </BaseText>
        <div className="flex flex-3 flex-col gap-3">
          <div className="flex gap-3">
            <BaseInput
              name="country"
              placeholder="Country"
              value={formData.address.country}
              onChange={handleInputChange}
              className="flex-1"
            />
            <BaseInput
              name="street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleInputChange}
              className="flex-2"
            />
          </div>
          <div className="flex gap-3">
            <BaseInput
              name="state"
              placeholder="State / Province"
              value={formData.address.state || ''}
              onChange={handleInputChange}
              className="flex-1"
            />
            <BaseInput
              name="city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleInputChange}
              className="flex-1"
            />

            <BaseInput
              name="postalCode"
              placeholder="Postal Code"
              value={formData.address.postalCode}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
