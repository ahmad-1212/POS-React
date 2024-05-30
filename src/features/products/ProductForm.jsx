import { useForm, useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import Button from '../../Components/UI/Button';
import Input from '../../Components/UI/Input';
import { useEffect, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { useGetCategoriesQuery } from '../../services/apiCategories';
import { useGetIngredientsQuery } from '../../services/apiIngredients';
import { useCreateProductMutation } from '../../services/apiProducts';

const ProductForm = ({ edit = false, product }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    control,
    setValue,
    reset,
  } = useForm({
    defaultValues: edit
      ? {
          productName: product.name,
          category: product.category.name,
          price: product.price,
        }
      : {},
  });
  const ingredient = useWatch({
    name: 'ingredient',
    control,
  });
  const [ingredients, setIngredients] = useState(
    (edit && product.ingredients) || [],
  );
  const [error, setError] = useState('');
  const { data: catData, isLoading: isCategoryLoading } =
    useGetCategoriesQuery();
  const { data: ingData, isLoading: isIngLoading } = useGetIngredientsQuery();
  const [
    createProduct,
    { isLoading: isCreating, isSuccess, reset: resetCreateProdState },
  ] = useCreateProductMutation();
  // Add Ingredients
  const handleAddIngredient = () => {
    if (error) setError('');

    const values = getValues();
    const ing = ingData.results.find(
      itm => values.ingredient === itm.ingredientID,
    );
    const newIng = { ...ing, tempID: Date.now() * 1000000 + Math.random() };
    setIngredients(prev => [...prev, newIng]);
  };

  // REmove an ingredient
  const removeIng = id => {
    setIngredients(ingredients.filter(ing => ing.tempID !== id));
  };

  const onSubmit = data => {
    // If no ing added return error
    if (!ingredients.length)
      return setError('Please add at least one Ingredient!');

    // Get All ingredients ID's
    const allIng = {};
    ingredients.forEach(ing => {
      if (allIng[ing.ingredientID]) {
        allIng[ing.ingredientID] += 1;
      } else {
        allIng[ing.ingredientID] = 1;
      }
    });

    const preparedData = {
      name: data.productName,
      categoryID: catData.results.find(cat => cat.name === data.category)
        .categoryID,
      price: data.price,
      ingredients: allIng,
    };

    createProduct(preparedData);
  };

  useEffect(() => {
    const ing = ingData?.results?.find(itm => itm.ingredientID === ingredient);
    setValue('unit', ing?.unit);
    setValue('quantity', ing?.quantity);
  }, [ingredient]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      setIngredients([]);
      setTimeout(() => resetCreateProdState(), 3000);
    }
  }, [isSuccess, reset, resetCreateProdState]);

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
          autoFocus
        />
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <div
            className="
          flex flex-col gap-3"
          >
            <label className="text-[1rem] font-[500] sm:text-[1rem] md:text-[1.2rem]">
              Category *
            </label>
            <select
              className="cursor-pointer rounded-md border-2 border-gray-300 bg-transparent  px-4 py-2 text-[1.1rem] outline-none focus:border-primary-400 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-80"
              disabled={isCategoryLoading}
              defaultValue={
                edit ? product.category.name : catData?.results?.at(0).name
              }
              id="category"
              {...register('category')}
            >
              {catData?.results?.map((cat, i) => (
                <option key={i} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <span></span>
          </div>

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
          <div
            className="
          flex flex-col gap-3"
          >
            <label className="text-[1rem] font-[500] sm:text-[1rem] md:text-[1.2rem]">
              Ingredients *
            </label>
            <select
              className="cursor-pointer rounded-md border-2 border-gray-300 bg-transparent  px-4 py-2 text-[1.1rem] outline-none focus:border-primary-400 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-80"
              disabled={isIngLoading}
              defaultValue={1}
              id="ingredient"
              {...register('ingredient')}
            >
              <option value={1} disabled>
                Select ingredient
              </option>
              {ingData?.results?.map((ing, i) => (
                <option key={i} value={ing.ingredientID}>
                  {ing.name}
                </option>
              ))}
            </select>
            <span></span>
          </div>
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
                key={i}
                className="flex items-center gap-5 rounded-md bg-primary-100 px-2 py-1 font-[600] text-primary-500"
              >
                <span>
                  {ing.name}: {ing.quantity} {ing.unit}
                </span>
                <HiX
                  className="cursor-pointer transition-all hover:scale-110"
                  onClick={() => removeIng(ing.tempID)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex justify-end">
          {(error || isSuccess) && (
            <p
              className={`mr-auto bg-${isSuccess ? 'green' : 'red'}-100 px-3 py-2 text-${isSuccess ? 'green' : 'red'}-500`}
            >
              {isSuccess ? 'Your product is added successfully!' : error}
            </p>
          )}
          <Button type="submit" className="px-10" variant="dark">
            {isCreating ? 'Saving...' : 'Save'}
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
