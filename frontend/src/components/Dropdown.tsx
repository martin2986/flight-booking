import { FC, useState } from 'react';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { appAction } from '../redux/app/appSlice';
import { useDisPatch } from '../redux/hooks';
import { Buttons } from './Button';

interface DropdownTypes<T> {
  options: T[];
  title?: string;
  type: 'tripType' | 'passengers' | 'cabinClass';
}

const Dropdown: FC<DropdownTypes<string | number>> = ({ options = '', title = '', type }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownValue, setDropDownValue] = useState(options[0]);
  const dispatch = useDisPatch();

  let icon;
  if (isOpen) {
    icon = <AiOutlineCaretUp />;
  } else {
    icon = <AiOutlineCaretDown />;
  }
  const handleClick = (value: string) => {
    setDropDownValue(value);
    if (type === 'passengers') dispatch(appAction.selectPassenger(value));
    if (type === 'cabinClass') dispatch(appAction.selectCabinClass(value));
    if (type === 'tripType') dispatch(appAction.selectTripType(value));
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="relative bg-white  w-16 md:w-32">
      <Buttons
        variant="borderless"
        className=" no-underline"
        title={dropdownValue.toString()}
        size="sm"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {icon}
      </Buttons>
      {isOpen && (
        <ul
          onMouseLeave={() => setIsOpen((prev) => !prev)}
          className="absolute shadow-lg z-10 rounded cursor-pointer  w-full bg-white text-xs md:text-sm min-h-5 flex flex-col items-start"
        >
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
