import Image from "next/image";
import { TruckIcon, HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import DishIcon from "../../../components/dish-icon";
import slugify from "../../../helpers/slugify";
import deslugify from "../../../helpers/deslugify";

export async function getStaticPaths() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${BASE_URL}/meals`);
  const meals = await response.json();
  const paths = meals.map((meal) => ({
    params: { mealName: encodeURIComponent(slugify(meal.name)) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { mealName } = params;

  // Fetch data for the specific meal based on mealName
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${BASE_URL}/meals?name=${deslugify(mealName)}`);
  const mealData = await response.json();
  const meal = mealData[0];

  return {
    props: {
      meal,
    },
  };
}

const Meal = ({ meal }) => {
  if (!meal) return <div>Loading...</div>;

  return (
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

            <div class="flex items-center -mt-10 ">
              <div class="relative">
                <HeartIcon class="w-14 h-14 mx-7 cursor-pointer transition-opacity duration-200 ease-in-out hover:opacity-0" />
                <HeartIconSolid class="w-14 h-14 mx-7 cursor-pointer absolute top-0 left-0 opacity-0 transition-opacity duration-200 ease-in-out hover:opacity-100" />
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
                <span className="font-semibold">Description:</span>{" "}
                {meal.description}
              </h4>
              <p className="my-6">
                <span className="font-semibold">Price:</span> ${meal.price}
              </p>
              <p className="my-6 flex">
                <span className="font-semibold">Delivery</span>{" "}
                <TruckIcon className="w-6 h-6 mt-2 mx-2" />: At your door step
                in approx. 1 hr
              </p>
              {meal.serves > 1 && (
                <p className="my-6">
                  <span className="font-semibold">Serves:</span> {meal.serves}
                </p>
              )}
              <button className="my-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Meal;
