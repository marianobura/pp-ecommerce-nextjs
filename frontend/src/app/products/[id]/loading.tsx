export default function Loading() {
  return (
    <>
      <main className="container flex animate-pulse flex-col justify-center">
        <div className="my-3 flex items-center justify-center">
          <div className="grid w-full grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2">
            <div className="flex h-full max-h-[500px] items-center justify-center overflow-hidden rounded-4xl bg-gray-200 xl:max-h-[640px]">
              <div className="block h-80 max-h-80 bg-gray-300 object-contain sm:hidden sm:aspect-square sm:h-full sm:max-h-[500px]"></div>
            </div>
            <div className="flex h-full max-h-[500px] flex-col justify-between gap-4 overflow-hidden md:gap-8 lg:gap-16 xl:max-h-[640px]">
              <div className="flex flex-col gap-2">
                <div className="h-6 w-16 rounded-4xl bg-gray-200"></div>
                <div className="h-24 w-full rounded-4xl bg-gray-200"></div>
                <div className="flex flex-col gap-1">
                  <div className="h-6 w-full rounded-4xl bg-gray-200"></div>
                  <div className="h-6 w-full rounded-4xl bg-gray-200"></div>
                  <div className="h-6 w-full rounded-4xl bg-gray-200"></div>
                </div>
              </div>
              <div className="flex flex-col gap-4 overflow-hidden">
                <div className="flex gap-2">
                  <div className="h-12 w-36 rounded-4xl bg-gray-200"></div>
                  <div className="h-12 w-36 rounded-4xl bg-gray-200"></div>
                </div>
                <div className="h-96 rounded-4xl bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="animate-pulse border-t border-neutral-200">
        <div className="container flex flex-col sm:flex-row">
          <div className="flex items-center justify-center border-neutral-200 pt-5 sm:border-r sm:pr-5 sm:pb-5 lg:p-10">
            <div className="h-7 w-36 rounded-4xl bg-gray-200"></div>
          </div>
          <div className="items-left flex grow flex-col justify-between gap-2 py-3 sm:py-5 sm:pl-5 lg:pl-10 xl:flex-row xl:items-center">
            <div className="flex flex-col items-center gap-0.5 sm:items-start">
              <div className="h-5 w-36 rounded-4xl bg-gray-200 md:h-6"></div>
              <div className="flex flex-wrap justify-center gap-1 sm:justify-start">
                <div className="h-5 w-32 rounded-4xl bg-gray-200 md:h-6"></div>
                <div className="h-5 w-32 rounded-4xl bg-gray-200 md:h-6"></div>
                <div className="h-5 w-32 rounded-4xl bg-gray-200 md:h-6"></div>
              </div>
            </div>
            <div className="xs:flex-row xs:gap-4 flex flex-col items-center gap-2">
              <div className="h-7 w-16 rounded-4xl bg-gray-200"></div>
              <div className="h-11 w-full rounded-4xl bg-gray-200 sm:w-36 md:h-12"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
