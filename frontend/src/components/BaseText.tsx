import React, { JSX } from 'react';
import clsx from 'clsx';

type Variant = 'h1' | 'h2' | 'h3' | 'text-semibold' | 'text' | 'button-bold' | 'button';

interface BaseTextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

export default function BaseText({
  variant = 'text',
  className,
  children,
  ...props
}: BaseTextProps) {
  const Tag: keyof JSX.IntrinsicElements = (() => {
    switch (variant) {
      case 'h1':
        return 'h1';
      case 'h2':
        return 'h2';
      case 'h3':
        return 'h3';
      case 'text-semibold':
        return 'p';
      case 'text':
        return 'p';
      case 'button-bold':
        return 'span';
      case 'button':
        return 'span';
      default:
        return 'p';
    }
  })();

  const baseClasses = (() => {
    switch (variant) {
      case 'h1':
        return 'font-title text-2xl font-bold md:text-3xl';
      case 'h2':
        return 'font-subtitle text-xl font-bold md:text-2xl';
      case 'h3':
        return 'font-subtitle text-lg font-semibold md:text-xl';
      case 'text-semibold':
        return 'font-body text-sm font-semibold md:text-base';
      case 'text':
        return 'font-body text-sm font-normal md:text-base';
      case 'button-bold':
        return 'font-button text-sm font-semibold';
      case 'button':
        return 'font-button text-sm font-medium';
      default:
        return 'font-body text-sm font-normal md:text-base';
    }
  })();

  return (
    <Tag className={clsx(baseClasses, className)} {...props}>
      {children}
    </Tag>
  );
}
