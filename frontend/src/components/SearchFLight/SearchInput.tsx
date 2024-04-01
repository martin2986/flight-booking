import { FC, InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Card } from '../UI/Card';
interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  topLabel?: string;
  name: string;
  register: UseFormRegister<any>;
}

const SearchInput: FC<SearchInputProps> = ({ topLabel, name, register, ...props }) => {
  return (
    <div className="flex flex-col relative">
      <Card>
        <p className=" text-xxs md:text-xs px-1">{topLabel}</p>
        <input
          className="text-xs md:text-sm p-1  outline-0 h-12 w-14 md:w-24 lg:w-40"
          {...register(name)}
          {...props}
        />
      </Card>
    </div>
  );
};

export default SearchInput;
