'use client';

import BaseInput from '@/components/base/BaseInput';
import { useUser } from '@/context/UserContext';
import { updateUserProfile } from '@/services/user';
import { useState, useEffect, useCallback } from 'react';
import { useProfileForm } from '@/context/ProfileFormContext';
import { getInitialAddress } from '@/utils/profile';
import UpdateInput from '@/components/pages/profile/UpdateInput';

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

  return (
    <form className="flex flex-col divide-y divide-neutral-200" onSubmit={handleSubmit}>
      <UpdateInput title="Name" className="pb-6">
        <div className="xs:flex-row flex flex-3 flex-col gap-3">
          <div className="flex-1">
            <BaseInput
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex-1">
            <BaseInput
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </UpdateInput>

      <UpdateInput title="Email Address" className="py-6">
        <div className="flex flex-3 gap-3">
          <div className="flex-1">
            <BaseInput
              name="email"
              placeholder="Email"
              readOnly
              value={user?.email || ''}
              className="text-neutral-500"
            />
          </div>
        </div>
      </UpdateInput>

      <UpdateInput title="Phone Number" className="py-6">
        <div className="flex flex-3 gap-3">
          <div className="flex-1">
            <BaseInput
              name="phone"
              placeholder="Add phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </UpdateInput>

      <UpdateInput title="Address" className="pt-6">
        <div className="flex flex-3 flex-col gap-3">
          <div className="xs:flex-row flex flex-col gap-3">
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
          <div className="xs:flex-row flex flex-col gap-3">
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
      </UpdateInput>
    </form>
  );
}
