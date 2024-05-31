import { ImPen } from 'react-icons/im';
import IconButton from '../../Components/UI/IconButton';
import Modal from '../../Components/UI/Modal';
import Spinner from '../../Components/UI/Spinner';
import {
  useDeleteIngredientMutation,
  useGetIngredientsQuery,
} from '../../services/apiIngredients';
import IngredientForm from './IngredientForm';
import { MdDeleteForever } from 'react-icons/md';
import ConfirmDelete from '../../Components/UI/ConfirmDelete';

const IngredientsTable = () => {
  const { data, isLoading } = useGetIngredientsQuery();
  const [deleteIngredient, { isLoading: isDeleting, isSuccess, reset }] =
    useDeleteIngredientMutation();
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
                <th className="px-3 py-2 text-start">Name</th>
                <th className="w-[40%] px-3 py-2 text-start">Unit</th>
                <th className="px-3 py-2 text-start">Edit</th>
                <th className="px-3 py-2 text-start">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.results?.map((ing, i) => (
                <tr
                  key={i}
                  className={`${i % 2 !== 0 ? 'bg-primary-100' : 'bg-white'}`}
                >
                  <Modal>
                    <td className="px-3 py-2 font-[600]">{ing.name}</td>
                    <td className="px-3 py-2 font-[600]">{ing.unit}</td>
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
                        <IngredientForm edit ingredient={ing} />
                      </Modal.Window>
                    </td>
                    {/* Delete Button */}
                    <td className="w-[10%] px-3 py-2">
                      <Modal.Open id="delete">
                        <IconButton className="text-[1.3rem] text-red-500 hover:bg-red-200">
                          <MdDeleteForever />
                        </IconButton>
                      </Modal.Open>
                      <Modal.Window
                        id="delete"
                        center
                        closeOnOverlay
                        zIndex="z-50"
                      >
                        <ConfirmDelete
                          onConfirm={() => deleteIngredient(ing.id)}
                          message="Are you sure you want to delete this Ingredient?"
                          isLoading={isDeleting}
                          isSuccess={isSuccess}
                          reset={reset}
                        />
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

export default IngredientsTable;
