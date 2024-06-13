import { useRef } from 'react';
import { useGetInvoiceMutation } from '../../services/apiOrders';
import { useDispatch, useSelector } from 'react-redux';
import Invoice from '../../Components/Invoice/Invoice';
import Button from '../../Components/UI/Button';
import { useReactToPrint } from 'react-to-print';
import { clearCart } from './cartSlice';

const PrintButton = ({ isLoading }) => {
  const [getInvoice, { isLoading: isGetting }] = useGetInvoiceMutation();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const isLock = cart.items.some(itm => itm.lock);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: 'Invoice',
    content: () => componentRef.current,
    onBeforeGetContent: () => getInvoice(cart.orderId),
    onAfterPrint: () => dispatch(clearCart()),
  });
  return (
    <>
      <Button
        onClick={handlePrint}
        disabled={!cart?.items.length || isGetting || !isLock || isLoading}
        variant="dark"
      >
        {isGetting ? 'Loading...' : 'Print Invoice'}
      </Button>
      <div className="hidden">
        <Invoice ref={componentRef} cart={cart} />
      </div>
    </>
  );
};

export default PrintButton;
