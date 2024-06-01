import Button from '../../Components/UI/Button';
import DataTable from '../../Components/UI/DataTable';
import { useGetOrdersQuery } from '../../services/apiOrders';

const Orders = () => {
  const { data } = useGetOrdersQuery();
  console.log(data);
  return (
    <section className="flex  flex-col gap-3 py-10">
      <div className="flex-between flex-wrap gap-3">
        <h1 className="text-[2rem] font-[600]">Orders</h1>
        <div className="flex flex-1 items-center justify-end gap-3">
          <input
            className="w-[70%] min-w-[200px] rounded-3xl border-2 border-primary-100 px-4 py-2 text-[0.9rem] outline-none transition-all placeholder:text-primary-200 focus:w-[45%] focus:border-primary-200 md:w-[40%]"
            placeholder="Search here..."
            type="text"
          />
          <Button variant="dark">Search</Button>
        </div>
      </div>
      <DataTable head={['Name', 'Email', 'Type', 'Date']} />
    </section>
  );
};

export default Orders;
