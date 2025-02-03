import { NextPage } from 'next';
import Collage from '@/components/collage';
import About from '@/components/about';
import CategoryCarousel from '@/components/category-carousel';
import CollageSection from '@/components/collage-section';
import InterractiveSection from '@/components/interractive-section';
import FlipCardsSection from '@/components/flip-cards-section';
import Meta from '@/components/meta';
import Link from 'next/link';
import { SearchIcon, ArrowUpIcon } from '@heroicons/react/outline';
import { DataContext } from '../context/data';
import { useContext, useEffect, useState } from 'react';
import fetchCategories from '../services/categories';
import fetchMeals from '../services/meals';
import useMeals from '../hooks/use-meals';
import useCategories from '../hooks/use-categories';
import { SWRConfig } from 'swr';

export async function getStaticProps() {
  const categories = await fetchCategories();

  const meals = await fetchMeals();

  const urlCategories = `${process.env.NEXT_PUBLIC_BASE_URL}/categories`;
  const urlMeals = `${process.env.NEXT_PUBLIC_BASE_URL}/meals`;

  const data: { [key: string]: object } = {};

  data[urlCategories] = categories;
  data[urlMeals] = meals;

  return {
    props: {
      fallback: data,
    },
  };
}

const Home: NextPage = () => {
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useCategories();
  const { data: mealsData, isLoading: isLoadingMeals } = useMeals();

  const { addCategories, addMeals } = useContext(DataContext);
  const [categories, setCategories] = useState(null);
  const [meals, setMeals] = useState(null);

  useEffect(() => {
    if (mealsData) {
      window.localStorage.setItem('meals', JSON.stringify(meals));
      addMeals(mealsData);
      setMeals(mealsData);
    }

    if (categoriesData) {
      window.localStorage.setItem('categories', JSON.stringify(categoriesData));
      addCategories(categories);
      setCategories(categoriesData);
    }
  }, [mealsData, categoriesData, categories, meals, addCategories, addMeals]);

  if (isLoadingCategories || isLoadingMeals) return <div className="min-h-96">Loading...</div>;

  return (
    <>
      <Meta
        title="Home | Dish Discovery"
        description="Welcome to the home page of our website."
        keywords="home, welcome, dish, discovery, website, delicious, healthy, affordable"
      />
      <Collage />
      <About />
      <CategoryCarousel />
      <CollageSection />
      <section className="flex justify-center">
        <FlipCardsSection />
      </section>
      <Link href={'/browse/meals'}>
        <section className="pt-6 pb-2 flex justify-center hover:underline hover:text-[#883D1A]">
          <SearchIcon className="w-6 h-6 mt-2 mx-2" />
          <h2 className="text-3xl font-semibold text-center">Find a Meal...</h2>
        </section>
        <section className="flex justify-center mb-12">
          <ArrowUpIcon className="w-6 h-6 text-[#883D1A]" />
        </section>
      </Link>
      <InterractiveSection />
    </>
  );
};

interface HomePageProps {
  fallback: object;
}

export default function HomePage({ fallback }: HomePageProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <Home />
    </SWRConfig>
  );
}
