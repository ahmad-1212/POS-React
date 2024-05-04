import PropTypes from "prop-types";
import { GiHamburger } from "react-icons/gi";
import { GiFrenchFries, GiFullPizza } from "react-icons/gi";
import { LuSalad, LuDessert, LuSandwich } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { addCartItem } from "../cart/cartSlice";
import RippleEffect from "../../Components/UI/RippleEffect";

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
      className="w-full shadow-sm cursor-pointer hover:shadow-lg overflow-hidden  rounded-lg hover:scale-105"
      onClick={() => dispatch(addCartItem({ name: category, price: 18.99 }))}
    >
      <RippleEffect>
        <div className=" p-3 shadow-sm border-1 bg-white grid grid-cols-[max-content,1fr] items-center gap-3 ">
          <div className="text-[1.4rem] text-primary-500">
            {ICONS[category]}
          </div>

          <h2 className="font-[600] text-[1.4rem]">{category} Name</h2>
          <div className=" flex items-end col-start-2">
            <span className="font-[700] text-primary-500 text-[1rem]">
              {" "}
              $18.99/
            </span>
            <span className="text-[500] text-gray-400">pcs</span>
          </div>
        </div>
      </RippleEffect>
    </li>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object,
  category: PropTypes.string,
};

export default MenuItem;
