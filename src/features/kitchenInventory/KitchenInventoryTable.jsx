import Modal from '../../Components/UI/Modal';
import Spinner from '../../Components/UI/Spinner';
import { useGetKitchenInventoryQuery } from '../../services/apiKitchenInventory';
import SendToMainForm from './SendToMainForm';

const KitchenInventoryTable = () => {
  const { data, isLoading } = useGetKitchenInventoryQuery();
  console.log(data);
  return (
    <>
      {isLoading && (
        <div className="mx-auto mt-20">
          <Spinner />
        </div>
      )}
      {data?.results && !isLoading && (
        <div className="custom-scrollbar w-full min-w-[98%] overflow-x-auto border-2 border-primary-100">
          <table className="w-full border-2 border-primary-100">
            <thead>
              <tr className="border-2 border-primary-500 bg-primary-500 px-3 text-start text-[1.2rem] text-white">
                <th className="px-3 py-2 text-start">Ingredients</th>
                <th className="w-[40%] px-3 py-2 text-start">Quantity</th>
                <th className="w-[20%] px-3 py-2 text-start"></th>
              </tr>
            </thead>
            <tbody>
              {data?.results
                ?.filter(itm => itm.quantity !== 0)
                ?.map((itm, i) => (
                  <tr
                    key={i}
                    className={`${i % 2 !== 0 ? 'bg-primary-100' : 'bg-white'}`}
                  >
                    <td className="px-3 py-2 font-[600]">
                      {itm.ingredient.name}
                    </td>
                    <td className="px-3 py-2 font-[600]">
                      {itm.quantity} {itm.ingredient.unit}
                    </td>
                    <td className="px-2 py-1">
                      <Modal>
                        <Modal.Open id="send-main">
                          <button className="w-max rounded-lg bg-primary-200 px-2 py-1 text-[0.9rem] text-primary-500">
                            Send to Main Inventory
                          </button>
                        </Modal.Open>
                        <Modal.Window
                          id="send-main"
                          zIndex="z-50"
                          closeOnOverlay
                        >
                          <SendToMainForm item={itm} />
                        </Modal.Window>
                      </Modal>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default KitchenInventoryTable;
