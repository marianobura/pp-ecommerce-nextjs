'use client';

import BaseText from '@/components/BaseText';
import BaseButton from '@/components/BaseButton';
import { Product } from '@/types/product';
import { useState } from 'react';

export default function HomeTrendy({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState('all');

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);
  }

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'new-arrivals', label: 'New arrivals' },
    { id: 'best-seller', label: 'Best seller' },
    { id: 'top-rated', label: 'Top rated' },
  ];

  return (
    <section className="container py-8 md:py-16">
      <BaseText variant="h2" className="mb-3 text-center uppercase md:mb-6">
        Our trendy products
      </BaseText>
      <div className="mb-4 flex items-center justify-center gap-4">
        {tabs.map((tab) => {
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`cursor-pointer border-b-3 px-3 py-1 transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'text-foreground hover:text-primary border-transparent'}`}
            >
              <BaseText variant="text-semibold" className="uppercase">
                {tab.label}
              </BaseText>
            </button>
          );
        })}
      </div>
      <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="h-[400px] w-full bg-neutral-400"></div>
        ))}
      </div>
      <div className="flex justify-center">
        <BaseButton variant="primary" href="/products" className="w-full sm:w-fit">
          View All Products
        </BaseButton>
      </div>
    </section>
  );
}
