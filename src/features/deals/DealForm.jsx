import { MdOutlineDiscount } from 'react-icons/md';

import PropTypes from 'prop-types';
import Input from '../../Components/UI/Input';
import { useForm } from 'react-hook-form';
import Button from '../../Components/UI/Button';
import { useCreateDealMutation } from '../../services/apiDeals';

const DealForm = ({ selectProducts }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [createDeal, { isLoading, isSuccess }] = useCreateDealMutation();
  const totalProducts = selectProducts?.reduce(
    (acc, prod) => acc + prod.quantity,
    0,
  );

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div>
      <h1 className="flex items-center justify-center gap-3 bg-primary-500 py-3 text-[1.4rem] font-[600] text-white">
        <MdOutlineDiscount />
        <span>Add new Deal</span>
      </h1>
      <h3 className="px-3 py-4 text-[1rem] ">
        <span className="font-[600]">Total Products: </span>
        <span>{totalProducts}</span>
      </h3>
      <form className="my-3 px-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          label="Deal Name"
          id="dealname"
          required="Deal name is required!"
          error={errors?.dealname?.message}
          showError
          type="text"
        />
        <Input
          register={register}
          label="Price"
          id="price"
          required="Price is required!"
          error={errors?.price?.message}
          showError
          type="number"
          min="0"
          step="any"
        />

        <div className="flex-end mt-5">
          <Button variant="dark" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

DealForm.propTypes = {
  selectProducts: PropTypes.arrayOf(PropTypes.object),
};

export default DealForm;
