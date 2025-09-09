'use client';

import BaseText from '@/components/BaseText';
import ProductCard from '@/components/products/ProductCard';
import ProductFilter from '@/components/products/ProductFilter';
import { useState } from 'react';

export default function ProductsClient({
  products,
  categories,
}: {
  products: any[];
  categories: any[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategory = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
  };

  const resetCategory = () => {
    setSelectedCategory(null);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="container pt-16 pb-4">
      <div className="flex">
        <div className="border-r border-neutral-200">
          <ProductFilter
            categories={categories}
            onSelectCategory={handleCategory}
            resetCategory={resetCategory}
            selectedCategory={selectedCategory}
          />
        </div>
        <div className="ml-8 flex flex-1 flex-col gap-4">
          <div className="flex items-center justify-between">
            <BaseText variant="h2">{`Product List (${filteredProducts.length})`}</BaseText>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
