import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store";
import LoginPage from "./pages/Auth/LoginPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import MainLayout from "./Components/Layout/MainLayout";

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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
