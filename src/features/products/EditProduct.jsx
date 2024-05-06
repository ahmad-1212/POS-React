import { LuClipboardList } from "react-icons/lu";
import ProductForm from "./ProductForm";
import { useParams } from "react-router-dom";
import { allProducts } from "../../Data/data";

const EditProduct = () => {
  const { productId } = useParams();
  const product = allProducts.find((prd) => prd.id === +productId);
  return (
    <section className="py-10 flex flex-col gap-5 w-[80%] max-w-[800px] mx-auto">
      <div className="flex-center uppercase tracking-wide bg-primary-500 text-white font-[600] py-2 rounded-md gap-3 text-[1.5rem]">
        <LuClipboardList />
        <h1>Edit Product</h1>
      </div>
      <ProductForm edit product={product} />
    </section>
  );
};

export default EditProduct;
