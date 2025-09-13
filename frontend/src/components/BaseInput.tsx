import { Eye } from 'lucide-react';
import BaseText from './BaseText';

export default function BaseInput({
  label,
  type = 'text',
  placeholder,
  className = '',
  password,
}: {
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  password?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <label className="block">
        <BaseText variant="text-semibold">{label}</BaseText>
      </label>
      <div className={`${password ? 'relative' : 'block'}`}>
        <input
          type={type}
          placeholder={placeholder}
          className="focus:border-esona focus:ring-esona font-body w-full rounded-4xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 transition placeholder:text-neutral-400 focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400"
        />
        {password && (
          <Eye
            size={32}
            className="hover:text-esona absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full p-1 text-neutral-600 transition-colors"
          />
        )}
      </div>
    </div>
  );
}
