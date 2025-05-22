import type { Dish } from "../models/Dishes";
import { defaultFetcher } from "../utils";

export function useGetDishDetails(name: string) {
  return {
    queryConfig: {
      queryKey: ["/", name],
      queryFn: () =>
        defaultFetcher(`/${name}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => data),
    },
    postProcess: (result: Dish) => result,
  };
}
