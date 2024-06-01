import Button from '../../Components/UI/Button';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PiArrowLineRightBold } from 'react-icons/pi';

import IconButton from '../../Components/UI/IconButton';
import CartItem from './CartItem';
import { useSearchParams } from 'react-router-dom';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../../services/apiOrders';

const Cart = ({ onSidebarHide }) => {
  const [searchParams] = useSearchParams();
  const [addOrder, { isLoading: isAdding, isSuccess: isAdded, error }] =
    useCreateOrderMutation();
  const cart = useSelector(state => state.cart);

  const table = searchParams.get('table');
  const type = searchParams.get('type');

  const createOrder = () => {
    const products = {};
    cart.items.forEach(itm => (products[itm.productID] = itm.quantity));
    let data = {};
    if (type === 'dine in') {
      data = {
        option: type.toLowerCase().replace(' ', '_'),
        table,
        products,
      };
    } else {
      data = {
        option: type.toLowerCase().replace(' ', '_'),
        products,
        customer_name: cart.userInfo.name,
        address: cart.userInfo.address,
        phone_number: cart.userInfo.phoneNumber,
      };
    }

    addOrder(data);
  };

  useEffect(() => {
    if (isAdded) toast.success('Order successfully created!');
    if (error) toast.error(error?.data?.error);
  }, [isAdded, error]);

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
            disabled={isAdded || !cart?.items.length}
            variant="dark"
            onClick={createOrder}
          >
            {isAdding ? 'Loading...' : 'Send to Kitchen'}
          </Button>

          <Button disabled={!cart?.items.length} variant="dark">
            Print Invoice
          </Button>
        </div>
      </section>
    </div>
  );
};

Cart.propTypes = {
  onSidebarHide: PropTypes.func,
};

export default Cart;
