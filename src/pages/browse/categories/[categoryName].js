import Image from 'next/image';
import Link from 'next/link';
import slugify from '../../../helpers/slugify';
import deslugify from '../../../helpers/deslugify';
import fetchCategories from '../../../services/categories';
import fetchMeals from '../../../services/meals';
import { SWRConfig } from 'swr';
import useMeals from '../../../hooks/use-meals';

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
  if (isLoading) return <div className="min-h-96">Loading...</div>;

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
