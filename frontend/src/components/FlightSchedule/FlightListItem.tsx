import { FC } from 'react';
import moment from 'moment';
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
  const [datePart, timePart] = time.split('T');
  const formattedTime = moment(timePart, 'HH:mm:ss').format('HH:mm');
  return (
    <div className="flex flex-col flex-wrap text-xs md:text-sm w-fit ">
      <p
        className={`text-sm md:text-base text-center lg:text-xl font-semibold tracking-wider leading-6 ${type === 'destination' ? ' md:text-right' : ''}`}
      >
        {formattedTime}
      </p>
      <p className="text-gray-500 text-center">
        {city} <span className="font-medium tracking-wider">({countryCode})</span>
      </p>
      {/* <p className="text-gray-500">{country}</p> */}
    </div>
  );
};

export default FlightListItem;
