import { NextPage } from "next";
import Collage from "@/components/collage";
import About from "@/components/about";
import CategoryCarousel from "@/components/category-carousel";
import CollageSection from "@/components/collage-section";
import InterractiveSection from "@/components/interractive-section";
import FlipCardsSection from "@/components/flip-cards-section";
import Meta from "@/components/meta";
import Link from "next/link";
import { SearchIcon } from "@heroicons/react/outline";

const Home: NextPage = () => {
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
      <InterractiveSection />
      <Link href={"/browse/meals"}>
        <section className="flex justify-center hover:underline hover:text-[#883D1A]">
          <SearchIcon className="w-6 h-6 mt-2 mx-2" />
          <h2 className="text-3xl  font-semibold text-center mb-12">
            Find a Meal...
          </h2>
        </section>
      </Link>
    </>
  );
};

export default Home;
