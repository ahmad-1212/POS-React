import { Outlet } from "react-router-dom";
import Cart from "../../features/cart/Cart";
import Header from "../Header/Header";
import Categories from "../../features/categories/Categories";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Categories />
      <main className="pl-[28rem] pr-[20rem] max-w-[1500px] mx-auto">
        {children || <Outlet />}
      </main>
      <aside className="fixed top-[80px] right-0 bg-gray-50 w-[20rem] pb-10 overflow-y-auto">
        <Cart />
        <div>side bar left</div>
      </aside>
    </div>
  );
};

export default MainLayout;
