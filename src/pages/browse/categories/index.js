import Link from "next/link";
import styles from "../../../styles/categories.module.css";
import Image from "next/image";
import slugify from "../../../helpers/slugify";
import { SWRConfig } from "swr";
import fetchCategories from "../../../services/categories";
import useCategories from "../../../hooks/use-categories";

export async function getStaticProps() {
  const categories = await fetchCategories();

  return {
    props: {
      fallback: categories,
    },
  };
}

const Categories = () => {
  const categoryData = useCategories();

  const { categories } = categoryData;

  if (!categoryData) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <ul className={styles.categoryList}>
        {categories &&
          categories.length > 0 &&
          categories.map((category) => (
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

export default function CategoriesPage({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Categories />
    </SWRConfig>
  );
}
