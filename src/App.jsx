import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import LoginPage from './pages/Auth/LoginPage';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import MainLayout from './Components/Layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import DashboardLayout from './Components/Layout/DashboardLayout';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import SettingsPage from './pages/SettingsPage';
import IngredientsPage from './pages/IngredientsPage';
import MainInventoryPage from './pages/MainInventoryPage';
import KitchenInventoryPage from './pages/KitchenInventoryPage';
import DealsPage from './pages/DealsPage';
import AddDealPage from './pages/AddDealPage';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
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
            <Route path="main-inventory" element={<MainInventoryPage />} />
            <Route
              path="kitchen-inventory"
              element={<KitchenInventoryPage />}
            />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/add-product" element={<AddProductPage />} />
            <Route
              path="products/edit/:productId"
              element={<EditProductPage />}
            />
            <Route path="ingredients" element={<IngredientsPage />} />
            <Route path="deals" element={<DealsPage />} />
            <Route path="deals/add" element={<AddDealPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
