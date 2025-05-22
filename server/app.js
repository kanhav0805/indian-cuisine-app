import express from "express";
import dishRoutes from "./routes/dishes.js";
import cors from "cors";
import { initDishes } from "./controllers/dishController.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/dishes", dishRoutes);

// Health check
// app.get("/", (req, res) => res.send("🍛 Indian Cuisine API is running..."));

export const startApp = async () => {
  await initDishes();
  return app;
};
