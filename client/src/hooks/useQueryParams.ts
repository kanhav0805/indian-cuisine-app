import { useSearchParams } from "react-router-dom";

export const useQueryParams = () => {
  const [searchParams] = useSearchParams();

  const selectedValues = searchParams.get("selected")?.split(",") ?? [];

  const searchedDish = searchParams.get("searched-dish") ?? "";

  const page = searchParams.get("page") ?? "1";

  const pageSize = searchParams.get("page-size") ?? "10";

  return {
    selectedValues,
    searchedDish,
    page,
    pageSize,
  };
};
