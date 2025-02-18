import Image from 'next/image';
import Link from 'next/link';
import slugify from '../../../helpers/slugify';
import deslugify from '../../../helpers/deslugify';
import fetchCategories from '../../../services/categories';
import fetchMeals from '../../../services/meals';
import { SWRConfig } from 'swr';
import useMeals from '../../../hooks/use-meals';
import { useContext, useRef } from 'react';
import { ShopContext } from '../../../context/shop';
import Cart from '../../../components/cart';
import LoadingSpinner from '../../../components/loading-spinner';
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';

export async function getStaticPaths() {
  const categories = await fetchCategories();

  const paths = categories.map((category) => ({
    params: { categoryName: encodeURIComponent(slugify(category.name)) },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { categoryName } = params;
  const meals = await fetchMeals(`?category=${deslugify(categoryName)}`);
  const urlMeals = `${process.env.NEXT_PUBLIC_BASE_URL}/meals?category=${deslugify(categoryName)}`;

  const data = {};
  data[urlMeals] = meals;
  return {
    props: {
      fallback: data,
      name: categoryName,
    },
  };
}

const Category = ({ name }) => {
  const { data: meals, isLoading } = useMeals({ category: name });
  const shop = useContext(ShopContext);
  const {
    addToCart,
    isInCart,
    isInWishList,
    addToWishList,
    removeFromWishList,
  } = shop;

  const cartRef = useRef(null);

  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* Render dishes related to the category */}
      <section className="py-16 bg-gray-100 min-h-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">{`${deslugify(
            decodeURIComponent(name),
          )}`}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals &&
              meals.map((meal) => (
                <div key={meal.name} className="relative group">
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
                        className="my-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        {isInCart(meal._id) ? 'Add to Cart' : 'Order Now'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section ref={cartRef} className="scroll-mt-8">
        <Cart />
      </section>
    </div>
  );
};

export default function CategoryPage({ fallback, name }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Category name={name} />
    </SWRConfig>
  );
}
