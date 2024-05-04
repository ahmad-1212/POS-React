import { RxLayers } from "react-icons/rx";
import PropTypes from "prop-types";
import Input from "../../Components/UI/Input";
import { useForm } from "react-hook-form";
import Button from "../../Components/UI/Button";

const CategoryForm = ({ onCloseModal, edit = false, category }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: edit ? { categoryName: category.name } : {} });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="py-3 flex justify-center items-center gap-3 bg-primary-500 text-white text-[1.4rem] font-[600]">
        <RxLayers />
        <span>{edit ? "Edit" : "Add new"} Category</span>
      </div>
      <form
        className="p-5 flex flex-col gap-3 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Category Name"
          register={register}
          required="Category Name is required!"
          id="categoryName"
          type="text"
          error={errors?.categoryName?.message}
          showError
        />
        {edit && !category.image && (
          <label
            htmlFor="image"
            className="w-[170px] h-[170px] border-2 flex-center cursor-pointer text-gray-400 font-[600] hover:bg-gray-100"
          >
            + Add Image
          </label>
        )}
        <input type="file" accept="image/*" id="image" hidden />
        {edit && category.image && (
          <div className="w-[170px] h-[170px] hover:bg-gray-100 overflow-hidden">
            <img src={category.image} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex justify-end mt-5">
          <Button type="submit" className="px-10" variant="dark">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

CategoryForm.propTypes = {
  onCloseModal: PropTypes.func,
  edit: PropTypes.bool,
  category: PropTypes.object,
};

export default CategoryForm;
