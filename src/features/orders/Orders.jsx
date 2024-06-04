import { useSearchParams } from 'react-router-dom';
import Button from '../../Components/UI/Button';
import DataTable from '../../Components/UI/DataTable';
import { useGetOrdersQuery, usePrefetch } from '../../services/apiOrders';
import { useCallback, useEffect } from 'react';
import Tab from '../../Components/UI/Tab';
import { IoSearchOutline } from 'react-icons/io5';

const colors = {
  processing: 'text-primary-500',
  completed: 'text-green-500',
  cancelled: 'text-red-500',
};

const Orders = () => {
  const [searchParams] = useSearchParams();
  const page = +searchParams.get('page') || 1;
  const { data, isLoading } = useGetOrdersQuery(page);
  const prefetch = usePrefetch('getOrders');

  const handlePrefetch = useCallback(() => {
    if (data?.next) {
      prefetch(page + 1);
    }
    if (data?.previous) {
      prefetch(page - 1);
    }
  }, [data, page, prefetch]);

  useEffect(() => {
    handlePrefetch();
  }, [handlePrefetch]);

  return (
    <section className="flex  flex-col gap-3 py-10">
      <div className="flex-between flex-wrap gap-3">
        <h1 className="text-[2rem] font-[600]">Orders</h1>
        <Tab />
      </div>
      <div className="flex-between mt-5 gap-3">
        <div className="flex flex-1 items-center">
          <input
            type="text"
            placeholder="Search here..."
            className="peer w-full rounded-3xl border-2 border-primary-200 bg-transparent px-5 py-2 outline-none transition-all placeholder:text-primary-200 focus:w-2/3 focus:border-primary-300 md:w-1/2"
          />
          <IoSearchOutline className=" -ml-8 cursor-pointer text-[1.2rem] text-primary-200 peer-focus:text-primary-500" />
        </div>
        <select className="cursor-pointer rounded-md border-2 border-primary-200 bg-transparent px-5 py-2 font-[600] text-primary-500 outline-none ">
          <option>All</option>
          <option>Dine In</option>
          <option>Take Away</option>
          <option>Delivery</option>
        </select>
      </div>
      <DataTable
        head={['Order ID', 'Type', 'Name', 'Date', 'Status']}
        width={[20, 15, 25, 25, 15]}
        data={data?.results}
        isLoading={isLoading}
        totalPages={Math.ceil(data?.count / 10)}
        pagination
        next={data?.next && true}
        previous={data?.previous && true}
        render={item => (
          <>
            <td className="px-3 py-2 text-start">#{item.id}</td>
            <td className="px-3 py-2 capitalize">
              {item.cart.option.replace('_', ' ')}
            </td>
            <td className="px-3 py-2 capitalize">
              {item.customer_name ?? '-'}
            </td>
            <td className="px-3 py-2">
              <div>{new Date(item.created_at).toLocaleDateString()} </div>
              <div>{new Date(item.created_at).toLocaleTimeString()}</div>
            </td>
            <td
              className={`font-[700] capitalize ${colors[item.order_status.toLowerCase()]}
        `}
            >
              {item.order_status === 'processing'
                ? 'in progress'
                : item.order_status}
            </td>
          </>
        )}
      />
    </section>
  );
};

export default Orders;
