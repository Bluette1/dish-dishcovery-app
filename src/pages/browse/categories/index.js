import Link from "next/link";
import styles from "../../../styles/categories.module.css";
import Image from "next/image";
import slugify from "../../../helpers/slugify";

export async function getStaticProps() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${BASE_URL}/categories`);
  const categories = await response.json();

  return {
    props: {
      categories,
    },
  };
}

const Categories = ({ categories }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <Link
            key={category.id}
            className={styles.categoryItem}
            href={`/browse/categories/${encodeURIComponent(
              slugify(category.name)
            )}`}
          >
            <Image
              src={category.imageUrl}
              alt={category.name}
              className={styles.categoryImage}
              width={500}
              height={500}
            />
            <h2 className={styles.categoryName}>{category.name}</h2>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
