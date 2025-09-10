import { getCategories, getProducts } from '@/services/products';
import ProductsClient from '@/components/products/ProductsClient';

export default async function ProductsPage() {
  const products = await getProducts(100);
  const categories = await getCategories();

  return <ProductsClient products={products} categories={categories} />;
}
