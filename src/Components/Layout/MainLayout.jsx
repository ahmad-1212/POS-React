import { Outlet } from "react-router-dom";
import Cart from "../../features/cart/Cart";
import Header from "../Header/Header";
import Categories from "../../features/categories/Categories";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <aside className="fixed  inset-0 top-[80px] left-0 w-[28rem] pb-10 overflow-y-auto bg-white hight-screen ">
        <Categories />
      </aside>
      <main className="pl-[28rem] pr-[22rem] max-w-[1500px] mx-auto">
        {children || <Outlet />}
      </main>
      <aside className="fixed top-[80px] bottom-0 right-0 bg-white w-[22rem] pb-10 overflow-y-auto border-l-2 hight-screen overflow-x-hidden">
        <Cart />
      </aside>
    </div>
  );
};

export default MainLayout;
