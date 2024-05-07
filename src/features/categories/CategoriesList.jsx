import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineAddCircleOutline } from "react-icons/md";

import Modal from "../../Components/UI/Modal";
import Button from "../../Components/UI/Button";
import CategoryForm from "./CategoryForm";
import CategoriesTable from "./CategoriesTable";

import { CATEGORIES } from "../../utils/constants";

const CategoriesList = () => {
  return (
    <section className="py-10 flex flex-col gap-8">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search here..."
          className="outline-none w-full md:w-1/2 py-2 px-5 bg-transparent border-2 border-primary-200 focus:border-primary-300 rounded-3xl placeholder:text-primary-200"
        />
        <IoSearchOutline className="-ml-8 text-[1.2rem] text-primary-200 cursor-pointer" />
      </div>
      <div className="flex-between gap-3 flex-wrap border-b-2 border-primary-200/30 pb-5">
        <h1 className="text-[2rem] font-[600]">Categories</h1>
        <Modal>
          <Modal.Open id="addCategory">
            <Button variant="dark" className="flex items-center gap-3">
              <MdOutlineAddCircleOutline className="text-[1.3rem]" />
              <span>Add New</span>
            </Button>
          </Modal.Open>
          <Modal.Window
            id="addCategory"
            closeOnOverlay
            scrollbar={false}
            zIndex="z-50"
          >
            <CategoryForm edit={false} />
          </Modal.Window>
        </Modal>
      </div>
      <CategoriesTable categories={CATEGORIES} />
    </section>
  );
};

export default CategoriesList;
