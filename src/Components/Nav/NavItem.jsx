import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoChevronDownOutline } from 'react-icons/io5';
import { useState } from 'react';

const NavItem = ({ link, onClick }) => {
  const [isLinkExtended, setIsLinkExtended] = useState(false);
  if (link.extended)
    return (
      <>
        <li
          className="flex cursor-pointer items-center gap-5 rounded-md px-4 py-2 text-[1.1rem] font-[400] capitalize transition-all hover:bg-primary-500 hover:text-white"
          onClick={() => setIsLinkExtended(prev => !prev)}
        >
          <span className="text-[1.3rem]">{link.icon}</span>
          <span>{link.name}</span>
          <span
            className={`ml-auto ${isLinkExtended ? 'rotate-[180deg]' : 'rotate-[0deg]'} transition-transform duration-500`}
          >
            <IoChevronDownOutline />
          </span>
        </li>
        {isLinkExtended &&
          link.links.map((itm, i) => (
            <li key={i} className="animate-dropdown ml-10">
              <NavLink
                onClick={() => onClick?.()}
                to={itm.link}
                className={({ isActive }) =>
                  isActive
                    ? `flex items-center gap-5 rounded-md bg-primary-500 px-4 py-2 text-[1rem] font-[400] capitalize text-white`
                    : 'flex items-center gap-5 rounded-md px-4 py-2 text-[1rem] font-[400] capitalize transition-all hover:bg-primary-500 hover:text-white '
                }
              >
                {itm.name}
              </NavLink>
            </li>
          ))}
      </>
    );

  return (
    <li key={link.name}>
      <NavLink
        onClick={() => onClick?.()}
        to={link.link}
        className={({ isActive }) =>
          isActive
            ? `flex items-center gap-5 rounded-md bg-primary-500 px-4 py-2 text-[1.1rem] font-[400] capitalize text-white`
            : 'flex items-center gap-5 rounded-md px-4 py-2 text-[1.1rem] font-[400] capitalize transition-all hover:bg-primary-500 hover:text-white '
        }
      >
        <span className="text-[1.3rem]">{link.icon}</span>
        <span>{link.name}</span>
      </NavLink>
    </li>
  );
};

NavItem.propTypes = {
  link: PropTypes.object,
  onClick: PropTypes.func,
};

export default NavItem;
