'use client';

import BaseText from '@/components/common/BaseText';
import ProductCard from '@/components/pages/products/ProductCard';
import ProductFilter from '@/components/pages/products/ProductFilter';
import { hasValidDiscount } from '@/utils/discount';
import { useMemo, useState } from 'react';

export default function ProductsClient({
  products,
  categories,
}: {
  products: any[];
  categories: any[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedDiscount, setSelectedDiscount] = useState(false);

  const availableRatings = useMemo(() => {
    const unique = new Set(products.map((p) => Math.round(p.rating)));
    return Array.from(unique).sort((a, b) => a - b);
  }, [products]);

  const { minPrice, maxPrice } = useMemo(() => {
    const prices = products.map((p) => p.price);
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices)),
    };
  }, [products]);
  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([minPrice, maxPrice]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) return false;
      if (product.price < selectedPrice[0] || product.price > selectedPrice[1]) return false;
      if (selectedRating && Math.round(product.rating) !== selectedRating) return false;
      if (selectedDiscount && !hasValidDiscount(product)) return false;

      return true;
    });
  }, [products, selectedCategory, selectedPrice, selectedRating, selectedDiscount]);

  return (
    <div className="container pt-8 pb-4 md:pt-16">
      <div className="flex">
        <div className="border-r border-neutral-200">
          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(slug) =>
              setSelectedCategory(selectedCategory === slug ? null : slug)
            }
            selectedPrice={selectedPrice}
            onChangePrice={setSelectedPrice}
            selectedRating={selectedRating}
            onSelectRating={(rating) =>
              setSelectedRating(selectedRating === rating ? null : rating)
            }
            selectedDiscount={selectedDiscount}
            onToggleDiscount={() => setSelectedDiscount((prev) => !prev)}
            availableRatings={availableRatings}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
        <div className="ml-4 flex flex-1 flex-col gap-4 md:ml-8">
          <div className="flex items-center justify-between">
            <BaseText variant="h2">{`Product List (${filteredProducts.length})`}</BaseText>
          </div>
          <div className="xs:grid-cols-2 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
