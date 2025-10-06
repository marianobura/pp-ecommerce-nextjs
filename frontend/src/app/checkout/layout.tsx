import Navbar from '@/components/layout/Navbar';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <Navbar />
      {children}
    </div>
  );
}
