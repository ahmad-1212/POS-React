import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import DashboardNav from "../Nav/DashboardNav";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

import Menu from "../UI/Menu";
import { useScreen } from "../../hooks/useScreen";
import Overlay from "../UI/Overlay";
import { HiX } from "react-icons/hi";
import IconButton from "../UI/IconButton";

const DashboardLayout = ({ children }) => {
  const { screen } = useScreen();
  const [collapseSidebar, setCollapseSidebar] = useState(screen < 768);
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      {screen >= 768 && (
        <div
          onClick={() => setCollapseSidebar((prev) => !prev)}
          className={`fixed  -translate-x-1/2 z-20 text-[2rem] ${
            collapseSidebar ? " -translate-x-1/2 left-[4.7rem]" : "left-[18rem]"
          } transition-all duration-500 bg-transparent w-[2.8rem] h-[2.8rem] flex-center border-2 border-primary-200 cursor-pointer rounded-full text-primary-500`}
        >
          {collapseSidebar ? (
            <MdKeyboardDoubleArrowRight />
          ) : (
            <MdKeyboardDoubleArrowLeft />
          )}
        </div>
      )}
      {screen >= 640 && (
        <aside
          className={`${
            collapseSidebar ? "w-[4.7rem]" : "sm:w-[18rem]"
          } h-[100dvh] fixed top-0 left-0 bg-white border-r-2 transition-all duration-500 overflow-x-hidden`}
        >
          <DashboardNav collapseSidebar={collapseSidebar} />
        </aside>
      )}
      {screen < 640 && (
        <>
          <Overlay
            show={showSidebar}
            onClick={() => setShowSidebar(false)}
            className="z-40"
          />
          <aside
            className={`w-[80dvw] flex justify-center fixed top-0 bg-gray-100 h-[100dvh] z-50 ${
              showSidebar ? "left-0" : "left-[-100dvw]"
            } transition-all`}
          >
            <IconButton
              className="absolute top-[1rem] left-[1rem] text-primary-500 text-[1.5rem]"
              onClick={() => setShowSidebar(false)}
            >
              <HiX />
            </IconButton>
            <DashboardNav onClick={() => setShowSidebar(false)} />
          </aside>
        </>
      )}
      <main
        className={`${
          collapseSidebar ? "pl-0 sm:pl-[4.7rem]" : "pl-[18rem]"
        } h-screen w-full transition-all duration-500`}
      >
        <header className=" bg-white px-10 flex-end h-[70px] border-b-2">
          {screen < 640 && (
            <div>
              <IoMenu
                className="text-[1.5rem] cursor-pointer"
                onClick={() => setShowSidebar((prev) => !prev)}
              />
            </div>
          )}
          <div className="relative ml-auto">
            <Menu>
              <Menu.Open>
                <div className="relative w-[3rem] h-[3rem] rounded-full overflow-hidden cursor-pointer">
                  <img
                    src="/demo-img.jpg"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Menu.Open>
              <Menu.List>
                <ul className="bg-white px-3 py-4 shadow-lg rounded-lg flex flex-col gap-4 w-max">
                  <li className="flex items-center gap-3 text-[0.8rem] break-words">
                    <img
                      className="w-[2rem] h-[2rem] rounded-full object-cover"
                      src="/demo-img.jpg"
                    />
                    <span>demo@example.com</span>
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => location.assign("/")}
                  >
                    Logout
                  </li>
                </ul>
              </Menu.List>
            </Menu>
          </div>
        </header>
        <div className="flex flex-col px-5 md:px-10 max-w-[1200px] mx-auto  overflow-hidden pb-20">
          {children || <Outlet />}
        </div>
      </main>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
