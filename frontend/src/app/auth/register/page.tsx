'use client';

import BaseButton from '@/components/base/BaseButton';
import BaseInput from '@/components/base/BaseInput';
import BaseText from '@/components/base/BaseText';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { CircleAlert } from 'lucide-react';

export default function RegisterPage() {
  const { register, error, clearError, loading } = useUser();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!firstName || !lastName || !email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      await register({ firstName, lastName, email, password });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const handleInputChange =
    (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      if (error) clearError();
      if (errorMessage) setErrorMessage(null);
    };

  return (
    <>
      <div className="mb-4 flex flex-col gap-2 border-b border-neutral-200 px-6 pb-4">
        <div className="flex items-center justify-between gap-12">
          <BaseText variant="h2">Create an account</BaseText>
          <Logo className="h-8 w-auto shrink-0" />
        </div>
        <BaseText variant="small" className="text-foreground">
          If you already have an account, you can{' '}
          <Link href="/auth/login" className="text-primary underline">
            sign in here
          </Link>
          .
        </BaseText>
      </div>

      <form onSubmit={submitHandler}>
        <div className="flex gap-4 px-6">
          <BaseInput
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            className="mb-4 flex-1"
            id="first-name"
            autoComplete="given-name"
            onChange={handleInputChange(setFirstName)}
          />
          <BaseInput
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            className="mb-4 flex-1"
            id="last-name"
            autoComplete="family-name"
            onChange={handleInputChange(setLastName)}
          />
        </div>

        <BaseInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          className="mb-4 px-6"
          id="email"
          autoComplete="email"
          onChange={handleInputChange(setEmail)}
        />

        <BaseInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          className="mb-4 px-6"
          id="password"
          autoComplete="new-password"
          onChange={handleInputChange(setPassword)}
        />

        <BaseInput
          label="Confirm password"
          type="password"
          placeholder="Confirm your password"
          className="mb-4 px-6"
          id="confirm-password"
          onChange={handleInputChange(setConfirmPassword)}
        />

        <div className="flex flex-col gap-2 px-6">
          {(errorMessage || error) && (
            <div className="flex gap-1">
              <CircleAlert size={16} className="text-primary" />
              <BaseText variant="small" className="text-primary">
                {errorMessage || error}
              </BaseText>
            </div>
          )}
          <BaseButton type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </BaseButton>
        </div>
      </form>
    </>
  );
}
