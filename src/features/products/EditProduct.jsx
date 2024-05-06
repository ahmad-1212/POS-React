import { LuClipboardList } from "react-icons/lu";
import ProductForm from "./ProductForm";

const EditProduct = () => {
  return (
    <section className="py-10 flex flex-col gap-5 w-[80%] max-w-[800px] mx-auto">
      <div className="flex-center uppercase tracking-wide bg-primary-500 text-white font-[600] py-2 rounded-md gap-3 text-[1.5rem]">
        <LuClipboardList />
        <h1>Edit Product</h1>
      </div>
      <ProductForm
        edit
        product={{
          name: "Chessy Burger",
          price: 7.99,
          category: "burger",
          ingredients: [
            {
              ingredient: "ingredient 1",
              quantity: 2,
              id: 1,
            },
            {
              ingredient: "ingredient 3",
              quantity: 4,
              id: 2,
            },
            {
              ingredient: "ingredient 1",
              quantity: 8,
              id: 3,
            },
          ],
        }}
      />
    </section>
  );
};

export default EditProduct;
