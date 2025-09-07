import { Product } from '@/types/product';

const BASE_URL = 'https://dummyjson.com';

export async function getProducts(limit = 0): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}`, {
      cache: 'no-store',
    });

    const data = await res.json();
    return data.products;
  } catch (error) {
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    return res.json();
  } catch (error) {
    return null;
  }
}
