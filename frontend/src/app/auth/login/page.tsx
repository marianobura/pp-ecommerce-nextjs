'use client';

import BaseButton from '@/components/base/BaseButton';
import BaseInput from '@/components/base/BaseInput';
import BaseText from '@/components/base/BaseText';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { CircleAlert } from 'lucide-react';

export default function LoginPage() {
  const { login, error, clearError, loading } = useUser();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
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
          <BaseText variant="h2">Sign in</BaseText>
          <Logo className="h-8 w-auto shrink-0" />
        </div>
        <BaseText variant="small" className="text-foreground">
          If you don't have an account, you can{' '}
          <Link href="/auth/register" className="text-primary underline">
            register here
          </Link>
          .
        </BaseText>
      </div>
      <form onSubmit={submitHandler}>
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
          autoComplete="current-password"
          onChange={handleInputChange(setPassword)}
          password
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
            {loading ? 'Signing in...' : 'Sign in'}
          </BaseButton>
        </div>
      </form>
    </>
  );
}
