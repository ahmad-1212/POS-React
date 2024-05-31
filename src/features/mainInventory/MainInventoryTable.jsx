import { ImPen } from 'react-icons/im';
import IconButton from '../../Components/UI/IconButton';
import Modal from '../../Components/UI/Modal';
import { useGetMainInventoryQuery } from '../../services/apiMainInventory';

import Spinner from '../../Components/UI/Spinner';
import MainInventoryForm from './MainInventoryForm';
import SendToKitchenForm from './SendToKitchenForm';

const MainInventoryTable = () => {
  const { data, isLoading } = useGetMainInventoryQuery();
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
                <th className="w-[40%] px-3 py-2 text-start">Ingredient</th>
                <th className="w-[40%] px-3 py-2 text-start">Quantity</th>
                <th className="px-3 py-2 text-start">Edit</th>
                <th className="w-[40%] px-3 py-2 text-start"></th>
              </tr>
            </thead>
            <tbody>
              {data?.results
                ?.filter(itm => +itm.quantity !== 0)
                ?.map((itm, i) => (
                  <tr
                    key={i}
                    className={`${i % 2 !== 0 ? 'bg-primary-100' : 'bg-white'}`}
                  >
                    <Modal>
                      <td className="px-3 py-2 font-[600]">
                        {itm.ingredient.name}
                      </td>
                      <td className="px-3 py-2 font-[600]">
                        {itm.quantity} {itm.ingredient.unit}
                      </td>
                      {/* Edit Button */}
                      <td className="w-[10%] px-3 py-2">
                        <Modal.Open id="edit">
                          <IconButton
                            className={`text-[1.3rem] text-primary-500 ${
                              i % 2 !== 0 ? 'hover:bg-primary-200' : ''
                            }`}
                          >
                            <ImPen />
                          </IconButton>
                        </Modal.Open>
                        <Modal.Window id="edit" closeOnOverlay zIndex="z-50">
                          <MainInventoryForm edit item={itm} />
                        </Modal.Window>
                      </td>
                      <td className="px-2">
                        <Modal.Open id="send-kitchen">
                          <button className="w-max rounded-lg bg-primary-200 px-2 py-1 text-[0.9rem] text-primary-500">
                            Send to kitchen
                          </button>
                        </Modal.Open>
                        <Modal.Window
                          id="send-kitchen"
                          zIndex="z-50"
                          closeOnOverlay
                        >
                          <SendToKitchenForm item={itm} />
                        </Modal.Window>
                      </td>
                    </Modal>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MainInventoryTable;
