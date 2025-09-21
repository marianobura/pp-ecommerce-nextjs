'use client';

import BaseText from '@/components/BaseText';
import BaseButton from '@/components/BaseButton';
import { Product } from '@/types/product';
import { useState, useEffect } from 'react';
import { getAllProducts, getBestSellingProducts, getMostPopularProducts } from '@/utils/tab';
import ProductCard from '@/components/products/ProductCard';

export default function HomeTrendy() {
  const [activeTab, setActiveTab] = useState<'all' | 'best-seller' | 'top-rated'>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let products: Product[] = [];

      if (activeTab === 'all') {
        products = await getAllProducts();
      } else if (activeTab === 'best-seller') {
        products = await getBestSellingProducts();
      } else if (activeTab === 'top-rated') {
        products = await getMostPopularProducts();
      }

      setFilteredProducts(products);
      setLoading(false);
    }

    fetchProducts();
  }, [activeTab]);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'best-seller', label: 'Best seller' },
    { id: 'top-rated', label: 'Top rated' },
  ];

  return (
    <section className="container my-3 md:my-8 lg:my-16">
      <BaseText variant="h2" className="mb-3 text-center uppercase md:mb-6">
        Our trendy products
      </BaseText>
      <div className="mb-4 flex items-center justify-center gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`cursor-pointer border-b-3 px-3 py-1 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'text-foreground/60 hover:text-primary border-transparent'
            }`}
          >
            <BaseText variant="text-semibold" className="uppercase">
              {tab.label}
            </BaseText>
          </button>
        ))}
      </div>
      <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? [...Array(12)].map((_, index) => (
              <div className="group flex flex-col overflow-hidden" key={index}>
                <div className="flex aspect-square rounded-4xl bg-gray-200"></div>
                <div className="flex h-full flex-col justify-between gap-4 pt-3">
                  <div className="flex flex-col gap-2">
                    <div className="h-14 w-full rounded-4xl bg-gray-200 md:h-16"></div>
                    <div className="flex gap-2">
                      <div className="flex h-5 items-center gap-0.5 md:h-6">
                        <div className="h-5 w-28 rounded-4xl bg-gray-200 md:h-6"></div>
                      </div>
                      <div className="h-5 w-8 rounded-4xl bg-gray-200 md:h-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-7 w-12 rounded-4xl bg-gray-200"></div>
                    <div className="h-11 w-full rounded-4xl bg-gray-200 md:h-12"></div>
                  </div>
                </div>
              </div>
            ))
          : filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <div className="flex justify-center">
        <BaseButton variant="outline" href="/products" className="w-full sm:w-fit">
          View All Products
        </BaseButton>
      </div>
    </section>
  );
}
