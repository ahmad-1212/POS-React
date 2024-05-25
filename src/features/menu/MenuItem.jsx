import PropTypes from "prop-types";
import { GiHamburger } from "react-icons/gi";
import { GiFrenchFries, GiFullPizza } from "react-icons/gi";
import { LuSalad, LuDessert, LuSandwich } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { addCartItem } from "../cart/cartSlice";
import RippleEffect from "../../Components/UI/RippleEffect";
import { CATEGORIES } from "../../Data/data";

// const ICONS = {
//   burger: <GiHamburger />,
//   fries: <GiFrenchFries />,
//   salad: <LuSalad />,
//   dessert: <LuDessert />,
//   pizza: <GiFullPizza />,
//   sandwich: <LuSandwich />,
// };

const MenuItem = ({ item, category }) => {
  const dispatch = useDispatch();
  const img = CATEGORIES.find(
    (ct) => ct.name.toLowerCase() === category.toLowerCase()
  ).image;
  return (
    <li
      className="w-full shadow-sm cursor-pointer hover:shadow-lg overflow-hidden  rounded-lg hover:scale-105 bg-white"
      onClick={() => dispatch(addCartItem({ ...item, img }))}
    >
      <RippleEffect>
        <div className=" p-3 shadow-sm border-1 bg-white flex flex-col justify-between h-full">
          {/* <div className="text-[1.2rem] text-primary-500">
            {ICONS[category]}
          </div> */}

          <h2 className="font-[600] text-[0.9rem]">{item.name}</h2>
          <div className="flex justify-end">
            <img
              src={img}
              loading="lazy"
              className="w-[4rem] h-[4rem] rounded-full object-cover border-[3px] border-primary-500/40"
            />
          </div>
          <div className="">
            <span className="font-[700] text-primary-500 text-[1rem]">
              {" "}
              ${item.price}/
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
