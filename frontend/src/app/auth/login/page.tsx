'use client';

import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/BaseInput';
import BaseText from '@/components/BaseText';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log({ email, password });
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <BaseInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          className="mb-4 px-6"
          id="password"
          autoComplete="current-password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          password
        />
        <div className="px-6">
          <BaseButton type="submit" variant="primary" className="w-full">
            Sign in
          </BaseButton>
        </div>
      </form>
    </>
  );
}
