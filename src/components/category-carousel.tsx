import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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

const Carousel: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Food Categories</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          modules={[Navigation, Pagination, Scrollbar]}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.name} className="relative">
              <div className="relative w-full h-64">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xl font-semibold">{category.name}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Carousel;
