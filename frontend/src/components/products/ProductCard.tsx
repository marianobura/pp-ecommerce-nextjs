import Link from 'next/link';
import BaseText from '@/components/BaseText';
import { Star } from 'lucide-react';
import { ProductButton } from '@/components/products/ProductButton';
import { Product } from '@/types/product';

export default function ProductCard({ product }: { product: Product }) {
  const discountedPrice = (
    product.price *
    (1 - Math.round(product.discountPercentage) / 100)
  ).toFixed(2);
  const fillStars = Math.round(product.rating || 0);

  return (
    <Link
      key={product?.id}
      href={`/products/${product?.id}`}
      className="group flex flex-col overflow-hidden rounded-4xl border border-neutral-300"
    >
      <div
        className={`flex aspect-square bg-neutral-100 p-12 ${product?.discountPercentage < 12 ? '' : 'relative'}`}
      >
        {product?.discountPercentage > 12 && (
          <div className="bg-esona absolute top-3 left-3 flex size-12 items-center justify-center rounded-4xl text-white">
            <BaseText variant="text-semibold">{product?.discountPercentage.toFixed()}%</BaseText>
          </div>
        )}
        <img
          src={product?.thumbnail}
          alt={product?.title}
          className="aspect-square w-full transition-transform group-hover:scale-125"
        />
      </div>
      <div className="flex h-full flex-col justify-between gap-4 p-3">
        <div className="flex flex-col gap-2">
          <BaseText variant="h2" className="text-lg font-semibold">
            {product?.title}
          </BaseText>
          <div className="flex gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={20}
                  fill={index < fillStars ? 'currentColor' : 'none'}
                  className="text-esona"
                />
              ))}
            </div>
            <BaseText variant="text">{`(${product?.stock * 2})`}</BaseText>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {product?.discountPercentage < 12 ? (
            <BaseText variant="h3">${product?.price}</BaseText>
          ) : (
            <div className="flex items-center gap-2">
              <BaseText variant="h3">${discountedPrice}</BaseText>
              <BaseText variant="text" className="text-neutral-500 line-through">
                ${product?.price}
              </BaseText>
            </div>
          )}
          <ProductButton key={product.id} product={product} />
        </div>
      </div>
    </Link>
  );
}
