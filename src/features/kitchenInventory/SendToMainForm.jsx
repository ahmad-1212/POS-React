import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Button from '../../Components/UI/Button';
import { useSendToMainMutation } from '../../services/apiKitchenInventory';
import { MdOutlineInventory, MdOutlineInventory2 } from 'react-icons/md';
import Input from '../../Components/UI/Input';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const SendToMainForm = ({ item }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: item.ingredient.name,
      unit: item.ingredient.unit,
      quantity: item.quantity,
    },
  });

  const [sendToMain, { isLoading, isSuccess, reset }] = useSendToMainMutation();

  const onSubmit = data => {
    sendToMain({ id: item.ingredient.id, data: { quantity: +data.quantity } });
  };

  // Set default values when changes
  useEffect(() => {
    setValue('name', item.ingredient.name);
    setValue('unit', item.ingredient.unit);
    setValue('quantity', item.quantity);
  }, [item, setValue]);

  // handle success or error state
  useEffect(() => {
    if (isSuccess) {
      toast.success(
        `${getValues().quantity} ${item.ingredient.unit}, ${item.ingredient.name} is successfully send to Main Inventory!`,
      );
      reset();
    }
  }, [isSuccess, reset, getValues, item]);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-3 bg-primary-500 py-3 text-[1.4rem] font-[600] text-white">
        <MdOutlineInventory2 />
        <span>Send to Main Inventory</span>
      </div>
      <div className="mx-10 mt-5 flex items-center gap-2 bg-primary-100 px-3 py-2 text-[1.2rem] text-primary-500">
        <span>Availabale:</span>
        <span>{item.ingredient.name}</span>
        <span>
          {item.quantity} {item.ingredient.unit}
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 px-10">
        <Input
          register={register}
          type="text"
          disabled
          id="name"
          required={'Ingredient name is required!'}
          label="Ingredient"
          showError
          error={errors?.name?.message}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            register={register}
            type="text"
            disabled
            id="unit"
            required={'Unit is required!'}
            label="Unit"
            showError
            error={errors?.unit?.message}
          />
          <Input
            type="number"
            id="quantity"
            register={register}
            required={'Quantity is required!'}
            min={0}
            max={item.quantity}
            label="Quantity"
            showError
            error={errors?.quantity?.message}
            disabled={isLoading}
          />
        </div>
        <div className="flex-end">
          <Button disabled={isLoading} variant="dark">
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </form>
    </div>
  );
};

SendToMainForm.propTypes = {
  item: PropTypes.object,
};

export default SendToMainForm;
