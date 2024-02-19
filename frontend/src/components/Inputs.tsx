import { FC, InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | undefined;
  register?: UseFormRegister<any>;
  label: string;
  name: string;
}

const Inputs: FC<InputProps> = ({ label, error, name, register, ...props }) => {
  return (
    <>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-black  dark:text-gray-300"
      >
        {label}
      </label>
      <input
        className="shadow-sm border border-gray-300 text-black mb-3  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2   dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
        {...register(name)}
        {...props}
      />
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
};

export default Inputs;
