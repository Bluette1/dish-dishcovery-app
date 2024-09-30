import Image from 'next/image';

const categories = [
    { name: 'Heart', imageUrl: '/images/heart.jpg' },
    { name: 'Brain', imageUrl: '/images/brain.jpg' },
  ];

const CollageSection: React.FC = () => {
  return (
    <section className="hidden md:block py-16 bg-gray-100 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">Feed your <span className='underline text-[#883D1A]'>Heart</span> &amp; <span className='underline text-[#4D331F]'>Brain</span> </h2>
        <div className="relative w-full h-[950px]">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`absolute w-[45%] h-[45%] ${index % 2 === 0 ? 'top-0 left-0' : 'bottom-0 right-0'} ${
                index % 2 === 0 ? 'transform rotate-3' : 'transform -rotate-3'
              }`}
              style={{ zIndex: categories.length - index }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xl font-semibold">{category.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollageSection;


