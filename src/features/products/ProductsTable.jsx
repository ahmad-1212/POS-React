import { MdDeleteForever } from 'react-icons/md';
import PropTypes, { object } from 'prop-types';
import IconButton from '../../Components/UI/IconButton';
import ConfirmDelete from '../../Components/UI/ConfirmDelete';
import { ImPen } from 'react-icons/im';
import Modal from '../../Components/UI/Modal';
import { useNavigate } from 'react-router-dom';
import { useDeleteProductMutation } from '../../services/apiProducts';

const ProductsTable = ({ products }) => {
  const navigate = useNavigate();
  const [deleteProduct, { isLoading: isDeleting, isSuccess, reset }] =
    useDeleteProductMutation();
  return (
    <div className="custom-scrollbar w-full min-w-[98%] overflow-x-auto border-2 border-primary-100">
      <table className="w-full border-2 border-primary-100">
        <thead>
          <tr className="border-2 border-primary-500 bg-primary-500 px-3 text-start text-[1.2rem] text-white">
            <th className="px-3 py-2 text-start">Product Name</th>
            <th className="px-3 py-2 text-start">Category</th>
            <th className="px-3 py-2 text-start">Price</th>
            <th className="px-3 py-2 text-start">Edit</th>
            <th className="px-3 py-2 text-start">Delete</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((prod, i) => (
            <tr
              key={i}
              className={`${i % 2 !== 0 ? 'bg-primary-100' : 'bg-white'}`}
            >
              <Modal>
                <td className="px-3 py-2 font-[600] capitalize">{prod.name}</td>
                <td className="px-3 py-2 ">{prod.category.name}</td>
                <td className="px-3 py-2 font-[600]">Rs.{prod.price}</td>
                {/* Edit Button */}
                <td className="w-[10%] px-3 py-2">
                  <IconButton
                    onClick={() => navigate(`edit/${prod.id}`)}
                    className={`text-[1.3rem] text-primary-500 ${
                      i % 2 !== 0 ? 'hover:bg-primary-200' : ''
                    }`}
                  >
                    <ImPen />
                  </IconButton>
                </td>
                {/* Delete Button */}
                <td className="w-[10%] px-3 py-2">
                  <Modal.Open id="delete">
                    <IconButton className="text-[1.3rem] text-red-500 hover:bg-red-200">
                      <MdDeleteForever />
                    </IconButton>
                  </Modal.Open>
                  <Modal.Window id="delete" center closeOnOverlay zIndex="z-50">
                    <ConfirmDelete
                      onConfirm={() => deleteProduct(prod.id)}
                      message="Are you sure you want to delete this Product?"
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
  );
};

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(object).isRequired,
};

export default ProductsTable;
