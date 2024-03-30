import { FC } from 'react';
import { formatTime } from '../../utils/helperFn';
type FlightListItemProps = {
  time: string;
  city: string;
  country: string;
  countryCode: string;
  type?: 'origin' | 'destination';
};

const FlightListItem: FC<FlightListItemProps> = ({
  time = '20:30',
  city = 'Lusaka',
  countryCode = 'LUN',
  type = 'origin',
}) => {
  return (
    <div className="flex flex-col flex-wrap text-xs md:text-sm w-fit ">
      <p
        className={`text-sm md:text-base text-center lg:text-xl font-semibold tracking-wider leading-6 ${type === 'destination' ? ' md:text-right' : ''}`}
      >
        {formatTime(time).formattedTime}
      </p>
      <p className="text-gray-500 text-center">
        {city} <span className="font-medium tracking-wider">({countryCode})</span>
      </p>
    </div>
  );
};

export default FlightListItem;
