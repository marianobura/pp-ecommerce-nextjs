import BaseButton from '@/components/BaseButton';
import BaseText from '@/components/BaseText';
import Hero from '@/components/icons/Hero';

export default function HomeHeader() {
  return (
    <main className="border-b border-neutral-200">
      <div className="container">
        <div className="my-3 flex gap-4 md:my-8 lg:my-16">
          <div className="flex flex-col gap-4 md:basis-3/5">
            <div className="rounded-5xl bg-secondary/20 flex grow-1 items-center p-6 md:p-12">
              <BaseText
                variant="h1"
                className="max-w-[700px] text-center leading-14 text-balance md:text-left"
              >
                Everything You Need, All in <span className="text-primary">One Place</span>!
              </BaseText>
            </div>
            <div className="bg-primary rounded-5xl flex flex-col gap-3 p-6 md:gap-6 md:p-12">
              <BaseText variant="text" className="text-pretty text-white md:max-w-[500px]">
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
          <div className="rounded-5xl hidden min-h-[500px] basis-2/5 items-center justify-center overflow-hidden bg-neutral-100 md:flex">
            <Hero className="h-[500px] p-12" />
          </div>
        </div>
      </div>
    </main>
  );
}
