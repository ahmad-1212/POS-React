import { useForm } from "react-hook-form";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    navigate("/home");
  };

  return (
    <form
      className="w-[500px] bg-gray-50 px-12 py-16 rounded-md shadow-md flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-center font-[500] text-[2rem] ">Login</h1>
      {/* Email Input */}
      <Input
        label="Email"
        type="email"
        required="Please enter you Email!"
        register={register}
        id="email"
        error={errors?.email?.message}
      />
      {/* Password Input */}
      <Input
        label="Password"
        required="Please enter you Password!"
        register={register}
        type="password"
        id="password"
        error={errors?.password?.message}
      />

      {/* Login Button */}
      <Button type="submit" variant="dark" className="text-[1.4rem] mt-8">
        Login
      </Button>
      <div className="text-center text-[0.9rem] ">
        Don't have an account? Signup
      </div>
    </form>
  );
};

export default Login;
