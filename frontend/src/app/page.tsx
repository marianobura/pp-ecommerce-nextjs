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
        {/* <div className="relative flex h-[600px] flex-col justify-center rounded-4xl bg-neutral-100 p-12">
          <Hero className="absolute right-32 bottom-0 h-[500px]" />
          <BaseText variant="h1" className="line-clamp-2 max-w-[700px] leading-14 text-balance">
            Everything You Need, All in <span className="text-primary">One Place</span>
          </BaseText>
          <BaseText variant="text" className="max-w-[500px] text-pretty">
            Discover a wide range of products at unbeatable prices. From electronics to fashion, we
            have it all. Shop now and experience the convenience of one-stop shopping!
          </BaseText>
          <BaseButton variant="primary" href="/products" className="mt-6 w-fit">
            Explore More
          </BaseButton>
        </div> */}
        {/* <div className="mt-12 flex h-[500px] flex-col justify-end gap-4 lg:mt-24">
          <div className="w-full">
            <BaseText variant="h1" className="w-1/2 leading-14 text-balance">
              Everything You Need, All in <span className="text-primary">One Place</span>!
            </BaseText>
          </div>
          <div className="bg-primary relative flex h-fit flex-col gap-6 rounded-4xl p-12">
            <div className="w-full">
              <BaseText variant="text" className="w-2/5 max-w-[600px] text-pretty text-white">
                Discover a wide range of products at unbeatable prices. From electronics to fashion,
                we have it all. Shop now and experience the convenience of one-stop shopping!
              </BaseText>
            </div>
            <BaseButton variant="secondary" href="/products" className="w-fit">
              Explore More
            </BaseButton>
            <Hero className="absolute right-8 bottom-0 h-[500px] md:right-16 xl:right-32" />
          </div>
        </div> */}
        <div className="mt-12 flex gap-4 lg:mt-24">
          <div className="flex basis-2/3 flex-col gap-4">
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
              <BaseButton variant="secondary" href="/products" className="w-fit">
                Explore More
              </BaseButton>
            </div>
          </div>
          <div className="rounded-5xl min-h-[500px] basis-1/3 bg-neutral-100"></div>
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
