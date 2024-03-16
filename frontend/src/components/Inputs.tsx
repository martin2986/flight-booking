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
      <label htmlFor={label} className="block mb-2 text-sm font-medium text-black  ">
        {label}
      </label>
      <input
        className="shadow-sm border border-gray-300 text-black mb-2  text-sm rounded-md focus:ring-primary-100 focus:border-primary-100 block w-full p-2  dark:focus:ring-primary-100 dark:focus:border-primary-100 dark:shadow-sm-light"
        {...register(name)}
        {...props}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </>
  );
};

export default Inputs;
