import { LuClipboardList } from "react-icons/lu";
import ProductForm from "./ProductForm";

const AddProduct = () => {
  return (
    <section className="py-10 flex flex-col gap-5 w-[100%] lg:w-[80%] max-w-[800px] mx-auto">
      <div className="flex-center uppercase tracking-wide bg-primary-500 text-white font-[600] py-2 rounded-md gap-3 text-[1.5rem]">
        <LuClipboardList />
        <h1>Add Product</h1>
      </div>
      <ProductForm />
    </section>
  );
};

export default AddProduct;
