import PropTypes from "prop-types";
import { GiHamburger } from "react-icons/gi";
import { GiFrenchFries, GiFullPizza } from "react-icons/gi";
import { LuSalad, LuDessert, LuSandwich } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { addCartItem } from "../cart/cartSlice";

const ICONS = {
  burger: <GiHamburger />,
  fries: <GiFrenchFries />,
  salad: <LuSalad />,
  dessert: <LuDessert />,
  pizza: <GiFullPizza />,
  sandwich: <LuSandwich />,
};

const MenuItem = ({ item, category }) => {
  const dispatch = useDispatch();
  return (
    <li
      className="w-full p-3 shadow-sm border-1 rounded-lg bg-white grid grid-cols-[max-content,1fr] gap-3 hover:scale-105 hover:shadow-lg"
      onClick={() => dispatch(addCartItem({ name: category, price: 18.99 }))}
    >
      <div className="text-[1.5rem] text-primary-500">{ICONS[category]}</div>

      <div>
        <div className="flex-between">
          <h2 className="font-[600] text-[1.2rem]">{category} Name</h2>
        </div>
        <div className=" flex items-end">
          <span className="font-[700] text-primary-500 text-[1rem]">
            {" "}
            $18.99/
          </span>
          <span className="text-[500] text-gray-400">pcs</span>
        </div>
      </div>
    </li>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object,
  category: PropTypes.string,
};

export default MenuItem;
