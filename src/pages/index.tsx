// pages/index.tsx
import { NextPage } from 'next';
import Collage from '@/components/collage';
import About from '@/components/about';
import CategoryCarousel from "@/components/category-carousel";
import CollageSection from '@/components/collage-section';
import InterractiveSection from '@/components/interractive-section';
import FlipCardsSection from '@/components/flip-cards-section';

const Home: NextPage = () => {
  return (
    <>
      <Collage />
      <About />
      <CategoryCarousel />
      <CollageSection />
      <section className='flex justify-center'>
        <FlipCardsSection />
      </section>
      <InterractiveSection /></>

  );
};

export default Home;

