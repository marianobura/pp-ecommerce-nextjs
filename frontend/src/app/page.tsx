import Navbar from '@/components/layout/Navbar';
import HomeHeader from '@/components/pages/home/Header';
import HomeTrendy from '@/components/pages/home/Trendy';

export default async function Home() {
  return (
    <>
      <Navbar />
      <HomeHeader />
      <HomeTrendy />
    </>
  );
}
