import Button from '../../Components/UI/Button';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PiArrowLineRightBold } from 'react-icons/pi';

import IconButton from '../../Components/UI/IconButton';
import CartItem from './CartItem';
import { useSearchParams } from 'react-router-dom';
import Modal from '../../Components/UI/Modal';
import UserDeliveyDetailForm from './UserDeliveyDetailForm';
import { useCreateCartMutation } from '../../services/apiCart';

const Cart = ({ onSidebarHide }) => {
  const [searchParams] = useSearchParams();
  const cart = useSelector(state => state.cart);
  const [createCart, { isLoading: isCartCreating, isSuccess: isCartCreated }] =
    useCreateCartMutation();

  const type = searchParams.get('type');

  const submitCartData = () => {};

  return (
    <div className="flex h-full flex-col overflow-x-hidden px-4 py-3">
      <div className="flex-between mb-4">
        <h2 className="text-[1.4rem] font-[700] ">Current Order</h2>
        <IconButton onClick={onSidebarHide}>
          <PiArrowLineRightBold className="text-primary-500" />
        </IconButton>
      </div>
      {/* Cart Items */}
      <section
        className={`h-full ${
          !cart.items.length ? 'overflow-y-hidden' : ' custom-scrollbar'
        }`}
      >
        {!cart.items.length && (
          <p className="flex-center h-full text-primary-500">
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
      <section className="mt-auto flex flex-col gap-3 border-t-2 p-3">
        <div className="flex justify-between px-3 font-[700]">
          <span>Total:</span>
          <span>Rs. {cart.totalPrice.toFixed(2, 0)}</span>
        </div>
        <div className="flex justify-between">
          <Button
            disabled={isCartCreating}
            variant="dark"
            onClick={submitCartData}
          >
            {isCartCreating ? 'Loading...' : 'Send to Kitchen'}
          </Button>
          {type !== 'delivery' ? (
            <Button variant="dark">Print Invoice</Button>
          ) : (
            <Modal>
              <Modal.Open id="invoice">
                <Button variant="dark">Print Invoice</Button>
              </Modal.Open>
              <Modal.Window
                id="invoice"
                zIndex="z-50"
                closeOnOverlay
                scrollbar={false}
              >
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
