'use client';

import { Plus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import BaseText from '@/components/base/BaseText';

interface AccordionItemProps {
  summary: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export default function AccordionItem({
  summary,
  children,
  defaultOpen = false,
  className,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, children]);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={toggleOpen}
        className="flex w-full cursor-pointer items-center justify-between pr-4 pb-2 md:pr-8"
      >
        <BaseText variant="text-semibold">{summary}</BaseText>
        <Plus className={`transition-transform ${isOpen ? 'rotate-45' : 'rotate-0'}`} size={16} />
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight }}
        className="overflow-hidden transition-[max-height] ease-out"
      >
        <div className="mr-4 pb-4 md:mr-8">{children}</div>
      </div>
    </div>
  );
}
