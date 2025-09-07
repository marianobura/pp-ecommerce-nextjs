import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import BaseText from './BaseText';

type BaseButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  tag?: 'button' | 'link';
  className?: string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function BaseButton({
  children,
  variant = 'primary',
  className = '',
  href,
  ...props
}: BaseButtonProps) {
  const baseStyles =
    'rounded-full px-6 py-3 transition-colors text-center inline-flex items-center justify-center cursor-pointer';

  const variantStyles: Record<string, string> = {
    primary: 'bg-esona hover:bg-esona/90 text-white',
    secondary: 'bg-neutral-200 hover:bg-neutral-300',
    outline: 'border-2 border-esona text-esona hover:bg-esona/10',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        <BaseText variant="button-bold">{children}</BaseText>
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      <BaseText variant="button">{children}</BaseText>
    </button>
  );
}
