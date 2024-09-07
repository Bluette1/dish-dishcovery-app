// components/FlipCardSection.tsx
import Image from "next/image";
import FlipCardSection from './flip-card-section';


const categories = [
  { name: "Pasta", imageUrl: "/images/pasta.jpg" },
  { name: "Beef", imageUrl: "/images/beef.jpg" },
  { name: "Fish", imageUrl: "/images/fish.jpg" },
  { name: "Desserts", imageUrl: "/images/dessert.jpg" },
];

const FlipCardsSection: React.FC = () => {

  return (
    <section className="py-16 bg-gray-100 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Discover some of our recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative w-full h-64 perspective"
            >
              <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-500 hover:rotate-y-180">

                <FlipCardSection category={category}  />

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlipCardsSection;