import { FC } from 'react';

type DestinationItemProps = {
  time: string;
  city: string;
  country: string;
  countryCode: string;
};

const DestinationItem: FC<DestinationItemProps> = ({
  time = '20:30',
  city = 'Lusaka',
  country = 'Zambia',
  countryCode = 'LUN',
}) => {
  return (
    <div className="flex flex-col flex-wrap p-2 text-xs md:text-sm w-16 md:min-w-32">
      <p className="font-bold">{time}</p>
      <p className="text-gray-500">
        <span className="font-bold">{countryCode}</span> {city}
      </p>
      <p className="text-gray-500">{country}</p>
    </div>
  );
};

export default DestinationItem;
