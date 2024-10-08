import { useForm } from 'react-hook-form';
import { FaRegListAlt } from 'react-icons/fa';
import Button from '../../Components/UI/Button';
import PropTypes from 'prop-types';
import Input from '../../Components/UI/Input';
import {
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
} from '../../services/apiIngredients';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const IngredientForm = ({ edit = false, ingredient, onCloseModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: edit
      ? {
          ingredient: ingredient.name,
          unit: ingredient.unit,
          quantity: ingredient.quantity,
        }
      : {},
  });

  const [createIngredient, { isLoading, isSuccess, reset, error }] =
    useCreateIngredientMutation();
  const [
    updateIngredient,
    {
      isLoading: isUpdating,
      isSuccess: isUpdated,
      reset: resetUpdateState,
      error: updateError,
    },
  ] = useUpdateIngredientMutation();

  // Handle submit
  const onSubmit = data => {
    if (edit) {
      updateIngredient({
        id: ingredient._id,
        name: data.ingredient,
        quantity: data.quantity,
        unit: data.unit,
      });
    } else {
      createIngredient({
        name: data.ingredient,
        unit: data.unit,
      });
    }
  };

  // Handle success state
  useEffect(() => {
    if (isSuccess) {
      toast.success('Ingredient successfully added!');
      onCloseModal();
      reset();
    }
    if (isUpdated) {
      toast.success('Ingredient successfully updated!');
      onCloseModal();
      resetUpdateState();
    }
  }, [isSuccess, isUpdated, onCloseModal, reset, resetUpdateState]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message, { autoClose: 5000 });
      reset();
    }
    if (updateError) {
      toast.error(updateError?.message, { autoClose: 5000 });
      resetUpdateState();
    }
  }, [error, updateError, reset, resetUpdateState]);

  return (
    <div>
      <div className="flex items-center justify-center gap-3 bg-primary-500 py-3 text-[1.4rem] font-[600] text-white">
        <FaRegListAlt />
        <span>{edit ? 'Edit' : 'Add new'} Ingredient</span>
      </div>
      <form
        className="mt-4 flex flex-col gap-3 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Ingredient Name"
          register={register}
          required="Ingredient Name is required!"
          id="ingredient"
          type="text"
          error={errors?.ingredient?.message}
          disabled={isLoading || isUpdating}
          showError
        />

        <Input
          label="Unit"
          required="Unit is required!"
          register={register}
          id="unit"
          type="text"
          disabled={isLoading || isUpdating}
          error={errors?.unit?.message}
          showError
        />

        <div className="mt-5 flex justify-end">
          <Button
            disabled={isLoading || isUpdating}
            isLoading={isLoading || isUpdating}
            type="submit"
            className="px-10"
            variant="dark"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

IngredientForm.propTypes = {
  edit: PropTypes.bool,
  ingredient: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default IngredientForm;
