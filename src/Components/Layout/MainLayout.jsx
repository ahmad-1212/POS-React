import { Outlet, useSearchParams } from "react-router-dom";
import {useEffect } from 'react'
import Cart from "../../features/cart/Cart";
import Header from "../Header/Header";
import Categories from "../../features/categories/Categories";
import { useState } from "react";
import PropTypes from "prop-types";
import { FaShoppingCart } from "react-icons/fa";

import Button from "../UI/Button";
import Overlay from "../UI/Overlay";
import { useScreen } from "../../hooks/useScreen";
import { CATEGORIES } from "../../Data/data";

const MainLayout = ({ children }) => {
  const { screen } = useScreen();
  const [showButton, setShowButton] = useState(screen <= 1024);
  const [showCart, setShowCart] = useState(screen > 1024);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const handleCategories = (cat) => {
    searchParams.set("category", cat.toLowerCase());
    setSearchParams(searchParams);
  };

  // Handle Show or Hide cart
  const handleShowCart = () => {
    if (screen < 1024) {
      if (showCart) document.body.style.overflow = "visible";
      if (!showCart) document.body.style.overflow = "hidden";
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

  useEffect(()=>{
    document.title = 'POS | Point of Sale Application'
  },[])

  return (
    <>
      {/* Show Cart Button */}
      <div
        className={`fixed  right-[50px] bottom-[100px] z-10  ${
          showButton ? "opacity-1" : "opacity-0 pointer-events-none"
        } transition-all duration-[1s]`}
      >
        <Button
          variant="dark"
          className="shadow-lg w-[50px] h-[50px] "
          onClick={handleShowCart}
        >
          <FaShoppingCart />
        </Button>
      </div>

      <div>
        {/* Header */}
        <Header showCart={showCart} />
        {/* Left Sidebare with categories */}
        <aside className="hidden md:block fixed inset-0 top-[80px] left-0 w-[18rem] lg:w-[22rem] border-r-2  pb-10 overflow-y-auto bg-white hight-screen ">
          <Categories />
        </aside>
        <section className="md:hidden mt-5 px-4 sm:px-10  overflow-hidden">
          <h2 className="font-[700] text-[1.4rem] mb-3 uppercase tracking-wide">
            Categories
          </h2>

          <ul className="flex flex-nowrap gap-3 overflow-x-auto scrollbar-hidden">
            {CATEGORIES.map((cat, i) => (
              <li key={i}>
                <button
                  onClick={() => handleCategories(cat.name)}
                  className={`px-7 rounded-md py-2 font-[600]  uppercase tracking-wider  ${
                    cat.name.toLowerCase() === category
                      ? "text-white bg-gradient-to-br from-primary-400 to-primary-400"
                      : "bg-gray-200 shadow-lg"
                  } hover:bg-gradient-to-br from-primary-400 to-primary-400 hover:text-white`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </section>
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
          className={`fixed w-[90%] sm:w-[22rem] top-0 lg:top-[80px] bottom-0 right-0 bg-white  ${
            showCart ? "right-0" : "right-[-100dvw] opacity-0"
          } overflow-y-auto lg:border-l-2 hight-screen overflow-x-hidden transition-all duration-[1s] z-20`}
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
