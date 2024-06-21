import { useDeleteDealMutation } from '../../services/apiDeals';

const DealTable = () => {
  const [deleteDeal, { isLoading }] = useDeleteDealMutation();
  return <div>DealTable</div>;
};

export default DealTable;
