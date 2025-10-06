'use client';

import BaseInput from '@/components/base/BaseInput';
import BaseText from '@/components/base/BaseText';

export default function CheckoutInformationPage() {
  return (
    <>
      <BaseText variant="h3" className="mt-2 mb-2 h-8 md:mt-4 md:mb-4 lg:mt-8">
        Shipping Information
      </BaseText>
      <div className="flex flex-col gap-4">
        <BaseInput label="Full name" placeholder="Enter your full name" id="fullname" required />
        <BaseInput
          label="Email address"
          type="email"
          placeholder="Enter your email address"
          id="email"
          required
        />
        <BaseInput
          label="Phone number"
          type="tel"
          placeholder="Enter your phone number"
          id="phone"
          required
        />
        <BaseInput label="Country" placeholder="Enter your country" id="country" required />
        <div className="flex gap-4">
          <BaseInput
            label="City"
            placeholder="Enter your city"
            id="city"
            required
            className="flex-1"
          />
          <BaseInput
            label="State"
            placeholder="Enter your state"
            id="state"
            required
            className="flex-1"
          />
          <BaseInput
            label="ZIP code"
            placeholder="Enter your ZIP code"
            id="zip"
            required
            className="flex-1"
          />
        </div>
      </div>
    </>
  );
}
