import slugify from "@/helpers/slugify";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../context/data";


const InteractiveCategorySection: React.FC = () => {
  const { meals } = useContext(DataContext);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Our Most Cherished Meals at a Glance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals && meals.slice(0, 12).map((meal) => (
            <div key={meal.name} className="relative group">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveCategorySection;
