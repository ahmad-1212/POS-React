
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'May 1',
    profit: 400,
    sales: 2400,
  },
  {
    name: 'May 2',
    profit: 300,
    sales: 1398,
  },
  {
    name: 'May 3',
    profit: 2000,
    sales: 9800,
  },
  {
    name: 'May 4',
    profit: 500,
    sales: 3908,
  },
  {
    name: 'May 5',
    profit: 1500,
    sales: 4800,
  },
  {
    name: 'May 6',
    profit: 1100,
    sales: 6800,
  },
  {
    name: 'May 7',
    profit: 860,
    sales: 4300,
  },
  {
    name: 'May 8',
    profit: 250,
    sales: 1500,
  },
  {
    name: 'May 9',
    profit: 1100,
    sales: 6000,
  },
  {
    name: 'May 10',
    profit: 200,
    sales: 2000,
  },
];


const SalesChart = () => {
  return (
    <section className="w-full rounded-md bg-white px-3 py-5 shadow-sm">
    <h2 className="mb-10 text-[1.3rem] font-[600]">
      Sales from May 1 2024 - May 10 2024
    </h2>
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        <YAxis unit="$" />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="6" />
        <Tooltip contentStyle={{ backgroundColor: 'white' }} />
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
  )
}

export default SalesChart