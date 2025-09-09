import BaseText from '@/components/BaseText';
import { RotateCcw } from 'lucide-react';
import { Category } from '@/types/category';

export default function ProductFilter({
  categories,
  onSelectCategory,
  resetCategory,
  selectedCategory,
}: {
  categories: Category[];
  onSelectCategory: (categorySlug: string) => void;
  resetCategory: () => void;
  selectedCategory: string | null;
}) {
  return (
    <div className="sticky top-8 w-64">
      <div className="flex flex-col gap-4">
        <div className="mr-8 flex h-12 items-center gap-2">
          <BaseText variant="h2">Filter</BaseText>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-1 border-b border-neutral-200">
            <div className="mr-8 flex items-center justify-between">
              <BaseText variant="text-semibold">Category</BaseText>
              {selectedCategory && (
                <RotateCcw
                  size={16}
                  className="hover:text-esona cursor-pointer transition-colors"
                  onClick={resetCategory}
                />
              )}
            </div>
            <div className="mr-8 mb-8 ml-2 flex max-h-44 flex-col gap-0.5 overflow-y-scroll">
              {categories.map((category) => (
                <div
                  key={category.slug}
                  onClick={() => onSelectCategory(category.slug)}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category.slug
                      ? 'text-esona font-semibold'
                      : 'hover:text-esona text-neutral-700'
                  }`}
                >
                  <BaseText variant="small">{category.name}</BaseText>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
