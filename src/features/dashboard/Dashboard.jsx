import { MdAutoGraph } from "react-icons/md";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { FaRegListAlt } from "react-icons/fa";

import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
import { useSearchParams } from "react-router-dom";
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

const data = [
  {
    name: "May 1",
    profit: 400,
    sales: 2400,
  },
  {
    name: "May 2",
    profit: 300,
    sales: 1398,
  },
  {
    name: "May 3",
    profit: 2000,
    sales: 9800,
  },
  {
    name: "May 4",
    profit: 500,
    sales: 3908,
  },
  {
    name: "May 5",
    profit: 1500,
    sales: 4800,
  },
  {
    name: "May 6",
    profit: 1100,
    sales: 6800,
  },
  {
    name: "May 7",
    profit: 860,
    sales: 4300,
  },
  {
    name: "May 8",
    profit: 250,
    sales: 1500,
  },
  {
    name: "May 9",
    profit: 1100,
    sales: 6000,
  },
  {
    name: "May 10",
    profit: 200,
    sales: 2000,
  },
];

const Dashboard = () => {
  const [searchParams, setSetSearchparam] = useSearchParams();
  const last = +searchParams.get("last") || 7;
  const handleLast = (last) => {
    searchParams.set("last", last);
    setSetSearchparam(searchParams);
  };

  return (
    <div className="mt-10 flex flex-col gap-5">
      <div className="flex-between">
        <h1 className="text-[2rem] font-[600]">Dashboard</h1>
        <div className="bg-white border-2 border-gray-100 px-2 py-[0.4rem] rounded-md flex items-center gap-4 text-[0.9rem]">
          <button
            onClick={() => handleLast(7)}
            className={`hover:bg-primary-500 hover:text-white py-[0.2rem] px-3 rounded-md ${
              last === 7 ? "bg-primary-500 text-white" : ""
            }`}
          >
            Last 7 days
          </button>
          <button
            onClick={() => handleLast(30)}
            className={`hover:bg-primary-500 hover:text-white py-[0.2rem] px-3 rounded-md ${
              last === 30 ? "bg-primary-500 text-white" : ""
            }`}
          >
            Last 30 days
          </button>
          <button
            onClick={() => handleLast(90)}
            className={`hover:bg-primary-500 hover:text-white py-[0.2rem] px-3 rounded-md ${
              last === 90 ? "bg-primary-500 text-white" : ""
            }`}
          >
            Last 90 days
          </button>
        </div>
      </div>
      <section className="flex flex-col gap-4">
        <div className="flex-between gap-4">
          <div className="bg-white shadow-sm flex-1 flex gap-3 items-center py-4 rounded-md px-3 self-stretch">
            <div className="w-[4rem] h-[4rem] flex-center text-[2rem] text-primary-500 bg-primary-100 rounded-full">
              <LiaMoneyBillWaveSolid />
            </div>
            <div className="flex flex-col justify-between">
              <h4 className="uppercase text-[0.8rem] font-[600] text-gray-500 tracking-wide">
                Sales
              </h4>
              <div className="text-[1.5rem] font-[600] text-gray-700">
                $5505
              </div>
            </div>
          </div>
          <div className="bg-white shadow-sm flex-1 flex gap-3 items-center py-4 rounded-md px-3 self-stretch">
            <div className="w-[4rem] h-[4rem] flex-center text-[2rem] text-red-500 bg-red-100 rounded-full">
              <FaRegListAlt />
            </div>
            <div className="flex flex-col justify-between">
              <h4 className="uppercase text-[0.8rem] font-[600] text-gray-500 tracking-wide">
                Orders
              </h4>
              <div className="text-[1.5rem] font-[600] text-gray-700">100</div>
            </div>
          </div>
          <div className="bg-white shadow-sm flex-1 flex gap-3 items-center py-4 rounded-md px-3 self-stretch">
            <div className="w-[4rem] h-[4rem] flex-center text-[2rem] text-green-500 bg-green-100 rounded-full">
              <MdAutoGraph />
            </div>
            <div className="flex flex-col justify-between">
              <h4 className="uppercase text-[0.8rem] font-[600] text-gray-500 tracking-wide">
                Profit
              </h4>
              <div className="text-[1.5rem] font-[600] text-gray-700">$500</div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="my-10 flex flex-col gap-3">
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
      </section> */}
      <section className="bg-white shadow-sm rounded-md px-3 py-5">
        <h2 className="text-[1.3rem] font-[600] capitalize">Active Orders</h2>
        <ul className="flex flex-nowrap mt-2 pt-4 border-t-2 border-gray-50 w-full gap-5 overflow-x-auto scrollbar-hidden">
          {ACTIVE_ORDERS.map((order, i) => (
            <li
              key={i}
              className="py-5 px-4 min-w-[300px] border-2 rounded-3xl"
            >
              <div className="flex justify-between text-[0.9rem] items-center">
                <div className="text-primary-500 ">
                  #{Math.floor(Math.random() * 1000000)}
                </div>
                <div className=" bg-red-400 text-[0.7rem] font-[600] text-white rounded-3xl px-2 py-1">
                  Table H{Math.floor(Math.random() * 10)}
                </div>
              </div>
              <div className="">
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

      <section className="w-full bg-white rounded-md shadow-sm px-3 py-5">
        <h2 className="mb-10 text-[1.3rem] font-[600]">
          Sales from May 1 2024 - May 10 2024
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <YAxis unit="$" />
            <XAxis dataKey="name" />
            <CartesianGrid strokeDasharray="6" />
            <Tooltip contentStyle={{ backgroundColor: "white" }} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#f66b20"
              strokeWidth={2}
              fill="#f66b20"
              name="Sales"
              unit="$"
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#66b366"
              fill="#66b366"
              strokeWidth={2}
              unit="$"
              name="Profit"
            />
          </AreaChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default Dashboard;
