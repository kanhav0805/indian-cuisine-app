import { useSearchParams } from "react-router-dom";

export const useQueryParams = () => {
  const [searchParams] = useSearchParams();

  const selectedValues = searchParams.get("selected")?.split(",") ?? [];

  const searchedDish = searchParams.get("searched-dish") ?? "";

  return {
    selectedValues,
    searchedDish,
  };
};
