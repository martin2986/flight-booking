import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../UI/Card';
import DestinationInfo from './DestinationInfo';

type ScheduleItemProps = {
  price: string;
};

const flightInfoExample = {
  logo: 'LOGO',
  departureAirportCode: 'bgs',
  depatureCountry: 'France',
  departureTime: '18:00 PM',
  depatureCity: 'Paris',
  arrivalAirportCode: 'PRS',
  arrivalCountry: 'China',
  arrivalTime: '23:45 PM',
  arrivalCity: 'beijing',
  airline: ' beijing airways',
};

const ScheduleItem: FC<ScheduleItemProps> = ({ price = '400' }) => {
  return (
    <Card className="flex flex-row mb-3">
      <div className="flex-auto">
        <DestinationInfo {...flightInfoExample} />
      </div>
      <div className="md:border-l-2 mx-auto md:border-dotted w-1/3 flex flex-col items-center">
        <h1 className="md:text-2xl text-center text-base">${price}</h1>

        <Link to="/">Flight details</Link>
      </div>
    </Card>
  );
};

export default ScheduleItem;
