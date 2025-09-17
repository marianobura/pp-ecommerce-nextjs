import BaseButton from '@/components/BaseButton';
import BaseText from '@/components/BaseText';
import Navbar from '@/components/Navbar';
import Hero from '@/components/icons/Hero';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { getCategories } from '@/services/products';
import Hero2 from '@/components/icons/Hero2';

export default async function Home() {
  const categories = await getCategories();

  return (
    <>
      <Navbar />
      <main className="container pt-1 pb-3">
        <div className="mt-8 flex gap-4 lg:mt-16">
          <div className="flex basis-3/5 flex-col gap-4">
            <div className="rounded-5xl bg-secondary/20 flex grow-1 items-center p-12">
              <BaseText variant="h1" className="max-w-[700px] leading-14 text-balance">
                Everything You Need, All in <span className="text-primary">One Place</span>!
              </BaseText>
            </div>
            <div className="bg-primary rounded-5xl flex flex-col gap-6 p-12">
              <BaseText variant="text" className="max-w-[500px] text-pretty text-white">
                Discover a wide range of products at unbeatable prices. From electronics to fashion,
                we have it all. Shop now and experience the convenience of one-stop shopping!
              </BaseText>
              <div className="w-fit rounded-4xl bg-white p-0.5">
                <BaseButton variant="secondary" href="/products" className="w-fit">
                  Explore More
                </BaseButton>
              </div>
            </div>
          </div>
          <div className="rounded-5xl flex min-h-[500px] basis-2/5 items-center justify-center overflow-hidden bg-neutral-100">
            <Hero2 className="h-[500px]" />
          </div>
        </div>
        <div className="no-scrollbar mt-4 flex w-full gap-4 overflow-auto">
          {categories.map((category) => (
            <Link
              href={`/category/${category.slug}`}
              key={category.slug}
              className="flex items-center gap-8 rounded-4xl bg-neutral-100 px-12 py-6"
            >
              <BaseText variant="h2" className="truncate whitespace-nowrap">
                {category.name}
              </BaseText>
              <MoveRight size={24} />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
