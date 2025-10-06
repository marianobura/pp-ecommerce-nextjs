import BaseText from '@/components/base/BaseText';
import Information from '@/components/pages/checkout/Information';
import Review from '@/components/pages/checkout/Review';

export default function CheckoutPage() {
  return (
    <div className="container flex h-full flex-col divide-y divide-neutral-200 md:flex-row md:divide-x md:divide-y-0 md:overflow-hidden">
      <div className="size-full pt-3 pb-4 md:pt-8 md:pr-8 lg:pt-16 lg:pr-16">
        <BaseText variant="h1">Checkout</BaseText>
        <Information />
      </div>
      <div className="size-full pt-3 pb-4 md:overflow-auto md:pt-20 md:pl-8 lg:pt-28 lg:pl-16">
        <Review />
      </div>
    </div>
  );
}
