import { useSearchParams } from 'react-router-dom';

import DataTable from '../../Components/UI/DataTable';
import { useGetOrdersQuery } from '../../services/apiOrders';

import Tab from '../../Components/UI/Tab';
import { IoSearchOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { isToday } from '../../utils/isToday';

const colors = {
  processing: 'primary-500',
  completed: 'green-500',
  cancelled: 'red-500',
};

const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const last = +searchParams.get('last') || 7;
  const type = searchParams.get('type') || 'all';
  const { data, isLoading, isFetching } = useGetOrdersQuery(last);
  const [orders, setOrders] = useState(data);
  // Handle type
  const handleType = e => {
    searchParams.set('type', e.target.value);
    setSearchParams(searchParams);
  };

  // Handle Search
  const handleSearch = e => {
    const query = e.target.value.replace('#', '');
    const regExp = new RegExp(query, 'i');
    const filterData = data?.filter(itm => {
      if (type === 'all') {
        return regExp.test(itm.orderId) || regExp.test(itm.customerName);
      } else if (type === itm.type) {
        return regExp.test(itm.orderId) || regExp.test(itm.customerName);
      }
    });
    setOrders(filterData);
  };

  useEffect(() => {
    if (!data) return;

    if (type === 'all') {
      setOrders(data);
    } else {
      const newOrders = data?.filter(itm => itm.type === type);
      setOrders(newOrders);
    }
  }, [data, type]);

  return (
    <section className="flex  flex-col gap-3 py-10">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-[2rem] font-[600]">Orders</h1>
        <div className="ml-auto">
          <Tab />
        </div>
      </div>
      <div className=" mt-5 flex flex-col flex-wrap gap-3 sm:flex-row">
        <div className="flex flex-1 items-center">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search here..."
            className="peer w-full  rounded-3xl border-2 border-primary-200 bg-transparent px-5 py-2 text-[0.9rem] outline-none transition-all placeholder:text-primary-200 focus:border-primary-300  sm:text-[1rem] md:w-1/2 md:focus:w-2/3"
          />
          <IoSearchOutline className=" -ml-8 cursor-pointer text-[1.2rem] text-primary-200 peer-focus:text-primary-500" />
        </div>
        <select
          className="w-[200px] cursor-pointer rounded-md border-2 border-primary-200 bg-transparent px-5 py-2 text-[0.9rem] font-[600] text-primary-500 outline-none  sm:text-[1rem]"
          defaultValue="all"
          onChange={handleType}
        >
          <option value="all">All</option>
          <option value="dine_in">Dine In</option>
          <option value="take_away">Take Away</option>
          <option value="delivery">Delivery</option>
        </select>
      </div>
      <DataTable
        head={['Order ID', 'Type', 'Name', 'Date', 'Status']}
        width={[20, 15, 25, 25, 15]}
        data={orders}
        isLoading={isFetching || isLoading}
        render={item => (
          <>
            <td className="px-3 py-2 text-start">#{item.orderId}</td>
            <td className="px-3 py-2 capitalize">
              {item.type.replace('_', ' ')}
            </td>
            <td className="px-3 py-2 capitalize">{item.customerName ?? '-'}</td>
            <td className="px-3 py-2">
              <div>
                {isToday(item.createdAt)
                  ? 'Today at '
                  : new Date(item.createdAt).toLocaleDateString()}{' '}
              </div>
              <div>{new Date(item.createdAt).toLocaleTimeString()}</div>
            </td>
            <td>
              <div
                className={`py-2 font-[700] capitalize text-${colors[item.status.toLowerCase()]}  
        `}
              >
                {item.status === 'processing' ? 'in progress' : item.status}
              </div>
            </td>
          </>
        )}
      />
    </section>
  );
};

export default Orders;
