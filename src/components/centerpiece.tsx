import { useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
  '/images/center.jpg',
  '/images/centre-1.jpg',
  '/images/centre-3.jpg',
];

const Centerpiece = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % images.length;
      setCurrentImage(images[nextIndex]);
      setIndex(nextIndex);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="col-span-1 row-span-1 md:col-span-2 md:row-span-2 relative w-full h-full">
      <Image
        src={currentImage} alt="Centerpiece" layout="fill"
        objectFit="cover" className="rounded-lg shadow-lg transition-all duration-500"
      />
    </div>
  );
};

export default Centerpiece;