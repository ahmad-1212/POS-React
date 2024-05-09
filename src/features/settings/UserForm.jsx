import { FaRegUser } from "react-icons/fa";
import PropTypes from "prop-types";

import Button from "../../Components/UI/Button";
import Input from "../../Components/UI/Input";
import { useForm } from "react-hook-form";

const UserForm = ({ edit, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: edit
      ? {
          userName: user.name,
          email: user.email,
          role: user.role,
        }
      : {},
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="py-3 flex justify-center items-center gap-3 bg-primary-500 text-white text-[1.4rem] font-[600]">
        <FaRegUser />
        <span>{edit ? "Edit" : "Add new"} User</span>
      </div>
      <form
        className="p-5 flex flex-col gap-3 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="User Name"
          register={register}
          required="User Name is required!"
          id="userName"
          type="text"
          error={errors?.userName?.message}
          showError
        />
        <Input
          label="Email"
          register={register}
          required="Email is required!"
          id="email"
          type="email"
          error={errors?.email?.message}
          showError
        />

        <div className="flex flex-col gap-2 ">
          <label htmlFor="role" className="font-[500] text-[1.2rem]">
            Role
          </label>
          <select
            {...register("role", { required: "Role is required!" })}
            id="role"
            className="outline-none border-2 px-4 py-2 rounded-md  bg-transparent disabled:opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed focus:border-gray-600"
          >
            <option value="cashier">Cashier</option>
            <option value="manager">Manager</option>
            <option value="kitchen staff">Kitchen Staff</option>
          </select>
        </div>

        <div className="flex justify-end mt-5">
          <Button type="submit" className="px-10" variant="dark">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

UserForm.propTypes = {
  edit: PropTypes.bool,
  user: PropTypes.object,
};

export default UserForm;
