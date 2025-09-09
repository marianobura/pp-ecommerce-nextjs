import BaseButton from '@/components/BaseButton';
import BaseText from '@/components/BaseText';
import Navbar from '@/components/Navbar';
import Hero from '@/components/icons/Hero';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { getCategories } from '@/services/products';

export default async function Home() {
  const categories = await getCategories();

  return (
    <>
      <Navbar />
      <main className="container pt-1 pb-3">
        <div className="relative flex h-[600px] flex-col justify-center rounded-4xl bg-neutral-100 p-12">
          <Hero className="absolute right-32 bottom-0 h-[500px]" />
          <BaseText variant="h1" className="line-clamp-2 max-w-[700px] text-balance">
            Everything You Need, All in <span className="text-esona leading-18">One Place</span>
          </BaseText>
          <BaseText variant="text" className="max-w-[500px] text-pretty">
            Discover a wide range of products at unbeatable prices. From electronics to fashion, we
            have it all. Shop now and experience the convenience of one-stop shopping!
          </BaseText>
          <BaseButton variant="primary" href="/products" className="mt-6 w-fit">
            Explore More
          </BaseButton>
        </div>
        <div className="no-scrollbar mt-4 flex w-full gap-4 overflow-auto">
          {categories.map((category) => (
            <Link
              href={`/category/${category.slug}`}
              key={category.slug}
              className="flex min-w-96 flex-col gap-4 rounded-4xl bg-neutral-100 p-3"
            >
              <div className="h-32 w-full rounded-3xl bg-neutral-200"></div>
              <div className="flex justify-between gap-8 p-3">
                <BaseText variant="h2" className="truncate whitespace-nowrap">
                  {category.name}
                </BaseText>
                <MoveRight size={24} />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
