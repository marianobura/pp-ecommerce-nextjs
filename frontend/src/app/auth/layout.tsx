export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh grid-cols-2">
      <div className="bg-esona size-full max-h-dvh">
        <img
          src="/auth.jpg"
          alt="Woman in yellow jacket being happy"
          className="size-full object-cover object-bottom"
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
