import { getCategories, getProducts } from '@/services/products';
import ProductsClient from '@/components/pages/products/ProductsClient';

export default async function ProductsPage() {
  const products = await getProducts({ limit: 0 });
  const categories = await getCategories();

  return <ProductsClient products={products} categories={categories} />;
}
