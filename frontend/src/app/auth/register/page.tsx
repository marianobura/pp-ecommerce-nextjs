import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/BaseInput';
import BaseText from '@/components/BaseText';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <>
      <div className="mb-4 flex flex-col gap-2 border-b border-neutral-200 px-6 pb-4">
        <div className="flex items-center justify-between gap-12">
          <BaseText variant="h2">Create an account</BaseText>
          <Logo className="h-auto w-32 shrink-0" />
        </div>
        <BaseText variant="small">
          If you already have an account, you can{' '}
          <Link href="/auth/login" className="text-esona underline">
            sign in here
          </Link>
          .
        </BaseText>
      </div>
      <BaseInput
        label="Name"
        type="text"
        placeholder="Enter your full name"
        className="mb-4 px-6"
      />
      <BaseInput label="Email" type="email" placeholder="Enter your email" className="mb-4 px-6" />
      <BaseInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        className="mb-4 px-6"
        password
      />
      <BaseInput
        label="Confirm password"
        type="password"
        placeholder="Confirm your password"
        className="mb-4 px-6"
        password
      />
      <div className="px-6">
        <BaseButton variant="primary" className="w-full">
          Create account
        </BaseButton>
      </div>
    </>
  );
}
