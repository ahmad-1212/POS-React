import { useEffect } from 'react';
import Spinner from '../../Components/UI/Spinner';
import {
  useGetActiveOrdersQuery,
  useGetOrderByIDMutation,
} from '../../services/apiOrders';
import { useDispatch } from 'react-redux';
import { addCartData } from '../cart/cartSlice';
import { useGetCategoriesQuery } from '../../services/apiCategories';
import { useSearchParams } from 'react-router-dom';

const ActiveOrders = ({ onCloseModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading } = useGetActiveOrdersQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [
    getOrderByID,
    {
      isLoading: isFetchingById,
      isSuccess: isFetchedOrder,
      error,
      data: order,
    },
  ] = useGetOrderByIDMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetchedOrder) {
      onCloseModal();
      const items = order.cart.products.map(prod => {
        const img = categories?.results?.find(
          cat => cat?.name === prod.product.category.name,
        )?.image;

        return {
          ...prod.product,
          quantity: prod.quantity,
          img,
        };
      });

      const userInfo = {
        name: order.customer_name,
        phone: order.phone_number,
        address: order.address,
      };

      dispatch(addCartData({ items, userInfo, orderId: order.id }));
    }
  }, [isFetchedOrder]);

  useEffect(() => {
    if (isFetchedOrder) {
      if (order.cart.option === 'dine_in') {
        searchParams.set('table', order.cart.table);
      }
      searchParams.set('type', order.cart.option.replace('_', ' '));
      setSearchParams(searchParams);
    }
  }, [isFetchedOrder]);

  return (
    <div className="relative px-5 py-10">
      {isFetchingById && (
        <div className="flex-center absolute inset-0 z-50 h-full w-full bg-white/80">
          <Spinner />
        </div>
      )}
      <h1 className="mb-4 text-center text-[1.5rem] font-[600]">
        Active Orders
      </h1>
      {isLoading && (
        <div className="flex-center my-20">
          <Spinner />
        </div>
      )}
      {data?.results && !isLoading && (
        <ul className="grid grid-cols-2 flex-wrap justify-center gap-x-4 gap-y-6">
          {data?.results?.map((ord, i) => (
            <li
              onClick={() => getOrderByID(ord.id)}
              key={i}
              className="flex cursor-pointer gap-3 rounded-lg border-2 px-3 py-1"
            >
              <div className="flex-center h-[50px] w-[50px] rounded-lg bg-red-400 text-[1.2rem] text-white">
                {ord.cart.option === 'dine_in' ? `H${ord.cart.table}` : ''}
              </div>
              <div>
                <h3 className="font-[600] capitalize">{ord?.customer_name}</h3>
                <div
                  className={`flex-between gap-2 text-[0.9rem] font-[500] text-gray-400 ${ord.cart.option === 'dine_in' ? 'flex-col' : ''}`}
                >
                  <span>
                    {ord.cart.products.length}{' '}
                    {ord.cart.products.length > 1 ? 'Items' : 'Item'}
                  </span>
                  <span>{ord.cart.option}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActiveOrders;
