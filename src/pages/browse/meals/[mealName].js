import Image from 'next/image';
import {
  TruckIcon,
  HeartIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import DishIcon from '../../../components/dish-icon';
import slugify from '../../../helpers/slugify';
import { SWRConfig } from 'swr';
import fetchMeals from '../../../services/meals';
import useMeals from '../../../hooks/use-meals';
import deslugify from '../../../helpers/deslugify';
import { useRef, useState } from 'react';

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
  const [cart, setCart] = useState([]);
  const cartRef = useRef(null);

  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const addToCart = (meal) => {
    const existingItem = cart.find((item) => item.id === meal.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...meal, quantity: 1 }]);
    }
    // Add small delay to ensure DOM update before scrolling
    setTimeout(scrollToCart, 100);
  };

  const removeFromCart = (mealId) => {
    setCart(cart.filter((item) => item.id !== mealId));
  };

  const updateQuantity = (mealId, increment) => {
    setCart(
      cart.map((item) => {
        if (item.id === mealId) {
          const newQuantity = item.quantity + (increment ? 1 : -1);
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }),
    );
  };

  const isInCart = (mealId) => cart.find((item) => item.id === mealId);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  let meal;
  if (meals) {
    meal = meals[0];
  }

  if (isLoading) return <div className="min-h-96">Loading...</div>;

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
                onClick={() => addToCart(meal)}
                className="my-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                {isInCart(meal.id) ? 'Add to Cart' : 'Order Now'}
              </button>
            </div>
          </div>
        </div>
      </section>
      {cart.length > 0 && (
        <div ref={cartRef} className="mt-8 border-t pt-8 scroll-mt-8 pb-6 px-4">
          <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, false)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, true)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4">
              <p className="text-xl font-bold">
                Total: ${cartTotal.toFixed(2)}
              </p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
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
