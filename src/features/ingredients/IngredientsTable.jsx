import { ImPen } from 'react-icons/im';
import IconButton from '../../Components/UI/IconButton';
import Modal from '../../Components/UI/Modal';
import Spinner from '../../Components/UI/Spinner';
import {
  usePrefetch,
  useDeleteIngredientMutation,
  useGetIngredientsQuery,
} from '../../services/apiIngredients';
import IngredientForm from './IngredientForm';
import { MdDeleteForever } from 'react-icons/md';
import ConfirmDelete from '../../Components/UI/ConfirmDelete';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const IngredientsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get('page') || 1;
  const { data, isLoading } = useGetIngredientsQuery(page);
  const [deleteIngredient, { isLoading: isDeleting, isSuccess, reset }] =
    useDeleteIngredientMutation();
  const prefetch = usePrefetch('getIngredients');

  const handlePage = (next = true) => {
    if (next) {
      searchParams.set('page', page + 1);
    } else {
      searchParams.set('page', page - 1);
    }
    setSearchParams(searchParams);
  };

  const prefetchNext = useCallback(() => {
    if (data?.next) {
      prefetch(page + 1);
    }
    if (data?.previous) {
      prefetch(page - 1);
    }
  }, [prefetch, page, data]);

  useEffect(() => {
    prefetchNext();
  }, [prefetchNext]);

  return (
    <>
      <div className="custom-scrollbar relative flex  w-full min-w-[98%] flex-col overflow-x-auto border-2">
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

        {isLoading && (
          <div className="mx-auto my-20">
            <Spinner />
          </div>
        )}
        {!data?.results?.length && !isLoading && (
          <p className="my-20 text-primary-500">No results were found!</p>
        )}
        <div className="flex-between w-full bg-primary-500 px-3 py-2 text-[1.2rem]">
          <div className="flex gap-3 text-white">
            <span className="font-[600]">Pages:</span>
            <span>
              {page} of {Math.ceil(data?.count / 10)}
            </span>
          </div>

          <div className=" flex items-center gap-3">
            <button
              className="rounded-lg border-2 border-primary-100 px-6 py-1 text-[1rem] text-white hover:bg-white hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-transparent disabled:hover:text-white"
              disabled={!data || !data?.previous}
              onClick={() => handlePage(false)}
            >
              Prev
            </button>
            <button
              className="rounded-lg border-2 border-primary-100 px-6 py-1 text-[1rem] text-white hover:bg-white hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-transparent disabled:hover:text-white"
              disabled={!data?.next || !data}
              onClick={() => handlePage(true)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientsTable;
