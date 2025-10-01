import BaseText from '@/components/base/BaseText';
import { Star } from 'lucide-react';
import { getProduct } from '@/services/products';
import { ProductButton } from '@/components/pages/products/ProductButton';
import { getDiscountedPrice, hasValidDiscount } from '@/utils/discount';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  const discountedPrice = product ? getDiscountedPrice(product) : null;

  return (
    <>
      <main className="container flex flex-col justify-center">
        <div className="my-3 flex items-center justify-center">
          <div className="grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2">
            <div className="flex h-full max-h-[500px] items-center justify-center overflow-hidden rounded-4xl bg-neutral-100 xl:max-h-[640px]">
              <img
                src={product?.images[0]}
                alt={product?.title}
                className="aspect-square h-full max-h-80 object-contain sm:max-h-[500px]"
              />
            </div>
            <div className="flex h-full max-h-[500px] flex-col justify-between gap-4 overflow-hidden md:gap-8 lg:gap-16 xl:max-h-[640px]">
              <div className="flex flex-col">
                <BaseText variant="text-semibold" className="text-primary">
                  {product?.brand}
                </BaseText>
                <BaseText variant="h1" className="mt-1 sm:mt-2">
                  {product?.title}
                </BaseText>
                <BaseText variant="text" className="mt-2">
                  {product?.description}
                </BaseText>
              </div>
              <div className="flex flex-col gap-2 overflow-hidden sm:gap-4">
                <div className="flex gap-2">
                  <div className="bg-primary/10 text-primary flex items-center gap-2 rounded-4xl px-4 py-2">
                    <Star size={24} fill="currentColor" />
                    <BaseText variant="h3">{product?.rating} / 5</BaseText>
                  </div>
                  <div className="flex items-center gap-2 rounded-4xl border border-neutral-200 px-4 py-2">
                    <BaseText variant="h3">{product?.stock} in stock</BaseText>
                  </div>
                </div>
                <div className="overflow-y-auto rounded-4xl">
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
        <div className="container flex flex-col sm:flex-row">
          <div className="flex items-center justify-center border-neutral-200 pt-5 sm:border-r sm:pr-5 sm:pb-5 lg:p-10">
            <BaseText variant="h3">Order Summary</BaseText>
          </div>
          <div className="items-left flex grow flex-col justify-between gap-2 py-3 sm:py-5 sm:pl-5 lg:pl-10 xl:flex-row xl:items-center">
            <div className="xs:pb-16 flex flex-col pb-28 sm:pb-0">
              <BaseText variant="text-semibold" className="text-center sm:text-left">
                Additional Information
              </BaseText>
              <div className="flex flex-wrap justify-center gap-1 sm:justify-start">
                <BaseText variant="text">{product?.shippingInformation}.</BaseText>
                <BaseText variant="text">{product?.warrantyInformation}.</BaseText>
                <BaseText variant="text">{product?.returnPolicy}.</BaseText>
              </div>
            </div>
            <div className="xs:flex-row xs:gap-4 fixed bottom-0 left-0 flex w-full flex-col items-center justify-center gap-2 border-t border-neutral-200 bg-white py-3 sm:static sm:justify-start sm:border-0 sm:py-0 xl:justify-end">
              {product && hasValidDiscount(product) ? (
                <div className="flex items-center gap-2 xl:flex-col xl:items-end xl:gap-0">
                  <BaseText variant="h3" className="text-primary">
                    ${discountedPrice}
                  </BaseText>
                  <BaseText variant="text" className="text-foreground/60 line-through">
                    ${product?.price}
                  </BaseText>
                </div>
              ) : (
                <BaseText variant="h3" className="text-primary">
                  ${product?.price}
                </BaseText>
              )}
              {product && <ProductButton product={product} className="xs:w-fit w-full" />}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
