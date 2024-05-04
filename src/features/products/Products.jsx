import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import Button from "../../Components/UI/Button";
import Modal from "../../Components/UI/Modal";
import ProductForm from "./ProductForm";
import ProductsTable from "./ProductsTable";

const Products = () => {
  return (
    <section className="py-10 flex flex-col gap-8">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search here..."
          className="outline-none w-1/2 py-2 px-5 bg-transparent border-2 border-primary-200 focus:border-primary-300 rounded-3xl placeholder:text-primary-200"
        />
        <IoSearchOutline className="-ml-8 text-[1.2rem] text-primary-200 cursor-pointer" />
      </div>
      <div className="flex-between border-b-2 border-primary-200/30 pb-5">
        <h1 className="text-[1.5rem] font-[600]">Products</h1>
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
            <ProductForm edit={false} />
          </Modal.Window>
        </Modal>
      </div>
      <ProductsTable products={Array.from({ length: 10, name: "burger" })} />
    </section>
  );
};

export default Products;
