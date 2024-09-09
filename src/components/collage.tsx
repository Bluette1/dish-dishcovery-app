import Image from 'next/image';

const Centerpiece: React.FC = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-2">
        {/* Centerpiece Image */}
        <div className="col-span-1 row-span-1 md:col-span-2 md:row-span-2 relative w-full h-full">
          <Image
            src="/images/centre.jpg"
            alt="Centerpiece"
            layout="fill" 
            objectFit="cover"
          />
        </div>
        {/* Other Images */}
        <div className="relative w-full h-full">
          <Image
            src="/images/heart.jpg"
            alt="Image 3"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src="/images/brain.jpg"
            alt="Image 4"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src="/images/soup.jpg"
            alt="Image 1"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src="/images/pasta.jpg"
            alt="Image 2"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src="/images/bread.jpg"
            alt="Image 3"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Centerpiece;


