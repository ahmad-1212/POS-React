import Tab from '../../Components/UI/Tab';

import Stats from './Stats';
import ActiveOrders from './ActiveOrders';
import SalesChart from './SalesChart';

const Dashboard = () => {
  return (
    <div className="mt-10 flex flex-col gap-5">
      <div className="flex-between">
        <h1 className="text-[2rem] font-[600]">Dashboard</h1>
        <Tab />
      </div>
      <Stats />
      <SalesChart />
      <ActiveOrders />
    </div>
  );
};

export default Dashboard;
