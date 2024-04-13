import { FC } from 'react';

type PassengersListProps = {
  title: string;
  bottom?: boolean;
  detail: string;
  increment: () => void;
  decrement: () => void;
  value: number;
  type?: 'adults' | 'children' | 'infants';
};

const PassengersList: FC<PassengersListProps> = ({
  title,
  bottom,
  detail,
  increment,
  decrement,
  value,
  type,
}) => {
  return (
    <div
      className={`flex flex-row items-center justify-between w-56 p-2 ${!bottom ? 'border-b-2' : ''}`}
    >
      <div className="flex flex-col">
        <p className="text-sm font-light">{title}</p>
        <p className="text-sm font-medium">{detail}</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <button
          type="button"
          onClick={decrement}
          disabled={(type === 'adults' && value === 1) || value <= 0}
          className="rounded-full h-7 w-7 border inline-flex items-center justify-center hover:bg-gray-100 disabled:bg-gray-100"
        >
          -
        </button>
        <p className="text-sm font-medium">{value}</p>
        <button
          type="button"
          onClick={increment}
          className="rounded-full h-7 w-7 border inline-flex items-center justify-center hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PassengersList;
