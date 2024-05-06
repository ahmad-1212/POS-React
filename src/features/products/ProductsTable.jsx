import { MdDeleteForever } from "react-icons/md";
import PropTypes, { object } from "prop-types";
import IconButton from "../../Components/UI/IconButton";
import ConfirmDelete from "../../Components/UI/ConfirmDelete";
import { ImPen } from "react-icons/im";
import Modal from "../../Components/UI/Modal";
import { useNavigate } from "react-router-dom";

const ProductsTable = ({ products }) => {
  const navigate = useNavigate();
  console.log(products);
  return (
    <div className="w-full">
      <table className="w-full border-2 border-primary-100">
        <thead>
          <tr className="text-start px-3 bg-primary-500 text-white text-[1.2rem] border-2 border-primary-500">
            <th className="text-start py-2 px-3">Category</th>
            <th className="text-start py-2 px-3">Product Name</th>
            <th className="text-start py-2 px-3">Price</th>
            <th className="text-start py-2 px-3">Edit</th>
            <th className="text-start py-2 px-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, i) => (
            <tr
              key={i}
              className={`${i % 2 !== 0 ? "bg-primary-100" : "bg-white"}`}
            >
              <Modal>
                <td className="px-3 py-2 font-[600] capitalize">
                  {prod.category}
                </td>
                <td className="px-3 py-2">{prod.name}</td>
                <td className="px-3 py-2 font-[600]">${prod.price}</td>
                {/* Edit Button */}
                <td className="px-3 py-2 w-[10%]">
                  <IconButton
                    onClick={() => navigate(`edit/${prod.id}`)}
                    className={`text-primary-500 text-[1.3rem] ${
                      i % 2 !== 0 ? "hover:bg-primary-200" : ""
                    }`}
                  >
                    <ImPen />
                  </IconButton>
                </td>
                {/* Delete Button */}
                <td className="px-3 py-2 w-[10%]">
                  <Modal.Open id="delete">
                    <IconButton className="text-[1.3rem] text-red-500 hover:bg-red-200">
                      <MdDeleteForever />
                    </IconButton>
                  </Modal.Open>
                  <Modal.Window id="delete" center closeOnOverlay zIndex="z-50">
                    <ConfirmDelete
                      onConfirm={() => {}}
                      message="Are you sure you want to delete this Product?"
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
