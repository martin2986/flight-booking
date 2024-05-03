import { FC } from 'react';

interface DropdownTypes<T> {
  options: T[];
  title?: string;
  type?: 'tripType' | 'passengers' | 'cabinClass';
  className?: string;
}

const Dropdown: FC<DropdownTypes<string | number>> = ({
  options = [],
  title = '',
  type,
  className,
  ...props
}) => {
  return (
    <div className={`${className} relative bg-white text-black`}>
      <select {...props} className="px-2 w-28 outline-none">
        {options.map((item, id) => (
          <option
            value={item}
            key={id}
            className="hover:bg-gray-100 p-2  w-full h-36 overflow-y-auto"
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
