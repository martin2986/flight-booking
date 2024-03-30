import { FC } from 'react';
import { appAction } from '../../redux/app/appSlice';
import { useDisPatch } from '../../redux/hooks';
import { Buttons } from '../Button';
import { Card } from '../UI/Card';
import FlightDuration from './FlightDuration';
import FlightListItem from './FlightListItem';

type FlightListInfoProps = {
  legs: {
    arrival: string;
    departure: string;
    stopCount: number;
    durationInMinutes: number;
    carriers: {
      operating: any[];
    };
    origin: {
      displayCode: string;
      name: string;
      city: string;
    };
    destination: {
      displayCode: string;
      name: string;
      city: string;
    };
  }[];
  price: {
    formatted: string;
  };
};

const ScheduleItem: FC<FlightListInfoProps> = ({ legs, price, ...rest }) => {
  const { arrival, departure, stopCount, durationInMinutes, origin, destination, carriers } =
    legs[0];
  const dispatch = useDisPatch();
  const selectHandler = () => {
    dispatch(
      appAction.selectedFLight({
        destinationCode: destination?.displayCode,
        date: departure,
        price: price?.formatted,
        originCode: origin?.displayCode,
        origin: origin?.name,
        destination: destination?.name,
      }),
    );
  };
  return (
    <>
      <Card className=" mb-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-0 cursor-pointer" {...rest}>
        <div className="mt-2 flex sm:flex-row justify-between items-center  mr-2 gap-5">
          {/* <div className="flex flex-col place-items-center w-10  md:w-20 p-1  md:p-2">
<img src={carrierData?.logoUrl} alt={carrierData?.name} className=" w-5" />
<p className="text-xs text-gray-500 font-bold">{carrierData?.name}</p>
</div> */}

          <FlightListItem
            time={departure}
            country={origin?.name}
            city={origin?.city}
            countryCode={origin.displayCode}
          />
          <FlightDuration time={durationInMinutes} stopCount={stopCount} />
          <FlightListItem
            type="destination"
            time={arrival}
            country={destination?.name}
            city={destination?.city}
            countryCode={destination.displayCode}
          />
          <div className=" backdrop: flex flex-col items-center text-center">
            <h1 className="font-semibold text-center text-sm md:text-base">{price.formatted}</h1>
            <p className=" font-light text-gray-700 text-xs md:text-sm text-nowrap">per person</p>
          </div>
          <Buttons
            className="rounded-3xl md:px-5 lg:px-7 hidden md:block font-semibold"
            onClick={selectHandler}
          >
            Select
          </Buttons>
        </div>
      </Card>
    </>
  );
};

export default ScheduleItem;
