import { RxDashboard } from "react-icons/rx";
import { FiCheckSquare } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { RxLayers } from "react-icons/rx";
import { LuClipboardList } from "react-icons/lu";
import { GoHome } from "react-icons/go";

const LINKS = [
  {
    link: "/home",
    icon: <GoHome />,
    name: "home",
  },
  {
    link: "/dashboard",
    icon: <RxDashboard />,
    name: "dashboard",
  },
  {
    link: "/orders",
    icon: <FiCheckSquare />,
    name: "orders",
  },
  {
    link: "/categories",
    icon: <RxLayers />,
    name: "categories",
  },
  {
    link: "/products",
    icon: <LuClipboardList />,
    name: "porducts",
  },
];

const DashboardNav = ({ collapseSidebar }) => {
  return (
    <div
      className={`flex flex-col pt-14 p-10 ${
        collapseSidebar ? "pl-5" : ""
      } w-[18rem] transition-all`}
    >
      <nav>
        <ul className="flex flex-col gap-3">
          {LINKS.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.link}
                className={({ isActive }) =>
                  isActive
                    ? `bg-primary-500 flex items-center text-[1.3rem] font-[400] text-white capitalize px-4 py-2 rounded-md gap-5`
                    : "flex items-center gap-5 text-[1.3rem] font-[400] capitalize px-4 py-2 rounded-md hover:bg-primary-500 hover:text-white transition-all "
                }
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

DashboardNav.propTypes = {
  collapseSidebar: PropTypes.bool,
};

export default DashboardNav;
