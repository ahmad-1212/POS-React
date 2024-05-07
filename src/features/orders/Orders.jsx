import Button from "../../Components/UI/Button";

const Orders = () => {
  return (
    <section className="py-10  flex flex-col gap-3">
      <div className="flex-between gap-3 flex-wrap">
        <h1 className="text-[2rem] font-[600]">Orders</h1>
        <div className="flex gap-3 items-center flex-1 justify-end">
          <input
            className="px-4 py-2 outline-none border-2 border-primary-100 focus:border-primary-200 min-w-[200px] w-[70%] md:w-[40%] text-[0.9rem] rounded-3xl placeholder:text-primary-200 focus:w-[45%] transition-all"
            placeholder="Search here..."
            type="text"
          />
          <Button variant="dark">Search</Button>
        </div>
      </div>
      <div className="w-full min-w-[98%] border-2 border-primary-100 overflow-x-auto custom-scrollbar">
        <table className="w-full border-2 border-primary-100 rounded-lg">
          <thead className="text-[1.2rem] bg-primary-100 text-primary-500">
            <tr>
              <th className="py-3">Order ID</th>
              <th className="py-3">Name</th>
              <th className="py-3">Items</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center border-2 border-primary-100">
              <td className="py-2 px-3">
                #{Math.floor(Math.random() * 1000000)}
              </td>
              <td className="py-2 px-3">Maximillian</td>
              <td className="py-2 px-3">4</td>
              <td className="py-2 px-3 text-primary-500 font-[600]">
                In Progress
              </td>
            </tr>
            <tr className="text-center border-2 border-primary-100">
              <td className="py-2 px-3">
                #{Math.floor(Math.random() * 1000000)}
              </td>
              <td className="py-2 px-3">Maximillian</td>
              <td className="py-2 px-3">4</td>
              <td className="py-2 px-3 text-primary-500 font-[600]">
                In Progress
              </td>
            </tr>
            <tr className="text-center border-2 border-primary-100">
              <td className="py-2 px-3">
                #{Math.floor(Math.random() * 1000000)}
              </td>
              <td className="py-2 px-3">Maximillian</td>
              <td className="py-2 px-3">4</td>
              <td className="py-2 px-3 text-primary-500 font-[600]">
                In Progress
              </td>
            </tr>
            <tr className="text-center border-2 border-primary-100">
              <td className="py-2 px-3">
                #{Math.floor(Math.random() * 1000000)}
              </td>
              <td className="py-2 px-3">Maximillian</td>
              <td className="py-2 px-3">4</td>
              <td className="py-2 px-3 text-primary-500 font-[600]">
                In Progress
              </td>
            </tr>
            <tr className="text-center border-2 border-primary-100">
              <td className="py-2 px-3">
                #{Math.floor(Math.random() * 1000000)}
              </td>
              <td className="py-2 px-3">Maximillian</td>
              <td className="py-2 px-3">4</td>
              <td className="py-2 px-3 text-primary-500 font-[600]">
                In Progress
              </td>
            </tr>
            <tr className="text-center border-2 border-primary-100">
              <td className="py-2 px-3">
                #{Math.floor(Math.random() * 1000000)}
              </td>
              <td className="py-2 px-3">Maximillian</td>
              <td className="py-2 px-3">4</td>
              <td className="py-2 px-3 text-primary-500 font-[600]">
                In Progress
              </td>
            </tr>
            <tr className="text-center border-2 border-primary-100">
              <td className="py-2 px-3">
                #{Math.floor(Math.random() * 1000000)}
              </td>
              <td className="py-2 px-3">Maximillian</td>
              <td className="py-2 px-3">4</td>
              <td className="py-2 px-3 text-primary-500 font-[600]">
                In Progress
              </td>
            </tr>
            <tr className="text-center border-2 border-primary-100">
              <td className="py-2 px-3">
                #{Math.floor(Math.random() * 1000000)}
              </td>
              <td className="py-2 px-3">Maximillian</td>
              <td className="py-2 px-3">4</td>
              <td className="py-2 px-3 text-primary-500 font-[600]">
                In Progress
              </td>
            </tr>
            <tr className="text-center border-2 border-primary-100">
              <td className="py-2 px-3">
                #{Math.floor(Math.random() * 1000000)}
              </td>
              <td className="py-2 px-3">Maximillian</td>
              <td className="py-2 px-3">4</td>
              <td className="py-2 px-3 text-primary-500 font-[600]">
                In Progress
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;
