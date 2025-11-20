import BaseText from '@/components/base/BaseText';

type UpdateInputProps = {
  children: React.ReactNode;
  title: string;
  className?: string;
};

export default function UpdateInput({ children, title, className = '' }: UpdateInputProps) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <BaseText variant="text-semibold" className="flex-1">
        {title}
      </BaseText>
      {children}
    </div>
  );
}
