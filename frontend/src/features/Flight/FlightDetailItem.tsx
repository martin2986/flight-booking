import { FC } from 'react';
import { IoAirplane } from 'react-icons/io5';
import { durationInHour } from '../../utils/helperFn';
type FlightDetailItemProps = {
  type?: 'second';
  originCode: string;
  origin: string;
  destination: string;
  destinationTime: string;
  destinationCode: string;
  originTime: string;
  departureDate: string;
  returnDate: string;
  duration: number;
  operatingCarrier: any;
  flightNumber: number;
};

const FlightDetailItem: FC<FlightDetailItemProps> = ({
  originCode = '',
  origin = '',
  originTime = '',
  departureDate = '',
  returnDate = '',
  destinationCode = '',
  destination = '',
  destinationTime = '',
  duration,
  operatingCarrier,
  flightNumber,
}) => {
  return (
    <div className="relative border-s border-gray-200 dark:border-gray-600 ms-3.5">
      <div className="mb-2 ms-8 ">
        <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-700 rounded-full -start-3.5  ">
          <IoAirplane className="text-sm text-white" />
        </span>

        <h3 className="flex  items-start mb-1 text-sm font-bold text-gray-900 dark:text-black">
          {origin} ({originCode})
        </h3>
        <time className="block mb-3   text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
          {departureDate}, {originTime}
        </time>
        <h3 className="flex items-start  mb-3  text-sm font-semibold text-gray-900 dark:text-black">
          {durationInHour(duration)} {operatingCarrier.name}
          <span className="ml-1">{operatingCarrier.alternateId + flightNumber}</span>
        </h3>
        <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-700 rounded-full -start-3.5  ">
          <IoAirplane className="text-sm text-white" />
        </span>
        <h3 className="flex  items-start mb-1 text-sm font-bold text-gray-900 dark:text-black">
          {destination} ({destinationCode})
        </h3>
        <time className="block mb-3   text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
          {returnDate}, {destinationTime}
        </time>
      </div>
    </div>
  );
};

export default FlightDetailItem;
