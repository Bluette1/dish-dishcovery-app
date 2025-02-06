import Image from 'next/image';
import Center from './centerpiece';
import styles from '../styles/centerpiece-collage.module.css';

const Centerpiece: React.FC = () => {
  return (
    <div className={styles.centerpiece}>
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-3 grid-rows-3 gap-2">
        {/* Centerpiece Image */}
        <Center />
        {/* Other Images */}
        <div className="relative w-full h-full">
          <Image
            src="/images/heart.jpg"
            alt="Image 3"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src="/images/brain.jpg"
            alt="Image 4"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src="/images/soup.jpg"
            alt="Image 1"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="relative w-full h-full ">
          <Image
            src="/images/pasta.jpg"
            alt="Image 2"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="relative w-full h-full">
          <Image
            src="/images/bread.jpg"
            alt="Image 3"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Centerpiece;
