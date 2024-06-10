import PropTypes from 'prop-types';
import Button from '../../Components/UI/Button';

const OrderDetail = ({ order, onCloseModal }) => {
  console.log(order);
  return (
    <div>
      <h1 className="bg-primary-500 py-3 text-center text-[1.3rem] font-[600] text-white">
        Order Details
      </h1>
      <div className="p-4 ">
        <div className="mb-4 grid grid-cols-2 gap-3">
          <p>
            <strong>Name:</strong> {order?.customer_name}
          </p>
          <p>
            <strong>Table:</strong> {order?.cart?.table}
          </p>
          <p>
            <strong>Phone:</strong> {order?.phone_number}
          </p>
          <p className="capitalize">
            <strong>Type:</strong> {order?.cart.option.replace('_', ' ')}
          </p>
        </div>
        <div className="mt-8">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th
                  style={{
                    border: '1px solid #000',
                    padding: '8px',
                    textAlign: 'left',
                  }}
                >
                  Products
                </th>
                <th
                  style={{
                    border: '1px solid #000',
                    padding: '8px',
                    textAlign: 'left',
                  }}
                >
                  Qty
                </th>
                <th
                  style={{
                    border: '1px solid #000',
                    padding: '8px',
                    textAlign: 'left',
                  }}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {order.cart.products.map((itm, i) => (
                <tr key={i}>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    {itm.product.name}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    {itm.quantity}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    {(+itm.product.price * itm.quantity).toFixed(2, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-between mb-4 mt-3">
          <p>
            <strong>Total Items:</strong>{' '}
            {order.cart.products.reduce((acc, itm) => acc + itm.quantity, 0)}
          </p>
          <p>
            <strong>Total Price:</strong> Rs.{' '}
            {Number(order.cart.price).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex justify-end border-t p-4">
        <Button onClick={onCloseModal} variant="dark">
          Close
        </Button>
      </div>
    </div>
  );
};

OrderDetail.propTypes = {
  order: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func,
};

export default OrderDetail;
