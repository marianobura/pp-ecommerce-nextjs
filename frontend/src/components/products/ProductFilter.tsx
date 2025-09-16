import BaseText from '@/components/BaseText';
import { Check, Plus, RotateCcw } from 'lucide-react';
import { Category } from '@/types/category';

const PRICE_STEP = 1000;
const PRICE_MIN_GAP = 5000;

export default function ProductFilter({
  categories,
  onSelectCategory,
  selectedCategory,
  selectedPrice,
  onChangePrice,
  selectedRating,
  onSelectRating,
  selectedDiscount,
  onToggleDiscount,
  availableRatings,
  minPrice,
  maxPrice,
}: {
  categories: Category[];
  onSelectCategory: (slug: string | null) => void;
  selectedCategory: string | null;
  selectedPrice: [number, number];
  onChangePrice: (range: [number, number]) => void;
  selectedRating: number | null;
  onSelectRating: (rating: number) => void;
  selectedDiscount: boolean;
  onToggleDiscount: () => void;
  availableRatings: number[];
  minPrice: number;
  maxPrice: number;
}) {
  const hasActiveFilters =
    selectedCategory ||
    selectedRating ||
    selectedDiscount ||
    selectedPrice[0] !== minPrice ||
    selectedPrice[1] !== maxPrice;

  const handleMinChange = (val: number) => {
    onChangePrice([Math.min(val, selectedPrice[1] - PRICE_MIN_GAP), selectedPrice[1]]);
  };

  const handleMaxChange = (val: number) => {
    onChangePrice([selectedPrice[0], Math.max(val, selectedPrice[0] + PRICE_MIN_GAP)]);
  };

  return (
    <div className="sticky top-8 w-64">
      <div className="flex flex-col gap-4">
        <div className="mr-8 flex items-center justify-between">
          <BaseText variant="h2">Filter by</BaseText>
          {hasActiveFilters && (
            <div
              className="hover:text-primary cursor-pointer rounded-4xl bg-neutral-100 p-2 transition-colors"
              onClick={() => {
                onSelectCategory(null);
                onSelectRating(0);
                if (selectedDiscount) onToggleDiscount();
                onChangePrice([minPrice, maxPrice]);
              }}
            >
              <RotateCcw size={16} />
            </div>
          )}
        </div>
        <div className="flex border-spacing-y-2 flex-col divide-y divide-neutral-200">
          <details className="group/details">
            <summary className="mr-8 flex cursor-pointer items-center justify-between pb-2">
              <BaseText variant="text-semibold">Category</BaseText>
              <Plus size={16} className="transition-transform group-open/details:rotate-45" />
            </summary>
            <div className="mr-8 flex flex-col gap-1 pb-4">
              {categories.map((category) => {
                const isActive = selectedCategory === category.slug;
                return (
                  <div
                    key={category.slug}
                    onClick={() => onSelectCategory(category.slug)}
                    className={`group/item flex cursor-pointer items-center gap-2 transition-colors ${
                      isActive ? 'text-primary font-semibold' : 'hover:text-primary text-foreground'
                    }`}
                  >
                    <div
                      className={`flex size-4 items-center justify-center rounded-4xl border transition-colors ${
                        isActive
                          ? 'border-primary bg-primary'
                          : 'group-hover/item:border-primary border-neutral-700'
                      }`}
                    >
                      {isActive && <Check size={12} strokeWidth={3} className="text-white" />}
                    </div>
                    <BaseText variant="small">{category.name}</BaseText>
                  </div>
                );
              })}
            </div>
          </details>
          <details className="group/details pt-2">
            <summary className="mr-8 flex cursor-pointer items-center justify-between pb-2">
              <BaseText variant="text-semibold">Price</BaseText>
              <Plus size={16} className="transition-transform group-open/details:rotate-45" />
            </summary>
            <div className="mr-8 pb-4">
              <div className="flex flex-col gap-2">
                <div className="relative mt-2 h-6 w-full">
                  <div className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 rounded bg-neutral-200" />
                  <div
                    className="bg-primary absolute top-1/2 h-1 -translate-y-1/2 rounded"
                    style={{
                      left: `${((selectedPrice[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                      right: `${100 - ((selectedPrice[1] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                    }}
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    step={PRICE_STEP}
                    value={selectedPrice[0]}
                    onChange={(e) => handleMinChange(Number(e.target.value))}
                    className="range-thumb pointer-events-none absolute h-6 w-full appearance-none bg-transparent focus-visible:outline-none"
                    style={{ zIndex: selectedPrice[0] > maxPrice - PRICE_MIN_GAP ? 5 : 3 }}
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    step={PRICE_STEP}
                    value={selectedPrice[1]}
                    onChange={(e) => handleMaxChange(Number(e.target.value))}
                    className="range-thumb pointer-events-none absolute h-6 w-full appearance-none bg-transparent focus-visible:outline-none"
                    style={{ zIndex: 4 }}
                  />
                </div>
                <div className="flex justify-between">
                  {[0, 1].map((i) => (
                    <div key={i} className="rounded-4xl bg-neutral-100 px-3 py-1">
                      <BaseText variant="small">${selectedPrice[i].toFixed()}</BaseText>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </details>
          <details className="group/details pt-2">
            <summary className="mr-8 flex cursor-pointer items-center justify-between pb-2">
              <BaseText variant="text-semibold">Rating</BaseText>
              <Plus size={16} className="transition-transform group-open/details:rotate-45" />
            </summary>
            <div className="mr-8 flex flex-col gap-2 pb-4">
              {availableRatings.map((rating) => {
                const isActive = selectedRating === rating;
                return (
                  <div
                    key={rating}
                    onClick={() => onSelectRating(rating)}
                    className={`group/item flex cursor-pointer items-center gap-2 transition-colors ${
                      isActive ? 'text-primary font-semibold' : 'hover:text-primary text-foreground'
                    }`}
                  >
                    <div
                      className={`flex size-4 items-center justify-center rounded-4xl border transition-colors ${
                        isActive
                          ? 'border-primary bg-primary'
                          : 'group-hover/item:border-primary border-neutral-700'
                      }`}
                    >
                      {isActive && <Check size={12} strokeWidth={3} className="text-white" />}
                    </div>
                    <BaseText variant="small">{`${rating} stars`}</BaseText>
                  </div>
                );
              })}
            </div>
          </details>
          <details className="group/details pt-2">
            <summary className="mr-8 flex cursor-pointer items-center justify-between pb-2">
              <BaseText variant="text-semibold">Discount</BaseText>
              <Plus size={16} className="transition-transform group-open/details:rotate-45" />
            </summary>
            <div className="mr-8 flex flex-col gap-2 pb-4">
              <div
                onClick={onToggleDiscount}
                className={`group/item flex cursor-pointer items-start gap-2 transition-colors ${
                  selectedDiscount
                    ? 'text-primary font-semibold'
                    : 'hover:text-primary text-foreground'
                }`}
              >
                <div
                  className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-4xl border transition-colors ${
                    selectedDiscount
                      ? 'border-primary bg-primary'
                      : 'group-hover/item:border-primary border-neutral-700'
                  }`}
                >
                  {selectedDiscount && <Check size={12} strokeWidth={3} className="text-white" />}
                </div>
                <BaseText variant="small">Only show products with discount</BaseText>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
