import { useRef } from 'react';
import { useUpdateOrderStatusMutation } from '../../services/apiOrders';
import { useDispatch, useSelector } from 'react-redux';
import Invoice from '../../Invoice';
import Button from '../../Components/UI/Button';
import { useReactToPrint } from 'react-to-print';
import { clearCart } from './cartSlice';

const PrintButton = () => {
  const [updateOrderStatus, { isLoading, data }] =
    useUpdateOrderStatusMutation();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const isLock = cart.items.some(itm => itm.lock);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () =>
      updateOrderStatus({
        id: cart.orderId,
        data: { status: 'completed' },
      }),
    onAfterPrint: () => dispatch(clearCart()),
  });
  return (
    <>
      <Button
        onClick={handlePrint}
        disabled={!cart?.items.length || isLoading || !isLock}
        variant="dark"
      >
        {isLoading ? 'Loading...' : 'Print Invoice'}
      </Button>
      <div className="hidden">
        <Invoice ref={componentRef} cart={cart} />
      </div>
    </>
  );
};

export default PrintButton;
