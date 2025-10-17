import Navbar from '@/components/layout/Navbar';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="container pt-3 pb-3 md:pt-8 lg:pt-16">{children}</main>
    </>
  );
}
