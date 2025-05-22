import type { SelectOption } from "../Components/SelectInput";
import { defaultFetcher } from "../utils";

export function useGetIngredientsOptions() {
  return {
    queryConfig: {
      queryKey: ["/ingredients", name],
      queryFn: () =>
        defaultFetcher(`/ingredients`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => data),
    },
    postProcess: (result: SelectOption[]) => result,
  };
}
