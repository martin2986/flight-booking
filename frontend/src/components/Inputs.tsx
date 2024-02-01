import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
type InputsProps = {
  label: string;
  type: string;
  error: string | undefined;
  name: string;
  register: UseFormRegister<any>;
};

const Inputs: FC<InputsProps> = ({
  label,
  type,
  error,
  name,
  register,
  ...props
}) => {
  return (
    <>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-black  dark:text-gray-300"
      >
        {label}
      </label>
      <input
        {...props}
        {...register(name)}
        type={type}
        className="shadow-sm border border-gray-300 text-black mb-3  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2   dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
      />
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
};

export default Inputs;
