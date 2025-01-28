import useSWR from "swr";

export default function useCategories() {
  const urlCategories = `${process.env.NEXT_PUBLIC_BASE_URL}/categories`;
  const { categories } = useSWR(urlCategories);
  return { categories };
}
