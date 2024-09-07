// components/InteractiveCategorySection.tsx
import Image from 'next/image';

const categories = [
    { name: 'Pasta', imageUrl: '/images/pasta.jpg' },
    { name: 'Beef', imageUrl: '/images/beef.jpg' },
    { name: 'Fish', imageUrl: '/images/fish.jpg' },
    { name: 'Desserts', imageUrl: '/images/dessert.jpg' },
    { name: 'Pasta', imageUrl: '/images/pasta.jpg' },
    { name: 'Beef', imageUrl: '/images/beef.jpg' },
    { name: 'Fish', imageUrl: '/images/fish.jpg' },
    { name: 'Desserts', imageUrl: '/images/dessert.jpg' },
    // Add more categories as needed
  ];
const InteractiveCategorySection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Most Cherished Meals at a Glance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="relative group">
              <div className="relative w-full h-64 overflow-hidden rounded-lg">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform transform group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xl font-semibold">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveCategorySection;
