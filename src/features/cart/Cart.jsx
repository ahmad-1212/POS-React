import Button from "../../Components/UI/Button";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { PiArrowLineRightBold } from "react-icons/pi";

import IconButton from "../../Components/UI/IconButton";
import CartItem from "./CartItem";
import { useSearchParams } from "react-router-dom";
import Modal from "../../Components/UI/Modal";
import UserDeliveyDetailForm from "./UserDeliveyDetailForm";

const Cart = ({ onSidebarHide }) => {
  const [searchParams] = useSearchParams();
  const cart = useSelector((state) => state.cart);

  const type = searchParams.get("type");

  return (
    <div className="px-4 py-3 h-full flex flex-col overflow-x-hidden">
      <div className="flex-between mb-4">
        <h2 className="font-[700] text-[1.4rem] ">Current Order</h2>
        <IconButton onClick={onSidebarHide}>
          <PiArrowLineRightBold />
        </IconButton>
      </div>
      {/* Cart Items */}
      <section
        className={`h-full ${
          !cart.items.length ? "overflow-y-hidden" : "overflow-y-auto"
        } scrollbar-hidden`}
      >
        {!cart.items.length && (
          <p className="text-primary-500 h-full flex-center">
            No Items added yet!
          </p>
        )}
        <ul className="flex flex-col gap-3 pb-16">
          {cart.items.map((itm, i) => (
            <CartItem key={i} itm={itm} />
          ))}
        </ul>
      </section>
      {/* Total bill and print or send to kitchen Buttons */}
      <section className="mt-auto p-3 flex flex-col gap-3 border-t-2">
        <div className="flex justify-between font-[700] px-3">
          <span>Total:</span>
          <span>${cart.totalPrice.toFixed(2, 0)}</span>
        </div>
        <div className="flex justify-between">
          <Button variant="dark">Send to Kitchen</Button>
          {type !== "delivery" ? (
            <Button variant="dark">Print Invoice</Button>
          ) : (
            <Modal>
              <Modal.Open>
                <Button variant="dark">Print Invoice</Button>
              </Modal.Open>
              <Modal.Window zIndex="z-50" closeOnOverlay scrollbar={false}>
                <UserDeliveyDetailForm />
              </Modal.Window>
            </Modal>
          )}
        </div>
      </section>
    </div>
  );
};

Cart.propTypes = {
  onSidebarHide: PropTypes.func,
};

export default Cart;
