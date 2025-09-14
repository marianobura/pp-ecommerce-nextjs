'use client';

import { Eye, EyeOff } from 'lucide-react';
import BaseText from './BaseText';
import { useState } from 'react';

export default function BaseInput({
  label,
  id,
  type = 'text',
  placeholder,
  className = '',
  password,
  ...rest
}: {
  label?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  password?: boolean;
  [key: string]: any;
}) {
  const [inputType, setInputType] = useState(type);

  const handleTogglePassword = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {label && (
        <label htmlFor={id}>
          <BaseText variant="text-semibold">{label}</BaseText>
        </label>
      )}
      <div
        className={`focus-within:border-esona focus-within:ring-esona h-12 overflow-hidden rounded-4xl border border-neutral-200 transition focus-within:ring-1 ${password ? 'flex' : ''}`}
      >
        <input
          type={inputType}
          placeholder={placeholder}
          className="font-body size-full bg-white px-4 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
          id={id}
          {...rest}
        />
        {password && (
          <div className="flex aspect-square size-12 items-center justify-center">
            {inputType === 'password' ? (
              <Eye
                size={24}
                className="hover:text-esona cursor-pointer text-neutral-600 transition-colors select-none"
                onClick={handleTogglePassword}
              />
            ) : (
              <EyeOff
                size={24}
                className="hover:text-esona cursor-pointer text-neutral-600 transition-colors select-none"
                onClick={handleTogglePassword}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
