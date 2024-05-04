import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Button from "../../Components/UI/Button";
import { LuClipboardList } from "react-icons/lu";
import Input from "../../Components/UI/Input";

const ProductForm = ({ edit, product }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: edit
      ? {
          productName: product.name,
          category: product.category,
          price: product.price,
        }
      : {},
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="py-3 flex justify-center items-center gap-3 bg-primary-500 sticky top-0 z-10 text-white text-[1.4rem] font-[600]">
        <LuClipboardList />
        <span>{edit ? "Edit" : "Add new"} Product</span>
      </div>
      <form
        className="p-5 flex flex-col gap-3 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Product Name"
          register={register}
          required="Product Name is required!"
          id="productName"
          type="text"
          error={errors?.productName?.message}
          showError
        />

        <Input
          label="Category"
          register={register}
          required="Category is required!"
          id="category"
          type="text"
          error={errors?.category?.message}
          showError
        />

        <div className="w-1/2">
          <Input
            label="Price"
            register={register}
            required="Price is required!"
            type="number"
            min={0}
            id="price"
            error={errors?.price?.message}
            showError
          />
        </div>

        <div className="flex justify-end mt-5">
          <Button type="submit" className="px-10" variant="dark">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

ProductForm.propTypes = {
  onCloseModal: PropTypes.func,
  edit: PropTypes.bool,
  product: PropTypes.object,
};

export default ProductForm;
