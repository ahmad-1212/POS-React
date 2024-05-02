import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import { HiX } from "react-icons/hi";
import IconButton from "../../Components/UI/IconButton";
const UserDeliveyDetailForm = ({ onCloseModal }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="absolute top-[0.9rem] right-[1rem] text-[1.2rem]">
        <IconButton onClick={onCloseModal} className="text-primary-500">
          <HiX />
        </IconButton>
      </div>
      <h1 className="p-10 pb-0 capitalize text-primary-500 text-[1.4rem] mt-3 font-[600]">
        Please fill out all the fields!
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-10 flex flex-col gap-4"
      >
        <Input
          register={register}
          required="Email is required!"
          label="Email"
          id="email"
          type="email"
          error={errors?.email?.message}
          showError
        />
        <Input
          register={register}
          required="Address is required!"
          label="address"
          id="address"
          type="text"
          error={errors?.address?.message}
          showError
        />
        <Input
          register={register}
          required="Phone number is required!"
          label="Phone"
          id="phone"
          type="tel"
          error={errors?.phone?.message}
          showError
        />

        <div className="flex justify-end">
          <Button variant="dark" type="submit">
            Print Invoice
          </Button>
        </div>
      </form>
    </>
  );
};

UserDeliveyDetailForm.propTypes = {
  onCloseModal: PropTypes.func,
};

export default UserDeliveyDetailForm;
