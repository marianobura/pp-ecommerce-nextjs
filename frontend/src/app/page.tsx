import Navbar from '@/components/Navbar';
import HomeHeader from '@/components/home/Header';
import HomeTrendy from '@/components/home/Trendy';

export default async function Home() {
  return (
    <>
      <Navbar />
      <HomeHeader />
      <HomeTrendy />
    </>
  );
}
