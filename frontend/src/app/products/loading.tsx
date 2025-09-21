export default function Loading() {
  return (
    <div className="container pt-8 pb-4 md:pt-16">
      <div className="flex animate-pulse">
        <div className="border-r border-neutral-200">
          <div className="xs:w-64 sticky top-8 w-36">
            <div className="mr-4 flex flex-col gap-4 md:mr-8">
              <div className="h-7 shrink-0 rounded-4xl bg-gray-200 md:h-8"></div>
              <div className="h-96 rounded-4xl bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div className="ml-4 flex flex-1 flex-col gap-4 md:ml-8">
          <div className="flex items-center justify-between">
            <div className="h-7 w-36 rounded-4xl bg-gray-200 md:h-8"></div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(12)].map((_, index) => (
              <div className="group flex flex-col overflow-hidden" key={index}>
                <div className="flex aspect-square rounded-4xl bg-gray-200"></div>
                <div className="flex h-full flex-col justify-between gap-4 pt-3">
                  <div className="flex flex-col gap-2">
                    <div className="h-14 w-full rounded-4xl bg-gray-200 md:h-16"></div>
                    <div className="flex gap-2">
                      <div className="flex h-5 items-center gap-0.5 md:h-6">
                        <div className="h-5 w-28 rounded-4xl bg-gray-200 md:h-6"></div>
                      </div>
                      <div className="h-5 w-8 rounded-4xl bg-gray-200 md:h-6"></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-7 w-12 rounded-4xl bg-gray-200"></div>
                    <div className="h-11 w-full rounded-4xl bg-gray-200 md:h-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
