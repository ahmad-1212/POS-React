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
    (edit && product.ingredients) || []
  );
  const [error, setError] = useState("");

  // Add Ingredients
  const handleAddIngredient = () => {
    if (error) setError("");

    const values = getValues();
    console.log(values);
    if (!values.ingredients || !values.quantity) return;
    setIngredients((prev) => [
      ...prev,
      {
        ingredient: values.ingredients,
        quantity: values.quantity,
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
        className="p-5 flex flex-col gap-3 rounded-md mt-4 bg-white shadow-md"
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
        <div className="grid grid-cols-2 gap-x-8">
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

        <div className="grid grid-cols-2 gap-x-8">
          <Input
            register={register}
            id="ingredients"
            label="Ingredient"
            type="text"
          />
          <Input
            register={register}
            id="quantity"
            label="Quantity"
            min={0}
            type="number"
          />
        </div>
        <div>
          <Button variant="dark" type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </Button>
          <ul className="flex items-center gap-3 flex-wrap mt-3">
            {ingredients?.map((ing, i) => (
              <li
                key={ing.ingredient + i}
                className="bg-primary-100 text-primary-500 py-1 px-2 font-[600] flex items-center gap-5 rounded-md"
              >
                <span>
                  {ing.ingredient}: {ing.quantity}
                </span>
                <HiX
                  className="hover:scale-110 transition-all cursor-pointer"
                  onClick={() => removeIng(ing.id)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end mt-5">
          {error && (
            <p className="bg-red-100 text-red-500 py-2 px-3 mr-auto">{error}</p>
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
