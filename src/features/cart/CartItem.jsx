import PropTypes from "prop-types";
import { CATEGORIES } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";
const CartItem = ({ itm }) => {
  const dispatch = useDispatch();
  console.log(itm);

  return (
    <li className="flex items-center bg-gray-100 rounded-md py-2 px-3 gap-3">
      <div className="w-[60px] h-[60px]">
        <img src={itm.img} className="w-full h-full object-cover rounded-md" />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <h3 className="font-[600] capitalize text-[0.9rem]">{itm.name}</h3>
        <div className="flex items-center justify-between">
          <h5 className="font-[700] text-primary-500 text-[0.9rem]">
            ${itm.price.toFixed(2, 0)}
          </h5>
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(decreaseItemQuantity(itm))}
              className="border-2 rounded-md px-2 border-primary-500 hover:bg-primary-500 hover:text-primary-100"
            >
              &minus;
            </button>
            <span className="font-[700]">{itm.quantity}</span>
            <button
              onClick={() => dispatch(increaseItemQuantity(itm))}
              className="border-2 rounded-md px-2 border-primary-500 hover:bg-primary-500 hover:text-primary-100"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  itm: PropTypes.object.isRequired,
};

export default CartItem;
