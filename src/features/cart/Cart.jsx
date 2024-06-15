import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { PiArrowLineRightBold } from 'react-icons/pi';

import Button from '../../Components/UI/Button';
import IconButton from '../../Components/UI/IconButton';
import CartItem from './CartItem';
import {
  useCreateOrderMutation,
  useUpdateOrderMutation,
} from '../../services/apiOrders';
import { clearCart, lockItems } from './cartSlice';

import PrintButton from './PrintButton';

const Cart = ({ onSidebarHide }) => {
  const [searchParams] = useSearchParams();

  const [
    addOrder,
    {
      isLoading: isAdding,
      isSuccess: isAdded,
      error,
      data: orderData,
      reset: resetAddOrder,
    },
  ] = useCreateOrderMutation();

  const [
    updateOrder,
    {
      isLoading: isUpdating,
      isSuccess: isUpdated,
      data: updatedData,
      error: updateError,
      reset: resetUpdateOrder,
    },
  ] = useUpdateOrderMutation();
  console.log(isAdding);
  const cart = useSelector(state => state.cart);
  const isOrderAlreadyCreated = cart.items.some(itm => itm.lock === true);
  const isAnyOrderItem = cart.items.some(itm => !itm.lock || itm.updated);

  const dispatch = useDispatch();

  const table = searchParams.get('table');
  const type = searchParams.get('type');

  // Create or update order
  const handleOrder = () => {
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
        phone_number: cart.userInfo.phone,
      };
    }
    if (isOrderAlreadyCreated) {
      updateOrder({ id: cart.orderId, data });
    } else {
      addOrder(data);
    }
  };

  // Handle success/error state
  useEffect(() => {
    if (isAdded) {
      toast.success('Order successfully created!');
      resetAddOrder();
      dispatch(lockItems({ orderId: orderData.id }));
    }
    if (isUpdated) {
      toast.success('Order successfully updated!');
      resetUpdateOrder();
      dispatch(lockItems({ orderId: updatedData.id }));
    }
    if (error) toast.error(error?.data?.error);
    if (updateError) toast.error(error?.data?.message);
  }, [
    isAdded,
    error,
    isUpdated,
    dispatch,
    resetAddOrder,
    resetUpdateOrder,
    updatedData?.id,
    orderData?.id,
    updateError,
  ]);

  return (
    <div className="flex h-full flex-col overflow-x-hidden px-4 py-3">
      <div className="flex-between mb-4">
        <h2 className="text-[1.4rem] font-[700] ">Current Order</h2>
        <IconButton onClick={onSidebarHide}>
          <PiArrowLineRightBold className="text-primary-500" />
        </IconButton>
      </div>
      {/* Clear cart button */}
      <div className="flex-end mb-1">
        <button
          disabled={!cart.items.length}
          onClick={() => dispatch(clearCart())}
          className="rounded-lg bg-red-500 px-3 py-[2px] text-white disabled:opacity-50"
        >
          Clear Cart
        </button>
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
          <span>Rs. {Number(cart.totalPrice).toFixed(2, 0)}</span>
        </div>
        <div className="flex justify-between">
          <Button
            disabled={
              isAdding || isUpdating || !cart?.items.length || !isAnyOrderItem
            }
            variant="dark"
            onClick={handleOrder}
          >
            {isAdding || isUpdating ? 'Loading...' : 'Send to Kitchen'}
          </Button>
          <PrintButton isLoading={isAdding || isUpdating} />
        </div>
      </section>
    </div>
  );
};

Cart.propTypes = {
  onSidebarHide: PropTypes.func,
};

export default Cart;
