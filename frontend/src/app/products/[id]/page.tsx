import BaseButton from '@/components/BaseButton';
import BaseText from '@/components/BaseText';
import { Star } from 'lucide-react';

type Product = {
  id: number;
  title: string;
  price: number;
  brand: string;
  description: string;
  images: string[];
  stock: number;
  rating: number;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
};

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products?limit=10');
  const data = await res.json();
  return data.products;
}

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="grid h-[calc(100vh-72px)] grid-rows-[1fr_auto]">
      <div className="container flex items-center justify-center">
        <div className="grid grid-cols-2 items-center justify-center gap-4">
          <div className="aspect-square overflow-hidden rounded-4xl bg-neutral-100">
            <img src={product.images[0]} alt={product.title} />
          </div>
          <div className="flex h-full max-h-[640px] flex-col justify-between gap-16 overflow-hidden">
            <div className="flex flex-col gap-2">
              <BaseText variant="text-semibold" className="text-esona">
                {product.brand}
              </BaseText>
              <BaseText variant="h1">{product.title}</BaseText>
              <BaseText variant="text">{product.description}</BaseText>
            </div>
            <div className="flex flex-col gap-4 overflow-hidden">
              <div className="flex gap-2">
                <div className="bg-esona/10 text-esona flex items-center gap-2 rounded-4xl px-4 py-2">
                  <Star size={24} fill="currentColor" />
                  <BaseText variant="h3">{product.rating} / 5</BaseText>
                </div>
                <div className="flex items-center gap-2 rounded-4xl border border-neutral-200 px-4 py-2">
                  <BaseText variant="h3">{product.stock} in stock</BaseText>
                </div>
              </div>
              <div className="no-scrollbar overflow-y-scroll rounded-4xl bg-neutral-100">
                <div className="m-4 flex flex-col gap-2 overflow-hidden rounded-3xl">
                  {product.reviews.map((review, index) => (
                    <div className="h-fit w-full rounded-lg bg-white p-4" key={index}>
                      <div className="flex items-center gap-2">
                        <BaseText variant="text-semibold">{review.reviewerName}</BaseText>
                        <div className="bg-esona/10 text-esona flex items-center gap-1 rounded-4xl px-3 py-1">
                          <Star size={16} fill="currentColor" />
                          <BaseText variant="text">{review.rating} / 5</BaseText>
                        </div>
                      </div>
                      <BaseText variant="text" className="mt-2">
                        {review.comment}
                      </BaseText>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="border-t border-neutral-200">
          <div className="container flex">
            <div className="border-r border-neutral-200 p-10 pl-0">
              <BaseText variant="text-semibold">Order Summary</BaseText>
            </div>
            <div className="flex grow items-center justify-between gap-8 pl-10">
              <div className="flex flex-col">
                <BaseText variant="h3">{product.title}</BaseText>
                <div className="flex gap-2 text-neutral-500">
                  <BaseText variant="text">{product.shippingInformation}</BaseText>•
                  <BaseText variant="text">{product.warrantyInformation}</BaseText>•
                  <BaseText variant="text">{product.returnPolicy}</BaseText>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <BaseText variant="h3" className="text-esona">
                  ${product.price}
                </BaseText>
                <BaseButton variant="primary">Add to Cart</BaseButton>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
