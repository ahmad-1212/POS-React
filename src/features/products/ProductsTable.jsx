import { MdDeleteForever } from 'react-icons/md';
import PropTypes, { object } from 'prop-types';
import IconButton from '../../Components/UI/IconButton';
import ConfirmDelete from '../../Components/UI/ConfirmDelete';
import { ImPen } from 'react-icons/im';
import Modal from '../../Components/UI/Modal';
import { useNavigate } from 'react-router-dom';
import { useDeleteProductMutation } from '../../services/apiProducts';
import DataTable from '../../Components/UI/DataTable';

const ProductsTable = ({ products, isLoading }) => {
  const navigate = useNavigate();
  const [deleteProduct, { isLoading: isDeleting, isSuccess, reset }] =
    useDeleteProductMutation();
  return (
    <DataTable
      head={['Product Name', 'Category', 'Price']}
      width={[40, 20, 20, 10, 10]}
      edit
      del
      rowColors={true}
      pagination={false}
      data={products}
      isLoading={isLoading}
      render={(prod, i) => (
        <Modal>
          <td className="px-3 py-2 text-start font-[600] capitalize">
            {prod.name}
          </td>
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
                successMessage={`Product "${prod.name}" successfully Deleted!`}
                isLoading={isDeleting}
                isSuccess={isSuccess}
                reset={reset}
              />
            </Modal.Window>
          </td>
        </Modal>
      )}
    />
  );
};

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(object),
  isLoading: PropTypes.bool,
};

export default ProductsTable;
