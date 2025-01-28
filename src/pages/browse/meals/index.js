import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import slugify from "../../../helpers/slugify";
import fetchMeals from "../../../services/meals";
import useMeals from "../../../hooks/use-meals";
import { SWRConfig } from "swr";

export async function getStaticProps() {
  const meals = await fetchMeals();

  return {
    props: { fallback: meals },
  };
}

const Meals = () => {
  const mealData = useMeals();

  const { meals } = mealData;
  const [searchTerm, setSearchTerm] = useState("");

  // Filter dishes based on the search term
  const filteredMeals =
    meals &&
    meals.filter((meal) =>
      meal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  if (!mealData) return <div>Loading...</div>;

  return (
    <>
      <div>
        <div className="py-4 flex">
          <input
            type="text"
            placeholder="Search for dishes..."
            className="w-3/4 md:w-1/2 p-2 border border-gray-300 rounded my-4 mx-4 md:mx-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="w-6 h-6 mt-6 mx-2 text-gray-300" />
        </div>
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMeals && filteredMeals.length > 0 ? (
                filteredMeals.map((meal) => (
                  <div key={meal._id} className="relative group">
                    <Link
                      href={`/browse/meals/${encodeURIComponent(
                        slugify(meal.name)
                      )}`}
                    >
                      <div className="relative w-full h-64 overflow-hidden rounded-lg">
                        <Image
                          src={meal.imageUrl}
                          alt={meal.name}
                          fill
                          className="object-cover transition-transform transform group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xl font-semibold">
                          {meal.name}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-lg text-gray-500">
                  No dishes found.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default function MealsPage({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Meals />
    </SWRConfig>
  );
}
