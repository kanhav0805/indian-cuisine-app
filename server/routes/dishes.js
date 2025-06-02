import express from "express";
import {
  getAllDishes,
  getDishByName,
  suggestDishesByIngredients,
  searchDishes,
  getIngredientsOptions,
  getPaginatedData,
} from "../controllers/dishController.js";

const router = express.Router();

router.get("/paginated", getPaginatedData);
router.get("/data", getAllDishes);
router.get("/ingredients", getIngredientsOptions);
router.get("/search", searchDishes);
router.get("/:name", getDishByName);
router.post("/suggest", suggestDishesByIngredients);

export default router;
