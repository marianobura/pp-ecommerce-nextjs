export default function Loading() {
  return (
    <>
      <main className="container flex animate-pulse flex-col justify-center">
        <div className="flex items-center justify-center">
          <div className="flex w-full items-center justify-center gap-4">
            <div className="min-h-[640px] w-full flex-1 rounded-4xl bg-gray-200"></div>
            <div className="flex h-full max-h-[640px] flex-1 flex-col justify-between gap-16 overflow-hidden">
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
        <div className="container flex">
          <div className="border-r border-neutral-200 p-10 pl-0">
            <div className="h-6 w-28 rounded-4xl bg-gray-200"></div>
          </div>
          <div className="flex grow items-center justify-between gap-8 pl-10">
            <div className="flex flex-col gap-1">
              <div className="h-7 w-96 rounded-4xl bg-gray-200"></div>
              <div className="flex gap-2">
                <div className="h-6 w-44 rounded-4xl bg-gray-200"></div>
                <div className="h-6 w-44 rounded-4xl bg-gray-200"></div>
                <div className="h-6 w-44 rounded-4xl bg-gray-200"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-7 w-16 rounded-4xl bg-gray-200"></div>
              <div className="h-12 w-36 rounded-4xl bg-gray-200"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
