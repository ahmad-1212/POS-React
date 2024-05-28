import { RxLayers } from "react-icons/rx";
import PropTypes from "prop-types";
import Input from "../../Components/UI/Input";
import { useForm } from "react-hook-form";
import Button from "../../Components/UI/Button";
import { useState } from "react";
import {
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
} from "../../services/apiCategories";

const CategoryForm = ({ onCloseModal, edit = false, category }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: edit ? { categoryName: category.name } : {} });
  const [imgUrl, setImgUrl] = useState(edit && category?.image);
  const [image, setImage] = useState(null);
  const [createCategory, { isLoading, isSuccess: isCreated }] =
    useCreateCategoryMutation();
  const [update, { isLoading: isUpdating, isSuccess: isUpdated }] =
    useUpdateCategoryMutation();

  if (isUpdated || isCreated) onCloseModal();

  const onSubmit = async (data) => {
    console.log(data);
    if (edit) {
      update({ id: category.id, name: data.categoryName });
    } else {
      const formData = new FormData();
      formData.append("name", data.categoryName);
      formData.append("image", image);
      formData.append("categoryID", Math.random() * 10000000000);
      createCategory(formData);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    setImgUrl(url);
    setImage(file);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-3 bg-primary-500 py-3 text-[1.4rem] font-[600] text-white">
        <RxLayers />
        <span>{edit ? "Edit" : "Add new"} Category</span>
      </div>
      <form
        className="mt-4 flex flex-col gap-3 p-5"
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
            className="flex-center h-[170px] w-[170px] cursor-pointer border-2 font-[600] text-gray-400 hover:bg-gray-100"
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
          <div className="h-[170px] w-[170px] overflow-hidden hover:bg-gray-100">
            <img src={imgUrl} className="h-full w-full object-cover" />
          </div>
        )}

        {imgUrl && (
          <div className="flex">
            <label
              htmlFor="image"
              className="cursor-pointer rounded-md bg-primary-500 px-5 py-2 text-white transition-all  hover:scale-105"
            >
              Change Image
            </label>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <Button
            disabled={isLoading}
            type="submit"
            className="px-10"
            variant="dark"
          >
            {isLoading || isUpdating ? "Loading..." : "Save"}
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
