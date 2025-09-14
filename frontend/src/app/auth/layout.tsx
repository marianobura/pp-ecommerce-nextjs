export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh grid-cols-2">
      <div className="bg-esona size-full max-h-dvh">
        <img
          src="/auth.png"
          alt="Black friday decoration with big present in cart"
          className="pointer-events-none size-full object-cover object-bottom select-none"
        />
      </div>
      <div className="flex size-full items-center justify-center">
        <div className="rounded-5xl mx-16 w-full max-w-[500px] border border-neutral-200 bg-white py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
