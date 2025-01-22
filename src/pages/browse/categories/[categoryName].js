import Image from "next/image";
function capitalizeWordsRegex(string) {
  return string.replace(/\b\w/g, char => char.toUpperCase());
}

export async function getStaticPaths() {
  // Fetch categories to generate paths
  const categories = [
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
  const paths = categories.map((category) => ({
    params: { categoryName: encodeURIComponent(category.name.toLowerCase()) },
  }));

  return { paths, fallback: false }; 
}

export async function getStaticProps({ params }) {
  const { categoryName } = params;

  // Fetch data for the specific category based on categoryName
  // For now, we’ll use a static object here
  const categoryData = {
    name: categoryName,
    dishes: [
      { id: 1, name: "Pasta", imageUrl: "/images/pasta.jpg" },
      { id: 2, name: "Beef", imageUrl: "/images/beef.jpg" },
      { id: 3, name: "Fish", imageUrl: "/images/fish.jpg" },
      { id: 4, name: "Desserts", imageUrl: "/images/dessert.jpg" },
      { id: 5, name: "Pasta", imageUrl: "/images/pasta.jpg" },
      { id: 6, name: "Beef", imageUrl: "/images/beef.jpg" },
      { id: 7, name: "Fish", imageUrl: "/images/fish.jpg" },
      { id: 8, name: "Desserts", imageUrl: "/images/dessert.jpg" },
      { id: 9, name: "Appetizers", imageUrl: "/images/pasta.jpg" },
    ], 
  };

  return {
    props: {
      categoryData,
    },
  };
}

const Category = ({ categoryData }) => {
  if (!categoryData) return <div>Loading...</div>;
  const {dishes} = categoryData

  return (
    <div>
      {/* Render dishes related to the category */}
      <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">{`${capitalizeWordsRegex(categoryData.name)}`}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <div key={dish.name} className="relative group">
              <div className="relative w-full h-64 overflow-hidden rounded-lg">
                <Image
                  src={dish.imageUrl}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform transform group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xl font-semibold">{dish.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default Category;
