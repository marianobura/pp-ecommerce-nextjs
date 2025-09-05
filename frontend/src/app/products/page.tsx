import BaseText from '@/components/BaseText';
import Link from 'next/link';

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products?limit=0', { cache: 'no-cache' });
  const data = await res.json();
  return data.products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container py-3">
      <div className="w-full text-center">
        <BaseText variant="h2">Products Page</BaseText>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="border-esona/20 flex flex-col border"
          >
            <img
              src={product.thumbnail}
              alt={`Imagen de ${product.title}`}
              className="bg-esona/20 w-full object-none"
            />
            <div className="mt-2 flex grow flex-col justify-between gap-4 p-3 text-center">
              <BaseText variant="h3" className="line-clamp-1 truncate">
                {product.title}
              </BaseText>
              <BaseText variant="text">${product.price}</BaseText>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
