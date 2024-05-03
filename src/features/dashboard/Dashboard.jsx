import Button from "../../Components/UI/Button";

const ACTIVE_ORDERS = [
  {
    name: "Mathew",
    items: 4,
  },
  {
    name: "Andrew",
    items: 2,
  },
  {
    name: "Jonas Burg",
    items: 8,
  },
  {
    name: "Maximillian",
    items: 5,
  },
  {
    name: "William Smith",
    items: 6,
  },
];

const Dashboard = () => {
  return (
    <>
      <section className="my-10 flex flex-col gap-3">
        <h1 className="text-[2rem] font-[600]">Active Orders</h1>
        <ul className="flex flex-nowrap w-full gap-5 overflow-x-auto scrollbar-hidden">
          {ACTIVE_ORDERS.map((order, i) => (
            <li
              key={i}
              className="py-5 px-4 min-w-[300px] border-2 rounded-3xl"
            >
              <div className="flex justify-between text-[0.9rem] items-center">
                <div className="text-primary-500 ">
                  #{Math.floor(Math.random() * 1000000)}
                </div>
                <div className=" bg-red-400 text-white  rounded-3xl px-2 py-1">
                  Table H{Math.floor(Math.random() * 10)}
                </div>
              </div>
              <div className="mt-2 mb-4">
                <h3 className="font-[700] capitalize ">{order.name}</h3>
              </div>
              <div className="flex-between  py-1 ">
                <div className="text-gray-400 font-[700]">
                  {" "}
                  {order.items} Items
                </div>
                <h4 className="font-[700] text-primary-500">In Progress</h4>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-3">
        <div className="flex-between">
          <h1 className="text-[2rem] font-[600]">Orders</h1>
          <div className="flex gap-3 items-center flex-1 justify-end">
            <input
              className="px-4 py-2 outline-none border-2 border-primary-100 focus:border-primary-200 w-[40%] text-[0.9rem] rounded-3xl placeholder:text-primary-200 focus:w-[45%] transition-all"
              placeholder="Search here..."
              type="text"
            />
            <Button variant="dark">Search</Button>
          </div>
        </div>
        <div className="w-full">
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
                <td className="py-2">#{Math.floor(Math.random() * 1000000)}</td>
                <td className="py-2">Maximillian</td>
                <td className="py-2">4</td>
                <td className="py-2 text-primary-500 font-[600]">
                  In Progress
                </td>
              </tr>
              <tr className="text-center border-2 border-primary-100">
                <td className="py-2">#{Math.floor(Math.random() * 1000000)}</td>
                <td className="py-2">Maximillian</td>
                <td className="py-2">4</td>
                <td className="py-2 text-primary-500 font-[600]">
                  In Progress
                </td>
              </tr>
              <tr className="text-center border-2 border-primary-100">
                <td className="py-2">#{Math.floor(Math.random() * 1000000)}</td>
                <td className="py-2">Maximillian</td>
                <td className="py-2">4</td>
                <td className="py-2 text-primary-500 font-[600]">
                  In Progress
                </td>
              </tr>
              <tr className="text-center border-2 border-primary-100">
                <td className="py-2">#{Math.floor(Math.random() * 1000000)}</td>
                <td className="py-2">Maximillian</td>
                <td className="py-2">4</td>
                <td className="py-2 text-primary-500 font-[600]">
                  In Progress
                </td>
              </tr>
              <tr className="text-center border-2 border-primary-100">
                <td className="py-2">#{Math.floor(Math.random() * 1000000)}</td>
                <td className="py-2">Maximillian</td>
                <td className="py-2">4</td>
                <td className="py-2 text-primary-500 font-[600]">
                  In Progress
                </td>
              </tr>
              <tr className="text-center border-2 border-primary-100">
                <td className="py-2">#{Math.floor(Math.random() * 1000000)}</td>
                <td className="py-2">Maximillian</td>
                <td className="py-2">4</td>
                <td className="py-2 text-primary-500 font-[600]">
                  In Progress
                </td>
              </tr>
              <tr className="text-center border-2 border-primary-100">
                <td className="py-2">#{Math.floor(Math.random() * 1000000)}</td>
                <td className="py-2">Maximillian</td>
                <td className="py-2">4</td>
                <td className="py-2 text-primary-500 font-[600]">
                  In Progress
                </td>
              </tr>
              <tr className="text-center border-2 border-primary-100">
                <td className="py-2">#{Math.floor(Math.random() * 1000000)}</td>
                <td className="py-2">Maximillian</td>
                <td className="py-2">4</td>
                <td className="py-2 text-primary-500 font-[600]">
                  In Progress
                </td>
              </tr>
              <tr className="text-center border-2 border-primary-100">
                <td className="py-2">#{Math.floor(Math.random() * 1000000)}</td>
                <td className="py-2">Maximillian</td>
                <td className="py-2">4</td>
                <td className="py-2 text-primary-500 font-[600]">
                  In Progress
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
