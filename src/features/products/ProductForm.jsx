import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Button from "../../Components/UI/Button";
import Input from "../../Components/UI/Input";
import { useState } from "react";
import { HiX } from "react-icons/hi";

const ProductForm = ({ edit, product }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: edit
      ? {
          productName: product.name,
          category: product.category,
          price: product.price,
        }
      : {},
  });
  const [ingredients, setIngredients] = useState(
    (edit && product.ingredients) || [],
  );
  const [error, setError] = useState("");

  // Add Ingredients
  const handleAddIngredient = () => {
    if (error) setError("");

    const values = getValues();
    if (!values.ingredients || !values.quantity) return;
    setIngredients((prev) => [
      ...prev,
      {
        ingredient: values.ingredients,
        quantity: values.quantity,
        unit: values.unit,
        id: Date.now() + Math.floor(Math.random() * 1000),
      },
    ]);
  };

  const removeIng = (id) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const onSubmit = (data) => {
    if (!ingredients.length)
      return setError("Please add at least one Ingredient!");
    console.log(data);
  };

  return (
    <div>
      <form
        className="mt-4 flex flex-col gap-3 rounded-md bg-white p-5 shadow-md"
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
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <Input
            label="Category"
            register={register}
            required="Category is required!"
            id="category"
            type="text"
            error={errors?.category?.message}
            showError
          />

          <Input
            label="Price"
            register={register}
            required="Price is required!"
            type="number"
            step="any"
            min={0}
            id="price"
            error={errors?.price?.message}
            showError
          />
        </div>

        <div className="grid grid-cols-2 gap-x-3 sm:gap-x-8">
          <Input
            register={register}
            id="ingredients"
            label="Ingredient"
            type="text"
          />
          <div className="flex  gap-2 ">
            <Input
              className="w-full"
              register={register}
              type="text"
              id="unit"
              label="Unit"
            />
            <Input
              register={register}
              id="quantity"
              label="Quantity"
              min={0}
              type="number"
              className="w-full"
            />
          </div>
        </div>
        <div>
          <Button variant="dark" type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </Button>
          <ul className="mt-3 flex flex-wrap items-center gap-3">
            {ingredients?.map((ing, i) => (
              <li
                key={ing.ingredient + i}
                className="flex items-center gap-5 rounded-md bg-primary-100 px-2 py-1 font-[600] text-primary-500"
              >
                <span>
                  {ing.ingredient}: {ing.quantity} {ing.unit}
                </span>
                <HiX
                  className="cursor-pointer transition-all hover:scale-110"
                  onClick={() => removeIng(ing.id)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex justify-end">
          {error && (
            <p className="mr-auto bg-red-100 px-3 py-2 text-red-500">{error}</p>
          )}
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
