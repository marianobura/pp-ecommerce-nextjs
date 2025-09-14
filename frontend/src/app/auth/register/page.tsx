'use client';

import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/BaseInput';
import BaseText from '@/components/BaseText';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log({ name, email, password, confirmPassword });
  };

  return (
    <>
      <div className="mb-4 flex flex-col gap-2 border-b border-neutral-200 px-6 pb-4">
        <div className="flex items-center justify-between gap-12">
          <BaseText variant="h2">Create an account</BaseText>
          <Logo className="h-8 w-auto shrink-0" />
        </div>
        <BaseText variant="small">
          If you already have an account, you can{' '}
          <Link href="/auth/login" className="text-esona underline">
            sign in here
          </Link>
          .
        </BaseText>
      </div>
      <form onSubmit={submitHandler}>
        <BaseInput
          label="Name"
          type="text"
          placeholder="Enter your full name"
          className="mb-4 px-6"
          id="name"
          autoComplete="name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
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
          autoComplete="new-password"
          password
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <BaseInput
          label="Confirm password"
          type="password"
          placeholder="Confirm your password"
          className="mb-4 px-6"
          id="confirm-password"
          password
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
        />
        <div className="px-6">
          <BaseButton type="submit" variant="primary" className="w-full">
            Create account
          </BaseButton>
        </div>
      </form>
    </>
  );
}
