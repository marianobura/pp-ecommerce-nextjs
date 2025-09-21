import { Product } from '@/types/product';

/**
 * Calculates the discounted price of a product.
 */
export function getDiscountedPrice(product: Product): string {
  const discounted = product.price * (1 - Math.round(product.discountPercentage) / 100);
  return discounted.toFixed(2);
}

/**
 * Checks if a product has a valid discount greater than the specified minimum.
 */
export function hasValidDiscount(product: Product, minDiscount = 12): boolean {
  return product.discountPercentage > minDiscount;
}
