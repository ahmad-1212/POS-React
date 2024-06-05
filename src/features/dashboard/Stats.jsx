import { LiaClipboardListSolid, LiaMoneyBillWaveSolid } from 'react-icons/lia';
import { useGetOrdersQuery } from '../../services/apiOrders';
import { MdAutoGraph } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

const Stats = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const last = +searchParams.get('last') || 7;
  const { data: orders, isLoading: isOrdersLoading } = useGetOrdersQuery(last);
  const sales = orders?.reduce((acc, itm) => acc + +itm.cart.price, 0);
  const numberOfOrders = orders?.length;
  return (
    <section className="flex flex-col gap-4">
      <div className="flex-between gap-4">
        <div className="flex flex-1 items-center gap-3 self-stretch rounded-md bg-white px-3 py-4 shadow-sm">
          <div className="flex-center h-[4rem] w-[4rem] rounded-full bg-primary-100 text-[2rem] text-primary-500">
            <LiaMoneyBillWaveSolid />
          </div>
          <div className="flex flex-col justify-between">
            <h4 className="text-[0.8rem] font-[600] uppercase tracking-wide text-gray-500">
              Sales
            </h4>
            <div className="text-[1.5rem] font-[600] text-gray-700">
              Rs. {sales}
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3 self-stretch rounded-md bg-white px-3 py-4 shadow-sm">
          <div className="flex-center h-[4rem] w-[4rem] rounded-full bg-red-100 text-[2rem] text-red-500">
            <LiaClipboardListSolid />
          </div>
          <div className="flex flex-col justify-between">
            <h4 className="text-[0.8rem] font-[600] uppercase tracking-wide text-gray-500">
              Orders
            </h4>
            <div className="text-[1.5rem] font-[600] text-gray-700">
              {numberOfOrders}
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3 self-stretch rounded-md bg-white px-3 py-4 shadow-sm">
          <div className="flex-center h-[4rem] w-[4rem] rounded-full bg-green-100 text-[2rem] text-green-500">
            <MdAutoGraph />
          </div>
          <div className="flex flex-col justify-between">
            <h4 className="text-[0.8rem] font-[600] uppercase tracking-wide text-gray-500">
              Profit
            </h4>
            <div className="text-[1.5rem] font-[600] text-gray-700">$500</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
