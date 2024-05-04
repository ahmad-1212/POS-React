import PropTypes from "prop-types";
import Button from "./Button";

const ConfirmDelete = ({ onCloseModal, message, onConfirm }) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="w-full bg-primary-500 text-white">
        <h1 className="px-10 py-3 text-[1.5rem] font-[600]">Please Confirm</h1>
      </div>
      <p className="px-5 text-[1.2rem] text-center">{message}</p>
      <div className="flex-end px-5 mb-5">
        <button
          onClick={onCloseModal}
          type="button"
          className="hover:bg-primary-100 hover:text-primary-500 px-5 py-2 rounded-md uppercase tracking-wide"
        >
          Cancel
        </button>
        <button
          onClick={onCloseModal}
          type="button"
          className="hover:bg-red-400 text-red-500 hover:text-white px-5 py-2 rounded-md font-[600] uppercase tracking-wide"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

ConfirmDelete.propTypes = {
  onCloseModal: PropTypes.func,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmDelete;
