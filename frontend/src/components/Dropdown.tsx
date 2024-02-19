import { FC, useState } from 'react';
import { Buttons } from './Button';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

interface DropdownTypes<T> {
  options: T[];
  title?: string;
}

const Dropdown: FC<DropdownTypes<string | number>> = ({ options = '', title = '' }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownValue, setDropDownValue] = useState(options[0]);

  let icon;
  if (isOpen) {
    icon = <AiOutlineCaretUp />;
  } else {
    icon = <AiOutlineCaretDown />;
  }

  const handleClick = (value: string) => {
    setDropDownValue(value);
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="relative bg-white  w-16 md:w-32">
      <Buttons
        variant="borderless"
        className=" no-underline"
        title={dropdownValue}
        size="sm"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {icon}
      </Buttons>
      {isOpen && (
        <ul className="absolute shadow-lg z-10 rounded cursor-pointer  w-full bg-white text-xs md:text-sm min-h-5 flex flex-col items-start">
          {options.map(
            (item) =>
              dropdownValue !== item && (
                <li
                  key={item}
                  className="hover:bg-gray-100 p-2  w-full"
                  onClick={() => handleClick(item)}
                >
                  {item}
                </li>
              ),
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
