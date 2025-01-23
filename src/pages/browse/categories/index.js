import Link from "next/link";
import styles from "../../../styles/categories.module.css";
import Image from "next/image";

export async function getStaticProps() {
  // Fetch categories from an API or database
  const categories = [
    { id: 1, name: "Pasta", imageUrl: "/images/pasta.jpg" },
    { id: 2, name: "Beef", imageUrl: "/images/beef.jpg" },
    { id: 3, name: "Fish", imageUrl: "/images/fish.jpg" },
    { id: 4, name: "Desserts", imageUrl: "/images/dessert.jpg" },
    { id: 5, name: "Pasta", imageUrl: "/images/pasta.jpg" },
    { id: 6, name: "Beef", imageUrl: "/images/beef.jpg" },
    { id: 7, name: "Fish", imageUrl: "/images/fish.jpg" },
    { id: 8, name: "Desserts", imageUrl: "/images/dessert.jpg" },
    { id: 9, name: "Appetizers", imageUrl: "/images/pasta.jpg" },
  ];

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
              category.name.toLowerCase()
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
