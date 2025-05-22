import { startApp } from "./app.js";

const PORT = process.env.PORT || 5000;

startApp().then((app) => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
});
