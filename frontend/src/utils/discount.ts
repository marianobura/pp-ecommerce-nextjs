import { Product } from '@/types/product';

/**
 * Calcula el precio con descuento aplicado.
 */
export function getDiscountedPrice(product: Product): string {
  const discounted = product.price * (1 - Math.round(product.discountPercentage) / 100);
  return discounted.toFixed(2);
}

/**
 * Verifica si un producto tiene un descuento válido (ej: mayor a 12%).
 */
export function hasValidDiscount(product: Product, minDiscount = 12): boolean {
  return product.discountPercentage > minDiscount;
}
