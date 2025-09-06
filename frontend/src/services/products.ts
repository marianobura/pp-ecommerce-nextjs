import { Product } from "@/types/Product";

const BASE_URL = "https://dummyjson.com";

export async function getProducts(limit = 0): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`, {
    cache: "no-store",
  })

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  return data.products;
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json()
}