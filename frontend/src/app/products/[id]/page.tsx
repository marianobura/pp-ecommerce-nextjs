import BaseText from '@/components/BaseText';
import { Star } from 'lucide-react';
import { getProduct } from '@/services/products';
import { ProductButton } from '@/components/products/ProductButton';
import { getDiscountedPrice, hasValidDiscount } from '@/utils/discount';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  const discountedPrice = product ? getDiscountedPrice(product) : null;

  return (
    <>
      <main className="container flex flex-col justify-center">
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-2 items-center justify-center gap-4">
            <div className="flex h-full items-center justify-center overflow-hidden rounded-4xl bg-neutral-100">
              <img src={product?.images[0]} alt={product?.title} className="aspect-square" />
            </div>
            <div className="flex h-full max-h-[640px] flex-col justify-between gap-16 overflow-hidden">
              <div className="flex flex-col gap-2">
                <BaseText variant="text-semibold" className="text-primary">
                  {product?.brand}
                </BaseText>
                <BaseText variant="h1">{product?.title}</BaseText>
                <BaseText variant="text">{product?.description}</BaseText>
              </div>
              <div className="flex flex-col gap-4 overflow-hidden">
                <div className="flex gap-2">
                  <div className="bg-primary/10 text-primary flex items-center gap-2 rounded-4xl px-4 py-2">
                    <Star size={24} fill="currentColor" />
                    <BaseText variant="h3">{product?.rating} / 5</BaseText>
                  </div>
                  <div className="flex items-center gap-2 rounded-4xl border border-neutral-200 px-4 py-2">
                    <BaseText variant="h3">{product?.stock} in stock</BaseText>
                  </div>
                </div>
                <div className="overflow-y-auto rounded-4xl pr-2">
                  <div className="flex flex-col gap-2 overflow-hidden rounded-4xl">
                    {product?.reviews.map((review, index) => (
                      <div className="h-fit w-full rounded-lg bg-neutral-100 p-4" key={index}>
                        <div className="flex items-center gap-2">
                          <BaseText variant="text-semibold">{review.reviewerName}</BaseText>
                          <div className="bg-primary/10 text-primary flex items-center gap-1 rounded-4xl px-3 py-1">
                            <Star size={16} fill="currentColor" />
                            <BaseText variant="text">{review.rating} / 5</BaseText>
                          </div>
                        </div>
                        <BaseText variant="text" className="mt-2">
                          {review.comment}
                        </BaseText>
                      </div>
                    ))}
                    {product?.reviews.map((review, index) => (
                      <div className="h-fit w-full rounded-lg bg-neutral-100 p-4" key={index}>
                        <div className="flex items-center gap-2">
                          <BaseText variant="text-semibold">{review.reviewerName}</BaseText>
                          <div className="bg-primary/10 text-primary flex items-center gap-1 rounded-4xl px-3 py-1">
                            <Star size={16} fill="currentColor" />
                            <BaseText variant="text">{review.rating} / 5</BaseText>
                          </div>
                        </div>
                        <BaseText variant="text" className="mt-2">
                          {review.comment}
                        </BaseText>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-neutral-200">
        <div className="container flex">
          <div className="border-r border-neutral-200 p-10 pl-0">
            <BaseText variant="text-semibold">Order Summary</BaseText>
          </div>
          <div className="flex grow items-center justify-between gap-8 pl-10">
            <div className="flex flex-col">
              <BaseText variant="h3">{product?.title}</BaseText>
              <div className="flex gap-2">
                <BaseText variant="text">{product?.shippingInformation}</BaseText>•
                <BaseText variant="text">{product?.warrantyInformation}</BaseText>•
                <BaseText variant="text">{product?.returnPolicy}</BaseText>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {product && hasValidDiscount(product) ? (
                <div className="flex flex-col items-end">
                  <BaseText variant="h3" className="text-primary">
                    ${discountedPrice}
                  </BaseText>
                  <BaseText variant="text" className="line-through">
                    ${product?.price}
                  </BaseText>
                </div>
              ) : (
                <BaseText variant="h3" className="text-primary">
                  ${product?.price}
                </BaseText>
              )}
              {product && <ProductButton product={product} />}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
