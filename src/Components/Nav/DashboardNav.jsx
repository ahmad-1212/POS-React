import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { RxDashboard, RxLayers } from 'react-icons/rx';
import { FiCheckSquare } from 'react-icons/fi';
import { LuClipboardList } from 'react-icons/lu';
import { GoHome } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaRegListAlt } from 'react-icons/fa';

const LINKS = [
  {
    link: '/home',
    icon: <GoHome />,
    name: 'home',
  },
  {
    link: '/dashboard',
    icon: <RxDashboard />,
    name: 'dashboard',
  },
  {
    link: '/orders',
    icon: <FiCheckSquare />,
    name: 'orders',
  },
  {
    link: '/categories',
    icon: <RxLayers />,
    name: 'categories',
  },
  {
    link: '/products',
    icon: <LuClipboardList />,
    name: 'porducts',
  },
  {
    link: '/ingredients',
    icon: <FaRegListAlt />,
    name: 'ingredients',
  },
  {
    link: '/settings',
    icon: <IoSettingsOutline />,
    name: 'settings',
  },
];

const DashboardNav = ({ collapseSidebar, onClick }) => {
  return (
    <div
      className={`flex flex-col p-10 pt-14 ${
        collapseSidebar ? 'pl-5' : ''
      } w-[18rem] transition-all`}
    >
      <nav>
        <ul className="flex flex-col gap-3">
          {LINKS.map(link => (
            <li key={link.name}>
              <NavLink
                onClick={() => onClick?.()}
                to={link.link}
                className={({ isActive }) =>
                  isActive
                    ? `flex items-center gap-5 rounded-md bg-primary-500 px-4 py-2 text-[1.3rem] font-[400] capitalize text-white`
                    : 'flex items-center gap-5 rounded-md px-4 py-2 text-[1.3rem] font-[400] capitalize transition-all hover:bg-primary-500 hover:text-white '
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
  onClick: PropTypes.func,
};

export default DashboardNav;
