import Navbar from '@/components/Navbar';
import HomeHeader from '@/components/home/Header';
import HomeTrendy from '@/components/home/Trendy';
import { getProducts } from '@/services/products';

export default async function Home() {
  const products = await getProducts({ limit: 8 });
  return (
    <>
      <Navbar />
      <HomeHeader />
      <HomeTrendy products={products} />
    </>
  );
}
