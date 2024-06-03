import { ImPen } from 'react-icons/im';
import { MdDeleteForever } from 'react-icons/md';

import IconButton from '../../Components/UI/IconButton';
import Modal from '../../Components/UI/Modal';
import CategoryForm from './CategoryForm';
import ConfirmDelete from '../../Components/UI/ConfirmDelete';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '../../services/apiCategories';
import Spinner from '../../Components/UI/Spinner';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CategoriesTable = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const [deleteCategory, { isLoading: isDeleting, isSuccess, reset }] =
    useDeleteCategoryMutation();
  const [categories, setCategories] = useState(data?.results);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || undefined;
  useEffect(() => {
    const regExp = new RegExp(searchQuery, 'i');

    if (data?.results) {
      const newCategories = data.results.filter(itm => regExp.test(itm.name));
      setCategories(newCategories);
    }
  }, [searchQuery, data?.results]);

  useEffect(() => {
    setCategories(data?.results);
  }, [data?.results]);
  return (
    <>
      {isLoading && (
        <div className="mx-auto mt-20">
          <Spinner />
        </div>
      )}
      {categories && !isLoading && (
        <div className="custom-scrollbar w-full min-w-[98%] overflow-x-auto border-2 border-primary-100">
          <table className="w-full border-2 border-primary-100">
            <thead>
              <tr className="border-2 border-primary-500 bg-primary-500 px-3 text-start text-[1.2rem] text-white">
                <th className="px-3 py-2 text-start">Image</th>
                <th className="px-3 py-2 text-start">Category</th>
                <th className="px-3 py-2 text-start">Edit</th>
                <th className="px-3 py-2 text-start">Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((cat, i) => (
                <tr
                  key={i}
                  className={`${i % 2 !== 0 ? 'bg-primary-100' : 'bg-white'}`}
                >
                  <Modal>
                    <td className="w-[20%] px-3 py-2">
                      <img
                        src={cat.image}
                        className="h-[50px] w-[50px] object-cover"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-3 py-2 font-[600]">{cat.name}</td>
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
                        <CategoryForm edit category={cat} />
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
                          onConfirm={() => deleteCategory(cat.id)}
                          message="Are you sure you want to delete this category?"
                          successMessage={`Category "${cat.name}" successfully deleted!`}
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

export default CategoriesTable;
