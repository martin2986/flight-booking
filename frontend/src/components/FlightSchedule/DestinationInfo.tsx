import { FC } from 'react';
import DestinationItem from './DestinationItem';

type DestinationInfoProps = {
  logo: string;
  departureAirportCode: string;
  depatureCountry: string;
  departureTime: string;
  depatureCity: string;
  arrivalAirportCode: string;
  arrivalCountry: string;
  arrivalTime: string;
  arrivalCity: string;
  airline: string;
};

const DestinationInfo: FC<DestinationInfoProps> = ({
  logo = 'LOGO',
  departureAirportCode = 'bgs',
  depatureCountry = 'France',
  departureTime = '18:00 PM',
  depatureCity = 'Paris',
  arrivalAirportCode = 'PRS',
  arrivalCountry = 'China',
  arrivalTime = '23:45 PM',
  arrivalCity = 'beijing',
  airline = ' beijing airways',
}) => {
  return (
    <div className="mt-2 flex sm:flex-row  mx-6  justify-between items-center flex-wrap ">
      <div className="flex flex-col place-items-center w-14  md:w-fit p-1  md:p-2">
        {logo}
        <p className="text-xs text-gray-500 font-bold">{airline}</p>
      </div>

      <DestinationItem
        time={departureTime}
        country={depatureCountry}
        city={depatureCity}
        countryCode={departureAirportCode}
      />
      <DestinationItem
        time={arrivalTime}
        country={arrivalCountry}
        city={arrivalCity}
        countryCode={arrivalAirportCode}
      />
    </div>
  );
};

export default DestinationInfo;
