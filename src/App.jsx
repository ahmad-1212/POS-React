import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store";
import LoginPage from "./pages/Auth/LoginPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import MainLayout from "./Components/Layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import DashboardLayout from "./Components/Layout/DashboardLayout";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import SettingsPage from "./pages/SettingsPage";
import IngredientsPage from "./pages/IngredientsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route index path="/" element={<Navigate to="/login" />} />
          <Route path="login" element={<LoginPage />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/add-product" element={<AddProductPage />} />
            <Route
              path="products/edit/:productId"
              element={<EditProductPage />}
            />
            <Route path="ingredients" element={<IngredientsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
