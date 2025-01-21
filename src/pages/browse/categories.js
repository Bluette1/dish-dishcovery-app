import Link from "next/link";
import styles from "./Categories.module.css"; // Import CSS module

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
          <li key={category.id} className={styles.categoryItem}>
            <Link
              className={styles.categoryLink}
              href={`/categories/${encodeURIComponent(
                category.name.toLowerCase()
              )}`}
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className={styles.categoryImage}
              />
              <h2 className={styles.categoryName}>{category.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
