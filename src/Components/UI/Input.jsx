import PropTypes from "prop-types";

const Input = ({
  label,
  id,
  type,
  register,
  required,
  error,
  minLength,
  getValues,
  disabled,
  placeholder,
  className = "",
  textArea = false,
  showError = false,
  ...props
}) => {
  const validate = {
    required: required,
  };

  // Validate for password field
  if (type === "password") {
    validate.minLength = {
      value: minLength,
      message: `Password must be at least ${minLength} characters!`,
    };
  }

  // validate for confirm password field
  if (type === "password" && id === "confirmPassword") {
    validate.validate = (value) =>
      value === getValues().password || "Password needs to match!";
  }

  if (textArea)
    return (
      <div className="flex flex-col gap-3">
        {label && (
          <label
            htmlFor={id}
            className={`font-[600] text-[0.9rem] sm:text-[1.2rem] ${
              error ? "text-red-500" : ""
            }`}
          >
            {label} {required && "*"}
          </label>
        )}
        <textarea
          placeholder={placeholder}
          {...props}
          type={type}
          id={id}
          disabled={disabled}
          className={`outline-none border-2 px-4 py-2 rounded-md  bg-transparent disabled:opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed ${
            error && "border-red-500"
          } ${
            !error && " border-gray-300 text-[1.1rem] focus:border-gray-600"
          } ${className}`}
          {...register(id, validate)}
        />

        <span className="text-[0.8rem] sm:text-[0.8rem] -mt-2 text-red-500">
          {error && error} &nbsp;
        </span>
      </div>
    );

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label
          htmlFor={id}
          className={`font-[500] text-[1rem] sm:text-[1rem] md:text-[1.2rem] ${
            error ? "text-red-500" : ""
          }`}
        >
          {label} {required && "*"}
        </label>
      )}
      <input
        placeholder={placeholder}
        {...props}
        type={type}
        id={id}
        disabled={disabled}
        className={`outline-none border-2 px-4 py-2 rounded-md  bg-transparent disabled:opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed ${
          error && "border-red-500"
        } ${
          !error && " border-gray-300 text-[1.1rem] focus:border-gray-600"
        } ${className}`}
        {...register(id, validate)}
      />
      {showError && (
        <span className="text-[0.8rem] sm:text-[0.8rem] -mt-2 text-red-500">
          {error && error} &nbsp;
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string, // Label for the input
  id: PropTypes.string.isRequired, // ID for the input (required)
  type: PropTypes.string.isRequired, // Type of input (required)
  register: PropTypes.func.isRequired, // Function for registering the input (required)
  required: PropTypes.string, // Whether input is required
  error: PropTypes.string, // Error message
  minLength: PropTypes.number, // Minimum length for password input
  getValues: PropTypes.func, // Function to get form values
  disabled: PropTypes.bool, // Whether input is disabled
  placeholder: PropTypes.string, // Placeholder text for the input
  className: PropTypes.string, // Additional CSS classes for styling
  textArea: PropTypes.bool, // Whether input is a textarea
  showError: PropTypes.bool,
};

export default Input;
