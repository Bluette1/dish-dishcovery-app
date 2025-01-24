import Image from "next/image";
function capitalizeWordsRegex(string) {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
}
import { TruckIcon, HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import DishIcon from "../../../components/dish-icon";

export async function getStaticPaths() {
  // Fetch meals to generate paths
  const dishes = [
    { id: 1, name: "Pasta", imageUrl: "/images/pasta.jpg" },
    { id: 2, name: "Beef", imageUrl: "/images/beef.jpg" },
    { id: 3, name: "Fish", imageUrl: "/images/fish.jpg" },
    { id: 4, name: "Desserts", imageUrl: "/images/dessert.jpg" },
    { id: 5, name: "Pasta", imageUrl: "/images/pasta.jpg" },
    { id: 6, name: "Beef", imageUrl: "/images/beef.jpg" },
    { id: 7, name: "Fish", imageUrl: "/images/fish.jpg" },
    { id: 8, name: "Desserts", imageUrl: "/images/dessert.jpg" },
    { id: 9, name: "Appetizers", imageUrl: "/images/pasta.jpg" },
  ];
  const paths = dishes.map((dish) => ({
    params: { mealName: encodeURIComponent(dish.name.toLowerCase()) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { mealName } = params;

  // Fetch data for the specific category based on mealName
  // For now, we’ll use a static object here
  const dishes = [
    { id: 1, name: "Pasta", imageUrl: "/images/pasta.jpg" },
    { id: 2, name: "Beef", imageUrl: "/images/beef.jpg" },
    { id: 3, name: "Fish", imageUrl: "/images/fish.jpg" },
    { id: 4, name: "Desserts", imageUrl: "/images/dessert.jpg" },
    { id: 5, name: "Pasta", imageUrl: "/images/pasta.jpg" },
    { id: 6, name: "Beef", imageUrl: "/images/beef.jpg" },
    { id: 7, name: "Fish", imageUrl: "/images/fish.jpg" },
    { id: 8, name: "Desserts", imageUrl: "/images/dessert.jpg" },
    { id: 9, name: "Appetizers", imageUrl: "/images/pasta.jpg" },
  ];
  const dish = dishes.find(
    (dis) => encodeURIComponent(dis.name.toLowerCase()) == mealName
  );
  console.log("DishPPPPPPPPPP", dish);
  const mealData = {
    name: mealName,
    dish,
  };

  return {
    props: {
      mealData,
    },
  };
}

const Meal = ({ mealData }) => {
  if (!mealData) return <div>Loading...</div>;
  const { dish } = mealData;

  return (
    <div>
      {/* Render dish */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <section className="flex justify-center">
            <span className="mb-2 px-7">
              <DishIcon />
            </span>
            <h2 className="text-3xl font-semibold text-center mb-12 text-[#883D1A]">
              {`${capitalizeWordsRegex(decodeURIComponent(mealData.name))}`}{" "}
            </h2>

            <div class="flex items-center -mt-10 ">
              <div class="relative">
                <HeartIcon class="w-14 h-14 mx-7 cursor-pointer transition-opacity duration-200 ease-in-out hover:opacity-0" />
                <HeartIconSolid class="w-14 h-14 mx-7 cursor-pointer absolute top-0 left-0 opacity-0 transition-opacity duration-200 ease-in-out hover:opacity-100" />
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-24 lg:gap-36">
            <div key={dish.name} className="relative group">
              <div className="relative w-full h-96 overflow-hidden rounded-lg">
                <Image
                  src={dish.imageUrl}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform transform group-hover:scale-110"
                />
              </div>
            </div>
            <div className="text-2xl px-2 lg:px-8">
              <h4 className="my-6">
                <span className="font-semibold">Description:</span> Something
                nice to eat
              </h4>
              <p className="my-6">
                <span className="font-semibold">Price:</span> $40
              </p>
              <p className="my-6 flex">
                <span className="font-semibold">Delivery</span>{" "}
                <TruckIcon className="w-6 h-6 mt-2 mx-2" />: At your door step
              </p>
              <p className="my-6">
                <span className="font-semibold">Serves:</span> 1
              </p>
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
