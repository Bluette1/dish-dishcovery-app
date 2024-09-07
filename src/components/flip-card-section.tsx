import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/flipcard.module.css'; // Correct import path for CSS module

interface Category {
  name: string,
  imageUrl: string
}

interface FlipCardProps {
  category: Category
}

const FlipCard: React.FC<FlipCardProps> = ({ category }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <div className="absolute w-full h-full bg-gray-800 text-white flex items-center justify-center text-xl font-semibold rotate-y-180 backface-hidden">
            <span>{category.name}</span>
          </div>
        </div>
        <div className={styles.cardBack}>
          <section className='flex-col'>
            <article className='text-center'><Link className='underline text-center' href={'/meals/recipe'}>View Recipe</Link>
            </article>
            <Image className='py-12' alt='' src={category.imageUrl} width={160} height={160} />
          </section>

        </div>
      </div>
    </div>
  );
};

export default FlipCard;