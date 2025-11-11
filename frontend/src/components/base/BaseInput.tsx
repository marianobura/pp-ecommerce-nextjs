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
  required,
  ...rest
}: {
  label?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  password?: boolean;
  required?: boolean;
  [key: string]: any;
}) {
  const [inputType, setInputType] = useState(type);

  const handleTogglePassword = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {label && (
        <label htmlFor={id} className={required ? 'flex gap-1' : ''}>
          <BaseText variant="text-semibold">{label}</BaseText>
          {required && (
            <BaseText variant="text-semibold" className="text-primary">
              *
            </BaseText>
          )}
        </label>
      )}
      <div
        className={`group h-12 overflow-hidden rounded-4xl border transition ${
          password ? 'flex' : ''
        } ${
          rest.readOnly || rest.disabled
            ? 'cursor-not-allowed border-neutral-100 bg-neutral-100'
            : 'focus-within:border-primary focus-within:ring-primary border-neutral-200 bg-white focus-within:ring-1'
        }`}
      >
        <input
          type={inputType}
          placeholder={placeholder}
          className="font-body size-full bg-transparent px-4 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 read-only:cursor-not-allowed disabled:cursor-not-allowed"
          id={id}
          {...rest}
        />
        {password && (
          <div className="flex aspect-square size-12 items-center justify-center">
            {inputType === 'password' ? (
              <Eye
                size={24}
                className="hover:text-primary cursor-pointer text-neutral-600 transition-colors select-none"
                onClick={handleTogglePassword}
              />
            ) : (
              <EyeOff
                size={24}
                className="hover:text-primary cursor-pointer text-neutral-600 transition-colors select-none"
                onClick={handleTogglePassword}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
