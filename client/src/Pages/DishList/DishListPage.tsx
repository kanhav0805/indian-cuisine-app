import type { ColumnsType } from "antd/es/table";
import { useState, useMemo, type Key, useEffect } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";

import PaginatedTable from "../../Components/PaginatedTable/PaginatedTable";
import { useGetDishesData } from "../../hooks/useGetDishesData";

import type { Dish, DishList } from "../../models/Dishes";
import { useQueryParams } from "../../hooks/useQueryParams";
import "./DishListPage.css";

function generateColumnsFromData(
  data: Dish[],
  navigate: NavigateFunction
): ColumnsType<Dish> {
  if (!data?.length) return [];

  const sample = data[0];

  //getting distinct flavors and state for filtering in table
  const { distinctFlavors, distinctState } = data?.reduce(
    (acc, item) => {
      if (item.flavor_profile) {
        acc.distinctFlavors.add(item.flavor_profile);
      }
      if (item.state) {
        acc.distinctState.add(item.state);
      }

      return acc;
    },
    {
      distinctFlavors: new Set(),
      distinctState: new Set(),
    }
  ) || { distinctFlavors: new Set(), distinctState: new Set() };

  const distinctDiet = [
    { text: "Vegetarian", value: "vegetarian" },
    { text: "Non-Vegetarian", value: "non vegetarian" },
  ];

  const columns = Object.keys(sample).map((key) => {
    if (key === "ingredients") {
      return {
        title: "Ingredients",
        dataIndex: key,
        key,
        render: (ingredients: string[]) => ingredients.join(", "),
      };
    }

    if (key === "diet" || key === "flavor_profile" || key === "state") {
      return {
        title:
          key === "flavor_profile"
            ? "Flavor"
            : key === "state"
            ? "State"
            : "Diet",
        dataIndex: key,
        key,
        filters:
          key === "flavor_profile"
            ? [...distinctFlavors].map((item) => {
                return { text: item, value: item };
              })
            : key === "state"
            ? [...distinctState].map((item) => {
                return { text: item, value: item };
              })
            : distinctDiet,
        onFilter: (value: boolean | Key, record: Dish) => record[key] === value,
      };
    }

    if (key === "prep_time" || key === "cook_time") {
      return {
        title: key === "prep_time" ? "Prep Time (min)" : "Cook Time (min)",
        dataIndex: key,
        key,
        sorter: (a: Dish, b: Dish) => {
          const aVal =
            a[key] !== null && a[key] !== undefined
              ? parseInt(a[key] as string)
              : Number.MIN_SAFE_INTEGER;
          const bVal =
            b[key] !== null && b[key] !== undefined
              ? parseInt(b[key] as string)
              : Number.MIN_SAFE_INTEGER;
          return aVal - bVal;
        },
      };
    }

    if (key === "name") {
      return {
        title: "Name",
        dataIndex: key,
        key,
        sorter: (a: Dish, b: Dish) => a.name.localeCompare(b.name),
        render: (text: string) => <span style={{ color: "blue" }}>{text}</span>,
        onCell: (record: Dish) => ({
          onClick: () => {
            navigate(`/dishDetails/${record.name}`);
            console.log("Clicked row:", record);
          },
          style: { cursor: "pointer" },
        }),
      };
    }

    return {
      title: key
        .split("_")
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(" "),
      dataIndex: key,
      key,
    };
  });

  return columns as ColumnsType<Dish>;
}

const DishListPage = () => {
  //state of the component
  const [filteredTableData, setFilteredTableData] = useState<DishList>([]);
  const { queryConfig, postProcess } = useGetDishesData("");
  const { searchedDish } = useQueryParams();
  const navigate = useNavigate();

  const results = useQueries({
    queries: [queryConfig],
  });

  const { tableData } = postProcess(results[0]?.data);

  //logic to filter the table
  useEffect(() => {
    if (searchedDish === "") {
      setFilteredTableData(tableData);
    } else {
      setFilteredTableData(
        tableData.filter((item) => item.name === searchedDish)
      );
    }
  }, [searchedDish, tableData]);

  //columns in the table
  const columns = useMemo(() => {
    return generateColumnsFromData(tableData, navigate);
  }, [tableData, navigate]);

  return (
    <div id="page-container">
      <PaginatedTable data={filteredTableData} columns={columns} />
    </div>
  );
};

export default DishListPage;
