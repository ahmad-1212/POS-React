import { RxLayers } from "react-icons/rx";
import PropTypes from "prop-types";
import Input from "../../Components/UI/Input";
import { useForm } from "react-hook-form";
import Button from "../../Components/UI/Button";
import { useState } from "react";

const CategoryForm = ({ onCloseModal, edit = false, category }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: edit ? { categoryName: category.name } : {} });
  const [imgUrl, setImgUrl] = useState(edit && category?.image);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    setImgUrl(url);
  };
  console.log(imgUrl);

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
        {!imgUrl && (
          <label
            htmlFor="image"
            className="w-[170px] h-[170px] border-2 flex-center cursor-pointer text-gray-400 font-[600] hover:bg-gray-100"
          >
            + Add Image
          </label>
        )}
        <input
          type="file"
          accept="image/*"
          id="image"
          hidden
          onChange={handleImageChange}
        />
        {imgUrl && (
          <div className="w-[170px] h-[170px] hover:bg-gray-100 overflow-hidden">
            <img src={imgUrl} className="w-full h-full object-cover" />
          </div>
        )}

        {imgUrl && (
          <div className="flex">
            <label
              htmlFor="image"
              className="px-5 py-2 bg-primary-500 rounded-md cursor-pointer hover:scale-105 transition-all  text-white"
            >
              Change Image
            </label>
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
