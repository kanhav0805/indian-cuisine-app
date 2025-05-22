import "./App.css";
import DishListPage from "./Pages/DishList/DishListPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import AppHeader from "./Components/AppHeader/AppHeader";
import DishDetailsPage from "./Pages/DishDetails/DishDetailsPage";
import DishSuggesterPage from "./Pages/DishSuggester/DishSuggesterPage";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <AppHeader />
        <Content>
          <Routes>
            <Route path="/" element={<DishListPage />} />
            <Route path="/dishSelector" element={<DishSuggesterPage />} />
            <Route path="/dishDetails/:name" element={<DishDetailsPage />} />
          </Routes>
        </Content>
      </div>
    </Router>
  );
}

export default App;
