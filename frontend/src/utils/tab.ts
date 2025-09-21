import { Product } from '@/types/product';
import { getProducts, getProductsByQuery } from '@/services/products';

let allProductsCached: Product[] | null = null;
let bestSellingCached: Product[] | null = null;
let mostPopularCached: Product[] | null = null;

/**
 * Gets 8 products (all).
 */
export async function getAllProducts(): Promise<Product[]> {
  if (allProductsCached) return allProductsCached;

  allProductsCached = await getProducts({ limit: 8 });
  return allProductsCached;
}

/**
 * Gets the 8 best-selling products.
 */
export async function getBestSellingProducts(): Promise<Product[]> {
  if (bestSellingCached) return bestSellingCached;
  bestSellingCached = await getProductsByQuery('?limit=8&sortBy=stock&order=desc');

  return bestSellingCached;
}

/**
 * Gets the 8 most popular products.
 */
export async function getMostPopularProducts(): Promise<Product[]> {
  if (mostPopularCached) return mostPopularCached;
  mostPopularCached = await getProductsByQuery('?limit=8&sortBy=rating&order=desc');

  return mostPopularCached;
}
