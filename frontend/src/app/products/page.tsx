import BaseText from '@/components/BaseText';
import { getProducts } from '@/services/products';
import ProductCard from '@/components/products/ProductCard';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container pt-16 pb-4">
      <div className="flex">
        <div className="border-r border-neutral-200 pr-8">
          <div className="sticky top-8 h-[600px] w-64 bg-neutral-100"></div>
        </div>
        <div className="ml-8 flex flex-1 flex-col gap-4">
          <div className="flex items-center justify-between">
            <BaseText variant="h2">{`Product List (${products.length})`}</BaseText>
            <div className="flex gap-2">
              <div className="h-12 w-32 rounded-4xl bg-neutral-100"></div>
              <div className="h-12 w-32 rounded-4xl bg-neutral-100"></div>
              <div className="h-12 w-32 rounded-4xl bg-neutral-100"></div>
              <div className="h-12 w-32 rounded-4xl bg-neutral-100"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
