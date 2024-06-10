/* eslint-disable */
import React from 'react';

const Invoice = React.forwardRef(({ cart }, ref) => {
  return (
    <div ref={ref}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Restaurant Name</h1>
        <p>Restaurant Address, City, Country</p>
        <p>Phone: (123) 456-7890 | Email: info@Restaurant.com</p>
      </div>
      <div style={{ marginBottom: '20px' }}>
        {cart?.userInfo?.name && <p>Guest Name: {cart?.userInfo?.name}</p>}
        {cart?.userInfo?.phone && <p>Phone Number: {cart?.userInfo?.phone}</p>}
        {cart?.userInfo?.address && <p>Address: {cart?.userInfo?.address}</p>}
        <p>Order ID: #{cart.orderId}</p>
        <p>Date: {new Date().toLocaleDateString()}</p>
      </div>
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
          {cart.items.map((itm, i) => (
            <tr key={i}>
              <td style={{ border: '1px solid #000', padding: '8px' }}>
                {itm.name}
              </td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>
                {itm.quantity}
              </td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>
                {(+itm.price * itm.quantity).toFixed(2, 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <p>Total: Rs. {cart.totalPrice.toFixed(2, 0)}</p>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Thank you for eating with us!</p>
      </div>
    </div>
  );
});

export default Invoice;
