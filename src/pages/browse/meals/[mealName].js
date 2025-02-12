import Image from 'next/image';
import { TruckIcon, HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import DishIcon from '../../../components/dish-icon';
import slugify from '../../../helpers/slugify';
import { SWRConfig } from 'swr';
import fetchMeals from '../../../services/meals';
import useMeals from '../../../hooks/use-meals';
import deslugify from '../../../helpers/deslugify';
import { useContext, useRef } from 'react';
import { ShopContext } from '../../../context/shop';
import Cart from '../../../components/cart';
import LoadingSpinner from '../../../components/loading-spinner';

export async function getStaticPaths() {
  const meals = await fetchMeals();
  const paths = meals.map((meal) => ({
    params: { mealName: encodeURIComponent(slugify(meal.name)) },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { mealName } = params;

  // Fetch data for the specific meal based on mealName
  const meal = await fetchMeals(`?name=${deslugify(mealName)}`);

  const urlMeals = `${process.env.NEXT_PUBLIC_BASE_URL}/meals?name=${deslugify(
    mealName,
  )}`;

  const data = {};
  data[urlMeals] = meal;

  return {
    props: {
      fallback: data,
      name: mealName,
    },
  };
}

const Meal = ({ name }) => {
  const { data: meals, isLoading } = useMeals({ name });
  const shop = useContext(ShopContext);
  const { addToCart, isInCart } = shop;

  const cartRef = useRef(null);

  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  let meal;
  if (meals) {
    meal = meals[0];
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return meal ? (
    <div>
      {/* Render meal */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <section className="flex justify-center">
            <span className="mb-2 px-7">
              <DishIcon />
            </span>
            <h2 className="text-3xl font-semibold text-center mb-12 text-[#883D1A]">
              {meal.name}
            </h2>

            <div className="flex items-center -mt-10 ">
              <div className="relative">
                <HeartIcon className="w-14 h-14 mx-7 cursor-pointer transition-opacity duration-200 ease-in-out hover:opacity-0" />
                <HeartIconSolid className="w-14 h-14 mx-7 cursor-pointer absolute top-0 left-0 opacity-0 transition-opacity duration-200 ease-in-out hover:opacity-100" />
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-24 lg:gap-36">
            <div key={meal.name} className="relative group">
              <div className="relative w-full h-96 overflow-hidden rounded-lg">
                <Image
                  src={meal.imageUrl}
                  alt={meal.name}
                  fill
                  className="object-cover transition-transform transform group-hover:scale-110"
                />
              </div>
            </div>
            <div className="text-2xl px-2 lg:px-8">
              <h4 className="my-6">
                <span className="font-semibold">Description:</span>{' '}
                {meal.description}
              </h4>
              <p className="my-6">
                <span className="font-semibold">Price:</span> ${meal.price}
              </p>
              <p className="my-6 flex">
                <span className="font-semibold">Delivery</span>{' '}
                <TruckIcon className="w-6 h-6 mt-2 mx-2" />: At your door step
                in approx. 1 hr
              </p>
              {meal.serves > 1 && (
                <p className="my-6">
                  <span className="font-semibold">Serves:</span> {meal.serves}
                </p>
              )}
              <button
                onClick={async () => {
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
      </section>
      <section ref={cartRef} className="scroll-mt-8">
        <Cart />
      </section>
    </div>
  ) : (
    <></>
  );
};

export default function MealPage({ fallback, name }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Meal name={name} />
    </SWRConfig>
  );
}
