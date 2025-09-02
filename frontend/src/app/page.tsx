import BaseText from '@/components/BaseText';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container py-3">
        <BaseText variant="h1">Welcome to the Home Page</BaseText>
        <BaseText variant="text">This is a sample Next.js application.</BaseText>
      </main>
    </>
  );
}
