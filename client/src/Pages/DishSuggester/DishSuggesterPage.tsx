import { useMemo } from "react";
import { Badge, Space, Typography } from "antd";
import { useQueries } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { VirtualizedList } from "../../Components/VirtualizedList/VirtualizedList";
import SelectInput from "../../Components/SelectInput/SelectInput";
import { useGetIngredientsOptions } from "../../hooks/useGetIngredientsOptions";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useGetDishFilteredByIngredients } from "../../hooks/useGetDishFilteredByIngredients";

import "./DishSuggesterPage.css";

const { Title } = Typography;

type Dish = {
  name: string;
  ingredients: string[];
};

const DishSuggesterPage = () => {
  //state and hooks call
  const { selectedValues, searchedDish } = useQueryParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    queryConfig: ingredientsFilterOptionsConfig,
    postProcess: postProcessIngredientsList,
  } = useGetIngredientsOptions();

  const {
    queryConfig: dishesByIngredientsConfig,
    postProcess: postProcessDishesByIngredients,
  } = useGetDishFilteredByIngredients(selectedValues);

  const handleSelectChange = (values: string[]) => {
    const newParams = new URLSearchParams(searchParams);
    if (values.length > 0) {
      newParams.set("selected", values.join(","));
    } else {
      newParams.delete("selected");
    }
    setSearchParams(newParams);
  };

  //getting the result of 2 end points
  const results = useQueries({
    queries: [ingredientsFilterOptionsConfig, dishesByIngredientsConfig],
  });

  const ingredientsOptions = useMemo(() => {
    return postProcessIngredientsList(results[0]?.data);
  }, [results, postProcessIngredientsList]);

  const dishesData = useMemo(() => {
    return postProcessDishesByIngredients(
      results[1]?.data
    )?.suggestedDishes?.filter((item) =>
      searchedDish === "" ? true : item.name === searchedDish
    );
  }, [results, postProcessDishesByIngredients, searchedDish]);

  return (
    <div id="page-container">
      <SelectInput
        options={ingredientsOptions}
        handleChange={handleSelectChange}
        value={selectedValues}
        placeholder="Select Ingredients"
      />
      <div style={{ width: "50vw" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Suggested Dishes For You
        </Title>
        <VirtualizedList<Dish>
          items={dishesData}
          renderItem={(dish) => (
            <div style={{ padding: "2px" }}>
              <Title level={5}>{dish.name}</Title>
              <Space wrap>
                {dish.ingredients.map((ingredient, idx) => (
                  <Badge
                    key={idx}
                    count={ingredient}
                    style={{ backgroundColor: "#52c41a" }}
                  />
                ))}
              </Space>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default DishSuggesterPage;
