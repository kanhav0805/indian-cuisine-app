import type { DishList } from "../models/Dishes";
import { defaultFetcher } from "../utils";

// Optional: Process data after fetching
const postProcessDishesData = (data: DishList) => {
  return {
    tableData: data,
  };
};

// Custom hook to generate query config
export function useGetDishesData(search = "") {
  return {
    queryConfig: {
      queryKey: ["/data", search],
      queryFn: () =>
        defaultFetcher(`/data`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => data),
    },
    postProcess: (result: DishList) => postProcessDishesData(result),
  };
}
