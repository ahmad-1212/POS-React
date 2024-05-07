import { ImPen } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import PropTypes, { object } from "prop-types";

import IconButton from "../../Components/UI/IconButton";
import Modal from "../../Components/UI/Modal";
import CategoryForm from "./CategoryForm";
import ConfirmDelete from "../../Components/UI/ConfirmDelete";

const CategoriesTable = ({ categories }) => {
  return (
    <div className="w-full min-w-[98%] overflow-x-auto custom-scrollbar border-2 border-primary-100">
      <table className="w-full border-2 border-primary-100">
        <thead>
          <tr className="text-start px-3 bg-primary-500 text-white text-[1.2rem] border-2 border-primary-500">
            <th className="text-start py-2 px-3">Image</th>
            <th className="text-start py-2 px-3">Category</th>
            <th className="text-start py-2 px-3">Edit</th>
            <th className="text-start py-2 px-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, i) => (
            <tr
              key={i}
              className={`${i % 2 !== 0 ? "bg-primary-100" : "bg-white"}`}
            >
              <Modal>
                <td className="px-3 py-2 w-[20%]">
                  <img
                    src={cat.image}
                    className="w-[50px] h-[50px] object-cover"
                  />
                </td>
                <td className="px-3 py-2 font-[600]">{cat.name}</td>
                {/* Edit Button */}
                <td className="px-3 py-2 w-[10%]">
                  <Modal.Open id="edit">
                    <IconButton
                      className={`text-primary-500 text-[1.3rem] ${
                        i % 2 !== 0 ? "hover:bg-primary-200" : ""
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
                <td className="px-3 py-2 w-[10%]">
                  <Modal.Open id="delete">
                    <IconButton className="text-[1.3rem] text-red-500 hover:bg-red-200">
                      <MdDeleteForever />
                    </IconButton>
                  </Modal.Open>
                  <Modal.Window id="delete" center closeOnOverlay zIndex="z-50">
                    <ConfirmDelete
                      onConfirm={() => {}}
                      message="Are you sure you want to delete this category?"
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

CategoriesTable.propTypes = {
  categories: PropTypes.arrayOf(object).isRequired,
};

export default CategoriesTable;
