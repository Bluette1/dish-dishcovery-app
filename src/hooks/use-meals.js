import useSWR from "swr";
import deslugify from "../helpers/deslugify";

export default function useMeals(queryParams) {
  let queryStr = "";
  let name = "";
  if (queryParams) {
    if (queryParams.category) {
      name = queryParams.category;
      queryStr = `?category=${deslugify(name)}`;
    }
    if (queryParams.name) {
      name = queryParams.name;
      queryStr = `?name=${deslugify(name)}`;
    }
  }
  const urlMeals = `${process.env.NEXT_PUBLIC_BASE_URL}/meals${queryStr}`;
  const responseMeals = useSWR(urlMeals);
  return responseMeals;
}
