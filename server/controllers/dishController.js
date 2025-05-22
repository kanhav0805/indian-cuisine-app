import { loadCSVData } from "../utils/csvLoader.js";

let dishes = [];

export const initDishes = async () => {
  try {
    const rawDishes = await loadCSVData("./data/indian_food.csv");

    dishes = rawDishes.map((dish) => {
      const sanitizedDish = {};
      for (let key in dish) {
        const value = dish[key];
        sanitizedDish[key] =
          value === "-1" || value.trim() === "" ? null : value;
      }

      return {
        ...sanitizedDish,
        ingredients: sanitizedDish["ingredients"]
          ?.split(",")
          .map((item) => item.trim()),
      };
    });
  } catch (error) {
    console.error("Error initializing dishes:", error);
  }
};

export const getAllDishes = async (req, res) => {
  try {
    res.json(dishes);
  } catch (error) {
    console.error("Error fetching all dishes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDishByName = async (req, res) => {
  try {
    const name = req.params.name.toLowerCase();
    const dish = dishes.find((d) => d.name?.toLowerCase() === name);
    return dish
      ? res.json(dish)
      : res.status(404).json({ message: "Dish not found" });
  } catch (error) {
    console.error("Error fetching dish by name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const suggestDishesByIngredients = async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!Array.isArray(ingredients)) {
      return res
        .status(400)
        .json({ message: "Ingredients should be an array" });
    }

    const lowerIngredients = ingredients.map((i) => i.toLowerCase());

    const possibleDishes =
      ingredients.length === 0
        ? dishes
        : dishes.filter((dish) =>
            dish.ingredients?.every((i) =>
              lowerIngredients.includes(i.toLowerCase())
            )
          );

    res.json(possibleDishes);
  } catch (error) {
    console.error("Error suggesting dishes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchDishes = async (req, res) => {
  try {
    const query = req.query.q?.toLowerCase();
    if (!query) return res.json([]);

    const results = dishes.filter(
      (dish) =>
        dish.name?.toLowerCase().includes(query) ||
        dish.ingredients?.some((item) => item.toLowerCase().includes(query)) ||
        dish.state?.toLowerCase().includes(query) ||
        dish.region?.toLowerCase().includes(query)
    );

    const suggestions = results.map((dish) => ({
      label: dish.name,
      value: dish.id || dish.name,
    }));

    const uniqueSuggestions = Array.from(
      new Map(
        suggestions.map((item) => [item.label.toLowerCase(), item])
      ).values()
    );

    res.json(uniqueSuggestions);
  } catch (error) {
    console.error("Error searching dishes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getIngredientsOptions = async (req, res) => {
  try {
    const ingredientsSet = new Set();
    dishes.forEach((dish) => {
      dish?.ingredients?.forEach((ingredient) =>
        ingredientsSet.add(ingredient)
      );
    });

    const ingredients = [...ingredientsSet].map((ingredient) => ({
      label: ingredient,
      value: ingredient,
    }));

    res.json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredient options:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
