export default function Loading() {
  return (
    <div className="container pt-16 pb-4">
      <div className="flex animate-pulse">
        <div className="border-r border-neutral-200">
          <div className="sticky top-8 h-[600px] w-64">
            <div className="mr-8 flex h-full flex-col gap-4">
              <div className="h-8 shrink-0 rounded-4xl bg-gray-200"></div>
              <div className="h-full rounded-4xl bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div className="ml-8 flex flex-1 flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-36 rounded-4xl bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(12)].map((_, index) => (
              <div className="group flex flex-col overflow-hidden" key={index}>
                <div className="flex aspect-square rounded-4xl bg-gray-200"></div>
                <div className="flex h-full flex-col justify-between gap-4 pt-3">
                  <div className="flex flex-col gap-2">
                    <div className="h-16 w-full rounded-4xl bg-gray-200"></div>
                    <div className="flex gap-2">
                      <div className="flex h-6 items-center gap-0.5">
                        <div className="h-6 w-28 rounded-4xl bg-gray-200"></div>
                      </div>
                      <div className="h-6 w-8 rounded-4xl bg-gray-200"></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-7 w-12 rounded-4xl bg-gray-200"></div>
                    <div className="h-12 w-full rounded-4xl bg-gray-200"></div>
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
