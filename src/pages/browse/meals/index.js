import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import slugify from '../../../helpers/slugify';
import fetchMeals from '../../../services/meals';
import useMeals from '../../../hooks/use-meals';
import { SWRConfig } from 'swr';
import { useContext, useRef } from 'react';
import { ShopContext } from '../../../context/shop';
import Cart from '../../../components/cart';
import LoadingSpinner from '../../../components/loading-spinner';
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';

export async function getStaticProps() {
  const meals = await fetchMeals();

  const urlMeals = `${process.env.NEXT_PUBLIC_BASE_URL}/meals`;

  const data = {};
  data[urlMeals] = meals;

  return {
    props: { fallback: data },
  };
}

const Meals = () => {
  const { data: meals, isLoading } = useMeals();

  const [searchTerm, setSearchTerm] = useState('');
  const shop = useContext(ShopContext);
  const {
    isInCart,
    addToCart,
    isInWishList,
    addToWishList,
    removeFromWishList,
  } = shop;

  const cartRef = useRef(null);

  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Filter dishes based on the search term
  const filteredMeals =
    meals &&
    meals.filter((meal) =>
      meal.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMeals && filteredMeals.length > 0 ? (
                filteredMeals.map((meal) => (
                  <div key={meal._id} className="relative group">
                    <Link
                      href={`/browse/meals/${encodeURIComponent(
                        slugify(meal.name),
                      )}`}
                    >
                      <div className="relative w-full h-64 overflow-hidden rounded-lg">
                        <Image
                          src={meal.imageUrl}
                          alt={meal.name}
                          fill
                          className="object-cover transition-opacity duration-300 group-hover:opacity-75"
                        />
                      </div>
                    </Link>
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex flex-col">
                        <Link
                          href={`/browse/meals/${encodeURIComponent(
                            slugify(meal.name),
                          )}`}
                          className="text-lg font-semibold text-gray-800"
                        >
                          {meal.name}
                        </Link>
                        <div className="text-lg font-bold text-gray-800">
                          ${meal.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          {!isInWishList(meal._id) && (
                            <div
                              className="relative"
                              onClick={async () => {
                                await addToWishList(meal);
                              }}
                            >
                              <HeartIcon className="w-7 h-7 mx-7 cursor-pointer transition-opacity duration-200 ease-in-out hover:opacity-0" />
                              <HeartIconSolid className="w-7 h-7 mx-7 cursor-pointer absolute top-0 left-0 opacity-0 transition-opacity duration-200 ease-in-out hover:opacity-100" />
                            </div>
                          )}

                          {isInWishList(meal._id) && (
                            <div
                              className="relative group"
                              onClick={async () => {
                                await removeFromWishList(meal._id);
                              }}
                            >
                              <HeartIconSolid className="w-7 h-7 mx-7 cursor-pointer transition-opacity duration-200 ease-in-out group-hover:opacity-0" />
                              <HeartIcon className="w-7 h-7 mx-7 cursor-pointer absolute top-0 left-0 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100" />
                            </div>
                          )}
                        </div>
                        <button
                          onClick={async (e) => {
                            e.stopPropagation(); // Prevent navigation
                            await addToCart(meal);
                            // Add small delay to ensure DOM update before scrolling
                            setTimeout(scrollToCart, 100);
                          }}
                          className="my-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          {isInCart(meal._id) ? 'Add to Cart' : 'Order Now'}
                        </button>
                      </div>
                    </div>
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
        <section ref={cartRef} className="scroll-mt-8">
          <Cart />
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
