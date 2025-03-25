import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

import Modal from '../../Components/UI/Modal';
import Checkout from './Checkout';

const Cart = ({ onSidebarHide }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate();

  // Memoized values to avoid unnecessary recalculations
  const isLock = useMemo(() => cart.items.some(itm => itm.lock), [cart.items]);
  const isOrderAlreadyCreated = useMemo(
    () => cart.items.some(itm => itm.lock === true),
    [cart.items],
  );
  const isAnyOrderItem = useMemo(
    () => cart.items.some(itm => !itm.lock || itm.updated),
    [cart.items],
  );

  // Get table and type
  const table = searchParams.get('table');
  const type = searchParams.get('type')?.toLowerCase().replace(' ', '_');

  // API Mutations
  const [
    addOrder,
    {
      isLoading: isAdding,
      isSuccess: isAdded,
      error: addError,
      data: orderData,
      reset: resetAddOrder,
    },
  ] = useCreateOrderMutation();
  const [
    updateOrder,
    {
      isLoading: isUpdating,
      isSuccess: isUpdated,
      error: updateError,
      data: updatedData,
      reset: resetUpdateOrder,
    },
  ] = useUpdateOrderMutation();

  // Helper function to structure order data
  const getOrderData = () => {
    const products = cart.items
      .filter(itm => !itm.deal)
      .map(itm => ({ product: itm._id, quantity: +itm.quantity }));
    const deals = cart.items
      .filter(itm => itm.deal)
      .map(itm => ({ deal: itm._id, quantity: +itm.quantity }));

    return type === 'dine_in'
      ? { type, table, products, deals }
      : { type, products, deals, ...cart.userInfo };
  };

  // Create or update order
  const handleOrder = () => {
    const data = getOrderData();
    isOrderAlreadyCreated
      ? updateOrder({ id: cart.orderId, data })
      : addOrder(data);
  };

  // clear cart
  const onClearCart = () => {
    dispatch(clearCart());
    navigate('/home', { replace: true });
  };

  // Handle success/error state
  useEffect(() => {
    if (isAdded || isUpdated) {
      toast.success(
        isAdded ? 'Order successfully created!' : 'Order successfully updated!',
      );
      dispatch(
        lockItems({
          orderId: orderData?.order?.orderId || updatedData?.orderId,
        }),
      );
      isAdded ? resetAddOrder() : resetUpdateOrder();
    }
  }, [isAdded, isUpdated]);

  useEffect(() => {
    console.log(addError);
    if (addError || updateError) {
      const errorMessage =
        addError?.message || updateError?.message || 'An error occurred!';
      console.error('Order Error:', addError || updateError);
      toast.error(errorMessage);
      addError ? resetAddOrder() : resetUpdateOrder();
    }
  }, [addError, updateError]);

  return (
    <div className="flex h-full flex-col overflow-x-hidden px-4 py-3">
      <div className="flex-between mb-4">
        <h2 className="text-[1.4rem] font-[700]">Current Order</h2>
        <IconButton onClick={onSidebarHide}>
          <PiArrowLineRightBold className="text-primary-500" />
        </IconButton>
      </div>

      {/* Clear cart button */}
      <div className="flex-end mb-1">
        <button
          disabled={!cart.items.length}
          onClick={onClearCart}
          className="rounded-lg bg-red-500 px-3 py-[2px] text-white disabled:opacity-50"
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Items */}
      <section
        className={`h-full ${!cart.items.length ? 'overflow-y-hidden' : 'custom-scrollbar'}`}
      >
        {!cart.items.length ? (
          <p className="flex-center h-full text-[0.9rem] font-[500] text-primary-500">
            No Items added yet!
          </p>
        ) : (
          <ul className="flex flex-col gap-3 pb-16">
            {cart.items.map((itm, i) => (
              <CartItem key={i} itm={itm} />
            ))}
          </ul>
        )}
      </section>

      {/* Total bill and print or send to kitchen Buttons */}
      <section className="mt-auto flex flex-col gap-3 border-t-2 p-3">
        <div className="flex justify-between px-3 font-[700]">
          <span>Total:</span>
          <span>Rs. {Number(cart.totalPrice).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <Button
            disabled={
              isAdding || isUpdating || !cart?.items.length || !isAnyOrderItem
            }
            variant="dark"
            onClick={handleOrder}
            isLoading={isAdding || isUpdating}
          >
            Send to Kitchen
          </Button>
          <Modal>
            <Modal.Open id="checkout">
              <Button
                disabled={
                  !cart?.items.length || !isLock || isAdding || isUpdating
                }
                variant="dark"
                onClick={handleOrder}
              >
                Checkout
              </Button>
            </Modal.Open>
            <Modal.Window id="checkout" closeOnOverlay zIndex="z-50">
              <Checkout />
            </Modal.Window>
          </Modal>
        </div>
      </section>
    </div>
  );
};

Cart.propTypes = {
  onSidebarHide: PropTypes.func,
};

export default Cart;
