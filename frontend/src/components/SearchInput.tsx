import { FC, InputHTMLAttributes, ReactNode, memo } from 'react';
import { Card } from './UI/Card';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  topLabel?: string;
  type: string;
  placeholder?: string;
  value: string;
  name: string;
}

const SearchInput: FC<SearchInputProps> = ({
  topLabel,
  type,
  placeholder,
  value,
  name,
  ...props
}) => {
  return (
    <Card>
      <p className=" text-xxs md:text-xs px-1">{topLabel}</p>
      <input
        className="text-xs md:text-sm px-1 py-1 outline-0 h-12 w-14 md:w-24 lg:w-40"
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        {...props}
      />
    </Card>
  );
};

export default memo(SearchInput);
