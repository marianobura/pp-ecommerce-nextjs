'use client';

import { useCallback, useEffect, useState } from 'react';
import BaseInput from '@/components/base/BaseInput';
import UpdateInput from '@/components/pages/profile/UpdateInput';
import { useUser } from '@/context/UserContext';
import { updateUserProfile } from '@/services/user';
import { useProfileForm } from '@/context/ProfileFormContext';

export default function PasswordPage() {
  const { user, setUser } = useUser();
  const { setSubmit, setIsSubmitting } = useProfileForm();

  const [formData, setFormData] = useState({
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        password: user.password || '',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    <UpdateInput title="New Password">
      <div className="flex flex-3 gap-3">
        <div className="flex-1">
          <BaseInput
            type="password"
            name="password"
            placeholder="Add a new password"
            password
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </UpdateInput>
  );
}
