import { FC, InputHTMLAttributes, memo } from 'react';
import { Card } from './UI/Card';
import { UseFormRegister } from 'react-hook-form';
interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  topLabel?: string;
  name: string;
  register: UseFormRegister<any>;
}

const SearchInput: FC<SearchInputProps> = ({ topLabel, name, register, ...props }) => {
  return (
    <Card>
      <p className=" text-xxs md:text-xs px-1">{topLabel}</p>
      <input
        className="text-xs md:text-sm px-1 py-1 outline-0 h-12 w-14 md:w-24 lg:w-40"
        {...props}
        {...register(name)}
      />
    </Card>
  );
};

export default memo(SearchInput);
