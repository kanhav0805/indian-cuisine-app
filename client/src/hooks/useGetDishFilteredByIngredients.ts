import { useMemo } from "react";
import { defaultFetcher } from "../utils";
import type { DishList } from "../models/Dishes";

const postProcessDishesData = (data: DishList) => {
  //we will filter out data as we just need name and the ingredients
  const filteredData = (data ?? []).map((item) => {
    return {
      name: item.name,
      ingredients: item.ingredients,
    };
  });
  return {
    suggestedDishes: filteredData,
  };
};

// Custom hook to generate query config
export function useGetDishFilteredByIngredients(
  selectedIngredients: string[] = []
) {
  const body = useMemo(() => {
    return {
      ingredients: [...selectedIngredients],
    };
  }, [selectedIngredients]);
  return {
    queryConfig: {
      queryKey: ["/suggest", body],
      queryFn: () =>
        defaultFetcher(`/suggest`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          method: "POST",
        })
          .then((res) => res.json())
          .then((data) => data),
    },
    postProcess: (result: DishList) => postProcessDishesData(result),
  };
}
