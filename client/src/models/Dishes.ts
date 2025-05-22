export type Dish = {
  name: string;
  ingredients: string[];
  diet: "vegetarian" | "non-vegetarian" | "vegan";
  prep_time: string;
  cook_time: string;
  flavor_profile: "sweet" | "savory" | "spicy" | "sour" | "bitter" | "umami";
  course: "appetizer" | "main" | "dessert" | "snack" | "side";
  state: string;
  region: string;
};

export type DishList = Dish[];
