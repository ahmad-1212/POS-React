import { Outlet } from "react-router-dom";
import Cart from "../../features/cart/Cart";
import Header from "../Header/Header";
import Categories from "../../features/categories/Categories";
import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../UI/Button";
import Overlay from "../UI/Overlay";
import { useScreen } from "../../hooks/useScreen";

const MainLayout = ({ children }) => {
  const [showCart, setShowCart] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const { screen } = useScreen();

  // Handle Show or Hide cart
  const handleShowCart = () => {
    if (screen < 1024) {
      if (showCart) document.documentElement.style.overflow = "visible";
      if (!showCart) document.documentElement.style.overflow = "hidden";
    }
    setShowCart((prev) => !prev);

    // show button after a little time for animation
    if (showCart) {
      setTimeout(() => {
        setShowButton(true);
      }, 1000);
    } else {
      setShowButton(false);
    }
  };

  return (
    <>
      {/* Show Cart Button */}
      <div
        className={`fixed  right-[50px] top-[100px]  ${
          showButton ? "opacity-1" : "opacity-0 pointer-events-none"
        } transition-all duration-[1s]`}
      >
        <Button variant="dark" onClick={handleShowCart}>
          Show Cart
        </Button>
      </div>

      <div>
        {/* Header */}
        <Header showCart={showCart} />
        {/* Left Sidebare with categories */}
        <aside className="hidden md:block fixed inset-0 top-[80px] left-0 w-[18rem] lg:w-[22rem] pb-10 overflow-y-auto bg-white hight-screen ">
          <Categories />
        </aside>
        {/* Main  */}
        <main
          className={`pl-0 md:pl-[18rem] lg:pl-[22rem] max-w-[1500px] mx-auto ${
            showCart ? "lg:pr-[20rem]" : "pr-0"
          } transition-all duration-[1s]`}
        >
          {children || <Outlet />}
        </main>
        {/* Right sidebar with cart */}
        <aside
          className={`fixed w-[22rem] top-0 lg:top-[80px] bottom-0 right-0 bg-white  ${
            showCart ? "right-0" : "right-[-100dvw] opacity-0"
          } pb-10 overflow-y-auto lg:border-l-2 hight-screen overflow-x-hidden transition-all duration-[1s] z-20`}
        >
          <Cart onSidebarHide={handleShowCart} />
        </aside>
        <Overlay
          show={showCart}
          className="z-10 lg:hidden lg:pointer-events-none"
          onClick={handleShowCart}
        />
      </div>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
